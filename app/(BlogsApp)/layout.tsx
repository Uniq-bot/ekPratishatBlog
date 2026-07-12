"use client";

import Footer from "@/components/blog/Footer";
import NavBar from "@/components/blog/NavBar";
import { usePathname } from "next/navigation";
import Script from "next/script";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
     
      {!pathname.includes("/blog/") && <NavBar />}
      
      {children}
     
      {!pathname.includes("/blog/") && <Footer />}
    </>
  );
}
