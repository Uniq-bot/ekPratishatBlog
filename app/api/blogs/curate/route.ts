import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      // uncurate all
      await tx.blogPost.updateMany({
        data: { isToggled: false },
        where: { isToggled: true },
      });

      // curate selected
      await tx.blogPost.update({
        where: { id },
        data: { isToggled: true },
      });
    });

    return NextResponse.json(
      { message: "Blog curated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("CURATE BLOG ERROR:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        error: (error as any)?.message,
      },
      { status: 500 }
    );
  }
}