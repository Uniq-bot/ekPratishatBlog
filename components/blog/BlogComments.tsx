"use client";

import { createComment } from "@/data/Comment";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type BlogComment = {
  id: number;
  commentText: string;
  userName: string;
  userEmail: string;
  userImage: string;
  createdAt: string | Date;
};
const BlogComments = ({
  blogId,
  slug,
  comments: blogComment,
}: {
  blogId: string;
  slug: string;
  comments: any[];
}) => {
  const { data: session } = useSession();

  const [comment, setComment] = React.useState("");
 const [comments, setComments] = React.useState<BlogComment[]>(
  blogComment || []
);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!comment.trim() || !session?.user) return;

  const optimisticComment: BlogComment = {
    id: Date.now(),
    commentText: comment,
    userName: session.user.name || "",
    userEmail: session.user.email || "",
    userImage: session.user.image || "",
    createdAt: new Date(),
  };

  // Show immediately
  setComments((prev) => [optimisticComment, ...prev]);

  try {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("content", comment);
    formData.append("postId", blogId);
    formData.append("userEmail", session.user.email || "");
    formData.append("userName", session.user.name || "");
    formData.append("userImage", session.user.image || "");
    formData.append("slug", slug);

    setComment("");

    await createComment(formData);
  } catch (err) {
    // Remove optimistic comment if request fails
    setComments((prev) =>
      prev.filter((c) => c.id !== optimisticComment.id)
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="w-full mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Comments ({comments.length})
      </h2>

      {session?.user ? (
        <form
          onSubmit={handleSubmit}
          className="border  p-5 bg-white shadow-sm"
        >
          <div className="flex gap-4">
            <Image
              src={session.user.image!}
              alt="user"
              width={50}
              height={50}
              className="rounded-full h-12.5 w-12.5"
            />

            <div className="flex-1">
              <div className="mb-3">
                <h4 className="font-semibold text-lg">{session.user.name}</h4>
                <p className="text-sm text-gray-500">{session.user.email}</p>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full min-h-30  border p-3 outline-none resize-none focus:ring-2 focus:ring-black"
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={!comment.trim() || isSubmitting}
                  className="bg-black text-white px-6 py-2 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  {isSubmitting ? "Submitting..." : "Post comment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="border  p-10 text-center">
          <p className="text-gray-500 mb-4">Please sign in to join the conversation.</p>

          <button
            onClick={() => signIn("google")}
            className="bg-black text-white px-6 py-2  hover:bg-gray-800"
          >
            Sign in with Google
          </button>
        </div>
      )}

      <div className="mt-8 space-y-5">
        {comments.length === 0 ? (
          <div className="text-center py-10 text-gray-500 border ">
            No comments yet. Be the first to share your thoughts.
          </div>
        ) : (
          comments.map((item) => (
            <div key={item.id} className="border  p-5 bg-white shadow-sm">
              <div className="flex gap-4">
                <Image
                  src={item.userImage}
                  alt={item.userName}
                  width={45}
                  height={45}
                  className="rounded-full h-11.25 w-11.25"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{item.userName}</h3>
                      <p className="text-xs text-gray-500">{item.userEmail}</p>
                    </div>

                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-gray-700">
                    {item.commentText}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogComments;
