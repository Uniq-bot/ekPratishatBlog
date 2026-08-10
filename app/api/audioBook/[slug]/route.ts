import { prisma } from "@/libs/prisma";
import fs from "fs/promises";
import { revalidatePath, revalidateTag } from "next/cache";
import path from "path";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function POST(req: Request, { params }: RouteContext) {
  const { slug } = await params;

  const formData = await req.formData();
  const audioFile = formData.get("audioBook") as File | null;

  const allowedExtensions = [".mp3", ".wav", ".m4a", ".ogg", ".aac"];

  if (!audioFile) {
    return new Response(JSON.stringify({ message: "Audio file is required" }), {
      status: 400,
    });
  }

  const extension = path.extname(audioFile.name).toLowerCase();

  if (!allowedExtensions.includes(extension)) {
    return new Response(
      JSON.stringify({ message: "Unsupported audio format" }),
      { status: 400 },
    );
  }

  // Validate file
  if (
    !audioFile.type.startsWith("audio/") ||
    !allowedExtensions.includes(extension)
  ) {
    return new Response(
      JSON.stringify({ message: "Only audio files are allowed" }),
      { status: 400 },
    );
  }

  const uploadDir = "/srv/audioBook";

  await fs.mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${audioFile.name}`;
  const filePath = path.join(uploadDir, fileName);

  const arrayBuffer = await audioFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await fs.writeFile(filePath, buffer);

  await prisma.audioBook.create({
    data: {
      blogSlug: slug,
      audioFile: `/audioBook/${fileName}`,
    },
  });

  revalidatePath("/");
  revalidatePath(`/blog/${slug}`);
  revalidatePath(`/admin`);
  revalidateTag("blog", "max");
  // revalidatePath(`/admin/manage-blogs`)

  return new Response(
    JSON.stringify({
      message: "Audio Book Uploaded Successfully",
      audioFile: `/uploads/audio/${fileName}`,
    }),
    { status: 200 },
  );
}
