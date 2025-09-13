'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { BlogPost, BlogCategory } from '@/types/blog';
import { BlogService, CategoryService } from '@/lib/blog-service';
import { BLOG_CATEGORIES } from '@/constants/blog';
import { BlogPostCard, BlogNewsletter } from '@/components/blog';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Search, Grid, List, Star, Calendar, Users, BookOpen, ArrowRight, Sparkles, Coffee, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn, getContentPreview } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryWithPosts extends BlogCategory {
  posts: BlogPost[];
  postCount: number;
}

interface EmptyStateProps {
  category: BlogCategory;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

// Creative Empty State Component
const EmptyStateCard = ({ category, icon, title, description }: EmptyStateProps) => {
  const emptyStates = {
    'design-philosophy': {
      icon: <Star className="h-8 w-8" />,
      title: 'Design Inspiration Coming Soon',
      description: 'We\'re crafting beautiful design insights and UX patterns. Stay tuned for visual inspiration!'
    },
    'development': {
      icon: <BookOpen className="h-8 w-8" />,
      title: 'Code Adventures Await',
      description: 'Our developers are brewing fresh tutorials and technical deep-dives. Great content is on the way!'
    },
    'ai-technology': {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'AI Frontier Exploration',
      description: 'The future is being written. We\'re preparing cutting-edge AI insights and technology breakdowns!'
    },
    'team-culture': {
      icon: <Users className="h-8 w-8" />,
      title: 'Team Stories Brewing',
      description: 'Behind every great product is an amazing team. We\'re documenting our journey and culture insights!'
    },
    'performance': {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Performance Labs Active',
      description: 'Speed matters. We\'re testing, measuring, and preparing optimization guides that will blow your mind!'
    },
    'devops-infrastructure': {
      icon: <Coffee className="h-8 w-8" />,
      title: 'Infrastructure Engineering',
      description: 'Cloud architecture and scalable systems. We\'re documenting the blueprints for modern applications!'
    },
    'user-experience': {
      icon: <Star className="h-8 w-8" />,
      title: 'UX Mastery In Progress',
      description: 'Creating delightful experiences takes time. We\'re documenting the art and science of great UX!'
    },
    'default': {
      icon: <Coffee className="h-8 w-8" />,
      title: 'Content in the Making',
      description: 'Great content takes time to brew. We\'re working on something special for this category!'
    }
  };

  const state = emptyStates[category.slug as keyof typeof emptyStates] || emptyStates.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="relative p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 border border-white/20 mb-6 text-white/60">
            {icon || state.icon}
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            {title || state.title}
          </h3>
          <p className="text-white/60 mb-6 max-w-sm mx-auto leading-relaxed">
            {description || state.description}
          </p>
          <div className="inline-flex items-center text-sm text-accent-green font-medium">
            <span>Coming Soon</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Featured Posts Section Component
const FeaturedPostsSection = ({ posts }: { posts: BlogPost[] }) => {
  if (posts.length === 0) return null;

  const mainFeatured = posts[0];
  const sideFeatured = posts.slice(1, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-20"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Star className="h-6 w-6 text-accent-green" />
          <h2 className="text-2xl font-bold text-white">Featured Stories</h2>
        </div>
        <p className="text-white/60">Hand-picked articles that showcase our best insights and innovations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Featured Post */}
        <div className="lg:col-span-2">
          <BlogPostCard 
            post={mainFeatured} 
            variant="featured"
            showAuthor
            showCategory
            className="h-full border border-accent-green/20 hover:border-accent-green/40 bg-gradient-to-br from-accent-green/5 to-transparent"
          />
        </div>

        {/* Side Featured Posts */}
        <div className="space-y-6">
          {sideFeatured.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <BlogPostCard
                post={post}
                variant="minimal"
                showAuthor
                showCategory
                className="border border-white/10 hover:border-white/20"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Category Section Component
const CategorySection = ({ category, isExpanded, onToggle }: { 
  category: CategoryWithPosts; 
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const displayPosts = isExpanded ? category.posts : category.posts.slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <h2 className="text-2xl font-bold text-white">{category.name}</h2>
          <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-sm">
            {category.postCount} article{category.postCount !== 1 ? 's' : ''}
          </span>
        </div>
        
        {category.posts.length > 3 && (
          <button
            onClick={onToggle}
            className="inline-flex items-center px-4 py-2 rounded-xl bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
          >
            {isExpanded ? 'Show Less' : 'View All'}
            <ArrowRight className={cn(
              "ml-2 h-4 w-4 transition-transform duration-300",
              isExpanded && "rotate-90"
            )} />
          </button>
        )}
      </div>

      {category.posts.length === 0 ? (
        <EmptyStateCard category={category} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {displayPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <BlogPostCard
                  post={post}
                  variant="default"
                  showAuthor
                  showCategory
                  className="h-full border border-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.section>
  );
};

export default function BlogPageClientEnhanced() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Load data from Firebase only
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [postsData, categoriesData] = await Promise.all([
        BlogService.getPosts({ published: true, limitCount: 100, useFallback: false }),
        CategoryService.getCategories()
      ]);

      setPosts(postsData);
      setCategories(categoriesData);
      
    } catch (err) {
      console.error('Error loading blog data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load blog data from Firebase');
      
      // Set empty arrays instead of fallback data
      setPosts([]);
      setCategories(BLOG_CATEGORIES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Get featured posts (marked as featured or latest if none featured)
  const featuredPosts = useMemo(() => {
    const markedFeatured = posts.filter(post => post.isFeatured);
    if (markedFeatured.length > 0) {
      return markedFeatured.slice(0, 3);
    }
    // Fallback to latest posts if no featured posts
    return posts.slice(0, 3);
  }, [posts]);

  // Organize posts by category
  const categoriesWithPosts = useMemo<CategoryWithPosts[]>(() => {
    return categories.map(category => {
      const categoryPosts = posts.filter(post => post.category.id === category.id);
      return {
        ...category,
        posts: categoryPosts,
        postCount: categoryPosts.length
      };
    });
  }, [categories, posts]);

  // Filter posts for search/category filtering
  const filteredPosts = useMemo(() => {
    return posts.filter((post: BlogPost) => {
      const matchesCategory = selectedCategory === 'all' || 
        post.category.slug === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getContentPreview(post.excerpt, 500).toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner className="w-8 h-8 mx-auto mb-4" />
          <p className="text-white/60">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Blog Loading Issue</h3>
          <p className="text-white/60 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={loadData}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-green text-black font-medium hover:bg-accent-green/80 transition-colors duration-300 w-full"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
            <p className="text-xs text-white/40">
              If this persists, the blog system may need initial setup or Firebase configuration.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  // Show search/filter view when actively searching or filtering
  const showSearchView = searchQuery.length > 0 || selectedCategory !== 'all';

  return (
    <div className="min-h-screen bg-black">
      {/* Page Header */}
      <div className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl leading-none font-light tracking-tight md:text-6xl lg:text-7xl mb-6"
          >
            <span className="bg-gradient-to-r from-white via-white to-accent-green bg-clip-text text-transparent">
              Insights & Innovation
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg leading-relaxed md:text-xl text-white/70 max-w-3xl mx-auto"
          >
            Explore our thoughts on technology, design, and digital transformation. 
            Discover insights from our team and stay ahead of industry trends.
          </motion.p>
        </div>
      </div>

      {/* Filter & Search Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="pb-16"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-accent-green/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                    selectedCategory === 'all'
                      ? 'bg-accent-green text-black'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/20 hover:bg-white/10'
                  )}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                      selectedCategory === category.slug
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
            {showSearchView && (
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-white/50">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'all' && ` in ${categories.find(c => c.slug === selectedCategory)?.name}`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-sm text-accent-green hover:text-accent-green/80 transition-colors duration-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </Card>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {showSearchView ? (
            /* Search/Filter Results */
            filteredPosts.length === 0 ? (
              <Card className="text-center py-16">
                <div className="text-white/40 text-6xl mb-4">?</div>
                <h3 className="text-xl font-medium text-white mb-2">No articles found</h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your search terms or category filters.
                </p>
              </Card>
            ) : (
              <div className={cn(
                'transition-all duration-500',
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              )}>
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <BlogPostCard
                      post={post}
                      variant={viewMode === 'list' ? 'minimal' : 'default'}
                      showAuthor
                      showCategory
                      className={cn(
                        'transition-all duration-300 hover:-translate-y-1',
                        viewMode === 'list' ? 'w-full' : 'h-full'
                      )}
                    />
                  </motion.div>
                ))}
              </div>
            )
          ) : posts.length === 0 ? (
            /* No posts available */
            <Card className="text-center py-20">
              <div className="text-white/40 text-6xl mb-6">�</div>
              <h3 className="text-2xl font-medium text-white mb-4">Firebase Blog Setup Required</h3>
              <p className="text-white/60 mb-8 max-w-md mx-auto">
                No blog posts found in Firebase. Please add blog content through the admin panel 
                to display articles here.
              </p>
              <div className="inline-flex items-center text-sm text-accent-green font-medium">
                <span>Add content via admin panel</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Card>
          ) : (
            /* Category-based view */
            <>
              {/* Featured Posts Section */}
              <div className="mb-20">
                <FeaturedPostsSection posts={featuredPosts} />
              </div>

              {/* Category Sections */}
              {categoriesWithPosts.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  isExpanded={expandedCategories.has(category.id)}
                  onToggle={() => toggleCategoryExpansion(category.id)}
                />
              ))}
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