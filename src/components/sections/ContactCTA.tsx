import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/brand';
import { ArrowRight, Mail, Calendar, Globe } from 'lucide-react';

export default function ContactCTA() {
  return (
    <section className="bg-black-rich relative overflow-hidden py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-white/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Headline */}
          <h2 className="mb-8 text-4xl leading-tight font-light text-white md:text-5xl lg:text-6xl">
            Let&apos;s Create Something
            <br />
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            {COPY.global.ready}
          </p>

          {/* Global Availability Info */}
          <div className="mb-12 flex items-center justify-center space-x-2">
            <Globe className="h-4 w-4 text-white/50" />
            <span className="text-sm text-white/50">
              Available across US EST and Asia Pacific time zones
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Link href="/start-project">
              <Button
                variant="primary"
                size="xl"
                className="group min-w-[200px]"
              >
                Start a Project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="xl"
                className="group min-w-[200px]"
              >
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-col items-center justify-center gap-6 text-sm sm:flex-row">
            <Link
              href="/booking"
              className="group flex items-center text-white/60 transition-colors hover:text-white"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule a Call
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>

            <span className="text-white/30">•</span>

            <Link
              href="mailto:info@absterco.com"
              className="flex items-center text-white/60 transition-colors hover:text-white"
            >
              info@absterco.com
            </Link>

            <span className="text-white/30">•</span>

            <Link
              href="/work"
              className="group flex items-center text-white/60 transition-colors hover:text-white"
            >
              View Our Work
              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
