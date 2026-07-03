"use client"
import React from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { useRouter } from "next/navigation";


interface Props {
  blogs: any[];
  page: number;
  totalCount: number;
  limit: number;
  category?: string;
  tag?: string;
  sort?: string;
  search?: string;
}

const BlogList = ({
  blogs,
  page,
  totalCount,
  limit,
  category,
  tag,
  sort,
  search,
}: Props) => {
  const totalPages = Math.ceil(totalCount / limit);
  const router=useRouter()

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // reset pagination
    params.delete("page");

    const qs = params.toString();
    const url = qs ? `?${qs}` : "?";
    router.push(url, {scroll:false});
  }

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    if (newPage > 1) params.set("page", String(newPage));
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };

 

  return (
    <section className="w-full rounded-3xl border border-[#e7d6ab] bg-white/95 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.05)] sm:p-5 lg:p-6">
      <div className="mb-5 flex flex-col gap-3 border-b border-[#f0e3bd] pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
            Articles
          </p>
          <h2 className="text-2xl font-black text-black sm:text-3xl">
            Blogs of your <span className="bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] px-2 py-1 font-[Girls] text-black underline underline-offset-4">Interest</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-black/70" htmlFor="sort-select">
            Sort
          </label>
          <select
            id="sort-select"
            className="rounded-xl border border-[#d9c8a0] bg-[#fffdf7] px-3 py-2 text-sm font-semibold text-black outline-none transition-colors focus:border-[#c9981a] focus:ring-2 focus:ring-[#f4c91b]/20"
            value={sort}
            onChange={(e) =>  updateParam("sort", e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="w-full flex flex-col gap-5">
        {blogs?.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-gray-400 w-full text-center py-10">
            No blogs found.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-3 text-dblack">
          {page > 1 && (
            <Link
              href={buildUrl(page - 1)}
              className="rounded-full border border-[#C9981A] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#C9981A] hover:text-black"
            >
              ← Prev
            </Link>
          )}

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <Link
                key={pageNum}
                href={buildUrl(pageNum)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  page === pageNum
                    ? "bg-[#FEE685] text-black border-[#FEE685]"
                    : "border-gray-500 hover:border-[#C9981A]"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          {page < totalPages && (
            <Link
              href={buildUrl(page + 1)}
              className="rounded-full border border-[#C9981A] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#C9981A] hover:text-black"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default BlogList;