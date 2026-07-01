import { prisma } from "@/libs/prisma";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { revalidatePath, revalidateTag } from "next/cache";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const formData = await req.formData();

    const title = (formData.get("title") as string) || "";
    const contentRaw = (formData.get("content") as string) || "[]";
    const description = (formData.get("description") as string) || "";
    const categoryID = (formData.get("categoryId") as string) || null;
    const tagsRaw = formData.get("tags") as string;
    const imageFile = formData.get("coverImage") as File | null;

    const content = contentRaw ? JSON.parse(contentRaw) : [];
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

    const existingDraft = await prisma.blogPost.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!existingDraft) {
      return NextResponse.json(
        { message: "Draft not found", data: null },
        { status: 404 }
      );
    }
    const updatedDraft = await prisma.blogPost.update({
      where: { id },
      data: {
        title: title || existingDraft.title,
        content,
        description,
        slug,
        categoryID,
        ...(coverImagePath ? { coverImage: coverImagePath } : {}),
        status: "DRAFT",
        tags: {
          set: tags.map((tag: any) => ({ id: tag.id })),
        },
      },
      include: { category: true, tags: true },
    });

    revalidatePath(`/blog/${updatedDraft.slug}`);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidateTag("blogs", "max");
    revalidateTag("latestBlogs", "max");

    return NextResponse.json({
      message: "Draft updated successfully",
      data: updatedDraft,
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