import { getAllBlogs, createBlog } from "@/services/blogs.services";
import { NextResponse } from "next/server";
import { getAuthorId } from "@/libs/auth";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const blogs = await getAllBlogs();
    return NextResponse.json(blogs, { status: 200 });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const authorId = await getAuthorId();

    if (!authorId) {
      return NextResponse.json(
        { message: "Unauthorized: No author ID found" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const { title, content, categoryId, tags } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: "Title, content, and category are required" },
        { status: 400 },
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Invalid category ID" },
        { status: 400 },
      );
    }

    // If tags provided, validate they exist
    if (tags && Array.isArray(tags) && tags.length > 0) {
      const foundTags = await prisma.tag.findMany({
        where: { id: { in: tags } },
        select: { id: true },
      });
      const foundIds = foundTags.map((t) => t.id);
      const missing = tags.filter((t: string) => !foundIds.includes(t));
      if (missing.length > 0) {
        return NextResponse.json(
          { message: `Invalid tag IDs: ${missing.join(",")}` },
          { status: 400 },
        );
      }
    }

    const newBlog = await createBlog(
      title,
      content,
      categoryId,
      authorId,
      Array.isArray(tags) ? tags : undefined,
    );

    return NextResponse.json(
      {
        message: "Blog post created successfully",
        blog: newBlog,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { message: "Failed to create blog" },
      { status: 500 },
    );
  }
}