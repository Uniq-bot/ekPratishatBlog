"use client";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import { BlogItem } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const CuratedBlog = ({ idx, currentLanguage, curatedBlog }: { idx: number; currentLanguage: string; curatedBlog: BlogItem | any }) => {
  if (!curatedBlog) return null;

  const trackView = useTrackBlogView();
  const description = curatedBlog?.translations?.[idx]?.description || "";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackView(curatedBlog);
  };

  return (
    <div onClick={handleClick} className="group relative h-full w-full cursor-pointer overflow-hidden bg-black">
      <Image
        src={curatedBlog?.coverImage || "/Ad1.png"}
        alt="Featured story"
        width={1000}
        height={1000}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.76)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-3 sm:p-5 lg:p-6">
        <span
          className={`inline-flex w-fit border border-white/30 bg-white/10 px-3 py-1  font-semibold uppercase text-white backdrop-blur-sm ${
            currentLanguage === "en" ? "tracking-[0.18em]" : "tracking-normal text-[20px]"
          }`}
        >
          {currentLanguage === "en" ? "FEATURED STORY" : "विशेष कथा"}
        </span>
        <h1
          className={`max-w-2xl line-clamp-2    leading-tight text-white ${
            currentLanguage === "en"
              ? "text-lg sm:text-3xl lg:text-4xl font-black"
              : "text-[1.35rem] sm:text-[2.25rem] lg:text-[3rem] font-semibold"
          }`}
        >
          {curatedBlog?.translations?.[idx]?.title || curatedBlog?.title}
        </h1>
        <p
          className={`max-w-2xl line-clamp-3 leading-6 text-gray-100 ${
            currentLanguage === "en" ? "text-sm sm:text-base" : "text-base sm:text-lg lg:text-xl"
          }`}
        >
          {description.length > 100 ? `${description.substring(0, 280)}...` : description}
        </p>
        <div
          className={`mt-2 hidden items-center gap-2 font-semibold text-white lg:inline-flex ${
            currentLanguage === "en" ? "text-sm" : "text-base sm:text-lg"
          }`}
        >
          {currentLanguage === "en" ? "Read More" : "थप पढ्नुहोस्"}
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default CuratedBlog;