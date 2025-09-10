import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service - Absterco',
  description:
    'Terms and conditions for using Absterco services. Legal agreement governing our client relationships and service delivery.',
};

export default function Terms() {
  return (
    <>
      <Header />
      <main className="min-h-screen py-32">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="prose prose-lg prose-invert max-w-none">
            <h1 className="text-hero mb-8">Terms of Service</h1>
            <p className="text-body-large mb-12 text-white/70">
              Last updated: January 15, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-section mb-6">Agreement to Terms</h2>
              <p className="mb-6 text-white/70">
                These Terms of Service (&quot;Terms&quot;) constitute a legally
                binding agreement between you and Absterco LLC
                (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or
                &quot;us&quot;) regarding your use of our website and services.
                By accessing or using our services, you agree to be bound by
                these Terms.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Description of Services</h2>
              <p className="mb-6 text-white/70">
                Absterco provides premium digital engineering services including
                web application development, mobile application development,
                AI-powered platform creation, and related consulting services.
                We deliver refined software solutions through our globally
                distributed team.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Client Responsibilities</h2>
              <p className="mb-4 text-white/70">As our client, you agree to:</p>
              <ul className="mb-6 space-y-2 text-white/70">
                <li>
                  • Provide accurate and complete information necessary for
                  project completion
                </li>
                <li>
                  • Respond to requests for feedback and approvals in a timely
                  manner
                </li>
                <li>• Make payments according to agreed terms and schedules</li>
                <li>
                  • Respect intellectual property rights and confidentiality
                  agreements
                </li>
                <li>
                  • Use our services in compliance with applicable laws and
                  regulations
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Payment Terms</h2>
              <p className="mb-6 text-white/70">
                Payment terms are specified in individual project agreements.
                Generally, we require milestone-based payments with an initial
                deposit to commence work. Late payments may result in project
                delays and additional fees. All prices are in USD unless
                otherwise specified.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Intellectual Property</h2>

              <h3 className="text-component mb-4">Client-Owned Content</h3>
              <p className="mb-6 text-white/70">
                You retain ownership of all content, data, and materials you
                provide to us. You grant us a license to use such materials
                solely for the purpose of delivering our services.
              </p>

              <h3 className="text-component mb-4">Developed Solutions</h3>
              <p className="mb-6 text-white/70">
                Upon full payment, you will own the custom code and solutions we
                develop specifically for your project. We retain rights to our
                general methodologies, frameworks, and pre-existing intellectual
                property.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Confidentiality</h2>
              <p className="mb-6 text-white/70">
                We maintain strict confidentiality regarding all client
                information and project details. We will not disclose
                confidential information without your written consent, except as
                required by law or with anonymized case studies (with your
                permission).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Warranties and Disclaimers</h2>
              <p className="mb-6 text-white/70">
                We warrant that our services will be performed with professional
                skill and care. However, we cannot guarantee specific business
                outcomes or results. Our services are provided &quot;as is&quot;
                and we disclaim all other warranties to the extent permitted by
                law.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Limitation of Liability</h2>
              <p className="mb-6 text-white/70">
                Our total liability for any claims arising from our services
                shall not exceed the total amount paid by you for the specific
                services giving rise to the claim. We shall not be liable for
                indirect, incidental, or consequential damages.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Project Changes and Scope</h2>
              <p className="mb-6 text-white/70">
                Changes to project scope, timeline, or requirements may result
                in additional costs and timeline adjustments. All significant
                changes must be agreed upon in writing before implementation.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Termination</h2>
              <p className="mb-6 text-white/70">
                Either party may terminate a project agreement with written
                notice. Upon termination, you will pay for all work completed to
                date, and we will deliver all completed deliverables and
                transfer relevant materials.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Governing Law</h2>
              <p className="mb-6 text-white/70">
                These Terms are governed by the laws of the United States and
                the state where Absterco LLC is incorporated. Any disputes will
                be resolved through binding arbitration or in the appropriate
                courts of that jurisdiction.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Changes to Terms</h2>
              <p className="mb-6 text-white/70">
                We reserve the right to modify these Terms at any time. We will
                notify clients of material changes and updated Terms will apply
                to new projects commenced after the effective date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-section mb-6">Contact Information</h2>
              <p className="mb-4 text-white/70">
                For questions about these Terms or our services, please contact
                us:
              </p>
              <div className="text-white/70">
                <p>
                  Email:{' '}
                  <a
                    href="mailto:legal@absterco.com"
                    className="text-accent-green hover:text-accent-green/80"
                  >
                    legal@absterco.com
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
                <p>Company: Absterco LLC, United States</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
