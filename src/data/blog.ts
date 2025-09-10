import { Author, BlogCategory, BlogPost } from '@/types/blog';

export const AUTHORS: Author[] = [
  {
    id: '1',
    name: 'Alex Chen',
    role: 'Technical Lead',
    bio: 'Full-stack developer with expertise in React, Node.js, and system architecture.',
    avatar: 'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=150',
    socialLinks: {
      twitter: 'https://twitter.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen',
      github: 'https://github.com/alexchen'
    }
  },
  {
    id: '2',
    name: 'Sarah Kim',
    role: 'AI Research Engineer',
    bio: 'Machine learning specialist focused on practical AI applications and ethical technology.',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    socialLinks: {
      twitter: 'https://twitter.com/sarahkim',
      linkedin: 'https://linkedin.com/in/sarahkim'
    }
  },
  {
    id: '3',
    name: 'Marcus Rodriguez',
    role: 'Engineering Manager',
    bio: 'Engineering leader with 15+ years building and scaling distributed development teams.',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/marcusrodriguez',
      twitter: 'https://twitter.com/marcusrod'
    }
  },
  {
    id: '4',
    name: 'Elena Vasquez',
    role: 'Senior UX Designer',
    bio: 'Design systems expert passionate about creating accessible, user-centered digital experiences.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/elenavasquez',
      github: 'https://github.com/elenav'
    }
  },
  {
    id: '5',
    name: 'David Park',
    role: 'Frontend Architect',
    bio: 'CSS architecture specialist and performance optimization expert with deep frontend expertise.',
    avatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150',
    socialLinks: {
      github: 'https://github.com/davidpark',
      twitter: 'https://twitter.com/davidpark'
    }
  }
];

