"use client";
import React, { useEffect, useMemo } from "react";
import BlogCard from "./BlogCard";
import { useBlogs } from "@/context/BlogListContext";
import RootLoading from "@/app/loading";

const BlogListClient = () => {
  const { filteredBlogs, page, setPage, totalPages, totalCount, sortFilter, loading } = useBlogs();
  const currentPage = page;

  const pageItems = useMemo(() => {
    const items = [...filteredBlogs];

    items.sort((a, b) => {
      const aTime = a.createdAtTimestamp ?? 0;
      const bTime = b.createdAtTimestamp ?? 0;
      return sortFilter === "oldest" ? aTime - bTime : bTime - aTime;
    });

    return items;
  }, [filteredBlogs, sortFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setPage(totalPages);
    }
  }, [currentPage, setPage, totalPages]);

  return (
  <div className="w-full min-h-screen flex flex-col gap-5 px-4 sm:px-0">

    {loading ? (
      <RootLoading />
    ) : (
      <>
        {pageItems.map((blog, index) => (
          <BlogCard key={blog.id ?? index} blog={blog} />
        ))}
          {/* Pagination controls */}
    <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
      <div className="text-sm text-gray-600">
        Showing{" "}
        {filteredBlogs.length === 0
          ? 0
          : (currentPage - 1) * 4 + 1}{" "}
        - {(currentPage - 1) * 4 + filteredBlogs.length} of {totalCount}
      </div>

      <div className="flex gap-2 items-center overflow-auto">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setPage(pageNum)}
              className={`px-3 py-1 border ${
                pageNum === currentPage ? "bg-[#FEE685] text-black" : ""
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
      </>
    )}

  
  </div>
);
};

export default BlogListClient;