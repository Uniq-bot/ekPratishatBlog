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
  AsideAds,
  ads,
  categories,
  tags,
  blogs,
  page,
  category,
  tag,
  sort,
  search,
}: BlogClientPageProps) => {
  const { currentLanguage, handleLanguageChange, idx } = useLanguage();

  console.log(currentLanguage);
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF]">
      {/* HERO */}
      <div className="relative w-full overflow-hidden   pt-24 pb-12  sm:pt-28 md:px-16 lg:px-10 lg:pt-30">
       

        <div className="relative z-10 w-full px-4  lg:w-[85%] m-auto flex  flex-col gap-6 lg:gap-8">
          <div className="text-center">
            <p
              className={
                currentLanguage === "en"
                  ? "mx-auto rounded-2xl mb-3 inline-flex -full border border-[#eadcb4] bg-[#fffaf0] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b12]"
                  : "mx-auto rounded-2xl mb-3 inline-flex -full border border-[#eadcb4] bg-[#fffaf0] px-4 py-1 text-sm font-semibold uppercase  text-[#8a6b12]"
              }
            >
              {currentLanguage === "en"
                ? "Your Guide to Real Estate"
                : "रियल-स्टेटको लागि तपाईंको मार्गदर्शक"}
            </p>
            <div className="relative w-full text-center flex flex-wrap justify-center items-center leading-none gap-2 sm:gap-4">
              <h1
                className={
                  currentLanguage === "en"
                    ? "text-[1.75rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] font-black"
                    : "text-[2rem] sm:text-[2.75rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem] font-black"
                }
              >
                {currentLanguage === "en" ? "REAL-ESTATE" : "घरजग्गा"}
              </h1>
              <span
                className={
                  currentLanguage === "en"
                    ? "flex flex-col text-[1.75rem] sm:text-[2rem] lg:text-[3rem] leading-none font-black"
                    : "flex flex-col text-[2rem] sm:text-[2.25rem] lg:text-[3.25rem] leading-none font-black"
                }
              >
                <h2 className="text-outline-yellow">
                  {currentLanguage === "en" ? "MADE" : "सम्बन्धी"}
                </h2>
                <h2 className="text-outline-silver">
                  {currentLanguage === "en" ? "CLEAR" : "स्पष्ट जानकारी"}
                </h2>
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.35fr_0.8fr] lg:items-stretch">
            <div className="overflow-hidden  border border-[#eadcb4] bg-white shadow-sm">
              <CuratedBlog
                idx={idx}
                currentLanguage={currentLanguage}
                curatedBlog={curatedBlog}
              />
            </div>
            <div className=" border border-[#eadcb4] bg-white/95 shadow-sm">
              <PopularBlogs
                idx={idx}
                currentLanguage={currentLanguage}
                popularBlogs={popularBlogs?.posts ?? []}
              />
            </div>
          </div>

          {latestBlogs?.posts.length > 0 && (
            <div className="-3xl border border-[#eadcb4] bg-white/95 p-4  sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#f0e3bd] pb-3">
                <div>
                  <p
                    className={
                      currentLanguage === "en"
                        ? "text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]"
                        : "text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6b12]"
                    }
                  >
                    {currentLanguage === "en"
                      ? "Latest Blogs"
                      : "नवीनतम ब्लगहरू"}
                  </p>
                  <h2
                    className={
                      currentLanguage === "en"
                        ? "text-xl font-bold text-black"
                        : "text-2xl font-bold text-black"
                    }
                  >
                    {" "}
                    {currentLanguage === "en" ? "Fresh reads" : "ताजा पढाइहरू"}
                  </h2>
                </div>
                <span
                  className={
                    currentLanguage === "en"
                      ? "text-sm hidden lg:flex  font-semibold text-black/60"
                      : "text-base hidden lg:flex  font-semibold text-black/60"
                  }
                >
                  {currentLanguage === "en"
                    ? `${latestBlogs.posts.slice(0, 2).length} posts`
                    : `${latestBlogs.posts.slice(0, 2).length} पोस्टहरू`}
                </span>
              </div>
              <div className="w-full">
                <LatestBlogs
                  idx={idx}
                  latestBlogs={latestBlogs?.posts ?? []}
                  ads={ads}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="relative  lg:w-[80%] m-auto   px-4 pb-12  sm:px-6  lg:px-0">
          {BannerAds && (
            <div className="relative z-10 mb-8 h-20 w-full overflow-hidden  shadow-xl shadow-black/30  bg-white/90  md:h-40">
              <BannerAd BannerAds={BannerAds} />
            </div>
          )}

          <div className="relative z-10 mb-8 flex flex-col gap-3 -3xl border border-[#eadcb4] bg-white/90 p-5  sm:p-6 lg:p-7">
            <p
              className={
                currentLanguage === "en"
                  ? "text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6b12]"
                  : "text-base font-semibold uppercase  text-[#8a6b12]"
              }
            >
              {currentLanguage === "en"
                ? "BLOGS / GUIDES"
                : "ब्लगहरू / मार्गदर्शनहरू"}
            </p>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-2">
                <h2
                  className={
                    currentLanguage === "en"
                      ? "text-2xl font-black leading-tight text-black sm:text-3xl lg:text-4xl"
                      : "text-3xl font-black leading-tight text-black sm:text-4xl lg:text-5xl"
                  }
                >
                  {currentLanguage === "en"
                    ? "Practical property guidance for buyers, sellers, and investors."
                    : "किन्ने, बेच्ने, र लगानीकर्ताहरूको लागि व्यावहारिक सम्पत्ति मार्गदर्शन।"}
                </h2>
                <p
                  className={
                    currentLanguage === "en"
                      ? "max-w-2xl text-sm leading-6 text-black/65 sm:text-base"
                      : "max-w-2xl text-base leading-7 text-black/65 sm:text-lg"
                  }
                >
                  {currentLanguage === "en"
                    ? "Search the latest articles, filter by category, and read the updates that matter most."
                    : "नवीनतम लेखहरू खोज्नुहोस्, कोटिहरू अनुसार फिल्टर गर्नुहोस्, र सबैभन्दा महत्त्वपूर्ण अपडेटहरू पढ्नुहोस्।"}
                </p>
              </div>
              <div
                className={
                  currentLanguage === "en"
                    ? "-full border border-[#eadcb4] bg-[#fffaf0] px-4 py-2 text-sm font-semibold text-black shadow-sm"
                    : "-full border border-[#eadcb4] bg-[#fffaf0] px-4 py-2 text-base font-semibold text-black shadow-sm"
                }
              >
                {blogs.totalCount}{" "}
                {currentLanguage === "en" ? "Articles" : "लेखहरू"}
              </div>
            </div>
          </div>

          <div className="relative   z-10 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.6fr)] lg:gap-10 items-start">
            <div className="min-w-0 flex flex-col gap-5">
              <SearchFilter
                category={category}
                tag={tag}
                search={search}
                idx={idx}
                currentLanguage={currentLanguage}
              />
              <CategoryNav
                categories={categories}
                idx={idx}
                currentLanguage={currentLanguage}
              />
              <BlogList
                blogs={blogs.posts}
                page={page}
                totalCount={blogs.totalCount}
                limit={10}
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
    </div>
  );
};

export default BlogClientPage;