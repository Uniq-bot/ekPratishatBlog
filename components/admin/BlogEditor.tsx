"use client";
import React, { useEffect, useRef, useState } from "react";
import AddBlock from "./CreateBlog/AddBlock";
import BlogForm from "./CreateBlog/BlogForm";
import PreviewBlog from "./CreateBlog/PreviewBlog";
import { useCreateBlog, useUpdateBlog } from "@/hooks/useAdminBlogs";
import { useRouter } from "next/navigation";
import { Image, Info } from "lucide-react";
import { Category, Tag } from "@/types/blog";
import GuideModel from "./GuideModel";

const BlogEditor = ({
  mode = "create",
  initialBlog,
  isLoading,
  blocks,
  setBlocks,
  tags: tags,
  isTagLoading,
  categories,
  isCategoryLoading,
  user,
}: {
  mode?: "create" | "edit";
  initialBlog?: any;
  isLoading?: boolean;
  blocks: any[];
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  tags: Tag[];
  isTagLoading: boolean;
  categories: Category[];
  isCategoryLoading: boolean;
  user: any;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tagsValue, setTagsValue] = useState<any[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  // Add ref at the top of the component, with other useState hooks
  const coverImageRef = useRef<HTMLInputElement>(null);
  // AddBlock panel state
  const [blockType, setBlockType] = useState("heading");
  const [setLevel, setSetLevel] = useState(1);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showModel, setShowModal] = useState(false);

  console.log(categories);
  const { mutateAsync: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutateAsync: updateBlog, isPending: isUpdating } = useUpdateBlog();

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Populate fields when editing
  useEffect(() => {
    if (!initialBlog?.data) return;

    const blog = initialBlog.data;

    setTitle(blog.title ?? "");
    setDescription(blog.description ?? "");
    setCategoryId(blog.categoryID ?? blog.categoryId ?? "");
    setTagsValue(blog.tags ?? []);

    const raw = blog.content;

    const parsedBlocks = Array.isArray(raw)
      ? raw
      : raw?.blocks
        ? raw.blocks
        : typeof raw === "string"
          ? JSON.parse(raw)
          : [];

    setBlocks(parsedBlocks);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // In resetForm(), reset the file input via ref
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setTagsValue([]);
    setBlocks([]);
    setBlockType("heading");
    setSetLevel(1);
    setContent("");
    setCoverImage(null);
    if (coverImageRef.current) coverImageRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setSubmitError("Title is required");
      return;
    }
    if (!categoryId) {
      setSubmitError("Please select a category");
      return;
    }
    if (blocks.length === 0) {
      setSubmitError("Add at least one content block");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("slug", slug);
    formData.append("categoryId", categoryId);
    formData.append("tags", JSON.stringify(tagsValue));
    formData.append("authorID", user?.id ?? "");
    formData.append("content", JSON.stringify(blocks)); // blocks as JSON string
    if (coverImage) formData.append("coverImage", coverImage);

    try {
      if (mode === "edit") {
        const blogId = initialBlog?.data?.id;
        await updateBlog({ id: blogId, formData }); // update your hook to accept formData
        setSuccessMsg("Blog updated successfully!");
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        await createBlog(formData); // update your hook to accept formData
        setSuccessMsg("Blog created successfully!");
        resetForm();
      }
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong");
    }
  };

  const toggleTag = (tag: any) => {
    setTagsValue((prev) => {
      const exists = prev.some((t) => t.id === tag.id);
      return exists ? prev.filter((t) => t.id !== tag.id) : [...prev, tag];
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-[500px] border shadow shadow-black bg-[#EBECD8]/50 p-5">
        <div className="h-10 w-40 bg-gray-200 animate-pulse mb-8" />
        <div className="space-y-6 px-10">
          {[...Array(4)].map((_, i) => (
            <div key={i}>
              <div className="h-4 w-24 bg-gray-200 animate-pulse mb-2" />
              <div className="h-10 w-full bg-gray-200 animate-pulse" />
            </div>
          ))}
          <div className="h-48 w-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  const isBusy = isCreating || isUpdating;

  return (
    <div className={`w-full min-h-full relative flex flex-col lg:flex-row gap-4 lg:gap-5 ${showModel ? "overflow-hidden" : ""}`}>
      {/* Editor panel */}
      <div className="w-full lg:flex-1 transition-all min-h-[calc(100%-5px)] border shadow shadow-black py-3 lg:py-5 bg-[#EBECD8]/50 relative z-20">
        <div className="w-full flex items-center justify-between pr-5">
          <h1 className="text-lg lg:text-xl border-r border border-l-0 bg-[#DBDBB8] w-fit px-4 lg:px-10 py-2">
            {mode === "create" ? "Create" : "Edit"} Blog
          </h1>
          <span
          onClick={()=>setShowModal(true)}
            title="Blog content support guide."
            className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
          >
            <Info />
          </span>

        </div>
        {submitError && (
          <div className="mx-3 lg:mx-10 mt-4 px-3 lg:px-4 py-2 bg-red-100 border border-red-400 text-red-700 text-xs lg:text-sm">
            {submitError}
          </div>
        )}
        {successMsg && (
          <div className="mx-3 lg:mx-10 mt-4 px-3 lg:px-4 py-2 bg-green-100 border border-green-400 text-green-700 text-xs lg:text-sm">
            {successMsg}
          </div>
        )}

        <form
          className="w-full lg:w-[90%] m-auto px-3 lg:px-10"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div className="w-full flex flex-col gap-2 my-3 lg:my-5">
            <label className="text-xs lg:text-sm font-medium">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full pl-2 border h-9 lg:h-10 outline-none text-base lg:text-lg"
              placeholder="Blog title..."
            />
          </div>

          <div className="w-full flex flex-col gap-2 my-3 lg:my-5">
            <label className="text-xs lg:text-sm font-medium text-gray-500">
              Slug (auto)
            </label>
            <input
              value={slug}
              disabled
              className="w-full border pl-2 text-gray-400 h-9 lg:h-10 outline-none text-xs lg:text-sm bg-gray-50"
            />
          </div>
          <div className="w-full flex flex-col gap-2 my-3 lg:my-5">
            <label className="text-xs lg:text-sm font-medium ">
              Cover Image
            </label>

            {coverImage ? (
              <div className="relative w-full border bg-gray-50 overflow-hidden">
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="Cover preview"
                  className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setCoverImage(null);
                    if (coverImageRef.current) coverImageRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 hover:bg-black/80 transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="w-full h-32 sm:h-40 lg:h-48 bg-white border relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 flex flex-col items-center gap-1 lg:gap-2 px-2">
                  <Image size={20} className="lg:w-6 lg:h-6" />
                  <p className="text-xs lg:text-sm text-center">
                    Choose the cover Image for the blog post. Recommended size:
                    1200x600px
                  </p>
                </div>
                <input
                  ref={coverImageRef}
                  type="file"
                  accept="image/*"
                  className="w-full border absolute opacity-0 top-0 left-0 right-0 bottom-0 pl-2 h-full text-gray-400 outline-none text-sm bg-gray-50"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-2 my-3 lg:my-5">
            <label className="text-xs lg:text-sm font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-2 border outline-none text-xs lg:text-sm p-2 resize-y min-h-[60px] lg:min-h-[80px]"
              placeholder="Short description shown in blog cards..."
            />
          </div>

          <div className="w-full flex flex-col gap-2 my-3 lg:my-5">
            <label className="text-xs lg:text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-1.5 lg:gap-2">
              {(tags ?? []).map((t: any) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`border py-1 px-2 lg:px-3 text-xs lg:text-sm transition-colors hover:cursor-pointer ${
                    tagsValue.some((tag) => tag.id === t.id)
                      ? "bg-[#e3e37b] border-yellow-500"
                      : "bg-[#DBDBB8]/60 hover:bg-[#CFCFC0]"
                  }`}
                >
                  {t.name}
                </button>
              ))}
              {(!tags || tags.length === 0) && (
                <span className="text-xs lg:text-sm text-gray-400">
                  No tags yet — create some in Tags &amp; Categories
                </span>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col gap-2 my-3 lg:my-5">
            <label className="text-xs lg:text-sm font-medium">Category *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border pl-2 text-gray-600 h-9 lg:h-10 outline-none text-xs lg:text-sm"
            >
              <option value="">Select Category</option>
              {(categories ?? []).map((cat: any) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <BlogForm blocks={blocks} setBlocks={setBlocks} />

          <button
            type="submit"
            disabled={isBusy}
            className="px-4 lg:px-6 py-2 text-xs lg:text-sm bg-white border shadow shadow-black hover:bg-gray-50 disabled:opacity-50 transition-colors w-full sm:w-auto"
          >
            {isBusy
              ? mode === "edit"
                ? "Updating..."
                : "Posting..."
              : mode === "edit"
                ? "Update Blog"
                : "Post Blog"}
          </button>
        </form>
      </div>

      <div className="w-full lg:w-[40%] flex flex-col gap-3 lg:gap-5">
        <AddBlock
          setBlocks={setBlocks}
          setBlockType={setBlockType}
          blockType={blockType}
          setLevel={setLevel}
          setSetLevel={setSetLevel}
          content={content}
          setContent={setContent}
          image={image}
          setImage={setImage}
        />
        <PreviewBlog blocks={blocks} />
      </div>
      {showModel && (
        <GuideModel showModel={showModel} setShowModel={setShowModal} />
      )}
    </div>
  );
};

export default BlogEditor;
