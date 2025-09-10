'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import PostCard from '@/components/post/PostCard';
import AuthorProfile from '@/components/post/AuthorProfile';
import NewsletterSignup from '@/components/post/NewsletterSignup';
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
import { getRelatedPosts, BLOG_POSTS } from '@/data/blog';
import type { BlogPost } from '@/types/blog';

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [copySuccess, setCopySuccess] = React.useState(false);
  const pathname = usePathname();
  
  const relatedPosts = getRelatedPosts(post, 3);
  const currentIndex = BLOG_POSTS.findIndex(p => p.slug === post.slug);
  const previousPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://absterco.com${pathname}`;
  const shareTitle = post.title;

  const handleShare = async (platform: 'twitter' | 'linkedin' | 'copy') => {
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
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL:', err);
        }
        break;
    }
  };

  return (
    <main>
      {/* Back to Blog - Mobile Sticky */}
      <section className="pt-20 sm:pt-32 pb-4 sm:pb-8">
        <div className="container-padding mx-auto max-w-6xl">
          <Link href="/blog">
            <Button 
              variant="ghost" 
              className="group mb-4 sm:mb-8 text-white/70 hover:text-white sticky top-4 sm:static bg-black/80 sm:bg-transparent backdrop-blur-sm sm:backdrop-blur-none border border-white/10 sm:border-none z-10 w-full sm:w-auto justify-center sm:justify-start"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Header - Responsive */}
      <section className="pb-8 sm:pb-16">
        <div className="container-padding mx-auto max-w-5xl">
          {/* Category Badge - Mobile Optimized */}
          <div className="mb-4 sm:mb-6">
            <span 
              className="inline-flex items-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white border"
              style={{ 
                borderColor: post.category.color,
                backgroundColor: `${post.category.color}20`
              }}
            >
              <BookOpen className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" style={{ color: post.category.color }} />
              {post.category.name}
            </span>
          </div>

          {/* Title - Responsive Typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 sm:mb-8 leading-[1.1] sm:leading-tight font-bold max-w-4xl">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              {post.title}
            </span>
          </h1>

          {/* Meta Information - Mobile Stack */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <time dateTime={post.publishedAt} className="text-sm sm:text-base">
                <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
                <span className="sm:hidden">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </time>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm sm:text-base">{post.readTime}</span>
            </div>
          </div>

          {/* Author Info - Mobile Optimized */}
          <div className="mb-8 sm:mb-12 max-w-4xl">
            <AuthorProfile
              author={post.author}
              variant="default"
              showSocial={true}
              showBio={true}
            />
          </div>

          {/* Featured Image - Responsive Aspect Ratio */}
          <div className="relative mb-8 sm:mb-16 overflow-hidden rounded-xl sm:rounded-2xl aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] max-w-full">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Share Buttons - Mobile Responsive */}
          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between border-y border-white/10 py-4 sm:py-6 gap-4 sm:gap-0 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-white/70 justify-center sm:justify-start">
              <Share2 className="h-4 w-4" />
              Share this article
            </div>
            
            <div className="flex items-center gap-2 justify-center sm:justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('copy')}
                className="h-9 w-9 p-0 text-white/60 hover:text-white hover:bg-white/10 transition-colors relative"
                aria-label={copySuccess ? "Link copied!" : "Copy link"}
              >
                <LinkIcon className="h-4 w-4" />
                {copySuccess && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-accent-green text-black text-xs px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content - Enhanced Typography */}
      <section className="pb-8 sm:pb-16">
        <div className="container-padding mx-auto max-w-4xl">
          <div 
            className="prose prose-invert prose-base sm:prose-lg lg:prose-xl max-w-none
              prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-6 sm:prose-h1:mb-8
              prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:leading-tight prose-h2:mb-4 sm:prose-h2:mb-6 prose-h2:mt-8 sm:prose-h2:mt-12
              prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:leading-tight prose-h3:mb-3 sm:prose-h3:mb-4 prose-h3:mt-6 sm:prose-h3:mt-8
              prose-p:text-white/85 prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-6 prose-p:text-base sm:prose-p:text-lg
              prose-a:text-accent-green prose-a:no-underline hover:prose-a:underline prose-a:transition-all prose-a:font-medium
              prose-strong:text-white prose-strong:font-semibold
              prose-code:text-accent-green prose-code:bg-white/8 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:p-4 sm:prose-pre:p-6
              prose-blockquote:border-l-accent-green prose-blockquote:border-l-4 prose-blockquote:text-white/80 prose-blockquote:italic prose-blockquote:pl-6 sm:prose-blockquote:pl-8 prose-blockquote:py-2
              prose-hr:border-white/20 prose-hr:my-8 sm:prose-hr:my-12
              prose-ul:text-white/85 prose-ol:text-white/85 prose-li:text-white/85 prose-li:mb-2
              prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-8 sm:prose-img:my-12"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </div>
      </section>

      {/* Author Bio Section - Enhanced */}
      <section className="py-8 sm:py-16 bg-gradient-to-r from-black-rich via-black/90 to-black-rich">
        <div className="container-padding mx-auto max-w-5xl">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8">About the Author</h3>
          <AuthorProfile
            author={post.author}
            variant="detailed"
            showSocial={true}
            showBio={true}
          />
        </div>
      </section>

      {/* Navigation Between Posts - Mobile Optimized */}
      <section className="py-8 sm:py-16">
        <div className="container-padding mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
            {/* Previous Post */}
            {previousPost && (
              <Link 
                href={`/blog/${previousPost.slug}`}
                className="group block order-2 md:order-1"
              >
                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 h-full">
                  <div className="mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm text-white/50">
                    <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    Previous Article
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-accent-green transition-colors duration-200 line-clamp-2">
                    {previousPost.title}
                  </h4>
                </div>
              </Link>
            )}

            {/* Next Post */}
            {nextPost && (
              <Link 
                href={`/blog/${nextPost.slug}`}
                className="group block order-1 md:order-2"
              >
                <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10 h-full">
                  <div className="mb-2 sm:mb-3 flex items-center justify-center md:justify-end gap-2 text-xs sm:text-sm text-white/50">
                    <span className="md:hidden">Next Article</span>
                    <span className="hidden md:inline">Next Article</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-accent-green transition-colors duration-200 text-center md:text-right line-clamp-2">
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
            
            <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <div
                  key={relatedPost.id}
                  className="scroll-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PostCard
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
      <NewsletterSignup
        title="Want More Insights?"
        description="Subscribe to get our latest articles delivered directly to your inbox."
      />
    </main>
  );
}
