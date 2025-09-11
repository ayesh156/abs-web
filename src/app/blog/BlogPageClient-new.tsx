'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/types/blog';
import { BlogPostCard, BlogPagination, BlogNewsletter } from '@/components/blog';
import { Card } from '@/components/ui/Card';
import { Search, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPageClientProps {
  posts: BlogPost[];
}

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const postsPerPage = 9;

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(posts.map(post => post.category.name))
    );
    return [
      { name: 'All', value: 'all', color: '#00ffab' },
      ...uniqueCategories.map(name => {
        const post = posts.find(p => p.category.name === name);
        return {
          name,
          value: name.toLowerCase(),
          color: post?.category.color || '#00ffab'
        };
      })
    ];
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'all' || 
        post.category.name.toLowerCase() === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Reset to page 1 when filters change
  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Page Header - Following Absterco patterns */}
      <div className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl leading-none font-light tracking-tight md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Insights & Innovation
            </span>
          </h1>
          <p className="text-lg leading-relaxed md:text-xl text-white/70 max-w-3xl mx-auto">
            Explore our thoughts on technology, design, and digital transformation. 
            Discover insights from our team and stay ahead of industry trends.
          </p>
        </div>
      </div>

      {/* Filter & Search Section */}
      <div className="pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="p-6 border-white/10 bg-white/5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent-green/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => handleFilterChange(category.value)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                      selectedCategory === category.value
                        ? 'bg-accent-green text-black'
                        : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/20 hover:bg-white/10'
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-white/5 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-300',
                    viewMode === 'grid'
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:text-white/70'
                  )}
                  title="Grid view"
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-lg transition-all duration-300',
                    viewMode === 'list'
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:text-white/70'
                  )}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <p className="text-sm text-white/50">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.name}`}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-white/50">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-16">
              <div className="text-white/40 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-white mb-2">No articles found</h3>
              <p className="text-white/60 mb-6">
                Try adjusting your search terms or category filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setCurrentPage(1);
                }}
                className="inline-flex items-center px-6 py-3 rounded-xl bg-accent-green text-black font-medium hover:bg-accent-green/80 transition-colors duration-300"
              >
                Clear filters
              </button>
            </Card>
          ) : (
            <>
              {/* Featured Post - Only show on first page */}
              {currentPage === 1 && paginatedPosts.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-medium">
                      ✨ Featured Article
                    </span>
                  </div>
                  <BlogPostCard 
                    post={paginatedPosts[0]} 
                    variant="featured"
                    showAuthor
                    showCategory
                    className="border border-accent-green/20 hover:border-accent-green/40"
                  />
                </div>
              )}

              {/* Posts Grid/List */}
              <div className={cn(
                'transition-all duration-500',
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              )}>
                {paginatedPosts.slice(currentPage === 1 ? 1 : 0).map((post) => (
                  <BlogPostCard
                    key={post.slug}
                    post={post}
                    variant={viewMode === 'list' ? 'minimal' : 'default'}
                    showAuthor
                    showCategory
                    className={cn(
                      'transition-all duration-300 hover:-translate-y-1',
                      viewMode === 'list' ? 'w-full' : 'h-full'
                    )}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-16 flex justify-center">
                  <BlogPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <BlogNewsletter />
        </div>
      </div>
    </div>
  );
}
