import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Function to generate the URL for a specific page
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return baseUrl;
    }
    return `${baseUrl}?page=${page.toString()}`;
  };

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = [];

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    // Adjust range to always show 3 pages if possible
    if (rangeEnd - rangeStart < 2 && totalPages > 3) {
      if (rangeStart === 2) {
        rangeEnd = Math.min(totalPages - 1, rangeEnd + 1);
      } else if (rangeEnd === totalPages - 1) {
        rangeStart = Math.max(2, rangeStart - 1);
      }
    }

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push('ellipsis-start');
    }

    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationRoot>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={getPageUrl(currentPage - 1)} />
          </PaginationItem>
        )}

        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <PaginationItem key={`ellipsis-${index.toString()}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageUrl(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={getPageUrl(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationRoot>
  );
}
