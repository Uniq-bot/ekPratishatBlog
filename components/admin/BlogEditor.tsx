import React, { useEffect, useState } from "react";
import AddBlock from "./CreateBlog/AddBlock";
import BlogForm from "./CreateBlog/BlogForm";
import PreviewBlog from "./CreateBlog/PreviewBlog";
import { useCreateBlog } from "@/hooks/useAdminBlogs";
import { getAuthorId } from "@/libs/auth";

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
  tags: string[];
  blocks: any[];
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  categories: any[];
  user: any;
}) => {
  const [title, setTitle] = useState("");
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const [categoryId, setCategoryId] = useState("");
  const [tagsValue, setTagsValue] = useState<string[]>([]);
  const { mutateAsync } = useCreateBlog();
  // blockss
  const [blockType, setBlockType] = React.useState("heading");
  const [setLevel, setSetLevel] = React.useState(1);
  const [content, setContent] = React.useState("");
  // console.log(getAuthorId())
  useEffect(() => {
    if (mode === "edit" && initialBlog) {
      setTitle(initialBlog.data.title);
      setCategoryId(initialBlog.data.categoryId);
      setTagsValue(initialBlog.data.tags || []);
      setBlocks(initialBlog.data.content.blocks || []);
    }
    console.log("edit blog", initialBlog);
  }, [mode, initialBlog]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user.id);
    const newBlog = {
      title,
      slug: slug,
      categoryId,
      tags,
      authorID: user.id, // Replace with actual author ID retrieval logic
      content: blocks,
    };
    console.log(newBlog);
    try {
      const res = await mutateAsync(newBlog);

      console.log(res.message);

      setTitle("");
      setCategoryId("");
      setTagsValue([]);
      setBlocks([]);
      setBlockType("heading");
      setSetLevel(1);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) {
  return (
    <div className="w-full h-[500px] border shadow shadow-black bg-[#EBECD8]/50 p-5">
      <div className="h-10 w-40 bg-gray-200 animate-pulse mb-8" />

      <div className="space-y-6 px-10">
        <div>
          <div className="h-4 w-20 bg-gray-200 animate-pulse mb-2" />
          <div className="h-10 w-full bg-gray-200 animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-20 bg-gray-200 animate-pulse mb-2" />
          <div className="h-10 w-full bg-gray-200 animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse mb-2" />
          <div className="h-10 w-full bg-gray-200 animate-pulse" />
        </div>

        <div>
          <div className="h-4 w-24 bg-gray-200 animate-pulse mb-2" />
          <div className="h-10 w-full bg-gray-200 animate-pulse" />
        </div>

        <div className="h-48 w-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
  return (
    <div className={`w-full ${mode==="edit"?"px-30":"px-0"}  min-h-full relative flex  gap-5`}>
      <div className="w-full transition-all min-h-[calc(100%-5px)] border shadow shadow-black py-5 bg-[#EBECD8]/50 relative z-20 ">
        <h1 className="text-xl border-r border border-l-0 bg-[#DBDBB8] w-fit  px-10 py-2">
          {mode === "create" ? "Create" : "Edit"} Blog
        </h1>
        <form className="w-[90%] m-auto px-20 " onSubmit={handleSubmit}>
          <div className="w-full flex flex-col gap-2 my-5">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="w-full pl-2 border h-10 outline-none text-lg"
            />
          </div>
          <div className="w-full flex flex-col gap-2 my-5">
            <label>Slug</label>
            <input
              value={slug}
              disabled
              type="text"
              className="w-full border pl-2 text-gray-500 h-10 outline-none text-lg"
            />
          </div>{" "}
          <div className="w-full flex flex-wrap gap-2">
            {tags?.map((t) => (
              <button
                key={t.id} // ✅ FIXED KEY
                onClick={(e) => {
                  e.preventDefault();

                  setTagsValue((prev) => {
                    const exists = prev.some((tag) => tag.id === t.id);

                    if (exists) {
                      return prev.filter((tag) => tag.id !== t.id);
                    } else {
                      return [...prev, t];
                    }
                  });
                }}
                className={`bg-[#DBDBB8]/60 border ${
                  tagsValue.some((tag) => tag.id === t.id) ? "bg-[#e3e37b]" : ""
                } hover:bg-[#CFCFC0] hover:cursor-pointer py-1 px-3`}
              >
                {t.name} {/* ✅ FIXED DISPLAY */}
              </button>
            ))}
          </div>
          <div className="w-full flex flex-col gap-2 my-5">
            <label>Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border pl-2 text-gray-500 h-10 outline-none text-lg"
            >
              <option value="">Select Category</option>
              {categories?.map((cat: any) => (
                <option value={cat.id} key={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>{" "}
          <BlogForm blocks={blocks} setBlocks={setBlocks} />
          <button className="px-4 py-2 bg-white border shadow shadow-black">
            Post Blog
          </button>
        </form>
      </div>
      <div className="w-[40%] flex flex-col gap-5 ">
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
BlogEditor;
export default BlogEditor;
