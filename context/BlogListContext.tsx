"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";


interface BlogContextType {
  tag: string;
  setTag: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sortFilter: string;
  setSortFilter: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const BlogDataContext = createContext<BlogContextType | null>(null);

export const BlogDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [tag, setTag]=useState("all");
  const [category, setCategory]=useState("all");
  const [searchQuery, setSearchQuery]=useState("");
  const [sortFilter, setSortFilter]=useState("latest");
  const [page, setPage]=useState(1);
  return (
    <BlogDataContext.Provider
      value={{
        tag,
        setTag,
        category,
        setCategory,
        searchQuery,
        setSearchQuery,
        sortFilter,
        setSortFilter,
        page,
        setPage,
      }}
    >
      {children}
    </BlogDataContext.Provider>
  );
};


export const useBlogUi = () => {
  const context = useContext(BlogDataContext);
  if (!context) {
    throw new Error("useBlogUi must be used within BlogDataProvider");
  }
  return context;
};