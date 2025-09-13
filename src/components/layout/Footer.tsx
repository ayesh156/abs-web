import Link from 'next/link';
import { BRAND, NAVIGATION, SOCIAL_LINKS } from '@/constants/brand';
import { Linkedin, Github, Twitter } from 'lucide-react';

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  twitter: Twitter,
};

export default function Footer() {
  return (
    <footer className="bg-black-rich mt-32 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-lg font-medium text-white">
              {BRAND.name}
            </h3>
            <p className="mb-4 text-sm text-white/70">{BRAND.tagline}</p>
            <p className="text-xs leading-relaxed text-white/50">
              {BRAND.description}
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-white">
              {NAVIGATION.footer.services.title}
            </h4>
            <ul className="space-y-3">
              {NAVIGATION.footer.services.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-white">
              {NAVIGATION.footer.company.title}
            </h4>
            <ul className="space-y-3">
              {NAVIGATION.footer.company.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-white">
              {NAVIGATION.footer.resources.title}
            </h4>
            <ul className="space-y-3">
              {NAVIGATION.footer.resources.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors ${
                      'highlighted' in link && link.highlighted
                        ? 'rounded-md bg-white/10 px-3 py-1 text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-white">
              {NAVIGATION.footer.contact.title}
            </h4>
            <ul className="space-y-3">
              {NAVIGATION.footer.contact.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <p className="mb-3 text-xs text-white/50">Follow us</p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = iconMap[social.icon as keyof typeof iconMap];
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 transition-colors hover:text-white"
                      aria-label={social.name}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-white/50">{BRAND.legal.copyright}</p>

            <div className="flex flex-wrap items-center space-x-6">
              {NAVIGATION.footer.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-white/70"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
