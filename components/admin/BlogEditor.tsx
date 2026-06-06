"use client";
import React, { useEffect, useState } from "react";
import AddBlock from "./CreateBlog/AddBlock";
import BlogForm from "./CreateBlog/BlogForm";
import PreviewBlog from "./CreateBlog/PreviewBlog";
import { useCreateBlog, useUpdateBlog } from "@/hooks/useAdminBlogs";
import { useRouter } from "next/navigation";

const BlogEditor = ({
  mode = "create",
  initialBlog,
  isLoading,
  tags,
  blocks,
  setBlocks,
  categories,
  user,
}: {
  mode?: "create" | "edit";
  initialBlog?: any;
  isLoading?: boolean;
  tags: any[];
  blocks: any[];
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  categories: any[];
  user: any;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tagsValue, setTagsValue] = useState<any[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // AddBlock panel state
  const [blockType, setBlockType] = useState("heading");
  const [setLevel, setSetLevel] = useState(1);
  const [content, setContent] = useState("");

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
    if (mode === "edit" && initialBlog?.data) {
      const blog = initialBlog.data;
      setTitle(blog.title ?? "");
      setDescription(blog.description ?? "");
      setCategoryId(blog.categoryID ?? blog.categoryId ?? "");
      setTagsValue(blog.tags ?? []);
      // content is stored as JSON — extract blocks array
      const raw = blog.content;
      const parsedBlocks = Array.isArray(raw)
        ? raw
        : raw?.blocks
        ? raw.blocks
        : typeof raw === "string"
        ? (() => { try { return JSON.parse(raw); } catch { return []; } })()
        : [];
      setBlocks(parsedBlocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, initialBlog]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId("");
    setTagsValue([]);
    setBlocks([]);
    setBlockType("heading");
    setSetLevel(1);
    setContent("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMsg(null);

    if (!title.trim()) { setSubmitError("Title is required"); return; }
    if (!categoryId) { setSubmitError("Please select a category"); return; }
    if (blocks.length === 0) { setSubmitError("Add at least one content block"); return; }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      slug,
      categoryId,
      tags: tagsValue,
      authorID: user?.id,
      content: blocks,
    };

    try {
      if (mode === "edit") {
        const blogId = initialBlog?.data?.id;
        await updateBlog({ id: blogId, ...payload });
        setSuccessMsg("Blog updated successfully!");
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        await createBlog(payload);
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
    <div className={`w-full ${mode === "edit" ? "px-0" : "px-0"} min-h-full relative flex gap-5`}>
      {/* Editor panel */}
      <div className="w-full transition-all min-h-[calc(100%-5px)] border shadow shadow-black py-5 bg-[#EBECD8]/50 relative z-20">
        <h1 className="text-xl border-r border border-l-0 bg-[#DBDBB8] w-fit px-10 py-2">
          {mode === "create" ? "Create" : "Edit"} Blog
        </h1>

        {submitError && (
          <div className="mx-10 mt-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700 text-sm">
            {submitError}
          </div>
        )}
        {successMsg && (
          <div className="mx-10 mt-4 px-4 py-2 bg-green-100 border border-green-400 text-green-700 text-sm">
            {successMsg}
          </div>
        )}

        <form className="w-[90%] m-auto px-10" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="w-full flex flex-col gap-2 my-5">
            <label className="text-sm font-medium">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full pl-2 border h-10 outline-none text-lg"
              placeholder="Blog title..."
            />
          </div>

          {/* Slug (auto) */}
          <div className="w-full flex flex-col gap-2 my-5">
            <label className="text-sm font-medium text-gray-500">Slug (auto)</label>
            <input
              value={slug}
              disabled
              className="w-full border pl-2 text-gray-400 h-10 outline-none text-sm bg-gray-50"
            />
          </div>

          {/* Description */}
          <div className="w-full flex flex-col gap-2 my-5">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-2 border outline-none text-sm p-2 resize-y min-h-[80px]"
              placeholder="Short description shown in blog cards..."
            />
          </div>

          {/* Tags */}
          <div className="w-full flex flex-col gap-2 my-5">
            <label className="text-sm font-medium">Tags</label>
            <div className="flex flex-wrap gap-2">
              {(tags ?? []).map((t: any) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`border py-1 px-3 text-sm transition-colors hover:cursor-pointer ${
                    tagsValue.some((tag) => tag.id === t.id)
                      ? "bg-[#e3e37b] border-yellow-500"
                      : "bg-[#DBDBB8]/60 hover:bg-[#CFCFC0]"
                  }`}
                >
                  {t.name}
                </button>
              ))}
              {(!tags || tags.length === 0) && (
                <span className="text-sm text-gray-400">No tags yet — create some in Tags &amp; Categories</span>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="w-full flex flex-col gap-2 my-5">
            <label className="text-sm font-medium">Category *</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border pl-2 text-gray-600 h-10 outline-none"
            >
              <option value="">Select Category</option>
              {(categories ?? []).map((cat: any) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Blocks */}
          <BlogForm blocks={blocks} setBlocks={setBlocks} />

          <button
            type="submit"
            disabled={isBusy}
            className="px-6 py-2 bg-white border shadow shadow-black hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {isBusy
              ? mode === "edit" ? "Updating..." : "Posting..."
              : mode === "edit" ? "Update Blog" : "Post Blog"}
          </button>
        </form>
      </div>

      {/* Right panel */}
      <div className="w-[40%] flex flex-col gap-5">
        <AddBlock
          setBlocks={setBlocks}
          setBlockType={setBlockType}
          blockType={blockType}
          setLevel={setLevel}
          setSetLevel={setSetLevel}
          content={content}
          setContent={setContent}
        />
        <PreviewBlog blocks={blocks} />
      </div>
    </div>
  );
};

export default BlogEditor;
