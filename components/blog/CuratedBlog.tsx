"use client";
import { useTrackBlogView } from "@/hooks/useTrackViews";
import { BlogItem } from "@/types/blog";
import { ArrowRight } from "lucide-react";
import { normalizeImageUrl } from "@/libs/image-url";

const CuratedBlog = ({
  idx,
  currentLanguage,
  curatedBlog,
}: {
  idx: number;
  currentLanguage: string;
  curatedBlog: BlogItem | any;
}) => {
  if (!curatedBlog) return null;

  const trackView = useTrackBlogView();
  const isEn = currentLanguage === "en";
  const description = curatedBlog?.translations?.[idx]?.description || "";
  const title = curatedBlog?.translations?.[idx]?.title || curatedBlog?.title || "";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackView(curatedBlog);
  };
  // console.log(curatedBlog)

  return (
    <div
      onClick={handleClick}
      className="group relative h-full min-h-80 w-full cursor-pointer overflow-hidden bg-black"
    >
      {/* Cover image */}
      <div className="relative h-80 w-full overflow-hidden bg-neutral-900">
        <img
          src={normalizeImageUrl(curatedBlog?.coverImage)}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Gradient overlay — stronger at bottom for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2.5 p-5 sm:p-7 lg:p-8">
        {/* Badge */}
        <span className={`w-fit rounded-full bg-white/15 px-3 py-1 font-semibold uppercase text-white backdrop-blur-sm ring-1 ring-white/20 ${
          isEn ? "text-[10px] tracking-widest" : "text-sm"
        }`}>
          {isEn ? "Featured Story" : "विशेष कथा"}
        </span>

        {/* Title */}
        <h1 className={`font-black leading-tight text-white drop-shadow-sm ${
          isEn
            ? "text-xl sm:text-3xl lg:text-3xl xl:text-4xl"
            : "text-xl sm:text-2xl lg:text-3xl"
        } line-clamp-2`}>
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className={`line-clamp-2 leading-relaxed text-white/80 ${
            isEn ? "text-sm sm:text-base" : "text-base sm:text-lg"
          }`}>
            {description.length > 200 ? `${description.slice(0, 200)}…` : description}
          </p>
        )}

        {/* CTA */}
        <span className={`mt-1 inline-flex items-center gap-1.5 font-semibold text-[#fee685] ${
          isEn ? "text-sm" : "text-base"
        }`}>
          {isEn ? "Read More" : "थप पढ्नुहोस्"}
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
};

export default CuratedBlog;
