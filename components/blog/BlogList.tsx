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
    <div className="w-full flex flex-col gap-5 px-4 sm:px-0">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold text-dblack ">Blogs of your <span className="text-[#f4c91b] bg-black p-2 font-[Girls] underline underline-offset-5">Interest</span></h2>
        <select
          className="bg-[#1d1d1d] p-2 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f4c91b]"
          value={sort}
          onChange={(e) =>  updateParam("sort", e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>{
        
      }
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
        <div className="w-full flex items-center justify-center mt-4 gap-3 text-dblack flex-wrap">
          {page > 1 && (
            <Link
              href={buildUrl(page - 1)}
              className="px-3 py-1 border border-[#C9981A] hover:bg-[#C9981A] hover:text-black transition-colors"
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
                className={`px-3 py-1 border transition-colors ${
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
              className="px-3 py-1 border border-[#C9981A] hover:bg-[#C9981A] hover:text-black transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList;