import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'Client Portal - Absterco',
  description:
    'Secure client portal for project management, file sharing, and communication with the Absterco team.',
};

export default function Portal() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Client Portal"
          title="Your Project Command Center"
          description="Secure access to project status, files, communications, and billing information."
          primaryCTA={{
            text: 'Login',
            href: '/portal/login',
          }}
          secondaryCTA={{
            text: 'Request Access',
            href: '/contact',
          }}
          showScrollIndicator={false}
        />

        {/* Portal Content - Coming Soon */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl text-center">
            <p className="text-lg text-white/70">
              Client portal coming soon. This secure platform will provide
              real-time access to your project status, files, and team
              communications.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
