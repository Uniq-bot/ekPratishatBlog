import BlogClient from "@/components/blog/BlogClient";
import { fetchBlogs } from "@/libs/fetch";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function BlogPage() {
  const queryClient = new QueryClient();

  // Server-side prefetch so initial load is instant
  await queryClient.prefetchQuery({
    queryKey: ["blogs"],
    queryFn: () => fetchBlogs({ page: 1, limit: 10, tags: [], category: "all" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogClient />
    </HydrationBoundary>
  );
}