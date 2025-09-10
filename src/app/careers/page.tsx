import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  MapPin,
  Clock,
  Users,
  ArrowRight,
  Globe,
  Heart,
  Zap,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers - Absterco',
  description:
    'Join our globally distributed team. Remote-first culture, competitive benefits, and the opportunity to work on refined digital solutions.',
};

const openPositions = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    description:
      'Lead development of complex web applications using React, Next.js, and Node.js. Work with our global team to deliver refined digital solutions.',
    requirements: [
      '5+ years full-stack experience',
      'React/Next.js expertise',
      'Node.js proficiency',
      'Remote work experience',
    ],
    slug: 'senior-fullstack-developer',
  },
  {
    title: 'Mobile App Developer',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    description:
      'Build exceptional mobile experiences using React Native. Collaborate with designers and backend developers to create polished applications.',
    requirements: [
      '3+ years React Native experience',
      'iOS/Android deployment',
      'Performance optimization',
      'UI/UX collaboration',
    ],
    slug: 'mobile-app-developer',
  },
  {
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    description:
      "Develop and deploy machine learning models and AI-powered features. Work on cutting-edge projects that push the boundaries of what's possible.",
    requirements: [
      'Python/TensorFlow expertise',
      'ML model deployment',
      'API development',
      'Cloud platforms (AWS/GCP)',
    ],
    slug: 'ai-ml-engineer',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (Global)',
    type: 'Full-time',
    description:
      'Create beautiful, intuitive user experiences that embody our philosophy of digital purity. Work closely with engineering teams.',
    requirements: [
      '5+ years product design',
      'Figma/Sketch proficiency',
      'Design systems experience',
      'User research skills',
    ],
    slug: 'product-designer',
  },
];

const benefits = [
  {
    icon: Globe,
    title: 'Remote-First Culture',
    description:
      "Work from anywhere in the world. We've been distributed from day one.",
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description:
      'Comprehensive health insurance, mental health support, and wellness stipends.',
  },
  {
    icon: Zap,
    title: 'Growth & Learning',
    description:
      'Annual learning budget, conference attendance, and mentorship programs.',
  },
  {
    icon: Users,
    title: 'Collaborative Team',
    description:
      'Work with talented individuals who share our passion for excellence.',
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description:
      'Flexible working hours that respect your time zone and work-life balance.',
  },
  {
    icon: MapPin,
    title: 'Global Opportunities',
    description:
      'Opportunity to work with clients and team members from around the world.',
  },
];

const values = [
  {
    title: 'Precision',
    description:
      'We believe every detail matters. From code quality to client communication, we strive for excellence in everything we do.',
  },
  {
    title: 'Collaboration',
    description:
      'Our globally distributed team works as one. We value diverse perspectives and inclusive decision-making.',
  },
  {
    title: 'Growth',
    description:
      "We invest in our team's development. Continuous learning and skill advancement are core to our culture.",
  },
  {
    title: 'Impact',
    description:
      'We work on projects that matter. Our solutions help businesses transform and users achieve their goals.',
  },
];

export default function Careers() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Join Our Team"
          title="Build the Future with Us"
          description="Join our globally distributed team of passionate builders creating refined digital solutions that matter."
          primaryCTA={{
            text: 'View Open Positions',
            href: '#positions',
          }}
          secondaryCTA={{
            text: 'Learn Our Culture',
            href: '#culture',
          }}
          showScrollIndicator={false}
        />

        {/* Company Culture */}
        <section id="culture" className="section-padding">
          <div className="container-padding mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-section mb-6">Our Culture</h2>
              <p className="text-body-large mx-auto max-w-3xl text-white/70">
                We&apos;re building more than software - we&apos;re crafting a
                culture of excellence, collaboration, and continuous growth
                across continents and time zones.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card
                  key={value.title}
                  className="scroll-reveal text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-white/70">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-section mb-6">Why Join Absterco?</h2>
              <p className="text-body-large mx-auto max-w-3xl text-white/70">
                We offer more than just a job - we provide an environment where
                you can do your best work while maintaining a healthy work-life
                balance.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={benefit.title}
                    className="scroll-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/70">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="positions" className="section-padding">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="text-section mb-6">Open Positions</h2>
              <p className="text-body-large text-white/70">
                We&apos;re always looking for talented individuals who share our
                passion for creating exceptional digital experiences.
              </p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <Card
                  key={position.slug}
                  className="scroll-reveal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="mb-2 text-xl">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {position.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {position.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <Button variant="secondary" className="group">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-white/70">{position.description}</p>
                    <div>
                      <h4 className="mb-2 font-medium text-white">
                        Key Requirements:
                      </h4>
                      <ul className="space-y-1">
                        {position.requirements.map((req, reqIndex) => (
                          <li
                            key={reqIndex}
                            className="flex items-center text-sm text-white/60"
                          >
                            <span className="mr-3 h-1.5 w-1.5 rounded-full bg-white/40" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-4xl text-center">
            <h2 className="text-section mb-8">Application Process</h2>
            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="scroll-reveal" style={{ animationDelay: '0.1s' }}>
                <div className="bg-accent-green mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full font-bold text-black">
                  1
                </div>
                <h3 className="mb-2 text-xl font-medium">Apply</h3>
                <p className="text-white/70">
                  Submit your application with portfolio and relevant
                  experience.
                </p>
              </div>
              <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="bg-accent-green mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full font-bold text-black">
                  2
                </div>
                <h3 className="mb-2 text-xl font-medium">Interview</h3>
                <p className="text-white/70">
                  Technical and cultural fit interviews with our team.
                </p>
              </div>
              <div className="scroll-reveal" style={{ animationDelay: '0.3s' }}>
                <div className="bg-accent-green mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full font-bold text-black">
                  3
                </div>
                <h3 className="mb-2 text-xl font-medium">Welcome</h3>
                <p className="text-white/70">
                  Join our team and start building amazing things together.
                </p>
              </div>
            </div>

            <div className="scroll-reveal">
              <p className="mb-8 text-white/70">
                Don&apos;t see a position that fits? We&apos;re always
                interested in hearing from talented individuals who share our
                values.
              </p>
              <a href="mailto:careers@absterco.com">
                <Button size="lg" className="group">
                  Send Us Your Resume
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
