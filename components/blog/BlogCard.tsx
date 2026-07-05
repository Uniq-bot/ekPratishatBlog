"use client";
import Image from "next/image";
import Link from "next/link";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import { TimerIcon } from "lucide-react";

const BlogCard = ({ blog }: { blog: any }) => {
  const trackView = useTrackBlogView();

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
      return {
        words: 0,
        readTime: "1 min read",
      };
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
            words += block.content
              .join(" ")
              .split(/\s+/)
              .filter(Boolean).length;
          }
          break;

        case "image":
          images++;
          break;
      }
    });

    const totalMinutes = Math.max(1, Math.ceil(words / 200 + images * 0.2));

    return {
      words,
      readTime: `${totalMinutes} min read`,
    };
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackView(blog);
  };

  const thumbnail =
    blog?.coverImage ||
    blog?.thumbnail ||
    blog?.image ||
    "/placeholder-blog.jpg";
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
      className="group h-full flex flex-col gap-4  border-b-2 border-[#eadcb4] transition-all duration-300  sm:flex-row sm:items-start sm:gap-6 sm:p-5"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden  bg-[#1D1D1D] sm:h-36 sm:w-56">
        <Image
          src={thumbnail}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 224px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#8a7a4a]">
          <span className=" border border-[#f0d98c] bg-[#fffaf0] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6f5a12]">
            {blog.category?.name || "Article"}
          </span>
          <span>{publishedDate}</span>
          <span className="flex items-center gap-1.5">
            <TimerIcon size={15} />
            {readTime}
          </span>
        </div>

        <h2 className="sm:text-xl text-sm   font-[Nutino] hover:underline underline-offset-4 mb-4 font-semibold leading-tight text-[#1D1D1D] transition-all duration-200 hover:text-[#444442] ">
          {blog.title}
        </h2>
      </div>
    </Link>
  );
};

export default BlogCard;
