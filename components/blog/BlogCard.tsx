"use client";
import Image from "next/image";
import Link from "next/link";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import { Clock } from "lucide-react";

/* ─── helpers ──────────────────────────────────────────── */
const parseBlocks = (raw: any): any[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw?.blocks) return raw.blocks;
  if (typeof raw === "string") {
    try {
      const p = JSON.parse(raw);
      return Array.isArray(p) ? p : (p?.blocks ?? []);
    } catch {
      return [];
    }
  }
  return [];
};

function useReadTime(blog: any) {
  const blocks = parseBlocks(blog?.content);
  let words = 0,
    imgs = 0;
  blocks.forEach((b) => {
    if (["paragraph", "heading", "quote", "callout"].includes(b.type)) {
      const t =
        typeof b.content === "string"
          ? b.content
          : `${b.content?.title ?? ""} ${b.content?.description ?? ""}`;
      words += t.trim().split(/\s+/).filter(Boolean).length;
    }
    if (b.type === "list" && Array.isArray(b.content))
      words += b.content.join(" ").split(/\s+/).filter(Boolean).length;
    if (b.type === "image") imgs++;
  });
  return `${Math.max(1, Math.ceil(words / 200 + imgs * 0.2))} min`;
}

/* ─── Featured card (first item) ───────────────────────── */
export function FeaturedBlogCard({
  blog,
  idx = 0,
  currentLanguage = "en",
}: {
  blog: any;
  idx?: number;
  currentLanguage?: string;
}) {
  const trackView = useTrackBlogView();
  const isEn = currentLanguage === "en";
  const readTime = useReadTime(blog);

  const thumb =
    blog?.coverImage || blog?.thumbnail || blog?.image || "/logo.png";
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const category =
    blog.category?.translations?.[idx]?.name || blog.category?.name || "";
  const title =
    blog.translations?.[idx]?.title || blog.title || "Untitled";
  const description =
    blog.translations?.[idx]?.description ||
    blog.description ||
    "";

  return (
    <Link
      href={`/blog/${blog.slug}`}
      onClick={(e) => { e.preventDefault(); trackView(blog); }}
      title={title}
      className="group flex flex-col sm:flex-row gap-0 border-b border-[#e8e0cc] pb-8 mb-2"
    >
      {/* Image — left on desktop, top on mobile */}
      <div className="relative w-full sm:w-[52%] aspect-[16/10] sm:aspect-auto shrink-0 overflow-hidden bg-neutral-100">
        <Image
          src={thumb}
          alt={title}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 52vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center gap-3 sm:gap-4 px-0 pt-5 sm:pt-0 sm:pl-8 lg:pl-10">
        {/* Category */}
        {category && (
          <span
            className={`w-fit font-semibold uppercase tracking-wide text-[#8a6b12] ${
              isEn ? "text-xs" : "text-sm"
            }`}
          >
            {category}
          </span>
        )}

        {/* Title */}
        <h2
          className={`font-bold leading-snug text-[#1a1610] transition-colors group-hover:text-[#8a6b12] ${
            isEn
              ? "text-xl sm:text-2xl lg:text-3xl line-clamp-3"
              : "text-2xl sm:text-3xl line-clamp-3"
          }`}
        >
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p
            className={`text-[#4a4030] line-clamp-2 ${
              isEn ? "text-sm sm:text-base" : "text-base"
            }`}
          >
            {description}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto flex items-center gap-3 text-xs text-[#7a6e58]">
          <span>{date}</span>
          <span className="h-1 w-1 rounded-full bg-[#c8bfa8]" />
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readTime} {isEn ? "read" : "पढाइ"}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Regular row card ──────────────────────────────────── */
const BlogCard = ({
  blog,
  idx = 0,
  currentLanguage = "en",
}: {
  blog: any;
  idx?: number;
  currentLanguage?: string;
}) => {
  const trackView = useTrackBlogView();
  const isEn = currentLanguage === "en";
  const readTime = useReadTime(blog);

  const thumb =
    blog?.coverImage || blog?.thumbnail || blog?.image || "/logo.png";
  const date = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const category =
    blog.category?.translations?.[idx]?.name || blog.category?.name || "";
  const title =
    blog.translations?.[idx]?.title || blog.title || "Untitled";

  return (
    <Link
      href={`/blog/${blog.slug}`}
      onClick={(e) => { e.preventDefault(); trackView(blog); }}
      title={title}
      className="group flex flex-row-reverse  items-start gap-4 sm:gap-6 border-b border-[#e8e0cc] py-6 transition-all"
    >
      {/* Thumbnail — fixed size */}
      <div className="relative shrink-0 w-28 h-20 sm:w-80 sm:h-35 overflow-hidden bg-neutral-100">
        <Image
          src={thumb}
          alt={title}
          fill
          sizes="(max-width: 640px) 112px, 160px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 sm:gap-2 min-w-0">
        {/* Category */}
        {category && (
          <span
            className={`font-semibold uppercase tracking-wide text-[#8a6b12] ${
              isEn ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
            }`}
          >
            {category}
          </span>
        )}

        {/* Title */}
        <h1
          className={`font-bold  text-[#1a1610] pr-30 transition-colors group-hover:text-[#8a6b12] ${
            isEn
              ? "text-sm sm:text-[33px] line-clamp-2 sm:line-clamp-2"
              : "text-base sm:text-lg line-clamp-2 sm:line-clamp-2"
          }`}
        >
          {title}
        </h1>

        {/* Meta */}
        <div className="mt-auto flex items-center gap-2 text-[11px] sm:text-xs text-[#7a6e58]">
          <span>{date}</span>
          <span className="h-1 w-1 rounded-full bg-[#c8bfa8]" />
          <span className="flex items-center gap-1">
            <Clock size={11} />
            {readTime} {isEn ? "read" : "पढाइ"}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
