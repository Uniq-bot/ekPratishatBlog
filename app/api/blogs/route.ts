import { getAuthorId } from "@/libs/auth";
import { prisma } from "@/libs/prisma";
import { createBlog, getBlogByFilters } from "@/services/blogs.services";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      content,
      coverPage,
      published,
      authorID,
      categoryId,
      tags,
    } = body;

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        {
          message: "Title, content and category are required",
        },
        { status: 400 }
      );
    }

    const generatedSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const post = await createBlog({
      title,
      content,
      coverPage,
      status: "PUBLISHED",
      authorID,
      categoryId: categoryId, 
      tags: tags ?? [],
      slug: `${generatedSlug}-${Date.now()}`,
    });

    return NextResponse.json(
      {
        message: "Blog created successfully",
        post,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);

    return NextResponse.json(
      {
        message: "Internal server error on creation of post",
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
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
