import { prisma } from "@/libs/prisma";
import { createBlog, getBlogByFilters } from "@/services/blogs.services";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, coverPage, published, authorID, categoryID, tags } =
      body;
    if (!title || !content || !authorID || !categoryID) {
      return NextResponse.json(
        {
          message: "missing required fields",
        },
        { status: 400 },
      );
    }
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const post = await createBlog({
      title,
      content,
      coverPage,
      published: Boolean(published),
      authorID,
      categoryID,
      tags,
      slug: `${slug}-${Date.now()}`,
    })
  } catch (err) {
    return NextResponse.json(
      {
        message: "internal server error on creation of post",
        error: err,
      },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const offset = Number(searchParams.get("offset")) || 0;
    const limit = Number(searchParams.get("limit")) || 30;
    const category = searchParams.get("category")|| undefined;
    const tags = searchParams.get("tags")?.split(",") || [];
    const searchQuery = searchParams.get("query") || undefined;

    const { posts, totalCount } = await getBlogByFilters({
      offset,
      limit,
      category,
      tags,
      searchQuery,
    });

    return NextResponse.json({
      message: "fetched posts successfully",
      posts,
      totalCount,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "internal server error on fetching posts",
        error: err,
      },
      { status: 500 },
    );
  }
}
