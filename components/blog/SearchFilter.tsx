"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    <section id="list"  className="border  border-[#e7d6ab] bg-white/90 p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className={
            currentLanguage === "en"
              ? "text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]"
              : "text-sm font-semibold uppercase  text-[#8a6b12]"
          }>
            {currentLanguage === "en" ? "SEARCH" : "खोज"}
          </p>
          <h3 className="text-base font-bold text-black">
            {currentLanguage === "en" ? "Find articles" : "लेख खोज्नुहोस्"}
          </h3>
        </div>
        <span className="bg-[#fff7dc] px-3 py-1 text-xs font-semibold text-black">
          {currentLanguage === "en" ? "Quick search" : "द्रुत खोज"}
        </span>
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder={currentLanguage === "en" ? "Search posts" : "पोस्टहरू खोज्नुहोस्"}
        className="h-12 w-full border border-[#d8c58e] bg-[#fffdf7] px-4 text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#c9981a] focus:ring-2 focus:ring-[#f4c91b]/20"
      />
    </section>
  );
};

export default SearchFilter;