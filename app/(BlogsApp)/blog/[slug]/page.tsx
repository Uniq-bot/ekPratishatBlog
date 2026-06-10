import BlogDetailClient from "@/components/blog/BlogDetailClient";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import BackButton from "@/components/blog/BackButton";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  return prisma.blogPost.findFirst({
    where: { slug },
    include: { category: true, tags: true },
  });
}

async function getRelatedBlogs(categoryId: string, excludeSlug: string) {
  return prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      categoryID: categoryId,
      NOT: { slug: excludeSlug },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { category: true, tags: true },
  });
}

export default async function BlogDets({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  console.log(blog)
  if (!blog) {
    notFound();
  }

  const relatedBlogs = blog.categoryID
    ? await getRelatedBlogs(blog.categoryID, slug)
    : [];

  return (
    <div className="w-full min-h-screen text-white p-3 sm:p-6 lg:p-10 py-4 sm:py-5 lg:py-10 flex flex-col items-start">
      <BackButton slug={slug} />
      <div className="w-full flex flex-col lg:flex-row justify-between px-0 sm:px-4 lg:px-6 py-4 sm:py-6 gap-4 sm:gap-6 lg:gap-8">
        <BlogDetailClient blog={blog} />
        {/* <RelatedBlogs relatedBlogs={relatedBlogs} /> */}
      </div>
    </div>
  );
}