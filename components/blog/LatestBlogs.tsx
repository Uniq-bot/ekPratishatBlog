"use client";
import { useBlogs } from "@/context/BlogListContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LatestBlogs = () => {
  const { blogsData = [] } = useBlogs();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  // lock body scroll when panel open
  useLockBodyScroll(isOpen);

  const latestBlogs = [...blogsData].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div>
      {/* Mobile toggle button (top-right) */}
      <button
        aria-label={isOpen ? "Close latest blogs" : "Open latest blogs"}
        onClick={() => setIsOpen((s) => !s)}
        className="fixed top-0 right-0 z-50 p-2  bg-[#F7F3EA] border shadow-md md:hidden"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <div className="hidden md:block lg:relative right-0">
        <h1 className="text-2xl mb-5">Latest Blogs</h1>
        <div className="w-full flex flex-col gap-2">
          {latestBlogs.slice(0, 3).map((blog: any) => (
            <div
              key={blog.id}
              onClick={() => router.push(`/blog/${blog.slug ?? blog.id}`)}
              onMouseEnter={() => setIsHovered(blog.id)}
              onMouseLeave={() => setIsHovered(null)}
              className={`w-full h-30 transition-all cursor-pointer ${
                isHovered === blog.id ? "bg-amber-200" : "bg-white"
              } flex items-center gap-2 p-2 justify-between`}
            >
              <div className="w-30 h-full">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={120}
                  height={120}
                  className="h-full w-full object-cover"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>

              <div className="w-[calc(100%-120px)] h-full flex flex-col justify-between">
                <div>
                  <h1 className="font-semibold">{blog.title}</h1>
                  <div className="mt-1">
                    {Array.isArray(blog.tags) &&
                      blog.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className={`text-sm ${
                            isHovered === blog.id ? "bg-white" : "bg-amber-200"
                          } px-2 py-0.5 text-gray-600 mr-2 inline-block`}
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
                <span className="text-sm text-gray-600">{blog.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-40 transform transition-transform duration-300 shadow-lg md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <h1 className="text-2xl mb-4">Latest Blogs</h1>
          <div className="w-full flex flex-col gap-2">
            {latestBlogs.slice(0, 5).map((blog: any) => (
              <div
                key={blog.id}
                onClick={() => {
                  router.push(`/blog/${blog.slug ?? blog.id}`);
                  setIsOpen(false);
                }}
                onMouseEnter={() => setIsHovered(blog.id)}
                onMouseLeave={() => setIsHovered(null)}
                className={`w-full h-30 transition-all cursor-pointer ${
                  isHovered === blog.id ? "bg-amber-200" : "bg-white"
                } flex items-center gap-2 p-2 justify-between`}
              >
                <div className="w-20 h-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h1 className="text-base font-semibold">{blog.title}</h1>
                  </div>
                  <span className="text-xs text-gray-600">{blog.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// lock body scroll when panel open
function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!document) return;
    const original = document.body.style.overflow;
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [active]);
}

// removed helper; hook is called directly inside the component

export default LatestBlogs;
