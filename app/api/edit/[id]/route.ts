import { prisma } from "@/libs/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { extractTranslationsFromFormData, extractTagsFromFormData, serializeBlogPost } from "@/services/blogs.services";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    const blog = await prisma.blogPost.findFirst({
      where: { id },
      include: {
        category: { include: { translations: true } },
        translations: true,
        tagLinks: { include: { tag: { include: { translations: true } } } },
      },
    });
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", data: null },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Fetched blog successfully", data: serializeBlogPost(blog) },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal server error", error: err?.message },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    const formData = await req.formData();

    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("coverImage") as File | null;
    const translations = extractTranslationsFromFormData(formData);
    const tags = extractTagsFromFormData(formData);
    const english = translations.find((translation: any) => translation.language === "en") || translations[0];
    const title = english?.title?.trim();
    const description = english?.description ?? "";

    if (!title || !categoryId) {
      return NextResponse.json(
        { message: "Title and category are required" },
        { status: 400 },
      );
    }

    let coverImagePath: string | undefined = undefined;
    if (imageFile && imageFile.size > 0) {
      const uploadDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const bytes = await imageFile.arrayBuffer();
      const ext = imageFile.name.split(".").pop();
      const filename = `cover-${Date.now()}.${ext}`;
      await writeFile(join(uploadDir, filename), Buffer.from(bytes));
      coverImagePath = `/uploads/${filename}`;
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(coverImagePath ? { coverImage: coverImagePath } : {}),
        status: "ONBOARDING",
        category: {
          connect: { id: categoryId },
        },
        translations: {
          upsert: translations.map((translation: any) => ({
            where: {
              blogPostId_language: {
                blogPostId: id,
                language: translation.language ?? "en",
              },
            },
            create: {
              language: translation.language ?? "en",
              title: translation.title ?? "",
              description: translation.description ?? "",
              content: translation.content ?? [],
            },
            update: {
              title: translation.title ?? "",
              description: translation.description ?? "",
              content: translation.content ?? [],
            },
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

    revalidatePath(`/blog/${updated.slug}`);
    revalidatePath("/");
    revalidatePath("/blog");

    return NextResponse.json(
      { message: "Blog updated successfully", data: serializeBlogPost(updated) },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("UPDATE BLOG ERROR:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err?.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    const blog = await prisma.blogPost.findUnique({
      where: { id },
      select: {
        slug: true,
        coverImage: true,
      },
    });

    const deleteImagePath = blog?.coverImage;
    if (deleteImagePath) {
      const filePath = join(process.cwd(), "public", deleteImagePath);
      try {
        await unlink(filePath);
      } catch (err) {
        console.error("Failed to delete cover image:", err);
      }
    }

    await prisma.blogViews.deleteMany({ where: { blogPostId: id } });
    await prisma.blogComment.deleteMany({ where: { blogPostId: id } });
    await prisma.blogPost.delete({ where: { id } });

    if (blog?.slug) {
      revalidatePath(`/blog/${blog.slug}`);
      revalidateTag(`blog-${blog.slug}`, "max");
    }
    revalidateTag("related", "max");
    revalidateTag("blogs", "max");
    revalidateTag("latestBlogs", "max");
    revalidateTag("popularBlogs", "max");
    revalidateTag("curatedBlog", "max");
    revalidatePath("/");
    revalidatePath("/blog");

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("DELETE BLOG ERROR:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err?.message },
      { status: 500 },
    );
  }
}
