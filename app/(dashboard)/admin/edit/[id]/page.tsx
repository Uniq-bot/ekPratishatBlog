import Editor from "@/components/admin/editPage/Editor";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";
import { serializeBlogPost } from "@/services/blogs.services";

interface Props {
  params: Promise<{ id: string }>;
}

async function getBlogForEdit(id: string) {
  const blog = await prisma.blogPost.findUnique({
    where: { id },
    include: {
      category: true,
      translations: true,
      tagLinks: { include: { tag: true } },
    },
  });

  return blog ? serializeBlogPost(blog) : null;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const blog = await getBlogForEdit(id);

  if (!blog) notFound();

  return <Editor id={id} initialBlog={blog} />;
}