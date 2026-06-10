import AdminPanel from "@/components/admin/AdminPanel";
import { getCategory, getTags } from "@/data/getBlogs";

export default async function Page() {
  const [categories, tags] = await Promise.all([
    getCategory(),
    getTags(),
  ]);

  return <AdminPanel initialCategories={categories} initialTags={tags} />;
}