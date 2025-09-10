'use client';

import { useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Code, Smartphone, Brain, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Code,
    title: 'Web Development',
    description:
      'Modern web applications built with precision and performance in mind.',
    features: [
      'React & Next.js',
      'TypeScript',
      'Tailwind CSS',
      'API Integration',
    ],
    href: '/services/web-development',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description:
      'Native and cross-platform mobile experiences that users love.',
    features: [
      'React Native',
      'iOS & Android',
      'App Store Optimization',
      'Push Notifications',
    ],
    href: '/services/mobile-apps',
  },
  {
    icon: Brain,
    title: 'AI Solutions',
    description: 'Intelligent platforms powered by machine learning and AI.',
    features: [
      'Machine Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Data Analytics',
    ],
    href: '/services/ai-solutions',
  },
];

export default function ServicesOverview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="scroll-reveal text-section mb-6">Refined Solutions</h2>
          <p className="scroll-reveal text-body-large mx-auto max-w-3xl text-white/70">
            We craft elegant, intentional software solutions that work
            flawlessly under pressure. Every line of code, every design
            decision, every user interaction is intentional.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                className="scroll-reveal group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-white/20">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-white/60"
                      >
                        <span className="mr-3 h-1.5 w-1.5 rounded-full bg-white/40" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button
                      variant="ghost"
                      className="group w-full justify-between"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button size="lg" variant="secondary" className="scroll-reveal">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
