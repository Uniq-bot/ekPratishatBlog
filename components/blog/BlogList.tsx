import React from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";

const BlogListServer = ({
  blogs,
  page,
  totalCount,
  limit,
  category,
  tag,
}: {
  blogs: any[];
  page: number;
  totalCount: number;
  limit: number;
  category?: string;
  tag?: string;
}) => {
  const totalPages = Math.ceil(totalCount / limit);

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);

    params.set("page", String(newPage));

    return `?${params.toString()}`;
  };

  return (
    <div className="w-2/3 flex flex-col gap-5 px-4 sm:px-0">
      <div className="w-full flex gap-10 lg:flex-row">
        <div className="w-full flex flex-col gap-5">
          {blogs?.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog?.id} blog={blog} />
            ))
          ) : (
            <p className="text-gray-500 w-full text-center">
              No blogs found.
            </p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="w-full flex items-center justify-center mt-4 gap-5 text-white">
        {/* Prev */}
        {page > 1 && (
          <Link href={buildUrl(page - 1)}>
            Prev
          </Link>
        )}

        {/* Page numbers */}
        {[...Array(totalPages)].map((_, i) => {
          const pageNum = i + 1;

          return (
            <Link
              key={pageNum}
              href={buildUrl(pageNum)}
              className={`px-3 py-1 text-black border ${
                page === pageNum ? "bg-[#FEE685]" : ""
              }`}
            >
              {pageNum}
            </Link>
          );
        })}

        {/* Next */}
        {page < totalPages && (
          <Link href={buildUrl(page + 1)}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogListServer;