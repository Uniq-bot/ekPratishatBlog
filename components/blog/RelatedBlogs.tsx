"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {motion} from "framer-motion";
import { Calendar } from "lucide-react";
const RelatedBlogs = ({ relatedBlogs }: { relatedBlogs: any }) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // lock body scroll when mobile panel open

  return (
    <div className="w-full lg:w-[35%] h-full text-black">
      {/* Mobile toggle button */}
      <button
        aria-label={isOpen ? "Close related" : "Open related"}
        onClick={() => setIsOpen((s) => !s)}
        className="fixed top-4 right-3 z-50 p-2 bg-white border shadow-md lg:hidden text-sm"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold hidden lg:block">
        Related Blogs
      </h1>
      <div className="w-full flex flex-col gap-2 mt-3 lg:mt-5 hidden lg:flex">
        {relatedBlogs.length > 0 ? (
          relatedBlogs.slice(0, 3).map((blog: any) => {
            return (
           <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
               whileHover={{
                x:10
                
               }}
              >
                <Link
                  href={`/blog/${blog.slug ?? blog.id}`}
                  className="flex gap-10 py-4 justify-between flex-col px-5 cursor-pointer border border-b-5 border-[#EBC044] transition-all group p-2 hover:border-[#FEE685] bg-[#21201C]/50 backdrop-blur-lg"
                >
                  <div className="flex flex-col gap-4">
                    <p className="border border-[#FFD07E] bg-[rgba(255,253,248,0.94)] shadow-md ring-1 ring-[#36332e] backdrop-blur-sm uppercase font-semibold w-fit px-2 py-1 text-xs text-black">
                      {blog.category?.name || "Uncategorized"}
                    </p>
                    <h2 className="text-xl text-white font-medium group-hover:text-[#d69406] transition-all line-clamp-2">
                      {blog.title}
                    </h2>
                  </div>
                  <p className="flex items-center gap-1 text-sm text-white/70">
                    <Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString() }
                  </p>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <p>No related blogs found.</p>
        )}
      </div>

      {/* Mobile sliding panel */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-40 transform transition-transform duration-300 shadow-lg md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4">
          <h1 className="text-2xl mb-4">Related Blogs</h1>
          <div className="w-full flex flex-col gap-2">
            {relatedBlogs.length > 0 ? (
              relatedBlogs.slice(0, 6).map((blog: any) => (
                <div
                  key={blog.id}
                  onClick={() => {
                    router.push(`/blog/${blog.slug ?? blog.id}`);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setIsHovered(blog.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`w-full h-30 transition-all cursor-pointer ${isHovered === blog.id ? "bg-amber-200" : "bg-white"}  flex items-center gap-2 p-2 justify-between`}
                >
                  <div className="w-20 h-full">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h1 className="text-base font-semibold">{blog.title}</h1>
                    </div>
                    <span className="text-xs text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No related blogs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogs;
