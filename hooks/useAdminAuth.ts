import { signIn, signOut } from "@/libs/fetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignIn = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      router.replace("/admin");
    },
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