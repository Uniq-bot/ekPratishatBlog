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
    <div className="flex gap-3 flex-wrap">
      <Link
        scroll={false}
        href={pathname}
        className={`px-3 py-1 rounded border ${!currentCategory ? "bg-amber-400 text-black" : "border-gray-500 text-black"}`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          scroll={false}
          href={`${pathname}?category=${category.slug}`}
          className={`px-3 py-1 rounded border ${currentCategory === category.slug ? "bg-amber-400 text-black" : "border-gray-500 text-black"}`}
        >
          {category.name}
        </Link>
      ))}
    
    </div>
  );
};

export default CategoryNav;
