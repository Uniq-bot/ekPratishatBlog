"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTrackBlogView } from "@/hooks/useTrackViews";

const BlogCard = ({ blog }: { blog: any }) => {
const trackView = useTrackBlogView();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
   trackView(blog);
  };

  return (
    <Link
      href={`/blog/${blog.slug}`}
      onClick={handleClick}
      title={blog.title}
      className="w-full min-h-48 bg-[#FFFFFF] rounded-2xl overflow-hidden hover:bg-[#f0f0f0] transition-all group"
    >
      <div className="w-full border-b-2 pb-5 text-black cursor-pointer group flex flex-col p-5 md:flex-row border-[#EBC044] rounded-2xl gap-5 overflow-hidden">
        <div className="w-full md:w-60 relative h-48 md:h-50 overflow-hidden shrink-0">
          <Image
            src={blog?.coverImage ?? "/logo.png"}
            alt={blog?.title ?? "Blog cover"}
            width={320}
            height={320}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-0 bg-black font-semibold text-white px-3 py-2 text-md">
            {blog?.category?.name}
          </span>
        </div>

        <div className="py-1 flex flex-col items-start flex-1 gap-2">
          <span className="text-[12px] font-semibold bg-[rgba(154,106,0,0.07)] p-1 px-3 rounded-2xl text-[#977305]">
            {new Date(blog?.createdAt).toLocaleDateString()}
          </span>

          <h2 className="text-2xl group-hover:text-[#ad8408] font-bold transition-all leading-tight">
            {blog?.title}
          </h2>

          {blog?.description && (
            <p className="text-sm text-black/50 line-clamp-2">
              {blog.description}
            </p>
          )}

          {Array.isArray(blog?.tags) && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {blog.tags.slice(0, 3).map((tag: any) => (
                <span
                  key={tag.id}
                  className="text-[11px] border rounded-xl border-[#1111] bg-[#FFD07E] p-1 text-[#36332e] uppercase font-semibold"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
            Read more <span>→</span>
          </motion.p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;