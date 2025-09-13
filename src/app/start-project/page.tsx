import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'Start a Project - Absterco',
  description:
    "Begin your digital transformation journey with Absterco. Tell us about your project and let's create something extraordinary.",
};

export default function StartProject() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="New Project"
          title="Let's Build Something Amazing"
          description="Share your vision with us and we'll help bring it to life with precision and elegance."
          primaryCTA={{
            text: 'info@absterco.com',
            href: 'mailto:info@absterco.com',
          }}
          secondaryCTA={{
            text: 'Schedule Discovery Call',
            href: '/booking',
          }}
          showScrollIndicator={false}
        />

        {/* Project Form - Coming Soon */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl text-center">
            <p className="text-lg text-white/70">
              Detailed project inquiry form coming soon. For now, reach out
              directly at info@absterco.com with your project details and
              we&apos;ll schedule a discovery call.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
