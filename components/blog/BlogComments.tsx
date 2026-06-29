"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

type Comment = {
  id: number;
  text: string;
  user: {
    name: string;
    email: string;
    image: string;
  };
  createdAt: string;
};

const BlogComments = () => {
  const { data: session } = useSession();

  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<Comment[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      text: comment,
      user: {
        name: session!.user!.name!,
        email: session!.user!.email!,
        image: session!.user!.image!,
      },
      createdAt: new Date().toLocaleString(),
    };

    setComments((prev) => [newComment, ...prev]);
    setComment("");
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
              className="rounded-full h-[50px] w-[50px]"
            />

            <div className="flex-1">
              <div className="mb-3">
                <h4 className="font-semibold text-lg">
                  {session.user.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {session.user.email}
                </p>
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full min-h-[120px]  border p-3 outline-none resize-none focus:ring-2 focus:ring-black"
              />

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={!comment.trim()}
                  className="bg-black text-white px-6 py-2  hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="border  p-10 text-center">
          <p className="text-gray-500 mb-4">
            Sign in to join the discussion.
          </p>

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
            No comments yet.
            <br />
            Be the first to comment.
          </div>
        ) : (
          comments.map((item) => (
            <div
              key={item.id}
              className="border  p-5 bg-white shadow-sm"
            >
              <div className="flex gap-4">
                <Image
                  src={item.user.image}
                  alt={item.user.name}
                  width={45}
                  height={45}
                  className="rounded-full h-[45px] w-[45px]"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">
                        {item.user.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {item.user.email}
                      </p>
                    </div>

                    <span className="text-xs text-gray-400">
                      {item.createdAt}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-wrap text-gray-700">
                    {item.text}
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