import { prisma } from "@/libs/prisma";

const toSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

export const getAllBlogs = async () => {
  const blogs = await prisma.blogPost.findMany({
    include: {
      category: true,
      tags: true,
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return blogs;
};

export const getBlogById = async (id: string) => {
  const blog = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      category: true,
      tags: true,
      author: true,
    },
  });
  return blog;
};

export const createBlog = async (
  title: string,
  content: string,
  categoryId: string,
  authorId: string,
  tagIds?: string[]
) => {
  const baseSlug = toSlug(title);
  const slug = baseSlug ? `${baseSlug}-${Date.now()}` : `post-${Date.now()}`;

  const blog = await prisma.blogPost.create({
    data: {
      title,
      content,
      slug,
      categoryID: categoryId,
      authorID: authorId,
      ...(tagIds && tagIds.length > 0 && {
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      }),
    },
    include: {
      category: true,
      tags: true,
      author: true,
    },
  });
  return blog;
};

export const updateBlog = async (
  id: string,
  title: string,
  content: string,
  categoryId: string,
  tagIds?: string[]
) => {
  const baseSlug = toSlug(title);
  const slug = baseSlug ? `${baseSlug}-${Date.now()}` : `post-${Date.now()}`;

  const data: {
    title: string;
    content: string;
    slug: string;
    categoryID: string;
    tags?: { set: { id: string }[] };
  } = {
    title,
    content,
    slug,
    categoryID: categoryId,
  };

  if (tagIds) {
    data.tags = {
      set: tagIds.map((tagId) => ({ id: tagId })),
    };
  }

  const blog = await prisma.blogPost.update({
    where: { id },
    data,
    include: {
      category: true,
      tags: true,
      author: true,
    },
  });

  return blog;
};

export const deleteBlog = async (id: string) => {
  return prisma.$transaction(async (tx) => {
    await tx.blogPost.update({
      where: { id },
      data: {
        tags: {
          set: [],
        },
      },
    });

    return tx.blogPost.delete({
      where: { id },
    });
  });
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
