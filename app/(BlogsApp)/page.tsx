import BlogList from "@/components/blog/BlogList";
import LatestBlogs from "@/components/blog/LatestBlogs";
import PopularBlogs from "@/components/blog/PopulatBlogs";
import NewsLetter from "@/components/blog/NewsLetter";
import BlogHeroImage from "@/public/BlogHero.png";
import {
  getAds,
  getBlogs,
  getCategory,
  getLatestBlogs,
  getPopularBlogs,
  getTags,
} from "@/data/getBlogs";
import CategoryNav from "@/components/blog/CategoryNav";
import SearchFilter from "@/components/blog/SearchFilter";
import Image from "next/image";
import CuratedBlog from "@/components/blog/CuratedBlog";
import Link from "next/link";
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

  const [blogs, latestBlogs, popularBlogs, categories, tags, ads] =
    await Promise.all([
      getBlogs({ page, category, tag, sort, search }),
      getLatestBlogs(),
      getPopularBlogs(),
      getCategory(),
      getTags(),
      getAds(),
    ]);
  const AsideAds = ads.find((ad) => ad.AdType === "ASIDE");
  console.log(AsideAds);
  const BannerAds = ads.find((ad) => ad.AdType === "BANNER");
  console.log(BannerAds);
  const curatedBlog = blogs.posts.find((blog) => blog.isToggled);
  console.log(latestBlogs);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF]">
      <div className="lg:w-full min-h-[100vh] pb-2 flex relative  flex-col ">
        <div className="w-full h-[calc(100vh-150px)]  relative">
          <div className="w-full inset-0 ">
            {/* <Image
              src={BlogHeroImage}
              alt="Blog Hero"
              width={1200}
              height={600}
              className="w-full h-full object-cover"
            /> */}
            <h1
              className="text-6xl absolute top-80 left-20  transform -translate-y-1/2 font-black leading-[0.92] tracking-tighter 
                z-50 
                sm:text-8xl lg:text-[7rem]
            "
            >
              REAL- <br />{" "}
              <span className="text-outline-yellow clamp">ESTATE</span> <br />{" "}
              MADE <br />{" "}
              <span className="text-outline-silver clamp">CLEAR.</span>
            </h1>
            {/* <p className="absolute text-3xl z-50   top-1/2 text-justify pl-320 -translate-y-2/3 right-10 text-white font-serif ">
              Smart insights, practical guides, and market  knowledge to help you navigate real estate  with confidence.

            </p> */}
            <div className="absolute top-[55%] text-black/40 rotate-y-180 -rotate-z-25 left-10 w-100 h-100 z-20 ">
              <svg viewBox="0 0 600 400" className="w-full h-full" fill="none">
                <path
                  d="M520 90
       C470 150 420 170 360 160
       C300 150 280 80 340 50
       C400 20 430 110 380 210
       C330 310 220 350 100 300"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M100 300 L130 295 M100 300 L115 330"
                  stroke="currentColor"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <CuratedBlog curatedBlog={curatedBlog} />
            {AsideAds && <AsideAd AsideAds={AsideAds} />}
          </div>

          <div className="w-full  absolute inset-0  h-full bg-[linear-gradient(90deg,rgba(248,246,240,1)_0%,rgba(245,242,236,0.95)_35%,rgba(235,231,225,0.85)_65%,rgba(216,213,208,0.7)_85%,rgba(192,191,186,0.9)_100%)]" />
          <div className="absolute min-h-30 w-full -bottom-35 left-1/2 transform -translate-x-1/2   text-white p-5 flex items-center justify-center gap-5 rounded z-10">
            <LatestBlogs latestBlogs={latestBlogs.posts} />
          </div>
        </div>
        {
          BannerAds && ( 
        <div className="w-full h-70 relative bottom-0 left-1/2 transform -translate-x-1/2 ">
           <BannerAd BannerAds={BannerAds} />
          </div>
           )
         }
      </div>

      <div className="lg:mb-10 relative lg:top-10 pb-10 p-10 w-full m-auto flex">
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

        <div className="w-1/3 sticky top-18.75  h-fit flex flex-col gap-8  p-5">
          <PopularBlogs popularBlogs={popularBlogs?.posts ?? []} />
          <NewsLetter />
        </div>
      </div>
    </div>
  );
}
