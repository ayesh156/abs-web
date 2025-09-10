import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'Contact - Absterco',
  description:
    'Get in touch with our globally distributed team. Available across multiple time zones for your digital project needs.',
};

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Get in Touch"
          title="Let's Create Something Extraordinary"
          description="Connect with our globally distributed team. We're available across multiple time zones to discuss your project."
          primaryCTA={{
            text: 'info@absterco.com',
            href: 'mailto:info@absterco.com',
          }}
          secondaryCTA={{
            text: 'Schedule Call',
            href: '/booking',
          }}
          showScrollIndicator={false}
        />

        {/* Contact Content - Coming Soon */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl text-center">
            <p className="text-lg text-white/70">
              Contact form and detailed information coming soon. For now, reach
              out directly at info@absterco.com and we&apos;ll respond within 24
              hours.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
