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
} from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

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
      raw?.content && typeof raw.content === "object" ? raw.content : raw ?? {};
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
    const content = typeof raw?.content === "string" ? raw.content : raw?.value ?? "";
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
const initialNepaliValueFor = (block: EnglishBlock, existing: any): NepaliValue => {
  if (block.type === "list") {
    if (Array.isArray(existing?.value)) return existing.value;
    if (Array.isArray(existing?.content)) return existing.content;
    return (block.content ?? []).map(() => "");
  }

  if (block.type === "callout") {
    const source = existing?.value ?? existing?.content ?? {};
    return {
      title: typeof source?.title === "string" ? source.title : "",
      description: typeof source?.description === "string" ? source.description : "",
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
  const [initializedBlogId, setInitializedBlogId] = useState<string | null>(null);

  const [englishTitle, setEnglishTitle] = useState("");
  const [englishDescription, setEnglishDescription] = useState("");
  const [englishBlocks, setEnglishBlocks] = useState<EnglishBlock[]>([]);

  const [nepaliTitle, setNepaliTitle] = useState("");
  const [nepaliDescription, setNepaliDescription] = useState("");
  const [nepaliValues, setNepaliValues] = useState<NepaliValue[]>([]);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const fileInputRefs = useRef<Record<string | number, HTMLInputElement | null>>({});

  useEffect(() => {
    const loadBlog = async () => {
      const requestedBlogId = searchParams.get("id");
      const storedId = sessionStorage.getItem(STORAGE_KEY);
      const blogIdFromStorage = storedId ? JSON.parse(storedId)?.id : null;
      const blogIdToLoad = requestedBlogId ?? blogIdFromStorage;

      if (!blogIdToLoad) {
        setHydrated(true);
        return;
      }

      if (requestedBlogId && requestedBlogId !== persistedBlog?.id) {
        setPersistedBlog(null);
        setInitializedBlogId(null);
      }

      try {
        const response = await fetch(`/api/blogs/onboarding/${blogIdToLoad}`);
        const json = await response.json();
        const blogData = json?.data ?? null;

        if (blogData) {
          setPersistedBlog(blogData);
          try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(blogData));
          } catch (err) {
            console.error("Failed to persist blog to sessionStorage", err);
          }
        } else if (!hydrated) {
          try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) setPersistedBlog(JSON.parse(stored));
          } catch (err) {
            console.error("Failed to read persisted blog from sessionStorage", err);
          }
        }
      } catch (err) {
        console.error("Failed to fetch onboarding blog", err);
      } finally {
        setHydrated(true);
      }
    };

    loadBlog();
  }, [searchParams, persistedBlog?.id]);

  const blogId = persistedBlog?.id ?? null;

  const rawTitle = persistedBlog?.title ?? persistedBlog?.translations?.[0]?.title ?? "";
  const rawDescription =
    persistedBlog?.description ?? persistedBlog?.translations?.[0]?.description ?? "";
  const rawContent = persistedBlog?.content ?? persistedBlog?.translations?.[0]?.content ?? [];

  const rawBlocks = useMemo(() => {
    if (Array.isArray(rawContent)) return rawContent;
    if (Array.isArray(rawContent?.blocks)) return rawContent.blocks;
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedBlog]);

  const existingNepaliTranslation = useMemo(() => {
    const translations = Array.isArray(persistedBlog?.translations) ? persistedBlog.translations : [];
    return translations.find((item: any) => {
      const language = String(item?.language ?? "").toLowerCase();
      return language === "ne" || language === "np" || language === "nepali";
    });
  }, [persistedBlog?.translations]);

  useEffect(() => {
    if (!persistedBlog || !blogId) return;
    if (initializedBlogId === blogId) return;

    setInitializedBlogId(blogId);

    const normalizedEnglish = rawBlocks.map((b: any, i: number) => normalizeEnglishBlock(b, i));
    setEnglishTitle(rawTitle);
    setEnglishDescription(rawDescription);
    setEnglishBlocks(normalizedEnglish);

    setNepaliTitle(existingNepaliTranslation?.title ?? "");
    setNepaliDescription(existingNepaliTranslation?.description ?? "");

    const existingNepaliContent = Array.isArray(existingNepaliTranslation?.content)
      ? existingNepaliTranslation.content
      : [];

    setNepaliValues(
      normalizedEnglish.map((block: EnglishBlock, i: number) =>
        initialNepaliValueFor(block, existingNepaliContent[i])
      )
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
    setEnglishBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  };

  const updateEnglishListItem = (index: number, itemIndex: number, value: string) => {
    setEnglishBlocks((prev) =>
      prev.map((b, i) => {
        if (i !== index) return b;
        const items = [...(Array.isArray(b.content) ? b.content : [])];
        items[itemIndex] = value;
        return { ...b, content: items };
      })
    );
  };

  const addEnglishListItem = (index: number) => {
    setEnglishBlocks((prev) =>
      prev.map((b, i) => (i === index ? { ...b, content: [...(b.content ?? []), ""] } : b))
    );
  };

  const removeEnglishListItem = (index: number, itemIndex: number) => {
    setEnglishBlocks((prev) =>
      prev.map((b, i) =>
        i === index
          ? { ...b, content: (b.content ?? []).filter((_: any, idx: number) => idx !== itemIndex) }
          : b
      )
    );
  };

  const handleImageReplace = async (index: number, file: File) => {
    try {
      const image = await uploadImageMutate(file);
      updateEnglishBlock(index, { content: image.imagePath });
    } catch (err) {
      console.error("Failed to replace image:", err);
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
    patch: Partial<{ title: string; description: string }>
  ) => {
    setNepaliValues((prev) =>
      prev.map((v, i) => {
        if (i !== index) return v;
        const current = (
          v && typeof v === "object" && !Array.isArray(v) ? v : { title: "", description: "" }
        ) as { title: string; description: string };
        return { ...current, ...patch };
      })
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
      value: nepaliValues[index],
    }));
  };

  const validateTranslationFields = () => {
    if (!englishTitle.trim() || !nepaliTitle.trim()) {
      setSubmitError("Please add both English and Nepali titles before saving.");
      return false;
    }

    if (!englishDescription.trim() || !nepaliDescription.trim()) {
      setSubmitError("Please add both English and Nepali descriptions before saving.");
      return false;
    }

    if (englishBlocks.length === 0) {
      setSubmitError("Add at least one content block before saving.");
      return false;
    }

    const hasIncompleteContent = englishBlocks.some((block, index) => {
      if (block.type === "heading" || block.type === "paragraph" || block.type === "quote") {
        return !String(block.content ?? "").trim() || !String(nepaliValues[index] ?? "").trim();
      }

      if (block.type === "list") {
        const englishItems = (Array.isArray(block.content) ? block.content : []).filter(Boolean);
        const nepaliItems = (Array.isArray(nepaliValues[index]) ? nepaliValues[index] : []).filter(Boolean);
        return englishItems.length === 0 || englishItems.length !== nepaliItems.length;
      }

      return false;
    });

    if (hasIncompleteContent) {
      setSubmitError("Please complete the English and Nepali versions of each content block before saving.");
      return false;
    }

    return true;
  };

  const handleTranslationSave = async () => {
    if (!blogId) return;
    setSubmitError(null);
    setSuccessMsg(null);

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
      console.error("Translation save failed", error);
      setSubmitError(error.message || "Failed to save translation");
    }
  };

  return (
    <div className="min-h-screen bg-[#EBECD8]/70 px-3 lg:px-8 py-4 lg:py-6">
      <div className="mb-4 lg:mb-6 flex items-center justify-between gap-2 flex-wrap">
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
          disabled={!blogId}
          onClick={() => handleTranslationSave()}
          className="rounded-none border-2 border-[#1f1f1f] bg-[#1f1f1f] px-4 py-2 text-xs lg:text-sm font-semibold text-[#f8f3d8] shadow-[4px_4px_0_#1f1f1f] transition-all hover:-translate-y-0.5 hover:bg-[#2b2b2b] disabled:opacity-50"
        >
          Save Translation
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

          <div className="w-full px-3 lg:px-6 py-4 lg:py-6 space-y-4 lg:space-y-6">
            {/* Title row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              <div className="flex flex-col gap-2 rounded-none border-2 border-[#1f1f1f] bg-[#fffdf5] p-3 lg:p-4 shadow-[4px_4px_0_#1f1f1f]">
                <label className="text-[11px] lg:text-xs font-semibold uppercase tracking-[0.24em] text-[#5a4b12]">Title</label>
                <input
                  value={englishTitle}
                  onChange={(e) => setEnglishTitle(e.target.value)}
                  placeholder="English title"
                  className="h-10 w-full rounded-none border border-[#1f1f1f] bg-white px-3 text-xs lg:text-sm outline-none ring-0 transition focus:border-[#1f1f1f]"
                />
              </div>
              <div className="flex flex-col gap-2 rounded-none border-2 border-[#1f1f1f] bg-[#fffdf5] p-3 lg:p-4 shadow-[4px_4px_0_#1f1f1f]">
                <label className="text-[11px] lg:text-xs font-semibold uppercase tracking-[0.24em] text-[#5a4b12]">Title (Nepali)</label>
                <input
                  value={nepaliTitle}
                  onChange={(e) => setNepaliTitle(e.target.value)}
                  placeholder="Write Nepali title here"
                  className="h-10 w-full rounded-none border border-[#1f1f1f] bg-white px-3 text-xs lg:text-sm outline-none ring-0 transition focus:border-[#1f1f1f]"
                />
              </div>
            </div>

            {/* Description row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              <div className="flex flex-col gap-2 rounded-none border-2 border-[#1f1f1f] bg-[#fffdf5] p-3 lg:p-4 shadow-[4px_4px_0_#1f1f1f]">
                <label className="text-[11px] lg:text-xs font-semibold uppercase tracking-[0.24em] text-[#5a4b12]">Description</label>
                <textarea
                  value={englishDescription}
                  onChange={(e) => setEnglishDescription(e.target.value)}
                  rows={4}
                  className="min-h-24 w-full resize-y rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm outline-none transition focus:border-[#1f1f1f]"
                />
              </div>
              <div className="flex flex-col gap-2 rounded-none border-2 border-[#1f1f1f] bg-[#fffdf5] p-3 lg:p-4 shadow-[4px_4px_0_#1f1f1f]">
                <label className="text-[11px] lg:text-xs font-semibold uppercase tracking-[0.24em] text-[#5a4b12]">Description (Nepali)</label>
                <textarea
                  value={nepaliDescription}
                  onChange={(e) => setNepaliDescription(e.target.value)}
                  placeholder="Write Nepali description here"
                  rows={4}
                  className="min-h-24 w-full resize-y rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm outline-none transition focus:border-[#1f1f1f]"
                />
              </div>
            </div>

            {/* Content blocks */}
            <div className="flex flex-col gap-2">
              <div className="w-full flex items-center justify-between rounded-none border-2 border-[#1f1f1f] bg-[#f7f0d0] px-3 py-2">
                <label className="text-[11px] lg:text-xs font-semibold uppercase tracking-[0.24em] text-[#5a4b12]">Content Blocks</label>
                <span className="text-xs text-gray-400">
                  {englishBlocks.length} block{englishBlocks.length !== 1 ? "s" : ""}
                </span>
              </div>

              {englishBlocks.length === 0 ? (
                <p className="text-xs lg:text-sm text-gray-400 text-center py-6">
                  No content blocks available.
                </p>
              ) : (
                <div className="flex flex-col gap-2 lg:gap-3">
                  {englishBlocks.map((block, index) => {
                    const nepaliValue = nepaliValues[index];

                    return (
                      <div key={block.id} className="rounded-none border-2 border-[#1f1f1f] bg-[#fffdf5] p-3 lg:p-4 shadow-[4px_4px_0_#1f1f1f]">
                        <div className="mb-3 flex items-center gap-1 text-xs lg:text-sm text-gray-600">
                          <BlockIcon type={block.type} />
                          <span className="capitalize">
                            {block.type === "heading" ? `H${block.level ?? 1}` : block.type}
                          </span>
                        </div>

                        {/* HEADING */}
                        {block.type === "heading" && (
                          <>
                            <div className="flex gap-1 flex-wrap mb-2">
                              {[1, 2, 3, 4, 5].map((l) => (
                                <button
                                  key={l}
                                  type="button"
                                  onClick={() => updateEnglishBlock(index, { level: l })}
                                  className={`text-xs px-2 py-0.5 border ${
                                    block.level === l ? "bg-[#d0d05d] border-yellow-500" : "bg-gray-100"
                                  }`}
                                >
                                  H{l}
                                </button>
                              ))}
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                              <input
                                className="w-full rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm outline-none transition focus:border-[#1f1f1f]"
                                placeholder={`Heading ${block.level ?? 1} (English)`}
                                value={block.content ?? ""}
                                onChange={(e) => updateEnglishBlock(index, { content: e.target.value })}
                              />
                              <input
                                className="w-full rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm outline-none transition focus:border-[#1f1f1f]"
                                placeholder={`Heading ${block.level ?? 1} (Nepali)`}
                                value={(nepaliValue as string) ?? ""}
                                onChange={(e) => updateNepaliValue(index, e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {/* PARAGRAPH */}
                        {block.type === "paragraph" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <textarea
                              className="min-h-16 w-full resize-y rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm outline-none transition focus:border-[#1f1f1f]"
                              placeholder="Paragraph (English)"
                              value={block.content ?? ""}
                              onChange={(e) => updateEnglishBlock(index, { content: e.target.value })}
                            />
                            <textarea
                              className="min-h-16 w-full resize-y rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm outline-none transition focus:border-[#1f1f1f]"
                              placeholder="Paragraph (Nepali)"
                              value={(nepaliValue as string) ?? ""}
                              onChange={(e) => updateNepaliValue(index, e.target.value)}
                            />
                          </div>
                        )}

                        {/* QUOTE */}
                        {block.type === "quote" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <textarea
                              className="min-h-20 w-full resize-y rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm italic outline-none transition focus:border-[#1f1f1f]"
                              placeholder="Quote (English)"
                              value={block.content ?? ""}
                              onChange={(e) => updateEnglishBlock(index, { content: e.target.value })}
                            />
                            <textarea
                              className="min-h-20 w-full resize-y rounded-none border border-[#1f1f1f] bg-white p-3 text-xs lg:text-sm italic outline-none transition focus:border-[#1f1f1f]"
                              placeholder="Quote (Nepali)"
                              value={(nepaliValue as string) ?? ""}
                              onChange={(e) => updateNepaliValue(index, e.target.value)}
                            />
                          </div>
                        )}

                        {/* CALLOUT */}
                        {block.type === "callout" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <div className="rounded-none border-2 border-[#1f1f1f] bg-[#f8f3dc] p-3 shadow-[3px_3px_0_#1f1f1f]">
                              <input
                                className="w-full font-bold outline-none bg-transparent mb-2 text-xs lg:text-sm"
                                value={block.content?.title ?? ""}
                                placeholder="Callout title (English)"
                                onChange={(e) =>
                                  updateEnglishBlock(index, {
                                    content: { ...block.content, title: e.target.value },
                                  })
                                }
                              />
                              <textarea
                                className="w-full outline-none bg-transparent resize-none text-xs lg:text-sm"
                                value={block.content?.description ?? ""}
                                placeholder="Callout description (English)"
                                onChange={(e) =>
                                  updateEnglishBlock(index, {
                                    content: { ...block.content, description: e.target.value },
                                  })
                                }
                              />
                            </div>
                            <div className="rounded-none border-2 border-[#1f1f1f] bg-[#f8f3dc] p-3 shadow-[3px_3px_0_#1f1f1f]">
                              <input
                                className="mb-2 w-full bg-transparent text-xs lg:text-sm font-bold outline-none"
                                value={(nepaliValue as any)?.title ?? ""}
                                placeholder="Callout title (Nepali)"
                                onChange={(e) => updateNepaliCallout(index, { title: e.target.value })}
                              />
                              <textarea
                                className="w-full outline-none bg-transparent resize-none text-xs lg:text-sm"
                                value={(nepaliValue as any)?.description ?? ""}
                                placeholder="Callout description (Nepali)"
                                onChange={(e) =>
                                  updateNepaliCallout(index, { description: e.target.value })
                                }
                              />
                            </div>
                          </div>
                        )}

                        {/* LIST */}
                        {block.type === "list" && (
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2 rounded-none border border-[#1f1f1f] bg-[#f8f3dc] p-2">
                              {(Array.isArray(block.content) ? block.content : []).map(
                                (item: string, i: number) => (
                                  <div key={i} className="flex gap-1 items-center">
                                    <span className="text-gray-400 text-xs shrink-0">{i + 1}.</span>
                                    <input
                                      className="flex-1 outline-none p-1 border border-[#1f1f1f] bg-white text-xs lg:text-sm"
                                      value={item}
                                      placeholder={`English item ${i + 1}`}
                                      onChange={(e) => updateEnglishListItem(index, i, e.target.value)}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeEnglishListItem(index, i)}
                                      className="text-gray-400 hover:text-red-500 px-1 shrink-0"
                                    >
                                      ×
                                    </button>
                                  </div>
                                )
                              )}
                              <button
                                type="button"
                                onClick={() => addEnglishListItem(index)}
                                className="self-start mt-1 text-xs font-medium text-[#1f1f1f] underline"
                              >
                                + Add item
                              </button>
                            </div>

                            <div className="flex flex-col gap-2 rounded-none border border-[#1f1f1f] bg-[#f8f3dc] p-2">
                              <textarea
                                className="min-h-24 w-full resize-y rounded-none border border-[#1f1f1f] bg-white p-2 text-xs lg:text-sm outline-none"
                                placeholder="One item per line. Press Enter to add another."
                                value={getNepaliListText(nepaliValue)}
                                onChange={(e) => handleNepaliListTextChange(index, e.target.value)}
                              />
                              <p className="text-[11px] text-gray-500">
                                Each new line becomes a new Nepali list item.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* IMAGE (shared across languages — not per-language text) */}
                        {block.type === "image" && (
                          <div className="flex items-start gap-3">
                            <div
                              onClick={() => fileInputRefs.current[block.id]?.click()}
                              className="relative group w-24 h-24 sm:w-28 sm:h-28 shrink-0 border border-gray-200 overflow-hidden cursor-pointer bg-gray-50"
                              title="Click to replace image"
                            >
                              {block.content ? (
                                <img
                                  src={block.content}
                                  alt="Block preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                  <ImageIcon size={20} />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white text-[10px] font-medium px-1">
                                  Click to replace
                                </span>
                              </div>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={(el) => {
                                  fileInputRefs.current[block.id] = el;
                                }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageReplace(index, file);
                                  e.target.value = "";
                                }}
                              />
                            </div>
                            <p className="text-xs text-gray-400 pt-2">
                              Images are shared across languages — no separate translation needed.
                            </p>
                          </div>
                        )}

                        {/* SEPARATOR */}
                        {block.type === "separator" && (
                          <div className="py-2">
                            <hr />
                            <p className="text-xs text-gray-400 mt-1">
                              Divider — structural only, no translation needed.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleTranslationSave()}
              className="w-full rounded-none border-2 border-[#1f1f1f] bg-[#1f1f1f] px-4 py-2 text-xs lg:text-sm font-semibold text-[#f8f3d8] shadow-[4px_4px_0_#1f1f1f] transition-all hover:-translate-y-0.5 hover:bg-[#2b2b2b]"
            >
              Save Translation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranslatePage;