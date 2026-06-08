"use client";

import { AdminProvider } from "@/context/AdminContext";

export default function AdminProviders({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  return <AdminProvider user={user}>{children}</AdminProvider>;
}