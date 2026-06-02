"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useBlogs } from "@/context/BlogListContext";

const BlogListClient = () => {
  const { filteredBlogs } = useBlogs();

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / itemsPerPage));

  useEffect(() => {
    // Reset to first page when blog list changes
    setCurrentPage(1);
  }, [filteredBlogs]);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredBlogs.slice(start, end);

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 px-4 sm:px-0">
      {pageItems.map((blog, index) => (
        <BlogCard key={blog.id ?? index} blog={blog} />
      ))}

      {/* Pagination controls */}
      <div className="w-full flex flex-col sm:flex-row items-center sm:items-center justify-between mt-4 gap-2">
        <div className="text-sm text-gray-600">
          Showing {start + 1} - {Math.min(end, filteredBlogs.length)} of {filteredBlogs.length}
        </div>

        <div className="flex gap-2 items-center overflow-auto">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1  border disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1  border ${page === currentPage ? "bg-[#FEE685] text-black" : ""}`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1  border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogListClient;