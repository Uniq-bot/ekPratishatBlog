import { unstable_cache } from "next/cache";
import { prisma } from "@/libs/prisma";
export const getBlogs = unstable_cache(
  async ({
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
      const start = performance.now();

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
        select: {
          id: true,
          title: true,
          slug: true,
          coverImage: true,
          description: true,
          createdAt: true,
          content: true,
          category: {
            select: {
              name: true,
              slug: true,
            },
          },

          tags: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);
  console.log("getBlogs:", performance.now() - start, "ms");

    return { posts: blogs, totalCount };
  } catch (err) {
    console.error("BLOG FETCH ERROR:", err);
    return { posts: [], totalCount: 0 };
  }
},
["blogs"],
{
   tags: ["blogs"],
  revalidate: 60 * 60 * 24, 
}

)

export const getLatestBlogs = unstable_cache(
  async () => {
    try {
      const blogs = await prisma.blogPost.findMany({
        where: { isToggled: false, status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },

  take: 5,
  select: {
    id: true,
    title: true,
    slug: true,
    coverImage: true,
    description: true,
    createdAt: true,

    category: {
      select: {
        name: true,
        slug: true,
      },
    },

    tags: {
      select: {
        name: true,
        slug: true,
      },
    },
  },
},
  
);

    return { posts: blogs };
  } catch (err) {
    console.error("INITIAL LATEST FETCH ERROR:", err);
    return { posts: [] };
  }
},
["latestBlogs"],
  {
    tags: ["latestBlogs"],
    revalidate: 60 * 60 * 24, 
  }
)

export const getCategory = unstable_cache(
  async () => prisma.category.findMany(),
  ["categories"],
  {
    tags: ["categories"],
    revalidate: 86400,
  }
);

export const getTags = unstable_cache(
  async () => prisma.tag.findMany(),
  ["tags"],
  {
    tags: ["tags"],
    revalidate: 86400,
  }
);

export const getPopularBlogs = unstable_cache(
  async () => {
    try {
      const blogs = await prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ viewCount: "desc" }, { createdAt: "desc" }],
        take: 3,
      include: { tags: true, category: true },
    });
    return { posts: blogs };
  } catch (err) {
    console.error("POPULAR BLOGS FETCH ERROR:", err);
    return { posts: [] };
  }
},
["popularBlogs"],
{
  tags: ["popularBlogs"],
  revalidate: 60 * 60 * 24,
}
);

export const getCuratedBlog = unstable_cache(async () => {
    return await prisma.blogPost.findFirst({
      where: {
        isToggled: true,
        status: "PUBLISHED",
      },
    });
  }, ["curated-blog"], { revalidate: 300 });


export const getAds = unstable_cache(
  async () => {
    try {
      const threeAds = await prisma.advertisement.findMany({
        where: { isAdRunning: true },
        orderBy: { createdAt: "desc" },
        // take: 3,
      });
      return threeAds;
    } catch (error) {
      console.error("ADS FETCH ERROR:", error);
      return [];
    }
  },
  ["ads"],
  {
    tags: ["ads"],
    revalidate: 60 * 60 * 24,
  }
);
