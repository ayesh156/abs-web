'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center">
        <div className="container-padding mx-auto max-w-2xl text-center">
          <h1 className="mb-8 text-8xl font-light text-white/20">404</h1>
          <h2 className="text-section mb-6">Page Not Found</h2>
          <p className="text-body-large mb-12 text-white/70">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/">
              <Button size="lg" className="group">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.history.back()}
              className="group"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
