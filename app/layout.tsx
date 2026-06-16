import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/provider/QueryProvider";
// import QueryProvider from "@/provider/QueryProvider";
// import NavBar from "@/components/blog/NavBar";

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
    <html lang="en" className=" w-full bg-(--color-background) select-none font-sans">
      <body cz-shortcut-listen="true">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}