import React from "react";

const BlogsLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      
      {/* 1. TOP HERO & SIDEBAR SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Large Hero Banner */}
        <div className="lg:col-span-2 h-87.5 bg-gray-300 rounded-sm relative p-8 flex flex-col justify-end space-y-3">
          <div className="h-8 bg-gray-400 rounded w-2/3"></div>
          <div className="h-8 bg-gray-400 rounded w-1/2"></div>
          <div className="h-4 bg-gray-400 rounded w-3/4 mt-2"></div>
        </div>

        {/* Right Top Featured Column */}
        <div className="flex flex-col gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-41.75 bg-gray-200 p-6 flex flex-col justify-between border border-gray-300 rounded-sm">
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 w-20 rounded"></div>
                <div className="h-5 bg-gray-300 w-full rounded"></div>
              </div>
              <div className="h-3 bg-gray-300 w-24 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. CATEGORY HORIZONTAL TABS */}
      <div className="flex flex-wrap gap-2 pt-4">
        <div className="h-8 w-12 bg-gray-300 rounded-sm"></div> {/* Active Filter */}
        <div className="h-8 w-24 bg-gray-200 rounded-sm"></div>
        <div className="h-8 w-24 bg-gray-200 rounded-sm"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-sm"></div>
        <div className="h-8 w-16 bg-gray-200 rounded-sm"></div>
        <div className="h-8 w-28 bg-gray-200 rounded-sm"></div>
      </div>

      {/* 3. MAIN CONTENT: ARTICLE LIST & NEWSLETTER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Left Side: Blogs Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section Header Row */}
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div className="h-7 bg-gray-300 w-48 rounded"></div>
            <div className="h-8 bg-gray-200 w-20 rounded"></div>
          </div>

          {/* Blog List Cards */}
          {[1, 2].map((item) => (
            <div key={item} className="flex flex-col sm:flex-row gap-6 border-b border-gray-100 pb-8">
              {/* Thumbnail Image */}
              <div className="w-full sm:w-52 h-36 bg-gray-200 rounded shrink-0"></div>
              
              {/* Content Info */}
              <div className="flex-1 space-y-3">
                <div className="h-3 bg-gray-200 w-16 rounded"></div>
                <div className="h-6 bg-gray-300 w-5/6 rounded"></div>
                
                {/* Meta Sub-tags */}
                <div className="flex gap-2 pt-1">
                  <div className="h-5 bg-gray-200 w-24 rounded"></div>
                  <div className="h-5 bg-gray-200 w-28 rounded"></div>
                  <div className="h-5 bg-gray-200 w-20 rounded"></div>
                </div>
                
                <div className="h-4 bg-gray-200 w-20 rounded pt-2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Stay Updated Widget */}
        <div className="border-l-0 lg:border-l lg:pl-6 border-amber-500/30 space-y-4 h-fit">
          <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 w-full rounded"></div>
            <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
            <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
          </div>
          {/* Input field skeleton */}
          <div className="h-10 bg-gray-100 border border-gray-200 rounded w-full mt-4"></div>
          {/* Button skeleton */}
          <div className="h-10 bg-gray-300 rounded w-28"></div>
        </div>

      </div>

    </div>
  );
};

export default BlogsLoading;