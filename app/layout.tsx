import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/provider/QueryProvider";
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
    <html lang="en" className="w-full bg-[#1d1d1d]">
      <body cz-shortcut-listen="true">
        <NavBar />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}