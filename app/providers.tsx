"use client";

import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/provider/QueryProvider";
import { LanguageProvider } from "@/context/ClientLanguageContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <QueryProvider>{children}</QueryProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
