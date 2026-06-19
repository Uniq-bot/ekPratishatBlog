"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchFilterProps {
  category?: string;
  tag?: string;
  search?: string;
}

const SearchFilter = ({
  category,
  tag,
  search = "",
}: SearchFilterProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (category) params.set("category", category);
      if (tag) params.set("tag", tag);

      if (query.trim()) {
        params.set("search", query);
      }

      params.delete("page");

      const qs = params.toString();

      router.push(qs ? `?${qs}` : "?", {
        scroll: false,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [query, category, tag, router]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      placeholder="Search blogs..."
      className="md:w-1/2 w-full relative left-1/2 bottom-5 transform -translate-x-1/2 p-3 border-2 border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f4c91b]"
    />
  );
};

export default SearchFilter;