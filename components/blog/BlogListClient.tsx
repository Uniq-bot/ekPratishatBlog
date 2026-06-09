"use client";

import React from "react";
import BlogCard from "./BlogCard";
import RelatedBlogs from "./RelatedBlogs";

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
     <div className="w-full flex  gap-10 lg:flex-row">
      <div className="w-full lg:w-[65%] flex flex-col gap-5">
         {blogs?.length > 0 ? (
        blogs.map((blog) => <BlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="text-gray-500 w-full text-center">No blogs found.</p>
      )}
      </div>
      <div className="w-full lg:w-[35%]">
        
      </div>
     </div>

      <div className="w-full flex sm:flex-row items-center justify-center mt-4 gap-5">
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

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
      </div>
    </div>
  );
};

export default BlogListClient;
