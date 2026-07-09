import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { serializeBlogPost } from "@/services/blogs.services";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => null);

    const translations = Array.isArray(body?.translations) ? body.translations : [];
    const normalizedTranslations = translations
      .filter((item: any) => item && typeof item === "object")
      .map((item: any) => ({
        language: item.language === "ne" ? "ne" : "en",
        title: item.title ?? "",
        description: item.description ?? "",
        content: item.content ?? [],
      }));

    const englishTranslation = normalizedTranslations.find((item: any) => item.language === "en");
    const nepaliTranslation = normalizedTranslations.find((item: any) => item.language === "ne");

    if (!englishTranslation || !nepaliTranslation) {
      return NextResponse.json(
        { message: "Both English and Nepali translations are required" },
        { status: 400 },
      );
    }

    const existingBlog = await prisma.blogPost.findUnique({
      where: { id },
      include: { translations: true },
    });

    if (!existingBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const updatedBlog = await prisma.blogPost.update({
      where: { id },
      data: {
        status: "PUBLISHED",
        translations: {
          deleteMany: {},
          create: normalizedTranslations.map((translation: any) => ({
            language: translation.language,
            title: translation.title ?? "",
            description: translation.description ?? "",
            content: translation.content ?? [],
          })),
        },
      },
      include: {
        category: { include: { translations: true } },
        translations: true,
        tagLinks: { include: { tag: { include: { translations: true } } } },
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    revalidatePath("/blog");
    revalidateTag("blogs", "max");
    revalidateTag("latestBlogs", "max");

    return NextResponse.json(
      {
        message: "Blog completed and published successfully",
        data: serializeBlogPost(updatedBlog),
      },
      { status: 200 },
    );
  } catch (err: any) {
    if (process.env.NODE_ENV !== "production") {
      console.error("COMPLETE BLOG ERROR:", err);
    }
    return NextResponse.json(
      { message: "Internal server error", error: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}
