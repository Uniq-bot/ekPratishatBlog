"use client"
import { Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";
import type { BlogItem, BlogItems } from "@/types/blog";
import { useRouter } from "next/navigation";

const PopularBlogs = ({
  popularBlogs = [],
}: {
  popularBlogs?: BlogItems[];
}) => {
  if (popularBlogs.length === 0) return null;
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
    <div className="w-full flex flex-col gap-3 border-l-5 border-[#EBC044] pl-5 py-2">
      <p className="text-lg font-bold flex items-center gap-2 text-black">
        <TrendingUp size={18} className="text-[#C9981A]" />
        Popular Posts
      </p>

      <div className="flex flex-col gap-3">
        {popularBlogs.map((blog, index) => (
          <div key={blog.id} className="w-full ">
            <Link
              href={`/blog/${blog.slug}`}
              onClick={(e) => handleClick(e, blog)}
              className="flex  gap-10 py-10 justify-between flex-col px-5 cursor-pointer border border-gray-300 rounded-md  shadow-sm shadow-[#EBC044] transition-all group p-2 hover:border-[#f2d253] bg-[F6F6F4]/50 backdrop-blur-lg"
            >
              <div className="flex flex-col gap-4">
                <p className="border border-[#FFD07E] bg-[rgba(255,253,248,0.94)] shadow-md ring-1 ring-[#36332e] uppercase font-semibold w-fit px-2 py-1 text-xs text-black">
                  {blog.category?.name}
                </p>

                <h2 className="text-xl text-black font-medium group-hover:text-[#281c02b7] transition-all line-clamp-2">
                  {blog.title}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;
