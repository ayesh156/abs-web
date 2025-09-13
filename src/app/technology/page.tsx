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
import { Code, Database, Cloud, Smartphone, Brain, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Technology - Absterco',
  description:
    'Modern technology stack and tools we use to build refined digital solutions. React, Next.js, TypeScript, AI/ML, and cloud platforms.',
};

const techCategories = [
  {
    icon: Code,
    title: 'Frontend Excellence',
    description: 'Modern frameworks for exceptional user experiences',
    technologies: [
      {
        name: 'React & Next.js',
        description: 'Server-side rendering and optimal performance',
      },
      {
        name: 'TypeScript',
        description: 'Type-safe development and better code quality',
      },
      {
        name: 'Tailwind CSS',
        description: 'Utility-first styling for rapid development',
      },
      {
        name: 'Framer Motion',
        description: 'Smooth animations and micro-interactions',
      },
    ],
  },
  {
    icon: Database,
    title: 'Backend & APIs',
    description: 'Scalable server architecture and data management',
    technologies: [
      {
        name: 'Node.js & Python',
        description: 'High-performance server-side development',
      },
      {
        name: 'PostgreSQL & MongoDB',
        description: 'Robust data storage solutions',
      },
      {
        name: 'GraphQL & REST APIs',
        description: 'Efficient data fetching and integration',
      },
      {
        name: 'Prisma & Mongoose',
        description: 'Type-safe database access layers',
      },
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description: 'Scalable infrastructure and deployment pipelines',
    technologies: [
      {
        name: 'AWS & Vercel',
        description: 'Global edge deployment and serverless functions',
      },
      {
        name: 'Docker & Kubernetes',
        description: 'Containerized applications and orchestration',
      },
      {
        name: 'GitHub Actions',
        description: 'Automated testing and deployment workflows',
      },
      {
        name: 'Monitoring & Analytics',
        description: 'Performance tracking and error reporting',
      },
    ],
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications',
    technologies: [
      {
        name: 'React Native',
        description: 'Native performance with shared codebase',
      },
      { name: 'Expo', description: 'Rapid development and deployment tools' },
      {
        name: 'Native Modules',
        description: 'Platform-specific functionality integration',
      },
      {
        name: 'App Store Optimization',
        description: 'Publishing and distribution expertise',
      },
    ],
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Intelligent features and data-driven insights',
    technologies: [
      {
        name: 'OpenAI & Anthropic APIs',
        description: 'Large language model integration',
      },
      {
        name: 'TensorFlow & PyTorch',
        description: 'Custom machine learning models',
      },
      {
        name: 'Computer Vision',
        description: 'Image and video processing capabilities',
      },
      {
        name: 'Data Analytics',
        description: 'Business intelligence and reporting',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Security & Quality',
    description: 'Enterprise-grade security and testing practices',
    technologies: [
      {
        name: 'Authentication & Authorization',
        description: 'Secure user management systems',
      },
      {
        name: 'End-to-End Testing',
        description: 'Comprehensive quality assurance',
      },
      {
        name: 'Code Quality Tools',
        description: 'ESLint, Prettier, and automated reviews',
      },
      {
        name: 'Security Audits',
        description: 'Regular vulnerability assessments',
      },
    ],
  },
];

export default function Technology() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Our Technology Stack"
          title="Built with Modern Excellence"
          description="We leverage cutting-edge technologies and proven frameworks to deliver refined, scalable solutions that stand the test of time."
          primaryCTA={{
            text: 'View Our Work',
            href: '/work',
          }}
          secondaryCTA={{
            text: 'Start a Project',
            href: '/start-project',
          }}
          showScrollIndicator={false}
        />

        {/* Technology Categories */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {techCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card
                    key={category.title}
                    className="scroll-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.technologies.map((tech) => (
                          <div
                            key={tech.name}
                            className="border-l-2 border-white/10 pl-4"
                          >
                            <h4 className="mb-1 font-medium text-white">
                              {tech.name}
                            </h4>
                            <p className="text-sm text-white/60">
                              {tech.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why These Technologies */}
        <section className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <h2 className="text-section mb-8">Why These Technologies?</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div>
                <h3 className="text-component mb-4">Performance</h3>
                <p className="text-white/70">
                  Every technology choice is optimized for speed, scalability,
                  and user experience.
                </p>
              </div>
              <div>
                <h3 className="text-component mb-4">Reliability</h3>
                <p className="text-white/70">
                  Battle-tested frameworks and tools that power the world&apos;s
                  most demanding applications.
                </p>
              </div>
              <div>
                <h3 className="text-component mb-4">Future-Proof</h3>
                <p className="text-white/70">
                  Technologies with strong communities and long-term support for
                  sustainable growth.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
