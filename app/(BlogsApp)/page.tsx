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
    console.log("latest", latestBlogs)
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF]">
      {/* HERO */}
      <div className="relative w-full overflow-hidden   pt-24 pb-12  sm:pt-28 md:px-16 lg:px-10 lg:pt-30">
        {/* <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,246,240,1)_0%,rgba(245,242,236,0.95)_35%,rgba(235,231,225,0.85)_65%,rgba(216,213,208,0.7)_85%,rgba(192,191,186,0.9)_100%)]" /> */}

        <div className="relative z-10 w-full px-4  lg:w-[85%] m-auto flex  flex-col gap-6 lg:gap-8">
          <div className="text-center">
            <p className="mx-auto rounded-2xl mb-3 inline-flex -full border border-[#eadcb4] bg-[#fffaf0] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b12]">
              Blog / Guides
            </p>
            <div className="relative w-full text-center flex flex-wrap justify-center items-center leading-none gap-2 sm:gap-4">
              <h1 className="text-[1.75rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] font-black">
                REAL-ESTATE
              </h1>
              <span className="flex flex-col text-[1.75rem] sm:text-[2rem] lg:text-[3rem] leading-none font-black">
                <h2 className="text-outline-yellow">MADE</h2>
                <h2 className="text-outline-silver">CLEAR</h2>
              </span>
            </div>
            {/* <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-black/65 sm:text-base lg:text-lg">
              Practical guidance, featured stories, and the latest updates for buyers, sellers, and investors.
            </p> */}
          </div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-[1.35fr_0.8fr] lg:items-stretch">
            <div className="overflow-hidden  border border-[#eadcb4] bg-white shadow-sm">
              <CuratedBlog curatedBlog={curatedBlog} />
            </div>
            <div className=" border border-[#eadcb4] bg-white/95 shadow-sm">
              <PopularBlogs popularBlogs={popularBlogs?.posts ?? []} />
            </div>
          </div>

          {latestBlogs?.posts.length > 0 && (
            <div className="-3xl border border-[#eadcb4] bg-white/95 p-4  sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#f0e3bd] pb-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
                    Latest Blogs
                  </p>
                  <h2 className="text-xl font-bold text-black">Fresh reads</h2>
                </div>
                <span className="text-sm hidden lg:flex  font-semibold text-black/60">
                  {latestBlogs.posts.length} posts
                </span>
                <span className="text-sm lg:hidden  font-semibold text-black/60">
                  {latestBlogs.posts.slice(0, 2).length} posts
                </span>
              </div>
              <div className="w-full">
                <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} ads={ads} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="relative  lg:w-[80%] m-auto   px-4 pb-12  sm:px-6  lg:px-0">
          {BannerAds && (
            <div className="relative z-10 mb-8 h-20 w-full overflow-hidden  shadow-xl shadow-black/30  bg-white/90  md:h-40">
              <BannerAd BannerAds={BannerAds} />
            </div>
          )}

          <div className="relative z-10 mb-8 flex flex-col gap-3 -3xl border border-[#eadcb4] bg-white/90 p-5  sm:p-6 lg:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8a6b12]">
              Blog / Guides
            </p>
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-2">
                <h2 className="text-2xl font-black leading-tight text-black sm:text-3xl lg:text-4xl">
                  Practical property guidance for buyers, sellers, and
                  investors.
                </h2>
                <p className="max-w-2xl text-sm leading-6 text-black/65 sm:text-base">
                  Search the latest articles, filter by category, and read the
                  updates that matter most.
                </p>
              </div>
              <div className="-full border border-[#eadcb4] bg-[#fffaf0] px-4 py-2 text-sm font-semibold text-black shadow-sm">
                {blogs.totalCount} articles
              </div>
            </div>
          </div>

          <div className="relative   z-10 gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.6fr)] lg:gap-10 items-start">
            <div className="min-w-0 flex flex-col gap-5">
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

            {/* <div className="min-w-0 w-full lg:sticky lg:top-24 self-start h-fit border border-[#e7d6ab] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,244,234,0.96)_100%)] p-4 sm:p-5 lg:p-3 shadow-[0_20px_60px_rgba(201,152,26,0.08)]">
              <div className="flex flex-col gap-6">
                <PopularBlogs popularBlogs={popularBlogs?.posts ?? []} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}