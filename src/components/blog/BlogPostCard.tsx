'use client';

import { BlogPost } from '@/types/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { ArrowRight, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { cn, getContentPreview } from '@/lib/utils';

interface BlogPostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'minimal';
  showAuthor?: boolean;
  showCategory?: boolean;
  className?: string;
}

// Enhanced Author Avatar component with better accessibility
interface AuthorAvatarProps {
  author: BlogPost['author'];
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  className?: string;
}

const AuthorAvatar = ({ author, size = 'md', showName = false, className }: AuthorAvatarProps) => {
  const sizeMap = {
    sm: { width: 24, height: 24, textSize: 'text-xs' },
    md: { width: 32, height: 32, textSize: 'text-sm' },
    lg: { width: 48, height: 48, textSize: 'text-base' }
  };

  const { width, height, textSize } = sizeMap[size];
  
  // Generate fallback avatar URL with better quality
  const fallbackSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=25306c&color=ffffff&size=${width * 2}&format=png&rounded=true&bold=true`;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative rounded-full overflow-hidden bg-white/10 ring-2 ring-white/10">
        <ImageWithFallback
          src={author.authorImage || author.avatar}
          alt={`${author.name} - ${author.role}`}
          width={width}
          height={height}
          className="object-cover"
          fallbackSrc={fallbackSrc}
          quality={90}
          aspectRatio="square"
        />
      </div>
      {showName && (
        <div className="min-w-0 flex-1">
          <p className={cn('font-medium text-white truncate', textSize)}>{author.name}</p>
          <p className="text-xs text-white/60 truncate">{author.role}</p>
        </div>
      )}
    </div>
  );
};

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

  // High-quality fallback images
  const defaultFeaturedImage = 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800';
  const fallbackFeaturedImage = 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800';

  if (variant === 'featured') {
    return (
      <Card className={cn(
        'group overflow-hidden border-white/10 bg-white/5 hover:border-accent-green/30 transition-all duration-300',
        className
      )}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Enhanced Featured Image Section */}
          <div className="relative h-64 lg:h-auto overflow-hidden">
            <ImageWithFallback
              src={post.featuredImage || defaultFeaturedImage}
              alt={`Featured image for "${post.title}"`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              fallbackSrc={fallbackFeaturedImage}
              quality={85}
              aspectRatio="landscape"
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

            {/* Featured Badge */}
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-accent-green/20 border border-accent-green text-accent-green text-xs font-medium backdrop-blur-sm">
                Featured
              </span>
            </div>
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
              <time className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDate(post.publishedAt)}
              </time>
              <span>{post.readTime}</span>
              {showAuthor && (
                <AuthorAvatar 
                  author={post.author} 
                  size="sm" 
                  showName 
                  className="flex items-center gap-2"
                />
              )}
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button variant="outline" className="group w-fit">
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
        <article className="space-y-3 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
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

          {showAuthor && (
            <div className="pt-2">
              <AuthorAvatar 
                author={post.author} 
                size="sm" 
                showName 
                className="flex items-center gap-2"
              />
            </div>
          )}
        </article>
      </Link>
    );
  }

  // Default variant with enhanced images and accessibility
  return (
    <Card className={cn(
      'group overflow-hidden h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20',
      className
    )}>
      {/* Enhanced Featured Image Section */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={post.featuredImage || defaultFeaturedImage}
          alt={`Cover image for "${post.title}"`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fallbackSrc={fallbackFeaturedImage}
          quality={80}
          aspectRatio="landscape"
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

        {/* Featured indicator */}
        {post.isFeatured && (
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center rounded-full bg-accent-green/20 border border-accent-green text-accent-green px-2 py-1 text-xs font-medium backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
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

      {/* Enhanced Footer with Author */}
      <CardContent className="p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between">
          {showAuthor && (
            <AuthorAvatar 
              author={post.author} 
              size="md" 
              showName 
              className="flex items-center gap-3 flex-1 mr-4"
            />
          )}
          
          <Link href={`/blog/${post.slug}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-accent-green hover:bg-accent-green hover:text-black transition-all duration-200"
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
