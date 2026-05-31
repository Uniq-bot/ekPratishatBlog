import { headers } from "next/headers";

export const getAuthorId = async (): Promise<string | null> => {
  const headersList = await headers();
  const userId = headersList.get("x-user-id");
  return userId || null;
};
