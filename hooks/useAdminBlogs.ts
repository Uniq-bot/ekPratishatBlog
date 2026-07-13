import {
  createBlogs,
  createCategory,
  createTag,
  curateBlog,
  updateCategory,
  updateTag,
  deleteBlog,
  fetchBlogs,
  fetchCategory,
  fetchTags,
  saveTodraft,
  toggleAarchiveBlog,
  updateBlog,
  uploadImage,
} from "@/libs/fetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@/libs/notify";

const messageFromError = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;

// ─── Blogs ───────────────────────────────────────────────────────────────────

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBlogs,
    onMutate: (formData: FormData) => {
      const title = formData.get("title")?.toString()?.trim();
      const toastId = notify.loading(
        "Creating blog",
        title ? `Publishing “${title}”.` : "Saving the new blog post.",
      );
      return { toastId, title };
    },
    onSuccess: (_data, _variables, context) => {
      notify.success("Blog created", "The post is now available in the admin list.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
    },
    onError: (error, _variables, context) => {
      notify.error(
        "Blog creation failed",
        messageFromError(error, "We could not create the blog right now."),
        context?.toastId,
      );
    },
  });
};

export const useSaveToDraft = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveTodraft,
    onMutate: ({ formData }) => {
      const title = formData.get("title")?.toString()?.trim();
      const toastId = notify.loading(
        "Saving draft",
        title ? `Writing draft for “${title}”.` : "Saving the draft.",
      );
      return { toastId };
    },
    onSuccess: (_data, _variables, context) => {
      notify.success("Draft saved", "The draft was stored successfully.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
    },
    onError: (error, _variables, context) => {
      notify.error(
        "Draft save failed",
        messageFromError(error, "We could not save the draft right now."),
        context?.toastId,
      );
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBlog,
    onMutate: ({ formData }) => {
      const title = formData.get("title")?.toString()?.trim();
      const toastId = notify.loading(
        "Updating blog",
        title ? `Applying changes to “${title}”.` : "Saving blog changes.",
      );
      return { toastId };
    },
    onSuccess: (_data, variables, context) => {
      notify.success("Blog updated", "The changes were saved successfully.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
      queryClient.invalidateQueries({ queryKey: ["editable-blog", variables.id] });
    },
    onError: (error, _variables, context) => {
      notify.error(
        "Blog update failed",
        messageFromError(error, "We could not update the blog right now."),
        context?.toastId,
      );
    },
  });
};

export const useImageUpload=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
  })
}

export const useDeleteImage=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: async (imagePath:string)=>{
      const res=await fetch(`/api/upload/delete`,{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath }),
      })
      if(!res.ok){
        const err=await res.json().catch(()=>({}));
        throw new Error(err.message || "Failed to delete image");
      }
      return res.json();
    },
    onMutate: () => ({ toastId: notify.loading("Deleting image", "Removing the uploaded image.") }),
    onSuccess: (_data, _variables, context) => notify.success("Image deleted", "The uploaded image was removed.", context?.toastId),
    onError: (error, _variables, context) =>
      notify.error(
        "Image delete failed",
        messageFromError(error, "We could not delete the image right now."),
        context?.toastId,
      ),
  })
}
export const useToggleArchiveBlog=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: toggleAarchiveBlog,
    onMutate: () => ({ toastId: notify.loading("Updating blog status", "Archiving or restoring the selected post.") }),
    onSuccess:(_data, _variables, context)=>{
      notify.success("Blog status updated", "The archive state was changed successfully.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Blog status update failed",
        messageFromError(error, "We could not change the blog status right now."),
        context?.toastId,
      ),
  })
}

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBlog,
    onMutate: () => ({ toastId: notify.loading("Deleting blog", "Removing the selected post.") }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Blog deleted", "The post was removed from the system.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Blog delete failed",
        messageFromError(error, "We could not delete the blog right now."),
        context?.toastId,
      ),
  });
};

export const useCurateBlog=()=>{
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: curateBlog,
    onMutate: () => ({ toastId: notify.loading("Updating curated post", "Toggling the featured blog.") }),
    onSuccess:(_data, _variables, context)=>{
      notify.success("Curated blog updated", "The featured blog selection has changed.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["latestBlogs"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Curated blog update failed",
        messageFromError(error, "We could not update the curated blog right now."),
        context?.toastId,
      ),
  })
}

export const useGetAdminBlogs = () => {
  return useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () =>
      fetchBlogs({
        page: 1,
        limit: 100,
        tags: [],
        category: undefined,
        searchQuery: "",
      }),
    staleTime: 1000 * 60 * 5
  });
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const useGetCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
    staleTime: 0,
    refetchOnMount: "always"
    // placeholderData: initialCategory ? initialCategory: undefined,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onMutate: (payload) => ({
      toastId: notify.loading("Creating category", `Adding “${payload.name}”.`),
    }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Category created", "The new category is now available.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Category creation failed",
        messageFromError(error, "We could not create the category right now."),
        context?.toastId,
      ),
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onMutate: (payload) => ({
      toastId: notify.loading("Updating category", `Saving changes for “${payload.name}”.`),
    }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Category updated", "The category details were saved successfully.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Category update failed",
        messageFromError(error, "We could not update the category right now."),
        context?.toastId,
      ),
  });
};

// ─── Tags ────────────────────────────────────────────────────────────────────

export const useGetTags = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 0,
    refetchOnMount: "always"
    // placeholderData: initialTags ? initialTags: undefined,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onMutate: (payload) => ({
      toastId: notify.loading("Creating tag", `Adding “${payload.name}”.`),
    }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Tag created", "The new tag is now available.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Tag creation failed",
        messageFromError(error, "We could not create the tag right now."),
        context?.toastId,
      ),
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTag,
    onMutate: (payload) => ({
      toastId: notify.loading("Updating tag", `Saving changes for “${payload.name}”.`),
    }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Tag updated", "The tag details were saved successfully.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Tag update failed",
        messageFromError(error, "We could not update the tag right now."),
        context?.toastId,
      ),
  });
};

