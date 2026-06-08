"use server";

import { revalidatePath } from "next/cache";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { prisma } from "@/libs/prisma";

type ActionResult = {
  success: boolean;
  message: string;
  data?: any;
};

export const createBlogAction = async (formData: FormData): Promise<ActionResult> => {
  const title       = formData.get("title") as string;
  const content     = formData.get("content") as string;
  const description = formData.get("description") as string;
  const authorID    = formData.get("authorID") as string;
  const categoryId  = formData.get("categoryId") as string;
  const tagsRaw     = formData.get("tags") as string;
  const imageFile   = formData.get("coverImage") as File | null;

  const tags = tagsRaw ? JSON.parse(tagsRaw) : [];

  if (!title || !content || !categoryId) {
    return { success: false, message: "Title, content and category are required" };
  }
  if (!authorID) {
    return { success: false, message: "Author ID is required" };
  }

  let coverImagePath: string | null = null;
  if (imageFile && imageFile.size > 0) {
    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = imageFile.name.split(".").pop();
    const filename = `cover-${Date.now()}.${ext}`;
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);
    coverImagePath = `/uploads/${filename}`;
  }

  const generatedSlug = `${title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")}-${Date.now()}`;

  try {
    const blog = await prisma.blogPost.create({
      data: {
        title,
        content,
        description,
        slug: generatedSlug,
        coverImage: coverImagePath,
        author:    { connect: { id: authorID } },
        category:  { connect: { id: categoryId } },
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
            where:  { name: tag },
            create: { name: tag },
          })),
        },
      },
    });

    revalidatePath("/blogs");

    return { success: true, message: "Blog created successfully", data: blog };
  } catch (error) {
    console.error("createBlogAction error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
};