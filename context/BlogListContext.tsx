"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Category, Tag } from "@/types/blog";
import { useDebounce } from "@/hooks/useDebounce";
import { filterBlogs, paginate } from "@/libs/filterBlogs";

export interface BlogListItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  category?: { id: string; name: string } | null;
  tags: Tag[];
}

interface BlogListContextValue {
  categories: Category[];
  tags: Tag[];
  categoryFilter: string;
  tagFilter: string;
  dateSort: string;
  search: string;
  filteredBlogs: BlogListItem[];
  pagedBlogs: BlogListItem[];
  totalPages: number;
  currentPage: number;
  setCategoryFilter: (value: string) => void;
  setTagFilter: (value: string) => void;
  setDateSort: (value: string) => void;
  setSearch: (value: string) => void;
  setPage: (value: number) => void;
  resetFilters: () => void;
}

const BlogListContext = createContext<BlogListContextValue | null>(null);

interface BlogListProviderProps {
  blogs: BlogListItem[];
  categories: Category[];
  tags: Tag[];
  perPage?: number;
  children: ReactNode;
}

export function BlogListProvider({
  blogs,
  categories,
  tags,
  perPage = 6,
  children,
}: BlogListProviderProps) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [dateSort, setDateSort] = useState("newest");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categoryFilter, tagFilter]);

  const filteredBlogs = filterBlogs(
    blogs,
    categoryFilter,
    tagFilter,
    debouncedSearch,
    dateSort
  );

  const { pagedItems: pagedBlogs, totalPages, currentPage } = paginate(
    filteredBlogs,
    page,
    perPage
  );

  function resetFilters() {
    setCategoryFilter("all");
    setTagFilter("all");
    setDateSort("newest");
    setSearch("");
    setPage(1);
  }

  return (
    <BlogListContext.Provider
      value={{
        categories,
        tags,
        categoryFilter,
        tagFilter,
        dateSort,
        search,
        filteredBlogs,
        pagedBlogs,
        totalPages,
        currentPage,
        setCategoryFilter,
        setTagFilter,
        setDateSort,
        setSearch,
        setPage,
        resetFilters,
      }}
    >
      {children}
    </BlogListContext.Provider>
  );
}

export function useBlogList() {
  const context = useContext(BlogListContext);
  if (!context) {
    throw new Error("useBlogList must be used within BlogListProvider");
  }
  return context;
}
