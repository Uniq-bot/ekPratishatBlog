"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTrackBlogView } from "@/hooks/useTrackViews";

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

  words += text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

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

  return (
    <Link
      href={`/blog/${blog.slug}`}
      onClick={handleClick}
      title={blog.title}
      className="group block w-full overflow-hidden rounded-2xl border border-[#eadcb4] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(251,247,239,0.96)_100%)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8b24a] hover:shadow-[0_18px_40px_rgba(201,152,26,0.12)]"
    >
      <div className="flex flex-col gap-4 p-4 sm:p-5 md:flex-row md:gap-5">
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl border border-[#f0e3bd] shadow-[0_10px_24px_rgba(0,0,0,0.08)] md:h-40 md:w-56 lg:w-60">
          <Image
            src={blog?.coverImage ?? "/logo.png"}
            alt={blog?.title ?? "Blog cover"}
            width={320}
            height={320}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 text-black">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] px-3 py-1 font-semibold text-[#080807]">
              {blog?.category?.name}
            </span>
            <span className="text-black/60">• {readTime}</span>
          </div>

          <h2 className="text-xl font-bold leading-tight transition-colors group-hover:text-[#7a5a09] sm:text-2xl">
            {blog?.title}
          </h2>

          {blog?.description && (
            <p className="max-w-3xl text-sm leading-6 text-black/60 line-clamp-2">
              {blog.description}
            </p>
          )}

          {Array.isArray(blog?.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {blog.tags.slice(0, 3).map((tag: any, index: number)  => (
                <span
                  key={index}
                  className="rounded-full border border-[#eadcb4] bg-[#fffaf0] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5d5d5d]"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex w-full items-center justify-between gap-4 pt-2">
            <span className="text-sm font-semibold text-black/65">
              {new Date(blog?.createdAt).toLocaleDateString()}
            </span>
            <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
              Read more <span>→</span>
            </motion.p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
