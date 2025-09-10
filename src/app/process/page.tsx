import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'Process - Absterco',
  description:
    'Our proven methodology: Discovery, Design, Development, Deployment. Learn how we deliver refined digital solutions.',
};

export default function Process() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Our Methodology"
          title="Precision Through Process"
          description="A proven approach to delivering refined digital solutions through careful planning, iterative development, and continuous refinement."
          primaryCTA={{
            text: 'Start a Project',
            href: '/start-project',
          }}
          secondaryCTA={{
            text: 'View Work',
            href: '/work',
          }}
          showScrollIndicator={false}
        />

        {/* Process Content - Coming Soon */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl text-center">
            <p className="text-lg text-white/70">
              Detailed process documentation coming soon. Our methodology will
              be presented with the same clarity and precision we bring to every
              project.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
