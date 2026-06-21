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
import { prisma } from "@/libs/prisma";
// import { X } from "lucide-react";

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
  const curatedBlog = await prisma.blogPost.findFirst({
    where: {
      isToggled: true,
    },
  });
  console.log(latestBlogs);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF]">
      <div className="w-full min-h-[70vh] min-[768px]:min-h-[85vh] min-[1024px]:min-h-[110vh] min-[1250px]:min-h-[125vh] relative  ">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(248,246,240,1)_0%,rgba(245,242,236,0.95)_35%,rgba(235,231,225,0.85)_65%,rgba(216,213,208,0.7)_85%,rgba(192,191,186,0.9)_100%)]" />

        <div className="  absolute w-full text-center  top-25 min-[1000px]:top-40 z-10 flex justify-center min-[1440px]:top-30 items-center leading-none min-[370px]:gap-4 ">
          <h1 className="text-[2rem] min-[600px]:text-[4rem] min-[900px]:text-[5rem] min-[1440px]:text-[6rem]  font-black">
            REAL-ESTATE
          </h1>
          <span className="flex flex-col text-[2rem] min-[1440px]:text-[3rem] leading-none font-black" >
            <h2 className="text-outline-yellow">
              MADE
            </h2>
            <h2 className="text-outline-silver">
              CLEAR
            </h2>
          </span>
        </div>
        <div className="w-full min-[320px]:h-40  z-20 min-[750px]:h-70 px-5 absolute top-1/2 mt-10 md:mt-0 transform -translate-y-1/2 min-[320px]:top-40 min-[320px]:translate-y-0 min-[760px]:top-55 min-[1000px]:top-70 min-[768px]:py-2 min-[1280px]:h-120  min-[1024px]:w-5/6  min-[1024px]:left-1/2 min-[1024px]:-translate-x-1/2 left-0 min-[1440px]:top-70 flex gap-10">
          <div className="min-[768px]:w-[65%]  h-full min-[320px]:w-full ">
            <CuratedBlog curatedBlog={curatedBlog} />
          </div>

          {AsideAds && <AsideAd AsideAds={AsideAds} />}
        </div>
        <div className="w-full min-h-60 absolute flex gap-10  top-90 px-5 items-center justify-center min-[750px]:top-125 min-[750px]:left-1/2 transform min-[750px]:-translate-x-1/2 min-[1000px]:top-145 min-[1280px]:top-195 min-[1440px]:top-200   ">
     
            {latestBlogs?.posts.length > 0 && (
              <LatestBlogs latestBlogs={latestBlogs?.posts ?? []} />
            )}
        </div>
      </div>

      <div className="lg:mb-10 relative lg:top-10 pb-10 p-3  w-full m-auto flex flex-col">
        {
          BannerAds && (
            <div className="w-full  h-40 mb-10">
              <BannerAd BannerAds={BannerAds} />
            </div>
          )
        }
       <div className="w-full flex flex-col lg:flex-row gap-5 min-[768px]:gap-10">
         <div className="lg:w-[70%] w-full mb-30  flex flex-col gap-5">
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

        <div className="w-1/3 hidden sticky top-18.75  h-fit lg:flex flex-col gap-8  p-5">
          <PopularBlogs popularBlogs={popularBlogs?.posts ?? []} />
          <NewsLetter />
        </div>
       </div>
      </div>
    </div>
  );
}
