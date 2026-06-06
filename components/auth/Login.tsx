"use client";

import Image from "next/image";
import loginBg from "@/public/login.png";
import LoginComp from "@/components/auth/Login";
import { useState } from "react";
import { useSignIn } from "@/hooks/useAdminAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signIn, isPending, error } = useSignIn();

  const handleSignIn = (payload: { email: string; password: string }) => {
    signIn(payload);
  };

  return (
    <div className="flex w-full h-screen bg-[#F7F3EA]">
      <div className="w-[55%] h-screen flex items-center justify-center">
        <LoginComp
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onSignIn={handleSignIn}
          loading={isPending}
          error={error ? (error as Error).message : null}
        />
      </div>
      <div className="w-[45%] h-screen">
        <Image src={loginBg} alt="Login Background" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Login;