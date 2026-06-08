import { fetchBlogs } from "@/libs/fetch";
import { useQuery } from "@tanstack/react-query";

export const useBlogs = ({
  page = 1,
  limit = 10,
  searchQuery,
  tags = [],
  category = "all",
  initialData,
}: {
  page?: number;
  searchQuery?: string;
  limit?: number;
  tags?: string[];
  category?: string;
  initialData?: any;
} = {}) => {
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["blogs", page, limit, searchQuery, category, tags.join(",")],
    queryFn: () =>
      fetchBlogs({
        page,
        limit,
        searchQuery: searchQuery ?? "",
        tags,
        category,
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
initialData:
  page === 1 &&
  !searchQuery &&
  category === "all" &&
  tags.length === 0
    ? initialData
    : undefined  });

  return { blogs: data, isLoading: isLoading || isFetching, error, isError };
};

export const useLatestBlogs = ({
  initialLatestBlogs,
}: {
  initialLatestBlogs: any;
}) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs/latest?limit=5");
      if (!res.ok) throw new Error("Failed to fetch latest blogs");
      return res.json();
    },
    initialData: initialLatestBlogs,
  });
  return { latestBlogs: data, isLoading, error, isError };
};
