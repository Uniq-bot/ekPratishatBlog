"use client";
import BlogHero from "@/components/blog/BlogHero";
import BlogListClient from "@/components/blog/BlogListClient";
import LatestBlogs from "@/components/blog/LatestBlogs";
import BlogFilters from "@/components/shared/BlogFilters";

const Blogs = () => {
  return (
      <div className="w-full min-h-screen flex bg-[#F7F3EA] pl-30 pr-20 ">
        <div className="w-[65%] min-h-screen p-10  flex flex-col gap-10">
          <BlogHero />
          <BlogFilters />
          <BlogListClient />
        </div>
        <div className="w-[35%] h-screen p-10">
          <LatestBlogs />
        </div>
      </div>
  );
};

export default Blogs;
