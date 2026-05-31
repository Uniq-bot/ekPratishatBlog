"use client";

import BlogCard from "@/components/blog/BlogCard";
import BlogFilters from "@/components/shared/BlogFilters";
import Pagination from "@/components/shared/Pagination";
import { useBlogList } from "@/context/BlogListContext";

const BlogListClient = () => {
  const {
    categories,
    tags,
    categoryFilter,
    tagFilter,
    dateSort,
    search,
    filteredBlogs,
    pagedBlogs,
    totalPages,
    currentPage,
    setCategoryFilter,
    setTagFilter,
    setDateSort,
    setSearch,
    setPage,
    resetFilters,
  } = useBlogList();

  return (
    <div className="mt-8">
      <BlogFilters
        categories={categories}
        tags={tags}
        categoryFilter={categoryFilter}
        tagFilter={tagFilter}
        dateSort={dateSort}
        search={search}
        resultCount={filteredBlogs.length}
        onCategoryChange={setCategoryFilter}
        onTagChange={setTagFilter}
        onDateSortChange={setDateSort}
        onSearchChange={setSearch}
        onReset={resetFilters}
      />

      <div className="mt-8 min-h-[24rem]">
        {pagedBlogs.length === 0 ? (
          <div className="border border-neutral-200 bg-white p-8 text-sm text-neutral-600">
            No blog posts match the selected filters.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {pagedBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                category={blog.category}
                tags={blog.tags}
              />
            ))}
          </div>
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setPage}
        className="mt-10 flex flex-wrap justify-center gap-2"
      />
    </div>
  );
};

export default BlogListClient;
