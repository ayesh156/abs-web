'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface BlogLayoutProps {
  children: React.ReactNode;
  showScrollToTop?: boolean;
}

export default function BlogLayout({ 
  children, 
  showScrollToTop = true 
}: BlogLayoutProps) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {children}
      
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <Button
          onClick={scrollToTop}
          variant="primary"
          size="md"
          className={cn(
            'fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 shadow-lg transition-all duration-300',
            showScrollButton 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-16 opacity-0 pointer-events-none'
          )}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
