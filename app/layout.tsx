import type { Metadata } from "next";
import "./globals.css";
import { BlogDataProvider } from "@/context/BlogListContext";
import NavBar from "@/components/blog/NavBar";

export const metadata: Metadata = {
  title: "Ek Pratishat | Blogs",
  description: "Place where we share our Ideas, and Experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" w-full bg-[#F7F3EA] ">
      <body>
        <BlogDataProvider>{children}</BlogDataProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
