const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  }
  return "";
};

// ─── Auth ────────────────────────────────────────────────────────────────────

export const signIn = async (payload: { email: string; password: string }) => {
  const res = await fetch(`${getBaseUrl()}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

export const signOut = async () => {
  const res = await fetch(`${getBaseUrl()}/api/auth/logout`, { method: "POST" });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
};

// ─── Blogs ───────────────────────────────────────────────────────────────────

export const fetchBlogs = async ({
  page,
  limit,
  tags = [],
  category,
}: {
  page: number;
  limit: number;
  tags?: string[];
  category?: string;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.set("offset", String((page - 1) * limit));
  queryParams.set("limit", String(limit));
  if (tags.length > 0) queryParams.set("tags", tags.join(","));
  if (category && category !== "all") queryParams.set("category", category);
  const res = await fetch(`${getBaseUrl()}/api/blogs?${queryParams.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const createBlogs = async (newBlog: any) => {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBlog),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create blog");
  }
  return res.json();
};

export const updateBlog = async ({ id, ...data }: any) => {
  const res = await fetch(`${getBaseUrl()}/api/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update blog");
  }
  return res.json();
};

export const deleteBlog = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/edit/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete blog");
  return res.json();
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const fetchCategory = async () => {
  const res = await fetch(`${getBaseUrl()}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const createCategory = async (newCat: any) => {
  const res = await fetch(`${getBaseUrl()}/api/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCat),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create category");
  }
  return res.json();
};

export const deleteCategory = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/categories/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
};

// ─── Tags ────────────────────────────────────────────────────────────────────

export const fetchTags = async () => {
  const res = await fetch(`${getBaseUrl()}/api/tags`);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
};

export const createTag = async (newTag: any) => {
  const res = await fetch(`${getBaseUrl()}/api/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTag),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create tag");
  }
  return res.json();
};

export const deleteTag = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/tags/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete tag");
  return res.json();
};
