"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogItem } from "@/types/blog";

const LatestBlogs = ({ latestBlogs = [] }: { latestBlogs?: BlogItem[] }) => {
  return (
    <div className="w-full lg:w-[35%] h-full px-3 sm:px-6 lg:px-10 py-5">  
      {latestBlogs.length === 0 ? (
        <p>No latest blogs found.</p>
      ) : (
        <div className="w-full">
          {latestBlogs.slice(0, 2).map((blog) => {
            const slug = blog.slug ?? blog.id;
            const category = blog.category?.name ?? "Uncategorized";
            const createdAt = new Date(blog.createdAt).toLocaleDateString();

            return (
              <div
                key={blog.id}
              
                className="w-full"
              >
                <Link
                  href={`/blog/${slug}`}
                  className="flex  gap-10 py-4 justify-between flex-col px-5 cursor-pointer border border-b-5 border-[#EBC044] transition-all group p-2 hover:border-[#FEE685] bg-[#21201C]/50 backdrop-blur-lg"
                >
                  <div className="flex flex-col gap-4">
                    <p className="border border-[#FFD07E] bg-[rgba(255,253,248,0.94)] shadow-md ring-1 ring-[#36332e] uppercase font-semibold w-fit px-2 py-1 text-xs text-black">
                      {category}
                    </p>

                    <h2 className="text-xl text-white font-medium group-hover:text-[#d69406] transition-all line-clamp-2">
                      {blog.title}
                    </h2>
                  </div>

                  <p className="flex items-center gap-1 text-sm text-white/70">
                    <Calendar size={16} /> {createdAt}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;