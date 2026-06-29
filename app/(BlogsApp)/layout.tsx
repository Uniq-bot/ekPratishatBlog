"use client"
import Footer from "@/components/blog/Footer";
import NavBar from "@/components/blog/NavBar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
    const pathName = usePathname();
  return (
   <SessionProvider>
     <div>
      {!pathName.includes("/blog/") && <NavBar />}
      {children}
      <Footer />
    </div>
   </SessionProvider>
  );
};

export default BlogLayout;
