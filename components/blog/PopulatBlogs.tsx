"use client";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import { useTrackBlogView } from "@/hooks/useTrackViews";

const PopularBlogs = ({ idx, currentLanguage, popularBlogs = [] }: { idx: number; currentLanguage: string; popularBlogs?: BlogItem[] }) => {
  if (popularBlogs.length === 0) return null;

  const trackView = useTrackBlogView();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, blog: BlogItem) => {
    e.preventDefault();
    trackView(blog);
  };
  return (
    <section className="w-full p-4 sm:p-5 lg:p-5">
      <div className="flex items-center gap-3 border-b border-[#f0e3bd] pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f9efc5] text-[#c9981a]">
          <TrendingUp size={18} />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
            {currentLanguage === "en" ? "Trending Posts" : "ट्रेन्डिङ पोस्टहरू"}
          </p>
          <h2 className="text-lg font-black text-black">
            {currentLanguage === "en" ? "Popular Posts" : "लोकप्रिय पोस्टहरू"}
          </h2>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {popularBlogs.map((blog, index) => (
          <Link
            key={index}
            href={`/blog/${blog.slug}`}
            onClick={(e) => handleClick(e, blog)}
            className="group flex items-start gap-3 rounded-xl border border-transparent px-2 py-3 transition-all duration-300 hover:border-[#eadcb4] hover:bg-[#fffdf8]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f9efc5] text-sm font-semibold text-[#8a6b12]">
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="line-clamp-2 text-sm leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-[15px]">
                {blog.translations?.[idx]?.title || blog.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularBlogs;
