"use client";

import { Dot, Lightbulb } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import BlogComments from "./BlogComments";

import ShareComp from "./ShareComp";

// Heading tag map: level → HTML tag
const headingTag: Record<number, keyof React.JSX.IntrinsicElements> = {
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
};

const headingClass: Record<number, string> = {
  2: "text-2xl sm:text-3xl lg:text-4xl font-black mt-6 sm:mt-7 lg:mt-8 mb-3 sm:mb-4 border-l-4 border-[#C9981A] pl-3 sm:pl-4 text-black",
  3: "text-xl sm:text-2xl lg:text-3xl font-bold mt-5 sm:mt-6 lg:mt-7 mb-2 sm:mb-3 text-[#8a6b12]",
  4: "text-lg sm:text-xl lg:text-2xl font-semibold mt-4 sm:mt-4 mb-3 sm:mb-2 text-black/85",
  5: "text-base sm:text-lg lg:text-xl font-semibold mt-2 sm:mt-3 mb-1 text-black/75",
  6: "text-sm sm:text-base lg:text-lg font-semibold mt-1 sm:mt-2 mb-1 text-black/60",
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

const BlogDetailClient = ({
  blog,
  comments,
}: {
  blog: any;
  comments: any[];
}) => {
  const { data: session } = useSession();
  const blocks = parseBlocks(blog?.content);

  return (
    <div className="w-full lg:w-[65%] h-full rounded-3xl border border-[#eadcb4] bg-white px-3 py-5 text-black shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:px-6 sm:py-6 lg:px-10 lg:py-8">
      {/* Header */}
      <div className="flex w-full flex-col gap-2.5 border-b border-[#eadcb4] pb-5">
        <p className="mb-1 inline-flex w-fit items-center rounded-full border border-[#eadcb4] bg-[#fffaf0] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b12]">
          {blog?.category?.name ?? "Blog / Guides"}
        </p>

        <h1 className="text-3xl font-black leading-tight text-black sm:text-4xl lg:text-5xl">
          {blog?.title}
        </h1>

        <div className="relative mt-3 h-32 w-full overflow-hidden rounded-2xl border border-[#eadcb4] shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:h-48 lg:h-140">
          <Image
            src={blog?.coverImage ?? "/logo.png"}
            alt={blog?.title ?? "Blog cover"}
            width={800}
            height={400}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="mt-4 flex w-full flex-wrap items-start justify-between gap-2 sm:items-center">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {Array.isArray(blog?.tags) &&
              blog.tags.map((tag: any) => (
                <span
                  key={tag?.id ?? tag}
                  className="w-fit rounded-full border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-[#8a6b12]"
                >
                  {typeof tag === "string" ? tag : tag.name}
                </span>
              ))}
          </div>

          <span className="whitespace-nowrap text-xs font-semibold text-black/50 sm:text-sm">
            {blog?.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex w-full flex-col px-1 pb-5 pt-6 sm:px-4">
        {blog?.description && (
          <p className="mt-2 rounded-2xl border-l-4 border-[#C9981A] bg-[#fffaf0] p-5 text-base italic leading-8 text-black/70 shadow-sm">
            "{blog.description}"
          </p>
        )}

        {/* Table of Contents */}
        {blocks.some((b) => b.type === "heading") && (
          <div className="mt-10 rounded-3xl border border-[#eadcb4] bg-[linear-gradient(180deg,#fff_0%,#faf6ec_100%)] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.05)]">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
              On this page
            </p>
            <p className="text-lg font-black text-black sm:text-xl lg:text-2xl">
              Table of Contents
            </p>

            {blocks
              .filter((b) => b.type === "heading")
              .map((b, i) => (
                <div
                  key={i}
                  className={`flex items-center py-2 font-semibold text-black/70 transition-all hover:translate-x-1 hover:text-[#8a6b12] ${
                    b.level === 2 ? "pl-0" : b.level === 3 ? "pl-4" : "hidden"
                  }`}
                >
                 
                  <Dot size={18} className="mt-1 shrink-0 text-[#C9981A] sm:mt-0.5" />
                   <a
                    href={`#heading-${i}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-[#fff4d6] hover:text-[#8a6b12]"
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
                      className="py-2 text-base leading-8 text-black/70 sm:text-base lg:text-lg"
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
                      className="my-8 h-fit overflow-hidden rounded-2xl border border-[#eadcb4] shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
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
                      className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#eadcb4] bg-[#fffdf7] p-6 space-y-3 px-3 py-2 shadow-sm"
                    >
                      {(Array.isArray(block.content) ? block.content : []).map(
                        (item: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-black/75"
                          >
                            <Dot
                              size={20}
                              className="mt-1 shrink-0 text-[#C9981A]"
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
                      className="my-8 rounded-r-2xl border-l-4 border-[#C9981A] bg-[#fffaf0] px-6 py-5 italic text-black/75 shadow-sm"
                    >
                      {block.content}
                    </blockquote>
                  );

                case "callout":
                  return (
                    <div
                      key={block.id ?? index}
                      className="my-8 rounded-2xl border border-[#eadcb4] bg-[#fffaf0] p-5 shadow-sm"
                    >
                      <p className="mb-2 flex items-center gap-2 font-bold text-[#8a6b12]">
                        <Lightbulb size={20} />
                        {block.content?.title || "Important"}
                      </p>

                      <p className="leading-7 text-black/70">
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
                      <div className="h-px flex-1 bg-[#eadcb4]" />
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={70}
                        height={40}
                      />
                      <div className="h-px flex-1 bg-[#eadcb4]" />
                    </div>
                  );

                default:
                  return null;
              }
            });
          })()}
        </div>

        <ShareComp blogTitle={blog.title} blogSlug={blog.slug} />
        <BlogComments blogId={blog.id} slug={blog.slug} comments={comments} />
      </div>
    </div>
  );
};

export default BlogDetailClient;