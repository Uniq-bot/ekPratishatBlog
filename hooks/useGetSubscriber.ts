import { getSubscribers } from "@/data/NewsLetter";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscribers=()=>{

    return useQuery({
        queryKey:["subscribers"],
        queryFn:getSubscribers,
        staleTime:0,
    })
}