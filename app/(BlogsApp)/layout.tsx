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
      {/* <Script
        src="https://cdn.jsdelivr.net/gh/Flowcodelab/LingoJs@main/lingo-snippet.obf.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.lingojs?.initialize?.({
            projectKey: "2bc6a8bd04",
            baseLanguage: "en",
            targetLanguage: "ne",
            showWidget: true,
            rememberLanguage: true,
          });
        }}
      /> */}
      {!pathname.includes("/blog/") && <NavBar />}
      
        {/* <NavBar /> */}
      {children}
     
      {!pathname.includes("/blog/") && <Footer />}
    </>
  );
}
