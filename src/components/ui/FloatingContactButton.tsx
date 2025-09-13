'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MessageCircle, Mail, Phone, X, Sparkles } from 'lucide-react';

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: 'Email Us',
      href: 'mailto:hello@absterco.com',
      icon: Mail,
      color: 'from-blue-500/20 to-blue-600/20',
      delay: '0ms'
    },
    {
      name: 'Call Us',
      href: 'tel:+1-555-0123',
      icon: Phone,
      color: 'from-green-500/20 to-green-600/20',
      delay: '100ms'
    },
    {
      name: 'Chat',
      href: '/contact',
      icon: MessageCircle,
      color: 'from-purple-500/20 to-purple-600/20',
      delay: '200ms'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact Options Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-3">
          {contactOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.name}
                className="animate-in slide-in-from-bottom-2 fade-in duration-300"
                style={{ animationDelay: option.delay }}
              >
                <Link
                  href={option.href}
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center"
                >
                  {/* Option Label */}
                  <div className="mr-3 rounded-lg border border-white/10 bg-black/60 backdrop-blur-xl px-3 py-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <span className="text-sm font-medium text-white whitespace-nowrap">
                      {option.name}
                    </span>
                  </div>

                  {/* Option Button */}
                  <button className="group relative h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-black/40 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-white/40">
                    {/* Background Gradient */}
                    <div className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100',
                      option.color
                    )} />
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    
                    {/* Icon */}
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                      <Icon className="h-4 w-4 text-white/80 transition-colors duration-300 group-hover:text-white" />
                    </div>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative h-14 w-14 overflow-hidden rounded-full transition-all duration-500 hover:scale-110"
        aria-label="Contact options"
      >
        {/* Contact Us Tooltip - Inside button for proper hover detection */}
        {!isOpen && (
          <div className="absolute top-1/2 right-16 -translate-y-1/2 rounded-lg border border-white/10 bg-black/60 backdrop-blur-xl px-3 py-2 opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none z-50">
            <span className="text-sm font-medium text-white whitespace-nowrap">
              Contact Us
            </span>
            {/* Tooltip Arrow pointing to the button */}
            <div className="absolute top-1/2 left-full -translate-y-1/2 border-l-4 border-t-4 border-b-4 border-l-black/60 border-t-transparent border-b-transparent"></div>
          </div>
        )}

        {/* Multiple Background Layers for Premium Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl" />
        <div className="absolute inset-0 rounded-full border border-white/20 transition-all duration-300 group-hover:border-white/40" />
        
        {/* Animated Gradient Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-spin-slow" />
        
        {/* Inner Glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full skew-x-12 transition-transform duration-1000 group-hover:translate-x-full" />
        
        {/* Button Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="relative">
            {/* Icon Background */}
            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Icon with Rotation Animation */}
            <div className={cn(
              'transition-all duration-300',
              isOpen ? 'rotate-180' : 'rotate-0'
            )}>
              {isOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <MessageCircle className="h-5 w-5 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute -top-1 -right-1 h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Sparkles className="h-3 w-3 text-white/60 animate-pulse" />
        </div>
        
        {/* Pulsing Ring Animation */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30 opacity-0 animate-ping group-hover:opacity-100" />
      </button>
    </div>
  );
}
