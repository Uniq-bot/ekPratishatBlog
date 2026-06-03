"use client";

import Image from "next/image";
import loginBg from "@/public/login.png";
import LoginComp from "@/components/auth/Login";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async (payload: { email: string; password: string }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res;
  };

  const handleSignIn = async (payload: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const res = await signIn(payload);
      const data = await res.json();

      if (res.ok) {
        router.replace("/admin");
        return;
      }

      // backend error message
      setError(data.message || "Login failed");
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
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
          loading={loading}
          error={error}
        />
      </div>

      <div className="w-[45%] h-screen">
        <Image src={loginBg} alt="Login Background" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Login;