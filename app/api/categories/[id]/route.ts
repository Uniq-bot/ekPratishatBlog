import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "Failed to delete category", error: err?.message }, { status: 500 });
  }
}
