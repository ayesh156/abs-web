// Absterco Brand Constants
// The Art of Digital Purity

export const BRAND = {
  name: 'Absterco',
  tagline: 'The Art of Digital Purity.',
  description:
    'Premium digital engineering agency specializing in web apps, mobile apps, and AI-driven platforms. Refined software solutions through code quality, design clarity, and precision thinking.',

  legal: {
    us: 'Absterco LLC',
    sri_lanka: 'Absterco (Pvt) Ltd',
    copyright: '© 2025 Absterco LLC. All rights reserved.',
  },

  contact: {
    email: 'info@absterco.com',
    globalAvailability: 'Available across multiple time zones',
    timezones: 'US EST and Asia Pacific hours',
  },

  positioning: {
    primary: 'Globally distributed team with US business operations',
    secondary: 'Engineering powered by Sri Lankan technical expertise',
    philosophy: 'Borderless innovation and global perspective, local precision',
  },

  // Brand colors
  colors: {
    black: '#000000',
    blackRich: '#111111',
    blackSoft: '#1a1a1a',
    white: '#ffffff',
    white90: 'rgba(255, 255, 255, 0.9)',
    white70: 'rgba(255, 255, 255, 0.7)',
    white50: 'rgba(255, 255, 255, 0.5)',
    accentRed: '#F43F5E',
    accentGreen: '#00FFAB',
    accentAmber: '#FACC15',
    accentPurple: '#8b5cf6',
  },

  // Typography
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
} as const;

export const COPY = {
  headlines: [
    'The Art of Digital Purity',
    'Technology. Refined.',
    'Minimal Code. Maximum Impact',
    'Where precision meets elegance',
    'Refined by Design. Driven by Purpose',
    'Borderless Innovation. Boundless Possibilities',
  ],

  ctas: [
    'View Work',
    'Start a Project',
    "Let's Talk",
    'See How We Build',
    'Explore Our Work',
    'Connect Globally',
    'Access Client Portal',
    'View Case Study',
    'Get Started',
    'Schedule a Call',
    'Download Resource',
    'Get Estimate',
    'Book Consultation',
    'Learn Our Process',
    'View Pricing',
    'Join Our Team',
    'Read More',
    'See Technology',
  ],

  hero: {
    headline: 'The Art of Digital Purity.',
    subheadline:
      'Crafting elegant, intentional software solutions that work flawlessly under pressure.',
    description:
      "We don't build software. We refine ideas into elegant solutions. Every line of code, every design decision, every user interaction is intentional.",
  },

  about: {
    headline: 'Borderless innovation meets local precision',
    description:
      'Powered by a globally distributed team, we bring together American business acumen with Sri Lankan engineering excellence. No borders. No compromises. Just pure, refined digital solutions.',
  },

  global: {
    distributed: 'Globally Distributed',
    unified: 'Distributed team, unified vision',
    available: 'Available across time zones',
    ready:
      'Ready to refine your digital presence? Connect with our global team.',
  },
} as const;

export const NAVIGATION = {
  primary: [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'Process', href: '/process' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  secondary: [
    { name: 'Resources', href: '/resources' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Client Portal', href: '/portal', highlighted: true },
  ],

  footer: {
    brand: {
      title: 'Brand',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Process', href: '/process' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    services: {
      title: 'Services',
      links: [
        { name: 'Web Development', href: '/services#web' },
        { name: 'Mobile Apps', href: '/services#mobile' },
        { name: 'AI Solutions', href: '/services#ai' },
        { name: 'View All Services', href: '/services' },
      ],
    },
    company: {
      title: 'Company',
      links: [
        { name: 'Our Work', href: '/work' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Team', href: '/team' },
      ],
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Resources Hub', href: '/resources' },
        { name: 'Support', href: '/support' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Client Portal', href: '/portal', highlighted: true },
      ],
    },
    contact: {
      title: 'Contact',
      links: [
        { name: 'info@absterco.com', href: 'mailto:info@absterco.com' },
        { name: 'Schedule Call', href: '/booking' },
        { name: 'Start Project', href: '/start-project' },
        { name: 'Global Availability', href: '/contact' },
      ],
    },
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookies Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
  },
} as const;

export const SERVICES = {
  primary: [
    {
      id: 'web',
      title: 'Web Application Development',
      description:
        'Modern, performant web applications built with precision and purpose.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Node.js'],
      icon: 'Web',
    },
    {
      id: 'mobile',
      title: 'Mobile Experience Design',
      description: 'Native and cross-platform mobile apps that users love.',
      technologies: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
      icon: 'Mobile',
    },
    {
      id: 'ai',
      title: 'AI-Powered Platforms',
      description:
        'Intelligent solutions that transform how businesses operate.',
      technologies: ['Python', 'TensorFlow', 'OpenAI', 'ML APIs'],
      icon: '🤖',
    },
    {
      id: 'consulting',
      title: 'Digital Strategy & Consulting',
      description:
        'Strategic guidance for digital transformation and technical architecture.',
      technologies: ['Architecture', 'Strategy', 'Planning', 'Optimization'],
      icon: 'Ideas',
    },
  ],
} as const;

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/absterco',
    icon: 'linkedin',
  },
  { name: 'GitHub', href: 'https://github.com/absterco', icon: 'github' },
  { name: 'Twitter', href: 'https://twitter.com/absterco', icon: 'twitter' },
] as const;
