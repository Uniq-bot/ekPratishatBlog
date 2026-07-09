"use client";
import React from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  blogs: any[];
  page: number;
  totalCount: number;
  limit: number;
  category?: string;
  tag?: string;
  sort?: string;
  search?: string;
  idx?: number;
  currentLanguage?: string;
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
  idx = 0,
  currentLanguage = "en",
}: Props) => {
  const totalPages = Math.ceil(totalCount / limit);
  const router = useRouter();
  const pathname = usePathname();
  const isEnglish = currentLanguage === "en";

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
    const url = qs ? `${pathname}?${qs}` : pathname;
    router.push(url, { scroll: false });
  };

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);
    if (sort && sort !== "latest") params.set("sort", sort);
    if (search) params.set("search", search);
    if (newPage > 1) params.set("page", String(newPage));
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <section className="w-full px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-7 flex flex-col gap-4 border-b border-[#f0e3bd] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          <p className={
            isEnglish
              ? "text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]"
              : "text-lg font-semibold uppercase  text-[#8a6b12]"
          }>
            {isEnglish ? "BLOGS" : "ब्लगहरू"}
          </p>
          <h2 className="text-2xl font-black text-black sm:text-3xl">
            {isEnglish ? "Blogs of Your Interest" : "नवीनतम पोस्ट पढ्नुहोस्"}
          </h2>
        </div>

        <div className="flex items-center gap-3 border border-[#eadcb4] bg-[#fffdf7] px-3 py-2 shadow-sm">
          <label className="text-sm font-semibold text-black/70" htmlFor="sort-select">
            {isEnglish ? "Sort" : "क्रमबद्ध गर्नुहोस्"}
          </label>
          <select
            id="sort-select"
            className="bg-transparent text-sm font-semibold text-black outline-none"
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
          >
            <option value="latest">{isEnglish ? "Latest" : "नयाँ"}</option>
            <option value="oldest">{isEnglish ? "Oldest" : "पुरानो"}</option>
          </select>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        {blogs?.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog.id} blog={blog} idx={idx} currentLanguage={currentLanguage} />)
        ) : (
          <p className="w-full py-10 text-center text-sm text-gray-500">
            {isEnglish ? "No posts found." : "कुनै पोस्ट फेला परेन।"}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-3 text-black">
          {page > 1 && (
            <Link
              href={buildUrl(page - 1)}
              scroll={false}
              className="rounded-full border border-[#c9981a] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#c9981a] hover:text-black"
            >
              {isEnglish ? "Previous" : "अघिल्लो"}
            </Link>
          )}

          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            return (
              <Link
              scroll={false}

                key={pageNum}
                href={buildUrl(pageNum)}
                className={`border px-4 py-2 text-sm font-semibold transition-colors ${
                  page === pageNum
                    ? "border-[#fee685] bg-[#fee685] text-black"
                    : "border-[#d8c79b] hover:border-[#c9981a]"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          {page < totalPages && (
            <Link
              href={buildUrl(page + 1)}
              scroll={false}
              className="rounded-full border border-[#c9981a] px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#c9981a] hover:text-black"
            >
              {isEnglish ? "Next" : "अर्को"}
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default BlogList;