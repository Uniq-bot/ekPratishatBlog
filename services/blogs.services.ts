import { prisma } from "@/libs/prisma";

const toSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const getBlogByFilters = async ({
  offset,
  limit,
  category,
  tags,
  searchQuery,
}: {
  offset: number;
  limit: number;
  category?: string;
  tags: string[];
  searchQuery?: string;
}) => {
  const where = {
    ...(category && { categoryID: category }),
    ...(tags.length > 0 && {
      tags: {
        some: {
          name: {
            in: tags,
          },
        },
      },
    }),
    ...(searchQuery && {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" as const } },
        { content: { contains: searchQuery, mode: "insensitive" as const } },
      ],
    }),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        tags: true,
        category: true,
      },
      skip: offset,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, totalCount };
};

export const getLatestBlogs = async (limit = 5) => {
  return prisma.blogPost.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      tags: true,
    },
  });
};
export const createBlog = async ({ title, content, coverPage, published, authorID, categoryID, tags, slug }: { title: string; content: string; coverPage?: string; published: boolean; authorID: string; categoryID: string; tags?: string[]; slug: string }) => {
 const post=prisma.blogPost.create({
       data: {
         title,
         content,
         coverPage,
         published,
         authorID,
         categoryID,
         slug,
         tags: {
           connect: tags?.map((tag: string) => ({ name: tag })),
         },
       },
     });
    return post;
};

export const createCategory = async (name: string, description?: string) => {
  const slug = toSlug(name);
  const category = await prisma.category.create({
    data: {
      name,
      slug,
      description: description?.trim() || null,
    },
  });
  return category;
};

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return categories;
};

export const createTag = async (name: string) => {
  const slug = toSlug(name);
  const tag = await prisma.tag.create({
    data: {
      name,
      slug,
    },
  });
  return tag;
};

export const getAllTags = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  return tags;
};

