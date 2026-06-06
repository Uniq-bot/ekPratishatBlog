import { signIn, signOut } from "@/libs/fetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// hooks/useAdminAuth.ts
export const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
    // ❌ remove onSuccess with router.replace here
  });
};

export const useSignOut = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      router.replace("/login");
    },
  });
};