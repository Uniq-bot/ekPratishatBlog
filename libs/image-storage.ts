import { mkdir, unlink, writeFile } from "fs/promises";
import { join } from "path";

const IMAGE_DIR = process.env.IMAGE_DIR || "/srv/images";
const ALLOWED_IMAGE_TYPES = ["jpg", "jpeg", "png", "webp", "gif"];

function slugifyName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "image";
}

export async function saveUploadedImage(
  file: File,
  prefix = "image",
  name?: string | null,
) {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !ALLOWED_IMAGE_TYPES.includes(ext)) {
    throw new Error("Invalid file type. Only images are allowed.");
  }

  await mkdir(IMAGE_DIR, { recursive: true });

  const safeName = name ? slugifyName(name) : null;
  const filename = safeName
    ? `${prefix}-${safeName}.${ext}`
    : `${prefix}-${Date.now()}.${ext}`;
  const filepath = join(IMAGE_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filepath, buffer);

  return `/images/${filename}`;
}

export async function deleteUploadedImage(src?: string | null) {
  if (!src) return;

  try {
    if (src.startsWith("/images/")) {
      const filename = src.replace("/images/", "");
      await unlink(join(IMAGE_DIR, filename));
      return;
    }

    await unlink(join(process.cwd(), "public", src));
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to delete image:", error);
    }
  }
}
