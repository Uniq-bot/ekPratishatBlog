import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 5, 20);

    const blogs = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { category: true, tags: true },
    });

    return NextResponse.json({ posts: blogs }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "Failed to fetch latest blogs", error: err?.message }, { status: 500 });
  }
}
