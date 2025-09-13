'use client';

import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function PostPagination({
  currentPage,
  totalPages,
  onPageChange,
  className
}: PostPaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Main pagination controls */}
      <nav
        role="navigation"
        aria-label="Blog pagination"
        className={cn(
          'flex items-center justify-center space-x-1 p-2 rounded-2xl bg-gradient-to-r from-white/5 via-white/8 to-white/5 backdrop-blur-md border border-white/10',
          className
        )}
      >
        {/* Previous Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'h-10 px-4 flex items-center gap-2 transition-all duration-300',
            'text-white/70 hover:text-white hover:bg-white/10',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
            currentPage === 1 ? 'invisible' : 'visible'
          )}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Previous</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1 mx-2">
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-10 w-10 items-center justify-center text-white/40"
                  aria-hidden="true"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const pageNumber = page as number;
            const isCurrentPage = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(pageNumber)}
                className={cn(
                  'h-10 w-10 p-0 text-sm font-medium transition-all duration-300',
                  isCurrentPage
                    ? 'bg-accent-green text-black hover:bg-accent-green/80 shadow-lg shadow-accent-green/20 scale-110'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                )}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={isCurrentPage ? 'page' : undefined}
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>

        {/* Next Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'h-10 px-4 flex items-center gap-2 transition-all duration-300',
            'text-white/70 hover:text-white hover:bg-white/10',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
            currentPage === totalPages ? 'invisible' : 'visible'
          )}
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline font-medium">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>

      {/* Page Info and Quick Navigation */}
      <div className="flex items-center gap-8 text-sm text-white/50">
        <div className="flex items-center gap-2">
          <span>Page</span>
          <span className="font-medium text-accent-green">{currentPage}</span>
          <span>of</span>
          <span className="font-medium text-white/70">{totalPages}</span>
        </div>
        
        {totalPages > 10 && (
          <div className="hidden md:flex items-center gap-2">
            <span>Jump to:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              className="h-8 px-3 text-xs text-white/60 hover:text-accent-green hover:bg-white/5"
            >
              First
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 px-3 text-xs text-white/60 hover:text-accent-green hover:bg-white/5"
            >
              Last
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
