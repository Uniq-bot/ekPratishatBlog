import BlogList from "@/components/blog/BlogList";
import LatestBlogs from "@/components/blog/LatestBlogs";
import PopularBlogs from "@/components/blog/PopulatBlogs";
import NewsLetter from "@/components/blog/NewsLetter";
import {
  getAds,
  getBlogs,
  getCategory,
  getCuratedBlog,
  getLatestBlogs,
  getPopularBlogs,
  getTags,
} from "@/data/getBlogs";
import CategoryNav from "@/components/blog/CategoryNav";
import SearchFilter from "@/components/blog/SearchFilter";
import CuratedBlog from "@/components/blog/CuratedBlog";
import AsideAd from "@/components/blog/AsideAd";
import BannerAd from "@/components/blog/BannerAds";
import BlogClientPage from "@/components/blog/BlogClientPage";

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

  const [blogs, latestBlogs, popularBlogs, categories, tags, ads, curatedBlog] =
    await Promise.all([
      getBlogs({ page, category, tag, sort, search }),
      getLatestBlogs(),
      getPopularBlogs(),
      getCategory(),
      getTags(),
      getAds(),
      getCuratedBlog(),
    ]);
  const AsideAds = ads.find((ad) => ad.AdType === "ASIDE");
  const BannerAds = ads.find((ad) => ad.AdType === "BANNER");
  return (
    <BlogClientPage 
      curatedBlog={curatedBlog}
      latestBlogs={latestBlogs}
      popularBlogs={popularBlogs}
      BannerAds={BannerAds}
      AsideAds={AsideAds}
      categories={categories}
      tags={tags}
      blogs={blogs}
      ads={ads}
      page={page}
      category={category}
      tag={tag}
      sort={sort}
      search={search}
    />
  );
}