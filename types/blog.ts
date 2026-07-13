export type AdminTab =
  | "dashboard"
  | "create-post"
  | "manage-posts"
  | "categories"
  | "tags";

export interface Category {
  translations?: Array<{ language: string; name: string; description?: string | null }>;
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
  translations: { title: string; content: string }[];
  viewCount?: number;
};
export interface Tag {
  id: string;
  name: string;
  translations?: Array<{ language: string; name: string }>;
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
// types/blog.ts

export type BlogTranslation = {
  id?: string;
  language: string; // e.g. "en" | "ne"
  title: string;
  description?: string | null;
  content?: string;
};

export type CategoryTranslation = {
  id?: string;
  categoryId?: string;
  language: string;
  name: string;
  description?: string | null;
};

export type BlogCategory = {
  id?: string;
  name: string;
  slug?: string;
  translations?: CategoryTranslation[];
};

export type BlogItem = {
  id: string;
  title: string;
  slug: string | null;
  coverImage: string | null;
  createdAt: Date;
  discription?: string | null; // legacy/typo field, kept for fallback used in component
  category: BlogCategory | null;
  translations?: BlogTranslation[];
};
