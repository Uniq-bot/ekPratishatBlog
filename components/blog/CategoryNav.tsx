"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import SearchFilter from "./SearchFilter";

const CategoryNav = ({
  categories,
  totalCounts,
  idx = 0,
  category,
  tag,
  search,
  currentLanguage = "en",
}: {
  categories: { id: string; name: string; slug: string; translations?: any }[];
  idx?: number;
  currentLanguage?: string;
  totalCounts: number;
  category?: string;
  tag?: string;
  search?: string;
}) => {
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const pathname = usePathname();

  const buildCategoryHref = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("page");

    return params.toString() ? `${pathname}?${params.toString()}` : pathname;
  };

  return (
    <section className=" border-b border-[#e7d6ab] bg-white/95 p-4  sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p
            className={
              currentLanguage === "en"
                ? "text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]"
                : "text-sm font-semibold uppercase  text-[#8a6b12]"
            }
          >
            {currentLanguage === "en" ? "Categories" : "कोटिहरू"}
          </p>
          <h3
            className={
              currentLanguage === "en"
                ? "text-base font-bold text-black"
                : "text-lg font-bold text-black"
            }
          >
            {currentLanguage === "en"
              ? "Browse by topic"
              : "विषय अनुसार ब्राउज गर्नुहोस्"}
          </h3>
        </div>
        <div
          className={`border border-[#eadcb4] bg-[#fffaf0] px-4 py-2 font-semibold text-black shadow-sm ${currentLanguage === "en" ? "text-sm" : "text-base"}`}
        >
          {totalCounts} {currentLanguage === "en" ? "Articles" : "लेखहरू"}
        </div>
      </div>

 <div className="flex items-center flex-col lg:flex-row lg:overflow-x-hidden gap-2">
        <SearchFilter
          category={category}
          tag={tag}
          search={search}
          idx={idx}
          currentLanguage={currentLanguage}
        />
        <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1 items-center">
          <Link
            scroll={false}
            href={buildCategoryHref()}
            className={`shrink-0  border px-4 py-2 font-semibold transition-colors ${
              currentLanguage === "en" ? "text-sm" : "text-base"
            } ${
              !currentCategory
                ? "border-[#f2cf67] bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black"
                : "border-[#d9c8a0] bg-[#fffdf6] text-black hover:border-[#c9981a]"
            }`}
          >
            {currentLanguage === "en" ? "All" : "सबै"}
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              scroll={false}
              href={buildCategoryHref(cat.slug)}
              className={`shrink-0 whitespace-nowrap  border px-4 py-2 font-semibold transition-colors ${
                currentLanguage === "en" ? "text-sm" : "text-base"
              } ${
                currentCategory === cat.slug
                  ? "border-[#f2cf67] bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black"
                  : "border-[#d9c8a0] bg-[#fffdf6] text-black hover:border-[#c9981a]"
              }`}
            >
              {cat?.translations?.[idx]?.name || cat.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
