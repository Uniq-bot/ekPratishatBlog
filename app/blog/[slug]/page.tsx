import BlogDetailClient from "@/components/blog/BlogDetailClient";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";
import BackButton from "@/components/blog/BackButton";

// Fetch directly from DB on the server — no API round-trip, works on any host
async function getBlog(slug: string) {
  const blog = await prisma.blogPost.findFirst({
    where: { slug },
    include: { category: true, tags: true },
  });
  return blog;
}

export default async function BlogDets({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F3EA] lg:p-10 py-5 flex flex-col items-start">
      <BackButton slug={slug} />
      <div className="w-full flex flex-col md:flex-row justify-between px-4 md:px-20 py-6 gap-8">
        <BlogDetailClient blog={blog} />
        <RelatedBlogs relatedBlogs={[]} />
      </div>
    </div>
  );
}