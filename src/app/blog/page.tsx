import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import BlogPageClient from './BlogPageClient';
import { BLOG_POSTS, CATEGORIES, getFeaturedPosts } from '@/data/blog';

export default function BlogPage() {
  const featuredPosts = getFeaturedPosts();

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
        
        <BlogPageClient 
          allPosts={BLOG_POSTS}
          categories={CATEGORIES}
          featuredPosts={featuredPosts}
        />
      </main>
      <Footer />
    </>
  );
}
