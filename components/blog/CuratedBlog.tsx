"use client";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import { BlogItem } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const CuratedBlog = ({ curatedBlog }: { curatedBlog: BlogItem | any }) => {
  if (!curatedBlog) return null;
  const trackView = useTrackBlogView();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    trackView(curatedBlog);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative h-full w-full cursor-pointer overflow-hidden bg-black"
    >
      <Image
        src={curatedBlog?.coverImage || "/Ad1.png"}
        alt="Ad"
        width={1000}
        height={1000}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0.08)_42%,rgba(0,0,0,0.72)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 z-10 p-2 flex flex-col gap-1 sm:p-5 lg:p-6">
        <p className=" inline-flex w-fit  rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          FEATURED STORY
        </p>
        <h1 className="max-w-2xl text-md line-clamp-2 font-black leading-tight text-white sm:text-3xl lg:text-5xl">
          {curatedBlog?.title}
        </h1>
        <p className=" max-w-2xl text-sm leading-6 line-clamp-2 lg:line-clamp-10  text-gray-100 sm:text-base">
          {curatedBlog?.description.length > 100
            ? curatedBlog.description.substring(0, 300) + "..."
            : curatedBlog.description}
        </p>
        <div className="mt-4 lg:inline-flex hidden  items-center gap-2 text-sm font-semibold text-white">
          Read feature <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default CuratedBlog;
