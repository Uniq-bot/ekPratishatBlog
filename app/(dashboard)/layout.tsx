// app/(dashboard)/layout.tsx  — SERVER COMPONENT
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/libs/jwt";
import { prisma } from "@/libs/prisma";
import { AdminProvider } from "@/context/AdminContext";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload || typeof payload !== "object" || !("userId" in payload)) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, name: true },
  });

  if (!user) redirect("/login");

  return <AdminProvider user={user}>{children}</AdminProvider>;
}