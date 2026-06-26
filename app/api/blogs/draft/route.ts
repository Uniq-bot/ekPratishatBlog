import { prisma } from "@/libs/prisma";
import { mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";



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
    status: "DRAFT",
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
