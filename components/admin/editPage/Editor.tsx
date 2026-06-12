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
import { useEffect } from "react";

const Editor = ({ id }: { id: string }) => {
  const router = useRouter();
  const { blocks, setBlocks, user } = useAdminUI();
  const { data: tags } = useGetTags({ initialTags: [] });
  const { data: categories } = useGetCategory({ initialCategories: [] });
  const { data: blog, isLoading } = useEditableBlog(id);

  // Clear shared blocks when leaving the edit page so the
  // Create Blog tab always starts empty
  useEffect(() => {
    return () => {
      setBlocks([]);
    };
  }, [setBlocks]);

  return (
    <div className="w-full min-h-screen px-3 sm:px-6 lg:px-10 relative py-6 lg:py-10 flex items-start flex-col">
      <button
        className="flex items-center cursor-pointer hover:bg-gray-100 gap-1 px-2 lg:px-3 py-2 text-sm transition-all mb-4 lg:mb-6"
        onClick={() => router.push("/admin")}
      >
        <ArrowLeft size={18} className="lg:w-5 lg:h-5" />
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