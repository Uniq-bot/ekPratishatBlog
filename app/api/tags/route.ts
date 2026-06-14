import { NextResponse } from "next/server";
import { createTag, getAllTags } from "@/services/blogs.services";

export async function GET() {
  try {
    const tags = await getAllTags();
    return NextResponse.json(tags, { status: 200 });
  } catch (err) {
    console.error("Error fetching tags:", err);
    return NextResponse.json(
      { message: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Tag name is required" },
        { status: 400 },
      );
    }

    const tag = await createTag(name);

    return NextResponse.json(
      {
        message: "Tag created successfully",
        tag,
      },
      { status: 201 },
    );
  } catch (err) {
    // Handle unique constraint errors
    const error = err as { code?: string };
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Tag with this name already exists" },
        { status: 409 },
      );
    }
    console.error("Error creating tag:", err);
    return NextResponse.json(
      { message: "Failed to create tag" },
      { status: 500 },
    );
  }
}
