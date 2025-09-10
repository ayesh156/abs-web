'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogPagination from '@/components/blog/BlogPagination';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { BLOG_POSTS, CATEGORIES, getFeaturedPosts } from '@/data/blog';
import { BlogPost } from '@/types/blog';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const featuredPosts = getFeaturedPosts();
  const mainFeaturedPost = featuredPosts[0];

  // Pagination logic
  const { paginatedPosts, totalPages } = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    
    return {
      paginatedPosts: filteredPosts.slice(startIndex, endIndex),
      totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
    };
  }, [filteredPosts, currentPage]);

  const handleFilterChange = (posts: BlogPost[]) => {
    setIsLoading(true);
    setFilteredPosts(posts);
    setCurrentPage(1); // Reset to first page when filters change
    
    // Simulate loading for smooth UX
    setTimeout(() => setIsLoading(false), 300);
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
    
    // Smooth scroll to top of posts section
    document.getElementById('blog-posts')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Simulate loading for smooth UX
    setTimeout(() => setIsLoading(false), 300);
  };

  // Add smooth reveal animations
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Use a small delay to ensure DOM is ready
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, [paginatedPosts]);

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          subtitle="Insights & Perspectives"
          title="Thoughts on Digital Excellence"
          description="Insights on strategy, development, and the art of creating refined digital experiences from our globally distributed team."
          primaryCTA={{
            text: 'Subscribe to Updates',
            href: '#newsletter',
          }}
          secondaryCTA={{
            text: 'View Latest Posts',
            href: '#blog-posts',
          }}
          showScrollIndicator={false}
        />

        {/* Featured Post Section */}
        {mainFeaturedPost && (
          <section className="section-padding bg-gradient-to-b from-black via-black-rich to-black">
            <div className="container-padding mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-medium mb-4">
                  ✨ Featured
                </span>
                <h2 className="text-section mb-4">
                  Featured Article
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                  Our most popular and impactful content, handpicked for you
                </p>
              </div>
              <div className="scroll-reveal">
                <BlogPostCard
                  post={mainFeaturedPost}
                  variant="featured"
                  showAuthor={true}
                  showCategory={true}
                  className="border-2 border-accent-green/20 hover:border-accent-green/40 shadow-2xl shadow-accent-green/5"
                />
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Section */}
        <section id="blog-posts" className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="mb-12 text-center px-4 sm:px-0">
              <h2 className="text-section mb-6">Latest Articles</h2>
              <p className="text-body-large text-white/70 max-w-2xl mx-auto">
                Explore our latest thoughts on design, development, and digital strategy
              </p>
            </div>

            {/* Filters and Search */}
            <div className="mb-12">
              <BlogFilters
                posts={BLOG_POSTS}
                categories={CATEGORIES}
                onFilterChange={handleFilterChange}
                className="max-w-4xl mx-auto"
              />
            </div>

            {/* Results Summary */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2 sm:px-0">
              <p className="text-white/60 text-sm sm:text-base">
                Showing <span className="text-white font-medium">{paginatedPosts.length}</span> of <span className="text-white font-medium">{filteredPosts.length}</span> articles
                {filteredPosts.length !== BLOG_POSTS.length && (
                  <span className="text-accent-green"> (filtered)</span>
                )}
              </p>
              
              {totalPages > 1 && (
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <span>Page <span className="text-white font-medium">{currentPage}</span> of <span className="text-white font-medium">{totalPages}</span></span>
                </div>
              )}
            </div>

            {/* Posts Grid - Optimized for Mobile */}
            {paginatedPosts.length > 0 ? (
              <div className={`
                grid gap-6 
                grid-cols-1 
                sm:grid-cols-2 sm:gap-8 
                lg:grid-cols-3 
                xl:gap-10
                2xl:grid-cols-4
                transition-all duration-500 
                ${isLoading ? 'opacity-50 scale-[0.98]' : 'opacity-100 scale-100'}
              `}>
                {paginatedPosts.map((post, index) => (
                  <div
                    key={`${post.id}-${currentPage}`}
                    className="scroll-reveal group w-full"
                    style={{ 
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <BlogPostCard
                      post={post}
                      variant="default"
                      showAuthor={true}
                      showCategory={true}
                      className="h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-green/10 hover:scale-[1.02] active:scale-[0.98]"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="mx-auto w-20 h-20 mb-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <span className="text-3xl">📝</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-3">No articles found</h3>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  Try adjusting your filters or search terms to find what you&apos;re looking for.
                </p>
                <button
                  onClick={() => {
                    setFilteredPosts(BLOG_POSTS);
                    setCurrentPage(1);
                  }}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-green text-black font-medium hover:bg-accent-green/80 transition-colors duration-200"
                >
                  Show all articles
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-20">
                <BlogPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <BlogNewsletter />
      </main>
      <Footer />
    </>
  );
}
