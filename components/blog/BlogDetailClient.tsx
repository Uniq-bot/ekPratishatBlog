"use client";

import { Dot, Lightbulb } from "lucide-react";
import Image from "next/image";

// Heading tag map: level → HTML tag
const headingTag: Record<number, keyof React.JSX.IntrinsicElements> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};


const headingClass: Record<number, string> = {
  1: "text-3xl sm:text-4xl lg:text-5xl font-black mt-8 sm:mt-10 lg:mt-12 mb-4 sm:mb-5 lg:mb-6 text-black",
  2: "text-2xl sm:text-3xl lg:text-4xl font-bold mt-7 sm:mt-8 lg:mt-10 mb-4 sm:mb-5 border-l-4 border-[#79570E] pl-3 sm:pl-4 text-black",
  3: "text-xl sm:text-2xl lg:text-3xl font-semibold mt-6 sm:mt-7 lg:mt-8 mb-3 sm:mb-4 text-[#79570E]",
  4: "text-lg sm:text-xl lg:text-2xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3 text-gray-800",
  5: "text-base sm:text-lg lg:text-xl font-medium mt-4 sm:mt-5 mb-2 text-gray-700",
  6: "text-sm sm:text-base lg:text-lg font-medium mt-3 sm:mt-4 mb-2 text-gray-600",
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

  return (
    <div className="w-full lg:w-[65%] py-5 h-full bg-[#ffffff] text-black px-3 sm:px-6 lg:px-10">
      <div className="w-full flex flex-col border-b-3 pb-5 border-[#d8a92f] gap-2.5">
        <h1 className="text-2xl sm:text-3xl   lg:text-5xl font-semibold leading-tight">
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
            <span className="absolute top-0 right-0 text-white px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-base bg-black ">
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
          <span className="text-black text-xs sm:text-sm whitespace-nowrap">
            {blog?.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>

      <div className="w-full mt-6 flex flex-col   px-5 pb-5">
        {blog?.description && (
          <p
            className="
    bg-[#F5F5F5]
    border-l-4
    border-[#79570E]
    text-gray-700
    italic
    p-5
    text-base
    leading-8
    mt-6
    
  "
          >
            "{blog.description}"
          </p>
        )}

        {/* Table of Contents */}
        {blocks.some((b) => b.type === "heading") && (
          <div
            className="
    w-full
    bg-[#1D1D1D]
    text-white
    mt-10
       p-5
  "
          >
            {" "}
            <p className="text-lg sm:text-xl lg:text-2xl font-bold">
              Table of Contents
            </p>
            {blocks
              .filter((b) => b.type === "heading")
              .map((b, i) => (
                <div
                  key={i}
                  className={`
                    ${b.level === 1 ? "pl-0" : b.level === 2 ? "pl-4" : "hidden"}
                    py-2
  hover:text-[#79570E]
  hover:translate-x-1
  transition-all
  font-semibold
  flex
`}
                >
                  <Dot size={18} className="shrink-0 mt-1 sm:mt-0.5" />
                  <a
                    href={`#heading-${i}`}
                    className={`hover:text-[#79570E]  transition-all font-semibold`}
                  >
                    {b.content}
                  </a>
                </div>
              ))}
          </div>
        )}

        {/* Content Blocks */}
        <div className="flex flex-col">
          {" "}
          {(() => {
            let headingIndex = 0;
            return blocks.map((block: any, index: number) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p
                      key={block.id ?? index}
                      className="
          text-gray-700
          leading-8
          text-sm
          sm:text-base
          lg:text-lg
          mb-5
        "
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
                      className={`${cls} scroll-mt-24`}
                    >
                      {block.content}
                    </Tag>
                  );
                }

                case "image":
                  return block.content ? (
                    <div
                      key={block.id ?? index}
                      className="my-8 h-100  overflow-hidden hadow-lg"
                    >
                      <img
                        src={block.content}
                        alt="Blog content"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null;

                case "list":
                  return (
                    <ul
                      key={block.id ?? index}
                      className="flex flex-col gap-3 my-5"
                    >
                      {(Array.isArray(block.content) ? block.content : []).map(
                        (item: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start  gap-2 text-gray-700"
                          >
                            <Dot
                              size={20}
                              className="text-[#79570E] shrink-0 mt-1"
                            />
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  );

                case "quote":
                  return (
                    <blockquote
                      key={block.id ?? index}
                      className="
                         my-8
          border-l-4
          border-[#79570E]
          bg-[#FFF8EC]
          px-6
          py-5
          italic
          text-gray-700
          
        "
                    >
                      {block.content}
                    </blockquote>
                  );

                case "callout":
                  return (
                    <div
                      key={block.id ?? index}
                      className="
          my-8
                   border
          border-[#FFD07E]
          bg-[#FFF9E8]
          p-5
        "
                    >
                      <p className="font-bold flex text-[#79570E] mb-2">
                        <Lightbulb /> Important
                      </p>

                      <p className="text-gray-700 leading-7">{block.content}</p>
                    </div>
                  );

                case "separator":
                  return (
                    <div
                      key={block.id ?? index}
                      className="flex items-center gap-4 my-12"
                    >
                      <div className="h-px bg-gray-300 flex-1" />
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={70}
                        height={40}
                      />
                      <div className="h-px bg-gray-300 flex-1" />
                    </div>
                  );

                default:
                  return null;
              }
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailClient;
