export type AdminTab =
  | "dashboard"
  | "create-post"
  | "manage-posts"
  | "categories"
  | "tags";

export interface Category {
  id: string;
  name: string;
  description?: string;
}

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
