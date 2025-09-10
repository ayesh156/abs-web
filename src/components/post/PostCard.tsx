'use client';

import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'minimal';
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

export default function PostCard({
  post,
  variant = 'default',
  showAuthor = true,
  showCategory = true,
  className
}: PostCardProps) {
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
        'group overflow-hidden h-full bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border-white/10 transition-all duration-500 lg:col-span-2',
        'hover:border-accent-green/30 hover:from-white/12 hover:via-white/6 hover:to-white/3',
        className
      )}>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Image Section - Mobile Optimized */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Category Badge - Mobile Optimized */}
            {showCategory && (
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                <span 
                  className="inline-flex items-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-white backdrop-blur-md border"
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

          {/* Content Section - Mobile Optimized */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12">
            <div className="flex-grow">
              <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <time className="text-sm text-white/50 font-medium">
                  <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
                  <span className="sm:hidden">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}</span>
                </time>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                  {post.readTime}
                </div>
                {showAuthor && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={16}
                      height={16}
                      className="rounded-full sm:w-5 sm:h-5"
                    />
                    <span className="hidden sm:inline">{post.author.name}</span>
                    <span className="sm:hidden text-xs">{post.author.name.split(' ')[0]}</span>
                  </div>
                )}
              </div>

              <CardTitle className="group-hover:text-accent-green transition-all duration-300 line-clamp-3 text-xl sm:text-2xl lg:text-3xl leading-tight mb-4 sm:mb-6">
                {post.title}
              </CardTitle>
              
              <CardDescription className="line-clamp-3 text-white/70 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8">
                {post.excerpt}
              </CardDescription>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button className="group w-full sm:w-auto justify-center sm:justify-start">
                Read Full Article
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
        <article className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-4 text-sm text-white/50">
            {showCategory && (
              <span 
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: post.category.color }}
              >
                {post.category.name}
              </span>
            )}
            <time className="text-xs sm:text-sm">
              <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
              <span className="sm:hidden">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </time>
            <span className="text-xs sm:text-sm">{post.readTime}</span>
          </div>
          
          <h3 className="text-base sm:text-lg font-medium leading-tight group-hover:text-accent-green transition-colors duration-200 line-clamp-2 sm:line-clamp-none">
            {post.title}
          </h3>
          
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
            {post.excerpt}
          </p>
        </article>
      </Link>
    );
  }

  // Default variant - Mobile Optimized
  return (
    <Card className={cn(
      'group overflow-hidden h-full flex flex-col bg-gradient-to-br from-white/8 via-white/4 to-white/2 backdrop-blur-sm border-white/10 transition-all duration-500',
      'hover:border-accent-green/30 hover:from-white/12 hover:via-white/6 hover:to-white/3',
      className
    )}>
      {/* Image Section - Mobile Optimized */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        
        {/* Category Badge - Mobile Optimized */}
        {showCategory && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10">
            <span 
              className="inline-flex items-center rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-medium text-white backdrop-blur-md border"
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

        {/* Reading Time Badge - Mobile Optimized */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
          <span className="inline-flex items-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 px-2 py-1 sm:px-2.5 text-xs font-medium text-white">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </span>
        </div>
      </div>

      {/* Card Content - Mobile Optimized */}
      <CardHeader className="flex-grow p-4 sm:p-6">
        <div className="mb-2 sm:mb-3 flex items-center justify-between">
          <time className="text-xs text-white/50 font-medium">
            <span className="hidden sm:inline">{formatDate(post.publishedAt)}</span>
            <span className="sm:hidden">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}</span>
          </time>
        </div>
        
        <CardTitle className="group-hover:text-accent-green transition-all duration-300 line-clamp-2 text-lg sm:text-xl leading-tight mb-2 sm:mb-3">
          {post.title}
        </CardTitle>
        
        <CardDescription className="line-clamp-2 sm:line-clamp-3 text-white/70 leading-relaxed text-sm sm:text-base">
          {post.excerpt}
        </CardDescription>
      </CardHeader>

      {/* Card Footer - Mobile Optimized */}
      <CardContent className="p-4 sm:p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between">
          {showAuthor && (
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={28}
                  height={28}
                  className="rounded-full ring-2 ring-white/10 group-hover:ring-accent-green/30 transition-all duration-300 sm:w-8 sm:h-8"
                />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-medium text-white/90 truncate">{post.author.name}</span>
                <span className="text-xs text-white/50 truncate">{post.author.role}</span>
              </div>
            </div>
          )}
          
          <Link href={`/blog/${post.slug}`} className="flex-shrink-0 ml-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="group/btn text-accent-green hover:text-black hover:bg-accent-green transition-all duration-300 border border-accent-green/30 hover:border-accent-green px-3 py-2 sm:px-4"
            >
              <span className="hidden sm:inline">Read More</span>
              <span className="sm:hidden">Read</span>
              <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
