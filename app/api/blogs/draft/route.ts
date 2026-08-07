import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { extractTranslationsFromFormData, extractTagsFromFormData, serializeBlogPost } from "@/services/blogs.services";
import { saveUploadedImage } from "@/libs/images";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const authorID = formData.get("authorID") as string;
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("coverImage") as File | null;
    const translations = extractTranslationsFromFormData(formData);
    const tags = extractTagsFromFormData(formData);
    const english = translations.find((translation: any) => translation.language === "en") || translations[0];
    const title = english?.title?.trim();
    const description = english?.description ?? "";

    if (!authorID) {
      return NextResponse.json(
        { message: "Author ID is required" },
        { status: 400 },
      );
    }

    if (!title || !categoryId) {
      return NextResponse.json(
        { message: "Title and category are required" },
        { status: 400 },
      );
    }

    let coverImagePath: string | null = null;

    if (imageFile && imageFile.size > 0) {
      coverImagePath = await saveUploadedImage(imageFile, "draft");
    }

    const generatedSlug = `${title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")}-${Date.now()}`;

    const existingCurated = await prisma.blogPost.findFirst({
      where: { isToggled: true },
    });

    const post = await prisma.blogPost.create({
      data: {
        slug: generatedSlug,
        coverImage: coverImagePath,
        status: "DRAFT",
        author: { connect: { id: authorID } },
        category: { connect: { id: categoryId } },
        isToggled: !existingCurated,
        translations: {
          create: translations.map((translation: any) => ({
            language: translation.language ?? "en",
            title: translation.title ?? "",
            description: translation.description ?? "",
            content: translation.content ?? [],
          })),
        },
        tagLinks: {
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

    return NextResponse.json(
      { message: "Blog created successfully", data: serializeBlogPost(post) },
      { status: 201 },
    );
  } catch (err: any) {
    if (process.env.NODE_ENV !== "production") {
      console.error("CREATE BLOG ERROR:", err);
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: err?.message ?? String(err),
      },
      { status: 500 },
    );
  }
}
