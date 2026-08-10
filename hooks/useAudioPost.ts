import { notify } from "@/libs/notify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AudioBook = {
  id: string;
  audioFile: string;
  blogSlug?: string | null;
  createdAt: string;
};

export const useUploadAudioForBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, file }: { slug: string; file: File }) => {
      const formData = new FormData();

      formData.append("audioBook", file);

      const response = await fetch(`/api/audioBook/${slug}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload audio");
      }

      return data;
    },

    onSuccess: (_, variables) => {
      notify.success(
        "Audio uploaded",
        "The audiobook has been successfully uploaded.",
      );

      queryClient.invalidateQueries({
        queryKey: ["audio", variables.slug],
      });
    },

    onError: (error) => {
      notify.error(
        "Upload failed",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
  });
};

export const useUploadAudio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const formData = new FormData();
      formData.append("audioBook", file);

      const response = await fetch(`/api/audioBook`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload audio");
      }

      return data;
    },
    onSuccess: (_, variables) => {
      notify.success(
        "Audio uploaded",
        "The audiobook has been successfully uploaded.",
      );

      queryClient.invalidateQueries({
        queryKey: ["audio"],
      });
    },

    onError: (error) => {
      notify.error(
        "Upload failed",
        error instanceof Error ? error.message : "Something went wrong.",
      );
    },
  });
};

export const useGetAudio = () => {
  return useQuery<AudioBook[]>({
    queryKey: ["audio"],
    queryFn: async () => {
      const response = await fetch("/api/audioBook", {
        method: "GET",
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Failed to fetch audio");
      }

      return json.data as AudioBook[];
    },
  });
};

export const useDeleteAudio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/audioBook/delete/${id}`, {
        method: "DELETE",
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : { message: "No response body" };

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete audio");
      }

      return data;
    },

    onSuccess: () => {
      notify.success(
        "Audio Deleted",
        "The audiobook has been successfully deleted."
      );

      queryClient.invalidateQueries({
        queryKey: ["audio"],
      });
    },

    onError: (error) => {
      notify.error(
        "Delete failed",
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    },
  });
};