import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Absterco',
  description:
    'Our commitment to protecting your privacy and personal information. Learn how we collect, use, and safeguard your data.',
};

export default function Privacy() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-32">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <h1 className="text-hero mb-8">Privacy Policy</h1>
            <p className="text-body-large mb-12 text-white/70">
              Last updated: January 15, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-section mb-6">Our Commitment to Privacy</h2>
              <p className="mb-6 text-white/70">
                At Absterco LLC (&quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;), we are committed to protecting your privacy and
                personal information. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website or use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Information We Collect</h2>

              <h3 className="text-component mb-4">Personal Information</h3>
              <p className="mb-4 text-white/70">
                We may collect personal information that you voluntarily provide
                to us when you:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>• Contact us through our website or email</li>
                <li>• Request information about our services</li>
                <li>• Subscribe to our newsletter or blog updates</li>
                <li>• Apply for employment opportunities</li>
                <li>• Use our client portal (when available)</li>
              </ul>

              <h3 className="text-component mb-4">
                Automatically Collected Information
              </h3>
              <p className="mb-6 text-white/70">
                When you visit our website, we may automatically collect certain
                information about your device and usage patterns, including IP
                address, browser type, operating system, referring URLs, and
                pages visited.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">How We Use Your Information</h2>
              <p className="mb-4 text-white/70">
                We use the information we collect to:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>• Provide and maintain our services</li>
                <li>• Respond to your inquiries and requests</li>
                <li>
                  • Send you updates and marketing communications (with your
                  consent)
                </li>
                <li>• Improve our website and services</li>
                <li>• Comply with legal obligations</li>
                <li>• Protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">
                Information Sharing and Disclosure
              </h2>
              <p className="mb-6 text-white/70">
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy. We may share your information with:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>
                  • Service providers who assist us in operating our website and
                  conducting business
                </li>
                <li>
                  • Legal authorities when required by law or to protect our
                  rights
                </li>
                <li>• Business partners with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Data Security</h2>
              <p className="mb-6 text-white/70">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet or
                electronic storage is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Your Rights</h2>
              <p className="mb-4 text-white/70">
                Depending on your location, you may have the following rights
                regarding your personal information:
              </p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>• Access to your personal information</li>
                <li>• Correction of inaccurate information</li>
                <li>• Deletion of your personal information</li>
                <li>• Restriction of processing</li>
                <li>• Data portability</li>
                <li>• Objection to processing</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">
                Cookies and Tracking Technologies
              </h2>
              <p className="mb-6 text-white/70">
                We use cookies and similar tracking technologies to enhance your
                experience on our website. You can control cookie settings
                through your browser preferences. For more information, please
                see our Cookie Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">
                International Data Transfers
              </h2>
              <p className="mb-6 text-white/70">
                As a globally distributed company with operations in the United
                States and Sri Lanka, your information may be transferred to and
                processed in countries other than your own. We ensure
                appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Changes to This Policy</h2>
              <p className="mb-6 text-white/70">
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Contact Us</h2>
              <p className="mb-4 text-white/70">
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us:
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
                <p>Address: Absterco LLC, United States</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
