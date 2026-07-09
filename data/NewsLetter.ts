"use server";
import { prisma } from "@/libs/prisma";

export const subscribeByEmail = async (email: string) => {
  try {
    const emailExists = await prisma.newsletterSubscriber.findUnique({
      where: {
        email,
      },
    });
    if (!emailExists) {
      const insertEmail = await prisma.newsletterSubscriber.create({
        data: {
          email,
        },
      });
    } else {
      return;
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error subscribing email: ", error);
    }
    throw new Error("We could not save the subscription right now.");
  }
};

export const getSubscribers = async () => {
    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return subscribers;
    } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Error fetching subscribers: ", error);
        }
      throw new Error("We could not fetch subscribers right now.");
    }
}