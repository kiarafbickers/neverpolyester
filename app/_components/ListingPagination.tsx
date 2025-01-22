import { cn } from "@/app/_lib/utils";
import { ArrowLeft, ArrowRight, MoveLeft, MoveRight } from "lucide-react";

export default function ListingPagination({
  itemsPerPage,
  totalItems,
  currentPage,
  totalPages,
  paginateFront,
  paginateBack,
  paginateFrontFF,
  paginateBackFF,
  setCurrentPage,
  nameOfItems = "items",
  pageSizeOptions = [1, 2, 5, 10, 25, 50, 100],
  className,
}: {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  paginateFront: () => void;
  paginateBack: () => void;
  paginateFrontFF: () => void;
  paginateBackFF: () => void;
  setCurrentPage: (page: number) => void; // Properti yang benar
  nameOfItems?: string;
  pageSizeOptions?: number[];
  className?: string;
}) {
  const navigateToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Navigasi ke halaman tertentu
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => navigateToPage(i)}
          className={cn(
            "inline-flex items-center px-4 py-2.5 text-sm font-medium",
            i === currentPage
              ? "bg-foreground rounded text-white"
              : "text-gray-500 hover:text-gray-700"
          )}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageNumbers.unshift(
        <span
          key="start-ellipsis"
          className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-500"
        >
          ...
        </span>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span
          key="end-ellipsis"
          className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-500"
        >
          ...
        </span>
      );
    }

    return pageNumbers;
  };

  return (
    <nav
      className={cn(
        "mt-16 flex items-center justify-center space-x-4", // Pusatkan elemen dengan flex
        className
      )}
      aria-label="Pagination"
    >
      {/* Tombol Previous */}
      <button
        onClick={paginateBack}
        className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <MoveLeft className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Previous
      </button>

      {/* Nomor Halaman */}
      <div className="hidden md:flex items-center space-x-2">
        {renderPageNumbers()}
      </div>

      {/* Tombol Next */}
      <button
        onClick={paginateFront}
        className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
        <MoveRight className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
      </button>
    </nav>
  );
}
