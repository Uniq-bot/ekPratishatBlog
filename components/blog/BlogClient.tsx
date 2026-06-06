"use client";
import BlogHero from "@/components/blog/BlogHero";
import BlogListClient from "@/components/blog/BlogListClient";
import LatestBlogs from "@/components/blog/LatestBlogs";
import BlogFilters from "@/components/shared/BlogFilters";
import { useBlogs, useLatestBlogs } from "@/hooks/useBlogs";
import { useBlogUi } from "@/context/BlogListContext";
import { useDebounce } from "@/hooks/useDebounce";

const BlogClient = () => {
  const { tag, category, searchQuery, page, setPage } = useBlogUi();
  const debouncedSearch = useDebounce(searchQuery, 400);

  const { blogs, isLoading } = useBlogs({
    page,
    limit: 10,
    tags: tag !== "all" ? [tag] : [],
    category: category !== "all" ? category : "all",
  });

  const { latestBlogs } = useLatestBlogs();

  return (
    <div className="w-full min-h-screen flex bg-[#F7F3EA] md:pl-30 md:pr-20">
      <div className="lg:w-[65%] min-h-screen relative lg:p-10 flex flex-col">
        <BlogHero />
        <div className="lg:mb-10 relative lg:top-10 z-10 top-30 pb-10 w-[90%] m-auto h-full flex flex-col gap-10">
          <BlogFilters />
          <BlogListClient
            blogs={blogs?.posts ?? []}
            isLoading={isLoading}
            page={page}
            totalCount={blogs?.totalCount ?? 0}
            limit={10}
            onPageChange={setPage}
          />
        </div>
      </div>
      <div className="lg:w-[35%] absolute lg:relative h-screen p-10">
        <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} />
      </div>
    </div>
  );
};

export default BlogClient;