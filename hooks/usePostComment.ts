import { createComment } from "@/data/Comment";

import { useMutation } from "@tanstack/react-query";



export const usePostComment = () => {
  return useMutation({
    mutationFn: createComment,
  });
}