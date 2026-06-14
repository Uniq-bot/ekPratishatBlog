import { unlink } from "fs/promises";
import path, { join } from "path";

export async function POST(req: Request) {
  try {
    const { imagePath } = await req.json();

    if (!imagePath) {
      return Response.json({ message: "No image path provided" }, { status: 400 });
    }

    const filePath = join(process.cwd(), "public", imagePath);

    await unlink(filePath);

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);

    return Response.json(
      { message: "Failed to delete image" },
      { status: 500 }
    );
  }
}