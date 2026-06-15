"use client"
import NavBar from "@/components/blog/NavBar";
import { usePathname } from "next/navigation";
import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
  return (
    <div>
      {!pathName.includes("/blog/") && <NavBar />}
      {children}
    </div>
  );
};

export default BlogLayout;
