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
  searchQuery?:string;
  limit?: number;
  tags?: string[];
  category?: string;
  initialData?: any;
} = {}) => {
  const { data, isLoading, error, isError, isFetching } = useQuery({
    queryKey: ["blogs", page, limit, searchQuery, tags, category],
    queryFn: () => fetchBlogs({ page, limit, searchQuery: searchQuery ?? "", tags, category }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount:true,
    placeholderData: initialData,  // ✅ won't block refetch on filter change
   
  });

  return { blogs: data, isLoading: isLoading || isFetching, error, isError };
};

export const useLatestBlogs = ({ initialData }: { initialData?: any }) => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["latestBlogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs/latest?limit=5");
      if (!res.ok) throw new Error("Failed to fetch latest blogs");
      return res.json();
    },
    placeholderData: initialData,  // ✅ won't block refetch on filter change
  });
  return { latestBlogss: data, isLoading, error, isError };
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