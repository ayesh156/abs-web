'use client';

import { BlogPost } from '@/types/blog';
import { BlogAuthorProfile, BlogNewsletter } from '@/components/blog';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button - Sticky */}
      <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-4">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="pt-8">
        {/* Article Header */}
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <header className="mb-12">
            {/* Category Badge */}
            <div className="mb-6">
              <span 
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-sm"
                style={{ 
                  backgroundColor: `${post.category.color}20`,
                  borderColor: post.category.color,
                  color: post.category.color
                }}
              >
                {post.category.name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight font-light tracking-tight mb-8">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {post.title}
              </span>
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl leading-relaxed text-white/70 mb-8 max-w-4xl">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/50 mb-12">
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
              <div className="flex items-center gap-2">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span>By {post.author.name}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mb-12">
              <Button variant="secondary" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </header>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div 
            className="blog-content prose prose-lg prose-invert max-w-none mb-16"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Article Footer */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8 pt-12 border-t border-white/10">
          {/* Author Profile */}
          <div className="mb-16">
            <BlogAuthorProfile author={post.author} />
          </div>

          {/* Share Section */}
          <Card className="p-8 text-center mb-16">
            <h3 className="text-xl font-medium text-white mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-white/60 mb-6">
              Share it with your network or save it for later reading.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5 mr-2" />
                Share Article
              </Button>
              <Button variant="ghost" size="lg">
                <Bookmark className="h-5 w-5 mr-2" />
                Save for Later
              </Button>
            </div>
          </Card>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-white/10 pt-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Related Articles
                  </span>
                </h2>
                <p className="text-white/60">
                  Continue exploring our insights and innovations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full p-6 group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/30">
                      {/* Related Post Image */}
                      <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      {/* Related Post Content */}
                      <div className="flex-1">
                        <div className="mb-3">
                          <span 
                            className="inline-block px-2 py-1 rounded text-xs font-medium"
                            style={{ 
                              backgroundColor: `${relatedPost.category.color}20`,
                              color: relatedPost.category.color
                            }}
                          >
                            {relatedPost.category.name}
                          </span>
                        </div>

                        <h3 className="text-lg font-medium text-white mb-2 line-clamp-2 group-hover:text-accent-green transition-colors duration-300">
                          {relatedPost.title}
                        </h3>

                        <p className="text-white/60 text-sm line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Newsletter Section */}
      <div className="border-t border-white/10 mt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
          <BlogNewsletter />
        </div>
      </div>
    </div>
  );
}
