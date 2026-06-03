"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BlogItem = {
  id: string;
  title: string;
  slug?: string;
  image?: string;
  createdAt?: string;
};

const normalizeBlog = (blog: any): BlogItem => ({
  id: blog.id,
  title: blog.title ?? "",
  slug: blog.slug ?? blog.id,
  image: blog.coverPage ?? blog.image ?? "/logo.png",
  createdAt: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "",
});

const BlogRow = ({
  blog,
  hovered,
  onEnter,
  onLeave,
  onClick,
}: {
  blog: BlogItem;
  hovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
    className={`w-full h-30 transition-all cursor-pointer ${
      hovered ? "bg-amber-200" : "bg-white"
    } flex items-center gap-2 p-2 justify-between`}
  >
    <div className="w-24 h-full shrink-0 overflow-hidden">
      <Image
        src={blog.image || "/logo.png"}
        alt={blog.title}
        width={120}
        height={120}
        className="h-full w-full object-cover"
      />
    </div>
    <div className="flex-1 h-full flex flex-col justify-between overflow-hidden">
      <div>
        <h1 className="text-base font-semibold leading-tight line-clamp-2">{blog.title}</h1>
      </div>
      <span className="text-xs text-gray-600">
        {blog.createdAt}
      </span>
    </div>
  </div>
);

const LatestBlogs = () => {
  const router = useRouter();
  const [latestBlogs, setLatestBlogs] = useState<BlogItem[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const latestRes = await fetch("/api/blogs/latest?limit=5");
        if (latestRes.ok) {
          const latestData = await latestRes.json();
          setLatestBlogs(Array.isArray(latestData.posts) ? latestData.posts.map(normalizeBlog) : []);
        }
      } catch (error) {
        console.error("Failed to fetch latest blogs", error);
      }
    };

    void fetchBlogs();
  }, []);

  const openBlog = (blog: BlogItem) => {
    router.push(`/blog/${blog.slug ?? blog.id}`);
    setIsOpen(false);
  };

  const renderSection = (blogs: BlogItem[]) => {
    if (blogs.length === 0) {
      return <p className="text-sm text-gray-500">No blogs found.</p>;
    }

    return blogs.map((blog) => (
      <BlogRow
        key={blog.id}
        blog={blog}
        hovered={hoveredId === blog.id}
        onEnter={() => setHoveredId(blog.id)}
        onLeave={() => setHoveredId(null)}
        onClick={() => {
          void openBlog(blog);
        }}
      />
    ));
  };

  return (
    <div>
      <button
        aria-label={isOpen ? "Close latest blogs" : "Open latest blogs"}
        onClick={() => setIsOpen((state) => !state)}
        className="fixed right-3 top-5 z-50 p-2 bg-[#F7F3EA] border shadow-md md:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div className="hidden md:block lg:relative right-0 space-y-8">
        <section>
          <h1 className="text-2xl mb-5">Latest Blogs</h1>
          <div className="w-full flex flex-col gap-2">{renderSection(latestBlogs.slice(0, 3))}</div>
        </section>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-40 transform transition-transform duration-300 shadow-lg md:hidden overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 space-y-8">
          <section>
            <h1 className="text-2xl mb-4">Latest Blogs</h1>
            <div className="w-full flex flex-col gap-2">{renderSection(latestBlogs.slice(0, 5))}</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LatestBlogs;
