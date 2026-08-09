import { NextResponse } from "next/server";
// import { uploadImage } from "@/hooks/useCloudinary";
// import { writeFile, mkdir } from "fs/promises";
// import { join } from "path";

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

    const allowedTypes = ["jpg", "jpeg", "png", "webp", "gif"];

    const ext = imageFile.name.split(".").pop()?.toLowerCase();

    if (!ext || !allowedTypes.includes(ext)) {
      return NextResponse.json(
        { message: "Invalid file type. Only images are allowed." },
        { status: 400 },
      );
    }

    /*
     * TEMPORARILY DISABLED
     *
     * Local filesystem / Nginx image storage.
     *
     * This will not work correctly on Vercel because
     * /srv/images exists only on the local server.
     */

    // const uploadDir = "/srv/images";
    // await mkdir(uploadDir, { recursive: true });

    // const bytes = await imageFile.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // const filename = `ad-${Date.now()}.${ext}`;
    // const filepath = join(uploadDir, filename);

    // await writeFile(filepath, buffer);

    // const imagePath = `/images/${filename}`;

    /*
     * Cloudinary upload can be enabled later:
     *
     * const uploadedImage = await uploadImage(buffer);
     * const imagePath = uploadedImage.secure_url;
     */

    return NextResponse.json(
      {
        message: "Image upload temporarily disabled",
        imagePath: null,
      },
      { status: 200 },
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Image Upload Error:", error);
    }

    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 },
    );
  }
}