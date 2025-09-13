import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'FAQ - Absterco',
  description:
    'Frequently asked questions about our services, process, pricing, and technical approach. Get answers to common questions.',
};

const faqCategories = [
  {
    title: 'General Questions',
    questions: [
      {
        question: 'What makes Absterco different from other agencies?',
        answer:
          'We focus on the art of digital purity - refined solutions through code quality, design clarity, and precision thinking. Our globally distributed team combines American business acumen with Sri Lankan engineering excellence, providing 24/7 development cycles without compromising quality.',
      },
      {
        question: 'What types of projects do you work on?',
        answer:
          'We specialize in web applications, mobile apps, and AI-powered platforms. From startup MVPs to enterprise-scale solutions, we craft elegant, intentional software that works flawlessly under pressure.',
      },
      {
        question: 'How do you ensure quality across a distributed team?',
        answer:
          'Quality is non-negotiable. We use rigorous code reviews, automated testing, continuous integration, and clear communication protocols. Every team member upholds our standards of precision and excellence.',
      },
    ],
  },
  {
    title: 'Project Process',
    questions: [
      {
        question: 'What is your typical project timeline?',
        answer:
          'Web applications: 8-16 weeks, Mobile apps: 12-20 weeks, AI solutions: 16-24 weeks. Timelines vary based on complexity and scope. We provide detailed project plans with clear milestones.',
      },
      {
        question: 'How do you handle project communication?',
        answer:
          "We believe in transparent, frequent communication. You'll have dedicated project channels, regular updates, and scheduled check-ins. Our global team ensures someone is always available during business hours.",
      },
      {
        question: 'What happens after the project launches?',
        answer:
          'We provide post-launch support ranging from 3-12 months depending on the project. This includes bug fixes, performance monitoring, and minor updates. We also offer ongoing maintenance packages.',
      },
    ],
  },
  {
    title: 'Pricing & Payment',
    questions: [
      {
        question: 'How do you determine project pricing?',
        answer:
          'Pricing is based on project complexity, timeline, and required expertise. We provide transparent estimates with detailed breakdowns. No hidden costs or surprise fees - everything is clearly outlined upfront.',
      },
      {
        question: 'What are your payment terms?',
        answer:
          'We typically work with milestone-based payments: 30% to start, 40% at midpoint, and 30% at completion. For larger projects, we can arrange custom payment schedules that work for your cash flow.',
      },
      {
        question: 'Do you offer fixed-price or hourly billing?',
        answer:
          'We prefer fixed-price projects with clear scope and deliverables. This provides predictability for both parties. For ongoing work or undefined scope, we offer hourly arrangements with transparent time tracking.',
      },
    ],
  },
  {
    title: 'Technical Support',
    questions: [
      {
        question: 'What technologies do you specialize in?',
        answer:
          'We focus on modern, proven technologies: React/Next.js for web, React Native for mobile, Python/Node.js for backend, and various AI/ML frameworks. We choose technologies based on project needs, not trends.',
      },
      {
        question: 'Do you provide ongoing maintenance?',
        answer:
          'Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, bug fixes, and feature enhancements. Our goal is long-term partnership, not just project delivery.',
      },
      {
        question: 'How do you handle data security and privacy?',
        answer:
          'Security is built into every project from day one. We follow industry best practices, conduct regular security audits, and ensure compliance with relevant regulations like GDPR and CCPA.',
      },
    ],
  },
];

export default function FAQ() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="Frequently Asked Questions"
          title="Everything You Need to Know"
          description="Clear answers to common questions about our services, process, and approach to digital excellence."
          primaryCTA={{
            text: 'Start a Project',
            href: '/start-project',
          }}
          secondaryCTA={{
            text: 'Contact Us',
            href: '/contact',
          }}
          showScrollIndicator={false}
        />

        {/* FAQ Categories */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="space-y-16">
              {faqCategories.map((category, categoryIndex) => (
                <div
                  key={category.title}
                  className="scroll-reveal"
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <h2 className="text-component mb-8 text-center">
                    {category.title}
                  </h2>
                  <div className="space-y-6">
                    {category.questions.map((faq, index) => (
                      <Card
                        key={index}
                        className="scroll-reveal"
                        style={{
                          animationDelay: `${(categoryIndex * 3 + index) * 0.05}s`,
                        }}
                      >
                        <CardHeader>
                          <CardTitle className="text-xl">
                            {faq.question}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="leading-relaxed text-white/70">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-2xl text-center">
            <h2 className="text-section mb-6">Still Have Questions?</h2>
            <p className="text-body-large mb-8 text-white/70">
              We&apos;re here to help. Reach out directly and we&apos;ll provide
              personalized answers to your specific questions and project needs.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:info@absterco.com"
                className="text-accent-green hover:text-accent-green/80 transition-colors"
              >
                info@absterco.com
              </a>
              <span className="hidden text-white/30 sm:block">•</span>
              <span className="text-white/60">Response within 24 hours</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
