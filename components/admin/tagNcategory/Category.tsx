"use client";
import React from "react";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useAdminBlogs";
import { Category as Cate } from "@/types/blog";

interface CategoryProp {
  categories?: Cate[];
  isLoading: boolean;
}

const getTranslationName = (translations: Cate["translations"], language: "en" | "ne") =>
  translations?.find((item) => item.language === language)?.name ?? "";

const Category = ({ categories, isLoading }: CategoryProp) => {
  const [catName, setCatName] = React.useState("");
  const [catNameNp, setCatNameNp] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editName, setEditName] = React.useState("");
  const [editNameNp, setEditNameNp] = React.useState("");

  const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    try {
      await createCategory({ name: catName.trim(), nameNp: catNameNp.trim() });
      setCatName("");
      setCatNameNp("");
    } catch {
      // Error toast handled by useCreateCategory
    }
  };

  const startEditing = (category: Cate) => {
    setEditingId(category.id);
    setEditName(getTranslationName(category.translations, "en") || category.name || "");
    setEditNameNp(getTranslationName(category.translations, "ne"));
  };

  const handleUpdateCategory = async (categoryId: string) => {
    if (!editName.trim()) return;
    try {
      await updateCategory({
        id: categoryId,
        name: editName.trim(),
        nameNp: editNameNp.trim(),
      });
      setEditingId(null);
      setEditName("");
      setEditNameNp("");
    } catch {
      // Error toast handled by useUpdateCategory
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
            placeholder="Category name (English) *"
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            className="flex-1 w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Category Name (Nepali) *"
            value={catNameNp}
            onChange={(e) => setCatNameNp(e.target.value)}
            className="flex-1 w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
            required
          />
          <button
            type="submit"
            disabled={isCreating}
            className="bg-black text-white px-4 py-1 text-sm disabled:opacity-50"
          >
            {isCreating ? "Adding..." : "Add +"}
          </button>
        </div>
      </form>

      <div className="mt-4 space-y-2">
        {isLoading ? (
          <p className="text-sm text-gray-500 mt-3">Loading categories...</p>
        ) : (
          categories?.map((category: Cate) => {
            const isEditing = editingId === category.id;
            const englishName =
              getTranslationName(category.translations, "en") || category.name || "";
            const nepaliName = getTranslationName(category.translations, "ne");

            return (
              <div key={category.id} className="border-b border-gray-400 py-2 px-1">
                {isEditing ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
                      placeholder="English name"
                    />
                    <input
                      type="text"
                      value={editNameNp}
                      onChange={(e) => setEditNameNp(e.target.value)}
                      className="w-full bg-transparent outline-none border border-gray-400 px-2 py-1"
                      placeholder="Nepali name"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateCategory(category.id)}
                        disabled={isUpdating}
                        className="bg-black text-white px-3 py-1 text-sm disabled:opacity-50"
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="border border-gray-500 px-3 py-1 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center gap-3">
                    <div>
                      <span className="font-medium">
                        {englishName}
                        {nepaliName ? ` / ${nepaliName}` : ""}
                      </span>
                      {category.description && (
                        <p className="text-xs text-gray-500">{category.description}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => startEditing(category)}
                      className="text-sm text-black underline shrink-0"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Category;
