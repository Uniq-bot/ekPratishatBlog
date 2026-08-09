// import { unlink } from "fs/promises";
// import path, { join } from "path";

export async function POST(req: Request) {
  try {
    const { imagePath } = await req.json();

    if (!imagePath) {
      return Response.json(
        { message: "No image path provided" },
        { status: 400 },
      );
    }

    /*
     * TEMPORARILY DISABLED
     *
     * This deletes files from the local Nginx filesystem.
     * It will not work correctly on Vercel.
     */

    // const filePath = `/srv/images${imagePath.replace("/images", "")}`;
    // await unlink(filePath);

    return Response.json({
      success: true,
      message: "Image deletion temporarily disabled",
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Image Delete Error:", err);
    }

    return Response.json(
      { message: "Failed to delete image" },
      { status: 500 },
    );
  }
}