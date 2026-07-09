const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  }
  return "";
};

// ─── Auth ─────────────────────────────────────────────────────────────────────

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
  const res = await fetch(`${getBaseUrl()}/api/auth/logout`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
};

// ─── Blogs ────────────────────────────────────────────────────────────────────

export const fetchBlogs = async ({
  page,
  limit,
  searchQuery,
  tags = [],
  category,
  sort,
}: {
  page: number;
  searchQuery?: string;
  limit: number;
  tags?: string[];
  category?: string;
  sort?: string;
}) => {
  const queryParams = new URLSearchParams();
  queryParams.set("offset", String((page - 1) * limit));
  queryParams.set("limit", String(limit));
  if (searchQuery) queryParams.set("query", searchQuery);
  if (tags.length > 0) queryParams.set("tags", tags.join(","));
  // Never forward "all" — leave it absent so the API returns everything
  if (category && category !== "all") queryParams.set("category", category);
  if (sort && sort !== "latest") queryParams.set("sort", sort);

  const res = await fetch(
    `${getBaseUrl()}/api/blogs?${queryParams.toString()}`,
  );
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

export const createBlogs = async (newBlog: FormData) => {
  const res = await fetch(`${getBaseUrl()}/api/blogs`, {
    method: "POST",
    body: newBlog,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create blog");
  }
  return res.json();
};

export const saveTodraft = async ({
  id,
  formData,
}: {
  id?: string;
  formData: FormData;
}) => {
  const url = id
    ? `${getBaseUrl()}/api/blogs/draft/${id}`
    : `${getBaseUrl()}/api/blogs/draft`;

  const res = await fetch(url, {
    method: id ? "PATCH" : "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to save draft");
  }

  return res.json();
};
export const updateBlog = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const res = await fetch(`${getBaseUrl()}/api/edit/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update blog");
  }
  return res.json();
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${getBaseUrl()}/api/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to upload image");
  }

  return res.json(); // { imagePath }
};

export const toggleAarchiveBlog = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/blogs/archive`, {
    method: "PATCH",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to archive blog");
  }
  return res.json();
};

export const deleteBlog = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/edit/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete blog");
  return res.json();
};

export const curateBlog = async (id: string) => {
  const res = await fetch(`${getBaseUrl()}/api/blogs/curate`, {
    method: "PATCH",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to curate blog");
  }
  return res.json();
};

export const fetchCategory = async () => {
  const res = await fetch(`${getBaseUrl()}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const createCategory = async (newCat: {
  name: string;
  nameNp?: string;
}) => {
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

export const fetchTags = async () => {
  const res = await fetch(`${getBaseUrl()}/api/tags`);
  if (!res.ok) throw new Error("Failed to fetch tags");
  return res.json();
};

export const createTag = async (newTag: { name: string; nameNp?: string }) => {
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


// Advertisement
