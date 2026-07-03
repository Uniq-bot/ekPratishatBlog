"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const CategoryNav = ({
  categories,
}: {
  categories: { id: string; name: string; slug: string }[];
}) => {
  const searchParams = useSearchParams();
 
  const currentCategory = searchParams.get("category");
  const pathname = usePathname();
  return (
    <section className="rounded-2xl border border-[#e7d6ab] bg-white/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
            Categories
          </p>
          <h3 className="text-base font-bold text-black">Browse by topic</h3>
        </div>
        <span className="rounded-full border border-[#eadcb4] bg-[#fffaf0] px-3 py-1 text-xs font-semibold text-black">
          {categories.length} topics
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        <Link
          scroll={false}
          href={pathname}
          className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${!currentCategory ? "border-[#f2cf67] bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black" : "border-[#d9c8a0] bg-[#fffdf6] text-black hover:border-[#c9981a]"}`}
        >
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            scroll={false}
            href={`${pathname}?category=${category.slug}`}
            className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${currentCategory === category.slug ? "border-[#f2cf67] bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black" : "border-[#d9c8a0] bg-[#fffdf6] text-black hover:border-[#c9981a]"}`}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryNav;
