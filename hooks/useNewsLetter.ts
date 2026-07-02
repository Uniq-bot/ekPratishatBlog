import { subscribeByEmail } from '@/data/NewsLetter';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { notify } from "@/libs/notify";


export const useNewsLetterMutate = () => {
        const queryClient = useQueryClient();
        return useMutation({
                mutationFn: subscribeByEmail,
                onMutate: (email: string) => ({
                        toastId: notify.loading("Subscribing email", `Adding ${email} to the newsletter list.`),
                }),
                onSuccess: (_data, _variables, context) => {
                        notify.success("Subscription saved", "The email was added successfully.", context?.toastId);
                        queryClient.invalidateQueries({ queryKey: ['newsletter'] });
                },
                onError: (error, _variables, context) => {
                        notify.error(
                                "Subscription failed",
                                error instanceof Error ? error.message : "We could not save the subscription right now.",
                                context?.toastId,
                        );
                }
        })
}