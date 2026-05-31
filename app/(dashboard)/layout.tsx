import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/libs/jwt";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const token = (await cookies()).get("token")?.value;

  if (!token || !verifyToken(token)) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default DashboardLayout;
