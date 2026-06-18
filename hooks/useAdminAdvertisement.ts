import { createAdvertisement, deleteAd, setAdStatus, updateAd, updateAdStatus } from "@/data/Advertisement";
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useAddAdvertisement = () => {
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn: createAdvertisement ,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ["advertisements"] });
        }
    })
}

export const useUpdateAdStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setAdStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["advertisements"],
      });
    },
  });
};


export const useUpdateAd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAd,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["advertisements"],
      });
    },
  });
}


export const useDeleteAd=()=>{
  const queryClient= useQueryClient();
  return useMutation({
    mutationFn: deleteAd,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["advertisements"] });
    }
  })
}