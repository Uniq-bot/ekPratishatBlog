import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogById } from "@/services/blogs.services";
import BlogDetailClient from "@/components/blog/BlogDetailClient";

const BlogDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-xs font-semibold text-neutral-700 hover:text-black">
          ← Back to all stories
        </Link>

        <BlogDetailClient
          title={blog.title}
          content={blog.content}
          createdAt={blog.createdAt.toISOString()}
          category={blog.category ? { name: blog.category.name } : null}
          tags={blog.tags.map((tag) => ({ id: tag.id, name: tag.name }))}
        />
      </div>
    </div>
  );
};

export default BlogDetail;