import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ServicesOverview from '@/components/sections/ServicesOverview';
import FeaturedWork from '@/components/sections/FeaturedWork';
import AboutPreview from '@/components/sections/AboutPreview';
import ContactCTA from '@/components/sections/ContactCTA';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <Hero />
        <ServicesOverview />
        <FeaturedWork />
        <AboutPreview />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
