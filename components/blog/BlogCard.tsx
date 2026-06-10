import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <div className="w-full border-b-2 pb-5 text-white cursor-pointer group flex flex-col p-5 md:flex-row border-[#C9981A] gap-5 overflow-hidden">
      <div className="w-full md:w-60 relative h-48 md:h-auto overflow-hidden shrink-0">
        <Image
          src={blog?.coverImage ?? "/logo.png"}
          alt={blog?.title ?? "Blog cover"}
          width={320}
          height={320}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 left-0 bg-black text-white px-2 py-1 text-xs">
          {blog?.category?.name}
        </span>
      </div>

      <div className="py-1 flex flex-col items-start flex-1 gap-2">
        <span className="text-[12px] font-semibold bg-[rgba(154,106,0,0.07)] p-1 px-3 rounded-2xl text-[#d69406]">
          {new Date(blog?.createdAt).toLocaleDateString()}
        </span>

        <h2 className="text-2xl group-hover:text-[#d69406] transition-all leading-tight">
          {blog?.title}
        </h2>

        {blog?.description && (
          <p className="text-sm text-gray-400 line-clamp-2">
            {blog.description}
          </p>
        )}

        {/* Tags */}
        {Array.isArray(blog?.tags) && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {blog.tags.slice(0, 3).map((tag: any) => (
              <span
                key={tag.id}
                className="text-[11px] border border-[#FFD07E] px-2 py-0.5 text-[#d69406]"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/blog/${blog?.slug ?? blog?.id}`}
          className="underline hover:text-[#d69406] mt-auto cursor-pointer transition-all text-[#d69406] text-sm"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;