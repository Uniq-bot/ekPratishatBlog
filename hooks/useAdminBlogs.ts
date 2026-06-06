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
  return useQuery({
    queryKey: ["blog", id],
    queryFn: async () => {
      const res = await fetch(`/api/edit/${id}`);

      if (!res.ok) {
        throw new Error("Failed to fetch blog details");
      }

      return res.json();
    },
    enabled: !!id,
  });
};

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
  });
};

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });
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