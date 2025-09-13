'use client';

import { useState, useEffect } from 'react';
import { BlogService, CategoryService } from '@/lib/blog-service';
import { BlogPost, BlogCategory } from '@/types/blog';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FlaskConical, Database, Search, Star, Eye, Tag, PlayCircle, AlertCircle, CheckCircle, Info } from 'lucide-react';

export default function BlogDebugPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testBasicQuery = async () => {
    setIsLoading(true);
    setError(null);
    addResult('Testing basic blog posts query (no filters)...');

    try {
      // Test with no filtering to avoid any index issues
      const allPosts = await BlogService.getPosts({ 
        limitCount: 10,
        useFallback: false // Test Firebase only, no fallback
      });
      setPosts(allPosts);
      addResult(`Firebase: Successfully fetched ${allPosts.length} posts`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      addResult(`Firebase failed: ${errorMsg}`);
      
      // Now test with fallback
      try {
        const fallbackPosts = await BlogService.getPosts({ 
          limitCount: 10,
          useFallback: true
        });
        addResult(`Fallback: Successfully loaded ${fallbackPosts.length} sample posts`);
        setPosts(fallbackPosts);
      } catch (fallbackErr) {
        addResult(`Fallback also failed: ${fallbackErr instanceof Error ? fallbackErr.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const testPublishedQuery = async () => {
    setIsLoading(true);
    addResult('Testing published posts query...');

    try {
      const publishedPosts = await BlogService.getPosts({ 
        published: true, 
        limitCount: 10 
      });
      addResult(`Successfully fetched ${publishedPosts.length} published posts`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      addResult(`Error fetching published posts: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testFeaturedQuery = async () => {
    setIsLoading(true);
    addResult('Testing featured posts query...');

    try {
      const featuredPosts = await BlogService.getPosts({ 
        featured: true, 
        limitCount: 10 
      });
      addResult(`Successfully fetched ${featuredPosts.length} featured posts`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      addResult(`Error fetching featured posts: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testCategoriesQuery = async () => {
    setIsLoading(true);
    addResult('Testing categories query...');

    try {
      const categoriesData = await CategoryService.getCategories();
      setCategories(categoriesData);
      addResult(`Successfully fetched ${categoriesData.length} categories`);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      addResult(`Error fetching categories: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testFirebaseConnection = async () => {
    setIsLoading(true);
    addResult('Testing basic Firebase connection...');

    try {
      // Test the simplest possible Firestore query
      const { collection, getDocs } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      const testCollection = collection(db, 'blogPosts');
      const snapshot = await getDocs(testCollection);
      
      addResult(`Firebase connected! Collection exists with ${snapshot.size} documents`);
      
      if (snapshot.size === 0) {
        addResult('No documents in blogPosts collection - this is expected for new projects');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      addResult(`Firebase connection failed: ${errorMsg}`);
      
      if (errorMsg.includes('index')) {
        addResult('Index error detected - the blog will use fallback data automatically');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const runAllTests = async () => {
    setTestResults([]);
    addResult('Starting comprehensive blog service tests...');
    
    await testFirebaseConnection();
    await testBasicQuery();
    await testPublishedQuery();
    await testFeaturedQuery();
    await testCategoriesQuery();
    
    addResult('All tests completed!');
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
          <FlaskConical className="w-8 h-8" />
          Blog Service Debug
        </h1>
        
        {/* Test Controls */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Test Controls</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={runAllTests} 
              disabled={isLoading}
              className="bg-accent-green text-black hover:bg-accent-green/80 flex items-center gap-2"
            >
              {isLoading ? <LoadingSpinner className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
              Run All Tests
            </Button>
            <Button onClick={testBasicQuery} disabled={isLoading} variant="outline" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Test Basic Query
            </Button>
            <Button onClick={testPublishedQuery} disabled={isLoading} variant="outline" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Test Published Query
            </Button>
            <Button onClick={testFeaturedQuery} disabled={isLoading} variant="outline" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Test Featured Query
            </Button>
            <Button onClick={testCategoriesQuery} disabled={isLoading} variant="outline" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Test Categories
            </Button>
            <Button onClick={testFirebaseConnection} disabled={isLoading} variant="outline" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Test Firebase Connection
            </Button>
          </div>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="p-6 mb-8 border-red-500/50 bg-red-500/10">
            <h3 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Error
            </h3>
            <p className="text-red-300">{error}</p>
          </Card>
        )}

        {/* Test Results */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Test Results</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-white/60">No tests run yet. Click "Run All Tests" to begin.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm text-white/80 font-mono bg-white/5 p-2 rounded">
                  {result}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Data Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Posts */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Posts ({posts.length})
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {posts.map((post) => (
                <div key={post.id} className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">{post.title}</h3>
                  <p className="text-white/60 text-sm mb-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className={`px-2 py-1 rounded ${post.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {post.isFeatured && (
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <span className="bg-white/10 text-white/60 px-2 py-1 rounded">
                      {post.category.name}
                    </span>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="text-white/60">No posts loaded yet.</p>
              )}
            </div>
          </Card>

          {/* Categories */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Categories ({categories.length})
            </h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="bg-white/5 p-3 rounded-lg flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-white font-medium">{category.name}</span>
                  <span className="text-white/60 text-sm">({category.slug})</span>
                </div>
              ))}
              {categories.length === 0 && (
                <p className="text-white/60">No categories loaded yet.</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}