'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowRight, CheckCircle, Loader2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  className?: string;
}

export default function NewsletterSignup({
  title = "Never Miss an Insight",
  description = "Get our latest articles and insights delivered directly to your inbox. Quality content, no spam.",
  placeholder = "Enter your email address",
  className
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make the actual API call to your newsletter service
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      setStatus('success');
      setMessage('Successfully subscribed! Check your email to confirm.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  return (
    <section className={cn(
      'section-padding bg-black-rich',
      className
    )}>
      <div className="container-padding mx-auto max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-green/10 border border-accent-green/20">
          <Mail className="h-8 w-8 text-accent-green" />
        </div>

        {/* Title */}
        <h2 className="text-section mb-6">{title}</h2>
        
        {/* Description */}
        <p className="text-body-large mb-8 text-white/70">
          {description}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Input
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                disabled={isLoading || isSuccess}
                className={cn(
                  'w-full',
                  isError && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
                  isSuccess && 'border-green-500'
                )}
                aria-describedby={message ? 'newsletter-message' : undefined}
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading || isSuccess || !email}
              className="group relative"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSuccess && <CheckCircle className="mr-2 h-4 w-4 text-green-500" />}
              {!isLoading && !isSuccess && (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
              {isSuccess && 'Subscribed!'}
              {isLoading && 'Subscribing...'}
            </Button>
          </div>

          {/* Status Message */}
          {message && (
            <div
              id="newsletter-message"
              className={cn(
                'text-sm',
                isError && 'text-red-400',
                isSuccess && 'text-green-400'
              )}
              role={isError ? 'alert' : 'status'}
            >
              {message}
            </div>
          )}
        </form>

        {/* Trust Indicators */}
        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/50">
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-accent-green" />
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-accent-green" />
            <span>Easy unsubscribe</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4 text-accent-green" />
            <span>1,000+ readers</span>
          </div>
        </div>

        {/* Privacy Note */}
        <p className="mt-4 text-xs text-white/40">
          By subscribing, you agree to our{' '}
          <a 
            href="/privacy" 
            className="text-accent-green hover:underline transition-colors"
          >
            Privacy Policy
          </a>
          {' '}and consent to receive our newsletter.
        </p>
      </div>
    </section>
  );
}
