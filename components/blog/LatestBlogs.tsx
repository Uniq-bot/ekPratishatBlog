"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import Image from "next/image";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import AsideAd from "./AsideAd";

const LatestBlogs = ({ idx, latestBlogs = [], ads }: { idx: number; latestBlogs?: BlogItem[]; ads: any[] }) => {
  const trackView = useTrackBlogView();

  if (!latestBlogs.length) return null;

  const featuredBlog = latestBlogs[0];
  const supportingBlogs = latestBlogs.slice(1, 5);
  const AsideAds = ads.find((ad) => ad.AdType === "ASIDE");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, blog: BlogItem) => {
    e.preventDefault();
    trackView(blog);
  };

  return (
    <div className="grid w-full gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <Link
        href={`/blog/${featuredBlog.slug}`}
        onClick={(e) => handleClick(e, featuredBlog)}
        className="group overflow-hidden border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,247,239,0.96)_100%)] transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-16/10 w-full overflow-hidden">
          <Image
            src={featuredBlog?.coverImage ?? "/logo.png"}
            alt={featuredBlog?.title ?? "Blog cover"}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className={
            idx===0? "absolute top-3 left-3 inline-flex w-fit items-center gap-1.5 border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#8a6b12]"
            : "absolute top-3 left-3 inline-flex w-fit items-center gap-1.5 border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-base font-bold uppercase text-[#8a6b12] sm:text-lg"
          }>
            {featuredBlog?.category?.translations?.[idx]?.name || "Category"}
          </span>
        </div>

        <div className="flex flex-col gap-3 p-3 sm:p-6">
          <div className="flex items-center gap-2 text-sm text-[#8a7a4a]">
            <Calendar size={14} />
            {new Date(featuredBlog?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
          <h3 className="font-(family-name:--font-display) text-lg font-semibold leading-tight text-black transition-colors group-hover:text-[#7a5a09] sm:text-[1.4rem]">
            {featuredBlog?.translations?.[idx]?.title || featuredBlog?.title}
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-[#5f5743] sm:text-[15px]">
            {featuredBlog?.translations?.[idx]?.description || featuredBlog?.discription || "A fresh story from our latest collection."}
          </p>
          <div
                   className={`mt-2 hidden items-center gap-2  text-black lg:inline-flex ${
                     idx === 0 ? "text-sm" : "text-base sm:text-lg"
                   }`}
                 >
                   {idx === 0 ? "Read More" : "थप पढ्नुहोस्"}
                   <ArrowRight size={16} />
                 </div>
        </div>
      </Link>

      <div className="flex flex-col gap-3">
        {AsideAds && (
          <div className="h-full w-full overflow-hidden border border-[#eadcb4] bg-white">
            <AsideAd AsideAds={AsideAds} />
          </div>
        )}
        {supportingBlogs.map((blog) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.id}
            onClick={(e) => handleClick(e, blog)}
            className="group flex gap-3 border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,247,239,0.96)_100%)] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8b24a]"
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-[#1d1d1d]">
              <Image src={blog?.coverImage ?? "/logo.png"} alt={blog?.title ?? "Blog cover"} fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <span className={
                idx===0? "inline-flex w-fit items-center gap-1.5 border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#8a6b12]"
                : "inline-flex w-fit items-center gap-1.5 border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-base font-bold uppercase text-[#8a6b12] sm:text-lg"
              }>
                {blog?.category?.translations?.[idx]?.name || blog?.category?.name || "Category"}
              </span>
              <h4 className={
                idx===0? "line-clamp-2 font-(family-name:--font-display) text-sm font-semibold leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-[15px]"
                : "line-clamp-2 font-(family-name:--font-display) text-base font-semibold leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-[20px]"
              }>
                {blog?.translations?.[idx]?.title || blog.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-[#8a7a4a]">
                <Calendar size={12} />
                {new Date(blog?.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
