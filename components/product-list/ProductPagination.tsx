import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  next: () => void;
  previous: () => void;
  page: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function ProductPagination({
  next,
  previous,
  page,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const array = Array.from({ length: page }, (_, index) => index + 1);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Pagination className="mt-7">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem className="cursor-pointer">
          <PaginationPrevious
            onClick={() => {
              if (currentPage > 1) {
                previous();
                setCurrentPage(currentPage - 1);
              }
            }}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>

        {/* Page Numbers */}
        {array.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              isActive={number === currentPage} // Apply active state to the current page
              onClick={() => handlePageClick(number)}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        {/* Next Button */}
        <PaginationItem className="cursor-pointer">
          <PaginationNext
            onClick={() => {
              if (currentPage < page) {
                next();
                setCurrentPage(currentPage + 1);
              }
            }}
            className={
              currentPage === page ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
