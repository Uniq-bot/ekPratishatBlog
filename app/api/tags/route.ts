import { NextResponse } from "next/server";
import { createTag, getAllTags } from "@/services/blogs.services";

export async function GET() {
  try {
    const tags = await getAllTags();
    return NextResponse.json(tags, { status: 200 });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching tags:", err);
    }
    return NextResponse.json(
      { message: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, nameNp } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Tag name is required" },
        { status: 400 },
      );
    }

    if (!nameNp || nameNp.trim() === "") {
      return NextResponse.json(
        { message: "Tag name in Nepali is required" },
        { status: 400 },
      );
    }

    const tag = await createTag({ name: name.trim(), nameNp: nameNp?.trim() });

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
    if (process.env.NODE_ENV !== "production") {
      console.error("Error creating tag:", err);
    }
    return NextResponse.json(
      { message: "Failed to create tag" },
      { status: 500 },
    );
  }
}
