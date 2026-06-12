import BlogClient from "@/components/blog/BlogClient";
import { BlogDataProvider } from "@/context/BlogListContext";
import { initialCategoryFetch, initialFetch, initialLatestFetch, initialTagFetch } from "@/data/initialFetch";



export default async function BlogPage() {
  const initialBlogs = await initialFetch();
  const latestBlogs = await initialLatestFetch();
  const categories = await initialCategoryFetch();
  const tags = await initialTagFetch();
  console.log("cate", categories)
  console.log("tags", tags)

  return (
    <BlogDataProvider>
      <BlogClient
        initialBlogs={initialBlogs}   
        latestBlogs={latestBlogs}     
        initialCategories={categories}
        initialTags={tags}
      />
    </BlogDataProvider>
  );
}