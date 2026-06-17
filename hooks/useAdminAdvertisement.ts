import { createAdvertisement } from "@/data/Advertisement";
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