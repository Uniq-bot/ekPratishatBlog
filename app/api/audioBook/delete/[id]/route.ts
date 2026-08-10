import { prisma } from "@/libs/prisma";
import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  req: Request,
  { params }: RouteContext
) {
  const { id } = await params;

  const audio = await prisma.audioBook.findUnique({
    where: {
      id,
    },
  });

  if (!audio) {
    return Response.json(
      { message: "Audio book not found" },
      { status: 404 }
    );
  }

  // Delete physical audio file
  const fileName = path.basename(audio.audioFile);
  const filePath = path.join("/srv/audioBook", fileName);

  try {
    await fs.unlink(filePath);
  } catch (error: any) {
    // File may already have been deleted
    if (error.code !== "ENOENT") {
      console.error("Failed to delete audio file:", error);

      return Response.json(
        { message: "Failed to delete audio file" },
        { status: 500 }
      );
    }
  }

  const blogSlug = audio.blogSlug;

  // Delete database record
  await prisma.audioBook.delete({
    where: {
      id,
    },
  });

  if (blogSlug) {
    revalidatePath(`/blog/${blogSlug}`);
  }
  revalidatePath("/admin");

  return Response.json(
    {
      message: "Audio book deleted successfully",
    },
    { status: 200 }
  );
}