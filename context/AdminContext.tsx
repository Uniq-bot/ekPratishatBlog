"use client";

import { createContext, useContext, useEffect, useState } from "react";
// type Block =
//   | { id: number; type: "paragraph"; content: string }
//   | { id: number; type: "list"; content: string[] }
//   | { id: number; type: "heading"; level: number; content: string }
//   | { id: number; type: "image"; content: string };

interface AdminContextType {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  blocks: any[];
  setBlocks: React.Dispatch<React.SetStateAction<any[]>>;
  blogsData: any[];
  setBlogsData: React.Dispatch<React.SetStateAction<any[]>>;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("tag&category");
  const [blocks, setBlocks] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [blogsData, setBlogsData] = useState([]);
  useEffect(() => {
    const datas = localStorage.getItem("blogs");
    if (datas) {
      const parsed = JSON.parse(datas);
      setBlogsData(parsed);
    }

    const cats = localStorage.getItem("categories");
    const tags = localStorage.getItem("tags");

    if (tags) {
      setTags(JSON.parse(tags));
    }
    if (cats) {
      setCategories(JSON.parse(cats));
    }
  }, []);

  console.log(tags, categories);

  return (
    <AdminContext.Provider
      value={{
        activeTab,
        setActiveTab,
        blocks,
        setBlocks,
        setBlogsData,
        blogsData,
        tags,
        setTags,
        categories,
        setCategories,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return ctx;
};
