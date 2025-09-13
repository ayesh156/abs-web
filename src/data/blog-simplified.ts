import { BlogCategory, BlogPost } from '@/types/blog';
import { SAMPLE_AUTHORS, BLOG_CATEGORIES } from '@/constants/blog';

// Re-export for backward compatibility
export const AUTHORS = SAMPLE_AUTHORS;
export const CATEGORIES = BLOG_CATEGORIES;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'digital-purity-web-development',
    title: 'The Art of Digital Purity in Modern Web Development',
    excerpt: 'How minimalist design principles and clean code architecture create superior user experiences that resonate with users on a deeper level.',
    content: `
# The Art of Digital Purity in Modern Web Development

In an era of digital noise and visual complexity, the concept of "digital purity" emerges as a guiding principle for creating meaningful, lasting user experiences. This philosophy isn't just about removing elements—it's about intentional design that serves both function and emotion.

## Understanding Digital Purity

Digital purity is the practice of reducing interfaces to their essential elements while maintaining full functionality. It's inspired by minimalist design principles but goes deeper, considering the psychological impact of clean, purposeful design on user behavior and brand perception.

The goal isn't to create empty interfaces, but to craft experiences that feel effortless and meaningful—where every interaction serves a purpose and every visual element tells part of your story.
    `,
    category: CATEGORIES[0],
    author: {
      name: 'Elena Vasquez',
      role: 'Senior UX Designer',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Design systems expert passionate about creating accessible, user-centered digital experiences.'
    },
    publishedAt: '2025-01-15T10:00:00Z',
    readTime: '8 min read',
    featuredImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isFeatured: true,
    isPublished: true,
    seo: {
      metaTitle: 'The Art of Digital Purity in Modern Web Development | Absterco',
      metaDescription: 'Discover how minimalist design principles and clean code architecture create superior user experiences in modern web development.',
      canonicalUrl: 'https://absterco.com/blog/digital-purity-web-development'
    }
  },
  {
    id: '2',
    slug: 'ai-integration-strategies',
    title: 'AI Integration Strategies for Modern Applications',
    excerpt: 'Practical approaches to incorporating artificial intelligence without compromising user experience or overwhelming your application architecture.',
    content: `
# AI Integration Strategies for Modern Applications

The integration of artificial intelligence into web applications has moved from experimental to essential. However, successful AI implementation requires careful planning and strategic thinking to avoid the common pitfalls that can compromise user experience and system performance.

As AI capabilities continue to evolve, the most successful applications will be those that integrate intelligence seamlessly into existing workflows, enhancing human capabilities rather than replacing human judgment.

The future belongs to applications that use AI to understand context, predict needs, and reduce cognitive load—all while maintaining the transparency and control that users expect.
    `,
    category: CATEGORIES[2],
    author: {
      name: 'Sarah Kim',
      role: 'AI Research Engineer',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Machine learning specialist focused on practical AI applications and ethical technology.'
    },
    publishedAt: '2025-01-10T14:30:00Z',
    readTime: '10 min read',
    featuredImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isFeatured: false,
    isPublished: true,
    seo: {
      metaTitle: 'AI Integration Strategies for Modern Applications | Absterco',
      metaDescription: 'Learn practical approaches to incorporating AI into modern applications without compromising user experience or system performance.',
      canonicalUrl: 'https://absterco.com/blog/ai-integration-strategies'
    }
  },
  {
    id: '3',
    slug: 'distributed-development-teams',
    title: 'Building Globally Distributed Development Teams',
    excerpt: 'Lessons learned from managing high-performance teams across multiple time zones and cultures, creating a unified development culture.',
    content: `
# Building Globally Distributed Development Teams

The shift to remote and globally distributed development teams has fundamentally changed how we approach software development. After years of building and leading distributed teams at Absterco, we've learned that success requires intentional design of both technical and cultural systems.

Success in distributed development isn't about managing remote workers; it's about designing systems that enable talented people to do their best work regardless of location.
    `,
    category: CATEGORIES[3],
    author: {
      name: 'Marcus Rodriguez',
      role: 'Engineering Manager',
      avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Engineering leader with 15+ years building and scaling distributed development teams.'
    },
    publishedAt: '2025-01-12T09:15:00Z',
    readTime: '12 min read',
    featuredImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isFeatured: false,
    isPublished: true,
    seo: {
      metaTitle: 'Building Globally Distributed Development Teams | Absterco',
      metaDescription: 'Learn how to build and manage high-performance distributed development teams across multiple time zones and cultures.',
      canonicalUrl: 'https://absterco.com/blog/distributed-development-teams'
    }
  },
  {
    id: '4',
    slug: 'nextjs-performance-optimization',
    title: 'Next.js Performance Optimization: A Complete Guide',
    excerpt: 'Master advanced Next.js optimization techniques to achieve lightning-fast load times and exceptional Core Web Vitals scores.',
    content: `
# Next.js Performance Optimization: A Complete Guide

Next.js provides excellent performance out of the box, but achieving exceptional speed requires understanding and implementing advanced optimization strategies. This comprehensive guide covers everything from basic optimizations to cutting-edge techniques.

The key to Next.js performance optimization is measuring first, optimizing based on data, and continuously monitoring the impact of your changes.
    `,
    category: CATEGORIES[1],
    author: {
      name: 'Alex Chen',
      role: 'Technical Lead',
      avatar: 'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Full-stack developer with expertise in React, Node.js, and system architecture.'
    },
    publishedAt: '2025-01-08T11:45:00Z',
    readTime: '15 min read',
    featuredImage: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isFeatured: true,
    isPublished: true,
    seo: {
      metaTitle: 'Next.js Performance Optimization: Complete Guide | Absterco',
      metaDescription: 'Master advanced Next.js optimization techniques to achieve lightning-fast load times and exceptional Core Web Vitals scores.',
      canonicalUrl: 'https://absterco.com/blog/nextjs-performance-optimization'
    }
  },
  {
    id: '5',
    slug: 'user-centered-design-process',
    title: 'Building a User-Centered Design Process That Scales',
    excerpt: 'How to create design systems and processes that maintain user focus while scaling across large teams and complex product requirements.',
    content: `
# Building a User-Centered Design Process That Scales

User-centered design (UCD) is more than a methodology—it's a philosophy that puts human needs at the center of every design decision. However, scaling UCD across large teams and complex products presents unique challenges that require systematic approaches and cultural transformation.

The organizations that master scalable user-centered design will create products that not only meet user needs but anticipate and exceed them, building lasting competitive advantages through superior user experiences.
    `,
    category: CATEGORIES[0],
    author: {
      name: 'Elena Vasquez',
      role: 'Senior UX Designer',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Design systems expert passionate about creating accessible, user-centered digital experiences.'
    },
    publishedAt: '2025-01-05T16:20:00Z',
    readTime: '11 min read',
    featuredImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isFeatured: false,
    isPublished: true,
    seo: {
      metaTitle: 'Building a User-Centered Design Process That Scales | Absterco',
      metaDescription: 'Learn how to create design systems and processes that maintain user focus while scaling across large teams and complex products.',
      canonicalUrl: 'https://absterco.com/blog/user-centered-design-process'
    }
  },
  {
    id: '6',
    slug: 'modern-css-architecture',
    title: 'Modern CSS Architecture: From Chaos to System',
    excerpt: 'Transform your CSS from an unmanageable mess into a scalable, maintainable system using modern architecture patterns and tools.',
    content: `
# Modern CSS Architecture: From Chaos to System

CSS architecture has evolved dramatically from the days of global stylesheets and specificity wars. Modern CSS architecture emphasizes modularity, predictability, and maintainability—creating systems that scale with your application and team.

Modern CSS architecture isn't about following rigid rules—it's about creating systems that work for your team, scale with your product, and provide excellent user experiences. The key is choosing the right combination of tools and patterns for your specific context and constraints.
    `,
    category: CATEGORIES[1],
    author: {
      name: 'David Park',
      role: 'Frontend Architect',
      avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'CSS architecture specialist and performance optimization expert with deep frontend expertise.'
    },
    publishedAt: '2025-01-03T13:30:00Z',
    readTime: '13 min read',
    featuredImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isFeatured: false,
    isPublished: true,
    seo: {
      metaTitle: 'Modern CSS Architecture: From Chaos to System | Absterco',
      metaDescription: 'Transform your CSS from an unmanageable mess into a scalable, maintainable system using modern architecture patterns.',
      canonicalUrl: 'https://absterco.com/blog/modern-css-architecture'
    }
  },
  {
    id: '7',
    slug: 'api-design-best-practices',
    title: 'API Design Best Practices for Modern Applications',
    excerpt: 'Comprehensive guide to designing APIs that are intuitive, scalable, and developer-friendly, with real-world examples and implementation strategies.',
    content: `
# API Design Best Practices for Modern Applications

Well-designed APIs are the backbone of modern applications. They enable integration, support mobile apps, and facilitate the microservices architecture that powers today's scalable applications. This guide covers comprehensive API design principles with practical implementation examples.

Modern API design is about creating interfaces that are intuitive for developers, performant for users, and maintainable for teams. By following these best practices, you'll build APIs that scale with your application and provide excellent developer experience.
    `,
    category: CATEGORIES[1],
    author: {
      name: 'Sarah Kim',
      role: 'AI Research Engineer',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Machine learning specialist focused on practical AI applications and ethical technology.'
    },
    publishedAt: '2025-01-01T08:00:00Z',
    readTime: '16 min read',
    featuredImage: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200',
    isFeatured: false,
    isPublished: true,
    seo: {
      metaTitle: 'API Design Best Practices for Modern Applications | Absterco',
      metaDescription: 'Comprehensive guide to designing APIs that are intuitive, scalable, and developer-friendly with real-world examples.',
      canonicalUrl: 'https://absterco.com/blog/api-design-best-practices'
    }
  }
];

