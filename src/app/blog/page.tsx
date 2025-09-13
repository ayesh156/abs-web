import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPageClient from './BlogPageClient';

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <BlogPageClient />
      </main>
      <Footer />
    </>
  );
}
