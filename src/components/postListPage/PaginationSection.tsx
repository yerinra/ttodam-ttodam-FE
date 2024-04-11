import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

type PaginationSectionProps = {
  currentPage: number;
  startPage: number;
  pagesToShow: number;
  totalPages: number;
  handlePageClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  handlePrevPageGroup: () => void;
  handleNextPageGroup: () => void;
};

function PaginationSection({
  currentPage,
  startPage,
  pagesToShow,
  totalPages,
  handlePageClick,
  handlePrevPageGroup,
  handleNextPageGroup,
}: PaginationSectionProps) {
  const endPage = startPage + pagesToShow - 1;
  const pages = Array.from({ length: Math.min(pagesToShow, totalPages - startPage + 1) }, (_, i) => startPage + i);

  const renderPageNumbers = pages.map(page => (
    <PaginationItem key={page} onClick={handlePageClick} className={cn({ 'text-primary/90': currentPage == page })}>
      <PaginationLink className="cursor-pointer">{page}</PaginationLink>
    </PaginationItem>
  ));

  return (
    <section className="mt-2 mb-[63px]">
      <Pagination>
        <PaginationContent>
          <button onClick={handlePrevPageGroup} disabled={startPage === 1} className="disabled:text-light-gray">
            <ChevronLeftIcon />
          </button>
          {renderPageNumbers}
          <button onClick={handleNextPageGroup} disabled={endPage >= totalPages} className="disabled:text-light-gray">
            <ChevronRightIcon />
          </button>
        </PaginationContent>
      </Pagination>
    </section>
  );
}

export default PaginationSection;
