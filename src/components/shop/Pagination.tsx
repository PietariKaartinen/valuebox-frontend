'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultsPerPage: number;
  onPageChange: (page: number) => void;
  onShowAll?: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalResults,
  resultsPerPage,
  onPageChange,
  onShowAll,
}: PaginationProps) {
  const start = (currentPage - 1) * resultsPerPage + 1;
  const end = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      {totalPages > 1 && (
        <button
          onClick={onShowAll}
          className="bg-navy text-white font-semibold px-8 py-2.5 rounded-full hover:bg-navy-light transition-colors text-sm"
        >
          Show all results
        </button>
      )}
      <p className="text-sm text-gray-500">
        {totalResults === 0
          ? 'No results found'
          : `Showing ${start}\u2013${end} of ${totalResults} result${totalResults === 1 ? '' : 's'}`
        }
      </p>
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30"
          >
            &larr; Prev
          </button>
          <span className="text-sm text-gray-400">
            page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30"
          >
            Next &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
