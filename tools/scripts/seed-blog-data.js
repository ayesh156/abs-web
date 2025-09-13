/**
 * Seed script to populate Firebase with initial blog data
 * Run this script to set up categories and sample posts with embedded authors in Firebase Firestore
 */

const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin (update path to your service account key)
if (!admin.apps.length) {
  const serviceAccount = require(path.join(__dirname, '../firebase-admin-key.json'));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'your-project-id.appspot.com' // Update with your project ID
  });
}

const db = admin.firestore();

// Sample embedded author data (no longer stored as separate documents)
const authors = {
  'john-doe': {
    name: 'John Doe',
    role: 'Senior Developer',
    position: 'Lead Full-Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces',
    bio: 'Full-stack developer with 8+ years of experience in modern web technologies.'
  },
  'sarah-wilson': {
    name: 'Sarah Wilson',
    role: 'UI/UX Designer',
    position: 'Senior Product Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=faces',
    bio: 'Creative designer passionate about creating beautiful and intuitive user experiences.'
  },
  'mike-chen': {
    name: 'Mike Chen',
    role: 'DevOps Engineer',
    position: 'Cloud Infrastructure Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
    bio: 'Infrastructure specialist focused on scalable cloud solutions and automation.'
  }
};

// Sample categories data
const categories = [
  {
    id: 'web-development',
    name: 'Web Development',
    slug: 'web-development',
    description: 'Latest trends and best practices in web development',
    color: '#3B82F6',
    isActive: true,
    postCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'design',
    name: 'Design',
    slug: 'design',
    description: 'UI/UX design principles, tools, and inspiration',
    color: '#EC4899',
    isActive: true,
    postCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'technology',
    name: 'Technology',
    slug: 'technology',
    description: 'Tech news, insights, and emerging technologies',
    color: '#10B981',
    isActive: true,
    postCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'tutorials',
    name: 'Tutorials',
    slug: 'tutorials',
    description: 'Step-by-step guides and how-to articles',
    color: '#F59E0B',
    isActive: true,
    postCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    slug: 'best-practices',
    description: 'Industry standards and recommended approaches',
    color: '#8B5CF6',
    isActive: true,
    postCount: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    slug: 'case-studies',
    description: 'Real-world project examples and success stories',
    color: '#EF4444',
    isActive: true,
    postCount: 0,
    createdAt: new Date().toISOString()
  }
];

