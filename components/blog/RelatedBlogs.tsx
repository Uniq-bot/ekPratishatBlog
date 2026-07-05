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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, blog: BlogItem) => {
    e.preventDefault();
    trackView(blog);
  };

  return (
    <div className="h-full w-full text-black lg:sticky lg:top-5 lg:w-[35%]">
      <button
        aria-label={isOpen ? "Close related blogs" : "Open related blogs"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed right-3 top-4 z-[110] rounded-full border border-[#eadcb4] bg-white p-2 shadow-md lg:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <section className="hidden rounded-[1.35rem] border border-[#e7d6ab] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(252,248,239,0.95)_100%)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)] lg:block">
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
              className="group rounded-[1rem] border border-[#eadcb4] bg-white/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8b24a] hover:shadow-[0_14px_30px_rgba(201,152,26,0.12)]"
            >
              <div className="flex flex-col gap-2">
                <span className="w-fit rounded-full border border-[#f0d98c] bg-[#fffaf0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f5a12]">
                  {blog.category?.name || "Article"}
                </span>

                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-[15px]">
                  {blog.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`fixed right-0 top-0 z-[100] h-full w-72 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
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
                  className="group block rounded-[1rem] border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,247,239,0.95)_100%)] p-3 transition-all duration-300 hover:border-[#d8b24a]"
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8a6b12]">
                    {blog.category?.name || "Article"}
                  </p>

                  <h3 className="line-clamp-2 font-semibold text-black group-hover:text-[#7a5a09]">
                    {blog.title}
                  </h3>

                  <p className="mt-3 text-xs text-[#8a7a4a]">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500">No related blogs found.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default RelatedBlogs;