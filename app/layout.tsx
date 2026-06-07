import type { Metadata } from "next";
import "./globals.css";
import { BlogDataProvider } from "@/context/BlogListContext";
import QueryProvider from "@/provider/QueryProvider";

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
          <head>
        <meta httpEquiv="Cache-Control" content="no-store" />
      </head>
      <body>
        <QueryProvider>
            <BlogDataProvider>
              {children}
            </BlogDataProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
