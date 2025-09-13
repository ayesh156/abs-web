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
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
  {
    title: 'FinanceFlow',
    description:
      'AI-powered financial analytics platform for enterprise clients.',
    category: 'Web Application',
    image:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'TypeScript', 'AI/ML', 'PostgreSQL'],
    href: '/work/financeflow',
    external: 'https://financeflow.demo',
  },
  {
    title: 'MedConnect',
    description:
      'Telemedicine platform connecting patients with healthcare providers.',
    category: 'Mobile App',
    image:
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React Native', 'Node.js', 'WebRTC', 'MongoDB'],
    href: '/work/medconnect',
    external: 'https://medconnect.demo',
  },
  {
    title: 'RetailAI',
    description:
      'Computer vision solution for inventory management and analytics.',
    category: 'AI Platform',
    image:
      'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Python', 'TensorFlow', 'Computer Vision', 'AWS'],
    href: '/work/retailai',
    external: 'https://retailai.demo',
  },
];

export default function FeaturedWork() {
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
    <section ref={sectionRef} className="section-padding bg-black-rich">
      <div className="container-padding mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="scroll-reveal text-section mb-6">Featured Work</h2>
          <p className="scroll-reveal text-body-large mx-auto max-w-3xl text-white/70">
            A selection of our recent projects showcasing the art of digital
            purity.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="scroll-reveal group overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6 h-48 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
              </div>

              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
                    {project.category}
                  </span>
                  <Link
                    href={project.external}
                    className="opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ExternalLink className="h-4 w-4 text-white/70 hover:text-white" />
                  </Link>
                </div>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/10 px-2 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link href={project.href}>
                  <Button
                    variant="ghost"
                    className="group w-full justify-between"
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/work">
            <Button size="lg" className="scroll-reveal">
              View All Work
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
