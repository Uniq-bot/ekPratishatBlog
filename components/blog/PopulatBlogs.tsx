"use client";
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import type { BlogItem } from "@/types/blog";
import { useTrackBlogView } from "@/hooks/useTrackViews";

const PopularBlogs = ({
  idx,
  currentLanguage,
  popularBlogs = [],
}: {
  idx: number;
  currentLanguage: string;
  popularBlogs?: BlogItem[];
}) => {
  const trackView = useTrackBlogView();
  if (!popularBlogs.length) return null;
  const isEn = currentLanguage === "en";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, blog: BlogItem) => {
    e.preventDefault();
    trackView(blog);
  };

  return (
    <div className="flex h-full flex-col p-5">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2.5 pb-4 border-b border-[#f0e8d4]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fef9ec] text-[#c9981a]">
          <TrendingUp size={16} />
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8a6b12]">
            {isEn ? "Trending" : "ट्रेन्डिङ"}
          </p>
          <h2 className={`font-bold text-[#1a1610] ${isEn ? "text-base" : "text-lg"}`}>
            {isEn ? "Popular Posts" : "लोकप्रिय पोस्टहरू"}
          </h2>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-0.5">
        {popularBlogs.slice(0, 6).map((blog, i) => (
          <Link
            key={i}
            href={`/blog/${blog.slug}`}
            onClick={(e) => handleClick(e, blog)}
            className="group flex items-start gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-[#fafaf8]"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fef9ec] text-xs font-bold text-[#8a6b12]">
              {i + 1}
            </span>
            <h3 className={`line-clamp-2 leading-snug  transition-colors group-hover:text-[#8a6b12] ${
              isEn ? "text-sm" : "text-base"
            }`}>
              {blog.translations?.[idx]?.title || blog.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;
