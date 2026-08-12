import { prisma } from "@/libs/prisma";
import { unwrapApiResponse } from "@/libs/api";

const toSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const normalizeLanguage = (value: string | null | undefined) => {
  return value === "ne" ? "ne" : "en";
};

const normalizeContentBlocks = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item: any) => {
      if (!item || typeof item !== "object") return item;
      if (item.content === undefined && item.value !== undefined) {
        return { ...item, content: item.value };
      }
      return item;
    });
  }

  if (typeof value === "string") {
    try {
      return normalizeContentBlocks(JSON.parse(value));
    } catch {
      return value;
    }
  }

  return value ?? [];
};

const parseContentValue = (value: unknown) => normalizeContentBlocks(value);

const getPrimaryTranslation = (post: any, language = "en") => {
  const translations = Array.isArray(post?.translations) ? post.translations : [];
  const currentLanguage = normalizeLanguage(language);
  const translation =
    translations.find((item: any) => item?.language === currentLanguage) || translations[0] || null;

  return {
    title: translation?.title ?? "",
    description: translation?.description ?? "",
    content: normalizeContentBlocks(translation?.content) ?? [],
    language: translation?.language ?? currentLanguage,
  };
};

export const serializeBlogPost = (post: any, language = "en") => {
  const translation = getPrimaryTranslation(post, language);
  const categoryTranslation = Array.isArray(post?.category?.translations)
    ? post.category.translations.find((item: any) => item?.language === normalizeLanguage(language)) || post.category.translations[0]
    : null;
  const categoryName = categoryTranslation?.name ?? post?.category?.name ?? post?.category?.slug ?? "";
  const tags = (post?.tagLinks ?? []).map((link: any) => {
    const tag = link?.tag ?? link;
    const tagTranslation = Array.isArray(tag?.translations)
      ? tag.translations.find((item: any) => item?.language === normalizeLanguage(language)) || tag.translations[0]
      : null;

    return {
      ...(tag ?? {}),
      id: tag?.id ?? link?.id,
      name: tagTranslation?.name ?? tag?.name ?? tag?.slug ?? "",
      slug: tag?.slug ?? null,
    };
  });

  return {
    ...post,
    title: translation.title,
    description: translation.description,
    content: translation.content,
    translations: post?.translations ?? [],
    categoryID: post?.categoryID ?? post?.category?.id ?? null,
    category: post?.category
      ? {
          ...post.category,
          name: categoryName,
          description: categoryTranslation?.description ?? post?.category?.description ?? null,
        }
      : null,
    tags,
  };
};

export const serializeBlogList = (posts: any[], language = "en") => {
  return posts.map((post) => serializeBlogPost(post, language));
};

export const extractTranslationsFromFormData = (formData: FormData) => {
  const translationsRaw = formData.get("translations") as string | null;

  if (translationsRaw) {
    try {
      const parsed = JSON.parse(translationsRaw);
      if (Array.isArray(parsed)) {
        return parsed.map((item: any) => ({
          ...item,
          title: item?.title ?? "",
          description: item?.description ?? "",
          content: parseContentValue(item?.content),
        }));
      }
    } catch {
      
    }
  }

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const description = (formData.get("description") as string | null) ?? "";
  const content = parseContentValue(formData.get("content"));

  return [
    {
      language: "en",
      title,
      description,
      content,
    },
  ];
};

export const extractTagsFromFormData = (formData: FormData) => {
  const tagsRaw = formData.get("tags") as string | null;

  if (!tagsRaw) return [];

  try {
    const parsed = JSON.parse(tagsRaw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((tag: any) => (typeof tag === "string" ? tag : tag?.id))
      .filter(Boolean);
  } catch {
    return [];
  }
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
    ...(category && { categoryID: category }),
    ...(tags.length > 0 && {
      tagLinks: {
        some: {
          tag: {
            translations: {
              some: {
                name: { in: tags },
              },
            },
          },
        },
      },
    }),
    ...(searchQuery && {
      translations: {
        some: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" as const } },
            { description: { contains: searchQuery, mode: "insensitive" as const } },
          ],
        },
      },
    }),
  };

  const [posts, totalCount] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      include: {
        category: { include: { translations: true } },
        translations: true,
        tagLinks: { include: { tag: { include: { translations: true } } } },
      },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return { posts: serializeBlogList(posts), totalCount };
};

export const getLatestBlogs = async (limit = 5) => {
  const blogs = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      translations: true,
      tagLinks: { include: { tag: true } },
    },
  });

  return serializeBlogList(blogs);
};

