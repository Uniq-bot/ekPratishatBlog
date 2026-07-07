import React from "react";
import Tag from "./tagNcategory/Tags";
import Category from "./tagNcategory/Category";
import {Tag as TagP, Category as Cate} from "@/types/blog";
import { useGetCategory, useGetTags } from "@/hooks/useAdminBlogs";

interface TagNCategoryProps {
  tags?: TagP[];
  isTagLoading: boolean;
  categories?: Cate[];
  isCategoryLoading: boolean;
}

const TagNCategory = ({ tags, isTagLoading, categories, isCategoryLoading }: TagNCategoryProps) => {
    console.log(tags)
    console.log(categories)
  
  return (
    <div className="w-full h-full">
      <h3 className="text-2xl font-semibold p-1">Tags & Categories</h3>
      <div className="w-full mt-5 px-4 lg:px-10 gap-5 flex flex-col">
        <Category categories={categories} isLoading={isCategoryLoading} />
        <Tag tags={tags} isLoading={isTagLoading} />
      </div>
    </div>
  );
};

export default TagNCategory;