// Sample blog posts data
const samplePosts = [
  {
    id: 'getting-started-nextjs-15',
    slug: 'getting-started-nextjs-15',
    title: 'Getting Started with Next.js 15: Complete Guide',
    excerpt: 'Learn how to build modern web applications with Next.js 15, featuring the latest App Router, Server Components, and TypeScript integration.',
    content: `
      <h2>Introduction to Next.js 15</h2>
      <p>Next.js 15 brings exciting new features and improvements that make building React applications faster and more efficient than ever before.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Improved App Router with better performance</li>
        <li>Enhanced Server Components</li>
        <li>Better TypeScript integration</li>
        <li>Optimized bundling with Turbopack</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>To create a new Next.js 15 project, run the following command:</p>
      <pre><code>npx create-next-app@latest my-app --typescript --tailwind --eslint</code></pre>
      
      <h3>Project Structure</h3>
      <p>Next.js 15 uses the App Router by default, which provides a new way to organize your application:</p>
      <ul>
        <li><code>app/</code> - Contains your application routes and layouts</li>
        <li><code>components/</code> - Reusable React components</li>
        <li><code>lib/</code> - Utility functions and configurations</li>
        <li><code>public/</code> - Static assets</li>
      </ul>
      
      <h3>Conclusion</h3>
      <p>Next.js 15 offers powerful features that streamline the development process. Start building your next project today!</p>
    `,
    category: 'web-development',
    author: 'john-doe',
    featuredImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
    readTime: '8 min read',
    isFeatured: true,
    isPublished: true,
    publishedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    seo: {
      metaTitle: 'Getting Started with Next.js 15: Complete Guide | Absterco Blog',
      metaDescription: 'Learn how to build modern web applications with Next.js 15, featuring the latest App Router, Server Components, and TypeScript integration.',
      canonicalUrl: 'https://absterco.com/blog/getting-started-nextjs-15'
    }
  },
  {
    id: 'design-system-best-practices',
    slug: 'design-system-best-practices',
    title: 'Building Scalable Design Systems: Best Practices',
    excerpt: 'Discover how to create and maintain design systems that scale across teams and products, with practical examples and real-world insights.',
    content: `
      <h2>What is a Design System?</h2>
      <p>A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.</p>
      
      <h3>Core Components</h3>
      <ul>
        <li>Design tokens (colors, typography, spacing)</li>
        <li>Component library</li>
        <li>Documentation and guidelines</li>
        <li>Tools and processes</li>
      </ul>
      
      <h3>Benefits</h3>
      <p>A well-implemented design system provides:</p>
      <ul>
        <li>Consistency across products</li>
        <li>Faster development cycles</li>
        <li>Better collaboration between teams</li>
        <li>Easier maintenance and updates</li>
      </ul>
      
      <h3>Implementation Strategy</h3>
      <p>Start small and grow incrementally. Begin with the most commonly used components and expand over time.</p>
      
      <h3>Tools and Technologies</h3>
      <p>Popular tools for building design systems include Figma, Storybook, and Styled Components.</p>
    `,
    category: 'design',
    author: 'sarah-wilson',
    featuredImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=630&fit=crop',
    readTime: '6 min read',
    isFeatured: false,
    isPublished: true,
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    seo: {
      metaTitle: 'Building Scalable Design Systems: Best Practices | Absterco Blog',
      metaDescription: 'Discover how to create and maintain design systems that scale across teams and products, with practical examples and real-world insights.',
      canonicalUrl: 'https://absterco.com/blog/design-system-best-practices'
    }
  },
  {
    id: 'firebase-security-guide',
    slug: 'firebase-security-guide',
    title: 'Firebase Security Rules: Complete Guide',
    excerpt: 'Master Firebase security rules to protect your application data. Learn best practices for authentication, authorization, and data validation.',
    content: `
      <h2>Understanding Firebase Security</h2>
      <p>Firebase Security Rules provide a powerful way to control access to your data and ensure your application remains secure.</p>
      
      <h3>Basic Rules Structure</h3>
      <pre><code>rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}</code></pre>
      
      <h3>Authentication Checks</h3>
      <p>Always verify that users are authenticated before granting access:</p>
      <pre><code>allow read, write: if request.auth != null;</code></pre>
      
      <h3>Data Validation</h3>
      <p>Validate incoming data to ensure it meets your requirements:</p>
      <pre><code>allow write: if request.resource.data.keys().hasAll(['title', 'content'])
  && request.resource.data.title is string
  && request.resource.data.content is string;</code></pre>
      
      <h3>Role-Based Access</h3>
      <p>Implement different access levels based on user roles.</p>
      
      <h3>Testing Your Rules</h3>
      <p>Use the Firebase emulator to test your security rules before deploying to production.</p>
    `,
    category: 'tutorials',
    author: 'mike-chen',
    featuredImage: 'https://images.unsplash.com/photo-1555949963-f15cefc938a2?w=1200&h=630&fit=crop',
    readTime: '10 min read',
    isFeatured: false,
    isPublished: false, // Draft
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
    seo: {
      metaTitle: 'Firebase Security Rules: Complete Guide | Absterco Blog',
      metaDescription: 'Master Firebase security rules to protect your application data. Learn best practices for authentication, authorization, and data validation.',
      canonicalUrl: 'https://absterco.com/blog/firebase-security-guide'
    }
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Seed categories
    console.log('📂 Adding categories...');
    for (const category of categories) {
      await db.collection('categories').doc(category.id).set(category);
      console.log(`Added category: ${category.name}`);
    }

    // Seed sample blog posts with embedded authors
    console.log('📰 Adding sample blog posts...');
    for (const post of samplePosts) {
      // Get category reference and embed author data
      const categoryDoc = await db.collection('categories').doc(post.category).get();
      const authorData = authors[post.author];

      if (categoryDoc.exists && authorData) {
        const fullPost = {
          ...post,
          author: authorData, // Embed author data directly
          category: {
            id: categoryDoc.id,
            ...categoryDoc.data()
          }
        };

        // Remove the author reference field since we're embedding
        delete fullPost.author;
        fullPost.author = authorData;

        await db.collection('blog-posts').doc(post.id).set(fullPost);
        console.log(`Added blog post: ${post.title}`);

        // Update category post count
        if (post.isPublished) {
          await db.collection('categories').doc(post.category).update({
            postCount: admin.firestore.FieldValue.increment(1)
          });
        }
      }
    }

    console.log('Database seeding completed successfully!');
    console.log(`Summary:
    - ${categories.length} categories added
    - ${samplePosts.length} blog posts added with embedded authors
    - No separate author documents created (authors are embedded in posts)`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();