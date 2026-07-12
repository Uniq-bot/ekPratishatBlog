import { unstable_cache } from "next/cache";
import { prisma } from "@/libs/prisma";
import { serializeBlogList } from "@/services/blogs.services";

const normalizeLanguage = (value: string | null | undefined) => {
  return value === "ne" ? "ne" : "en";
};

const serializeCategory = (category: any, language = "en") => {
  const translation = Array.isArray(category?.translations)
    ? category.translations.find(
        (item: any) => item?.language === normalizeLanguage(language),
      ) || category.translations[0]
    : null;

  return {
    ...category,
    name: translation?.name ?? "",
    description: translation?.description ?? null,
  };
};

const serializeTag = (tag: any, language = "en") => {
  const translation = Array.isArray(tag?.translations)
    ? tag.translations.find(
        (item: any) => item?.language === normalizeLanguage(language),
      ) || tag.translations[0]
    : null;

  return {
    ...tag,
    name: translation?.name ?? "",
  };
};

import { cacheTag, cacheLife } from "next/cache";
import { Prisma } from "@/generated/prisma/client";

export async function getBlogs({
  page = 1,
  limit = 4,
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
} = {}) {
  "use cache";

  cacheTag("blogs");
  cacheLife("hours");

  const skip = (page - 1) * limit;

  const where: Prisma.BlogPostWhereInput = {
    status: "PUBLISHED",

    ...(category && {
      category: {
        is: {
          slug: category,
        },
      },
    }),

    ...(tag && {
      tagLinks: {
        some: {
          tag: {
            slug: tag,
          },
        },
      },
    }),

    ...(search && {
      translations: {
        some: {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        },
      },
    }),
  };

  const orderBy = {
    createdAt: sort === "oldest" ? "asc" : "desc",
  } as const;

  const [blogs, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        slug: true,
        createdAt: true,
        coverImage: true,
        viewCount: true,

        category: {
          select: {
            slug: true,
            translations: {
              select: {
                language: true,
                name: true,
              },
            },
          },
        },

        translations: {
          select: {
            language: true,
            title: true,
            description: true,
          },
        },

        tagLinks: {
          select: {
            tag: {
              select: {
                slug: true,
                translations: {
                  select: {
                    language: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    }),

    prisma.blogPost.count({
      where,
    }),
  ]);

  return {
    posts: serializeBlogList(blogs),
    totalCount,
  };
}

export const getLatestBlogs = unstable_cache(
  async () => {
    try {
      const blogs = await prisma.blogPost.findMany({
        where: { isToggled: false, status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        take: 4,
        include: {
          category: { include: { translations: true } },
          translations: true,
          tagLinks: { include: { tag: { include: { translations: true } } } },
        },
      });

      return { posts: serializeBlogList(blogs) };
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("INITIAL LATEST FETCH ERROR:", err);
      }
      return { posts: [] };
    }
  },
  ["latestBlogs"],
  {
    tags: ["latestBlogs"],
    revalidate: 60 * 60 * 24,
  },
);

export const getCategory = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      include: { translations: true },
    });

    return categories.map((category: any) => serializeCategory(category));
  },
  ["categories"],
  {
    tags: ["categories"],
    revalidate: 86400,
  },
);

export const getTags = unstable_cache(
  async () => {
    const tags = await prisma.tag.findMany({
      include: { translations: true },
    });

    return tags.map((tag: any) => serializeTag(tag));
  },
  ["tags"],
  {
    tags: ["tags"],
    revalidate: 86400,
  },
);

export const getPopularBlogs = unstable_cache(
  async () => {
    try {
      const blogs = await prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ viewCount: "desc" }, { createdAt: "desc" }],
        take: 3,
        include: {
          category: { include: { translations: true } },
          translations: true,
          tagLinks: { include: { tag: { include: { translations: true } } } },
        },
      });

      return { posts: serializeBlogList(blogs) };
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("POPULAR BLOGS FETCH ERROR:", err);
      }
      return { posts: [] };
    }
  },
  ["popularBlogs"],
  {
    tags: ["popularBlogs"],
    revalidate: 60 * 60 * 24,
  },
);

export const getCuratedBlog = unstable_cache(
  async () => {
    const blog = await prisma.blogPost.findFirst({
      where: {
        isToggled: true,
        status: "PUBLISHED",
      },
      include: {
        category: { include: { translations: true } },
        translations: true,
        tagLinks: { include: { tag: { include: { translations: true } } } },
      },
    });

    return blog ? serializeBlogList([blog])[0] : null;
  },
  ["curated-blog"],
  { revalidate: 300 },
);

export const getAds = unstable_cache(
  async () => {
    try {
      const threeAds = await prisma.advertisement.findMany({
        where: { isAdRunning: true },
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          AdTitle: true,
          AdDescription: true,
          AdPoster: true,
          AdLink: true,
          AdSponsorName: true,
          AdType: true,
          createdAt: true,
        },
      });
      return threeAds;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("ADS FETCH ERROR:", error);
      }
      return [];
    }
  },
  ["ads"],
  {
    tags: ["ads"],
    revalidate: 60 * 60 * 24,
  },
);
