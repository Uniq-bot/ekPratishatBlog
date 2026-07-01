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
    <div className="flex   items-center text-sm md:text-xl mr-2  relative inset-1.5 py-1 justify-between   gap-3 overflow-hidden">
      {/* <span className="absolute right-0 bg-black/20 p-2 rounded-full">
        <MoveRight />
      </span> */}
      <div className="flex overflow-x-auto gap-2">
        <Link
        scroll={false}
        href={pathname}
        className={`px-3 py-1  rounded border ${!currentCategory ? "bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black" : "border-gray-500 text-black"}`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          scroll={false}
          href={`${pathname}?category=${category.slug}`}
          className={`px-3 py-1 whitespace-nowrap rounded border ${currentCategory === category.slug ? "bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] text-black" : "border-gray-500 text-black"}`}
        >
          {category.name}
        </Link>
      ))}
      </div>

      <div className={`absolute ${categories.length > 4 ? "flex" : "hidden"}   w-12 pointer-events-none h-full right-0 top-0 bottom-0 bg-linear-to-l from-gray-400/50 to-transparent`} />
    
    </div>
  );
};

export default CategoryNav;
