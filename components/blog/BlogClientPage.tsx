"use client";
import React from "react";
import type { BlogItem, Category, Tag } from "@/types/blog";
import CuratedBlog from "./CuratedBlog";
import PopularBlogs from "./PopulatBlogs";
import LatestBlogs from "./LatestBlogs";
import SearchFilter from "./SearchFilter";
import CategoryNav from "./CategoryNav";
import BlogList from "./BlogList";
import BannerAd from "./BannerAds";
import { useLanguage } from "@/context/ClientLanguageContext";

interface BlogClientPageProps {
  curatedBlog: BlogItem | null;
  latestBlogs: { posts: BlogItem[] };
  popularBlogs: { posts: BlogItem[] };
  BannerAds?: any | null;
  AsideAds?: any | null;
  ads: any[];
  categories: Category[];
  tags: Tag[];
  blogs: { posts: BlogItem[]; totalCount: number };
  page: number;
  category?: string;
  tag?: string;
  sort: "latest" | "oldest";
  search?: string;
}

const BlogClientPage = ({
  curatedBlog,
  latestBlogs,
  popularBlogs,
  BannerAds,
  ads,
  categories,
  blogs,
  page,
  category,
  tag,
  sort,
  search,
}: BlogClientPageProps) => {
  const { currentLanguage, idx } = useLanguage();
  const isEnglish = currentLanguage === "en";

  return (
    <div className="flex min-h-screen w-full flex-col bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe0_100%)]">
      <div className="relative w-full overflow-hidden px-4 pb-12 pt-24 sm:pt-28 md:px-16 lg:px-10 lg:pt-30">
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-6 lg:gap-8">
          <div className="text-center">
            <p
              className={`mx-auto mb-3 inline-flex rounded-full border border-[#eadcb4] bg-[#fffaf0] px-4 py-1 font-semibold uppercase text-[#8a6b12] ${
                isEnglish
                  ? "text-xs tracking-[0.22em]"
                  : "text-sm tracking-normal"
              }`}
            >
              {isEnglish
                ? "Your Guide to Real Estate"
                : "रियल-स्टेटको लागि तपाईंको मार्गदर्शक"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 leading-none sm:gap-4">
              <h1
                className={`font-black ${
                  isEnglish
                    ? "text-[1.75rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem]"
                    : "text-[2.2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[5.6rem] xl:text-[6.5rem]"
                }`}
              >
                {isEnglish ? "REAL-ESTATE" : "घरजग्गा"}
              </h1>
              <span
                className={`flex flex-col font-black leading-none ${isEnglish ? "text-[1.75rem] sm:text-[2rem] lg:text-[3rem]" : "text-[1.95rem] sm:text-[2.4rem] lg:text-[3.4rem]"}`}
              >
                <span className="text-transparent [-webkit-text-stroke:2px_#f1c810]">
                  {isEnglish ? "MADE" : "सम्बन्धी"}
                </span>
                <span className="bg-clip-text text-transparent bg-[#c7c7c6] [-webkit-text-stroke:1px_#7b7b7b]">
                  {isEnglish ? "CLEAR" : "स्पष्ट जानकारी"}
                </span>
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-stretch">
            <div className="overflow-hidden h-60 md:h-full  border border-[#eadcb4] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <CuratedBlog
                idx={idx}
                currentLanguage={currentLanguage}
                curatedBlog={curatedBlog}
              />
            </div>
           { BannerAds && (
            <div className="relative h-20 w-full block lg:hidden overflow-hidden border border-[#eadcb4] bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:h-40">
              <BannerAd BannerAds={BannerAds} />
            </div>)}
            <div className=" border border-[#eadcb4] lg:block hidden bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              <PopularBlogs
                idx={idx}
                currentLanguage={currentLanguage}
                popularBlogs={popularBlogs?.posts ?? []}
              />
            </div>
            <div className=" border border-[#eadcb4]  lg:hidden bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
              {latestBlogs?.posts.length > 0 && (
                <div className="border border-[#eadcb4] bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-5">
                  <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#f0e3bd] pb-3">
                    <div>
                      <h2
                        className={`font-black text-black ${isEnglish ? "text-xl" : "text-[1.35rem] sm:text-[1.6rem]"}`}
                      >
                        {isEnglish ? "Latest Blogs" : "नयाँ ब्लगहरू"}
                      </h2>
                    </div>
                    <span
                      className={`hidden font-semibold text-black/60 lg:flex ${isEnglish ? "text-sm" : "text-base"}`}
                    >
                      {latestBlogs.posts.slice(0, 2).length}{" "}
                      {isEnglish ? "posts" : "पोस्टहरू"}
                    </span>
                  </div>
                  <LatestBlogs
                    idx={idx}
                    latestBlogs={latestBlogs?.posts ?? []}
                    ads={ads}
                  />
                </div>
              )}
            </div>
          </div>
          {BannerAds ? (
            <div className="relative h-20 w-full hidden lg:block overflow-hidden border border-[#eadcb4] bg-white/90 shadow-[0_18px_45px_rgba(15,23,42,0.06)] md:h-40">
              <BannerAd BannerAds={BannerAds} />
            </div>
          ) : (
            <div className="border border-[#eadcb4] bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6 lg:p-7">
              <p
                className={`font-semibold uppercase text-[#8a6b12] ${isEnglish ? "text-sm tracking-[0.18em]" : "text-base tracking-normal"}`}
              >
                {isEnglish ? "BLOGS / GUIDES" : "ब्लगहरू / मार्गदर्शनहरू"}
              </p>
              <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-2">
                  <h2
                    className={`font-black leading-tight text-black ${isEnglish ? "text-2xl sm:text-3xl lg:text-4xl" : "text-[1.45rem] sm:text-[1.8rem] lg:text-[2.2rem]"}`}
                  >
                    {isEnglish
                      ? "Practical property guidance for buyers, sellers, and investors."
                      : "किन्ने, बेच्ने, र लगानीकर्ताहरूको लागि व्यावहारिक सम्पत्ति मार्गदर्शन।"}
                  </h2>
                  <p
                    className={`max-w-2xl leading-6 text-black/65 ${isEnglish ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}
                  >
                    {isEnglish
                      ? "Search the latest articles, filter by category, and read the updates that matter most."
                      : "नवीनतम लेखहरू खोज्नुहोस्, कोटिहरू अनुसार फिल्टर गर्नुहोस्, र सबैभन्दा महत्त्वपूर्ण अपडेटहरू पढ्नुहोस्।"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className=" border border-[#eadcb4] lg:hidden block bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <PopularBlogs
              idx={idx}
              currentLanguage={currentLanguage}
              popularBlogs={popularBlogs?.posts ?? []}
            />
          </div>
          <div className=" border border-[#eadcb4] hidden lg:block bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            {latestBlogs?.posts.length > 0 && (
              <div className="border border-[#eadcb4] bg-white/95 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#f0e3bd] pb-3">
                  <div>
                    <h2
                      className={`font-black text-black ${isEnglish ? "text-xl" : "text-[1.35rem] sm:text-[1.6rem]"}`}
                    >
                      {isEnglish ? "Latest Blogs" : "नयाँ ब्लगहरू"}
                    </h2>
                  </div>
                
                </div>
                <LatestBlogs
                  idx={idx}
                  latestBlogs={latestBlogs?.posts ?? []}
                  ads={ads}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-5">
            <SearchFilter
              category={category}
              tag={tag}
              search={search}
              idx={idx}
              currentLanguage={currentLanguage}
            />
            <CategoryNav
              totalCounts={blogs.totalCount}
              categories={categories}
              idx={idx}
              currentLanguage={currentLanguage}
            />
            <BlogList
              blogs={blogs.posts}
              page={page}
              totalCount={blogs.totalCount}
              limit={4}
              category={category}
              tag={tag}
              sort={sort}
              search={search}
              idx={idx}
              currentLanguage={currentLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogClientPage;
