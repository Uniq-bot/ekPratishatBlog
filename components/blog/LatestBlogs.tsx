"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import Image from "next/image";
import { useTrackBlogView } from "@/hooks/useTrackViews";

const LatestBlogs = ({ latestBlogs = [] }: { latestBlogs?: BlogItem[] }) => {
  const trackView = useTrackBlogView();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    blog: BlogItem,
  ) => {
    e.preventDefault();
    trackView(blog);
  };
  return (
    <>
      {latestBlogs.map((blog, index) => (
        <Link
          href={`/blog/${blog.slug}`}
          key={blog.id}
          onClick={(e) => handleClick(e, blog)}
          className={`group flex w-full flex-col overflow-hidden rounded-2xl border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,247,239,0.96)_100%)] shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8b24a] hover:shadow-[0_16px_36px_rgba(201,152,26,0.12)] ${index >= 2 ? "hidden lg:flex" : ""}`}
        > 
          <div className="relative h-28 w-full overflow-hidden shrink-0 sm:h-32 lg:h-40">
            <Image
              src={blog?.coverImage ?? "/logo.png"}
              alt={blog?.title ?? "Blog cover"}
              width={320}
              height={320}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {blog?.category?.name}
            </span>
          
          </div>
          <div className="flex h-fit flex-col gap-2 p-4">
            <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-black sm:text-base lg:text-lg">{blog?.title}</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} />
              {new Date(blog?.createdAt).toLocaleDateString()}
            </div>
          </div>
          
        </Link>
      ))}
    </>
  );
};

export default LatestBlogs;