export const createBlog = async (data: any) => {
  const translations = data.translations ?? [
    {
      language: "en",
      title: data.title,
      description: data.description,
      content: data.content,
    },
  ];

  return prisma.blogPost.create({
    data: {
      slug: data.slug,
      status: data.status ?? "PUBLISHED",
      coverImage: data.coverImage,
      author: { connect: { id: data.authorID } },
      category: { connect: { id: data.categoryId } },
      isToggled: Boolean(data.isToggled),
      translations: {
        create: translations.map((translation: any) => ({
          language: translation.language ?? "en",
          title: translation.title ?? "",
          description: translation.description ?? "",
          content: translation.content ?? [],
        })),
      },
      tagLinks: {
        create: (data.tags ?? []).map((tagId: string) => ({
          tag: { connect: { id: tagId } },
        })),
      },
    },
    include: {
      category: true,
      translations: true,
      tagLinks: { include: { tag: true } },
    },
  });
};

export const updateBlog = async (id: string, data: any) => {
  const translations = data.translations ?? [
    {
      language: "en",
      title: data.title,
      description: data.description,
      content: data.content,
    },
  ];

  return prisma.blogPost.update({
    where: { id },
    data: {
      coverImage: data.coverImage,
      slug: data.slug,
      status: data.status,
      category: { connect: { id: data.categoryId } },
      translations: {
        deleteMany: {},
        create: translations.map((translation: any) => ({
          language: translation.language ?? "en",
          title: translation.title ?? "",
          description: translation.description ?? "",
          content: translation.content ?? [],
        })),
      },
      tagLinks: {
        deleteMany: {},
        create: (data.tags ?? []).map((tagId: string) => ({
          tag: { connect: { id: tagId } },
        })),
      },
    },
    include: {
      category: true,
      translations: true,
      tagLinks: { include: { tag: true } },
    },
  });
};

export const deleteBlog = async (id: string) => {
  return prisma.blogPost.delete({ where: { id } });
};

export const createCategory = async (name: string, nameNp?: string) => {
  const slug = toSlug(name);
  return prisma.category.create({
    data: {
      slug,
      translations: {
        create: [
          {
            language: "en",
            name,
            // nameNp: nameNp?.trim() || null,
          },
          {
            language: "ne",
            name: nameNp?.trim() || name,
            // nameNp: description?.trim() || null,
          }
        ],
      },
    },
    include: { translations: true },
  });
};

export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
    include: { translations: true },
  });

  return categories.map((category: any) => {
    const translation = category.translations?.[0] || null;
    return {
      ...category,
      name: translation?.name ?? "",
      description: translation?.description ?? null,
    };
  });
};

export const updateCategory = async (
  id: string,
  name: string,
  nameNp?: string,
  description?: string,
) => {
  const englishName = name.trim();
  const nepaliName = nameNp?.trim() || englishName;
  const englishDescription = description?.trim() || null;

  return prisma.category.update({
    where: { id },
    data: {
      translations: {
        upsert: [
          {
            where: { categoryId_language: { categoryId: id, language: "en" } },
            create: {
              language: "en",
              name: englishName,
              description: englishDescription,
            },
            update: {
              name: englishName,
              description: englishDescription,
            },
          },
          {
            where: { categoryId_language: { categoryId: id, language: "ne" } },
            create: {
              language: "ne",
              name: nepaliName,
              description: englishDescription,
            },
            update: {
              name: nepaliName,
              description: englishDescription,
            },
          },
        ],
      },
    },
    include: { translations: true },
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.delete({ where: { id } });
};

export const createTag = async (newTag: { name: string; nameNp?: string }) => {
  const slug = toSlug(newTag.name);
  return prisma.tag.create({
    data: {
      slug,
      translations: {
        create: [
          {
            language: "en",
            name: newTag.name,
          },
          {
            language: "ne",
            name: newTag.nameNp?.trim() || newTag.name,
          }
        ],
      },
    },
    include: { translations: true },
  });
};

export const getAllTags = async () => {
  const tags = await prisma.tag.findMany({
    orderBy: { createdAt: "desc" },
    include: { translations: true },
  });

  return tags.map((tag: any) => ({
    ...tag,
    name: tag.translations?.[0]?.name ?? "",
  }));
};

export const updateTag = async (id: string, name: string, nameNp?: string) => {
  const englishName = name.trim();
  const nepaliName = nameNp?.trim() || englishName;

  return prisma.tag.update({
    where: { id },
    data: {
      translations: {
        upsert: [
          {
            where: { tagId_language: { tagId: id, language: "en" } },
            create: {
              language: "en",
              name: englishName,
            },
            update: {
              name: englishName,
            },
          },
          {
            where: { tagId_language: { tagId: id, language: "ne" } },
            create: {
              language: "ne",
              name: nepaliName,
            },
            update: {
              name: nepaliName,
            },
          },
        ],
      },
    },
    include: { translations: true },
  });
};

export const deleteTag = async (id: string) => {
  return prisma.tag.delete({ where: { id } });
};
