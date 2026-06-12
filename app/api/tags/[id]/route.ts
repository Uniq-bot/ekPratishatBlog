import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  try {
    await prisma.tag.delete({ where: { id } });
    return NextResponse.json({ message: "Tag deleted" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: "Failed to delete tag", error: err?.message }, { status: 500 });
  }
}
