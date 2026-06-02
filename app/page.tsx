"use client";
import BlogHero from "@/components/blog/BlogHero";
import BlogListClient from "@/components/blog/BlogListClient";
import LatestBlogs from "@/components/blog/LatestBlogs";
import BlogFilters from "@/components/shared/BlogFilters";

const Blogs = () => {
  return (
      <div className="w-full min-h-screen flex bg-[#F7F3EA] md:pl-30 md:pr-20 ">

        <div className="lg:w-[65%] min-h-screen relative lg:p-10   flex flex-col">
          <BlogHero />
          
         <div className=" lg:mb-10 relative  lg:top-10  z-10 top-30 pb-10 w-[90%] m-auto h-full flex flex-col gap-10">
           <BlogFilters  />
          <BlogListClient />
         </div>
        </div>
        <div className="lg:w-[35%] absolute lg:relative h-screen p-10">
          <LatestBlogs />
        </div>
      </div>
  );
};

export default Blogs;
