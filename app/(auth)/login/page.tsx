"use client";

import Image from "next/image";
import loginBg from "@/public/login.png";
import LoginComp from "@/components/auth/Login";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@/hooks/useAdminAuth";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const {mutateAsync}=useSignIn();

  

const handleSignIn = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    setLoading(true);
    setError(null);

    await mutateAsync(payload);
    router.push("/admin");
  } catch (err: any) {
    setError(err?.message || "Network error. Try again.");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#F7F3EA]">
      <div className="w-full lg:w-[55%] min-h-screen flex items-center justify-center py-8 lg:py-0 px-4 sm:px-6">
        <LoginComp
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSignIn={handleSignIn}
          loading={loading}
          error={error}
        />
      </div>

      <div className="hidden lg:flex lg:w-[45%] min-h-screen">
        <Image src={loginBg} alt="Login Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Login;