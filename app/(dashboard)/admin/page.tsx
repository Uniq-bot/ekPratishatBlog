import AdminPanel from "@/components/admin/AdminPanel";
import { getCategory, getTags } from "@/data/getBlogs";
import { prisma } from "@/libs/prisma";

export default async function Page() {
   const advertisements= await prisma.advertisement.findMany({
     orderBy: {
    createdAt: "asc",
  },
   })

  return <AdminPanel advertisements={advertisements} />;
}