// Utility functions
export const getFeaturedPosts = () => BLOG_POSTS.filter(post => post.isFeatured && post.isPublished);

export const getPublishedPosts = () => BLOG_POSTS.filter(post => post.isPublished);

export const getPostBySlug = (slug: string) => 
  BLOG_POSTS.find(post => post.slug === slug && post.isPublished);

export const getPostsByCategory = (categorySlug: string) => 
  BLOG_POSTS.filter(post => 
    post.category.slug === categorySlug && post.isPublished
  );

export const getPostsByAuthor = (authorName: string) => 
  BLOG_POSTS.filter(post => 
    post.author.name.toLowerCase() === authorName.toLowerCase() && post.isPublished
  );

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3) => {
  return BLOG_POSTS
    .filter(post => 
      post.id !== currentPost.id && 
      post.isPublished &&
      post.category.id === currentPost.category.id
    )
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const searchPosts = (query: string) => {
  const searchTerm = query.toLowerCase();
  return BLOG_POSTS.filter(post => 
    post.isPublished &&
    (post.title.toLowerCase().includes(searchTerm) ||
     post.excerpt.toLowerCase().includes(searchTerm))
  );
};

export const getRecentPosts = (limit: number = 5) => {
  return BLOG_POSTS
    .filter(post => post.isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getPopularPosts = (limit: number = 5) => {
  // In a real app, this would be based on actual analytics data
  // For now, we'll simulate popularity based on featured status and recency
  return BLOG_POSTS
    .filter(post => post.isPublished)
    .sort((a, b) => {
      const aScore = (a.isFeatured ? 2 : 1) * new Date(a.publishedAt).getTime();
      const bScore = (b.isFeatured ? 2 : 1) * new Date(b.publishedAt).getTime();
      return bScore - aScore;
    })
    .slice(0, limit);
};