import BlogClient from "@/components/blog/BlogClient";
import { initialcategoryFetch, initialFetch, initialLatestFetch, initialTagsFetch } from "@/data/initialFetch";

// No SSR prefetch — the shared QueryClient across layouts means hydrated data
// gets "stuck" and refetchOnMount never fires on back-navigation.
// BlogClient fetches client-side on every mount instead, which is correct behavior.
export default async function BlogPage() {
  const blogs= await initialFetch();
  const latestBlogs= await initialLatestFetch();
  const categories= await initialcategoryFetch();
  const tags= await initialTagsFetch();
  // console.log("data fro server:", blogs)
  // console.log("tags from sercer", tags)
  // console.log("categories from sercer", categories)

  return <BlogClient initialBlogs={blogs} initialLatestBlogs={latestBlogs} initialCategories={categories} initialTags={tags} />;
}