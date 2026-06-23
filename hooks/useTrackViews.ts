"use client";

import { BlogItem } from "@/types/blog";
import { useRouter } from "next/navigation";

export const useTrackBlogView = () => {
  const router = useRouter();

  return (blog: BlogItem) => {
    const sessionId =
      localStorage.getItem("sessionId") ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    localStorage.setItem("sessionId", sessionId);

    const key = `viewed-${blog.id}`;

    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "true");

      fetch("/api/blogs/views", {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: blog.id,
          sessionId,
        }),
      }).catch(() => {});
    }

    router.push(`/blog/${blog.slug}`);
  };
};