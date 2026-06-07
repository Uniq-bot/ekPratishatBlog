import React from "react";
import Tag from "./tagNcategory/Tags";
import Category from "./tagNcategory/Category";

const TagNCategory = ({ categories, tags }: { categories: any[]; tags: any[] }) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-2xl font-semibold p-1">Tags & Categories</h3>
      <div className="w-full mt-5 px-4 lg:px-10 gap-5 flex flex-col">
        <Category categories={categories} />
        <Tag tags={tags ?? []} />
      </div>
    </div>
  );
};

export default TagNCategory;