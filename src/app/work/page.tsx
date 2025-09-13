import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'Work - Absterco',
  description:
    'Explore our portfolio of refined digital solutions. Web applications, mobile apps, and AI platforms crafted with precision.',
};

export default function Work() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Our Portfolio"
          title="Digital Artistry in Action"
          description="A curated selection of projects showcasing our commitment to precision, elegance, and technical excellence."
          primaryCTA={{
            text: 'View Case Studies',
            href: '/case-studies',
          }}
          secondaryCTA={{
            text: 'Start Your Project',
            href: '/start-project',
          }}
          showScrollIndicator={false}
        />

        {/* Portfolio Grid - Coming Soon */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl text-center">
            <p className="text-lg text-white/70">
              Portfolio showcase coming soon. Our featured work is currently
              being refined to showcase the art of digital purity.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
