"use client";

import { Dot, Lightbulb } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
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
  const { data: session } = useSession();
  console.log(session)

  const blocks = parseBlocks(blog?.content);
    const handleCommentPost=()=>{
      try {
          if (!session) {
            signIn("google", { callbackUrl: window.location.href });
          }
          else{
            console.log("comment posted by user: ", session.user?.email);
          }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  return (
    <div className="w-full lg:w-[65%] h-full bg-[#F4F1EC] px-3 py-5 text-black sm:px-6 lg:px-10">
      <button onClick={() => signOut()}>Sign out</button>
      {/* Header */}
      <div className="flex w-full flex-col gap-2.5 border-b-3 border-[#d8a92f] pb-5">
        <h1 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-5xl">
          {blog?.title}
        </h1>

        <div className="relative mt-3 h-32 w-full overflow-hidden shadow-md shadow-black/50 sm:h-48 lg:h-140">
          <Image
            src={blog?.coverImage ?? "/logo.png"}
            alt={blog?.title ?? "Blog cover"}
            width={800}
            height={400}
            className="h-full w-full object-cover"
            priority
          />
          {blog?.category?.name && (
            <span className="absolute right-0 top-0 bg-black px-2 py-1 text-xs text-white sm:px-4 sm:py-2 sm:text-sm lg:text-base">
              {blog.category.name}
            </span>
          )}
        </div>

        <div className="mt-4 flex w-full flex-wrap items-start justify-between gap-2 sm:items-center">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {Array.isArray(blog?.tags) &&
              blog.tags.map((tag: any) => (
                <span
                  key={tag?.id ?? tag}
                  className="w-fit border border-[#FFD07E] bg-[rgba(255,253,248,0.94)] px-2 py-1 text-xs font-semibold uppercase text-black shadow-md ring-1 ring-[#36332e] backdrop-blur-sm"
                >
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
          </div>

          <span className="whitespace-nowrap text-xs text-black sm:text-sm">
            {blog?.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex w-full flex-col px-5 pb-5 pt-6">
        {blog?.description && (
          <p className="mt-6 border-l-4 border-[#79570E] bg-[#b1b1b1] p-5 text-base italic leading-8 text-gray-700">
            "{blog.description}"
          </p>
        )}

        {/* Table of Contents */}
        {blocks.some((b) => b.type === "heading") && (
          <div className="mt-10 w-full bg-[#1D1D1D] p-5 text-white">
            <p className="text-lg font-bold sm:text-xl lg:text-2xl">
              Table of Contents
            </p>

            {blocks
              .filter((b) => b.type === "heading")
              .map((b, i) => (
                <div
                  key={i}
                  className={`flex items-center py-2 font-semibold transition-all hover:translate-x-1 hover:text-[#79570E] ${
                    b.level === 2 ? "pl-0" : b.level === 3 ? "pl-4" : "hidden"
                  }`}
                >
                  <Dot size={18} className="mt-1 shrink-0 sm:mt-0.5" />
                  <a
                    href={`#heading-${i}`}
                    className="font-semibold transition-all hover:text-[#79570E]"
                  >
                    {b.content}
                  </a>
                </div>
              ))}
          </div>
        )}

        {/* Content Blocks */}
        <div className="flex flex-col">
          {(() => {
            let headingIndex = 0;

            return blocks.map((block: any, index: number) => {
              switch (block.type) {
                case "paragraph":
                  return (
                    <p
                      key={block.id ?? index}
                      className="mb-5 text-sm leading-8 text-gray-700 sm:text-base lg:text-lg"
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
                      className="my-8 h-fit overflow-hidden shadow-lg"
                    >
                      <img
                        src={block.content}
                        alt="Blog content"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null;

                case "list":
                  return (
                    <ul
                      key={block.id ?? index}
                      className="my-5 flex flex-col gap-3  border border-[#79570E] border-l-5 p-5"
                    >
                      {(Array.isArray(block.content) ? block.content : []).map(
                        (item: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <Dot
                              size={20}
                              className="mt-1 shrink-0 text-[#79570E]"
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
                      className="my-8 border-l-4 border-[#79570E] bg-[#EDE7DC] px-6 py-5 italic text-[#3D2F12] shadow-sm"
                    >
                      {block.content}
                    </blockquote>
                  );

                case "callout":
                  return (
                    <div
                      key={block.id ?? index}
                      className="my-8 border border-[#D6B06B] bg-[#FFF4DD] p-5 shadow-sm"
                    >
                      <p className="mb-2 flex items-center gap-2 font-bold text-[#79570E]">
                        <Lightbulb />
                        {block.content?.title || "Important"}
                      </p>

                      <p className="leading-7 text-[#4A3A1A]">
                        {block.content?.description}
                      </p>
                    </div>
                  );
                case "separator":
                  return (
                    <div
                      key={block.id ?? index}
                      className="my-12 flex items-center gap-4"
                    >
                      <div className="h-px flex-1 bg-gray-300" />
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={70}
                        height={40}
                      />
                      <div className="h-px flex-1 bg-gray-300" />
                    </div>
                  );

                default:
                  return null;
              }
            });
          })()}
        </div>
            <div>
              <button onClick={()=>handleCommentPost()}>
                Post comment
              </button>
            </div>

      </div>
    </div>
  );
};

export default BlogDetailClient;
