"use client";
import Image from "next/image";
import React from "react";

// Blocks are stored as { id, type, content, level? }
// Tags from Prisma are { id, name, slug }

const BlogDetailClient = ({ blog }: { blog: any }) => {
  const blocks: any[] = (() => {
    const raw = blog?.content;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;
    if (raw?.blocks) return raw.blocks;
    if (typeof raw === "string") {
      try { return JSON.parse(raw); } catch { return []; }
    }
    return [];
  })();

  return (
    <div className="w-full md:w-[65%] h-full px-4 md:px-10">
      <div className="w-full flex flex-col gap-2.5">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          {blog?.title}
        </h1>

        <div className="w-full h-48 md:h-120 shadow-md shadow-black/50 overflow-hidden relative mt-3">
          <Image
            src={blog?.coverImage ?? "/logo.png"}
            alt={blog?.title ?? "Blog cover"}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-0 right-0 text-white px-4 py-1 md:px-5 md:py-2 bg-black z-10">
            {blog?.category?.name}
          </span>
        </div>

        <div className="w-full flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            {Array.isArray(blog?.tags) &&
              blog.tags.map((tag: any) => (
                <span key={tag?.id ?? tag} className="px-3 py-1 bg-amber-200 text-sm">
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
          </div>
          <span className="text-gray-400 text-xs md:text-sm">
            {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
          </span>
        </div>
      </div>

      {blog?.description && (
        <p className="bg-gray-300 p-4 md:p-5 rounded-xl text-sm md:text-base leading-relaxed mt-6">
          {blog.description}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-5">
        {blocks.map((block: any, index: number) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={block.id ?? index} className="text-sm md:text-md text-gray-700 leading-relaxed">
                  {block.content}
                </p>
              );
            case "heading": {
              const level = block.level ?? 2;
              const cls = ["", "text-3xl font-bold", "text-2xl font-bold", "text-xl font-semibold", "text-lg font-semibold", "text-base font-medium"][level] ?? "text-2xl font-bold";
              return <p key={block.id ?? index} className={`${cls} mt-4`}>{block.content}</p>;
            }
            case "image":
              return block.content ? (
                <div key={block.id ?? index} className="w-full overflow-hidden">
                  <img src={block.content} alt="Blog content" className="w-full object-contain rounded" />
                </div>
              ) : null;
            case "list":
              return (
                <ul key={block.id ?? index} className="list-disc ml-5 md:ml-10 list-inside text-gray-700 text-sm md:text-base">
                  {(Array.isArray(block.content) ? block.content : []).map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default BlogDetailClient;
