'use client';

import { useState } from 'react';
import { BlogPost, BlogCategory } from '@/types/blog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostFiltersProps {
  posts: BlogPost[];
  categories: BlogCategory[];
  onFilterChange: (filteredPosts: BlogPost[]) => void;
  className?: string;
}

export default function PostFilters({
  posts,
  categories,
  onFilterChange,
  className
}: PostFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const applyFilters = (
    query: string = searchQuery,
    category: string = selectedCategory
  ) => {
    let filtered = posts;

    // Apply search filter
    if (query.trim()) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.author.name.toLowerCase().includes(lowercaseQuery)
      );
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(post => post.category.slug === category);
    }

    onFilterChange(filtered);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchQuery, category);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    onFilterChange(posts);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'all';

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
        <Input
          type="text"
          placeholder="Search articles, authors, or topics..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
          className="pl-10 bg-white/5 border-white/20 text-white placeholder-white/50 focus:border-accent-green focus:ring-accent-green/20"
        />
      </div>

      {/* Filter Toggle for Mobile */}
      <div className="flex items-center justify-between md:hidden">
        <Button
          variant="ghost"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="h-2 w-2 rounded-full bg-accent-green" />
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Content */}
      <div className={cn(
        'space-y-6',
        'md:block',
        isFilterOpen ? 'block' : 'hidden'
      )}>
        {/* Category Filter */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-white/80 uppercase tracking-wide">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleCategoryChange('all')}
              className="text-sm"
            >
              All Posts
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.slug ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleCategoryChange(category.slug)}
                className="text-sm"
                style={{
                  backgroundColor: selectedCategory === category.slug 
                    ? category.color 
                    : undefined,
                  borderColor: selectedCategory === category.slug 
                    ? category.color 
                    : 'rgba(255, 255, 255, 0.2)',
                  color: selectedCategory === category.slug 
                    ? '#000' 
                    : undefined
                }}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="rounded-lg bg-white/5 p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-white/80">Active Filters</h4>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2 text-sm text-white/60">
              {searchQuery && (
                <div>Search: &ldquo;{searchQuery}&rdquo;</div>
              )}
              {selectedCategory !== 'all' && (
                <div>
                  Category: {categories.find(c => c.slug === selectedCategory)?.name}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Clear Filters - Desktop */}
      {hasActiveFilters && (
        <div className="hidden md:block">
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            <X className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
