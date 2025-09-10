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
import {
  Download,
  FileText,
  CheckSquare,
  BarChart,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources - Absterco',
  description:
    'Free resources, guides, templates, and tools for digital product development. Whitepapers, checklists, and frameworks.',
};

const resourceCategories = [
  {
    icon: FileText,
    title: 'Whitepapers & Guides',
    description: 'In-depth insights on digital strategy and development',
    resources: [
      {
        title: 'The Art of Digital Purity',
        description: 'Our philosophy on refined software development',
        type: 'PDF Guide',
        downloadUrl: '#',
      },
      {
        title: 'Modern Web Performance Guide',
        description: 'Comprehensive guide to web optimization',
        type: 'PDF Guide',
        downloadUrl: '#',
      },
      {
        title: 'AI Integration Strategies',
        description: 'How to successfully integrate AI into your product',
        type: 'Whitepaper',
        downloadUrl: '#',
      },
    ],
  },
  {
    icon: CheckSquare,
    title: 'Checklists & Templates',
    description: 'Practical tools for project planning and execution',
    resources: [
      {
        title: 'Project Discovery Checklist',
        description: 'Essential questions for project planning',
        type: 'PDF Checklist',
        downloadUrl: '#',
      },
      {
        title: 'Technical Requirements Template',
        description: 'Structured approach to gathering requirements',
        type: 'Document Template',
        downloadUrl: '#',
      },
      {
        title: 'Launch Readiness Checklist',
        description: 'Pre-launch verification and testing guide',
        type: 'PDF Checklist',
        downloadUrl: '#',
      },
    ],
  },
  {
    icon: BarChart,
    title: 'Industry Reports',
    description: 'Market insights and technology trends',
    resources: [
      {
        title: 'State of Web Development 2025',
        description: 'Annual report on web development trends',
        type: 'Industry Report',
        downloadUrl: '#',
      },
      {
        title: 'Mobile App Performance Benchmarks',
        description: 'Performance standards across industries',
        type: 'Benchmark Report',
        downloadUrl: '#',
      },
      {
        title: 'AI Adoption in Enterprise',
        description: 'How companies are implementing AI solutions',
        type: 'Research Report',
        downloadUrl: '#',
      },
    ],
  },
];

const featuredResources = [
  {
    title: 'Digital Strategy Framework',
    description:
      'A comprehensive framework for planning your digital transformation journey. Includes templates, checklists, and best practices.',
    type: 'Complete Framework',
    featured: true,
  },
  {
    title: 'Performance Optimization Toolkit',
    description:
      'Tools and techniques for optimizing web and mobile application performance. Includes code examples and measurement tools.',
    type: 'Developer Toolkit',
    featured: true,
  },
];

export default function Resources() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Free Resources"
          title="Knowledge & Insights"
          description="Curated resources, guides, and tools to help you build better digital products. Free downloads from our team of experts."
          primaryCTA={{
            text: 'Browse All Resources',
            href: '#resources',
          }}
          secondaryCTA={{
            text: 'Subscribe to Updates',
            href: '#newsletter',
          }}
          showScrollIndicator={false}
        />

        {/* Featured Resources */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl">
            <h2 className="text-section mb-16 text-center">
              Featured Resources
            </h2>
            <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
              {featuredResources.map((resource, index) => (
                <Card
                  key={resource.title}
                  className="scroll-reveal border-accent-green"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-accent-green text-xs font-medium tracking-wide uppercase">
                        {resource.type}
                      </span>
                      <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
                        Featured
                      </span>
                    </div>
                    <CardTitle className="text-2xl">{resource.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="group w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Free
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section id="resources" className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-7xl">
            <div className="space-y-20">
              {resourceCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.title}
                    className="scroll-reveal"
                    style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                  >
                    <div className="mb-12 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-white/10">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-component mb-4">{category.title}</h3>
                      <p className="mx-auto max-w-2xl text-white/70">
                        {category.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                      {category.resources.map((resource, index) => (
                        <Card
                          key={resource.title}
                          className="scroll-reveal"
                          style={{
                            animationDelay: `${(categoryIndex * 3 + index) * 0.05}s`,
                          }}
                        >
                          <CardHeader>
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-xs font-medium tracking-wide text-white/50 uppercase">
                                {resource.type}
                              </span>
                              <Download className="h-4 w-4 text-white/30" />
                            </div>
                            <CardTitle>{resource.title}</CardTitle>
                            <CardDescription>
                              {resource.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Button variant="ghost" className="group w-full">
                              Download
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section id="newsletter" className="section-padding">
          <div className="container-padding mx-auto max-w-2xl text-center">
            <h2 className="text-section mb-6">Stay Updated</h2>
            <p className="text-body-large mb-8 text-white/70">
              Get notified when we publish new resources, guides, and insights.
              No spam, just valuable content for digital builders.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="focus:border-accent-green flex-1 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 focus:outline-none"
              />
              <Button className="group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-white/50">
              Join 500+ digital builders who trust our insights
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
