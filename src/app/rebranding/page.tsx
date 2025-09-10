import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ArrowRight, CheckCircle, Globe, Building, Calendar, Users, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Rebranding Journey - From Sigma Dev Solutions to Absterco',
  description: 'Learn about our evolution from Sigma Dev Solutions (Pvt) Ltd to Absterco (Pvt) Ltd and Absterco LLC. Discover our expanded global presence and enhanced services.',
  keywords: 'Sigma Dev Solutions, Absterco, rebranding, company evolution, software development'
};

export default function RebrandingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Simple Page Header */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <p className="text-base font-medium text-blue-400 mb-4">Our Journey</p>
              <h1 className="text-4xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="block">Our Evolution</span>
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  Into Absterco
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70 sm:text-xl">
                We&apos;re excited to share our journey from Sigma Dev Solutions to Absterco - a transformation that represents our commitment to growth, innovation, and global excellence.
              </p>
            </div>
          </div>
        </section>

        {/* Migration Info Section */}
        <section className="py-12 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <Calendar className="h-4 w-4" />
                <span>Migration Period: Q3 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-white/60">
                <Users className="h-4 w-4" />
                <span>All services remain uninterrupted</span>
              </div>
            </div>
          </div>
        </section>

      {/* Main Content */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Timeline Section */}
            <div className="lg:col-span-8">
              <div className="space-y-12">
                
                {/* Where We Started */}
                <div className="relative">
                  <div className="absolute left-6 top-12 h-full w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-500/20 bg-black">
                        <Building className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-semibold text-white">Where We Started</h3>
                      <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm">
                        <h4 className="text-lg font-medium text-white mb-3">Sigma Dev Solutions (Pvt) Ltd</h4>
                        <p className="text-white/70 mb-4">
                          Founded as a private limited company, we established ourselves as a trusted software development partner, 
                          serving clients with innovative digital solutions through our platform at sigmdev.com.
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                          <ExternalLink className="h-4 w-4 text-blue-400" />
                          <a 
                            href="https://sigmdev.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                          >
                            sigmdev.com (legacy platform)
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why We're Evolving */}
                <div className="relative">
                  <div className="absolute left-6 top-12 h-full w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-purple-500/20 bg-black">
                        <ArrowRight className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-semibold text-white">Why We&apos;re Evolving</h3>
                      <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm">
                        <ul className="space-y-3 text-white/70">
                          <li className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">Global Expansion:</strong> Establishing presence in multiple markets</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">Enhanced Services:</strong> Broader range of cutting-edge solutions</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">Stronger Brand:</strong> A name that reflects our ambitious vision</span>
                          </li>
                          <li className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span><strong className="text-white">International Compliance:</strong> Meeting global business standards</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Our New Identity */}
                <div className="relative">
                  <div className="absolute left-6 top-12 h-full w-px bg-gradient-to-b from-purple-500/50 to-green-500/50"></div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-green-500/20 bg-black">
                        <Globe className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl font-semibold text-white">Our New Identity</h3>
                      <div className="mt-4 space-y-4">
                        
                        {/* Sri Lankan Entity */}
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                            <h4 className="text-lg font-medium text-white">Absterco (Pvt) Ltd</h4>
                            <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Sri Lanka</span>
                          </div>
                          <p className="text-white/70 mb-3">
                            Our primary entity, continuing all operations from Sigma Dev Solutions with enhanced 
                            capabilities and expanded service offerings.
                          </p>
                          <div className="text-sm text-green-400">
                            ✓ All existing contracts and relationships transferred seamlessly
                          </div>
                        </div>

                        {/* US Entity */}
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="h-3 w-3 rounded-full bg-blue-400"></div>
                            <h4 className="text-lg font-medium text-white">Absterco LLC</h4>
                            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">United States</span>
                          </div>
                          <p className="text-white/70 mb-3">
                            Our new US business entity being established to enable direct operations in the American market 
                            and build our global presence with future expansion plans.
                          </p>
                          <div className="text-sm text-blue-400">
                            ✓ Foundation for global expansion and international client support
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-8">
                
                {/* Quick Facts */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div>
                      <dt className="text-sm text-white/60">Previous Name</dt>
                      <dd className="text-white font-medium">Sigma Dev Solutions (Pvt) Ltd</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-white/60">Previous Domain</dt>
                      <dd className="text-white font-medium">sigmdev.com</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-white/60">New Primary Entity</dt>
                      <dd className="text-white font-medium">Absterco (Pvt) Ltd</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-white/60">New US Entity</dt>
                      <dd className="text-white font-medium">Absterco LLC</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-white/60">Migration Status</dt>
                      <dd className="text-green-400 font-medium">In Progress</dd>
                    </div>
                  </div>
                </div>

                {/* What This Means for You */}
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">What This Means for You</h3>
                  <div className="space-y-3 text-sm text-white/70">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>All existing services continue without interruption</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Same team, same quality, enhanced capabilities</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Improved global support and faster delivery</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Access to new technologies and solutions</span>
                    </div>
                  </div>
                </div>

                {/* Contact During Transition */}
                <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold text-white mb-4">Need Assistance?</h3>
                  <p className="text-sm text-white/70 mb-4">
                    Have questions about our rebranding? Our team is here to help ensure a smooth transition.
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:from-blue-500 hover:to-purple-500"
                  >
                    <span>Contact Us</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/2 p-12 text-center backdrop-blur-sm">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to Experience the New Absterco?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Discover our enhanced services and expanded capabilities. 
              Let&apos;s build something amazing together.
            </p>
            <div className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Link 
                href="/services"
                className="inline-flex items-center space-x-2 rounded-xl bg-white px-6 py-3 font-medium text-black transition-all duration-200 hover:bg-white/90"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link 
                href="/start-project"
                className="inline-flex items-center space-x-2 rounded-xl border border-white/20 bg-transparent px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-white/5"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