export const CATEGORIES: BlogCategory[] = [
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

### The Core Principles

**1. Intentional Simplicity**
Every element must earn its place. This doesn't mean sparse design, but rather purposeful design where each component serves a clear function or emotional goal.

**2. Visual Hierarchy Through Space**
White space (or negative space) becomes an active design element, guiding attention and creating rhythm. It's not empty space—it's breathing room for content to communicate effectively.

**3. Typography as Voice**
In pure digital design, typography carries more weight. Font choices, sizing, and spacing become primary tools for conveying personality and establishing hierarchy.

## Technical Implementation

Achieving digital purity requires both design sensibility and technical precision. Here's how we approach it:

### Clean Code Architecture

\`\`\`typescript
// Pure component structure - single responsibility
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  children, 
  onClick 
}) => {
  return (
    <button 
      className={cn(
        'transition-all duration-200 ease-out',
        variants[variant],
        sizes[size]
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

### Performance Considerations

Pure design often leads to better performance because:
- Fewer visual elements mean smaller bundle sizes
- Reduced complexity decreases render time
- Clean code is easier to optimize and maintain

## Real-World Impact

Our projects implementing digital purity principles have seen:
- **40% increase** in user engagement
- **25% reduction** in bounce rate
- **60% improvement** in task completion rates

## The Future of Digital Purity

As AI and machine learning reshape user interfaces, digital purity provides a stable foundation. Clean, intentional design creates space for intelligent features to enhance rather than complicate the user experience.

The goal isn't to create empty interfaces, but to craft experiences that feel effortless and meaningful—where every interaction serves a purpose and every visual element tells part of your story.
    `,
    category: CATEGORIES[0],
    author: AUTHORS[3],
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

## Strategic Planning for AI Integration

### 1. Define Clear Objectives

Before implementing any AI feature, establish specific, measurable goals:
- **User Experience Enhancement**: How will AI improve the user journey?
- **Business Value**: What concrete business metrics will improve?
- **Technical Feasibility**: Can your current infrastructure support the AI workload?

### 2. Start Small, Scale Smart

Begin with focused AI implementations that solve specific problems:

\`\`\`typescript
// Example: Smart content suggestions
interface ContentSuggestion {
  id: string;
  title: string;
  relevanceScore: number;
  reason: string;
}

const useAISuggestions = (userContext: UserContext) => {
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  
  useEffect(() => {
    // Implement progressive enhancement
    // Start with rule-based suggestions, enhance with ML
    const baseSuggestions = getBaseSuggestions(userContext);
    setSuggestions(baseSuggestions);
    
    // Enhance with AI when available
    enhanceWithAI(baseSuggestions, userContext)
      .then(enhanced => setSuggestions(enhanced))
      .catch(() => {
        // Graceful fallback to base suggestions
        console.log('AI enhancement unavailable, using base suggestions');
      });
  }, [userContext]);
  
  return suggestions;
};
\`\`\`

## Implementation Patterns

### Progressive Enhancement with AI

AI features should enhance, not replace, fundamental functionality:

1. **Baseline Functionality**: Ensure core features work without AI
2. **AI Enhancement**: Add intelligent features as progressive enhancement
3. **Graceful Degradation**: Maintain functionality when AI services are unavailable

### Performance Optimization

AI integration often introduces latency challenges. Here's how we address them:

\`\`\`typescript
// Implement caching and prediction
const AICache = {
  predictions: new Map<string, any>(),
  
  async getPrediction(input: string, model: string) {
    const cacheKey = \`\${model}:\${input}\`;
    
    if (this.predictions.has(cacheKey)) {
      return this.predictions.get(cacheKey);
    }
    
    const prediction = await callAIService(input, model);
    this.predictions.set(cacheKey, prediction);
    
    return prediction;
  }
};
\`\`\`

## User Experience Considerations

### Transparency and Control

Users should understand when and how AI is being used:
- **Clear Indicators**: Show when AI is processing or has made suggestions
- **User Control**: Allow users to accept, modify, or reject AI recommendations
- **Explanation**: Provide context for AI decisions when relevant

### Handling Uncertainty

AI is probabilistic, not deterministic. Design for uncertainty:
- Show confidence levels when appropriate
- Provide multiple options rather than single recommendations
- Allow easy correction of AI mistakes

## Common Integration Challenges

### 1. Data Quality and Bias
- Implement robust data validation
- Regular bias testing and correction
- Diverse training data sources

### 2. Scalability Concerns
- Use edge computing for real-time features
- Implement efficient caching strategies
- Monitor and optimize model performance

### 3. Privacy and Security
- Process sensitive data locally when possible
- Implement proper data anonymization
- Regular security audits for AI endpoints

## Measuring Success

Track both technical and user-centric metrics:

**Technical Metrics:**
- Model accuracy and performance
- Response times and availability
- Resource utilization

**User Metrics:**
- Feature adoption rates
- User satisfaction scores
- Task completion improvements

## Looking Forward

As AI capabilities continue to evolve, the most successful applications will be those that integrate intelligence seamlessly into existing workflows, enhancing human capabilities rather than replacing human judgment.

The future belongs to applications that use AI to understand context, predict needs, and reduce cognitive load—all while maintaining the transparency and control that users expect.
    `,
    category: CATEGORIES[2],
    author: AUTHORS[1],
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

## The Distributed Advantage

When done right, distributed teams offer significant advantages:
- **24/7 Development Cycle**: Handoffs between time zones accelerate delivery
- **Global Talent Access**: Hire the best people regardless of location
- **Diverse Perspectives**: Different cultural viewpoints improve problem-solving
- **Cost Optimization**: Leverage global economic differences strategically

## Foundational Principles

### 1. Asynchronous-First Communication

Design all processes to work asynchronously by default:

\`\`\`markdown
## Daily Progress Updates (Async)
**Yesterday's Accomplishments:**
- Feature X implementation completed
- Bug #123 resolved and tested
- Code review for PR #456 completed

**Today's Focus:**
- Begin integration testing for Feature X
- Start architecture planning for Feature Y
- Review and merge outstanding PRs

**Blockers & Questions:**
- Need clarity on API endpoint for Feature Y
- Waiting for design assets for mobile component
\`\`\`

### 2. Documentation as Infrastructure

Treat documentation with the same rigor as code:
- **Decision Records**: Document why decisions were made
- **Runbooks**: Clear procedures for common tasks
- **Architecture Docs**: Keep system knowledge accessible
- **Onboarding Guides**: Standardize new team member integration

### 3. Overlap Windows for Critical Decisions

Identify 2-4 hour windows where key team members overlap:
- **Daily Standups**: Short, focused, problem-solving oriented
- **Architecture Reviews**: Complex decisions requiring real-time discussion
- **Emergency Response**: Critical issue resolution

## Technical Infrastructure

### Development Environment Standardization

\`\`\`dockerfile
# Standardized development environment
FROM node:18-alpine

# Install global dependencies
RUN npm install -g pnpm@latest

# Create consistent workspace
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Development tools
RUN apk add --no-cache git curl

# Standardized user setup
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

USER nextjs
\`\`\`

### Code Review and Quality Gates

Implement automated quality checks that work across time zones:
- **Automated Testing**: Comprehensive test suites run on every commit
- **Code Quality Gates**: ESLint, Prettier, TypeScript checks
- **Security Scanning**: Automated vulnerability detection
- **Performance Monitoring**: Lighthouse CI for frontend changes

## Cultural Design

### Building Trust at Distance

**Transparency by Default:**
- All decisions documented in shared spaces
- Progress visible through automated reporting
- Regular team retrospectives and feedback cycles

**Psychological Safety:**
- Create safe spaces for questions and mistakes
- Celebrate learning from failures
- Encourage experimentation and innovation

### Communication Protocols

**Written Communication Standards:**
- Clear, actionable language
- Context-rich messages (don't assume shared knowledge)
- Time-sensitive items clearly marked
- Cultural sensitivity in language and timing

**Meeting Hygiene:**
- Agendas shared 24 hours in advance
- Recordings for asynchronous review
- Action items with clear owners and deadlines
- Respect for non-native speakers (slower pace, clear pronunciation)

## Measuring Success

Track both technical and team health metrics:

**Technical Metrics:**
- Deployment frequency and lead time
- Mean time to recovery
- Code review turnaround time

**Team Health Metrics:**
- Employee satisfaction scores
- Knowledge sharing frequency
- Cross-timezone collaboration instances
- Retention rates by region

## The Future of Distributed Teams

As AI and automation tools improve, distributed teams will become even more effective. The combination of human creativity across cultures with intelligent tooling will create unprecedented development capabilities.

The key is building strong foundations now—clear communication, robust documentation, and inclusive culture—that can scale and adapt as technology evolves.

Success in distributed development isn't about managing remote workers; it's about designing systems that enable talented people to do their best work regardless of location.
    `,
    category: CATEGORIES[3],
    author: AUTHORS[2],
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

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)

