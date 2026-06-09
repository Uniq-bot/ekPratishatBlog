"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type BlogItem = {
  id: string;
  title: string;
  slug?: string;
  coverImage?: string;
  image?: string;
  createdAt?: string;
};

const normalizeBlog = (blog: BlogItem) => ({
  id: blog.id,
  title: blog.title ?? "",
  slug: blog.slug ?? blog.id,
  category: blog.category.name ?? "Uncategorized",
  coverImage: blog.coverImage ?? blog.image ?? "/logo.png",
  createdAt: blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString()
    : "",
});

const LatestBlogs = ({ latestBlogs = [] }: { latestBlogs?: BlogItem[] }) => {
  const router = useRouter();
  console.log(latestBlogs);
  const openBlog = (blog: BlogItem) => {
    const normalized = normalizeBlog(blog);
    router.push(`/blog/${normalized.slug}`);
  };

  return (
    <div className="w-[35%]">
      {latestBlogs.length === 0 ? (
        <p className="text-sm text-gray-500">No latest blogs found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {latestBlogs.slice(0, 3).map((blog) => {
            const b = normalizeBlog(blog);

            return (
              <div
                title={b.slug}
                key={b.id}
                onClick={() => openBlog(blog)}
                className="flex gap-10 py-4 justify-between flex-col  px-5 cursor-pointer border border-[#D2C5AB] transition-all group hover:bg-[#FFD07E]/50 p-2 "
              >
                <div className="flex flex-col gap-4">
                  <p className="border border-[#FFD07E] uppercase font-semibold w-fit px-2 py-1 text-xs">
                    {b.category}
                  </p>

                  <h2 className="text-xl font-medium group-hover:text-[#79570E] transition-all line-clamp-2">
                    {b.title}
                  </h2>
                </div>
                <p className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock /> {b.createdAt}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LatestBlogs;
