import React from "react";
import BlogCard from "./BlogCard";
import Link from "next/link";

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

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);
    if (sort && sort !== "latest") params.set("sort", sort);
    if (search) params.set("search", search);
    if (newPage > 1) params.set("page", String(newPage));
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };

  return (
    <div className="w-2/3 flex flex-col gap-5 px-4 sm:px-0">
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
        <div className="w-full flex items-center justify-center mt-4 gap-3 text-white flex-wrap">
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