LCP measures loading performance. To optimize:

\`\`\`tsx
// Optimize hero images with priority loading
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="hero">
      <Image
        src="/hero-image.jpg"
        alt="Hero"
        width={1920}
        height={1080}
        priority
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
        sizes="100vw"
      />
    </div>
  );
}
\`\`\`

### First Input Delay (FID) & Interaction to Next Paint (INP)

Minimize JavaScript execution time:

\`\`\`tsx
// Code splitting with dynamic imports
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

### Cumulative Layout Shift (CLS)

Prevent layout shifts with proper sizing:

\`\`\`tsx
// Always specify dimensions for images
<Image
  src="/content-image.jpg"
  alt="Content"
  width={800}
  height={600}
  style={{
    width: '100%',
    height: 'auto',
  }}
/>

// Reserve space for dynamic content
<div style={{ minHeight: '200px' }}>
  {loading ? <Skeleton /> : <DynamicContent />}
</div>
\`\`\`

## Advanced Caching Strategies

### API Route Caching

\`\`\`tsx
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const posts = await fetchPosts();
  
  return NextResponse.json(posts, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
\`\`\`

### Static Generation with ISR

\`\`\`tsx
// app/blog/[slug]/page.tsx
interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: PageProps) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

// Enable ISR
export const revalidate = 3600; // Revalidate every hour
\`\`\`

## Bundle Optimization

### Analyzing Bundle Size

\`\`\`bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Your Next.js config
});

# Run analysis
ANALYZE=true npm run build
\`\`\`

## Results and Impact

Implementing these optimization techniques typically yields:
- **50-70% improvement** in LCP scores
- **40-60% reduction** in bundle size
- **30-50% faster** time to interactive
- **85%+ improvement** in Core Web Vitals scores

The key to Next.js performance optimization is measuring first, optimizing based on data, and continuously monitoring the impact of your changes.
    `,
    category: CATEGORIES[1],
    author: AUTHORS[0],
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

