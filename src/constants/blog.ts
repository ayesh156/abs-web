import { BlogCategory } from '@/types/blog';

// Default author roles for blog posts
export const AUTHOR_ROLES = [
  'Technical Lead',
  'Senior Developer',
  'Engineering Manager', 
  'UX Designer',
  'Frontend Architect',
  'AI Research Engineer',
  'DevOps Engineer',
  'Product Manager',
  'Contributor'
] as const;

// Default avatar URLs for authors
export const DEFAULT_AUTHOR_AVATARS = [
  'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=150'
];

// Sample authors for development/demo purposes
export const SAMPLE_AUTHORS = [
  {
    name: 'Alex Chen',
    role: 'Technical Lead',
    avatar: DEFAULT_AUTHOR_AVATARS[0],
    bio: 'Full-stack developer with expertise in React, Node.js, and system architecture.'
  },
  {
    name: 'Sarah Kim',
    role: 'AI Research Engineer',
    avatar: DEFAULT_AUTHOR_AVATARS[1],
    bio: 'Machine learning specialist focused on practical AI applications and ethical technology.'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Engineering Manager',
    avatar: DEFAULT_AUTHOR_AVATARS[2],
    bio: 'Engineering leader with 15+ years building and scaling distributed development teams.'
  },
  {
    name: 'Elena Vasquez',
    role: 'Senior UX Designer',
    avatar: DEFAULT_AUTHOR_AVATARS[3],
    bio: 'Design systems expert passionate about creating accessible, user-centered digital experiences.'
  },
  {
    name: 'David Park',
    role: 'Frontend Architect',
    avatar: DEFAULT_AUTHOR_AVATARS[4],
    bio: 'CSS architecture specialist and performance optimization expert with deep frontend expertise.'
  }
];

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: '1',
    name: 'Design & UX',
    slug: 'design-philosophy',
    description: 'User experience design and interface philosophy',
    color: '#3b82f6'
  },
  {
    id: '2',
    name: 'Development',
    slug: 'development',
    description: 'Frontend and backend development insights',
    color: '#8b5cf6'
  },
  {
    id: '3',
    name: 'AI & Technology',
    slug: 'ai-technology',
    description: 'Artificial intelligence and emerging technologies',
    color: '#06b6d4'
  },
  {
    id: '4',
    name: 'Team & Culture',
    slug: 'team-culture',
    description: 'Team management and development culture',
    color: '#ef4444'
  },
  {
    id: '5',
    name: 'Performance',
    slug: 'performance',
    description: 'Optimization and performance engineering',
    color: '#f59e0b'
  },
  {
    id: '6',
    name: 'DevOps & Infrastructure',
    slug: 'devops-infrastructure',
    description: 'Cloud architecture, deployment, and scalable infrastructure',
    color: '#10b981'
  },
  {
    id: '7',
    name: 'User Experience',
    slug: 'user-experience',
    description: 'Creating delightful, accessible user experiences',
    color: '#f59e0b'
  }
];

// Utility functions for blog constants
export const getBlogCategoryById = (id: string): BlogCategory | undefined => {
  return BLOG_CATEGORIES.find(category => category.id === id);
};

export const getBlogCategoryBySlug = (slug: string): BlogCategory | undefined => {
  return BLOG_CATEGORIES.find(category => category.slug === slug);
};

export const getSampleAuthorByName = (name: string) => {
  return SAMPLE_AUTHORS.find(author => 
    author.name.toLowerCase() === name.toLowerCase()
  );
};

export const getRandomAuthorAvatar = (): string => {
  return DEFAULT_AUTHOR_AVATARS[Math.floor(Math.random() * DEFAULT_AUTHOR_AVATARS.length)];
};

// Default fallback values for forms
export const DEFAULT_BLOG_CATEGORY = BLOG_CATEGORIES[0];
export const DEFAULT_BLOG_AUTHOR = SAMPLE_AUTHORS[0];