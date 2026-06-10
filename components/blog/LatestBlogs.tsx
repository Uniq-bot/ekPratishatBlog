import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BlogItem = {
  id: string;
  title: string;
  slug?: string;
  coverImage?: string;
  createdAt?: string | Date;
  category?: { name: string } | null;
};

const LatestBlogs = ({ latestBlogs = [] }: { latestBlogs?: BlogItem[] }) => {
  return (
    <div className="w-[35%]">
      {latestBlogs.length === 0 ? (
        <p className="text-sm text-gray-500">No latest blogs found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {latestBlogs.slice(0, 2).map((blog) => {
            const slug = blog.slug ?? blog.id;
            const category = blog.category?.name ?? "Uncategorized";
            const createdAt = blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "";

            return (
              <Link
                key={blog.id}
                href={`/blog/${slug}`}
                className="flex gap-10 py-4 justify-between flex-col px-5 cursor-pointer border border-b-5 border-[#C9981A] transition-all group bg-[#2E2E2E] p-2 hover:border-[#FEE685]"
              >
                <div className="flex flex-col gap-4">
                  <p className="border border-[#FFD07E] bg-[rgba(255,253,248,0.94)] shadow-md ring-1 ring-[#36332e] backdrop-blur-sm uppercase font-semibold w-fit px-2 py-1 text-xs text-black">
                    {category}
                  </p>
                  <h2 className="text-xl text-white font-medium group-hover:text-[#d69406] transition-all line-clamp-2">
                    {blog.title}
                  </h2>
                </div>
                <p className="flex items-center gap-1 text-sm text-white/70">
                  <Calendar size={16} /> {createdAt}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;