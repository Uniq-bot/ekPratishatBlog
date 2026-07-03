"use client"
import { TrendingUp } from "lucide-react";
import Link from "next/link";
import type { BlogItem, BlogItems } from "@/types/blog";
import { useTrackBlogView } from "@/hooks/useTrackViews";

const PopularBlogs = ({
  popularBlogs = [],
}: {
  popularBlogs?: BlogItems[];
}) => {
  if (popularBlogs.length === 0) return null;

  const trackView = useTrackBlogView();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, blog: BlogItem) => {
    e.preventDefault();
    trackView(blog);
  };
  return (
    <section className="w-full rounded-2xl border border-[#e7d6ab] bg-white/90 p-4 sm:p-5 lg:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-3 border-b border-[#f0e3bd] pb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f9efc5] text-[#c9981a]">
          <TrendingUp size={18} />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a6b12]">
            Trending
          </p>
          <h2 className="text-lg font-bold text-black">Popular Posts</h2>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {popularBlogs.map((blog, index) => (
          <div key={blog.id} className="w-full">
            <Link
              href={`/blog/${blog.slug}`}
              onClick={(e) => handleClick(e, blog)}
              className="group flex h-full w-full flex-col justify-between gap-4 rounded-xl border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,246,236,0.92)_100%)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8b24a] hover:shadow-[0_14px_30px_rgba(201,152,26,0.12)]"
            >
              <div className="flex flex-col gap-3">
                <p className="w-fit rounded-full border border-[#f0d98c] bg-[#fffaf0] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black shadow-sm">
                  {blog.category?.name}
                </p>

                <h3 className="text-base font-semibold leading-snug text-black transition-colors group-hover:text-[#7a5a09] sm:text-lg line-clamp-2">
                  {blog.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularBlogs;
