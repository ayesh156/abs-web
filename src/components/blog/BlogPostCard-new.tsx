'use client';

import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn, getContentPreview } from '@/lib/utils';

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'minimal';
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

export default function BlogPostCard({
  post,
  variant = 'default',
  showAuthor = true,
  showCategory = true,
  className
}: BlogPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (variant === 'featured') {
    return (
      <Card className={cn(
        'group overflow-hidden border-white/10 bg-white/5 hover:border-accent-green/30 transition-all duration-300',
        className
      )}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Category Badge */}
            {showCategory && (
              <div className="absolute top-4 left-4">
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm"
                  style={{ 
                    backgroundColor: `${post.category.color}20`,
                    borderColor: post.category.color,
                    color: post.category.color
                  }}
                >
                  {post.category.name}
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-medium leading-tight mb-4 group-hover:text-accent-green transition-colors duration-300">
              {post.title}
            </h3>

            <p className="text-white/70 leading-relaxed mb-6 line-clamp-3">
              {getContentPreview(post.excerpt, 200)}
            </p>

            <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
              <time>{formatDate(post.publishedAt)}</time>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
              {showAuthor && (
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span>{post.author.name}</span>
                </div>
              )}
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button variant="outline" className="group">
                Read Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'minimal') {
    return (
      <Link href={`/blog/${post.slug}`} className={cn('group block', className)}>
        <article className="space-y-3 p-4 rounded-xl hover:bg-white/5 transition-colors duration-300">
          <div className="flex items-center gap-4 text-sm text-white/50">
            {showCategory && (
              <span 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: post.category.color }}
              >
                {post.category.name}
              </span>
            )}
            <time>{formatDate(post.publishedAt)}</time>
            <span>{post.readTime}</span>
          </div>
          
          <h3 className="text-lg font-medium leading-tight group-hover:text-accent-green transition-colors duration-300">
            {post.title}
          </h3>
          
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
            {getContentPreview(post.excerpt, 100)}
          </p>
        </article>
      </Link>
    );
  }

  // Default variant
  return (
    <Card className={cn(
      'group overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1',
      className
    )}>
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Category Badge */}
        {showCategory && (
          <div className="absolute top-3 left-3">
            <span 
              className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/20"
              style={{ 
                backgroundColor: `${post.category.color}30`,
                color: post.category.color
              }}
            >
              {post.category.name}
            </span>
          </div>
        )}

        {/* Reading Time */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center rounded-full bg-black/40 backdrop-blur-sm px-2 py-1 text-xs font-medium text-white">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="flex-grow p-6">
        <div className="mb-3">
          <time className="text-xs text-white/50">
            {formatDate(post.publishedAt)}
          </time>
        </div>
        
        <CardTitle className="group-hover:text-accent-green transition-colors duration-300 line-clamp-2 text-lg leading-tight mb-3">
          {post.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-2 text-white/70 leading-relaxed text-sm">
          {getContentPreview(post.excerpt, 120)}
        </CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardContent className="p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between">
          {showAuthor && (
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-white">{post.author.name}</div>
                <div className="text-xs text-white/50">{post.author.role}</div>
              </div>
            </div>
          )}
          
          <Link href={`/blog/${post.slug}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-accent-green hover:bg-accent-green hover:text-black"
            >
              Read
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
