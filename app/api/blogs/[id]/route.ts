import { NextResponse } from "next/server";
import { getAuthorId } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { updateBlog, deleteBlog } from "@/services/blogs.services";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorId = await getAuthorId();

    if (!authorId) {
      return NextResponse.json(
        { message: "Unauthorized: No author ID found" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { title, content, categoryId, tags } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 }
      );
    }

    const blog = await updateBlog(
      id,
      title,
      content,
      categoryId,
      Array.isArray(tags) ? tags : undefined
    );

    return NextResponse.json(
      {
        message: "Blog post updated successfully",
        blog,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating blog:", err);
    return NextResponse.json(
      { message: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authorId = await getAuthorId();

    if (!authorId) {
      return NextResponse.json(
        { message: "Unauthorized: No author ID found" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await deleteBlog(id);

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting blog:", err);
    return NextResponse.json(
      { message: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
