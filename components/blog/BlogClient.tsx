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
  sort,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateUrl = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    console.log(categories)

    // reset pagination when filters change
    if (key !== "page") {
      params.set("page", "1");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#2E2E2E] md:px-20">

      {/* HERO */}
      <div className="lg:w-full min-h-100 flex gap-5">
        <BlogHero />
        <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} />
      </div>

      {/* MAIN */}
      <div className="lg:mb-10 relative lg:top-10 pb-10 w-[90%] m-auto flex flex-col gap-10">

        {/* FILTERS (URL-driven) */}
        <BlogFilters
          categories={categories}
          tags={tags}
          category={category}
          tag={tag}
          sort={sort}
          onCategoryChange={(val) => updateUrl("category", val)}
          onTagChange={(val) => updateUrl("tag", val)}
          onSortChange={(val) => updateUrl("sort", val)}
        />

        <div className="w-full flex gap-5">

          {/* BLOG LIST (server-fed data only) */}
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