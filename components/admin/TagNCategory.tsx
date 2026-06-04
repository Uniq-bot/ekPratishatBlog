import React from "react";
import Tag from "./tagNcategory/Tags";
import Category from "./tagNcategory/Category";
import { useAdmin } from "@/context/AdminContext";

const TagNCategory = () => {
  const { tags, setTags, categories, setCategories } = useAdmin();
  return (
    <div className="w-full h-full   ">
      <h3 className="text-2xl font-semibold p-1">
        Tags & Categories 
      </h3>
      <div className="w-full h-[calc(100%-40px)] mt-5 px-25 gap-5 flex-col flex ">
        <Category setCategories={setCategories} categories={categories} />
        <Tag setTags={setTags} tags={tags} />
      </div>
    </div>
  );
};

export default TagNCategory;
