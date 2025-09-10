'use client';

import { Author } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Twitter, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BlogAuthorProfileProps {
  author: Author;
  variant?: 'default' | 'compact' | 'detailed';
  showSocial?: boolean;
  showBio?: boolean;
  className?: string;
}

export default function BlogAuthorProfile({
  author,
  variant = 'default',
  showSocial = true,
  showBio = true,
  className
}: BlogAuthorProfileProps) {
  const getSocialIcon = (platform: keyof Author['socialLinks']) => {
    switch (platform) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };

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
                src={author.avatar}
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
              </div>

              {showBio && (
                <p className="text-sm leading-relaxed text-white/70">
                  {author.bio}
                </p>
              )}

              {/* Social Links */}
              {showSocial && Object.keys(author.socialLinks).length > 0 && (
                <div className="flex items-center gap-2">
                  {Object.entries(author.socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    
                    return (
                      <Link key={platform} href={url} target="_blank" rel="noopener noreferrer">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                          aria-label={`${author.name} on ${platform}`}
                        >
                          {getSocialIcon(platform as keyof Author['socialLinks'])}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
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
        src={author.avatar}
        alt={author.name}
        width={56}
        height={56}
        className="rounded-full border border-white/20"
      />
      
      <div className="flex-1 space-y-2">
        <div>
          <h4 className="font-medium text-white">{author.name}</h4>
          <p className="text-sm text-accent-green">{author.role}</p>
        </div>

        {showBio && (
          <p className="text-sm leading-relaxed text-white/70 line-clamp-2">
            {author.bio}
          </p>
        )}

        {/* Social Links */}
        {showSocial && Object.keys(author.socialLinks).length > 0 && (
          <div className="flex items-center gap-1">
            {Object.entries(author.socialLinks).map(([platform, url]) => {
              if (!url) return null;
              
              return (
                <Link key={platform} href={url} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-white/50 hover:text-white hover:bg-white/10"
                    aria-label={`${author.name} on ${platform}`}
                  >
                    {getSocialIcon(platform as keyof Author['socialLinks'])}
                  </Button>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
