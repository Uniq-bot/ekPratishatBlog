export interface FilterableBlog {
  title: string;
  content: string;
  createdAt: string;
  category?: { id: string; name: string } | null;
  categoryID?: string;
  tags: { id: string; name: string }[];
}

function getCategoryId(blog: FilterableBlog) {
  return blog.categoryID ?? blog.category?.id;
}

export function matchesSearch(blog: FilterableBlog, query: string) {
  const q = query.toLowerCase();
  return (
    blog.title.toLowerCase().includes(q) ||
    blog.content.toLowerCase().includes(q) ||
    blog.category?.name.toLowerCase().includes(q) ||
    blog.tags.some((tag) => tag.name.toLowerCase().includes(q))
  );
}

export function filterBlogs<T extends FilterableBlog>(
  blogs: T[],
  categoryFilter: string,
  tagFilter: string,
  search: string,
  dateSort: string
) {
  let result = blogs;

  if (categoryFilter !== "all") {
    result = result.filter((blog) => getCategoryId(blog) === categoryFilter);
  }

  if (tagFilter !== "all") {
    result = result.filter((blog) => blog.tags.some((tag) => tag.id === tagFilter));
  }

  if (search.trim()) {
    result = result.filter((blog) => matchesSearch(blog, search.trim()));
  }

  return [...result].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return dateSort === "newest" ? bTime - aTime : aTime - bTime;
  });
}

export function paginate<T>(items: T[], page: number, perPage: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const pagedItems = items.slice((currentPage - 1) * perPage, currentPage * perPage);

  return { pagedItems, totalPages, currentPage };
}
