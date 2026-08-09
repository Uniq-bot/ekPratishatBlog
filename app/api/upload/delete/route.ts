import { unlink } from "fs/promises";
import path, { join } from "path";

export async function POST(req: Request) {
  try {
    const { imagePath } = await req.json();
    
    if (!imagePath) {
      return Response.json(
        { message: "No image path provided" },
        { status: 400 },
      );
    }

    const filePath = `/srv/images${imagePath.replace("/images", "")}`;
    await unlink(filePath);

    return Response.json({ success: true });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(err);
    }

    return Response.json(
      { message: "Failed to delete image" },
      { status: 500 },
    );
  }
}
