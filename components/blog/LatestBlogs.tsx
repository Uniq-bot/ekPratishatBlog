"use client";

import { ArrowRight, Calendar, X } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import { useEffect, useState } from "react";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import AsideAd from "./AsideAd";
import { normalizeImageUrl } from "@/libs/image-url";

const LatestBlogs = ({
  idx,
  latestBlogs = [],
  ads,
}: {
  idx: number;
  latestBlogs?: BlogItem[];
  ads: any[];
}) => {
  const trackView = useTrackBlogView();
  const [showAdPopup, setShowAdPopup] = useState(false);

  const AsideAds = ads.find((ad) => ad.AdType === "ASIDE");

  // Show the popup a short moment after the page loads, once per session
  useEffect(() => {
    if (!AsideAds) return;

    const alreadyShown = sessionStorage.getItem("asideAdShown");
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setShowAdPopup(true);
      sessionStorage.setItem("asideAdShown", "true");
    }, 1500);

    return () => clearTimeout(timer);
  }, [AsideAds]);

  if (!latestBlogs.length) return null;

  const featuredBlog = latestBlogs[0];
  const supportingBlogs = latestBlogs.slice(1, 5);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    blog: BlogItem,
  ) => {
    e.preventDefault();
    trackView(blog);
  };

  return (
    <div className="grid w-full gap-4 border-b border-[#f0e3bd]  lg:grid-cols-[1.2fr_0.8fr]">
      <Link
        href={`/blog/${featuredBlog.slug}`}
        onClick={(e) => handleClick(e, featuredBlog)}
        className="group overflow-hidden  transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-10/4 w-full overflow-hidden">
          {/* <img
            src={normalizeImageUrl(featuredBlog?.coverImage)}
            alt={featuredBlog?.title ?? "Blog cover"}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          /> */}
          <span
            className={
              idx === 0
                ? "absolute top-3 left-3 inline-flex w-fit items-center gap-1.5 bg-white   px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#8a6b12]"
                : "absolute top-3 left-3 inline-flex w-fit items-center gap-1.5 bg-white   px-3 py-1 text-base font-bold uppercase text-[#8a6b12] sm:text-lg"
            }
          >
            {featuredBlog?.category?.translations?.[idx]?.name || "Category"}
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
          <h3 className="text-lg font-semibold leading-tight text-black transition-colors group-hover:text-[#7a5a09] sm:text-[1.4rem]">
            {featuredBlog?.translations?.[idx]?.title || featuredBlog?.title}
          </h3>
         
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
        {supportingBlogs.map((blog) => (
          <Link
            href={`/blog/${blog.slug}`}
            key={blog.id}
            onClick={(e) => handleClick(e, blog)}
            className="group flex gap-3  border-b border-[#f0e3bd] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d8b24a]"
          >
            <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-[#1d1d1d]">
              {/* <img
                src={normalizeImageUrl(blog?.coverImage)}
                alt={blog?.title ?? "Blog cover"}
                width={200}
                height={200}
                className=" object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              /> */}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <span
                className={
                  idx === 0
                    ? "inline-flex w-fit items-center gap-1.5   px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#8a6b12]"
                    : "inline-flex w-fit items-center gap-1.5   px-3 py-1 text-base font-bold uppercase text-[#8a6b12] sm:text-lg"
                }
              >
                {blog?.category?.translations?.[idx]?.name ||
                  blog?.category?.name ||
                  "Category"}
              </span>
              <h4
                className={
                  idx === 0
                    ? "line-clamp-2 font-(family-name:--font-display) text-sm font-semibold leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-[18px]"
                    : "line-clamp-2 font-(family-name:--font-display) text-base font-semibold leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-[20px]"
                }
              >
                {blog?.translations?.[idx]?.title || blog.title}
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

      {AsideAds && showAdPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowAdPopup(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-md overflow-auto bg-white p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowAdPopup(false)}
              aria-label="Close ad"
              className="absolute z-99999 right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-black shadow hover:bg-white"
            >
              <X size={18} />
            </button>
           <div className="relative h-80 lg:h-96 w-full">
             <AsideAd AsideAds={AsideAds} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;