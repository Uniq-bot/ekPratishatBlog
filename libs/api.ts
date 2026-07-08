export const unwrapApiResponse = <T>(payload: any): T | null => {
  if (!payload) return null;

  if (typeof payload === "object" && payload !== null) {
    if (payload.data !== undefined) return payload.data as T;
    if (payload.blog !== undefined) return payload.blog as T;
  }

  return payload as T;
};
