"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LatestBlogs = ({ latestBlogs = [] }: { latestBlogs?: BlogItem[] }) => {
  const router = useRouter();
   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, blog: BlogItem) => {
    e.preventDefault();

    const sessionId =
      localStorage.getItem("sessionId") || crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);

    const key = `viewed-${blog.id}`;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "true");
      fetch("/api/blogs/views", {
        method: "POST",
        keepalive: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: blog.id, sessionId }),
      }).catch(() => {});
    }

    router.push(`/blog/${blog.slug}`);
  };
  return (
    <div className="w-full lg:w-[35%] h-full flex flex-col gap-2 px-3 sm:px-6 lg:px-10 py-5">
      <p className=" text-2xl font-bold "> 
        Latest blogs
      </p>
      {latestBlogs.length === 0 ? (
        <p>No latest blogs found.</p>
      ) : (
        <div className="w-full flex flex-col gap-2">
          {latestBlogs.slice(0, 3).map((blog) => {
            const slug = blog.slug ?? blog.id;
            const category = blog.category?.name ?? "Uncategorized";
            const createdAt = new Date(blog.createdAt).toLocaleDateString();

            return (
              <div key={blog.id} className="w-full">
                <Link
                  href={`/blog/${slug}`}
                  onClick={(e) => handleClick(e, blog)}
                className="flex  gap-10 py-4 justify-between flex-col px-5 cursor-pointer border border-gray-300 rounded-xl  shadow-sm shadow-[#EBC044]/30 transition-all group p-2 hover:border-[#f2d253] bg-[F6F6F4]/50 backdrop-blur-lg"
                >
                  <div className="flex flex-col gap-4">
                    <p className="border border-[#FFD07E] bg-[rgba(255,253,248,0.94)] shadow-md ring-1 ring-[#36332e] uppercase font-semibold w-fit px-2 py-1 text-xs text-black">
                      {category}
                    </p>

                    <h2 className="text-xl text-black font-medium group-hover:text-[#281c02b7] transition-all line-clamp-2">
                      {blog.title}
                    </h2>
                  </div>

                  <p className="flex items-center gap-1 text-sm text-black/70">
                    <Calendar size={16} /> {createdAt}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {/* <div className="w-full h-60 flex items-center justify-center mt-5 ">
        <Image src="/logo.png" alt="Blog Logo" width={400} height={100} className="w-full h-full " />
      </div> */}
    </div>
  );
};

export default LatestBlogs;
