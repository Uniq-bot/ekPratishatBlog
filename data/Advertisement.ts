"use server";
import { prisma } from "@/libs/prisma";
import { deleteUploadedImage, saveUploadedImage } from "@/libs/images";
import { revalidatePath, revalidateTag } from "next/cache";

export const createAdvertisement = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const AdSponsorName = formData.get("AdSponsorName") as string;
    const AdLink = formData.get("AdLink") as string;
    const AdType = formData.get("AdType") as "BANNER" | "ASIDE" | "POPUP";
    const imageFile = formData.get("image") as File;
    // const isAdRunning = formData.get("isAdRunning") === "on";

    if (!title || !description || !imageFile) {
      throw new Error("Title, description and image are required");
    }

    const imagePath = await saveUploadedImage(imageFile, "ad");

    if (!imagePath) {
      throw new Error("Failed to save advertisement image.");
    }

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
    revalidatePath("/admin");
    revalidateTag("ads", "max");
    return ad;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error creating the ad", error);
    }
    throw new Error("We could not create the advertisement right now.");
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
  revalidateTag("ads", "max");
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

    const existingAd = await prisma.advertisement.findUnique({
      where: { id: adId },
      select: { AdPoster: true },
    });

    // Update image only if a new one was uploaded
    if (imageFile && imageFile.size > 0) {
      if (existingAd?.AdPoster) {
        await deleteUploadedImage(existingAd.AdPoster);
      }

      const imagePath = await saveUploadedImage(imageFile, "ad");
      if (imagePath) {
        updateData.AdPoster = imagePath;
      }
    }

    const updatedAd = await prisma.advertisement.update({
      where: {
        id: adId,
      },
      data: updateData,
    });
    revalidateTag("ads", "max");

    revalidatePath("/admin");
    revalidatePath("/");

    return updatedAd;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error updating ad:", error);
    }
    throw new Error("We could not update the advertisement right now.");
  }
};
export const deleteAd = async (adId: string) => {
  try {
    const ad = await prisma.advertisement.findUnique({ where: { id: adId } });
    if (ad?.AdPoster) {
      try {
        await deleteUploadedImage(ad.AdPoster);
      } catch (err) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Failed to delete ad image:", err);
        }
      }
    }

    await prisma.advertisement.delete({ where: { id: adId } });
    revalidateTag("ads", "max");

    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error deleting the ad", error);
    }
    throw new Error("We could not delete the advertisement right now.");
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
    revalidateTag("ads", "max");
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error setting ad status:", error);
    }
    throw new Error("We could not update the advertisement status right now.");
  }
};
