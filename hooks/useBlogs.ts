import { fetchBlogs } from "@/libs/fetch";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = ({
  page = 1,
  limit = 10,
  tags = [],
  category = "all",
}: {
  page?: number;
  limit?: number;
  tags?: string[];
  category?: string;
} = {}) => {
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["blogs", page, limit, tags, category],
    queryFn: () => fetchBlogs({ page, limit, tags, category }),
    // staleTime/refetchOnMount inherited from QueryProvider defaults
  });

  return { blogs: data, isLoading: isLoading || isFetching, error, isError };
};

export const useLatestBlogs = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs/latest?limit=5");
      if (!res.ok) throw new Error("Failed to fetch latest blogs");
      return res.json();
    },
  });
  return { latestBlogs: data, isLoading, error, isError };
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
  return { blog: data?.data, isLoading, error, isError };
};