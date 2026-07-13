import { NextResponse } from "next/server";
import { createCategory, getAllCategories, updateCategory } from "@/services/blogs.services";
import { revalidatePath, revalidateTag } from "next/cache";

const revalidateTaxonomyCache = () => {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidateTag("categories", "max");
  revalidateTag("tags", "max");
  revalidateTag("blogs", "max");
};

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error fetching categories:", err);
    }
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
    revalidateTaxonomyCache();
    return NextResponse.json({ message: "Category created successfully", category }, { status: 201 });
  } catch (err) {
    const error = err as { code?: string };
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Category with this name already exists" }, { status: 409 });
    }
    if (process.env.NODE_ENV !== "production") {
      console.error("Error creating category:", err);
    }
    return NextResponse.json({ message: "Failed to create category" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, name, nameNp, description } = body;

    if (!id) {
      return NextResponse.json({ message: "Category id is required" }, { status: 400 });
    }

    if (!name?.trim()) {
      return NextResponse.json({ message: "Category name is required" }, { status: 400 });
    }

    const category = await updateCategory(id, name.trim(), nameNp?.trim(), description);
    revalidateTaxonomyCache();
    return NextResponse.json({ message: "Category updated successfully", category }, { status: 200 });
  } catch (err) {
    const error = err as { code?: string };
    if (error.code === "P2002") {
      return NextResponse.json({ message: "Category with this name already exists" }, { status: 409 });
    }
    if (process.env.NODE_ENV !== "production") {
      console.error("Error updating category:", err);
    }
    return NextResponse.json({ message: "Failed to update category" }, { status: 500 });
  }
}
