"use client";

import React, { useEffect, useState } from "react";
import { useBlogUi } from "@/context/BlogListContext";

const BlogFilters = () => {
  const {
    tag,
    setTag,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    sortFilter,
    setSortFilter,
    setPage,
  } = useBlogUi();

  const [categoriesData, setCategoriesData] = useState<
    { id: string; name: string }[]
  >([]);

  const [tagsData, setTagsData] = useState<
    { id: string; name: string }[]
  >([]);

  

  /* ---------------- RESET ---------------- */
  const handleReset = () => {
    setSearchQuery("");
    setCategory("all");
    setTag("all");
    setSortFilter("latest");
    setPage(1);
  };

  return (
    <div className="w-full bg-[#F7F3EA] border-b border-l border-gray-400 py-3 px-5 flex flex-col gap-4">

      {/* SEARCH */}
      <div className="flex flex-col gap-2">
        <label>Search</label>
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search..."
          className="pl-2 outline-none bg-[#ece8df] border"
        />
      </div>

      {/* FILTERS */}
      <div className="flex justify-between gap-4">

        {/* CATEGORY */}
        <div className="flex flex-col w-full">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border bg-[#ece8df]"
          >
            <option value="all">All</option>
            {categoriesData.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* SORT */}
        <div className="flex flex-col w-full">
          <label>Sort</label>
          <select
            value={sortFilter}
            onChange={(e) => {
              setSortFilter(e.target.value);
              setPage(1);
            }}
            className="border bg-[#ece8df]"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* TAGS */}
        <div className="flex flex-col w-full">
          <label>Tags</label>
          <select
            value={tag}
            onChange={(e) => {
              setTag(e.target.value);
              setPage(1);
            }}
            className="border bg-[#ece8df]"
          >
            <option value="all">All</option>
            {tagsData.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        {/* RESET */}
        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="bg-red-600 text-white px-3 py-1"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;