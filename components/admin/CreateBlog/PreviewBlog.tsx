
"use client";

import React from "react";
import { Dot, Lightbulb } from "lucide-react";
import Image from "next/image";

const PreviewBlog = ({ blocks }: { blocks: any[] }) => {
  return (
    <div className="w-full border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b px-5 py-3 bg-gray-50">
        <h2 className="font-semibold text-lg">
          Preview of Blog Post
        </h2>
      </div>

      {/* Blog Content */}
      <div className="p-6 max-w-4xl mx-auto flex flex-col">
        {blocks?.map((block, index) => {
          switch (block.type) {
            case "heading":
              return (
                <React.Fragment key={block.id ?? index}>
                  {block.level === 1 && (
                    <h1 className="text-4xl font-bold mt-8 mb-4 text-black">
                      {block.content}
                    </h1>
                  )}

                  {block.level === 2 && (
                    <h2 className="text-3xl font-bold mt-8 mb-4 border-l-4 border-[#79570E] pl-4 text-black">
                      {block.content}
                    </h2>
                  )}

                  {block.level === 3 && (
                    <h3 className="text-2xl font-semibold mt-6 mb-3 text-[#79570E]">
                      {block.content}
                    </h3>
                  )}

                  {block.level === 4 && (
                    <h4 className="text-xl font-semibold mt-5 mb-2 text-gray-800">
                      {block.content}
                    </h4>
                  )}

                  {block.level === 5 && (
                    <h5 className="text-lg font-medium mt-4 mb-2 text-gray-700">
                      {block.content}
                    </h5>
                  )}
                </React.Fragment>
              );

            case "paragraph":
              return (
                <p
                  key={block.id ?? index}
                  className="text-gray-700 leading-8 text-base mb-4"
                >
                  {block.content}
                </p>
              );

            case "list":
              return (
                <ul
                  key={block.id ?? index}
                  className="flex flex-col gap-3 my-4"
                >
                  {(block.content ?? []).map(
                    (item: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <Dot
                          size={20}
                          className="text-[#79570E] shrink-0 mt-0.5"
                        />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>
              );

            case "quote":
              return (
                <blockquote
                  key={block.id ?? index}
                  className="
                    my-6
                    border-l-4
                    border-[#79570E]
                    bg-[#FFF8EC]
                    px-5
                    py-4
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
                    my-6
                    border
                    border-[#FFD07E]
                    bg-[#FFF9E8]
                    p-5
                  "
                >
                  <p className="font-semibold flex mb-2">
                    <Lightbulb /> Important
                  </p>

                  <p className="text-gray-700">
                    {block.content}
                  </p>
                </div>
              );

            case "separator":
              return (
                <div
                  key={block.id ?? index}
                  className="flex items-center gap-4 my-10"
                >
                  <div className="h-px bg-gray-300 flex-1" />
                  <Image src="/logo.png" alt="Logo" width={30} height={30} />
                  <div className="h-px bg-gray-300 flex-1" />
                </div>
              );

            case "image":
              return (
                <div
                  key={block.id ?? index}
                  className="my-8 overflow-hidden rounded-xl shadow-md"
                >
                  <img
                    src={block.content}
                    alt="Preview"
                    className="w-full object-cover"
                  />
                </div>
              );

            default:
              return null;
          }
        })}

        {blocks?.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            No content to preview yet
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewBlog;
