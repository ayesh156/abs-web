import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - Absterco',
  description:
    'Transparent, value-driven pricing for web development, mobile apps, and AI solutions. Custom packages tailored to your needs.',
};

const pricingTiers = [
  {
    name: 'Web Development',
    description: 'Modern web applications with premium design and performance',
    startingPrice: '$15,000',
    timeline: '8-16 weeks',
    features: [
      'Custom design and development',
      'React & Next.js implementation',
      'Responsive across all devices',
      'SEO optimization',
      'Performance optimization',
      'Content management system',
      '3 months post-launch support',
      'Analytics integration',
    ],
    popular: false,
  },
  {
    name: 'Mobile Applications',
    description: 'Native and cross-platform mobile experiences',
    startingPrice: '$25,000',
    timeline: '12-20 weeks',
    features: [
      'iOS and Android development',
      'React Native or native development',
      'App Store submission',
      'Push notifications',
      'Offline functionality',
      'Analytics and crash reporting',
      '6 months post-launch support',
      'App Store optimization',
    ],
    popular: true,
  },
  {
    name: 'AI Solutions',
    description: 'Intelligent platforms powered by machine learning',
    startingPrice: '$35,000',
    timeline: '16-24 weeks',
    features: [
      'Custom AI model development',
      'API integration and deployment',
      'Data processing pipelines',
      'Machine learning optimization',
      'Scalable cloud infrastructure',
      'Performance monitoring',
      '12 months technical support',
      'Continuous model improvement',
    ],
    popular: false,
  },
];

const additionalServices = [
  {
    name: 'Digital Strategy Consulting',
    price: 'From $5,000',
    description: 'Strategic planning and technical architecture guidance',
  },
  {
    name: 'Maintenance & Support',
    price: 'From $2,000/month',
    description: 'Ongoing updates, monitoring, and technical support',
  },
  {
    name: 'Performance Optimization',
    price: 'From $8,000',
    description: 'Speed optimization and technical debt resolution',
  },
];

export default function Pricing() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Transparent Pricing"
          title="Value-Driven Investment"
          description="Clear, honest pricing for refined digital solutions. Every project is tailored to your specific needs and goals."
          primaryCTA={{
            text: 'Get Custom Quote',
            href: '/start-project',
          }}
          secondaryCTA={{
            text: 'Schedule Consultation',
            href: '/contact',
          }}
          showScrollIndicator={false}
        />

        {/* Pricing Tiers */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {pricingTiers.map((tier, index) => (
                <Card
                  key={tier.name}
                  className={`scroll-reveal relative ${tier.popular ? 'border-accent-green' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                      <span className="bg-accent-green rounded-full px-4 py-1 text-sm font-medium text-black">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {tier.description}
                    </CardDescription>
                    <div className="pt-4">
                      <div className="mb-2 text-4xl font-light text-white">
                        {tier.startingPrice}
                      </div>
                      <div className="text-sm text-white/60">
                        {tier.timeline}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="mb-8 space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="text-accent-green mt-0.5 mr-3 h-5 w-5 flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/start-project">
                      <Button
                        variant={tier.popular ? 'primary' : 'secondary'}
                        className="group w-full"
                      >
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-4xl">
            <h2 className="text-section mb-16 text-center">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {additionalServices.map((service, index) => (
                <Card
                  key={service.name}
                  className="scroll-reveal text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{service.name}</CardTitle>
                    <div className="text-accent-green mt-2 text-2xl font-light">
                      {service.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Philosophy */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <h2 className="text-section mb-8">Our Pricing Philosophy</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div>
                <h3 className="text-component mb-4">Transparent & Fair</h3>
                <p className="text-white/70">
                  No hidden costs or surprise fees. Every project includes
                  detailed estimates with clear deliverables and timelines.
                </p>
              </div>
              <div>
                <h3 className="text-component mb-4">Value-Focused</h3>
                <p className="text-white/70">
                  Our pricing reflects the long-term value we deliver through
                  quality code, thoughtful design, and strategic thinking.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <p className="text-body-large mb-8 text-white/70">
                Every project is unique. These starting prices provide a
                foundation, but we&apos;ll create a custom proposal tailored to
                your specific needs.
              </p>
              <Link href="/start-project">
                <Button size="lg" className="group">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
