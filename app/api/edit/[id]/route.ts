import { prisma } from "@/libs/prisma";
import { updateBlog } from "@/services/blogs.services";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    const blog = await prisma.blogPost.findFirst({
      where: { id },
      include: { category: true, tags: true },
    });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found", data: null }, { status: 404 });
    }
    return NextResponse.json({ message: "Fetched blog successfully", data: blog }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "Internal server error", error: err?.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, content, coverImage, description, categoryId, tags, slug } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json({ message: "Title, content and category are required" }, { status: 400 });
    }

    const updated = await updateBlog(id, { title, content, coverImage, description, categoryId, tags: tags ?? [], slug });
    return NextResponse.json({ message: "Blog updated successfully", data: updated }, { status: 200 });
  } catch (err: any) {
    console.error("UPDATE BLOG ERROR:", err);
    return NextResponse.json({ message: "Internal server error", error: err?.message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (err: any) {
    console.error("DELETE BLOG ERROR:", err);
    return NextResponse.json({ message: "Internal server error", error: err?.message }, { status: 500 });
  }
}
