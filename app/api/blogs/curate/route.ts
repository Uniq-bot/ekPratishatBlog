import { prisma } from "@/libs/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
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

      await tx.blogPost.update({
        where: { id },
        data: { isToggled: true },
      });
    });
    revalidateTag("blogs", "max");
    revalidateTag("latestBlogs", "max");
    revalidateTag("popularBlogs", "max");
    revalidateTag("curatedBlog", "max");
    revalidatePath("/");
    revalidatePath("/blog");

    return NextResponse.json(
      { message: "Blog curated successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("CURATE BLOG ERROR:", error);
    }

    return NextResponse.json(
      {
        message: "Internal server error",
        error: (error as any)?.message,
      },
      { status: 500 }
    );
  }
}