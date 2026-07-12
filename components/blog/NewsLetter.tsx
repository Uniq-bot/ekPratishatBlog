"use client";
import { useNewsLetterMutate } from "@/hooks/useNewsLetter";
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
    <section className="w-full  py-2 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-5 lg:py-6 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
        {/* Left: label + heading */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 lg:shrink-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#EFC75A]">
            Newsletter
          </p>
          <h2 className="text-base sm:text-lg font-bold leading-tight text-white">
            Stay in the loop
          </h2>
        </div>

        <p className="hidden lg:block text-sm leading-6 text-gray-400 lg:flex-1">
          Get the latest articles and stories delivered straight to your inbox.
        </p>

        {/* Right: input + button */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 lg:shrink-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-11 w-full sm:w-64 rounded-lg border-2 border-[#5E4F29] bg-[#1F1B16] px-4 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-[#EFC75A]"
          />
          <button
            onClick={handleClick}
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-lg bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] px-5 font-bold text-[#1F1B16] transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;