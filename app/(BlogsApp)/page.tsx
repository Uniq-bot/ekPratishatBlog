// "use client";
import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import LatestBlogs from "@/components/blog/LatestBlogs";
import BlogFilters from "@/components/shared/BlogFilters";
import NewsLetter from "@/components/blog/NewsLetter";
import {
  getBlogs,
  getCategory,
  getLatestBlogs,
  getTags,
} from "@/data/getBlogs";
import CategoryNav from "@/components/blog/CategoryNav";
import SearchFilter from "@/components/blog/SearchFilter";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const category = params.category;
  const tag = params.tag;
  const sort = (params.sort as "latest" | "oldest") ?? "latest";
  const search = params.search;

  const [blogs, latestBlogs, categories, tags] = await Promise.all([
    getBlogs({ page, category, tag, sort, search }),
    getLatestBlogs(),
    getCategory(),
    getTags(),
  ]);
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF] md:p-10">
      <div className="lg:w-full min-h-100 flex gap-5">
        <BlogHero />
        <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} />
      </div>

      <div className="lg:mb-10 relative lg:top-10 pb-10 w-[90%] m-auto flex flex-col gap-10">
        <SearchFilter category={category} tag={tag} search={search} />

        <CategoryNav categories={categories} />

        <div className="w-full flex gap-5 relative">
          <BlogList
            blogs={blogs.posts}
            page={page}
            totalCount={blogs.totalCount}
            limit={10}
            category={category}
            tag={tag}
            sort={sort}
            search={search}
          />
          <NewsLetter />
        </div>
      </div>
    </div>
  );
}

// import React from 'react'

// const page = () => {
//   return (
//     <div>
//       <form onSubmit={()=> alert("submitted")}>
//         <button type="submit">
//         Click
//       </button>
//       </form>
//     </div>
//   )
// }

// export default page
