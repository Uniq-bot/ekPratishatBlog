import {
  createBlogs,
  createCategory,
  createTag,
  deleteCategory,
  deleteBlog,
  deleteTag,
  fetchBlogs,
  fetchCategory,
  fetchTags,
  updateBlog,
} from "@/libs/fetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ─── Blogs ───────────────────────────────────────────────────────────────────

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlogs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["editable-blog", variables.id] });
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
    },
  });
};

export const useGetAdminBlogs = ({
  searchQuery = "",
  category = "all",
  tag = "all",
  page = 1,
  limit = 100,
}: {
  searchQuery?: string;
  category?: string;
  tag?: string;
  page?: number;
  limit?: number;
} = {}) => {
  return useQuery({
    queryKey: ["admin-blogs"],
queryFn: () => fetchBlogs({ page: 1, limit: 100, tags: [], category: "all", searchQuery: "" }),    staleTime: 0,
  });
};

export const useEditableBlog = (id: string) => {
  return useQuery({
    queryKey: ["editable-blog", id],
    queryFn: async () => {
      const res = await fetch(`/api/edit/${id}`);
      if (!res.ok) throw new Error("Failed to fetch blog details");
      return res.json();
    },
    enabled: !!id,
    staleTime: 0,           // always fresh when entering edit page
    refetchOnMount: "always",
  });
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
    staleTime: 1000 * 60 * 5,
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

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// ─── Tags ────────────────────────────────────────────────────────────────────

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
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

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};
