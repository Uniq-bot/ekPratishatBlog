"use client";

import { Dot } from "lucide-react";
import Image from "next/image";

// Heading tag map: level → HTML tag
const headingTag: Record<number, keyof JSX.IntrinsicElements> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const headingClass: Record<number, string> = {
  1: "text-xl sm:text-2xl lg:text-4xl font-bold",
  2: "text-lg sm:text-xl lg:text-3xl font-bold",
  3: "text-base sm:text-lg lg:text-2xl font-semibold",
  4: "text-sm sm:text-base lg:text-xl font-semibold",
  5: "text-xs sm:text-sm lg:text-lg font-medium",
  6: "text-xs sm:text-sm lg:text-base font-medium",
};

const parseBlocks = (raw: any): any[] => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (raw?.blocks) return raw.blocks;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
  return [];
};

const BlogDetailClient = ({ blog }: { blog: any }) => {
  const blocks = parseBlocks(blog?.content);
  console.log(blocks);
  console.log(blog.coverImage);
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
            priority
          />
          {blog?.category?.name && (
            <span className="absolute top-0 right-0 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-base bg-black z-10">
              {blog.category.name}
            </span>
          )}
        </div>

        <div className="w-full flex mt-4 justify-between items-start sm:items-center flex-wrap gap-2">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {Array.isArray(blog?.tags) &&
              blog.tags.map((tag: any) => (
                <span
                  key={tag?.id ?? tag}
                  className="border text-black border-[#FFD07E] bg-[rgba(255,253,248,0.94)] shadow-md ring-1 ring-[#36332e] backdrop-blur-sm uppercase font-semibold w-fit px-2 py-1 text-xs"
                >
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
          </div>
          <span className="text-gray-200 text-xs sm:text-sm whitespace-nowrap">
            {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
          </span>
        </div>
      </div>

      {blog?.description && (
        <p className="bg-gray-300 text-black p-3 sm:p-4 lg:p-5 text-xs sm:text-sm lg:text-base leading-relaxed mt-6">
          {blog.description}
        </p>
      )}

      {/* Table of Contents */}
      {blocks.some((b) => b.type === "heading") && (
        <div className="w-full border text-black bg-gray-300 mt-8 lg:mt-10 min-h-12 p-3 sm:p-4 lg:p-5">
          <p className="text-lg sm:text-xl lg:text-2xl font-bold">Table of Contents</p>
          {blocks
            .filter((b) => b.type === "heading")
            .map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-2 sm:gap-3 mt-2 px-2 sm:px-3 py-1 text-xs sm:text-sm"
              >
                <Dot size={18} className="shrink-0 mt-1 sm:mt-0.5" />
                <a
                  href={`#heading-${i}`}
                  className="hover:text-[#79570E] transition-all font-semibold"
                >
                  {b.content}
                </a>
              </div>
            ))}
        </div>
      )}

      {/* Content Blocks */}
      <div className="mt-6 lg:mt-8 flex flex-col gap-4 lg:gap-5">
        {(() => {
          let headingIndex = 0;
          return blocks.map((block: any, index: number) => {
            switch (block.type) {
              case "paragraph":
                return (
                  <p
                    key={block.id ?? index}
                    className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed"
                  >
                    {block.content}
                  </p>
                );

              case "heading": {
                const level = Math.min(Math.max(block.level ?? 2, 1), 6);
                const Tag = headingTag[level];
                const cls = headingClass[level];
                const anchorId = `heading-${headingIndex++}`;
                return (
                  <Tag
                    key={block.id ?? index}
                    id={anchorId}
                    className={`${cls} mt-4 lg:mt-6 scroll-mt-20`}
                  >
                    {block.content}
                  </Tag>
                );
              }

              case "image":
                return block.content ? (
                  <div
                    key={block.id ?? index}
                    className="w-full overflow-hidden my-4 lg:my-6"
                  >
                    <img
                      src={block.content}
                      alt="Blog content"
                      className="w-full object-contain rounded"
                      loading="lazy"
                    />
                  </div>
                ) : null;

              case "list":
                return (
                  <ul
                    key={block.id ?? index}
                    className="list-disc ml-4 sm:ml-6 lg:ml-10 list-inside text-gray-300 text-xs sm:text-sm lg:text-base space-y-1"
                  >
                    {(Array.isArray(block.content) ? block.content : []).map(
                      (item: string, i: number) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                );

              default:
                return null;
            }
          });
        })()}
      </div>
    </div>
  );
};

export default BlogDetailClient;