

import AdminPanel from "@/components/admin/AdminPanel";
import { initialCategoryFetch, initialTagFetch } from "@/data/initialFetch";




export default async function Page() {
    const categories = await initialCategoryFetch();
  const tags = await initialTagFetch();
  return <AdminPanel initialCategories={categories} initialTags={tags} />;
}