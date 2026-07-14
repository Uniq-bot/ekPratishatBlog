"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

interface SearchFilterProps {
  category?: string;
  tag?: string;
  search?: string;
  idx?: number;
  currentLanguage?: string;
}

const SearchFilter = ({ category, tag, search = "", currentLanguage = "en" }: SearchFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(search ?? "");
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  useEffect(() => {
    setQuery(search ?? "");
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const queryValue = query.trim();
      const currentSearch = searchParams.get("search") ?? "";
      const currentCategory = searchParams.get("category") ?? "";
      const currentTag = searchParams.get("tag") ?? "";
      const targetCategory = category ?? "";
      const targetTag = tag ?? "";

      const isSearchSame = currentSearch === queryValue;
      const isCategorySame = currentCategory === targetCategory;
      const isTagSame = currentTag === targetTag;

      if (isSearchSame && isCategorySame && isTagSame) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      if (queryValue) {
        params.set("search", queryValue);
      } else {
        params.delete("search");
      }

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      if (tag) {
        params.set("tag", tag);
      } else {
        params.delete("tag");
      }

      params.delete("page");

      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      const currentUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

      if (nextUrl !== currentUrl) {
        router.replace(nextUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, category, tag, pathname, router, searchParams]);

  return (
    <div className="flex w-full  gap-0 sm:w-auto pb-1">
      <button
        onClick={() => setSearchBoxOpen(!searchBoxOpen)}
        aria-label={searchBoxOpen ? "Close search" : "Open search"}
        className="flex shrink-0 items-center justify-center border border-[#d8c58e] bg-[#fffdf7] px-4  text-sm text-black transition-colors hover:bg-[#f4c91b]/20"
      >
        {searchBoxOpen ? <X size={18} /> : <Search size={18} />}
      </button>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={currentLanguage === "en" ? "Search posts" : "पोस्टहरू खोज्नुहोस्"}
        className={`min-w-0 border border-l-0 border-[#d8c58e] bg-[#fffdf7] py-2 text-sm text-black outline-none transition-all duration-300 placeholder:text-black/35 focus:border-[#c9981a] focus:ring-2 focus:ring-[#f4c91b]/20 ${
          searchBoxOpen
            ? "w-full px-4 opacity-100 sm:w-64"
            : "w-0 border-l-0 px-0 opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
};

export default SearchFilter;