import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Accessibility Statement - Absterco',
  description:
    'Our commitment to digital accessibility and inclusive design. WCAG compliance and accessibility features of our website.',
};

export default function Accessibility() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-32">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <h1 className="text-hero mb-8">Accessibility Statement</h1>
            <p className="text-body-large mb-12 text-white/70">
              Last updated: January 15, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-section mb-6">
                Our Commitment to Accessibility
              </h2>
              <p className="mb-6 text-white/70">
                At Absterco, we believe that digital experiences should be
                accessible to everyone, regardless of their abilities or
                disabilities. We are committed to ensuring that our website and
                services are accessible to all users, including those who rely
                on assistive technologies.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Accessibility Standards</h2>
              <p className="mb-6 text-white/70">
                We strive to conform to the Web Content Accessibility Guidelines
                (WCAG) 2.1 Level AA standards. These guidelines explain how to
                make web content more accessible for people with disabilities
                and create a better user experience for everyone.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Accessibility Features</h2>
              <p className="mb-4 text-white/70">
                Our website includes the following accessibility features:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>
                  • Semantic HTML structure for screen reader compatibility
                </li>
                <li>
                  • Keyboard navigation support for all interactive elements
                </li>
                <li>• High contrast color schemes that meet WCAG standards</li>
                <li>• Alternative text for all meaningful images</li>
                <li>• Descriptive link text and button labels</li>
                <li>• Consistent navigation and page structure</li>
                <li>
                  • Resizable text that maintains functionality up to 200% zoom
                </li>
                <li>• Focus indicators for keyboard navigation</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Ongoing Efforts</h2>
              <p className="mb-6 text-white/70">
                Accessibility is an ongoing effort, and we continuously work to
                improve the accessibility of our website. We regularly review
                our content and features to ensure they meet accessibility
                standards and provide a positive experience for all users.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Third-Party Content</h2>
              <p className="mb-6 text-white/70">
                While we strive to ensure that all content on our website is
                accessible, some third-party content or services may not fully
                meet our accessibility standards. We work with our partners to
                improve accessibility across all integrated services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Assistive Technologies</h2>
              <p className="mb-6 text-white/70">
                Our website is designed to be compatible with assistive
                technologies, including:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>• Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                <li>• Voice recognition software</li>
                <li>• Keyboard-only navigation</li>
                <li>• Switch navigation devices</li>
                <li>• Magnification software</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Browser Compatibility</h2>
              <p className="mb-6 text-white/70">
                Our website is tested and optimized for accessibility across
                modern browsers, including Chrome, Firefox, Safari, and Edge. We
                recommend using the latest version of your preferred browser for
                the best experience.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Feedback and Support</h2>
              <p className="mb-6 text-white/70">
                We welcome feedback about the accessibility of our website. If
                you encounter any accessibility barriers or have suggestions for
                improvement, please let us know. We are committed to addressing
                accessibility issues promptly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Alternative Access</h2>
              <p className="mb-6 text-white/70">
                If you are unable to access any content or functionality on our
                website due to accessibility barriers, we are happy to provide
                alternative access methods. Please contact us, and we will work
                with you to ensure you can access the information or services
                you need.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Contact Us</h2>
              <p className="mb-4 text-white/70">
                For accessibility-related questions, feedback, or to request
                alternative access to content:
              </p>
              <div className="text-white/70">
                <p>
                  Email:{' '}
                  <a
                    href="mailto:accessibility@absterco.com"
                    className="text-accent-green hover:text-accent-green/80"
                  >
                    accessibility@absterco.com
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
                <p>
                  We aim to respond to accessibility inquiries within 2 business
                  days.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Continuous Improvement</h2>
              <p className="mb-6 text-white/70">
                We are committed to continuously improving the accessibility of
                our website and services. We regularly conduct accessibility
                audits, user testing with people with disabilities, and stay
                updated on accessibility best practices and standards.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
