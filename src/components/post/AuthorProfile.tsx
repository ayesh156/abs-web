'use client';

import { BlogPost } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/Card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AuthorProfileProps {
  author: BlogPost['author'];
  variant?: 'default' | 'compact' | 'detailed';
  showBio?: boolean;
  className?: string;
}

export default function AuthorProfile({
  author,
  variant = 'default',
  showBio = true,
  className
}: AuthorProfileProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <Image
          src={author.avatar}
          alt={author.name}
          width={40}
          height={40}
          className="rounded-full border border-white/20"
        />
        <div>
          <h4 className="text-sm font-medium text-white">{author.name}</h4>
          <p className="text-xs text-white/60">{author.role}</p>
          {author.position && (
            <p className="text-xs text-white/40">{author.position}</p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <Card className={cn('overflow-hidden', className)}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <Image
                src={author.authorImage || author.avatar}
                alt={author.name}
                width={80}
                height={80}
                className="rounded-2xl border border-white/20"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-medium text-white">{author.name}</h3>
                <p className="text-sm text-accent-green font-medium">{author.role}</p>
                {author.position && (
                  <p className="text-sm text-white/60 mt-1">{author.position}</p>
                )}
              </div>

              {showBio && author.bio && (
                <p className="text-sm leading-relaxed text-white/70">
                  {author.bio}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <div className={cn('flex items-start gap-4', className)}>
      <Image
        src={author.authorImage || author.avatar}
        alt={author.name}
        width={56}
        height={56}
        className="rounded-full border border-white/20"
      />
      
      <div className="flex-1 space-y-2">
        <div>
          <h4 className="font-medium text-white">{author.name}</h4>
          <p className="text-sm text-accent-green">{author.role}</p>
          {author.position && (
            <p className="text-sm text-white/60">{author.position}</p>
          )}
        </div>

        {showBio && author.bio && (
          <p className="text-sm leading-relaxed text-white/70 line-clamp-2">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
