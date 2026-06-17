export type AdminTab =
  | "dashboard"
  | "create-post"
  | "manage-posts"
  | "categories"
  | "tags";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}
export type BlogItems = {
  id: string;
  title: string;
  slug: string | null;
  coverImage: string | null;
  createdAt: Date;
  category: { name: string } | null;
  viewCount?: number;
};
export interface Tag {
  id: string;
  name: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  categoryID: string;
  createdAt: string;
  category?: { id: string; name: string } | null;
  tags: Tag[];
}


// types/blog.ts
export type BlogItem = {
  id: string;
  title: string;
  slug: string | null;
  coverImage: string | null;
  createdAt: Date;
  discription?: string | null;
  category: { name: string } | null;
};

