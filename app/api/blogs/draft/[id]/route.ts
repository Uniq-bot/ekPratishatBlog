import { prisma } from "@/libs/prisma";
import { mkdir, writeFile, unlink } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";
import { revalidatePath, revalidateTag } from "next/cache";
import { extractTranslationsFromFormData, extractTagsFromFormData, serializeBlogPost } from "@/services/blogs.services";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const draft = await prisma.blogPost.findUnique({
      where: { id },
      select: {
        slug: true,
        coverImage: true,
      },
    });

    if (!draft) {
      return NextResponse.json(
        { message: "Draft not found", data: null },
        { status: 404 }
      );
    }

    if (draft.coverImage) {
      const filePath = join(process.cwd(), "public", draft.coverImage);
      try {
        await unlink(filePath);
      } catch (err) {
        console.error("Failed to delete draft cover image:", err);
      }
    }

    await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/admin");
    revalidateTag("blogs", "max");

    return NextResponse.json(
      { message: "Draft deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("DELETE DRAFT ERROR:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err?.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const categoryID = (formData.get("categoryId") as string) || null;
    const imageFile = formData.get("coverImage") as File | null;
    const translations = extractTranslationsFromFormData(formData);
    const tags = extractTagsFromFormData(formData);
    const english = translations.find((translation: any) => translation.language === "en") || translations[0];
    const title = english?.title?.trim() || "";

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
      include: { translations: true },
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
        slug,
        category: categoryID ? { connect: { id: categoryID } } : undefined,
        ...(coverImagePath ? { coverImage: coverImagePath } : {}),
        status: "DRAFT",
        translations: {
          deleteMany: {},
          create: translations.map((translation: any) => ({
            language: translation.language ?? "en",
            title: translation.title ?? "",
            description: translation.description ?? "",
            content: translation.content ?? [],
          })),
        },
        tagLinks: {
          deleteMany: {},
          create: tags.map((tagId: string) => ({
            tag: { connect: { id: tagId } },
          })),
        },
      },
      include: {
        category: { include: { translations: true } },
        translations: true,
        tagLinks: { include: { tag: { include: { translations: true } } } },
      },
    });

    revalidatePath(`/blog/${updatedDraft.slug}`);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidateTag("blogs", "max");
    revalidateTag("latestBlogs", "max");

    return NextResponse.json({
      message: "Draft updated successfully",
      data: serializeBlogPost(updatedDraft),
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