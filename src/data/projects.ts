export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'web' | 'mobile' | 'ai' | 'strategy';
  tags: string[];
  technologies: string[];
  image: string;
  slug: string;
  featured: boolean;
  year: number;
  client?: string;
  results?: {
    metric: string;
    value: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'FinanceFlow',
    description:
      'A modern financial management platform that helps businesses track expenses, manage invoices, and generate detailed financial reports with real-time analytics.',
    shortDescription:
      'Modern financial management platform with real-time analytics',
    category: 'web',
    tags: ['Financial Technology', 'SaaS', 'Analytics'],
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe'],
    image: '/images/portfolio/financeflow.jpg',
    slug: 'financeflow',
    featured: true,
    year: 2024,
    client: 'FinTech Startup',
    results: [
      { metric: 'User Growth', value: '300%' },
      { metric: 'Processing Time', value: '75% faster' },
      { metric: 'User Satisfaction', value: '4.9/5' },
    ],
  },
  {
    id: '2',
    title: 'EcoTrack Mobile',
    description:
      'A mobile application that helps users track their environmental impact through daily activities, with personalized recommendations for sustainable living.',
    shortDescription:
      'Environmental impact tracking with personalized sustainability recommendations',
    category: 'mobile',
    tags: ['Sustainability', 'Mobile App', 'Social Impact'],
    technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
    image: '/images/portfolio/ecotrack.jpg',
    slug: 'ecotrack-mobile',
    featured: true,
    year: 2024,
    client: 'GreenTech Initiative',
    results: [
      { metric: 'Downloads', value: '50K+' },
      { metric: 'Carbon Saved', value: '1.2M lbs' },
      { metric: 'App Store Rating', value: '4.8/5' },
    ],
  },
  {
    id: '3',
    title: 'ContentCraft AI',
    description:
      'An AI-powered content generation platform that helps marketing teams create compelling copy, social media posts, and blog articles at scale.',
    shortDescription:
      'AI-powered content generation platform for marketing teams',
    category: 'ai',
    tags: ['Artificial Intelligence', 'Content Marketing', 'SaaS'],
    technologies: ['Python', 'OpenAI GPT-4', 'React', 'FastAPI'],
    image: '/images/portfolio/contentcraft.jpg',
    slug: 'contentcraft-ai',
    featured: true,
    year: 2024,
    client: 'Marketing Agency',
    results: [
      { metric: 'Content Generated', value: '1M+ pieces' },
      { metric: 'Time Saved', value: '80%' },
      { metric: 'Client Retention', value: '95%' },
    ],
  },
  {
    id: '4',
    title: 'RetailVision Analytics',
    description:
      'A comprehensive retail analytics dashboard that provides insights into customer behavior, inventory management, and sales performance.',
    shortDescription:
      'Comprehensive retail analytics dashboard with customer insights',
    category: 'web',
    tags: ['Analytics', 'Retail', 'Dashboard'],
    technologies: ['Vue.js', 'Python', 'TensorFlow', 'BigQuery'],
    image: '/images/portfolio/retailvision.jpg',
    slug: 'retailvision-analytics',
    featured: false,
    year: 2023,
    client: 'Retail Chain',
    results: [
      { metric: 'Sales Increase', value: '25%' },
      { metric: 'Inventory Efficiency', value: '40%' },
      { metric: 'Customer Insights', value: '360° view' },
    ],
  },
  {
    id: '5',
    title: 'HealthConnect Telemedicine',
    description:
      'A secure telemedicine platform connecting patients with healthcare providers through video consultations, appointment scheduling, and digital prescriptions.',
    shortDescription: 'Secure telemedicine platform with video consultations',
    category: 'web',
    tags: ['Healthcare', 'Telemedicine', 'Security'],
    technologies: ['Next.js', 'WebRTC', 'HIPAA Compliant', 'AWS'],
    image: '/images/portfolio/healthconnect.jpg',
    slug: 'healthconnect-telemedicine',
    featured: false,
    year: 2023,
    client: 'Healthcare Provider',
    results: [
      { metric: 'Patient Satisfaction', value: '98%' },
      { metric: 'Consultation Time', value: '50% reduced' },
      { metric: 'HIPAA Compliance', value: '100%' },
    ],
  },
  {
    id: '6',
    title: 'EduLearn Platform',
    description:
      'An interactive e-learning platform with adaptive learning algorithms, progress tracking, and collaborative study tools for educational institutions.',
    shortDescription:
      'Interactive e-learning platform with adaptive algorithms',
    category: 'web',
    tags: ['Education', 'E-Learning', 'AI'],
    technologies: ['React', 'Django', 'PostgreSQL', 'Machine Learning'],
    image: '/images/portfolio/edulearn.jpg',
    slug: 'edulearn-platform',
    featured: false,
    year: 2023,
    client: 'Educational Institution',
    results: [
      { metric: 'Student Engagement', value: '85% increase' },
      { metric: 'Learning Outcomes', value: '30% improvement' },
      { metric: 'Platform Usage', value: '10K+ students' },
    ],
  },
];

export const getFeaturedProjects = () =>
  PROJECTS.filter((project) => project.featured);

export const getProjectsByCategory = (category: Project['category']) =>
  PROJECTS.filter((project) => project.category === category);

export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);

export const getAllProjectSlugs = () => PROJECTS.map((project) => project.slug);

// Legacy projects data for backwards compatibility
export const projects = [
  {
    id: 'financeflow',
    title: 'FinanceFlow',
    description:
      'AI-powered financial analytics platform for enterprise clients.',
    category: 'Web Application',
    image:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Next.js', 'TypeScript', 'AI/ML', 'PostgreSQL'],
    client: 'Enterprise Financial Services',
    timeline: '16 weeks',
    team: '5 developers',
    results: [
      '40% reduction in analysis time',
      '99.9% uptime achieved',
      '500+ daily active users',
    ],
    href: '/work/financeflow',
    external: 'https://financeflow.demo',
    status: 'live',
  },
  {
    id: 'medconnect',
    title: 'MedConnect',
    description:
      'Telemedicine platform connecting patients with healthcare providers.',
    category: 'Mobile App',
    image:
      'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React Native', 'Node.js', 'WebRTC', 'MongoDB'],
    client: 'Healthcare Startup',
    timeline: '20 weeks',
    team: '6 developers',
    results: [
      '10,000+ consultations completed',
      '4.8/5 user rating',
      '95% appointment completion rate',
    ],
    href: '/work/medconnect',
    external: 'https://medconnect.demo',
    status: 'live',
  },
  {
    id: 'retailai',
    title: 'RetailAI',
    description:
      'Computer vision solution for inventory management and analytics.',
    category: 'AI Platform',
    image:
      'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Python', 'TensorFlow', 'Computer Vision', 'AWS'],
    client: 'Retail Chain',
    timeline: '24 weeks',
    team: '4 developers',
    results: [
      '30% reduction in stock-outs',
      '25% improvement in inventory turnover',
      '99.5% accuracy in product recognition',
    ],
    href: '/work/retailai',
    external: 'https://retailai.demo',
    status: 'live',
  },
];
