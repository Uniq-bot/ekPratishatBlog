import BlogClient from "@/components/blog/BlogClient";
import { BlogDataProvider } from "@/context/BlogListContext";
import { fetchBlogs } from "@/libs/fetch";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";



export default async function BlogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs({ page: 1, limit: 10, tags: [], category: "all" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <BlogDataProvider>
       <BlogClient />
     </BlogDataProvider>
    </HydrationBoundary>
  );
}