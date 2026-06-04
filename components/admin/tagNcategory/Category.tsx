"use client";
import React from "react";
import Tags from "./Tags";
import { Trash } from "lucide-react";

const Category = ({ setCategories, categories }: { setCategories: React.Dispatch<React.SetStateAction<string[]>>; categories: string[] }) => {
  const [catValue, setCatValue] = React.useState("");

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!catValue.trim()) return;

    setCategories((prev) => [...prev, catValue.trim()]);
    localStorage.setItem("categories", JSON.stringify([...categories, catValue.trim()]));
    setCatValue("");
  };

  const handleDelete = (index: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
    localStorage.setItem("categories", JSON.stringify(categories.filter((_, i) => i !== index)));
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
          value={catValue}
          onChange={(e) => setCatValue(e.target.value)}
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
            <span className="font-medium">{category}</span>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>Total posts</span>

              <button
                onClick={() => handleDelete(index)}
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