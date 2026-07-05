"use client";

import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import Image from "next/image";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import AsideAd from "./AsideAd";

const LatestBlogs = ({ latestBlogs = [], ads }: { latestBlogs?: BlogItem[], ads: any[] }) => {
  const trackView = useTrackBlogView();

  if (!latestBlogs.length) return null;

  const featuredBlog = latestBlogs[0];
  const supportingBlogs = latestBlogs.slice(1, 5);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, blog: BlogItem) => {
    e.preventDefault();
    trackView(blog);
  };
  const AsideAds = ads.find((ad) => ad.AdType === "ASIDE");


  return (
    <div className="grid w-full gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <Link
        href={`/blog/${featuredBlog.slug}`}
        onClick={(e) => handleClick(e, featuredBlog)}
        className="group overflow-hidden  border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,247,239,0.96)_100%)]  transition-all duration-300 hover:-translate-y-1 "
      >
        <div className="relative aspect-16/10 w-full overflow-hidden">
          <Image
            src={featuredBlog?.coverImage ?? "/logo.png"}
            alt={featuredBlog?.title ?? "Blog cover"}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4  border border-white/70 bg-black/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            {featuredBlog?.category?.name || "Featured"}
          </span>
        </div>

        <div className="flex flex-col gap-3 p-3 sm:p-6">
          <div className="flex items-center gap-2 text-sm text-[#8a7a4a]">
            <Calendar size={14} />
            {new Date(featuredBlog?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
          <h3 className="text-lg font-semibold font-[Nunito] leading-tight text-black transition-colors group-hover:text-[#7a5a09] sm:text-[1.65rem]">
            {featuredBlog?.title}
          </h3>
          <p className="max-w-2xl text-sm leading-7 text-[#5f5743] sm:text-[15px]">
            {featuredBlog?.discription || "A concise read with practical guidance, fresh perspective, and useful takeaways."}
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-[#8a6b12]">
            Read story
            <ArrowRight size={16} />
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-3">

         {AsideAds && (
              <div className="overflow-hidden w-full h-full border border-[#eadcb4] bg-white ">
                <AsideAd AsideAds={AsideAds} />
              </div>
            )}
        {supportingBlogs.map((blog) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.id}
            onClick={(e) => handleClick(e, blog)}
            className="group flex gap-3  border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,247,239,0.96)_100%)] p-3  transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8b24a] "
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden  bg-[#1D1D1D]">
              <Image
                src={blog?.coverImage ?? "/logo.png"}
                alt={blog?.title ?? "Blog cover"}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <span className="w-fit rounded-full border border-[#f0d98c] bg-[#fffaf0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f5a12]">
                {blog?.category?.name || "Blog"}
              </span>
              <h4 className="line-clamp-2 text-sm font-[Nunito] leading-snug text-black transition-colors group-hover:text-[#7a5a09]">
                {blog.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs text-[#8a7a4a]">
                <Calendar size={12} />
                {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LatestBlogs;
