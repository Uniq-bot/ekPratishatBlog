"use client";

import { useAdminUI } from "@/context/AdminContext";
import BlogEditor from "../BlogEditor";
import {
  useEditableBlog,
  useGetCategory,
  useGetTags,
} from "@/hooks/useAdminBlogs";
import { ArrowLeft } from "lucide-react";

const Editor = ({ id }: { id: string }) => {
  console.log("blog id in editor", id);
  const { blocks, setBlocks, user } = useAdminUI();
  const { data: tags } = useGetTags();
  const { data: categories } = useGetCategory();
  const { data: blog, isLoading } = useEditableBlog(id);
  console.log("editable blog", blog);

  return (
    <div className="w-full min-h-screen px-20 relative py-20 flex  items-start flex-col justify-center">
      <button  className=" flex items-center cursor-pointer hover:bg-gray-100   gap-1 px-3 py-2  transition-all" onClick={()=>window.history.back()}>
        <ArrowLeft size={20} />
        back
      </button>
      <BlogEditor
        mode="edit"
        initialBlog={blog}
        isLoading={isLoading}
        blocks={blocks}
        setBlocks={setBlocks}
        user={user}
        tags={tags}
        categories={categories}
      />
    </div>
  );
};

export default Editor;
