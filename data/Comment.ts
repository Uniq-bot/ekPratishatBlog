"use server";

import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export const createComment = async (form: FormData) => {
  try {
    const slug = form.get("slug")?.toString();
    if (!slug) {
      throw new Error("Missing slug");
    }
    const content = form.get("content")?.toString();
    const postId = form.get("postId")?.toString();
    const userEmail = form.get("userEmail")?.toString();
    const userName = form.get("userName")?.toString();
    const userImage = form.get("userImage")?.toString();
    if (!content || !postId || !userEmail || !userName) {
      throw new Error("Missing required fields");
    }

    const comment = await prisma.blogComment.create({
      data: {
        commentText: content,
        blogPostId: postId,
        userEmail,
        userName,
        userImage: userImage ?? "",
      },
    });
    revalidatePath(`/blog/${slug}`);
    console.log(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};
