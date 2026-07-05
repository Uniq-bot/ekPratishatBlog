"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Link2 } from "lucide-react";

import { BlogItem } from "@/types/blog";
import { useTrackBlogView } from "@/hooks/useTrackViews";

interface Props {
  relatedBlogs: BlogItem[];
}

const RelatedBlogs = ({ relatedBlogs }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const trackView = useTrackBlogView();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    blog: BlogItem
  ) => {
    e.preventDefault();
    trackView(blog);
  };

  return (
    <div className="w-full h-full lg:w-[35%] lg:sticky lg:top-5 text-black">
      {/* Mobile Toggle */}
      <button
        aria-label={isOpen ? "Close related blogs" : "Open related blogs"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed top-4 right-3 z-110 rounded-md border bg-white p-2 shadow-md lg:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Desktop */}
   <section className="  p-4 sm:p-5 lg:p-5">
      <div className="flex items-center gap-3 border-b border-[#f0e3bd] pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f9efc5] text-[#c9981a]">
          <Link2 size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a6b12]">
            Related
          </p>
          <h2 className="text-lg font-bold text-black">Popular Posts</h2>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {relatedBlogs.map((blog, index) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            onClick={(e) => handleClick(e, blog)}
            className="group flex items-start gap-3 rounded-xl border border-transparent px-2 py-3 transition-all duration-300 hover:border-[#eadcb4] hover:bg-[#fffdf8]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f9efc5] text-sm font-semibold text-[#8a6b12]">
              {index + 1}
            </span>

            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="line-clamp-2 text-sm leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-[15px]">
                {blog.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[100] h-full w-72 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <h2 className="mb-5 text-2xl font-bold">Related Blogs</h2>

          <div className="space-y-3">
            {relatedBlogs.length ? (
              relatedBlogs.slice(0, 6).map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  onClick={(e) => handleClick(e, blog)}
                  className="group block rounded-lg border p-3 transition-all hover:border-amber-400 hover:bg-amber-50"
                >
                  <p className="mb-2 text-xs font-semibold uppercase text-amber-700">
                    {blog.category?.name}
                  </p>

                  <h3 className="line-clamp-2 font-semibold group-hover:text-amber-700">
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-xs text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No related blogs found.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RelatedBlogs;