import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="en" className="w-full bg-[#2E2E2E]">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}