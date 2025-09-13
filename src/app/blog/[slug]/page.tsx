import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogPostClient from './BlogPostClient';
import { BlogService } from '@/lib/blog-service';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Only fetch from Firebase, no fallback to static data
  let post = null;
  
  try {
    post = await BlogService.getPostBySlug(slug);
  } catch (error) {
    console.error('Error fetching from Firebase:', error);
  }

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <BlogPostClient post={post} />
      <Footer />
    </>
  );
}
