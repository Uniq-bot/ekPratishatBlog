import Image from "next/image";
import React from "react";

const BlogDetailClient = ({ blog }: { blog: any }) => {
  return (
    <div className="w-full md:w-[65%] h-full px-4 md:px-10">
      <div className="w-full flex flex-col gap-2.5">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          {blog?.title}
        </h1>
        <div className="w-full h-48 md:h-120 shadow-md shadow-black/50 overflow-hidden relative mt-3">
          <Image
            src={blog?.image}
            alt="image"
            width={800}
            height={400}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-0 right-0 text-white px-4 py-1 md:px-5 md:py-2 bg-black z-10">
            {blog?.category}
          </span>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 md:gap-4 flex-wrap">
            {Array.isArray(blog?.tags) &&
              blog?.tags.map((tag: any, index: any) => (
                <span key={index} className="px-3 py-1 bg-amber-200 text-sm">
                  {tag}
                </span>
              ))}
          </div>
          <span className="text-gray-400 hidden lg:block mr-2 text-xs md:text-sm">
            {blog?.createdAt}
          </span>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-5">
        <p className="bg-gray-300 p-4 md:p-5 rounded-xl text-sm md:text-base leading-relaxed">
          {blog?.description}
        </p>
        {Array.isArray(blog?.content) &&
          blog?.content.map((content: any, index: any) => {
            switch (content.type) {
              case "paragraph":
                return (
                  <p
                    key={index}
                    className="text-sm md:text-md text-gray-700 leading-relaxed"
                  >
                    {content.value}
                  </p>
                );
              case "heading":
                return (
                  <h2
                    key={index}
                    className="text-xl md:text-2xl font-bold mt-4"
                  >
                    {content.value}
                  </h2>
                );
              case "list":
                return (
                  <ul
                    key={index}
                    className="list-disc ml-5 md:ml-10 list-inside text-gray-700"
                  >
                    {content.items.map((item: any, i: any) => (
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
