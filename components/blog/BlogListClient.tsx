"use client";

import React from "react";
import BlogCard from "./BlogCard";

const BlogListClient = ({
  blogs,
  isLoading,
  page,
  totalCount,
  limit,
  onPageChange,
}: {
  blogs: any[];
  isLoading?: boolean;
  page: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
}) => {
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-full h-40 bg-neutral-200 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 px-4 sm:px-0">

      {blogs?.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="text-gray-500 w-full text-center">No blogs found.</p>
      )}

      {/* PAGINATION */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} | Total {totalCount}
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="px-3 py-1 border disabled:opacity-50"
          >
            Prev
          </button>

          <button className="px-3 py-1 border bg-[#FEE685]">{page}</button>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="px-3 py-1 border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogListClient;