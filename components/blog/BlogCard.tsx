"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
      className="w-full min-h-48   overflow-hidden hover:bg-[#f0f0f0] transition-all group"
    >
      <div className="w-full border-b-2 pb-5 text-black cursor-pointer group flex flex-col p-5 md:flex-row border-[#EBC044]  gap-5 overflow-hidden">
        <div className="w-full md:w-60 shadow-black/40 shadow-md relative h-48 md:h-50 overflow-hidden shrink-0">
          <Image
            src={blog?.coverImage ?? "/logo.png"}
            alt={blog?.title ?? "Blog cover"}
            width={320}
            height={320}
            className="w-full h-full object-cover"
          />
          {/* <span className="absolute top-4 left-0 bg-black font-semibold text-white px-3 py-2 text-md">
            {blog?.category?.name}
          </span> */}
        </div>

        <div className="py-1 flex flex-col items-start flex-1 gap-2">
          <div>
            <span className="text-[15px] font-semibold bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] p-1 px-3  text-[#080807]">
              {/* {new Date(blog?.createdAt).toLocaleDateString()} */}
              {blog?.category?.name}
            </span>
            <span>{` • ${readTime}`}</span>
          </div>

          <h2 className="text-2xl  font-bold transition-all leading-tight">
            {blog?.title}
          </h2>

          {blog?.description && (
            <p className="text-sm text-black/50 line-clamp-2">
              {blog.description}
            </p>
          )}

          {Array.isArray(blog?.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {blog.tags.slice(0, 3).map((tag: any, index: number)  => (
                <span
                  key={index}
                  className="text-[11px] border rounded-xl border-[#0001] bg-[#F8F2E6] p-1 text-[#475569] uppercase font-semibold"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between w-full mt-3">
            <span className="text-[15px] font-semibold  p-1 px-3  text-[#080807]">
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
