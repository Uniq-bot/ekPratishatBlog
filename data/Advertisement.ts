"use server";
import { prisma } from "@/libs/prisma";
import { mkdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { join } from "path";

export const createAdvertisement = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const AdSponsorName = formData.get("AdSponsorName") as string;
    const AdLink = formData.get("AdLink") as string;
    const AdType = formData.get("AdType") as "BANNER" | "ASIDE" | "POPUP";
    const imageFile = formData.get("image") as File;
    const isAdRunning = formData.get("isAdRunning") === "on";

    console.log(formData)
    if (!title || !description || !imageFile) {
      throw new Error("Title, description and image are required");
    }

    const uploadDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = imageFile.name.split(".").pop();
    const filename = `ad-${Date.now()}.${ext}`;
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);
    const imagePath = `/uploads/${filename}`;

    const ad = await prisma.advertisement.create({
      data: {
        AdTitle: title,
        AdDescription: description,
        AdPoster: imagePath,
        AdSponsorName,
        AdLink,
        AdType,
        isAdRunning,
      },
    });
    console.log(ad)
    revalidatePath("/admin");
    return ad;
  } catch (error) {
    console.log("Error creating the ad", error);
  }
};
