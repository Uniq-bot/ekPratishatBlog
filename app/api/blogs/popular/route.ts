import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [
        { viewCount: "desc" },
        { createdAt: "desc" },
      ],
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        coverImage: true,
        viewCount: true,
        createdAt: true,
        tags: true,
        category: true,
      },
    });

    return NextResponse.json(
      { data: blogs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}