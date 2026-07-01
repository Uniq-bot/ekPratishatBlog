
import BlogList from "@/components/blog/BlogList";
import LatestBlogs from "@/components/blog/LatestBlogs";
import PopularBlogs from "@/components/blog/PopulatBlogs";
import NewsLetter from "@/components/blog/NewsLetter";
import {
  getAds,
  getBlogs,
  getCategory,
  getCuratedBlog,
  getLatestBlogs,
  getPopularBlogs,
  getTags,
} from "@/data/getBlogs";
import CategoryNav from "@/components/blog/CategoryNav";
import SearchFilter from "@/components/blog/SearchFilter";
import CuratedBlog from "@/components/blog/CuratedBlog";
import AsideAd from "@/components/blog/AsideAd";
import BannerAd from "@/components/blog/BannerAds";
import { prisma } from "@/libs/prisma";
import Test from "@/components/Test";
import Button from "@/components/Button";

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

  const [blogs, latestBlogs, popularBlogs, categories, tags, ads, curatedBlog] =
    await Promise.all([
      getBlogs({ page, category, tag, sort, search }),
      getLatestBlogs(),
      getPopularBlogs(),
      getCategory(),
      getTags(),
      getAds(),
      getCuratedBlog(),
    ]);
  const AsideAds = ads.find((ad) => ad.AdType === "ASIDE");
  const BannerAds = ads.find((ad) => ad.AdType === "BANNER");
 

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF]">
      {/* HERO */}
      <div className="w-full pt-24 sm:pt-28 lg:pt-30 pb-10 lg:pb-30 min-h-100 relative flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-8 md:px-16 lg:px-50">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,246,240,1)_0%,rgba(245,242,236,0.95)_35%,rgba(235,231,225,0.85)_65%,rgba(216,213,208,0.7)_85%,rgba(192,191,186,0.9)_100%)]" />

        <div className="relative w-full text-center flex flex-wrap justify-center items-center leading-none gap-2 sm:gap-4">
          <h1 className="text-[1.75rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] font-black">
            REAL-ESTATE
          </h1>
          <span className="flex flex-col text-[1.75rem] sm:text-[2rem] lg:text-[3rem] leading-none font-black">
            <h2 className="text-outline-yellow">MADE</h2>
            <h2 className="text-outline-silver">CLEAR</h2>
          </span>
        </div>

        <div className="relative  w-full h-60 md:h-100  lg:h-150 items-center justify-center flex flex-col md:flex-row  md:gap-10">
          <div className="w-full h-full  overflow-hidden md:w-[60%] ">
            <CuratedBlog curatedBlog={curatedBlog} />
          </div>
          {AsideAds && (
           
              <AsideAd AsideAds={AsideAds} />
           
          )}
        </div>

        <div className="w-full relative h-40 md:h-60 md:mt-15 mt-5 flex  gap-6 sm:gap-8 lg:gap-10 items-center justify-center">
          {latestBlogs?.posts.length > 0 && (
            <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} />
          )}
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-20 lg:px-30 bg-[#fbf7ef]/50 relative pb-10 pt-10 border-t border-t-[#b1782e]/40 w-full m-auto flex flex-col">
        {BannerAds && (
          <div className="w-full h-20 md:h-40 mb-10">
            <BannerAd BannerAds={BannerAds} />
          </div>
        )}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10">
          <div className="lg:w-[60%] w-full mb-10 flex flex-col gap-5">
            
            <SearchFilter category={category} tag={tag} search={search} />
            <CategoryNav categories={categories} />
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
          </div>

          <div className="lg:w-[40%] w-full md:sticky md:top-18.75 h-fit flex flex-col gap-8 p-5">
            <PopularBlogs popularBlogs={popularBlogs?.posts ?? []} />
            <NewsLetter />
          </div>
        </div>
      </div>
    </div>
  );
}