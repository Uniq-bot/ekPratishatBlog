import { NextResponse } from "next/server";
import { createCategory, getAllCategories } from "@/services/blogs.services";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description } = body;

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 },
      );
    }

    const category = await createCategory(name, description);

    return NextResponse.json(
      {
        message: "Category created successfully",
        category,
      },
      { status: 201 },
    );
  } catch (err) {
    // Handle unique constraint errors
    const error = err as { code?: string };
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Category with this name already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 },
    );
  }
}
