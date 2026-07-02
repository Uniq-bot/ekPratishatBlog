import { createAdvertisement, deleteAd, setAdStatus, updateAd, updateAdStatus } from "@/data/Advertisement";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { notify } from "@/libs/notify";

const messageFromError = (error: unknown, fallback: string) =>
  error instanceof Error ? error.message : fallback;


export const useAddAdvertisement = () => {
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: createAdvertisement ,
        onMutate: (formData: FormData) => ({
          toastId: notify.loading(
            "Creating advertisement",
            formData.get("title") ? `Adding “${formData.get("title")?.toString()}”.` : "Saving the new advertisement.",
          ),
        }),
        onSuccess:(_data, _variables, context)=>{
            notify.success("Advertisement created", "The ad is now available in the admin list.", context?.toastId);
            queryClient.invalidateQueries({ queryKey: ["advertisements"] });
        },
        onError: (error, _variables, context) =>
          notify.error(
            "Advertisement creation failed",
            messageFromError(error, "We could not create the advertisement right now."),
            context?.toastId,
          ),
    })
}

export const useUpdateAdStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setAdStatus,
    onMutate: ({ adId, status }) => ({
      toastId: notify.loading(
        "Updating advertisement status",
        status ? "Turning the ad on." : "Turning the ad off.",
      ),
    }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Advertisement status updated", "The live state changed successfully.", context?.toastId);
      queryClient.invalidateQueries({
        queryKey: ["advertisements"],
      });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Advertisement status update failed",
        messageFromError(error, "We could not update the ad status right now."),
        context?.toastId,
      ),
  });
};


export const useUpdateAd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAd,
    onMutate: (formData: FormData) => ({
      toastId: notify.loading(
        "Updating advertisement",
        formData.get("title") ? `Saving changes for “${formData.get("title")?.toString()}”.` : "Saving the advertisement.",
      ),
    }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Advertisement updated", "The changes were saved successfully.", context?.toastId);
      queryClient.invalidateQueries({
        queryKey: ["advertisements"],
      });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Advertisement update failed",
        messageFromError(error, "We could not update the advertisement right now."),
        context?.toastId,
      ),
  });
}


export const useDeleteAd=()=>{
  const queryClient= useQueryClient();
  return useMutation({
    mutationFn: deleteAd,
    onMutate: () => ({
      toastId: notify.loading("Deleting advertisement", "Removing the selected advertisement."),
    }),
    onSuccess:(_data, _variables, context)=>{
      notify.success("Advertisement deleted", "The ad was removed from the system.", context?.toastId);
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Advertisement delete failed",
        messageFromError(error, "We could not delete the advertisement right now."),
        context?.toastId,
      ),
  })
}