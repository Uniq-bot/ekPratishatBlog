import BlogDetailClient from "@/components/blog/BlogDetailClient";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";
import BackButton from "@/components/blog/BackButton";
import { getBlogDetails } from "@/data/getBlogDet";



export default async function BlogDets({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogDetails(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F3EA] p-3 sm:p-6 lg:p-10 py-4 sm:py-5 lg:py-10 flex flex-col items-start">
      <BackButton slug={slug} />
      <div className="w-full flex flex-col lg:flex-row justify-between px-0 sm:px-4 lg:px-6 py-4 sm:py-6 gap-4 sm:gap-6 lg:gap-8">
        <BlogDetailClient blog={blog} />
        <RelatedBlogs relatedBlogs={[]} />
      </div>
    </div>
  );
}