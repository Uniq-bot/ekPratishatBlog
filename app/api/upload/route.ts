import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json(
        { message: "No image file provided" },
        { status: 400 },
      );
    }

    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const allowedTypes = ["jpg", "jpeg", "png", "webp", "gif"];

    const ext = imageFile.name.split(".").pop()?.toLowerCase();

    if (!ext || !allowedTypes.includes(ext)) {
      throw new Error("Invalid file type. Only images are allowed.");
    }

    const filename = `ad-${Date.now()}.${ext}`;
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);
    const imagePath = `/uploads/${filename}`;

    return NextResponse.json({ imagePath }, { status: 200 });
  } catch (error) {
    console.error("Image Upload Error:", error);
    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 },
    );
  }
}
