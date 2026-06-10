"use client";

import React, { useRef, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface BlogFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  currentCategory?: string;
  currentTag?: string;
  currentSort?: string;
  currentSearch?: string;
}

const BlogFilters = ({
  categories,
  tags,
  currentCategory,
  currentTag,
  currentSort = "latest",
  currentSearch,
}: BlogFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Always reset to page 1 when any filter changes
    params.delete("page");
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, {scroll: false});
    });
  };

  const handleSearch = (val: string) => {
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      updateParam("search", val);
    }, 400);
  };

  const handleReset = () => {
    startTransition(() => {
      router.push("/");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, }}
      className={`w-full text-white border-b-5 border-[#EBC044]  py-7 px-5 flex justify-between gap-4 transition-opacity ${
        isPending ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* SEARCH */}
      <div className="flex flex-col w-1/2">
        <label htmlFor="filter-search">Search</label>
        <input
          id="filter-search"
          defaultValue={currentSearch ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
          className="pl-2 outline-none focus:bg-[#2D2D2D] focus:text-[#e8b940] bg-[#ece8df] border border-[#D2C5AB] text-black"
        />
      </div>

      {/* CATEGORY */}
      <div className="flex flex-col w-1/5">
        <label htmlFor="filter-category">Category</label>
        <select
          id="filter-category"
          value={currentCategory ?? "all"}
          onChange={(e) => updateParam("category", e.target.value)}
          className="border text-black focus:bg-[#2D2D2D] focus:text-[#e8b940] border-[#D2C5AB] bg-[#ece8df]"
        >
          <option value="all">All</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* SORT */}
      <div className="flex flex-col w-1/5">
        <label htmlFor="filter-sort">Sort</label>
        <select
          id="filter-sort"
          value={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="border text-black focus:bg-[#2D2D2D] focus:text-[#e8b940] border-[#D2C5AB] bg-[#ece8df]"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* TAGS */}
      <div className="flex flex-col w-1/5">
        <label htmlFor="filter-tag">Tags</label>
        <select
          id="filter-tag"
          value={currentTag ?? "all"}
          onChange={(e) => updateParam("tag", e.target.value)}
          className="border text-black focus:bg-[#2D2D2D] focus:text-[#e8b940] border-[#D2C5AB] bg-[#ece8df]"
        >
          <option value="all">All</option>
          {tags.map((t) => (
            <option key={t.id} value={t.slug}>
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
    </motion.div>
  );
};

export default BlogFilters;
