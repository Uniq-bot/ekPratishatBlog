"use client";
import { useNewsLetterMutate } from "@/hooks/useNewsLetter";
import { motion } from "framer-motion";
import React from "react";
import { notify } from "@/libs/notify";

const NewsLetter = () => {
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {mutateAsync}=useNewsLetterMutate();
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const handleClick = async () => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    notify.error("Subscription blocked", "Email cannot be empty.");
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
    notify.error("Subscription failed", "We could not save your email right now.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div
    style={
      {
        borderColor:"rgb(228 180 36)"
      }
    }
      className="w-full h-fit text-black  mt-4 lg:mt-0   md:flex flex-col items-start  border-l-5   gap-5 p-5 "
    >
      <h2 className="text-xl font-bold">
        Stay Updated with Real Estate Trends
      </h2>
      <p className="italic">
        "Get weekly property insights, <br /> market updates, and investment{" "}
        <br /> opportunities delivered to your inbox."
      </p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="bg-white outline-none text-black border border-gray-300 w-[70%] h-10 px-3"
      />
      <button onClick={handleClick} disabled={isSubmitting} className="bg-[linear-gradient(135deg,#EBC044,#F4CA3B_28%,#FFD33A_55%,#F4DC91_78%,#F4CA3B)]  cursor-pointer transition-all hover:bg-[#EBC044] text-black font-bold px-5 py-2 disabled:opacity-60 disabled:cursor-not-allowed">
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </button>
    </div>
  );
};

export default NewsLetter;
