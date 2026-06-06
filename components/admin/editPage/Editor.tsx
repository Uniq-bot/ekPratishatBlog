"use client";
import { useAdminUI } from "@/context/AdminContext";
import BlogEditor from "../BlogEditor";
import {
  useEditableBlog,
  useGetCategory,
  useGetTags,
} from "@/hooks/useAdminBlogs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Editor = ({ id }: { id: string }) => {
  const router = useRouter();
  const { blocks, setBlocks, user } = useAdminUI();
  const { data: tags } = useGetTags();
  const { data: categories } = useGetCategory();
  const { data: blog, isLoading } = useEditableBlog(id);

  return (
    <div className="w-full min-h-screen px-10 relative py-10 flex items-start flex-col">
      <button
        className="flex items-center cursor-pointer hover:bg-gray-100 gap-1 px-3 py-2 transition-all mb-6"
        onClick={() => router.push("/admin")}
      >
        <ArrowLeft size={20} />
        Back to Admin
      </button>
      <BlogEditor
        mode="edit"
        initialBlog={blog}
        isLoading={isLoading}
        blocks={blocks}
        setBlocks={setBlocks}
        user={user}
        tags={tags ?? []}
        categories={categories ?? []}
      />
    </div>
  );
};

export default Editor;
