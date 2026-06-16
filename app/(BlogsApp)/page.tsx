import BlogList from "@/components/blog/BlogList";
import LatestBlogs from "@/components/blog/LatestBlogs";
import PopularBlogs from "@/components/blog/PopulatBlogs";
import NewsLetter from "@/components/blog/NewsLetter";
import BlogHeroImage from "@/public/BlogHero.png";
import {
  getBlogs,
  getCategory,
  getLatestBlogs,
  getPopularBlogs,
  getTags,
} from "@/data/getBlogs";
import CategoryNav from "@/components/blog/CategoryNav";
import SearchFilter from "@/components/blog/SearchFilter";
import Image from "next/image";

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
  console.log(latestBlogs);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFFFFF]">
      <div className="lg:w-full h-[115vh] pb-2 flex relative  flex-col ">
        <div className="w-full h-[calc(100vh-150px)]  relative">
          <div className="w-full h-full relative bg-[linear-gradient(90deg,rgba(248,245,239,0.94)_0%,rgba(248,245,239,0.78)_42%,rgba(248,245,239,0.18)_100%)]">
            {/* <Image
              src={BlogHeroImage}
              alt="Blog Hero"
              width={1200}
              height={600}
              className="w-full h-full object-cover"
            /> */}
            <h1
              className="text-6xl absolute top-80 left-30 transform -translate-y-1/2 font-black leading-[0.92] tracking-tighter 
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
          </div>

          {/* <div className="w-full  absolute inset-0 bg-black/50 bg-opacity-50" /> */}
          <div className="absolute min-h-30 w-full -bottom-30 left-1/2 transform -translate-x-1/2   text-white p-5 flex items-center justify-center gap-5 rounded z-10">
            <LatestBlogs latestBlogs={latestBlogs.posts} />
          </div>
        </div>
        <div className="w-1/2 rounded-lg overflow-hidden left-1/2 transform -translate-x-1/2 h-32  absolute bottom-5 flex items-center justify-center text-white bg-black font-bold">
          <Image
            src="/Ad2.png"
            alt="Ad"
            width={200}
            height={200}
            className=" object-contain w-full h-full"
          />
        </div>
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
