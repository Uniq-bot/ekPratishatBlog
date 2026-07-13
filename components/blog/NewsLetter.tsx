"use client";
import { useNewsLetterMutate } from "@/hooks/useNewsLetter";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { notify } from "@/libs/notify";

const NewsLetter = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { mutateAsync } = useNewsLetterMutate();

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleClick = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      notify.error("Subscription blocked", "Please enter your email address.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      notify.error("Subscription blocked", "Please enter a valid email address.");
      return;
    }

    try {
      setIsSubmitting(true);
      await mutateAsync(trimmedEmail);
      setEmail("");
    } catch {
      notify.error("Subscription failed", "We could not save your subscription right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EBC044]">
        Newsletter
      </p>
      <div className="flex items-center gap-2 rounded-full border border-[#3A3226] bg-[#252017] pl-4 pr-1.5 py-1.5 focus-within:border-[#EBC044] transition-colors">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 min-w-0 bg-transparent text-sm outline-none text-white placeholder:text-gray-500"
        />
        <button
          onClick={handleClick}
          disabled={isSubmitting}
          aria-label="Subscribe"
          className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EBC044] text-[#1D1D1D] transition-colors hover:bg-[#F4D673] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="h-2 w-2 rounded-full bg-[#1D1D1D] animate-pulse" />
          ) : (
            <ArrowUpRight size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;