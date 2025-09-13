import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/auth-admin';
import { BLOG_POSTS } from '@/data/blog';
import { BlogPost } from '@/types/blog';

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const verificationResult = await verifyIdToken(token);
    
    if (!verificationResult.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.toLowerCase();
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let filteredPosts = [...BLOG_POSTS];

    // Apply search filter
    if (search) {
      filteredPosts = filteredPosts.filter((post: BlogPost) => 
        post.title.toLowerCase().includes(search) ||
        post.excerpt.toLowerCase().includes(search) ||
        post.author.name.toLowerCase().includes(search)
      );
    }

    // Apply category filter
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter((post: BlogPost) => 
        post.category.name.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply status filter
    if (status && status !== 'all') {
      if (status === 'published') {
        filteredPosts = filteredPosts.filter((post: BlogPost) => post.isPublished);
      } else if (status === 'draft') {
        filteredPosts = filteredPosts.filter((post: BlogPost) => !post.isPublished);
      } else if (status === 'featured') {
        filteredPosts = filteredPosts.filter((post: BlogPost) => post.isFeatured);
      }
    }

    // Calculate stats
    const stats = {
      total: BLOG_POSTS.length,
      published: BLOG_POSTS.filter((post: BlogPost) => post.isPublished).length,
      drafts: BLOG_POSTS.filter((post: BlogPost) => !post.isPublished).length,
      featured: BLOG_POSTS.filter((post: BlogPost) => post.isFeatured).length
    };

    return NextResponse.json({
      posts: filteredPosts,
      stats
    });
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const verificationResult = await verifyIdToken(token);
    
    if (!verificationResult.success) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, excerpt, content, category, author, featured, published, metaTitle, metaDescription, canonicalUrl, imageUrl } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !category || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate author object structure
    if (!author.name || !author.role) {
      return NextResponse.json({ error: 'Invalid author data' }, { status: 400 });
    }

    // Create new blog post
    const newPost: BlogPost = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt,
      content,
      category: { id: category, name: category, slug: category.toLowerCase(), description: '', color: '#3b82f6' },
      author,
      isPublished: published || false,
      isFeatured: featured || false,
      publishedAt: published ? new Date().toISOString() : '',
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      featuredImage: imageUrl || '/images/blog/default.jpg',
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        canonicalUrl: canonicalUrl || `https://absterco.com/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
      }
    };

    // In a real app, this would save to database
    // For now, we'll just return the created post
    return NextResponse.json({ 
      success: true, 
      post: newPost,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    console.error('Create blog post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}