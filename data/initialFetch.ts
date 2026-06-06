import { prisma } from "@/libs/prisma";

export const initialFetch = async () => {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      include: {
        tags: true,
        category: true,
      },
    });

    return {
      posts: blogs, // 🔥 match React Query shape
    };
  } catch (err) {
    console.error("INITIAL FETCH ERROR:", err);

    return {
      posts: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
};

export const initialLatestFetch = async () => {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        createdAt: "asc",
      },
      take: 5,
      include: {
        tags: true,
        category: true,
      },
    });
console.log(blogs)
    return {
        
      latestBlogs: blogs, // 🔥 match React Query shape
    };
  } catch (err) {
    console.error("INITIAL LATEST FETCH ERROR:", err);
    return {
      latestBlogs: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
};
