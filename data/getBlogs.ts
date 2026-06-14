import { prisma } from "@/libs/prisma";
export const cache = new Map<string, any>();
const TTL = 5 * 60 * 1000; // 5 minutes
export const getBlogs = async ({
  page = 1,
  limit = 10,
  category,
  tag,
  sort = "latest",
  search,
}: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
  sort?: "latest" | "oldest";
  search?: string;
} = {}) => {
  try {
    console.log(category);
    const skip = (page - 1) * limit;
  
    const where: any = {
      status: "PUBLISHED",
      ...(category && {
        category: {
          is: { slug: category },
        },
      }),
      ...(tag && {
        tags: {
          some: { slug: tag },
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const orderBy =
      sort === "oldest"
        ? { createdAt: "asc" as const }
        : { createdAt: "desc" as const };

    const [blogs, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: { tags: true, category: true },
      }),
      prisma.blogPost.count({ where }),
    ]);

   
    return { posts: blogs, totalCount };
  } catch (err) {
    console.error("BLOG FETCH ERROR:", err);
    return { posts: [], totalCount: 0 };
  }
};

export const getLatestBlogs = async () => {
  try {
    const cacheKey = "latestBlogs";
    if (cache.has(cacheKey)) {
      if (cache.get(cacheKey).timestamp > Date.now() - 5 * 60 * 1000) {
        return cache.get(cacheKey).data;
      } else {
        cache.delete(cacheKey);
      }
    }
    const blogs = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { tags: true, category: true },
    });
    cache.set(cacheKey, {
      data: { posts: blogs },
      timestamp: Date.now() + TTL,
    });
    return { posts: blogs };
  } catch (err) {
    console.error("INITIAL LATEST FETCH ERROR:", err);
    return { posts: [] };
  }
};

export const getCategory = async () => {
  try {
    const categories = await prisma.category.findMany({});

    return categories;
  } catch (err) {
    console.error("INITIAL CATEGORY FETCH ERROR:", err);
    return [];
  }
};

export const getTags = async () => {
  try {
    const tags = await prisma.tag.findMany({});
    return tags;
  } catch (err) {
    console.error("INITIAL TAG FETCH ERROR:", err);
    return [];
  }
};
