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

      console.log("Inserted email: ", insertEmail.email);
    } else {
      return;
    }
  } catch (error) {
    console.error("Error subscribing email: ", error);
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
        console.error("Error fetching subscribers: ", error);
      throw new Error("We could not fetch subscribers right now.");
    }
}