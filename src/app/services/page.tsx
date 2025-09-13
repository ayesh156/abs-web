import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'Services - Absterco',
  description:
    'Premium digital engineering services: web development, mobile apps, AI solutions, and digital strategy consulting.',
};

export default function Services() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Our Services"
          title="Refined Solutions for Modern Challenges"
          description="We specialize in crafting elegant, intentional software solutions that work flawlessly under pressure."
          primaryCTA={{
            text: 'Get Estimate',
            href: '/estimates',
          }}
          secondaryCTA={{
            text: 'Our Process',
            href: '/process',
          }}
          showScrollIndicator={false}
        />

        {/* Services Content - Coming Soon */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl text-center">
            <p className="text-lg text-white/70">
              Detailed services pages coming soon. Each service will be crafted
              with the same attention to detail we bring to our client work.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
