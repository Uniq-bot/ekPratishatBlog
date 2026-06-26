import { prisma } from "@/libs/prisma";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const formData = await req.formData();

    const title = (formData.get("title") as string) || "";
    const content = (formData.get("content") as string) || "";
    const description = (formData.get("description") as string) || "";
    const categoryID = (formData.get("categoryId") as string) || null;
    const tagsRaw = formData.get("tags") as string;
    const imageFile = formData.get("coverImage") as File | null;

    const tags = tagsRaw ? JSON.parse(tagsRaw) : [];

    let coverImagePath: string | undefined;

    if (imageFile && imageFile.size > 0) {
      const uploadDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = imageFile.name.split(".").pop()?.toLowerCase();
      const allowedTypes = ["jpg", "jpeg", "png", "webp", "gif"];

      if (!ext || !allowedTypes.includes(ext)) {
        throw new Error("Invalid image type.");
      }

      const filename = `draft-${Date.now()}.${ext}`;

      await writeFile(join(uploadDir, filename), buffer);

      coverImagePath = `/uploads/${filename}`;
    }

    const slug =
      title.trim() !== ""
        ? `${title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")}-${Date.now()}`
        : `draft-${Date.now()}`;

    const post = await prisma.blogPost.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        content,
         ...(categoryID && {
    categoryID: categoryID,
  }),

        slug,

        ...(coverImagePath && {
          coverImage: coverImagePath,
        }),

        tags: {
          set: [],
          connect: tags.map((tag: any) => ({
            id: tag.id,
          })),
        },
      },
    });

    return NextResponse.json({
      message: "Draft updated successfully",
      post,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    );
  }
}