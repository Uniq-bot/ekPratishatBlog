import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(request: Request) {
  try {
    const { blogId, sessionId } = await request.json();

    if (!blogId || !sessionId) {
      return NextResponse.json(
        { message: "Missing blogId or sessionId" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      const existing = await tx.blogViews.findUnique({
        where: {
          blogPostId_sessionId: {
            blogPostId: blogId,
            sessionId,
          },
        },
      });

      if (existing) return;

      await tx.blogViews.create({
        data: { blogPostId: blogId, sessionId },
      });

      await tx.blogPost.update({
        where: { id: blogId },
        data: { viewCount: { increment: 1 } },
      });
    });
    console.log("success")
    return NextResponse.json(
      { message: "View recorded successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
