"use client";
import BlogDetailClient from "@/components/blog/BlogDetailClient";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { useBlogs } from "@/context/BlogListContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
const BlogDets = () => {
  const { blogsData } = useBlogs();
  const router=useRouter()
  const { id } = useParams();
  const blog = blogsData.find((b) => b.slug === id);
  const relatedBlog = blogsData.filter((b) => {
    const categoryMatch = b.category === blog.category;
    const tagMatch = b.tags.some((tag: any) => tag === blog.tag);
    const isSameBlog = b.id === blog.id;
    if (isSameBlog) return false;
    return categoryMatch || tagMatch;
  });
  return (
    <div className="w-full min-h-screen bg-[#F7F3EA] lg:p-10 py-5 flex flex-col items-start">
      <div>
        <button
          onClick={() => router.replace("/")}
          className="flex  items-center justify-center gap-2 group text-sm pl-2  transition-all  "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-all"
          >
            <path d="M6 8L2 12L6 16" />
            <path d="M2 12H22" />
          </svg>
          <div className="group-hover:underline flex items-center leading-none">
            <p className="text-gray-500">Blogs</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-1"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
            <p>
              {id}
            </p>
          </div>
        </button>
      </div>
      <div className="w-full flex flex-col md:flex-row justify-between px-4 md:px-20 py-6 gap-8">
        <BlogDetailClient blog={blog} />
        <RelatedBlogs relatedBlogs={relatedBlog} />
      </div>
    </div>
  );
};

export default BlogDets;
