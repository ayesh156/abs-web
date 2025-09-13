import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';
import { db, storage } from './firebase';
import { BlogPost, BlogCategory } from '@/types/blog';
import { smartCompress, CompressionResult } from './imageCompression';
import { BLOG_CATEGORIES } from '@/constants/blog';
import { BLOG_POSTS } from '@/data/blog'; // Fallback data

// Collection names
const COLLECTIONS = {
  BLOG_POSTS: 'blogPosts',
  CATEGORIES: 'categories'
} as const;

// Blog Post Service
export class BlogService {
  // Create a new blog post
  static async createPost(postData: Omit<BlogPost, 'id' | 'publishedAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.BLOG_POSTS), {
        ...postData,
        publishedAt: postData.isPublished ? serverTimestamp() : null,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw new Error('Failed to create blog post');
    }
  }

  // Get all blog posts with optional filters (NO composite indexes required)
  static async getPosts(options: {
    published?: boolean;
    featured?: boolean;
    categoryId?: string;
    limitCount?: number;
    orderByField?: 'publishedAt' | 'updatedAt' | 'createdAt';
    orderDirection?: 'asc' | 'desc';
    useFallback?: boolean;
  } = {}): Promise<BlogPost[]> {
    const {
      published,
      featured,
      categoryId,
      limitCount = 50,
      orderByField = 'updatedAt',
      orderDirection = 'desc',
      useFallback = true
    } = options;

    try {
      // Always use simple queries that don't require composite indexes
      // Get all documents with just ordering (no where clauses)
      const q = query(
        collection(db, COLLECTIONS.BLOG_POSTS),
        orderBy(orderByField, orderDirection),
        limit(limitCount * 3) // Get extra docs to account for client-side filtering
      );

      const querySnapshot = await getDocs(q);
      let posts = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Extract and serialize the data, removing any fields not in BlogPost interface
        const { createdAt: _, ...postData } = data;
        
        return {
          id: doc.id,
          ...postData,
          publishedAt: data.publishedAt?.toDate?.()?.toISOString() || '',
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || ''
        };
      }) as BlogPost[];

      // Apply ALL filtering on the client side to avoid any composite indexes
      posts = posts.filter(post => {
        if (published !== undefined && post.isPublished !== published) return false;
        if (featured !== undefined && post.isFeatured !== featured) return false;
        if (categoryId && post.category?.id !== categoryId) return false;
        return true;
      });

      // Return limited results
      const result = posts.slice(0, limitCount);
      
      // If no posts found and fallback is enabled, use sample data
      if (result.length === 0 && useFallback) {
        console.warn('No Firebase posts found, using fallback sample data');
        return this.getFallbackPosts(options);
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching blog posts from Firebase:', error);
      
      // If Firebase fails and fallback is enabled, use sample data
      if (useFallback) {
        console.warn('Firebase unavailable, using fallback sample data');
        return this.getFallbackPosts(options);
      }
      
      throw new Error('Failed to fetch blog posts');
    }
  }

  // Fallback method using sample data
  private static getFallbackPosts(options: {
    published?: boolean;
    featured?: boolean;
    categoryId?: string;
    limitCount?: number;
    orderByField?: 'publishedAt' | 'updatedAt' | 'createdAt';
    orderDirection?: 'asc' | 'desc';
  } = {}): BlogPost[] {
    const {
      published,
      featured,
      categoryId,
      limitCount = 50,
      orderByField = 'publishedAt',
      orderDirection = 'desc'
    } = options;

    let posts = [...BLOG_POSTS];

    // Apply filtering
    posts = posts.filter(post => {
      if (published !== undefined && post.isPublished !== published) return false;
      if (featured !== undefined && post.isFeatured !== featured) return false;
      if (categoryId && post.category?.id !== categoryId) return false;
      return true;
    });

    // Apply sorting
    posts.sort((a, b) => {
      let aDate: Date;
      let bDate: Date;
      
      if (orderByField === 'publishedAt') {
        aDate = new Date(a.publishedAt);
        bDate = new Date(b.publishedAt);
      } else if (orderByField === 'updatedAt') {
        aDate = new Date(a.updatedAt || a.publishedAt);
        bDate = new Date(b.updatedAt || b.publishedAt);
      } else {
        // Default to publishedAt for any other field
        aDate = new Date(a.publishedAt);
        bDate = new Date(b.publishedAt);
      }
      
      return orderDirection === 'desc' 
        ? bDate.getTime() - aDate.getTime()
        : aDate.getTime() - bDate.getTime();
    });

    return posts.slice(0, limitCount);
  }

  // Get a single blog post by ID
  static async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Extract and serialize the data, removing any fields not in BlogPost interface
        const { createdAt: _, ...postData } = data;
        
        return {
          id: docSnap.id,
          ...postData,
          publishedAt: data.publishedAt?.toDate?.()?.toISOString() || '',
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || ''
        } as BlogPost;
      }
      return null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  // Get a blog post by slug
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const q = query(
        collection(db, COLLECTIONS.BLOG_POSTS),
        where('slug', '==', slug),
        where('isPublished', '==', true),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        
        // Extract and serialize the data, removing any fields not in BlogPost interface
        const { createdAt: _, ...postData } = data;
        
        return {
          id: doc.id,
          ...postData,
          publishedAt: data.publishedAt?.toDate?.()?.toISOString() || '',
          updatedAt: data.updatedAt?.toDate?.()?.toISOString() || ''
        } as BlogPost;
      }
      return null;
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      throw new Error('Failed to fetch blog post');
    }
  }

  // Update a blog post with image lifecycle management
  static async updatePost(id: string, updateData: Partial<BlogPost>): Promise<void> {
    try {
      // Get current post to check for existing images
      const currentPost = await this.getPostById(id);
      
      const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id);
      const updatePayload: any = {
        ...updateData,
        updatedAt: serverTimestamp()
      };

      // Update publishedAt if changing to published
      if (updateData.isPublished && !updateData.publishedAt) {
        updatePayload.publishedAt = serverTimestamp();
      }

      // QA: Enhanced defensive image handling during updates
      if (updateData.featuredImage !== undefined) {
        // FeaturedImage field is explicitly provided in update
        if (updateData.featuredImage && currentPost?.featuredImage) {
          // New image provided and old image exists
          if (updateData.featuredImage !== currentPost.featuredImage) {
            // Images are different - schedule cleanup of old image after successful update
            console.log('Will replace image:', currentPost.featuredImage, 'with:', updateData.featuredImage);
            
            // Perform update first
            await updateDoc(docRef, updatePayload);
            
            // Then cleanup previous image (non-blocking)
            try {
              await BlogImageService.deleteImage(currentPost.featuredImage);
              console.log('Successfully cleaned up previous image:', currentPost.featuredImage);
            } catch (cleanupError) {
              console.warn('Failed to cleanup previous image (non-critical):', cleanupError);
            }
            return; // Exit early since update is already done
          }
          // else: Same image URL, no cleanup needed
        }
        // else: No old image or no new image, proceed normally
      }
      // else: featuredImage not specified in update, preserve existing

      // Standard update for all other cases
      await updateDoc(docRef, updatePayload);
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw new Error('Failed to update blog post');
    }
  }

  // Delete a blog post with image cleanup
  static async deletePost(id: string): Promise<void> {
    try {
      // Get post data to find associated images
      const post = await this.getPostById(id);
      
      if (post?.featuredImage) {
        // Delete associated image from storage
        console.log('Deleting associated image:', post.featuredImage);
        await BlogImageService.deleteImage(post.featuredImage);
      }

      // Delete the post document
      const docRef = doc(db, COLLECTIONS.BLOG_POSTS, id);
      await deleteDoc(docRef);
      
      console.log('Successfully deleted post and associated assets:', id);
    } catch (error) {
      console.error('Error deleting blog post:', error);
      throw new Error('Failed to delete blog post');
    }
  }

  // Search blog posts
  static async searchPosts(searchTerm: string, options: {
    published?: boolean;
    limitCount?: number;
  } = {}): Promise<BlogPost[]> {
    try {
      const { published = true, limitCount = 20 } = options;
      
      // Note: Firestore doesn't support full-text search natively
      // For production, consider using Algolia or similar service
      const q = query(
        collection(db, COLLECTIONS.BLOG_POSTS),
        where('isPublished', '==', published),
        orderBy('updatedAt', 'desc'),
        limit(limitCount)
      );

      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt?.toDate?.()?.toISOString() || '',
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || ''
      })) as BlogPost[];

      // Client-side filtering for search (for simple implementation)
      const searchLower = searchTerm.toLowerCase();
      return posts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.author.name.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error('Error searching blog posts:', error);
      throw new Error('Failed to search blog posts');
    }
  }
}

