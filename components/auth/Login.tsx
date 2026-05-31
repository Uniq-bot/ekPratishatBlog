"use client";

import { useState } from "react";
import {useRouter} from "next/navigation";
const LoginComp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message = payload?.message || "Login failed. Please try again.";
        setErrorMessage(message);
        return;
      }

      router.replace("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[80%] max-w-md bg-white  shadow-xl border border-slate-200 p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
        <p className="text-sm text-slate-500">Use your admin credentials to continue.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            placeholder="example@ekpratishat.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-3 border border-[#EFE5D0] bg-[#FFFDF8] outline-none focus:shadow focus:shadow-[#FAEEC9]"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-3 border bg-[#FFFDF8] border-[#EFE5D0] outline-none focus:shadow focus:shadow-[#FAEEC9]"
            required
          />
        </div>

       
      </div>

      {errorMessage && (
        <p className="mt-4 bg-red-50 px-3 py-2 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#F5CB3B]/80 text-black cursor-pointer py-3 mt-6 font-semibold hover:bg-[#F5CB3B] transition-colors disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </button>

      <div className="mt-8 pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
        @ 2024 Ekpratishat. All rights reserved.
      </div>
    </form>
  );
};

export default LoginComp;
