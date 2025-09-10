'use client';

'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogAuthorProfile from '@/components/blog/BlogAuthorProfile';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Share2, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon,
  BookOpen 
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getRelatedPosts, BLOG_POSTS } from '@/data/blog';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const [slug, setSlug] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);
  
  if (!slug) {
    return <div>Loading...</div>;
  }
  
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const currentIndex = BLOG_POSTS.findIndex(p => p.slug === slug);
  const previousPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = post.title;

  const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
    const text = `${shareTitle} - ${post.excerpt}`;
    
    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          '_blank',
          'width=600,height=400'
        );
        break;
      case 'copy':
        if (navigator.clipboard) {
          navigator.clipboard.writeText(shareUrl).then(() => {
            // You could show a toast notification here
            console.log('URL copied to clipboard');
          });
        }
        break;
    }
  };

  return (
    <>
      <Header />
      <main>
        {/* Back to Blog */}
        <section className="pt-32 pb-8">
          <div className="container-padding mx-auto max-w-4xl">
            <Link href="/blog">
              <Button variant="ghost" className="group mb-8 text-white/70 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="pb-16">
          <div className="container-padding mx-auto max-w-4xl">
            {/* Category Badge */}
            <div className="mb-6">
              <span 
                className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white border"
                style={{ 
                  borderColor: post.category.color,
                  backgroundColor: `${post.category.color}20`
                }}
              >
                <BookOpen className="mr-2 h-4 w-4" style={{ color: post.category.color }} />
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-hero mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            {/* Meta Information */}
            <div className="mb-8 flex flex-wrap items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Author Info */}
            <div className="mb-12">
              <BlogAuthorProfile
                author={post.author}
                variant="default"
                showSocial={true}
                showBio={true}
              />
            </div>

            {/* Featured Image */}
            <div className="relative mb-16 overflow-hidden rounded-2xl">
              <Image
                src={post.featuredImage}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Share Buttons */}
            <div className="mb-12 flex items-center justify-between border-y border-white/10 py-6">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Share2 className="h-4 w-4" />
                Share this article
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                  className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                  className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleShare('copy')}
                  className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10"
                  aria-label="Copy link"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16">
          <div className="container-padding mx-auto max-w-4xl">
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-medium
                prose-p:text-white/80 prose-p:leading-relaxed
                prose-a:text-accent-green prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-medium
                prose-code:text-accent-green prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10
                prose-blockquote:border-l-accent-green prose-blockquote:text-white/70
                prose-hr:border-white/20"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
            />
          </div>
        </section>

        {/* Author Bio Section */}
        <section className="py-16 bg-black-rich">
          <div className="container-padding mx-auto max-w-4xl">
            <h3 className="text-xl font-medium text-white mb-8">About the Author</h3>
            <BlogAuthorProfile
              author={post.author}
              variant="detailed"
              showSocial={true}
              showBio={true}
            />
          </div>
        </section>

        {/* Navigation Between Posts */}
        <section className="py-16">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Previous Post */}
              {previousPost && (
                <Link 
                  href={`/blog/${previousPost.slug}`}
                  className="group block"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="mb-3 flex items-center gap-2 text-sm text-white/50">
                      <ArrowLeft className="h-4 w-4" />
                      Previous Article
                    </div>
                    <h4 className="text-lg font-medium text-white group-hover:text-accent-green transition-colors duration-200">
                      {previousPost.title}
                    </h4>
                  </div>
                </Link>
              )}

              {/* Next Post */}
              {nextPost && (
                <Link 
                  href={`/blog/${nextPost.slug}`}
                  className="group block"
                >
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                    <div className="mb-3 flex items-center justify-end gap-2 text-sm text-white/50">
                      Next Article
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <h4 className="text-lg font-medium text-white group-hover:text-accent-green transition-colors duration-200 text-right">
                      {nextPost.title}
                    </h4>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-black-rich">
            <div className="container-padding mx-auto max-w-7xl">
              <h3 className="text-section mb-12 text-center">
                Related Articles
              </h3>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <div
                    key={relatedPost.id}
                    className="scroll-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BlogPostCard
                      post={relatedPost}
                      variant="default"
                      showAuthor={true}
                      showCategory={true}
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <BlogNewsletter
          title="Want More Insights?"
          description="Subscribe to get our latest articles delivered directly to your inbox."
        />
      </main>
      <Footer />
    </>
  );
}
