import { useBlogs } from "@/context/BlogListContext";
import React, { useEffect, useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const BlogFilters = () => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagsFilter, setTagsFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("latest");
  const handleReset = () => {
    setQuery("");
    setCategoryFilter("all");
    setTagsFilter("all");
    setSortFilter("latest");
    setInputValue("");
  };
  const { filteredBlogs, setFilteredBlogs, blogsData } = useBlogs();
  const debouncedSetQuery = useMemo(() => useDebounce((v: string) => setQuery(v), 300), [setQuery]);

  useEffect(() => {
    let updatedBlogs = [...blogsData];
    if(categoryFilter !== "all"){
      updatedBlogs = updatedBlogs.filter((blog) => blog.category.toLowerCase() === categoryFilter.toLowerCase())
    }
    if(tagsFilter !== "all"){
      updatedBlogs = updatedBlogs.filter((blog) => blog.tags.map((tag: string) => tag.toLowerCase()).includes(tagsFilter.toLowerCase()))
    }
    if(query){
      updatedBlogs = updatedBlogs.filter((blog) => blog.title.toLowerCase().includes(query.toLowerCase()) || blog.description.toLowerCase().includes(query.toLowerCase()))
    }
    if(sortFilter === "latest"){
      updatedBlogs = updatedBlogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else {
      updatedBlogs = updatedBlogs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    setFilteredBlogs(updatedBlogs);
  }, [query, categoryFilter, tagsFilter, sortFilter]);

  useEffect(() => {
    debouncedSetQuery(inputValue);
  }, [inputValue, debouncedSetQuery]);
  return (
    <div className="w-full h-40 border-b border-l border-gray-400 py-3 px-5 flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <label>Search</label>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search..."
          type="text"
          className=" pl-2  outline-none border-b border-r  text-lg py-1/2 "
        />
      </div>
      <div className="flex justify-between items-center gap-10">
        <div className="flex flex-col gap-1 w-full ">
          <label className="text-md">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            name="category"
            id="category"
            className="outline-none border text-md py-1/2 w-full"
          >
            <option value="all">All</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="investment">Investment</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-md">Tags</label>
          <select
            value={tagsFilter}
            onChange={(e) => setTagsFilter(e.target.value)}
            name="tags"
            id="tags"
            className="outline-none border text-md py-1/2 w-full"
          >
            <option value="all">All</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="investment">Investment</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label className="text-md">Sort</label>
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            name="sort"
            id="sort"
            className="outline-none border text-md py-1/2 w-full"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="flex items-center justify-center w-full">
          <button
            onClick={() => handleReset()}
            className="bg-red-600 cursor-pointer transition-all hover:rounded-2xl mt-6 px-4 py-1 text-white hover:bg-red-700"
          >
            Reset filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;
