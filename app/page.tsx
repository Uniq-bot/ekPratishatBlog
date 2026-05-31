import BlogListClient from "@/components/blog/BlogListClient";
import { BlogListProvider } from "@/context/BlogListContext";
import { getAllBlogs } from "@/services/blogs.services";
import type { Category, Tag } from "@/types/blog";

const Blogs = async () => {
  const blogs = await getAllBlogs();

  const serializedBlogs = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    content: blog.content,
    createdAt: blog.createdAt.toISOString(),
    category: blog.category
      ? { id: blog.category.id, name: blog.category.name }
      : null,
    tags: blog.tags.map((tag) => ({ id: tag.id, name: tag.name })),
  }));

  const categories: Category[] = [
    ...new Map(
      serializedBlogs
        .filter((blog) => blog.category)
        .map((blog) => [blog.category!.id, blog.category!])
    ).values(),
  ];

  const tags: Tag[] = [
    ...new Map(serializedBlogs.flatMap((blog) => blog.tags).map((tag) => [tag.id, tag])).values(),
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-neutral-200 pb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Ekpratishat</p>
          <h1 className="mt-4 text-4xl font-semibold text-neutral-900">Latest Stories</h1>
          <p className="mt-2 text-sm text-neutral-600 max-w-xl">
            Insights, updates, and field notes from the Ekpratishat team.
          </p>
        </header>

        <BlogListProvider blogs={serializedBlogs} categories={categories} tags={tags}>
          <BlogListClient />
        </BlogListProvider>
      </div>
    </div>
  );
};

export default Blogs;
