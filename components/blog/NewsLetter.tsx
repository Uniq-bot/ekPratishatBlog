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
    <section className="w-full border border-[#e7d6ab] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,242,229,0.96)_100%)] p-4 sm:p-5 lg:p-6 text-black shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8a6b12]">
            NEWSLETTER
          </p>
          <h2 className="text-lg font-bold leading-tight sm:text-xl">
            Stay in the loop
          </h2>
        </div>

        <p className="max-w-md text-sm leading-6 text-black/75 sm:text-[0.95rem]">
          Get the latest articles and stories delivered straight to your inbox.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-11 w-full rounded-lg border border-[#dbc88d] bg-white px-4 text-black outline-none transition-colors placeholder:text-black/40 focus:border-[#c9981a]"
          />
          <button
            onClick={handleClick}
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)] px-5 font-bold text-black transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
