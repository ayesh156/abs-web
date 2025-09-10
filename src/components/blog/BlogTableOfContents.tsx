'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  content: string;
  className?: string;
}

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogTableOfContents({ 
  content, 
  className 
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  useEffect(() => {
    // Extract headings from content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems.map(item => 
        document.getElementById(item.id)
      ).filter(Boolean);

      const visibleHeadings = headingElements.filter(el => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 0;
      });

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[visibleHeadings.length - 1]!.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <div className={cn(
      'sticky top-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm',
      className
    )}>
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-white/80">
        Table of Contents
      </h3>
      
      <nav className="space-y-2">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={cn(
              'group flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200',
              'hover:bg-white/10',
              activeId === item.id
                ? 'bg-accent-green/20 text-accent-green'
                : 'text-white/70 hover:text-white'
            )}
            style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
          >
            <ChevronRight 
              className={cn(
                'h-3 w-3 flex-shrink-0 transition-transform',
                activeId === item.id ? 'rotate-90' : 'group-hover:translate-x-1'
              )} 
            />
            <span className="leading-tight">{item.text}</span>
          </button>
        ))}
      </nav>
      
      {/* Reading Progress */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="mb-2 flex justify-between text-xs text-white/60">
          <span>Reading Progress</span>
          <span>{Math.round((activeId ? tocItems.findIndex(item => item.id === activeId) + 1 : 0) / tocItems.length * 100)}%</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-green transition-all duration-300 ease-out"
            style={{ 
              width: `${(activeId ? tocItems.findIndex(item => item.id === activeId) + 1 : 0) / tocItems.length * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
}
