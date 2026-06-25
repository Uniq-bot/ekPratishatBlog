import cloudinary from "@/libs/cloudinary";

export async function uploadImage(buffer: Buffer) {
  const result = await new Promise<any>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "blogs" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });
  console.log(result)
  return result;
}