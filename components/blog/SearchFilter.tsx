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
    <section className=" border-b border-[#e7d6ab] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
            SEARCH
          </p>
          <h3 className="text-base font-bold text-black">Find articles</h3>
        </div>
        <span className="rounded-full bg-[#fff7dc] px-3 py-1 text-xs font-semibold text-black">
          Quick search
        </span>
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search posts"
        className="h-12 w-full rounded-xl border border-[#d8c58e] bg-[#fffdf7] px-4 text-sm text-black outline-none transition-colors placeholder:text-black/35 focus:border-[#c9981a] focus:ring-2 focus:ring-[#f4c91b]/20"
      />
    </section>
  );
};

export default SearchFilter;