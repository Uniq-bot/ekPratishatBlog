"use client";
import { Dot } from "lucide-react";
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
    <div className="w-full lg:w-[65%] h-full px-3 sm:px-6 lg:px-10">
      <div className="w-full flex flex-col gap-2.5">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-semibold leading-tight">
          {blog?.title}
        </h1>

        <div className="w-full h-32 sm:h-48 lg:h-96 shadow-md shadow-black/50 overflow-hidden relative mt-3">
          <Image
            src={blog?.coverImage ?? "/logo.png"}
            alt={blog?.title ?? "Blog cover"}
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-0 right-0 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-base bg-black z-10">
            {blog?.category?.name}
          </span>
        </div>

        <div className="w-full flex mt-4 justify-between items-start sm:items-center flex-wrap gap-2">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {Array.isArray(blog?.tags) &&
              blog.tags.map((tag: any) => (
                <span key={tag?.id ?? tag} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-200 text-xs sm:text-sm">
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
          </div>
          <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
            {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
          </span>
        </div>
      </div>

      {blog?.description && (
        <p className="bg-gray-300 p-3 sm:p-4 lg:p-5 text-xs sm:text-sm lg:text-base leading-relaxed mt-6">
          {blog.description}
        </p>
      )}
      {/* TOC */}
      <div className="w-full border bg-gray-300 mt-8 lg:mt-10 min-h-50 p-3 sm:p-4 lg:p-5">
        <p className="text-lg sm:text-xl lg:text-2xl font-bold">
          Table of Content
        </p>
            {
              blocks.filter(b => b.type === "heading").map((b, i) => (
                 <div key={i} className="flex items-start gap-2 sm:gap-3 mt-2 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                 <Dot size={18} className="shrink-0 mt-1 sm:mt-0.5" /> 
                <a href={`#${b.content}`} className="hover:text-white transition-all font-semibold">
                 {b.content}
                </a>
                </div>
              ))
            }
      </div>  
      <div className="mt-6 lg:mt-8 flex flex-col gap-4 lg:gap-5">
        {blocks.map((block: any, index: number) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={block.id ?? index} className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                  {block.content}
                </p>
              );
            case "heading": {
              const level = block.level ?? 2;
              const cls = [
                "",
                "text-xl sm:text-2xl lg:text-4xl font-bold",
                "text-lg sm:text-xl lg:text-3xl font-bold",
                "text-base sm:text-lg lg:text-2xl font-semibold",
                "text-sm sm:text-base lg:text-xl font-semibold",
                "text-xs sm:text-sm lg:text-lg font-medium"
              ][level] ?? "text-lg sm:text-xl lg:text-2xl font-bold";
              return <p key={block.id ?? index} id={block.content} className={`${cls} mt-4 lg:mt-6 scroll-mt-20`}>{block.content}</p>;
            }
            case "image":
              return block.content ? (
                <div key={block.id ?? index} className="w-full overflow-hidden my-4 lg:my-6">
                  <img src={block.content} alt="Blog content" className="w-full object-contain rounded" />
                </div>
              ) : null;
            case "list":
              return (
                <ul key={block.id ?? index} className="list-disc ml-4 sm:ml-6 lg:ml-10 list-inside text-gray-700 text-xs sm:text-sm lg:text-base space-y-1">
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
