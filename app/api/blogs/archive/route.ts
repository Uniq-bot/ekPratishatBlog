import { prisma } from "@/libs/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";




export async function PATCH(req: Request) {
  const { id } = await req.json();
    try {
        const isArchived = await prisma.blogPost.findUnique({
            where: { id },
            select: { status: true },
        });     

        if(!isArchived) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        const updatedBlog = await prisma.blogPost.update({
            where: { id },
            data: {
                status: isArchived.status === "ARCHIVED" ? "DRAFT" : "ARCHIVED",
            },
        });


        
        
        revalidateTag("blogs", "max");
        revalidateTag("latestBlogs", "max");
        revalidateTag("categories", "max");
        revalidateTag("tags", "max");
        revalidateTag("popularBlogs", "max");

        revalidatePath("/");
        revalidatePath(`/blog/${updatedBlog.slug}`);
        return NextResponse.json({ message: "Blog archived successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to archive blog" },
            { status: 500 }
        );
    }
}