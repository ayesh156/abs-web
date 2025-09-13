'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/constants/brand';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export default function AuthLayout({ 
  children, 
  title, 
  subtitle,
  showBackButton = true 
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Back Button */}
          {showBackButton && (
            <div className="mb-8">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 text-sm group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Absterco
              </Link>
            </div>
          )}

          {/* Logo */}
          <div className="mb-8">
            <Link href="/" className="block group">
              <Image
                src="/images/logo-lg.png"
                alt={BRAND.name}
                width={200}
                height={100}
                className="h-12 w-auto group-hover:opacity-80 transition-opacity duration-200"
                priority
              />
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl font-light tracking-tight text-white mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/70 leading-relaxed text-lg">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form */}
          <div className="space-y-8">
            {children}
          </div>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-black-rich via-black-soft to-black">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-white/10" />
        
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-green/5 rounded-full blur-3xl" />
          <div className="absolute top-3/4 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12">
          <div className="max-w-lg">
            <h2 className="text-4xl font-light tracking-tight text-white mb-6">
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {BRAND.tagline}
              </span>
            </h2>
            <p className="text-white/60 leading-relaxed text-lg">
              Access your admin dashboard to manage content, monitor analytics, 
              and control your digital presence with precision.
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute bottom-12 right-12 opacity-40">
            <div className="grid grid-cols-2 gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20" />
              <div className="w-16 h-16 rounded-xl bg-accent-green/20 backdrop-blur-sm border border-accent-green/30" />
              <div className="w-16 h-16 rounded-xl bg-accent-green/20 backdrop-blur-sm border border-accent-green/30" />
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
