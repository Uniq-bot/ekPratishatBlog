"use client";

import { useImageUpload } from "@/hooks/useAdminBlogs";
import {
  ArrowLeft,
  List,
  Pilcrow,
  Type,
  Image as ImageIcon,
  Quote,
  Minus,
  Info,
  Loader2,
} from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import PageLoader from "@/components/shared/PageLoader";
import TranslationComponent from "@/components/admin/Translate/TranslationComponent";

const STORAGE_KEY = "translate-english-blog";

type BlockType =
  | "paragraph"
  | "heading"
  | "list"
  | "image"
  | "quote"
  | "callout"
  | "separator";

interface EnglishBlock {
  id: string | number;
  type: BlockType;
  content: any;
  level?: number;
}

type NepaliValue =
  | string
  | string[]
  | { title: string; description: string }
  | null;

const BlockIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "paragraph":
      return <Pilcrow size={14} />;
    case "heading":
      return <Type size={14} />;
    case "list":
      return <List size={14} />;
    case "image":
      return <ImageIcon size={14} />;
    case "quote":
      return <Quote size={14} />;
    case "callout":
      return <Info size={14} />;
    case "separator":
      return <Minus size={14} />;
    default:
      return null;
  }
};

// Normalize any raw block shape coming from the API into a stable
// { id, type, content, level } shape — same as BlogForm/AddBlock expect.
const normalizeEnglishBlock = (raw: any, index: number): EnglishBlock => {
  const type: BlockType = raw?.type || "paragraph";
  const id = raw?.id ?? `${index}-${type}`;

  if (type === "list") {
    const items = Array.isArray(raw?.content)
      ? raw.content
      : Array.isArray(raw?.value)
        ? raw.value
        : [];
    return { id, type, content: items };
  }

  if (type === "callout") {
    const source =
      raw?.content && typeof raw.content === "object"
        ? raw.content
        : (raw ?? {});
    return {
      id,
      type,
      content: {
        title: source?.title ?? "",
        description: source?.description ?? "",
      },
    };
  }

  if (type === "image") {
    const content =
      typeof raw?.content === "string" ? raw.content : (raw?.value ?? "");
    return { id, type, content };
  }

  if (type === "separator") {
    return { id, type, content: null };
  }

  // paragraph / heading / quote
  const content =
    typeof raw?.content === "string"
      ? raw.content
      : typeof raw?.value === "string"
        ? raw.value
        : typeof raw?.text === "string"
          ? raw.text
          : "";
  return { id, type, content, level: raw?.level };
};

// Build the initial Nepali value for a block, matching the shape of its
// English counterpart and pulling in any existing translation if present.
const initialNepaliValueFor = (
  block: EnglishBlock,
  existing: any,
): NepaliValue => {
  if (block.type === "list") {
    if (Array.isArray(existing?.value)) return existing.value;
    if (Array.isArray(existing?.content)) return existing.content;
    return (block.content ?? []).map(() => "");
  }

  if (block.type === "callout") {
    const source = existing?.value ?? existing?.content ?? {};
    return {
      title: typeof source?.title === "string" ? source.title : "",
      description:
        typeof source?.description === "string" ? source.description : "",
    };
  }

  if (block.type === "image" || block.type === "separator") {
    return null;
  }

  // paragraph / heading / quote
  if (typeof existing?.value === "string") return existing.value;
  if (typeof existing?.content === "string") return existing.content;
  return "";
};

const TranslatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync: uploadImageMutate } = useImageUpload();

  const [persistedBlog, setPersistedBlog] = useState<any>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isBlogLoading, setIsBlogLoading] = useState(false);
  const [isSavingTranslation, setIsSavingTranslation] = useState(false);
  const [initializedBlogId, setInitializedBlogId] = useState<string | null>(
    null,
  );
  const loadedBlogIdRef = useRef<string | null>(null);

  const [englishTitle, setEnglishTitle] = useState("");
  const [englishDescription, setEnglishDescription] = useState("");
  const [englishBlocks, setEnglishBlocks] = useState<EnglishBlock[]>([]);

  const [nepaliTitle, setNepaliTitle] = useState("");
  const [nepaliDescription, setNepaliDescription] = useState("");
  const [nepaliValues, setNepaliValues] = useState<NepaliValue[]>([]);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const fileInputRefs = useRef<
    Record<string | number, HTMLInputElement | null>
  >({});
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50);
     };
 
     window.addEventListener("scroll", handleScroll);
 
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);
  useEffect(() => {
    let isMounted = true;

    const loadBlog = async () => {
      const requestedBlogId = searchParams.get("id");
      const storedId = sessionStorage.getItem(STORAGE_KEY);
      const blogIdFromStorage = storedId ? JSON.parse(storedId)?.id : null;
      const blogIdToLoad = requestedBlogId ?? blogIdFromStorage;

      if (!blogIdToLoad) {
        if (isMounted) {
          setPersistedBlog(null);
          setInitializedBlogId(null);
          setHydrated(true);
          setIsBlogLoading(false);
          loadedBlogIdRef.current = null;
        }
        return;
      }

      if (
        loadedBlogIdRef.current === blogIdToLoad &&
        persistedBlog?.id === blogIdToLoad
      ) {
        if (isMounted) setHydrated(true);
        return;
      }

      if (isMounted) {
        setIsBlogLoading(true);
        setPersistedBlog(null);
        setInitializedBlogId(null);
      }

      try {
        const response = await fetch(`/api/blogs/onboarding/${blogIdToLoad}`);
        const json = await response.json();
        const blogData = json?.data ?? null;

        if (!isMounted) return;

        if (blogData) {
          setPersistedBlog(blogData);
          loadedBlogIdRef.current = blogIdToLoad;
          try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(blogData));
          } catch (err) {
            if (process.env.NODE_ENV !== "production") {
              console.error("Failed to persist blog to sessionStorage", err);
            }
          }
        } else {
          try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
              const parsed = JSON.parse(stored);
              if (parsed?.id) {
                setPersistedBlog(parsed);
                loadedBlogIdRef.current = parsed.id;
              }
            }
          } catch (err) {
            if (process.env.NODE_ENV !== "production") {
              console.error(
                "Failed to read persisted blog from sessionStorage",
                err,
              );
            }
          }
        }
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Failed to fetch onboarding blog", err);
        }
      } finally {
        if (isMounted) {
          setHydrated(true);
          setIsBlogLoading(false);
        }
      }
    };

    loadBlog();

    return () => {
      isMounted = false;
    };
  }, [searchParams, persistedBlog?.id]);

  const blogId = persistedBlog?.id ?? null;

  const rawTitle =
    persistedBlog?.title ?? persistedBlog?.translations?.[0]?.title ?? "";
  const rawDescription =
    persistedBlog?.description ??
    persistedBlog?.translations?.[0]?.description ??
    "";
  const rawContent =
    persistedBlog?.content ?? persistedBlog?.translations?.[0]?.content ?? [];

  const rawBlocks = useMemo(() => {
    if (Array.isArray(rawContent)) return rawContent;
    if (Array.isArray(rawContent?.blocks)) return rawContent.blocks;
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedBlog]);

  const existingNepaliTranslation = useMemo(() => {
    const translations = Array.isArray(persistedBlog?.translations)
      ? persistedBlog.translations
      : [];
    return translations.find((item: any) => {
      const language = String(item?.language ?? "").toLowerCase();
      return language === "ne" || language === "np" || language === "nepali";
    });
  }, [persistedBlog?.translations]);

  useEffect(() => {
    if (!persistedBlog || !blogId) return;
    if (initializedBlogId === blogId) return;

    setInitializedBlogId(blogId);

    const normalizedEnglish = rawBlocks.map((b: any, i: number) =>
      normalizeEnglishBlock(b, i),
    );
    setEnglishTitle(rawTitle);
    setEnglishDescription(rawDescription);
    setEnglishBlocks(normalizedEnglish);

    setNepaliTitle(existingNepaliTranslation?.title ?? "");
    setNepaliDescription(existingNepaliTranslation?.description ?? "");

    const existingNepaliContent = Array.isArray(
      existingNepaliTranslation?.content,
    )
      ? existingNepaliTranslation.content
      : [];

    setNepaliValues(
      normalizedEnglish.map((block: EnglishBlock, i: number) =>
        initialNepaliValueFor(block, existingNepaliContent[i]),
      ),
    );
  }, [
    blogId,
    initializedBlogId,
    persistedBlog,
    rawBlocks,
    rawTitle,
    rawDescription,
    existingNepaliTranslation,
  ]);

  // ---- English block updates ----
  const updateEnglishBlock = (index: number, patch: Partial<EnglishBlock>) => {
    setEnglishBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, ...patch } : b)),
    );
  };

  const updateEnglishListItem = (
    index: number,
    itemIndex: number,
    value: string,
  ) => {
    setEnglishBlocks((prev) =>
      prev.map((b, i) => {
        if (i !== index) return b;
        const items = [...(Array.isArray(b.content) ? b.content : [])];
        items[itemIndex] = value;
        return { ...b, content: items };
      }),
    );
  };

  const addEnglishListItem = (index: number) => {
    setEnglishBlocks((prev) =>
      prev.map((b, i) =>
        i === index ? { ...b, content: [...(b.content ?? []), ""] } : b,
      ),
    );
  };

  const removeEnglishListItem = (index: number, itemIndex: number) => {
    setEnglishBlocks((prev) =>
      prev.map((b, i) =>
        i === index
          ? {
              ...b,
              content: (b.content ?? []).filter(
                (_: any, idx: number) => idx !== itemIndex,
              ),
            }
          : b,
      ),
    );
  };

  const handleImageReplace = async (index: number, file: File) => {
    try {
      const image = await uploadImageMutate(file);
      updateEnglishBlock(index, { content: image.imagePath });
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to replace image:", err);
      }
    }
  };

  // ---- Nepali value updates ----
  const updateNepaliValue = (index: number, value: NepaliValue) => {
    setNepaliValues((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  const getNepaliListText = (value: NepaliValue) => {
    if (Array.isArray(value)) return value.join("\n");
    return "";
  };

  const handleNepaliListTextChange = (index: number, text: string) => {
    const items = text
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    updateNepaliValue(index, items);
  };

  const updateNepaliCallout = (
    index: number,
    patch: Partial<{ title: string; description: string }>,
  ) => {
    setNepaliValues((prev) =>
      prev.map((v, i) => {
        if (i !== index) return v;
        const current = (
          v && typeof v === "object" && !Array.isArray(v)
            ? v
            : { title: "", description: "" }
        ) as { title: string; description: string };
        return { ...current, ...patch };
      }),
    );
  };

  // ---- Build save payload ----
  const buildEnglishContent = () => {
    return englishBlocks.map((block) => ({
      id: block.id,
      type: block.type,
      ...(block.type === "heading" && { level: block.level ?? 1 }),
      content: block.content,
    }));
  };

  const buildNepaliContent = () => {
    return englishBlocks.map((block, index) => ({
      id: block.id,
      type: block.type,
      ...(block.type === "heading" && { level: block.level ?? 1 }),
      content: nepaliValues[index],
    }));
  };

  const validateTranslationFields = () => {
    if (!englishTitle.trim() || !nepaliTitle.trim()) {
      setSubmitError(
        "Please add both English and Nepali titles before saving.",
      );
      return false;
    }

    if (!englishDescription.trim() || !nepaliDescription.trim()) {
      setSubmitError(
        "Please add both English and Nepali descriptions before saving.",
      );
      return false;
    }

    if (englishBlocks.length === 0) {
      setSubmitError("Add at least one content block before saving.");
      return false;
    }

    const hasIncompleteContent = englishBlocks.some((block, index) => {
      if (
        block.type === "heading" ||
        block.type === "paragraph" ||
        block.type === "quote"
      ) {
        return (
          !String(block.content ?? "").trim() ||
          !String(nepaliValues[index] ?? "").trim()
        );
      }

      if (block.type === "list") {
        const englishItems = (
          Array.isArray(block.content) ? block.content : []
        ).filter(Boolean);
        const nepaliItems = (
          Array.isArray(nepaliValues[index]) ? nepaliValues[index] : []
        ).filter(Boolean);
        return (
          englishItems.length === 0 ||
          englishItems.length !== nepaliItems.length
        );
      }

      return false;
    });

    if (hasIncompleteContent) {
      setSubmitError(
        "Please complete the English and Nepali versions of each content block before saving.",
      );
      return false;
    }

    return true;
  };

  const handleTranslationSave = async () => {
    if (!blogId || isSavingTranslation) return;
    setSubmitError(null);
    setSuccessMsg(null);
    setIsSavingTranslation(true);

    if (!validateTranslationFields()) {
      return;
    }

    const payload = {
      translations: [
        {
          language: "en",
          title: englishTitle,
          description: englishDescription,
          content: buildEnglishContent(),
        },
        {
          language: "ne",
          title: nepaliTitle,
          description: nepaliDescription,
          content: buildNepaliContent(),
        },
      ],
    };

    try {
      const response = await fetch(`/api/blogs/complete/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || "Failed to save translation");
      }

      setSuccessMsg("Translation saved successfully!");
      router.push("/admin");
    } catch (error: any) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Translation save failed", error);
      }
      setSubmitError(error.message || "Failed to save translation");
    } finally {
      setIsSavingTranslation(false);
    }
  };

  if (isBlogLoading && !persistedBlog?.id && !hydrated) {
    return (
      <PageLoader
        title="Loading translation editor"
        subtitle="Fetching the selected blog from the database."
      />
    );
  }
  

  return (
    <div className="min-h-screen bg-[#EBECD8]/70 px-3 lg:px-8 py-4 lg:py-6">
      <div className={`mb-4 lg:mb-6 flex items-center justify-between sticky top-0  gap-2 flex-wrap `}>
        <button
          type="button"
          onClick={() => setShowLeaveConfirm(true)}
          className="flex items-center gap-2 border-2 border-[#1f1f1f] bg-[#1f1f1f] px-3 py-2 text-xs lg:text-sm text-[#f8f3d8] shadow-[4px_4px_0_#1f1f1f] transition-all hover:-translate-y-0.5 hover:bg-[#2b2b2b]"
        >
          <ArrowLeft size={16} />
          Back to admin
        </button>

        <button
          type="button"
          disabled={!blogId || isSavingTranslation}
          onClick={() => handleTranslationSave()}
          className="flex items-center justify-center gap-2 rounded-none border-2 border-[#1f1f1f] bg-[#1f1f1f] px-4 py-2 text-xs lg:text-sm font-semibold text-[#f8f3d8] shadow-[4px_4px_0_#1f1f1f] transition-all hover:-translate-y-0.5 hover:bg-[#2b2b2b] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSavingTranslation ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            "Save Translation"
          )}
        </button>
      </div>

      <ConfirmDialog
        open={showLeaveConfirm}
        title="Leave without saving?"
        message="If you leave now, the current translation changes will be lost. Continue back to admin?"
        confirmText="Leave"
        onConfirm={() => {
          setShowLeaveConfirm(false);
          router.push("/admin");
        }}
        onCancel={() => setShowLeaveConfirm(false)}
      />

      {submitError && (
        <div className="mb-4 px-3 lg:px-4 py-2 bg-red-100 border border-red-400 text-red-700 text-xs lg:text-sm">
          {submitError}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 px-3 lg:px-4 py-2 bg-green-100 border border-green-400 text-green-700 text-xs lg:text-sm">
          {successMsg}
        </div>
      )}

      {!blogId ? (
        <div className="border shadow shadow-black bg-white p-6 text-center text-xs lg:text-sm text-gray-500">
          No blog loaded for translation. Go back and open a blog to translate.
        </div>
      ) : (
        <div className="w-full overflow-hidden border-2 border-[#1f1f1f] bg-[#fcfaf1]/95 shadow-[8px_8px_0_#1f1f1f]">
          {/* Column headers */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <h2 className="border-b-2 lg:border-b-0 lg:border-r-2 border-[#1f1f1f] bg-[#1f1f1f] px-4 lg:px-8 py-3 text-base lg:text-xl font-semibold text-[#f8f3d8]">
              English
            </h2>
            <h2 className="bg-[#d8c26a] px-4 lg:px-8 py-3 text-base lg:text-xl font-semibold text-[#1f1f1f]">
              Nepali
            </h2>
          </div>

          <TranslationComponent
            setEnglishTitle={setEnglishTitle}
            setNepaliTitle={setNepaliTitle}
            englishTitle={englishTitle}
            nepaliTitle={nepaliTitle}
            setEnglishDescription={setEnglishDescription}
            setNepaliDescription={setNepaliDescription}
            englishDescription={englishDescription}
            nepaliDescription={nepaliDescription}
            englishBlocks={englishBlocks}
            nepaliValues={nepaliValues}
            updateEnglishBlock={updateEnglishBlock}
            updateNepaliValue={updateNepaliValue}
            updateNepaliCallout={updateNepaliCallout}
            addEnglishListItem={addEnglishListItem}
            removeEnglishListItem={removeEnglishListItem}
            updateEnglishListItem={updateEnglishListItem}
            handleNepaliListTextChange={handleNepaliListTextChange}
            getNepaliListText={getNepaliListText}
            handleImageReplace={handleImageReplace}
            fileInputRefs={fileInputRefs}
            handleTranslationSave={handleTranslationSave}
            BlockIcon={BlockIcon}
            ImageIcon={ImageIcon}
          />
        </div>
      )}
    </div>
  );
};

export default TranslatePage;