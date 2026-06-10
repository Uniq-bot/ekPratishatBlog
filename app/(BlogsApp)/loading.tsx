import React from "react";

const BlogsLoading = () => {
  return (
    <div className="w-full flex gap-6 animate-pulse p-10">
      {/* LEFT MAIN BLOG AREA */}
      <div className="w-[65%] flex flex-col gap-6">
        {/* Hero skeleton */}
        <div className="h-64 w-full  bg-gray-300" />

        {/* Title */}
        <div className="h-6 w-3/4  bg-gray-300" />

        {/* Meta */}
        <div className="flex gap-4">
          <div className="h-4 w-24  bg-gray-200" />
          <div className="h-4 w-24  bg-gray-200" />
        </div>

        {/* Paragraph lines */}
        <div className="flex flex-col gap-3">
          <div className="h-4 w-full  bg-gray-200" />
          <div className="h-4 w-[90%]  bg-gray-200" />
          <div className="h-4 w-[80%]  bg-gray-200" />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[35%] flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4  border border-gray-700/40 bg-gray-900/30 space-y-3"
          >
            <div className="h-4 w-1/2  bg-gray-300" />
            <div className="h-5 w-full  bg-gray-300" />
            <div className="h-3 w-1/3  bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsLoading;