import BlogClient from "@/components/blog/BlogClient";

import { getBlogDetails } from "@/data/getBlogDet";
import { getBlogs, getCategory, getLatestBlogs, getTags } from "@/data/getBlogs";

export default async function BlogPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category;
  const tag = searchParams.tag;
  const sort = searchParams.sort;

  const blogs = await getBlogs({
    page,
    category,
    tag,
  });

  const latestBlogs = await getLatestBlogs();
  const categories = await getCategory();
  const tags = await getTags();

  return (
    <BlogClient
      blogs={blogs}
      latestBlogs={latestBlogs}
      categories={categories}
      tags={tags}
      page={page}
      category={category}
      tag={tag}
      search={search}
      sort={sort}
    />
  );
}