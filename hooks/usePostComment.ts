import { createComment } from "@/data/Comment";

import { useMutation } from "@tanstack/react-query";
import { notify } from "@/libs/notify";



export const usePostComment = () => {
  return useMutation({
    mutationFn: createComment,
    onMutate: () => ({ toastId: notify.loading("Posting comment", "Saving your comment.") }),
    onSuccess: (_data, _variables, context) => notify.success("Comment posted", "Your comment is now visible.", context?.toastId),
    onError: (error, _variables, context) =>
      notify.error(
        "Comment failed",
        error instanceof Error ? error.message : "We could not post the comment right now.",
        context?.toastId,
      ),
  });
}