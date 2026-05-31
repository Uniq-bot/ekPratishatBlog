interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  className = "flex flex-wrap justify-center gap-2",
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className={className}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          type="button"
          onClick={() => onPageChange(pageNum)}
          className={`px-3 py-2 text-xs font-semibold border ${
            pageNum === currentPage
              ? "border-neutral-900 bg-neutral-900 text-white"
              : "border-neutral-300 text-neutral-700"
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
