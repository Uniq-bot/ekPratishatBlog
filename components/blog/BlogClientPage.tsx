"use client";
import React from "react";
import type { BlogItem, Category, Tag } from "@/types/blog";
import CuratedBlog from "./CuratedBlog";
import PopularBlogs from "./PopulatBlogs";
import LatestBlogs from "./LatestBlogs";
import CategoryNav from "./CategoryNav";
import BlogList from "./BlogList";
import BannerAd from "./BannerAds";
import { useLanguage } from "@/context/ClientLanguageContext";
import Link from "next/link";

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
  limit: number;
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
  limit,
  category,
  tag,
  sort,
  search,
}: BlogClientPageProps) => {
  const { currentLanguage, idx } = useLanguage();
  const isEn = currentLanguage === "en";

  return (
    <div className="min-h-screen w-full bg-[#fafaf8]">
      {/* ── Hero masthead ───────────────────────── */}
      <section className="pt-24 sm:pt-28 pb-12 px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Title + category pills */}
          <div className="text-center pb-10 border-b border-[#e8e0cc]">
            <h1
              className={`font-black tracking-tight text-[#1a1610] ${
                isEn
                  ? "text-4xl sm:text-5xl lg:text-6xl"
                  : "text-3xl sm:text-4xl lg:text-5xl"
              }`}
            >
              {isEn
                ? "Your Guide to Real Estate"
                : "घरजग्गा लागि तपाईंको मार्गदर्शक"}
            </h1>

            {categories.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/?category=${cat.slug}`}
                    onClick={() =>
                      setTimeout(
                        () =>
                          document
                            .getElementById("blogs")
                            ?.scrollIntoView({ behavior: "smooth" }),
                        100,
                      )
                    }
                    className=" bg-white border border-[#e8e0cc] px-4 py-1.5 text-sm font-medium text-[#4a4030] transition-all hover:border-[#c9981a] hover:text-[#8a6b12] hover:bg-[#fffaf0]"
                  >
                    {isEn
                      ? cat.name
                      : cat.translations?.[idx]?.name || cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ── Hero grid: featured + popular ────── */}
          <div className="mt-10 flex ">
            {/* Featured blog */}
            <div
              className="overflow-hidden w-full   bg-white "
              style={{ minHeight: 320 }}
            >
              <CuratedBlog
                idx={idx}
                currentLanguage={currentLanguage}
                curatedBlog={curatedBlog}
              />
            </div>

            {/* Popular — desktop only */}
            <div className="hidden lg:flex flex-col  overflow-hidden">
              <PopularBlogs
                idx={idx}
                currentLanguage={currentLanguage}
                popularBlogs={popularBlogs?.posts ?? []}
              />
            </div>
          </div>

          {/* ── Banner ad ────────────────────────── */}
          {BannerAds ? (
            <div className="mt-6 overflow-hidden  bg-white  ring-1 ring-black/5">
              <div className="relative h-24 md:h-40 w-full">
                <BannerAd BannerAds={BannerAds} />
              </div>
            </div>
          ): (
            <div className="border mt-6 border-[#eadcb4] bg-white/90 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] sm:p-6 lg:p-7">
              <p
                className={`font-semibold uppercase text-[#8a6b12] ${isEn ? "text-sm tracking-[0.18em]" : "text-base tracking-normal"}`}
              >
                {isEn ? "BLOGS / GUIDES" : "ब्लगहरू / मार्गदर्शनहरू"}
              </p>
              <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-2">
                  <h2
                    className={`font-black leading-tight text-black ${isEn ? "text-2xl sm:text-3xl lg:text-4xl" : "text-[1.45rem] sm:text-[1.8rem] lg:text-[2.2rem]"}`}
                  >
                    {isEn
                      ? "Practical property guidance for buyers, sellers, and investors."
                      : "किन्ने, बेच्ने, र लगानीकर्ताहरूको लागि व्यावहारिक सम्पत्ति मार्गदर्शन।"}
                  </h2>
                  <p
                    className={`max-w-2xl leading-6 text-black/65 ${isEn ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}
                  >
                    {isEn
                      ? "Search the latest articles, filter by category, and read the updates that matter most."
                      : "नवीनतम लेखहरू खोज्नुहोस्, कोटिहरू अनुसार फिल्टर गर्नुहोस्, र सबैभन्दा महत्त्वपूर्ण अपडेटहरू पढ्नुहोस्।"}
                  </p>
                </div>
              </div>
            </div>
          )}
       


          {/* ── Popular — mobile ─────────────────── */}
          <div className="mt-6 lg:hidden bg-white  shadow-sm ring-1 ring-black/5 overflow-hidden">
            <PopularBlogs
              idx={idx}
              currentLanguage={currentLanguage}
              popularBlogs={popularBlogs?.posts ?? []}
            />
          </div>

          {/* ── Latest blogs ─────────────────────── */}
          {(latestBlogs?.posts?.length ?? 0) > 0 && (
            <div className="mt-6   overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#f0e8d4]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#8a6b12]">
                    {isEn ? "Latest" : "नयाँ"}
                  </p>
                  <h2
                    className={`mt-0.5 font-bold text-[#1a1610] ${isEn ? "text-lg" : "text-xl"}`}
                  >
                    {isEn ? "Latest Blogs" : "नयाँ ब्लगहरू"}
                  </h2>
                </div>
                <span className="text-sm text-[#7a6e58]">
                  {Math.min(latestBlogs.posts.length, 4)}{" "}
                  {isEn ? "posts" : "पोस्टहरू"}
                </span>
              </div>
              <div className="p-6">
                <LatestBlogs
                  idx={idx}
                  latestBlogs={latestBlogs?.posts ?? []}
                  ads={ads}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Blog listing section ─────────────────── */}
      <section id="blogs" className="px-5 sm:px-8 lg:px-10 pb-20">
        <div className="mx-auto max-w-7xl space-y-4">
          <CategoryNav
            totalCounts={blogs.totalCount}
            categories={categories}
            idx={idx}
            currentLanguage={currentLanguage}
            category={category}
            tag={tag}
            search={search}
          />
          <BlogList
            blogs={blogs.posts}
            page={page}
            totalCount={blogs.totalCount}
            limit={limit}
            category={category}
            tag={tag}
            sort={sort}
            search={search}
            idx={idx}
            currentLanguage={currentLanguage}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogClientPage;
