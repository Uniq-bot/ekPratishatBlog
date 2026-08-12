import { notify } from "@/libs/notify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type FileRecord = {
  id: string;
  fileName: string;
  originalName?: string | null;
  url: string;
  fileType: string;
  mimeType?: string | null;
  fileSize?: number | null;
  blogPostId?: string | null;
  createdAt: string;
  blogPost?: {
    translations?: Array<{
      title: string | null;
      language: string | null;
    }> | null;
  } | null;
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fileTitle,
      blogId,
      file,
    }: {
      fileTitle: string;
      blogId?: string | null;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append("fileTitle", fileTitle);
      formData.append("file", file);

      if (blogId) {
        formData.append("blogId", blogId);
      }

      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload file");
      }

      return data;
    },

    onSuccess: () => {
      notify.success("File uploaded", "The file has been uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },

    onError: (error) => {
      notify.error(
        "Upload failed",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
  });
};

export const useGetFiles = () => {
  return useQuery<FileRecord[]>({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await fetch("/api/files", {
        method: "GET",
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to fetch files");
      }

      return json as FileRecord[];
    },
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const formData = new FormData();
      formData.append("fileId", id);

      const response = await fetch("/api/files", {
        method: "DELETE",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete file");
      }

      return data;
    },

    onSuccess: () => {
      notify.success("File deleted", "The file has been removed successfully.");
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },

    onError: (error) => {
      notify.error(
        "Delete failed",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
  });
};