// Image Upload Service with Compression
export class BlogImageService {
  // Upload image with automatic compression
  static async uploadImage(
    file: File,
    path: string = 'blog-images',
    onProgress?: (progress: number) => void
  ): Promise<{ url: string; compressionInfo: CompressionResult }> {
    try {
      onProgress?.(10);
      
      // Compress image before upload
      const compressionResult = await smartCompress(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
        maxSizeMB: 2
      });
      
      onProgress?.(30);
      
      // Generate unique filename
      const timestamp = Date.now();
      const fileName = `${timestamp}-${compressionResult.file.name}`;
      const imagePath = `${path}/${fileName}`;
      
      const storageRef = ref(storage, imagePath);
      
      onProgress?.(50);
      
      // Upload compressed file
      const snapshot = await uploadBytes(storageRef, compressionResult.file);
      
      onProgress?.(80);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      onProgress?.(100);
      
      return {
        url: downloadURL,
        compressionInfo: compressionResult
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  // Delete image from Firebase Storage by URL
  static async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      // Extract the storage path from the URL
      const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
      if (!imageUrl.includes(baseUrl)) {
        console.warn('Invalid Firebase Storage URL:', imageUrl);
        return false;
      }

      // Parse the storage reference from URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const encodedPath = pathParts[pathParts.length - 1];
      const imagePath = decodeURIComponent(encodedPath);

      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      
      console.log('Successfully deleted image:', imagePath);
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error for image deletion failures
      // as the post operation might still be valid
      return false;
    }
  }

