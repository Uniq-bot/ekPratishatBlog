import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import NotificationCenter from "@/components/shared/NotificationCenter";

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
        <Providers>
          <NotificationCenter />
          {children}
        </Providers>
      </body>
    </html>
  );
}