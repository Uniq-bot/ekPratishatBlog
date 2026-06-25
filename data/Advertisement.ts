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
    // const isAdRunning = formData.get("isAdRunning") === "on";

    console.log(formData);
    if (!title || !description || !imageFile) {
      throw new Error("Title, description and image are required");
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

    const ad = await prisma.advertisement.create({
      data: {
        AdTitle: title,
        AdDescription: description,
        AdPoster: imagePath,
        AdSponsorName,
        AdLink,
        AdType,
        // isAdRunning:false,
      },
    });
    console.log(ad);
    revalidatePath("/admin");
    return ad;
  } catch (error) {
    console.log("Error creating the ad", error);
  }
};

export async function updateAdStatus({
  adId,
  status,
}: {
  adId: string;
  status: boolean;
}) {
  const updatedAd = await prisma.advertisement.update({
    where: { id: adId },
    data: { isAdRunning: status },
  });

  revalidatePath("/admin");
  revalidatePath("/");

  return updatedAd;
}

export const updateAd = async (formData: FormData) => {
  try {
    const adId = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const sponsorName = formData.get("AdSponsorName") as string;
    const adLink = formData.get("AdLink") as string;
    const adType = formData.get("AdType") as "BANNER" | "ASIDE" | "POPUP";

    const imageFile = formData.get("image") as File | null;

    const updateData: any = {
      AdTitle: title,
      AdDescription: description,
      AdSponsorName: sponsorName,
      AdLink: adLink,
      AdType: adType,
    };

    // Update image only if a new one was uploaded
    if (imageFile && imageFile.size > 0) {
      const uploadDir = join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const ext = imageFile.name.split(".").pop();
      const filename = `ad-${Date.now()}.${ext}`;
      const filepath = join(uploadDir, filename);

      await writeFile(filepath, buffer);

      updateData.AdPoster = `/uploads/${filename}`;
    }

    const updatedAd = await prisma.advertisement.update({
      where: {
        id: adId,
      },
      data: updateData,
    });

    revalidatePath("/admin");
    revalidatePath("/");

    return updatedAd;
  } catch (error) {
    console.error("Error updating ad:", error);
    throw error;
  }
};
export const deleteAd = async (adId: string) => {
  try {
    await prisma.advertisement.delete({
      where: { id: adId },
    });
    console.log("deleted");
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.log("Error deleting the ad", error);
    throw error;
  }
};

export const setAdStatus = async ({
  adId,
  status,
}: {
  adId: string;
  status: boolean;
}) => {
  try {
    await prisma.$transaction(async (tx) => {
      const currAd = await tx.advertisement.findUnique({
        where: { id: adId },
      });

      if (!currAd) {
        throw new Error("Ad not found");
      }

      if (status) {
        await tx.advertisement.updateMany({
          where: {
            AdType: currAd.AdType,
            isAdRunning: true,
          },
          data: {
            isAdRunning: false,
          },
        });
      }

      await tx.advertisement.update({
        where: { id: adId },
        data: {
          isAdRunning: status,
        },
      });
    });

    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.error("Error setting ad status:", error);
    throw error;
  }
};
