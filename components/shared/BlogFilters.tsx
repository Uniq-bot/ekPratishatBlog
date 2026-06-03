import { useBlogs } from "@/context/BlogListContext";
import React, { useEffect, useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const BlogFilters = () => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagsFilter, setTagsFilter] = useState("all");
  const {
    setSearchQuery,
    setCategoryId,
    setTags,
    setPage,
    sortFilter,
    setSortFilter,
  } = useBlogs();
  const [categoriesData, setCategoriesData] = useState<
    { id: string; name: string }[]
  >([]);
  const [tagsData, setTagsData] = useState<{ id: string; name: string }[]>([]);
  const handleReset = () => {
    setQuery("");
    setCategoryFilter("all");
    setTagsFilter("all");
    setInputValue("");
    setSearchQuery("");
    setCategoryId("");
    setTags([]);
    setPage(1);
    setSortFilter("latest");
  };
  const debouncedSetQuery = useMemo(
    () => useDebounce((v: string) => setQuery(v), 300),
    [setQuery],
  );

  useEffect(() => {
    setSearchQuery(query);
    setPage(1);
  }, [query, setSearchQuery, setPage]);

  useEffect(() => {
    debouncedSetQuery(inputValue);
  }, [inputValue, debouncedSetQuery]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [catsRes, tagsRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/tags"),
        ]);
        if (catsRes.ok) {
          const cats = await catsRes.json();
          setCategoriesData(Array.isArray(cats) ? cats : []);
          console.log("Fetched categories:", Array.isArray(cats) ? cats : []);
        }
        if (tagsRes.ok) {
          const t = await tagsRes.json();
          setTagsData(Array.isArray(t) ? t : []);
          console.log("Fetched tags:", Array.isArray(t) ? t : []);
        }
      } catch (err) {
        console.error("Failed to fetch categories/tags", err);
      }
    };
    fetchMeta();
  }, []);
  return (
    <div className="w-full  lg:relative lg:z-0 bg-[#F7F3EA] h-40 border-b border-l border-gray-400 py-3 px-5 flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <label>Search</label>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          type="text"
          className=" pl-2  outline-none bg-[#ece8df] border-b border-r  text-lg py-1/2 "
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col gap-1 w-full ">
          <label className="text-md">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => {
              const value = e.target.value;
              setCategoryFilter(value);
              setCategoryId(value === "all" ? "" : value);
              setPage(1);
            }}
            name="category"
            id="category"
            className="outline-none bg-[#ece8df] border text-md py-1/2 w-full"
          >
            <option value="all">All</option>
            {categoriesData.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-md">Sort</label>
          <select
            value={sortFilter}
            onChange={(e) => {
              setSortFilter(e.target.value);
              setPage(1);
            }}
            name="sort"
            id="sort"
            className="outline-none bg-[#ece8df] border text-md py-1/2 w-full"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-md">Tags</label>
          <select
            value={tagsFilter}
            onChange={(e) => {
              const value = e.target.value;
              setTagsFilter(value);
              setTags(value === "all" ? [] : [value]);
              setPage(1);
            }}
            name="tags"
            id="tags"
            className="outline-none border  bg-[#ece8df] text-md py-1/2 w-full"
          >
            <option value="all">All</option>
            {tagsData.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            onClick={() => handleReset()}
            className="bg-red-600 cursor-pointer text-[12px] py-1 px-1 mt-7 transition-all hover:rounded-2xl md:mt-6 md:px-4 md:py-1 text-white hover:bg-red-700"
          >
            Reset filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;
