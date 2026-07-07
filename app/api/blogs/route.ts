import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { prisma } from "@/libs/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { getBlogByFilters, extractTranslationsFromFormData, extractTagsFromFormData, serializeBlogPost } from "@/services/blogs.services";

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
    const content = english?.content;
    const description = english?.description ?? "";

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: "Title, content and category are required" },
        { status: 400 },
      );
    }

    if (!authorID) {
      return NextResponse.json(
        { message: "Author ID is required" },
        { status: 400 },
      );
    }

    let coverImagePath: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const uploadDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const allowedTypes = ["jpg", "jpeg", "png", "webp", "gif"];
      const ext = imageFile.name.split(".").pop()?.toLowerCase();

      if (!ext || !allowedTypes.includes(ext)) {
        throw new Error("Invalid file type. Only images are allowed.");
      }

      const filename = `blog-${Date.now()}.${ext}`;
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      coverImagePath = `/uploads/${filename}`;
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
        status: "ONBOARDING",
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
        category: true,
        translations: true,
        tagLinks: { include: { tag: true } },
      },
    });

    revalidateTag("blogs", "max");
    revalidateTag("latestBlogs", "max");
    revalidateTag("categories", "max");
    revalidateTag("tags", "max");
    revalidateTag("popularBlogs", "max");
    revalidatePath("/");
    revalidatePath(`/blog/${generatedSlug}`);

    return NextResponse.json(
      { message: "Blog created successfully", data: serializeBlogPost(post) },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("CREATE BLOG ERROR:", err);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: err?.message ?? String(err),
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = Number(searchParams.get("offset")) || 0;
    const limit = Number(searchParams.get("limit")) || 10;
    const category = searchParams.get("category") || undefined;
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];
    const searchQuery = searchParams.get("query") || undefined;

    const { posts, totalCount } = await getBlogByFilters({
      offset,
      limit,
      category,
      tags,
      searchQuery,
    });

    return NextResponse.json({
      message: "Fetched posts successfully",
      posts,
      totalCount,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: "Internal server error on fetching posts",
        error: err?.message,
      },
      { status: 500 },
    );
  }
}
