"use client";
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
  const router = useRouter();

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
    params.delete("page");

    const qs = params.toString();
    const url = qs ? `?${qs}` : "?";
    router.push(url, { scroll: false });
  };

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    if (newPage > 1) params.set("page", String(newPage));
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };

  return (
    <section className="w-full  p-4  sm:p-6 lg:px-8 lg:py-7">
      <div className="mb-7 flex flex-col gap-4 border-b-2 border-[#f0e3bd] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8a6b12]">
            Articles
          </p>
          <h2 className="text-2xl font-black text-black sm:text-3xl">
            Blogs of your{" "}
            <span className="bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] px-2 py-1 font-[Girls] text-black underline underline-offset-4">
              Interest
            </span>
          </h2>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-[#eadcb4] bg-[#fffdf7] px-3 py-2 shadow-sm">
          <label className="text-sm font-semibold text-black/70" htmlFor="sort-select">
            Sort
          </label>
          <select
            id="sort-select"
            className="bg-transparent text-sm font-semibold text-black outline-none"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        {blogs?.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="w-full py-10 text-center text-gray-400">No blogs found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 text-black">
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
                    ? "border-[#FEE685] bg-[#FEE685] text-black"
                    : "border-[#d8c79b] hover:border-[#C9981A]"
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