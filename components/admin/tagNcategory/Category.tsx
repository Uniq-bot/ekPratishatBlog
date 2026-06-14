"use client";
import React from "react";
import { Trash } from "lucide-react";
import { useCreateCategory, useGetCategory } from "@/hooks/useAdminBlogs";
import { Category as Cate } from "@/types/blog";


interface CategoryProp{
  categories?: Cate[]
  isLoading: boolean
}

const Category = ({ categories, isLoading }: CategoryProp) => {
  const [catName, setCatName] = React.useState("");
  const [catDesc, setCatDesc] = React.useState("");
  const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory();
  
  // console.log("category of category: ", categories)
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    try {
      await createCategory({ name: catName.trim(), description: catDesc.trim() });
      setCatName("");
      setCatDesc("");
    } catch (err: any) {
      alert(err.message || "Failed to create category");
    }
  };



  return (
    <div className="w-full h-auto bg-[#EBECD8] p-4 relative z-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Categories</h1>
        <span className="text-xs bg-black/10 px-2 py-1 rounded">
          total {categories?.length ?? 0}
        </span>
      </div>

      <form
        onSubmit={handleAddCategory}
        className="border border-dashed border-gray-500 p-3 flex flex-col gap-2 bg-transparent"
      >
        <div className="flex items-center flex-col lg:flex-row gap-3">
          <input
            type="text"
            placeholder="Category name *"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className="flex-1 bg-transparent outline-none border border-gray-400 px-2 py-1"
            required
          />
           <input
          type="text"
          placeholder="Description (optional)"
          value={catDesc}
          onChange={(e) => setCatDesc(e.target.value)}
          className="bg-transparent w-full lg:hidden outline-none border border-gray-400 px-2 py-1 text-sm"
        />
          <button
            type="submit"
            disabled={isCreating}
            className="bg-black text-white px-4 py-1 text-sm disabled:opacity-50"
          >
            {isCreating ? "Adding..." : "Add +"}
          </button>
        </div>
         <input
          type="text"
          placeholder="Description (optional)"
          value={catDesc}
          onChange={(e) => setCatDesc(e.target.value)}
          className="bg-transparent hidden lg:block outline-none border border-gray-400 px-2 py-1 text-sm"
        />
      </form>

      <div className="mt-4 space-y-2">
        {isLoading ? (
          <p className="text-sm text-gray-500 mt-3">Loading categories...</p>
        ) : (
          categories?.map((category : Cate) => (
            <div
              key={category.id}
              className="flex justify-between items-center border-b border-gray-400 py-2 px-1"
            >
              <div>
                <span className="font-medium">{category.name}</span>
                {category.description && (
                  <p className="text-xs text-gray-500">{category.description}</p>
                )}
              </div>
           
          </div>
        )))}
      </div>
    </div>
  );
};

export default Category;
