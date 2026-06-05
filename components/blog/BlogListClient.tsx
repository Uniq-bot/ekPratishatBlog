"use client";

import React from "react";
import BlogCard from "./BlogCard";

const BlogListClient = ({ blogs }: { blogs: any[] }) => {

  console.log(blogs)
  const page = 1;
  const totalPages = 1;
  const totalCount = 0;

  return (
    <div className="w-full flex flex-col gap-5 px-4 sm:px-0">

      {/* BLOG LIST */}
      {blogs?.length > 0 ? (
        blogs?.map((blog) => (
          <BlogCard key={blog?.id} blog={blog} />
        ))
      ) : (
        <p className="text-gray-500 w-full text-center">
          No blogs found.
        </p>
      )}

      {/* PAGINATION (ONLY UI, NO LOGIC) */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">

        <div className="text-sm text-gray-600">
          Page {page} of {totalPages} | Total {totalCount}
        </div>

        <div className="flex gap-2 items-center">

          <button
            disabled
            className="px-3 py-1 border disabled:opacity-50"
          >
            Prev
          </button>

          <button className="px-3 py-1 border bg-[#FEE685]">
            {page}
          </button>

          <button
            disabled
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