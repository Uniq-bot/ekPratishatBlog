import type { Category, Tag } from "@/types/blog";

interface BlogFiltersProps {
  categories: Category[];
  tags: Tag[];
  categoryFilter: string;
  tagFilter: string;
  dateSort: string;
  search: string;
  resultCount: number;
  onCategoryChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onDateSortChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

const BlogFilters = ({
  categories,
  tags,
  categoryFilter,
  tagFilter,
  dateSort,
  search,
  resultCount,
  onCategoryChange,
  onTagChange,
  onDateSortChange,
  onSearchChange,
  onReset,
}: BlogFiltersProps) => {
  return (
    <div className="border border-neutral-200 bg-white p-4">
      <div className="mb-4">
        <label className="text-xs font-semibold uppercase text-neutral-500">Search</label>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts..."
          className="mt-2 w-full border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="text-xs font-semibold uppercase text-neutral-500">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mt-2 w-full border border-neutral-300 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-neutral-500">Tag</label>
          <select
            value={tagFilter}
            onChange={(e) => onTagChange(e.target.value)}
            className="mt-2 w-full border border-neutral-300 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase text-neutral-500">Date</label>
          <select
            value={dateSort}
            onChange={(e) => onDateSortChange(e.target.value)}
            className="mt-2 w-full border border-neutral-300 bg-white px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="flex items-end justify-between gap-3">
          <p className="text-sm text-neutral-500">{resultCount} posts</p>
          <button
            type="button"
            onClick={onReset}
            className="border border-neutral-300 px-3 py-2 text-xs font-semibold"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilters;
