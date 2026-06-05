import { fetchBlogs } from "@/libs/fetch";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["blogs"],
    queryFn: () =>
      fetchBlogs({ page: 1, limit: 10, tags: [], category: "all" }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    blogs: data,
    isLoading,
    error,
    isError,
  };
};

export const useLatestBlogs = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs/latest?limit=5");
      if (!res.ok) {
        throw new Error("Failed to fetch latest blogs");
      }
      return res.json();
    },

  });
  return {
    latestBlogs:data,
    isLoading,
    error,
    isError,
  }
};

export const useGetBlog = (slug: string) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch blog details");
      return res.json();
    },
    enabled: !!slug,
  });

  return {
    blog: data?.data, // 🔥 IMPORTANT FIX
    isLoading,
    error,
    isError,
  };
};