"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface BlogDataType {
  id: string;
  title: string;
  content: string;
  description?: string;
  image?: string;
  coverPage?: string;
  category?: string;
  categoryID: string;
  slug: string;
  tags: string[];
  createdAt?: string;
  createdAtTimestamp?: number;
  updatedAt?: string;
  published?: boolean;
  authorID?: string;
}
interface BlogContextType {
  blogsData: BlogDataType[];
  setBlogsData: Dispatch<SetStateAction<BlogDataType[]>>;
  filteredBlogs: BlogDataType[];
  setFilteredBlogs: Dispatch<SetStateAction<BlogDataType[]>>;
  totalCount: number;
  totalPages: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  categoryId: string;
  setCategoryId: Dispatch<SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  sortFilter: string;
  setSortFilter: Dispatch<SetStateAction<string>>;
}

const BlogDataContext = createContext<BlogContextType | null>(null);

const normalizeBlog = (post: any): BlogDataType => ({
  id: post.id,
  title: post.title ?? "",
  content: post.content ?? "",
  description: post.description ?? post.content ?? "",
  image: post.coverPage ?? "",
  coverPage: post.coverPage ?? "",
  category: post.category?.name ?? post.categoryID ?? "",
  categoryID: post.categoryID ?? "",
  slug: post.slug ?? post.id,
  tags: Array.isArray(post.tags)
    ? post.tags.map((tag: any) => tag?.name ?? tag).filter(Boolean)
    : [],
  createdAt: post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : undefined,
  createdAtTimestamp: post.createdAt
    ? new Date(post.createdAt).getTime()
    : undefined,
  updatedAt: post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString()
    : undefined,
  published: post.published,
  authorID: post.authorID,
});

export const BlogDataProvider = ({ children }: { children: ReactNode }) => {
  const [blogsData, setBlogsData] = useState<BlogDataType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogDataType[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [sortFilter, setSortFilter] = useState<string>("latest");
  const limit = 4;
  const offset = (page - 1) * limit;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);



  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          limit: String(limit),
          offset: String(offset),
        });

        if (searchQuery) {
          query.set("query", searchQuery);
        }

        if (categoryId) {
          query.set("category", categoryId);
        }

        if (tags.length > 0) {
          query.set("tags", tags.join(","));
        }

        const fetchedRes = await fetch(`/api/blogs?${query.toString()}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const fetchedData = await fetchedRes.json();

        const blogs = Array.isArray(fetchedData.posts)
          ? fetchedData.posts.map(normalizeBlog)
          : [];

        setBlogsData(blogs);
        console.log(blogs);
        setFilteredBlogs(blogs);
        setTotalCount(
          typeof fetchedData.totalCount === "number"
            ? fetchedData.totalCount
            : blogs.length,
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchBlogs();
  }, [searchQuery, categoryId, tags, page]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, categoryId, tags]);

    if (!isMount) return null;
  return (
    <BlogDataContext.Provider
      value={{
        blogsData,
        setBlogsData,
        filteredBlogs,
        setFilteredBlogs,
        totalCount,
        totalPages,
        loading,
        setLoading,
        categoryId,
        setCategoryId,
        searchQuery,
        setSearchQuery,
        tags,
        setTags,
        page,
        setPage,
        sortFilter,
        setSortFilter,
      }}
    >
      {children}
    </BlogDataContext.Provider>
  );
};

export const useBlogs = () => {
  const context = useContext(BlogDataContext);
  if (!context) {
    throw new Error("useBlogs must be used within a BlogDataProvider");
  }
  return context;
};

export const useBlogDataContext = useBlogs;
