import { NextResponse } from "next/server";
import { createCategory, getAllCategories } from "@/services/blogs.services";
import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, nameNp } = body;
    if (!name?.trim()) {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 });
    }
    if (!nameNp?.trim()) {
      return NextResponse.json({ message: "Category name in Nepali is required" }, { status: 400 });
    }
    const category = await createCategory(name, nameNp);
    return NextResponse.json({ message: "Category created successfully", category }, { status: 201 });
  } catch (err) {
    const error = err as { code?: string };
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Category with this name already exists" }, { status: 409 });
    }
    return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
  }
}
