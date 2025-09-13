'use client';

import { Button } from '@/components/ui/Button';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const sidePages = Math.floor(maxVisiblePages / 2);
      const startPage = Math.max(1, currentPage - sidePages);
      const endPage = Math.min(totalPages, currentPage + sidePages);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'h-10 w-10 p-0 border border-white/10',
          currentPage === 1
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-accent-green/50 hover:bg-white/5'
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) => {
          if (page === '...') {
            return (
              <div
                key={`ellipsis-${index}`}
                className="h-10 w-10 flex items-center justify-center text-white/40"
              >
                <MoreHorizontal className="h-4 w-4" />
              </div>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Button
              key={pageNumber}
              variant={isActive ? "primary" : "ghost"}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                'h-10 w-10 p-0 text-sm font-medium',
                isActive
                  ? 'bg-accent-green text-black hover:bg-accent-green/80'
                  : 'border border-white/10 hover:border-accent-green/50 hover:bg-white/5'
              )}
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
          'h-10 w-10 p-0 border border-white/10',
          currentPage === totalPages
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-accent-green/50 hover:bg-white/5'
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
