import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import FloatingContactButton from '@/components/ui/FloatingContactButton';
import Preloader from '@/components/ui/Preloader';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Absterco - The Art of Digital Purity',
  description:
    'Premium digital engineering agency specializing in web apps, mobile apps, and AI-driven platforms. Refined software solutions through code quality, design clarity, and precision thinking.',
  keywords: [
    'web development',
    'mobile apps',
    'AI platforms',
    'digital engineering',
    'software development',
  ],
  authors: [{ name: 'Absterco' }],
  creator: 'Absterco',
  publisher: 'Absterco',
  metadataBase: new URL('https://absterco.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://absterco.com',
    title: 'Absterco - The Art of Digital Purity',
    description:
      'Premium digital engineering agency specializing in refined software solutions.',
    siteName: 'Absterco',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Absterco - The Art of Digital Purity',
    description:
      'Premium digital engineering agency specializing in refined software solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Preloader>
          {children}
          <FloatingContactButton />
        </Preloader>
      </body>
    </html>
  );
}
