import { subscribeByEmail } from '@/data/NewsLetter';
import {useMutation, useQueryClient} from '@tanstack/react-query';


export const useNewsLetterMutate = () => {
        const queryClient = useQueryClient();
        return useMutation({
                mutationFn: subscribeByEmail,
                onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ['newsletter'] });
                },
                onError: (error) => {
                        console.error("Error subscribing to newsletter: ", error);
                }
        })
}