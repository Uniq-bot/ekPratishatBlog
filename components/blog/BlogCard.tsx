"use client";
import Image from "next/image";
import Link from "next/link";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import { TimerIcon } from "lucide-react";

const BlogCard = ({ blog, idx = 0, currentLanguage = "en" }: { blog: any; idx?: number; currentLanguage?: string }) => {
  const trackView = useTrackBlogView();
  const isEnglish = currentLanguage === "en";

  const parseBlocks = (raw: any): any[] => {
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (raw?.blocks) return raw.blocks;

    if (typeof raw === "string") {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        if (parsed?.blocks) return parsed.blocks;
        return [];
      } catch {
        return [];
      }
    }

    return [];
  };

  const blocks = parseBlocks(blog?.content);
  const { readTime } = calculateReadTime(blocks);

  function calculateReadTime(blocks: any[] = []) {
    if (!Array.isArray(blocks)) {
      return { words: 0, readTime: "1 min read" };
    }

    let words = 0;
    let images = 0;

    blocks.forEach((block) => {
      switch (block.type) {
        case "paragraph":
        case "heading":
        case "quote":
        case "callout": {
          const text =
            typeof block.content === "string"
              ? block.content
              : `${block.content?.title ?? ""} ${block.content?.description ?? ""}`;
          words += text.trim().split(/\s+/).filter(Boolean).length;
          break;
        }
        case "list":
          if (Array.isArray(block.content)) {
            words += block.content.join(" ").split(/\s+/).filter(Boolean).length;
          }
          break;
        case "image":
          images++;
          break;
      }
    });

    const minutes = Math.max(1, Math.ceil(words / 200 + images * 0.2));

    return { words, readTime: `${minutes} min read` };
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackView(blog);
  };

  const thumbnail = blog?.coverImage || blog?.thumbnail || blog?.image || "/placeholder-blog.jpg";
  const publishedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${blog.slug}`}
      onClick={handleClick}
      title={blog.title}
      className="group flex h-full flex-col gap-4 overflow-hidden border border-[#e8ddbf] bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(252,248,240,0.96)_100%)] p-3 shadow-[0_18px_45px_rgba(17,24,39,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#d8b24a] sm:flex-row sm:items-start sm:gap-5 sm:p-5"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-[#1d1d1d] sm:h-36 sm:w-56">
        <Image
          src={thumbnail}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 224px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#8a7a4a]">
          <span className={
            currentLanguage === "en"?
            "inline-flex items-center gap-1.5 border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#8a6b12]"
            :
            "inline-flex items-center gap-1.5 border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-base font-bold uppercase text-[#8a6b12] sm:text-lg"
          }>
            {blog.category?.translations?.[idx]?.name || "Category"}
          </span>
          <span className="text-sm font-medium">{publishedDate}</span>
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <TimerIcon size={15} />
            {readTime}
          </span>
        </div>

        <h2
          className={`font-[family-name:var(--font-display)] line-clamp-2 text-sm  leading-snug text-[#1d1d1d] transition-colors group-hover:text-[#7a5a09] ${
            isEnglish ? "sm:text-lg font-bold " : "text-[20px] sm:text-2xl"
          }`}
        >
          {blog.translations?.[idx]?.title || blog.title || "Untitled"}
        </h2>
      </div>
    </Link>
  );
};

export default BlogCard;
