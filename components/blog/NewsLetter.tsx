"use client";
import { useNewsLetterMutate } from "@/hooks/useNewsLetter";
import { motion } from "framer-motion";
import React from "react";

const NewsLetter = () => {
  const [email, setEmail] = React.useState("");
  const {mutateAsync}=useNewsLetterMutate();
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const handleClick = async () => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    alert("Email cannot be empty");
    return;
  }

  if (!isValidEmail(trimmedEmail)) {
    alert("Please enter a valid email address");
    return;
  }

  try {
    await mutateAsync(trimmedEmail);
    alert("Subscribed successfully!");
    setEmail("");
  } catch (err) {
    console.error(err);
    alert("Subscription failed");
  }
};
  return (
    <div
      className="w-full h-fit text-black  mt-4 lg:mt-0   md:flex flex-col items-start  border-l-5 border-[#EBC044]  gap-5 p-5 "
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
      <button onClick={handleClick} className="bg-[#d0aa3a] cursor-pointer transition-all hover:bg-[#EBC044] text-black/60 px-5 py-2 ">
        Subscribe
      </button>
    </div>
  );
};

export default NewsLetter;
