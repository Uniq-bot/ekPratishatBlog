import { signIn, signOut } from "@/libs/fetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { notify } from "@/libs/notify";
// hooks/useAdminAuth.ts
export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    onMutate: () => ({ toastId: notify.loading("Signing in", "Verifying your credentials.") }),
    onSuccess: (_data, _variables, context) => notify.success("Signed in", "You are now authenticated.", context?.toastId),
    onError: (error, _variables, context) =>
      notify.error(
        "Sign in failed",
        error instanceof Error ? error.message : "We could not sign you in right now.",
        context?.toastId,
      ),
  });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onMutate: () => ({ toastId: notify.loading("Signing out", "Ending the current admin session.") }),
    onSuccess: (_data, _variables, context) => {
      notify.success("Signed out", "The admin session has ended.", context?.toastId);
      router.replace("/login");
    },
    onError: (error, _variables, context) =>
      notify.error(
        "Sign out failed",
        error instanceof Error ? error.message : "We could not sign you out right now.",
        context?.toastId,
      ),
  });
};