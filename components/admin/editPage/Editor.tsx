"use client";

import { useAdminUI } from "@/context/AdminContext";
import BlogEditor from "@/components/admin/BlogEditor";
import { useGetCategory, useGetTags } from "@/hooks/useAdminBlogs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface Props {
  id: string;
  // Pre-fetched on the server — no client-side loading needed on first render
  initialBlog: any;
}

const Editor = ({ id, initialBlog }: Props) => {
  const { blocks, setBlocks, user } = useAdminUI();

  // Seed with server data; React Query keeps fresh if needed
  const { data: tags = [] } = useGetTags({ initialTags: [] });
  const { data: categories = [] } = useGetCategory({ initialCategories: [] });

  // Clear shared blocks when leaving so Create Blog tab starts empty
  useEffect(() => {
    return () => {
      setBlocks([]);
    };
  }, [setBlocks]);

  return (
    <div className="w-full bg-[#f5f5f5] min-h-screen px-3 sm:px-6 lg:px-10 relative py-6 lg:py-10 flex items-start flex-col">
      <Link
        href="/admin"
        className="flex items-center hover:bg-gray-100 gap-1 px-2 lg:px-3 py-2 text-sm transition-all mb-4 lg:mb-6"
      >
        <ArrowLeft size={18} className="lg:w-5 lg:h-5" />
        Back to Admin
      </Link>

      <BlogEditor
        mode="edit"
        initialBlog={{ data: initialBlog }}
        isLoading={false}
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