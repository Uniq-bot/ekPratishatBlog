import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import LatestBlogs from "@/components/blog/LatestBlogs";
import PopularBlogs from "@/components/blog/PopulatBlogs";
import NewsLetter from "@/components/blog/NewsLetter";
import {
  getBlogs,
  getCategory,
  getLatestBlogs,
  getPopularBlogs,
  getTags,
} from "@/data/getBlogs";
import CategoryNav from "@/components/blog/CategoryNav";
import SearchFilter from "@/components/blog/SearchFilter";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Math.max(1, Number(params.page) || 1);
  const category = params.category;
  const tag = params.tag;
  const sort = (params.sort as "latest" | "oldest") ?? "latest";
  const search = params.search;

  const [blogs, latestBlogs, popularBlogs, categories, tags] =
    await Promise.all([
      getBlogs({ page, category, tag, sort, search }),
      getLatestBlogs(),
      getPopularBlogs(),
      getCategory(),
      getTags(),
    ]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF] md:p-10">
      <div className="lg:w-full min-h-100 flex gap-5">
        <BlogHero />
        <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} />
      </div>

      <div className="lg:mb-10 relative lg:top-10 pb-10 w-full m-auto flex">
        <div className="w-[70%] mb-30  flex flex-col gap-5">
          <SearchFilter category={category} tag={tag} search={search} />
          <CategoryNav categories={categories} />
          <BlogList
            blogs={blogs.posts}
            page={page}
            totalCount={blogs.totalCount}
            limit={10}
            category={category}
            tag={tag}
            sort={sort}
            search={search}
          />
        </div>

        <div className="w-1/3 sticky top-0  h-fit flex flex-col gap-8  p-5">
          <PopularBlogs popularBlogs={popularBlogs?.posts ?? []} />
          <NewsLetter />
        </div>
      </div>
    </div>
  );
}
