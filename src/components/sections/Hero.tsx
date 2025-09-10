'use client';

import { useEffect, useRef } from 'react';
import { COPY } from '@/constants/brand';
import { ArrowDown, Sparkles, Zap, Globe, Rocket, Briefcase, Award, Users, Clock, TrendingUp, Star, Shield } from 'lucide-react';
import Link from 'next/link';

interface HeroProps {
  subtitle?: string;
  title?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  showScrollIndicator?: boolean;
}

export default function Hero({
  subtitle,
  title,
  description,
  primaryCTA,
  secondaryCTA,
  showScrollIndicator = true,
}: HeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Parallax effect for background elements
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');

      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (element as HTMLElement).style.transform =
          `translate3d(0, ${yPos}px, 0)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      {/* Ultra Premium Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(images/hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.1) brightness(1.05)',
          }}
        />
        
        {/* Transparent Backdrop Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.4px]" />

        {/* Primary Gradient Orb */}
        <div
          className="parallax absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent blur-3xl"
          data-speed="0.3"
        />

        {/* Secondary Gradient Orb */}
        <div
          className="parallax absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-gradient-to-tl from-white/15 via-white/8 to-transparent blur-3xl"
          data-speed="0.5"
        />

        {/* Tertiary Accent */}
        <div
          className="parallax absolute top-2/3 left-2/3 h-64 w-64 rounded-full bg-gradient-to-r from-white/10 to-transparent blur-2xl"
          data-speed="0.4"
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)] bg-[size:100px_100px]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-8">
        <div
          className={`grid grid-cols-1 ${!title ? 'lg:grid-cols-12' : 'lg:grid-cols-1'} items-center gap-8`}
        >
          {/* Left Column - Main Content */}
          <div className={`${!title ? 'lg:col-span-7' : ''} space-y-8`}>
            {/* Premium Badge */}
            {subtitle && (
              <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                <span>{subtitle}</span>
              </div>
            )}

            {!subtitle && (
              <div className="inline-flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />
                <span>Digital Solutions Agency</span>
              </div>
            )}

            {/* Hero Headline */}
            <div className="space-y-4">
              {title ? (
                <h1 className="text-5xl leading-[0.9] font-light tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
                  <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
              ) : (
                <h1 className="text-5xl leading-[0.9] font-light tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
                  <span className="block text-white">The Art of</span>
                  <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                    Digital Purity
                  </span>
                </h1>
              )}

              <div className="mt-6 h-px w-24 bg-gradient-to-r from-white to-transparent" />
            </div>

            {/* Description */}
            <p className="max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              {description || COPY.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-start gap-4 pt-4 sm:flex-row">
              <Link href={primaryCTA?.href || '/start-project'}>
                <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-white px-8 py-4 text-lg font-medium text-black transition-all duration-500 hover:shadow-2xl hover:shadow-white/20">
                  {/* Faster Shimmer Layers */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1s_ease-in-out]" />
                  <div className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.3s_ease-in-out_0.2s]" />

                  {/* Subtle Inner Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* Magnetic Cursor Effect Area */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Button Content */}
                  <span className="relative z-10 flex items-center">
                    {primaryCTA?.text || 'Start Your Project'}
                    <Rocket className="ml-2 h-5 w-5 transition-all duration-300" />
                  </span>

                  {/* Edge Highlight */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/20" />
                </button>
              </Link>

              <Link href={secondaryCTA?.href || '/work'}>
                <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-transparent px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5">
                  {/* Animated Border */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                      animation: 'border-flow 3s linear infinite',
                    }}
                  />

                  {/* Glass Morphism Background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100" />

                  <span className="relative z-10 flex items-center">
                    {secondaryCTA?.text || 'View Our Work'}
                    <Briefcase className="ml-2 h-5 w-5 transition-all duration-300" />
                  </span>
                </button>
              </Link>
            </div>

            {/* Stats Inline */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2 text-sm text-white/50">
                <Globe className="h-4 w-4" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/50">
                <Zap className="h-4 w-4" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>

          {/* Right Column - Premium Showcase Cards */}
          {!title && (
            <div className="lg:col-span-5">
              <div className="grid h-[420px] grid-cols-2 gap-4">
                {/* Featured Achievement - Spans Full Width */}
                <div className="group relative col-span-2 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/4 to-white/2 p-8 backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-white/5">
                  {/* Premium Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/3 via-white/1 to-transparent" />

                  {/* Multi-layer Shimmer */}
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-1500 group-hover:translate-x-full group-hover:opacity-100" />
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-2000 delay-300 group-hover:translate-x-full group-hover:opacity-100" />

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 opacity-20 transition-all duration-700 group-hover:opacity-40 group-hover:rotate-12 group-hover:scale-110">
                    <Award className="h-8 w-8 text-yellow-400" />
                  </div>

                  {/* Enhanced Glow */}
                  <div className="absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-400/15 via-white/5 to-transparent blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <div className="mb-3 flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
                          <span className="text-xs font-semibold tracking-wide text-white/80 uppercase">Full-Stack Development</span>
                        </div>
                      </div>

                      <div className="mb-3 flex items-baseline space-x-2">
                        <div className="text-4xl font-light text-white transition-all duration-300 group-hover:text-white/95">
                          Web Apps
                        </div>
                      </div>

                      <p className="text-sm leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                        Next.js, React, Node.js applications with modern UI/UX design and scalable architecture
                      </p>
                    </div>

                    {/* Service Highlights */}
                    <div className="flex items-center space-x-4 pt-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs text-white/50">TypeScript</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-blue-400" />
                        <span className="text-xs text-white/50">Tailwind CSS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Trust Score */}
                <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-white/6 via-white/3 to-white/2 p-6 backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:border-white/15 hover:shadow-xl hover:shadow-blue-500/5">
                  {/* Enhanced Glassmorphism */}
                  <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/4 via-white/2 to-transparent" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1200 group-hover:translate-x-full group-hover:opacity-100" />

                  {/* Floating Icon */}
                  <div className="absolute -top-2 -right-2 opacity-15 transition-all duration-500 group-hover:opacity-30 group-hover:rotate-6">
                    <Shield className="h-6 w-6 text-blue-400" />
                  </div>

                  {/* Enhanced Glow */}
                  <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-2 text-3xl font-light text-white transition-all duration-300 group-hover:text-white/95">
                        Custom
                      </div>
                      <div className="text-xs font-medium text-white/70 mb-3">
                        UI/UX Design
                      </div>

                      {/* Design Tools */}
                      <div className="flex items-center space-x-1 mb-3">
                        {['Figma', 'Adobe', 'Sketch'].map((tool, i) => (
                          <div
                            key={i}
                            className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-blue-400/20 to-blue-300/20 text-blue-300 transition-all duration-300 group-hover:scale-105"
                            style={{ transitionDelay: `${i * 100}ms` }}
                          >
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-white/50">
                      <Users className="h-3 w-3" />
                      <span>User-Centered Design</span>
                    </div>
                  </div>
                </div>

                {/* Lightning Response */}
                <div className="group relative overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-br from-white/6 via-white/3 to-white/2 p-6 backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:border-white/15 hover:shadow-xl hover:shadow-purple-500/5">
                  {/* Enhanced Glassmorphism */}
                  <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-br from-white/4 via-white/2 to-transparent" />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-all duration-1200 group-hover:translate-x-full group-hover:opacity-100" />

                  {/* Floating Icon */}
                  <div className="absolute -top-2 -right-2 opacity-15 transition-all duration-500 group-hover:opacity-30 group-hover:-rotate-12">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>

                  {/* Enhanced Glow */}
                  <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-2 text-3xl font-light text-white transition-all duration-300 group-hover:text-white/95">
                        API
                      </div>
                      <div className="text-xs font-medium text-white/70 mb-3">
                        Development
                      </div>

                      {/* Tech Stack */}
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="h-1 w-8 rounded-full bg-gradient-to-r from-purple-400/30 to-purple-400/60">
                          <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-400 to-purple-300" />
                        </div>
                        <span className="text-xs text-white/60">RESTful & GraphQL</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-white/50">
                      <Clock className="h-3 w-3" />
                      <span>Scalable Backend</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="absolute mb-16 left-1/2 flex -translate-x-1/2 transform flex-col items-center space-y-2">
            <span className="text-xs tracking-wide text-white/40">SCROLL</span>
            <div className="h-4 w-px bg-gradient-to-b from-white/40 to-transparent" />
            <ArrowDown className="h-2 w-4 animate-bounce text-white/40" />
          </div>
        )}

        {/* Bottom Section - Premium Trust Indicators */}
        {!title && (
          <div className="mt-20 space-y-16">
            {/* Premium Statistics Section */}
            <div className="relative">
              <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                  {[
                    { metric: '20+', label: 'Projects Delivered' },
                    { metric: '98%', label: 'Client Satisfaction' },
                    { metric: '24/7', label: 'Premium Support' }
                  ].map((stat, i) => (
                    <div key={i} className="group text-center">
                      <div className="relative inline-block">
                        {/* Metric Display */}
                        <div className="text-4xl font-light text-white transition-all duration-500 group-hover:scale-110 lg:text-5xl">
                          {stat.metric}
                        </div>

                        {/* Underline Effect */}
                        <div className="mx-auto mt-2 h-px w-0 bg-gradient-to-r from-white/40 to-white/20 transition-all duration-700 group-hover:w-16" />
                      </div>

                      <p className="mt-3 text-sm text-white/50 transition-colors duration-300 group-hover:text-white/70">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Edge Gradients for Depth */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
