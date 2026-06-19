"use client";
import Link from "next/link";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { MoveRight } from "lucide-react";

const CategoryNav = ({
  categories,
}: {
  categories: { id: string; name: string; slug: string }[];
}) => {
  const searchParams = useSearchParams();
 
  const currentCategory = searchParams.get("category");
  const pathname = usePathname();
  return (
    <div className="flex   items-center text-sm md:text-xl  relative px-2 inset-1.5 py-1 justify-between   gap-3 overflow-hidden">
      {/* <span className="absolute right-0 bg-black/20 p-2 rounded-full">
        <MoveRight />
      </span> */}
      <div className="flex overflow-x-auto gap-2">
        <Link
        scroll={false}
        href={pathname}
        className={`px-3 py-1  rounded border ${!currentCategory ? "bg-amber-400 text-black" : "border-gray-500 text-black"}`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          scroll={false}
          href={`${pathname}?category=${category.slug}`}
          className={`px-3 py-1 whitespace-nowrap rounded border ${currentCategory === category.slug ? "bg-amber-400 text-black" : "border-gray-500 text-black"}`}
        >
          {category.name}
        </Link>
      ))}
      </div>

      <div className="absolute lg:hidden  w-12 pointer-events-none h-full right-0 top-0 bottom-0 bg-linear-to-l from-black/50 to-transparent" />
    
    </div>
  );
};

export default CategoryNav;
