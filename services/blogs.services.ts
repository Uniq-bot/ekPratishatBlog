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
  const where: any = {
    status: "PUBLISHED",
    ...(category && { categoryID: category }),
    ...(tags.length > 0 && {
      tags: {
        some: {
          name: { in: tags },
        },
      },
    }),
    ...(searchQuery && {
      OR: [
        { title: { contains: searchQuery, mode: "insensitive" as const } },
        { description: { contains: searchQuery, mode: "insensitive" as const } },
      ],
    }),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: { tags: true, category: true },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts, totalCount };
};

export const getLatestBlogs = async (limit = 5) => {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: { category: true, tags: true },
  });
};

export const createBlog = async (data: any) => {
  return prisma.blogPost.create({
    data: {
      title: data.title,
      content: data.content,
      coverImage: data.coverImage,
      description: data.description,
      status: "PUBLISHED",
      slug: data.slug,
      category: { connect: { id: data.categoryId } },
      author: { connect: { id: data.authorID } },
      tags: {
        connectOrCreate: (data.tags ?? []).map((t: any) => ({
          where: { name: typeof t === "string" ? t : t.name },
          create: {
            name: typeof t === "string" ? t : t.name,
            slug: toSlug(typeof t === "string" ? t : t.name),
          },
        })),
      },
    },
  });
};

export const updateBlog = async (id: string, data: any) => {
  return prisma.blogPost.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      description: data.description,
      coverImage: data.coverImage,
      slug: data.slug,
      category: { connect: { id: data.categoryId } },
      tags: {
        set: [],
        connectOrCreate: (data.tags ?? []).map((t: any) => ({
          where: { name: typeof t === "string" ? t : t.name },
          create: {
            name: typeof t === "string" ? t : t.name,
            slug: toSlug(typeof t === "string" ? t : t.name),
          },
        })),
      },
    },
    include: { category: true, tags: true },
  });
};

export const deleteBlog = async (id: string) => {
  return prisma.blogPost.delete({ where: { id } });
};

export const createCategory = async (name: string, description?: string) => {
  const slug = toSlug(name);
  return prisma.category.create({
    data: { name, slug, description: description?.trim() || null },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { createdAt: "desc" } });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({ where: { id } });
};

export const createTag = async (name: string) => {
  const slug = toSlug(name);
  return prisma.tag.create({ data: { name, slug } });
};

export const getAllTags = async () => {
  return prisma.tag.findMany({ orderBy: { createdAt: "desc" } });
};

export const deleteTag = async (id: string) => {
  return prisma.tag.delete({ where: { id } });
};
