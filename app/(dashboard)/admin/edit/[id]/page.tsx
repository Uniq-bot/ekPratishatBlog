import Editor from "@/components/admin/editPage/Editor";
import { prisma } from "@/libs/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

async function getBlogForEdit(id: string) {
  return prisma.blogPost.findUnique({
    where: { id },
    include: { category: true, tags: true },
  });
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const blog = await getBlogForEdit(id);

  if (!blog) notFound();

  return <Editor id={id} initialBlog={blog} />;
}