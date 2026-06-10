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

export const useGetAdminBlogs = () => {
  return useQuery({
    queryKey: ["admin-blogs"],
    // Pass category as undefined so the API doesn't filter — fetches all blogs
    queryFn: () =>
      fetchBlogs({
        page: 1,
        limit: 100,
        tags: [],
        category: undefined,
        searchQuery: "",
      }),
    staleTime: 0,
  });
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const useGetCategory = ({
  initialCategories,
}: {
  initialCategories: any[];
}) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
    staleTime: 1000 * 60 * 5,
    placeholderData: initialCategories,
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

export const useGetTags = ({ initialTags }: { initialTags: any[] }) => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
    placeholderData: initialTags,
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