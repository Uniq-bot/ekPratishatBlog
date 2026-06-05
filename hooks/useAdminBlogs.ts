import {
  createBlogs,
  createCategory,
  createTag,
  fetchBlogs,
  fetchCategory,
  fetchTags,
} from "@/libs/fetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};
export const useGetAdminBlogs = () => {
  return useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () =>
      fetchBlogs({ page: 1, limit: 10, tags: [], category: "all" }),
  });
  
};

export const useEditableBlog = (id: string) => {
  const { data } = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      console.log("fetching blog details for id:", id);
      const res = await fetch(`/api/edit/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog details");
      return res.json();
    },
    enabled: !!id, // 🔥 important
  });
  return { blog: data };
};

export const useGetCategory = () => {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });
  return { categories: data };
};

export const useGetTags = () => {
  const { data } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
  return { tags: data };
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
