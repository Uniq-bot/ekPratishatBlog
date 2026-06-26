import { prisma } from "@/libs/prisma";
// import { writeFile, mkdir, unlink } from "fs/promises";
// import { join } from "path";
import { uploadImage } from "@/hooks/useCloudinary";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    const blog = await prisma.blogPost.findFirst({
      where: { id },
      include: { category: true, tags: true },
    });
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", data: null },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Fetched blog successfully", data: blog },
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

    const title = formData.get("title") as string;
    const contentRaw = formData.get("content") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const tagsRaw = formData.get("tags") as string;
    const imageFile = formData.get("coverImage") as File | null;

    const content = contentRaw ? JSON.parse(contentRaw) : [];
    const tags: string[] = tagsRaw
      ? JSON.parse(tagsRaw).map((t: any) => (typeof t === "string" ? t : t.id))
      : [];

    if (!title || !categoryId) {
      return NextResponse.json(
        { message: "Title and category are required" },
        { status: 400 },
      );
    }

    // Save new image only if a new file was uploaded
    let coverImagePath: string | undefined = undefined;
    if (imageFile && imageFile.size > 0) {
      // const uploadDir = join(process.cwd(), "public", "uploads");
      // await mkdir(uploadDir, { recursive: true });
      // const bytes = await imageFile.arrayBuffer();
      // const ext = imageFile.name.split(".").pop();
      // const filename = `cover-${Date.now()}.${ext}`;
      // await writeFile(join(uploadDir, filename), Buffer.from(bytes));
      // coverImagePath = `/uploads/${filename}`;
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadedImage = await uploadImage(buffer);

      coverImagePath = uploadedImage.secure_url;
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        description,
        content,
        category: {
          connect: { id: categoryId },
        },
        ...(coverImagePath && { coverImage: coverImagePath }),
        tags: {
          set: tags.map((tagId: string) => ({ id: tagId })),
        },
      },
      include: { category: true, tags: true },
    });

    // Revalidate the updated blog's detail page and all listing pages
    revalidatePath(`/blog/${updated.slug}`);
    revalidatePath("/");
    revalidatePath("/blog");

    return NextResponse.json(
      { message: "Blog updated successfully", data: updated },
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
    // const deleteImagePath = blog?.coverImage;
    // if (deleteImagePath) {
    //   const filePath = join(process.cwd(), "public", deleteImagePath);
    //   try {
    //     await unlink(filePath);
    //   } catch (err) {
    //     console.error("Failed to delete cover image:", err);
    //   }
    // }
    await prisma.blogViews.deleteMany({ where: { blogPostId: id } });
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
