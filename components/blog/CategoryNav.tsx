"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const CategoryNav = ({
  categories,
  idx = 0,
  currentLanguage = "en",
}: {
  categories: { id: string; name: string; slug: string; translations?: any }[];
  idx?: number;
  currentLanguage?: string;
}) => {
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const pathname = usePathname();
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
            {currentLanguage === "en" ? "Browse by topic" : "विषय अनुसार ब्राउज गर्नुहोस्"}
          </h3>
        </div>
        <span
          className={
            currentLanguage === "en"
              ? "rounded-full border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-xs font-semibold text-black"
              : "rounded-full border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-sm font-semibold text-black"
          }
        >
          {currentLanguage === "en"
            ? `${categories.length} topics`
            : `${categories.length} विषयहरू`}
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Link
          scroll={false}
          href={pathname}
          className={`shrink-0 rounded-full border px-4 py-2 font-semibold transition-colors ${
            currentLanguage === "en" ? "text-sm" : "text-base"
          } ${
            !currentCategory
              ? "border-[#f2cf67] bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black"
              : "border-[#d9c8a0] bg-[#fffdf6] text-black hover:border-[#c9981a]"
          }`}
        >
          {currentLanguage === "en" ? "All" : "सबै"}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            scroll={false}
            href={`${pathname}?category=${category.slug}`}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-semibold transition-colors ${
              currentLanguage === "en" ? "text-sm" : "text-base"
            } ${
              currentCategory === category.slug
                ? "border-[#f2cf67] bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black"
                : "border-[#d9c8a0] bg-[#fffdf6] text-black hover:border-[#c9981a]"
            }`}
          >
            {category?.translations?.[idx]?.name || category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryNav;