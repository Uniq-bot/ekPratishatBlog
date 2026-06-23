"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
          className={`flex flex-col rounded-lg min-[1000px]:w-70 w-1/2   overflow-hidden shadow-sm   ${index === 2 ? "hidden md:flex" : ""}  lg:shadow-lg group h-50  min-[1000px]:h-80 bg-white`}
        > 
          <div className="w-full lg:w-full relative h-24 lg:h-48 overflow-hidden shrink-0">
            <Image
              src={blog?.coverImage ?? "/logo.png"}
              alt={blog?.title ?? "Blog cover"}
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-0 bg-black font-semibold text-white lg:px-3  py-1 text-xs lg:py-2 lg:text-lg">
              {blog?.category?.name}
            </span>
          
          </div>
          <div className="flex flex-col h-full gap-1 lg:p-4 p-1">
            <h3 className=" text-sm lg:text-xl   text-black">{blog?.title}</h3>
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
