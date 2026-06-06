import BlogClient from "@/components/blog/BlogClient";
import { initialFetch, initialLatestFetch } from "@/data/initialFetch";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function BlogPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      // Key MUST exactly match what useBlogs uses: ["blogs", page, limit, tags, category]
      queryKey: ["blogs", 1, 10, [], "all"],
      queryFn: initialFetch,
    }),
    queryClient.prefetchQuery({
      queryKey: ["latestBlogs"],
      queryFn: initialLatestFetch,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogClient />
    </HydrationBoundary>
  );
}