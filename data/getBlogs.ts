import { prisma } from "@/libs/prisma";

export const getBlogs = async ({
  page = 1,
  limit = 10,
  category,
  tag,
}: {
  page?: number;
  limit?: number;
  category?: string;
  tag?: string;
} = {}) => {
  try {
    const skip = (page - 1) * limit;

    const where: any = {
      status: "PUBLISHED",
      ...(category && {
        category: {
          slug: category,
        },
      }),
      ...(tag && {
        tags: {
          some: {
            slug: tag,
          },
        },
      }),
    };

    const [blogs, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
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
    const blogs = await prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { tags: true, category: true },
    });
    return { posts: blogs };
  } catch (err) {
    console.error("INITIAL LATEST FETCH ERROR:", err);
    return { posts: [] };
  }
};


export const getCategory= async()=>{
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return categories;
  } catch (err) {
    console.error("INITIAL CATEGORY FETCH ERROR:", err);
    return [];
  }
}

export const getTags= async()=>{
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
    return tags;
  } catch (err) {
    console.error("INITIAL TAG FETCH ERROR:", err);
    return [];
  }
}