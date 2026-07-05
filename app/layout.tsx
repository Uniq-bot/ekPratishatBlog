import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/provider/QueryProvider";
import NotificationCenter from "@/components/shared/NotificationCenter";
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
    <html lang="en">
      <body>
        <QueryProvider>
          <NotificationCenter />
          
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}