"use client";
import React from "react";
import Tags from "./Tags";
import { Trash } from "lucide-react";
import { useCreateCategory } from "@/hooks/useAdminBlogs";

const Category = ({ categories }: { categories: any[] }) => {
  const [catName, setCatName] = React.useState("");
  const {mutateAsync}=useCreateCategory();
  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!catName.trim()) return;
    mutateAsync({name:catName,description:""})
    setCatName("");
  };

  const handleDelete = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // setCategories((prev) => prev.filter((_, i) => i !== index));
    // localStorage.setItem("categories", JSON.stringify(categories.filter((_, i) => i !== index)));
  };

  return (
    <div className="w-full h-auto bg-[#EBECD8] p-4 relative z-20">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Categories</h1>
        <span className="text-xs bg-black/10 px-2 py-1 rounded">
          total {categories?.length}

        </span>
      </div>

      {/* Add Category Box */}
      <form
        onSubmit={handleAddCategory}
        className="border border-dashed border-gray-500 p-3 flex items-center gap-3 bg-transparent"
      >
        <input
          type="text"
          placeholder="category name"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          className="flex-1 bg-transparent outline-none border border-gray-400 px-2 py-1"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-1 text-sm"
        >
          Add +
        </button>
      </form>

      {/* Categories List */}
      <div className="mt-4 space-y-2">
        {categories?.map((category, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-400 py-2 px-1"
          >
            <span className="font-medium">{category.name}</span>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Total posts</span>

              <button
                onClick={(e) => handleDelete(index, e)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;