"use client";
import { useBlogs } from "@/context/BlogListContext";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
const LatestBlogs = () => {
  const { blogsData } = useBlogs();
  const router=useRouter();
  const [isHovered, setIsHovered] = useState<number | null>(null);
  console.log("blogsData", blogsData);
  const latestBlogs = blogsData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  console.log("latest", latestBlogs.slice(0, 3));
  return (
    <div>
      <h1 className="text-2xl  mb-5">Latest Blogs</h1>
      <div className="w-full flex flex-col gap-2">
        {latestBlogs.slice(0, 3).map((blog) => {
          return (
            <div
            onClick={()=>router.push(`/blog/${blog.slug ?? blog.id}`)}
              onMouseEnter={() => setIsHovered(blog.id)}
              onMouseLeave={() => setIsHovered(null)}
              key={blog.id}
              className={`w-full h-30 transition-all cursor-pointer ${isHovered === blog.id ? "bg-amber-200" : "bg-white"}  flex items-center gap-2 p-2 justify-between`}
            >
              <div className="w-30 h-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={120}
                  height={120}
                  className="h-full w-full"
                />
              </div>
              <div className="w-[calc(100%-120px)] h-full flex flex-col justify-between">
                <div>
                  <h1>{blog.title}</h1>
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className={`text-sm ${isHovered === blog.id ? "bg-white" : "bg-amber-200"}  px-2 py-0.5 text-gray-600 mr-2`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">{blog.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestBlogs;
