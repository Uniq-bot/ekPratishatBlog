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
      <section className="hidden lg:block rounded-2xl border border-[#e7d6ab] bg-white/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3 border-b border-[#f0e3bd] pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f9efc5] text-[#c9981a]">
            <Link2 size={18} />
          </span>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a6b12]">
              Related
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {relatedBlogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              onClick={(e) => handleClick(e, blog)}
              className="group rounded-xl border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,246,236,0.92)_100%)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8b24a] hover:shadow-[0_14px_30px_rgba(201,152,26,0.12)]"
            >
              <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full border border-[#f0d98c] bg-[#fffaf0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm">
                  {blog.category?.name}
                </span>

                <h3 className="line-clamp-2 text-base font-semibold leading-snug transition-colors group-hover:text-[#7a5a09] sm:text-lg">
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