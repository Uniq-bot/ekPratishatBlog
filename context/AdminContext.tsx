"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AdminTab, Blog, Category, Tag } from "@/types/blog";

interface AdminContextValue {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  categories: Category[];
  tags: Tag[];
  blogs: Blog[];
  loading: boolean;
  addCategory: (name: string, description?: string) => Promise<void>;
  addTag: (name: string) => Promise<void>;
  createBlog: (data: {
    title: string;
    content: string;
    categoryId: string;
    tags: string[];
  }) => Promise<void>;
  updateBlog: (
    id: string,
    data: { title: string; content: string; categoryId: string }
  ) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<AdminTab>("create-post");
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const [categoriesRes, tagsRes, blogsRes] = await Promise.all([
        fetch("/api/categories"),
        fetch("/api/tags"),
        fetch("/api/blogs"),
      ]);

      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (tagsRes.ok) setTags(await tagsRes.json());
      if (blogsRes.ok) setBlogs(await blogsRes.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addCategory(name: string, description = "") {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (!res.ok) throw new Error("Failed to create category");
    await loadData();
  }

  async function addTag(name: string) {
    const res = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create tag");
    await loadData();
  }

  async function createBlog(data: {
    title: string;
    content: string;
    categoryId: string;
    tags: string[];
  }) {
    const res = await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create blog post");
    await loadData();
  }

  async function updateBlog(
    id: string,
    data: { title: string; content: string; categoryId: string }
  ) {
    const res = await fetch(`/api/blogs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update blog");
    await loadData();
  }

  async function deleteBlog(id: string) {
    const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete blog");
    await loadData();
  }

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        categories,
        tags,
        blogs,
        loading,
        addCategory,
        addTag,
        createBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}
