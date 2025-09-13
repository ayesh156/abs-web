import { NextRequest, NextResponse } from 'next/server';
import { verifyIdToken } from '@/lib/auth-admin';
import { BLOG_POSTS } from '@/data/blog';
import { BlogPost } from '@/types/blog';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
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

    const post = BLOG_POSTS.find((p: BlogPost) => p.id === id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Get blog post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
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

    // Find existing post
    const existingPostIndex = BLOG_POSTS.findIndex((p: BlogPost) => p.id === id);
    
    if (existingPostIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Validate required fields
    if (!title || !excerpt || !content || !category || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate author object structure
    if (!author.name || !author.role) {
      return NextResponse.json({ error: 'Invalid author data' }, { status: 400 });
    }

    // Update blog post
    const updatedPost: BlogPost = {
      ...BLOG_POSTS[existingPostIndex],
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt,
      content,
      category: { id: category, name: category, slug: category.toLowerCase(), description: '', color: '#3b82f6' },
      author,
      isPublished: published || false,
      isFeatured: featured || false,
      publishedAt: published ? (BLOG_POSTS[existingPostIndex].publishedAt || new Date().toISOString()) : '',
      readTime: `${Math.ceil(content.split(' ').length / 200)} min read`,
      featuredImage: imageUrl || BLOG_POSTS[existingPostIndex].featuredImage,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        canonicalUrl: canonicalUrl || `https://absterco.com/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
      }
    };

    // In a real app, this would update in database
    // For now, we'll just return the updated post
    return NextResponse.json({ 
      success: true, 
      post: updatedPost,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    console.error('Update blog post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    
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

    // Find existing post
    const existingPostIndex = BLOG_POSTS.findIndex((p: BlogPost) => p.id === id);
    
    if (existingPostIndex === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // In a real app, this would delete from database
    // For now, we'll just return success
    return NextResponse.json({ 
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}