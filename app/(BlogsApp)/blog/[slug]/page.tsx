import BlogDetailClient from "@/components/blog/BlogDetailClient";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import BackButton from "@/components/blog/BackButton";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

import { cacheTag, unstable_cache } from "next/cache";

export const getBlog = (slug: string) =>
  unstable_cache(
    async () => {
      return prisma.blogPost.findFirst({
        where: { slug },
        include: {
          category: true,
          tags: true,
        },
      });
    },
    [`blog-${slug}`],
    {
      tags: [`blog-${slug}`],
      revalidate: 86400,
    },
  )();
export const getRelatedBlogs = (
  categoryId: string,
  excludeSlug: string,
  tagIds: string[] = []
) =>
  unstable_cache(
    async () => {
      return prisma.blogPost.findMany({
        where: {
          status: "PUBLISHED",
          slug: {
            not: excludeSlug,
          },
          OR: [
            {
              categoryID: categoryId,
            },
            {
              tags: {
                some: {
                  id: {
                    in: tagIds,
                  },
                },
              },
            },
          ],
        },
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          category: true,
          tags: true,
        },
      });
    },
    [`related-${excludeSlug}`],
    {
      tags: [`related-${excludeSlug}`],
      revalidate: 86400,
    }
  )();
export default async function BlogDets({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(
    blog.categoryID,
    slug,
    blog.tags.map((t) => t.id),
  );

  return (
    <div className="w-full min-h-screen bg-[#F4F1EC] text-white p-3 sm:p-6 lg:p-10 py-4 sm:py-5 lg:py-10 flex flex-col items-start">
      <BackButton slug={slug} />
      <div className="w-full flex flex-col lg:flex-row justify-between px-0 sm:px-4 lg:px-6 py-4 sm:py-6 gap-4 sm:gap-6 lg:gap-8">
        <BlogDetailClient blog={blog} />
        <RelatedBlogs relatedBlogs={relatedBlogs ? relatedBlogs : []} />
      </div>
    </div>
  );
}