  // Extract storage path from Firebase URL
  static extractStoragePath(url: string): string | null {
    try {
      const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
      if (!url.includes(baseUrl)) {
        return null;
      }

      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      const encodedPath = pathParts[pathParts.length - 1];
      return decodeURIComponent(encodedPath);
    } catch (error) {
      console.error('Error extracting storage path:', error);
      return null;
    }
  }

  // Upload multiple images with compression
  static async uploadImages(
    files: File[],
    path: string = 'blog-images',
    onProgress?: (fileIndex: number, progress: number) => void
  ): Promise<Array<{ url: string; compressionInfo: CompressionResult }>> {
    try {
      const uploadPromises = files.map((file, index) => 
        this.uploadImage(file, path, (progress) => onProgress?.(index, progress))
      );
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw new Error('Failed to upload images');
    }
  }
}

// Author Utilities (simplified)
export class AuthorUtils {
  // Get random default avatar
  static getDefaultAvatar(): string {
    const avatars = [
      'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?auto=compress&cs=tinysrgb&w=150'
    ];
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  // Create author object from form data
  static createAuthorFromInput(
    name: string, 
    role?: string, 
    avatar?: string,
    position?: string,
    authorImage?: string
  ): BlogPost['author'] {
    const author: BlogPost['author'] = {
      name: name.trim(),
      role: role?.trim() || 'Contributor',
      avatar: avatar || this.getDefaultAvatar(),
      bio: `Blog contributor at Absterco`
    };

    // Only add optional fields if they have values (Firebase doesn't allow undefined)
    if (position?.trim()) {
      author.position = position.trim();
    }
    
    if (authorImage?.trim()) {
      author.authorImage = authorImage.trim();
    }

    return author;
  }

  // Upload and compress author image
  static async uploadAuthorImage(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    try {
      // Use BlogImageService for compression and upload
      const result = await BlogImageService.uploadImage(
        file,
        'author-images',
        onProgress
      );
      return result.url;
    } catch (error) {
      console.error('Error uploading author image:', error);
      throw new Error('Failed to upload author image');
    }
  }
}

// Category Service
export class CategoryService {
  // Get all categories (using constants as fallback/default data)
  static async getCategories(): Promise<BlogCategory[]> {
    try {
      // First try to get from Firebase
      const querySnapshot = await getDocs(
        query(collection(db, COLLECTIONS.CATEGORIES), orderBy('name'))
      );
      
      // If Firebase has categories, return them
      if (!querySnapshot.empty) {
        return querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogCategory[];
      }
      
      // Otherwise, return constants as fallback
      return BLOG_CATEGORIES;
    } catch (error) {
      console.error('Error fetching categories, using fallback data:', error);
      // Return constants as fallback if Firebase fails
      return BLOG_CATEGORIES;
    }
  }

  // Create a new category
  static async createCategory(categoryData: Omit<BlogCategory, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COLLECTIONS.CATEGORIES), {
        ...categoryData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error('Failed to create category');
    }
  }
}

// Blog Statistics Service
export class BlogStatsService {
  // Get blog statistics
  static async getStats(): Promise<{
    total: number;
    published: number;
    drafts: number;
    featured: number;
  }> {
    try {
      const [totalSnap, publishedSnap, draftsSnap, featuredSnap] = await Promise.all([
        getDocs(collection(db, COLLECTIONS.BLOG_POSTS)),
        getDocs(query(collection(db, COLLECTIONS.BLOG_POSTS), where('isPublished', '==', true))),
        getDocs(query(collection(db, COLLECTIONS.BLOG_POSTS), where('isPublished', '==', false))),
        getDocs(query(collection(db, COLLECTIONS.BLOG_POSTS), where('isFeatured', '==', true)))
      ]);

      return {
        total: totalSnap.size,
        published: publishedSnap.size,
        drafts: draftsSnap.size,
        featured: featuredSnap.size
      };
    } catch (error) {
      console.error('Error fetching blog stats:', error);
      throw new Error('Failed to fetch blog statistics');
    }
  }
}

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};