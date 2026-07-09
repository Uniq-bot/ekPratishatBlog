import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { serializeBlogPost } from "@/services/blogs.services";

type RouteContext = { params: Promise<{ id: string }> };

const normalizeTranslation = (translation: any) => {
  const language = String(translation?.language ?? "en").toLowerCase();
  const normalizedLanguage = language === "ne" || language === "np" || language === "nepali" ? "ne" : "en";

  return {
    id: translation?.id ?? null,
    language: normalizedLanguage,
    title: translation?.title ?? "",
    description: translation?.description ?? "",
    content: translation?.content ?? [],
  };
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { id } = await params;

    const blog = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: { include: { translations: true } },
        translations: true,
        tagLinks: { include: { tag: { include: { translations: true } } } },
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const translations = Array.isArray(blog.translations)
      ? blog.translations.map(normalizeTranslation)
      : [];

    const englishTranslation = translations.find((item) => item.language === "en") ?? null;
    const nepaliTranslation = translations.find((item) => item.language === "ne") ?? null;
    const visibleTranslations = [englishTranslation, nepaliTranslation].filter(Boolean);

    const responseData = {
      ...serializeBlogPost(blog, "en"),
      translations: visibleTranslations.length > 0 ? visibleTranslations : englishTranslation ? [englishTranslation] : [],
    };

    return NextResponse.json({ data: responseData }, { status: 200 });
  } catch (error: any) {
    if (process.env.NODE_ENV !== "production") {
      console.error("ONBOARDING BLOG GET ERROR:", error);
    }
    return NextResponse.json(
      { message: "Failed to load onboarding blog", error: error?.message ?? String(error) },
      { status: 500 },
    );
  }
}
