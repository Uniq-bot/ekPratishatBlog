const ALLOWED_IMAGE_TYPES = ["jpg", "jpeg", "png", "webp", "gif"];

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

  /*
   * TEMPORARILY DISABLED
   *
   * Local filesystem/Nginx image storage is disabled
   * for the Vercel deployment.
   *
   * Images will be moved to Cloudinary later.
   */

  return null;
}

export async function deleteUploadedImage(src?: string | null) {
  /*
   * TEMPORARILY DISABLED
   *
   * Do not attempt to delete files from /srv/images
   * on Vercel.
   */

  return;
}