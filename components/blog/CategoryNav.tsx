"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

const CategoryNav = ({
  categories,
}: {
  categories: { id: string; name: string }[];
}) => {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const pathname = usePathname();
  return (
    <div className="flex gap-3 flex-wrap">
      <Link
        scroll={false}
        href={pathname}
        className={`px-3 py-1 border ${!currentCategory ? "bg-amber-400 text-black" : "border-gray-500 text-gray-300"}`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          scroll={false}
          href={`${pathname}?category=${category.name.toLowerCase()}`}
          className={`px-3 py-1 border ${currentCategory === category.name.toLowerCase() ? "bg-amber-400 text-black" : "border-gray-500 text-gray-300"}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryNav;
