"use client";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import { BlogItem } from "@/types/blog";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { useSession } from "next-auth/react";

const CuratedBlog = ({ curatedBlog }: { curatedBlog: BlogItem | any }) => {
  if (!curatedBlog) return null;
  const trackView = useTrackBlogView();
  const { data: session } = useSession();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    trackView(curatedBlog);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full hover:opacity-80 transition-all cursor-pointer h-full  relative  overflow-hidden"
    >
      <Image
        src={curatedBlog?.coverImage || "/Ad1.png"}
        alt="Ad"
        width={1000}
        height={1000}
        className="w-full h-full   group-hover:opacity-80 transition-all"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4  z-10">
        <h1 className="text-white text-xl min-[1300px]:text-[3rem] font-black">
          {curatedBlog?.title}
        </h1>
        <p className="text-gray-200 mt-2 text-sm min-[1300px]:text-[1.2rem]">
          {curatedBlog?.description.length > 100
            ? curatedBlog.description.substring(0, 80) + "..."
            : curatedBlog.description}
        </p>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full bg-linear-to-t from-black/70 to-transparent" />
    </div>
  );
};

export default CuratedBlog;