## The Foundation of Scalable UCD

### Research-Driven Decision Making

Every design decision should be backed by user research:

\`\`\`typescript
// Research tracking system
interface UserResearch {
  id: string;
  type: 'interview' | 'survey' | 'usability-test' | 'analytics';
  participants: number;
  insights: Insight[];
  decisions: DesignDecision[];
  date: Date;
}

interface Insight {
  finding: string;
  evidence: string[];
  confidence: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
}
\`\`\`

### Continuous User Feedback Loops

Build feedback collection into every touchpoint:

**Micro-Interactions Feedback:**
- In-app feedback widgets
- Post-action satisfaction ratings
- Contextual help usage tracking

**Macro-Experience Feedback:**
- Journey mapping sessions
- Quarterly user panels
- Long-term satisfaction surveys

## Design System Integration

### Component-Level User Research

Every component should have user research backing:

\`\`\`tsx
// Component with research metadata
interface ButtonResearch {
  usabilityScore: number;
  accessibilityRating: string;
  userPreferences: {
    size: string;
    variant: string;
    context: string;
  };
  iterationHistory: DesignIteration[];
}

export const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size, 
  children, 
  onClick 
}) => {
  // Implementation with research-backed defaults
  const researchOptimized = useResearchOptimizations(variant, size);
  
  return (
    <button 
      className={cn(
        'focus:ring-2 focus:ring-offset-2', // Accessibility research-backed
        researchOptimized.styles
      )}
      onClick={onClick}
      aria-label={researchOptimized.ariaLabel}
    >
      {children}
    </button>
  );
};
\`\`\`

The organizations that master scalable user-centered design will create products that not only meet user needs but anticipate and exceed them, building lasting competitive advantages through superior user experiences.
    `,
    category: CATEGORIES[0],
    author: AUTHORS[3],
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

## The Problems with Traditional CSS

### Specificity Wars and Global Pollution

Traditional CSS approaches often lead to:
- Unpredictable cascade behavior
- Specificity conflicts requiring !important
- Global namespace pollution
- Difficult-to-maintain stylesheets

\`\`\`css
/* Traditional approach - problematic */
.header { color: blue; }
.main .header { color: red; } /* Higher specificity */
.header.special { color: green !important; } /* Nuclear option */
\`\`\`

## Modern CSS Architecture Principles

### 1. Component-Based Thinking

CSS should mirror your component architecture:

\`\`\`css
/* Component-scoped CSS */
.button {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.button--primary {
  background-color: var(--color-primary);
  color: white;
}

.button--secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}
\`\`\`

Modern CSS architecture isn't about following rigid rules—it's about creating systems that work for your team, scale with your product, and provide excellent user experiences. The key is choosing the right combination of tools and patterns for your specific context and constraints.
    `,
    category: CATEGORIES[1],
    author: AUTHORS[4],
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

## RESTful API Design Principles

### Resource-Based URLs

Design URLs around resources, not actions:

\`\`\`
// Good - Resource-based
GET /api/users
GET /api/users/123
POST /api/users
PUT /api/users/123
DELETE /api/users/123

GET /api/users/123/posts
POST /api/users/123/posts

// Bad - Action-based
GET /api/getUsers
GET /api/getUserById/123
POST /api/createUser
PUT /api/updateUser/123
DELETE /api/deleteUser/123
\`\`\`

### HTTP Methods and Status Codes

Use HTTP methods semantically:

\`\`\`typescript
// RESTful endpoint implementation
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});
\`\`\`

Modern API design is about creating interfaces that are intuitive for developers, performant for users, and maintainable for teams. By following these best practices, you'll build APIs that scale with your application and provide excellent developer experience.
    `,
    category: CATEGORIES[1],
    author: AUTHORS[1],
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

export const getPostsByAuthor = (authorId: string) => 
  BLOG_POSTS.filter(post => 
    post.author.id === authorId && post.isPublished
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
