import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { COPY } from '@/constants/brand';
import { Globe, Users, Award, ArrowRight } from 'lucide-react';

const stats = [
  {
    icon: Globe,
    value: '24/7',
    label: 'Global Coverage',
    description: 'Follow-the-sun development',
  },
  {
    icon: Users,
    value: '50+',
    label: 'Projects Delivered',
    description: 'Across multiple industries',
  },
  {
    icon: Award,
    value: '99%',
    label: 'Client Satisfaction',
    description: 'Measured by project success',
  },
];

export default function AboutPreview() {
  return (
    <section className="bg-black py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div>
            <h2 className="mb-8 text-4xl leading-tight font-light text-white md:text-5xl lg:text-6xl">
              {COPY.about.headline}
            </h2>

            <p className="mb-8 text-lg leading-relaxed text-white/70 md:text-xl">
              {COPY.about.description}
            </p>

            <div className="mb-10 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                <div>
                  <h3 className="mb-2 font-medium text-white">
                    Global Expertise, Local Precision
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    Our distributed team combines American business acumen with
                    Sri Lankan engineering excellence.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                <div>
                  <h3 className="mb-2 font-medium text-white">
                    Time Zone Advantage
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    Follow-the-sun development means faster delivery and
                    continuous progress on your projects.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                <div>
                  <h3 className="mb-2 font-medium text-white">
                    Quality Without Compromise
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    Every line of code, every design decision, every user
                    interaction is intentional and refined.
                  </p>
                </div>
              </div>
            </div>

            <Link href="/about">
              <Button variant="outline" size="lg" className="group">
                Learn Our Story
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center space-x-6 rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
                      <Icon className="h-8 w-8 text-white/70" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-2xl font-light text-white">
                      {stat.value}
                    </div>
                    <div className="mb-1 font-medium text-white/90">
                      {stat.label}
                    </div>
                    <div className="text-sm text-white/60">
                      {stat.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
