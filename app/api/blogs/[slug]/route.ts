import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
 const blog = await prisma.blogPost.findFirst({
  where: {
    slug: params.slug,
  },
  include: {
    category: true,
    tags: true,
  },
});

    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Fetched blog successfully", data: blog },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("BLOG API ERROR:", err);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: err?.message || err,
      },
      { status: 500 }
    );
  }
}