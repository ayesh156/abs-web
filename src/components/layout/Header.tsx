'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BRAND } from '@/constants/brand';
import { Menu, X, ChevronDown } from 'lucide-react';
import MigrationAlert from '@/components/ui/MigrationAlert';

// Enhanced Navigation Structure with Dropdowns
const ENHANCED_NAVIGATION = {
  primary: [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    {
      name: 'Services',
      href: '/services',
      dropdown: [
        {
          name: 'Web Development',
          href: '/services/web-development',
          description: 'Modern web applications',
        },
        {
          name: 'Mobile Apps',
          href: '/services/mobile-apps',
          description: 'iOS & Android solutions',
        },
        {
          name: 'AI Solutions',
          href: '/services/ai-solutions',
          description: 'Intelligent platforms',
        },
        { name: 'View All Services', href: '/services', featured: true },
      ],
    },
    {
      name: 'Resources',
      href: '/resources',
      dropdown: [
        {
          name: 'Case Studies',
          href: '/resources/case-studies',
          description: 'Success stories',
        },
        {
          name: 'Documentation',
          href: '/resources/docs',
          description: 'Technical guides',
        },
        {
          name: 'Whitepapers',
          href: '/resources/whitepapers',
          description: 'Industry insights',
        },
        { name: 'FAQs', href: '/faq', description: 'Common questions' },
        { name: 'View All Resources', href: '/resources', featured: true },
      ],
    },
    {
      name: 'Company',
      href: '/about',
      dropdown: [
        { name: 'About Us', href: '/about', description: 'Our story & values' },
        { name: 'Our Process', href: '/process', description: 'How we work' },
        { name: 'Team', href: '/team', description: 'Meet our experts' },
        { name: 'Careers', href: '/careers', description: 'Join our team' },
        { name: 'Blog', href: '/blog', description: 'Insights & updates' },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ],
  secondary: [{ name: 'Client Portal', href: '/portal', highlighted: true }],
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Migration Alert */}
      <MigrationAlert />

      <header className="fixed top-0 right-0 left-0 z-50">
        {/* Ultra Premium Background Layers */}
        <div className="absolute inset-0">
          {/* Primary Glassmorphism Layer */}
          <div
            className={cn(
              'absolute inset-0 transition-all duration-700',
              isScrolled
                ? 'bg-black/20 backdrop-blur-2xl'
                : 'bg-gradient-to-b from-black/10 via-black/5 to-transparent backdrop-blur-sm'
            )}
          />

          {/* Dynamic Gradient Overlay */}
          <div
            className={cn(
              'absolute inset-0 transition-all duration-700',
              isScrolled
                ? 'bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02]'
                : 'bg-gradient-to-r from-white/[0.01] via-white/[0.03] to-white/[0.01]'
            )}
          />

          {/* Subtle Border */}
          <div
            className={cn(
              'absolute right-0 bottom-0 left-0 h-px transition-all duration-700',
              isScrolled
                ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
                : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
            )}
          />

          {/* Floating Gradient Orbs */}
          {!isScrolled && (
            <>
              <div className="absolute top-0 left-1/4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-white/5 to-transparent blur-2xl" />
              <div
                className="absolute top-0 right-1/4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-bl from-white/3 to-transparent blur-xl"
                style={{ animationDelay: '1s' }}
              />
            </>
          )}
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="flex h-20 items-center justify-between">
            {/* Premium Logo */}
            <Link href="/" className="group relative flex items-center">
              <div className="relative">
                {/* Logo Image */}
                <Image
                  src="/images/logo-sm.png"
                  alt={BRAND.name}
                  width={160}
                  height={80}
                  className="h-11.5 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                  priority
                  quality={100}
                  style={{
                    imageRendering: 'crisp-edges',
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation - Ultra Premium */}
            <div className="hidden items-center space-x-1 md:flex">
              {ENHANCED_NAVIGATION.primary.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.dropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="group relative flex items-center rounded-xl px-4 py-2 transition-all duration-300"
                  >
                    {/* Background Hover Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-all duration-300 group-hover:opacity-100" />

                    {/* Active State Background */}
                    {isActivePath(item.href) && (
                      <div className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
                    )}

                    <span
                      className={cn(
                        'relative z-10 text-sm font-medium transition-all duration-300',
                        isActivePath(item.href)
                          ? 'text-white'
                          : 'text-white/70 group-hover:text-white'
                      )}
                    >
                      {item.name}
                    </span>

                    {/* Dropdown Indicator */}
                    {item.dropdown && (
                      <ChevronDown
                        className={cn(
                          'ml-1 h-3 w-3 transition-all duration-200',
                          activeDropdown === item.name
                            ? 'rotate-180 text-white'
                            : 'text-white/50'
                        )}
                      />
                    )}

                    {/* Premium Underline Effect */}
                    <div
                      className={cn(
                        'absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-300',
                        isActivePath(item.href)
                          ? 'w-3/4 opacity-100'
                          : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-100'
                      )}
                    />
                  </Link>

                  {/* Premium Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/10">
                      {/* Dropdown Background */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10" />

                      <div className="relative z-10 space-y-1 p-4">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={() => setActiveDropdown(null)}
                            className={cn(
                              'group relative flex flex-col rounded-xl px-4 py-3 transition-all duration-300',
                              dropdownItem.featured
                                ? 'border border-white/20 bg-gradient-to-r from-white/10 via-white/15 to-white/10'
                                : 'hover:bg-white/5'
                            )}
                          >
                            <span
                              className={cn(
                                'text-sm font-medium transition-colors duration-300',
                                dropdownItem.featured
                                  ? 'text-white'
                                  : 'text-white/80 group-hover:text-white'
                              )}
                            >
                              {dropdownItem.name}
                            </span>
                            {dropdownItem.description && (
                              <span className="mt-1 text-xs text-white/50">
                                {dropdownItem.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA Buttons - Ultra Premium */}
            <div className="hidden items-center space-x-3 md:flex">
              {ENHANCED_NAVIGATION.secondary.map((item) => (
                <Link key={item.name} href={item.href}>
                  <button
                    className={cn(
                      'group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 cursor-pointer',
                      item.highlighted
                        ? 'border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5'
                        : 'border border-white/15 bg-transparent text-white hover:border-white/30'
                    )}
                  >
                    {item.highlighted ? (
                      <>
                        {/* Animated Border */}
                        <div
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                          style={{
                            background:
                              'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                            animation: 'border-flow 3s linear infinite',
                          }}
                        />

                        {/* Glass Morphism Background */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                      </>
                    ) : (
                      <>
                        {/* Multi-layer Glassmorphism */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-white/1 opacity-0 backdrop-blur-sm transition-opacity duration-700 group-hover:opacity-100" />

                        {/* Subtle Inner Border */}
                        <div className="absolute inset-0.5 rounded-[10px] bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </>
                    )}

                    <span className="relative z-10 transition-all duration-300">
                      {item.name}
                    </span>
                  </button>
                </Link>
              ))}

              <Link href="/start-project">
                <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-500 hover:shadow-2xl hover:shadow-white/25 cursor-pointer">
                  {/* Faster Shimmer System */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1s_ease-in-out]" />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.3s_ease-in-out_0.2s]" />

                  {/* Premium Inner Effects */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white to-white/95 transition-all duration-300 group-hover:from-white/98 group-hover:to-white/96" />

                  {/* Button Content */}
                  <span className="relative z-10 transition-all duration-300">
                    Start Project
                  </span>

                  {/* Premium Edge Ring */}
                  <div className="absolute inset-0 rounded-xl ring-1 ring-black/5 transition-all duration-300 group-hover:ring-black/10" />
                </button>
              </Link>
            </div>

            {/* Premium Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group relative rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-3 transition-all duration-300 hover:border-white/20 md:hidden"
              aria-label="Toggle mobile menu"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative z-10">
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 rotate-90 text-white transition-transform duration-200" />
                ) : (
                  <Menu className="h-5 w-5 text-white transition-transform duration-200" />
                )}
              </div>
            </button>
          </nav>

          {/* Ultra Premium Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="absolute top-full right-0 left-0 mx-6 mt-2 overflow-hidden rounded-2xl border border-white/10 md:hidden">
              {/* Mobile Menu Background */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-white/5" />

              <div className="relative z-10 space-y-1 p-6">
                {ENHANCED_NAVIGATION.primary.map((item, index) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group relative flex items-center rounded-xl px-4 py-3 transition-all duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {/* Mobile Menu Item Background */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-all duration-300 group-hover:opacity-100" />

                      {isActivePath(item.href) && (
                        <div className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 via-white/10 to-white/5" />
                      )}

                      <span
                        className={cn(
                          'relative z-10 text-base font-medium transition-colors duration-300',
                          isActivePath(item.href)
                            ? 'text-white'
                            : 'text-white/80 group-hover:text-white'
                        )}
                      >
                        {item.name}
                      </span>

                      {isActivePath(item.href) && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-white" />
                      )}
                    </Link>

                    {/* Mobile Dropdown Items */}
                    {item.dropdown && (
                      <div className="mt-2 ml-4 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              'block rounded-lg px-4 py-2 text-sm transition-colors duration-300',
                              dropdownItem.featured
                                ? 'border border-white/20 bg-white/10 text-white'
                                : 'text-white/60 hover:bg-white/5 hover:text-white/80'
                            )}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Buttons */}
                <div className="space-y-3 border-t border-white/10 pt-6">
                  {ENHANCED_NAVIGATION.secondary.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <button
                        className={cn(
                          'group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300 cursor-pointer',
                          item.highlighted
                            ? 'border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5'
                            : 'border border-white/15 bg-transparent text-white'
                        )}
                      >
                        {item.highlighted ? (
                          <>
                            {/* Animated Border */}
                            <div
                              className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                              style={{
                                background:
                                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                                animation: 'border-flow 3s linear infinite',
                              }}
                            />

                            {/* Glass Morphism Background */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-white/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                          </>
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        )}
                        <span className="relative z-10">{item.name}</span>
                      </button>
                    </Link>
                  ))}

                  <Link
                    href="/start-project"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <button className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-500 cursor-pointer">
                      {/* Faster Shimmer System */}
                      <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1s_ease-in-out]" />
                      <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.3s_ease-in-out_0.2s]" />
                      <span className="relative z-10">Start Project</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
