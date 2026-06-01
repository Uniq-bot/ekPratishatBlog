import Image from "next/image";
import React from "react";

const BlogDetailClient = ({ blog }: { blog: any }) => {
  return (
    <div className="w-[65%] h-full px-10 ">
      <div className="w-full h-120 flex flex-col  gap-2.5">
        <h1 className="text-5xl font-semibold leading-none">{blog.title}</h1>
        <div className="w-full h-[90%] shadow-md shadow-black/50  overflow-hidden relative">
          <Image
            src={blog.image}
            alt="image"
            width={200}
            height={200}
            className="w-full h-full "
          />
          <span className="absolute top-0 right-0 text-white px-5 py-2 bg-black z-10">
            {blog.category}
          </span>
        </div>
        <div className="w-full flex justify-between">
          <div className=" flex gap-4">
            {blog.tags.map((tag: any, index: any) => (
              <span key={index} className="px-3 py-1 bg-amber-200">
                {tag}
              </span>
            ))}
          </div>
          <span className="text-gray-400 mr-2">{blog.createdAt}</span>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5">
        <p className="bg-gray-300 p-5 rounded-xl">
                  {blog.description}
                </p>
        {blog.content.map((content: any, index: any) => {
          switch (content.type) {
            case "paragraph":
              return <p className="text-md text-gray-700">{content.value}</p>;
            case "heading":
              return <><h1 className="text-2xl font-bold">{content.value}</h1>
                
              </>;
            case "list":
              return (
                <ul className="list-disc ml-10 list-inside text-gray-700">
                  {content.items.map((item: any, index: any) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              );
          }
        })}
      </div>
    </div>
  );
};

export default BlogDetailClient;
