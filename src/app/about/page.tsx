import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'About - Absterco',
  description:
    "Learn about Absterco's mission, values, and globally distributed team. Borderless innovation meets local precision.",
};

export default function About() {
  return (
    <>
      <Header />
      <main>
        <Hero
          subtitle="About Absterco"
          title="Borderless Innovation Meets Local Precision"
          description="We refine ideas into elegant solutions through global collaboration and technical excellence."
          primaryCTA={{
            text: 'Our Process',
            href: '/process',
          }}
          secondaryCTA={{
            text: 'Meet the Team',
            href: '/team',
          }}
          showScrollIndicator={false}
        />

        {/* Company Story Section */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-4xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <h2 className="text-section mb-8">Our Story</h2>
              <p className="text-body-large mb-8 text-white/70">
                Absterco was born from a simple belief: that the best software
                emerges when precision meets creativity, when global
                perspectives merge with local expertise, and when every line of
                code serves a greater purpose.
              </p>
              <p className="mb-8 text-white/60">
                Founded on the principle of digital purity, we&apos;ve built a
                globally distributed team that combines American business acumen
                with Sri Lankan engineering excellence. This unique positioning
                allows us to deliver 24/7 development cycles while maintaining
                the highest standards of quality and communication.
              </p>
              <p className="mb-12 text-white/60">
                Our name, derived from Latin roots meaning &quot;to purify or
                refine,&quot; reflects our commitment to distilling complex
                problems into elegant, intentional solutions. We don&apos;t just
                build software—we craft digital experiences that stand the test
                of time.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-black-rich">
          <div className="container-padding mx-auto max-w-6xl">
            <h2 className="text-section mb-16 text-center">Our Values</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="text-center">
                <h3 className="text-component mb-4">Precision</h3>
                <p className="text-white/70">
                  Every decision is intentional. Every line of code serves a
                  purpose. We believe in the power of thoughtful engineering.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-component mb-4">Collaboration</h3>
                <p className="text-white/70">
                  Global teams, unified vision. We leverage diverse perspectives
                  to create solutions that transcend boundaries.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-component mb-4">Excellence</h3>
                <p className="text-white/70">
                  We don&apos;t compromise on quality. Our commitment to
                  excellence drives everything we do, from code to client
                  relationships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Team Section */}
        <section className="section-padding">
          <div className="container-padding mx-auto max-w-6xl">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div>
                <h2 className="text-section mb-8">
                  Globally Distributed, Locally Exceptional
                </h2>
                <p className="text-body-large mb-6 text-white/70">
                  Our team spans continents, bringing together the best talent
                  from around the world. This global perspective allows us to
                  work around the clock, delivering faster results without
                  compromising quality.
                </p>
                <p className="mb-8 text-white/60">
                  With operations bridging American business practices and Sri
                  Lankan technical expertise, we offer our clients the best of
                  both worlds: strategic thinking and exceptional execution.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="mb-2 text-4xl font-light text-white">
                    24/7
                  </div>
                  <div className="text-white/70">Development Cycle</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl font-light text-white">15+</div>
                  <div className="text-white/70">Time Zones Covered</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl font-light text-white">50+</div>
                  <div className="text-white/70">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-4xl font-light text-white">99%</div>
                  <div className="text-white/70">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
