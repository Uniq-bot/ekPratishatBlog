"use client";

import BlogHero from "@/components/blog/BlogHero";
import BlogListClient from "@/components/blog/BlogList";
import LatestBlogs from "@/components/blog/LatestBlogs";
import BlogFilters from "@/components/shared/BlogFilters";
import NewsLetter from "./NewsLetter";
import { useRouter, useSearchParams } from "next/navigation";

const BlogClient = ({
  blogs,
  latestBlogs,
  categories,
  tags,
  page,
  category,
  tag,
  search,
  sort,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const updateUrl = (key, value) => {
    const newParams = new URLSearchParams(params.toString());

    newParams.set(key, value);

    // reset page on filter change
    if (key !== "page") {
      newParams.set("page", "1");
    }

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#2E2E2E] md:px-20">

      <div className="lg:w-full min-h-100 flex gap-5">
        <BlogHero />

        <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} />
      </div>

      <div className="lg:mb-10 relative lg:top-10 pb-10 w-[90%] m-auto flex flex-col gap-10">

        {/* FILTERS */}
        <BlogFilters
          categories={categories}
          tags={tags}
          onCategoryChange={(val) => updateUrl("category", val)}
          onTagChange={(val) => updateUrl("tag", val)}
          onSearchChange={(val) => updateUrl("search", val)}
          onSortChange={(val) => updateUrl("sort", val)}
        />

        <div className="w-full flex gap-5">

          {/* BLOG LIST */}
          <BlogListClient
            blogs={blogs.posts}
            page={page}
            totalCount={blogs.totalCount}
            limit={10}
            onPageChange={(p) => updateUrl("page", String(p))}
          />

          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default BlogClient;