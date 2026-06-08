import { prisma } from "@/libs/prisma";

export const initialFetch = async () => {
  try {
    const [blogs, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { tags: true, category: true },
      }),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    ]);
    return { posts: blogs, totalCount };
  } catch (err) {
    console.error("INITIAL FETCH ERROR:", err);
    return { posts: [], totalCount: 0 };
  }
};

export const initialLatestFetch = async () => {
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


export const initialCategoryFetch= async()=>{
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

export const initialTagFetch= async()=>{
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