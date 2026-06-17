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
      className="absolute  z-50 w-220 h-100 cursor-pointer group  flex left-1/2  top-30 transform -translate-x-1/2  text-black "
    >
      <div className="w-[65%] h-full">
        <Image
          src={curatedBlog?.coverImage || "/Ad1.png"}
          alt="Ad"
          width={400}
          height={400}
          className=" w-full h-full object-cover rounded-lg group-hover:opacity-80 transition-all"
        />
      </div>
      <div className="w-[35%] h-full p-5 flex flex-col gap-3 justify-center">
        <h1 className="text-2xl group-hover:underline transition-all font-bold">
          {curatedBlog?.title || "Curated Blog"}
        </h1>
        <h3 className="text-lg">
          {curatedBlog?.description ||
            "Discover our handpicked selection of insightful articles, expert tips, and market trends to help you navigate the world of real estate with confidence."}
        </h3>
        <div className="overflow-hidden relative">
          <span className="translate-y-20 flex gap-1 items-center group-hover:translate-y-0 group-hover:text-[#B8A555] transition-all text-2xl">
            <p>Read more</p>{" "}
            <span className="translate-x-0 group-hover:translate-x-2 delay-50 transition-all">
              <ArrowRight />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CuratedBlog;
