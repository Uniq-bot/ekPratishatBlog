import type { Metadata } from "next";
import "./globals.css";
import { BlogProvider } from "@/context/BlogListContext";

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
    <html
      lang="en"
      className="overflow-x-hidden"
    >
      <body><BlogProvider>{children}</BlogProvider></body>
    </html>
  );
}
