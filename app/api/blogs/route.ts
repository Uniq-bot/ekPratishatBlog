import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { uploadImage } from "@/hooks/useCloudinary";
import { prisma } from "@/libs/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { getBlogByFilters } from "@/services/blogs.services";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const description = formData.get("description") as string;
    const authorID = formData.get("authorID") as string;
    const categoryId = formData.get("categoryId") as string;
    const tagsRaw = formData.get("tags") as string;
    const imageFile = formData.get("coverImage") as File | null;

    const tags = tagsRaw ? JSON.parse(tagsRaw) : [];

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

      const filename = `ad-${Date.now()}.${ext}`;
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      coverImagePath = `/uploads/${filename}`;
  //       const bytes = await imageFile.arrayBuffer();
  // const buffer = Buffer.from(bytes);

  // const allowedTypes = ["jpg", "jpeg", "png", "webp", "gif"];

  // const ext = imageFile.name.split(".").pop()?.toLowerCase();

  if (!ext || !allowedTypes.includes(ext)) {
    throw new Error("Invalid file type. Only images are allowed.");
  }

  // const uploadedImage = await uploadImage(buffer);

  // coverImagePath = uploadedImage.secure_url;
    }

    const generatedSlug = `${title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")}-${Date.now()}`;

  const existingCurated = await prisma.blogPost.findFirst({
  where: {
    isToggled: true,
  },
});

const post = await prisma.blogPost.create({
  data: {
    title,
    content,
    coverImage: coverImagePath,
    description,
    status: "PUBLISHED",
    authorID,
    categoryID: categoryId,
    slug: generatedSlug,

    tags: {
      connect: tags.map((tag: any) => ({
        id: tag.id,
      })),
    },

    isToggled: !existingCurated,
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
      { message: "Blog created successfully", post },
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
    // const sort        = (searchParams.get("sort") as "latest" | "oldest") || "latest";

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
