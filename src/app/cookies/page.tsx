import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy - Absterco',
  description:
    'How we use cookies and tracking technologies to improve your experience on our website. Cookie preferences and management.',
};

export default function Cookies() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-32">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <h1 className="text-hero mb-8">Cookie Policy</h1>
            <p className="text-body-large mb-12 text-white/70">
              Last updated: January 15, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-section mb-6">What Are Cookies?</h2>
              <p className="mb-6 text-white/70">
                Cookies are small text files that are stored on your device when
                you visit our website. They help us provide you with a better
                experience by remembering your preferences and understanding how
                you use our site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">How We Use Cookies</h2>

              <h3 className="text-component mb-4">Essential Cookies</h3>
              <p className="mb-6 text-white/70">
                These cookies are necessary for our website to function
                properly. They enable basic features like page navigation,
                access to secure areas, and form submissions. Our website cannot
                function properly without these cookies.
              </p>

              <h3 className="text-component mb-4">Analytics Cookies</h3>
              <p className="mb-6 text-white/70">
                We use analytics cookies to understand how visitors interact
                with our website. This helps us improve our content and user
                experience. These cookies collect information anonymously and
                report website trends.
              </p>

              <h3 className="text-component mb-4">Functional Cookies</h3>
              <p className="mb-6 text-white/70">
                These cookies enable enhanced functionality and personalization,
                such as remembering your preferences and settings. They may be
                set by us or by third-party providers whose services we use on
                our pages.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Third-Party Cookies</h2>
              <p className="mb-6 text-white/70">
                We may use third-party services that set cookies on our website,
                including:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>• Google Analytics for website analytics</li>
                <li>• Social media platforms for content sharing</li>
                <li>• Customer support tools for chat functionality</li>
                <li>• Marketing platforms for campaign tracking</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">
                Managing Your Cookie Preferences
              </h2>

              <h3 className="text-component mb-4">Browser Settings</h3>
              <p className="mb-6 text-white/70">
                Most web browsers allow you to control cookies through their
                settings. You can choose to accept or decline cookies, delete
                existing cookies, or set your browser to notify you when cookies
                are being sent.
              </p>

              <h3 className="text-component mb-4">Cookie Consent</h3>
              <p className="mb-6 text-white/70">
                When you first visit our website, we may ask for your consent to
                use certain types of cookies. You can change your preferences at
                any time through our cookie consent banner or by contacting us
                directly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Impact of Disabling Cookies</h2>
              <p className="mb-6 text-white/70">
                While you can disable cookies, doing so may affect your
                experience on our website. Some features may not work properly,
                and we may not be able to provide personalized content or
                remember your preferences.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Cookie Retention</h2>
              <p className="mb-6 text-white/70">
                Different cookies have different retention periods:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>
                  • Session cookies are deleted when you close your browser
                </li>
                <li>
                  • Persistent cookies remain on your device for a set period or
                  until you delete them
                </li>
                <li>• Analytics cookies typically expire after 2 years</li>
                <li>• Functional cookies may persist for up to 1 year</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Updates to This Policy</h2>
              <p className="mb-6 text-white/70">
                We may update this Cookie Policy from time to time to reflect
                changes in our practices or applicable laws. We will notify you
                of any significant changes by posting the updated policy on our
                website.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Contact Us</h2>
              <p className="mb-4 text-white/70">
                If you have any questions about our use of cookies or this
                Cookie Policy, please contact us:
              </p>
              <div className="text-white/70">
                <p>
                  Email:{' '}
                  <a
                    href="mailto:privacy@absterco.com"
                    className="text-accent-green hover:text-accent-green/80"
                  >
                    privacy@absterco.com
                  </a>
                </p>
                <p>
                  General Inquiries:{' '}
                  <a
                    href="mailto:info@absterco.com"
                    className="text-accent-green hover:text-accent-green/80"
                  >
                    info@absterco.com
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
