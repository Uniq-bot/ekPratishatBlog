import BlogClient from "@/components/blog/BlogClient";

// No SSR prefetch — the shared QueryClient across layouts means hydrated data
// gets "stuck" and refetchOnMount never fires on back-navigation.
// BlogClient fetches client-side on every mount instead, which is correct behavior.
export default function BlogPage() {
  return <BlogClient />;
}