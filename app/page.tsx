import BlogClient from "@/components/blog/BlogClient";
import { BlogDataProvider } from "@/context/BlogListContext";
import { initialFetch, initialLatestFetch } from "@/data/initialFetch";



export default async function BlogPage() {
  const initialBlogs = await initialFetch();
  const latestBlogs = await initialLatestFetch();

  return (
    <BlogDataProvider>
      <BlogClient
        initialBlogs={initialBlogs}   // ✅ pass full { posts, totalCount }
        latestBlogs={latestBlogs}     // ✅ pass full object
      />
    </BlogDataProvider>
  );
}