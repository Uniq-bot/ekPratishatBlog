"use client";

import React from "react";

interface LoginCompProps {
  email: string;
  password: string;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  onSignIn: (payload: { email: string; password: string }) => void;
  loading: boolean;
  error: string | null;
}

const LoginComp = ({
  email,
  password,
  setEmail,
  setPassword,
  onSignIn,
  loading,
  error,
}: LoginCompProps) => {
  return (
    <div className="w-full max-w-sm flex flex-col gap-4 sm:gap-5 lg:gap-6 px-4 sm:px-0">
      <h1 className="text-2xl sm:text-2.5xl lg:text-3xl font-bold text-neutral-800">Sign in</h1>

      {error && (
        <p className="text-xs sm:text-sm text-red-500 bg-red-50 border border-red-200 px-3 sm:px-4 py-2 rounded">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:gap-3.5 lg:gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-neutral-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-neutral-600 transition-colors"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-neutral-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm outline-none focus:border-neutral-600 transition-colors"
        />
      </div>

      <button
        onClick={() => onSignIn({ email, password })}
        disabled={loading}
        className="bg-neutral-800 text-white py-2.5 sm:py-3 text-xs sm:text-sm font-medium hover:bg-neutral-700 disabled:opacity-50 transition-colors w-full"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </div>
  );
};

export default LoginComp;