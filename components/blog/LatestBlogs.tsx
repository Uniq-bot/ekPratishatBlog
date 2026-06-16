"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LatestBlogs = ({ latestBlogs = [] }: { latestBlogs?: BlogItem[] }) => {
  const router = useRouter();
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    blog: BlogItem,
  ) => {
    e.preventDefault();

    const sessionId = localStorage.getItem("sessionId") || crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);

    const key = `viewed-${blog.id}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "true");
      fetch("/api/blogs/views", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: blog.id, sessionId }),
      }).catch(() => {});
    }

    router.push(`/blog/${blog.slug}`);
  };
  return (
    <>
      {latestBlogs.slice(0, 4).map((blog) => (
        <Link
          href={`/blog/${blog.slug}`}
          key={blog.id}
          onClick={(e) => handleClick(e, blog)}
          className="flex flex-col justify-between rounded-lg w-90  overflow-hidden shadow-2xl group h-90 bg-white"
        >
          <div className="w-full md:w-full relative h-48 md:h-48 overflow-hidden shrink-0">
            <Image
              src={blog?.coverImage ?? "/logo.png"}
              alt={blog?.title ?? "Blog cover"}
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-0 bg-black font-semibold text-white px-3 py-2 text-md">
              {blog?.category?.name}
            </span>
          
          </div>
          <div className="flex flex-col gap-1 p-4">
            <h3 className="text-xl  text-black">{blog?.title}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} />
              {new Date(blog?.createdAt).toLocaleDateString()}
            </div>
          </div>
          <p className="text-sm px-4 pb-10 text-gray-700 line-clamp-3 group-hover:text-[#ae993e] group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1">
            Read more <ArrowRight size={16} />
          </p>
        </Link>
      ))}
    </>
  );
};

export default LatestBlogs;
