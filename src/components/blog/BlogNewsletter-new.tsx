'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Mail, CheckCircle } from 'lucide-react';

interface BlogNewsletterProps {
  title?: string;
  description?: string;
}

export default function BlogNewsletter({
  title = "Stay Updated",
  description = "Subscribe to our newsletter for the latest insights on technology, design, and digital innovation."
}: BlogNewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail('');
  };

  return (
    <Card className="p-8 lg:p-12 text-center border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10">
      {/* Icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-green/10 border border-accent-green/20">
          <Mail className="h-8 w-8 text-accent-green" />
        </div>
      </div>

      {/* Content */}
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
          <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            {title}
          </span>
        </h3>
        <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      {/* Subscription Form */}
      {!isSubscribed ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/5 border-white/20 text-white placeholder-white/50"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent-green text-black hover:bg-accent-green/80 whitespace-nowrap"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </div>
          <p className="text-xs text-white/40 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </form>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-green/20 mb-4">
            <CheckCircle className="h-6 w-6 text-accent-green" />
          </div>
          <h4 className="text-lg font-medium text-white mb-2">Thank you for subscribing!</h4>
          <p className="text-white/60 text-sm">
            You&apos;ll receive our latest insights directly in your inbox.
          </p>
        </div>
      )}

      {/* Benefits */}
      <div className="mt-8 pt-8 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/60">
          <div>
            <div className="text-accent-green font-medium mb-1">Weekly Insights</div>
            <div>Curated content every week</div>
          </div>
          <div>
            <div className="text-accent-green font-medium mb-1">Industry Trends</div>
            <div>Latest technology updates</div>
          </div>
          <div>
            <div className="text-accent-green font-medium mb-1">Exclusive Content</div>
            <div>Subscriber-only articles</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
