"use client";
import { BlogItem } from "@/types/blog";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const CuratedBlog = ({ curatedBlog }: { curatedBlog: BlogItem | any }) => {
  const router = useRouter();

  if (!curatedBlog) return null;

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    const sessionId =
      localStorage.getItem("sessionId") ?? window.crypto.randomUUID();

    localStorage.setItem("sessionId", sessionId);

    const key = `viewed-${curatedBlog.id}`;

    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "true");

      fetch("/api/blogs/views", {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: curatedBlog.id,
          sessionId,
        }),
      }).catch(() => {});
    }

    router.push(`/blog/${curatedBlog.slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="absolute w-full  lg:flex-row flex-col left-1/2  p-5 bottom-35   z-50 md:w-200 md:h-90 cursor-pointer group  flex md:left-1/2  md:top-30 transform -translate-x-1/2  text-black "
    >
      <div className="md:w-[60%] w-full  h-full">
        <Image
          src={curatedBlog?.coverImage || "/Ad1.png"}
          alt="Ad"
          width={400}
          height={400}
          className=" w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-all"
        />
      </div>
      <div className="md:w-[40%] w-full h-full md:p-5 flex flex-col md:gap-3 gap-1 justify-center">
        <h1 className="md:text-2xl text-md group-hover:underline transition-all font-bold">
          {curatedBlog?.title || "Curated Blog"}
        </h1>
        <h3 className="md:text-lg text-sm">
          {curatedBlog?.description ||
            "Discover our handpicked selection of insightful articles, expert tips, and market trends to help you navigate the world of real estate with confidence."}
        </h3>
        
         
       
      </div>
    </div>
  );
};

export default CuratedBlog;
