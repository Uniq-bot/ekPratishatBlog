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

    const newBlog = await createBlog(
      title,
      content,
      categoryId,
      authorId,
      tags
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