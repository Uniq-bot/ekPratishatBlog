import React from 'react'

const DetailLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse">
      
      {/* Top Breadcrumb Skeleton */}
      <div className="h-4 w-48 bg-gray-200 rounded mb-8"></div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Main Blog Post */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Title */}
          <div className="space-y-3">
            <div className="h-10 bg-gray-300 rounded w-11/12"></div>
            <div className="h-10 bg-gray-300 rounded w-2/3"></div>
          </div>

          {/* Main Feature Image */}
          <div className="w-full h-[400px] bg-gray-200 rounded-lg"></div>

          {/* Tags and Date Row */}
          <div className="flex justify-between items-center pt-2">
            <div className="flex gap-2">
              <div className="h-6 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-28 bg-gray-200 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>

          <hr className="border-gray-200 my-4" />

          {/* Table of Contents Container */}
          <div className="bg-gray-100 rounded-lg p-6 space-y-4">
            <div className="h-6 w-36 bg-gray-300 rounded"></div>
            <div className="space-y-2 pl-4">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Related Blogs) */}
        <div className="space-y-4">
          {/* Sidebar Heading */}
          <div className="h-6 w-32 bg-gray-300 rounded mb-4"></div>

          {/* Related Blog Card */}
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            {/* Small Category Tag */}
            <div className="h-5 w-20 bg-gray-200 rounded"></div>
            
            {/* Blog Title Lines */}
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-full"></div>
              <div className="h-5 bg-gray-200 rounded w-4/5"></div>
            </div>

            {/* Date */}
            <div className="h-3 w-16 bg-gray-200 rounded pt-2"></div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetailLoading