import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { serializeBlogPost } from "@/services/blogs.services";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: RouteContext) {
  const { slug } = await params;
  try {
    const blog = await prisma.blogPost.findFirst({
      where: { slug },
      include: {
        category: true,
        translations: true,
        tagLinks: { include: { tag: true } },
      },
    });
    if (!blog) {
      return NextResponse.json({ message: "Blog not found", data: null }, { status: 404 });
    }
    return NextResponse.json({ message: "Fetched blog successfully", data: serializeBlogPost(blog) }, { status: 200 });
  } catch (err: any) {
    console.error("BLOG API ERROR:", err);
    return NextResponse.json({ message: "Internal server error", error: err?.message }, { status: 500 });
  }
}
