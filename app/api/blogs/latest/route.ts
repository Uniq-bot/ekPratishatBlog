import { NextResponse } from "next/server";
import { getLatestBlogs } from "@/services/blogs.services";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit")) || 5;
    const posts = await getLatestBlogs(limit);

    return NextResponse.json(
      {
        message: "fetched latest blogs successfully",
        posts,
      },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "internal server error on fetching latest posts",
        error: err,
      },
      { status: 500 },
    );
  }
}