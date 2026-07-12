import BlogDetailClient from "@/components/blog/BlogDetailClient";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import BackButton from "@/components/blog/BackButton";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";
import { getLatestBlogs, serializeBlogPost } from "@/services/blogs.services";
import { unwrapApiResponse } from "@/libs/api";

interface Props {
  params: Promise<{ slug: string }>;
}

import { unstable_cache } from "next/cache";
import { Metadata } from "next";




export const getBlog = unstable_cache(
   async (slug: string) => {
      const blog = await prisma.blogPost.findUnique({
        where: { slug },
        include: {
          category: { include: { translations: true } },
          translations: true,
          tagLinks: { include: { tag: { include: { translations: true } } } },
        },
      });

      return blog ? serializeBlogPost(blog) : null;
    },
  ["blog"],
  { tags: ["blog"], revalidate: 86400 },
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlog(slug);

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`;
const image =
  blog?.coverImage?.startsWith("http")
    ? blog.coverImage
    : `${process.env.NEXT_PUBLIC_BASE_URL}${blog?.coverImage}`;
  return {
    title: blog?.title,
    description: blog?.description,
    
    openGraph: {
      title: blog?.title,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blog?.title,
        },
      ],
    },
    // linkedin: {
    //   title: blog?.title,
    //   description: blog?.description,
    //   url,
    //   images: [
    //     {
    //       url: image,
    //       width: 1200,
    //       height: 630,
    //       alt: blog?.title,
    //     },
    //   ],
    // },

    twitter: {
      card: "summary_large_image",
      title: blog?.title,
      description: blog?.description,
       images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: blog?.title,
        },
      ],
    },
  };
}

export const getRelatedBlogs = (
  categoryId: string,
  excludeSlug: string,
  tagIds: string[] = [],
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
              tagLinks: {
                some: {
                  tag: {
                    id: {
                      in: tagIds,
                    },
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
           category: { include: { translations: true } },
          translations: true,
          tagLinks: { include: { tag: true } },
        },
      });
    },
    [`related-${excludeSlug}`],
    {
      tags: [`related-${excludeSlug}`],
      revalidate: 86400,
    },
  )();



export default async function BlogDets({ params }: Props) {
  const { slug } = await params;
  const blog = unwrapApiResponse<any>(await getBlog(slug));
  if (!blog) {
    notFound();
  }
  
  const resolvedBlog = blog as any;
  const relatedBlogs = (await getRelatedBlogs(
    resolvedBlog.categoryID ?? resolvedBlog.category?.id ?? "",
    slug,
    Array.isArray(resolvedBlog.tags) ? resolvedBlog.tags.map((t: any) => t.id) : [],
  )).map((item: any) => serializeBlogPost(item));

  const comments = await prisma.blogComment.findMany({
    where: { blogPostId: resolvedBlog.id },
    orderBy: { createdAt: "desc" },
    take: 25,
    select: {
      id: true,
      userEmail: true,
      userName: true,
      userImage: true,
      commentText: true,
      createdAt: true,
    },
  });

  return (
<div className="rounded-2xl border border-[#eadcb4] bg-[linear-gradient(180deg,#ffffff_0%,#fbf8ef_100%)] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.06)] sm:p-5 lg:p-6">
      <BackButton slug={slug} />
      <div className="w-full relative flex flex-col lg:flex-row justify-between px-0 sm:px-2 lg:px-2 py-3 sm:py-5 gap-4 sm:gap-6 lg:gap-8">
        <BlogDetailClient blog={resolvedBlog} comments={comments} />
        <RelatedBlogs blog={resolvedBlog} slug={slug} relatedBlogs={relatedBlogs ? relatedBlogs : []} />
      </div>
    </div>
  );
}
