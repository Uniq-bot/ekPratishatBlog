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
const totalPages = Math.ceil(totalCount / limit);



  return (
    <div className="w-full flex flex-col gap-5 px-4 sm:px-0">
      {blogs?.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="text-gray-500 w-full text-center">No blogs found.</p>
      )}

      <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} | Total {totalCount}
        </div>

     <div className="flex gap-2 items-center">
  <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
    Prev
  </button>

  {[...Array(totalPages)].map((_, i) => {
    const pageNum = i + 1;
    return (
      <button
        key={pageNum}
        onClick={() => onPageChange(pageNum)}
        className={`px-3 py-1 border ${page === pageNum ? "bg-[#FEE685]" : ""}`}
      >
        {pageNum}
      </button>
    );
  })}

  <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
    Next
  </button>
</div>
      </div>
    </div>
  );
};

export default BlogListClient;
