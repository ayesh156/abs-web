'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  FileText,
  Star,
  AlertCircle,
  Check,
  X,
  Globe,
  Tag,
  Upload
} from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/blog';
import { 
  BlogService, 
  BlogImageService,
  CategoryService, 
  BlogStatsService, 
  generateSlug, 
  calculateReadTime,
  AuthorUtils
} from '@/lib/blog-service';
import { getContentPreview, debounce } from '@/lib/utils';
import ImageUpload from '@/components/ui/ImageUpload';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { useNotifications } from '@/components/ui/Notification';
import { useImageManager } from '@/hooks/useImageManager';

interface BlogFormData {
  title: string;
  content: string;
  categoryId: string;
  authorName: string;
  authorRole: string;
  authorPosition: string;
  authorAvatar: string;
  authorImage: string;
  featuredImage: string;
  isFeatured: boolean;
  isPublished: boolean;
}

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: BlogPost) => void;
}

interface EditPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
  onPostUpdated: (post: BlogPost) => void;
}

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
  onPostDeleted: (id: string) => void;
}

// Create Post Modal
function CreatePostModal({ isOpen, onClose, onPostCreated }: CreatePostModalProps) {
  const { showSuccess, showError, showInfo } = useNotifications();
  const imageManager = useImageManager({
    onImageChange: (url) => setFormData(prev => ({ ...prev, featuredImage: url }))
  });
  
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    categoryId: '',
    authorName: '',
    authorRole: 'Contributor',
    authorPosition: '',
    authorAvatar: '',
    authorImage: '',
    featuredImage: '',
    isFeatured: false,
    isPublished: false
  });
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const categoriesData = await CategoryService.getCategories();
      setCategories(categoriesData);
      
      // Set default category
      if (categoriesData.length > 0 && !formData.categoryId) {
        setFormData(prev => ({ ...prev, categoryId: categoriesData[0].id }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load categories');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate required fields (excerpt auto-generated from content)
      if (!formData.title.trim() || !formData.content.trim() || !formData.authorName.trim()) {
        throw new Error('Please fill in all required fields: Title, Content, and Author Name');
      }

      const selectedCategory = categories.find(c => c.id === formData.categoryId);
      if (!selectedCategory) {
        throw new Error('Please select a valid category');
      }

      // Create author object directly from form data
      const author = AuthorUtils.createAuthorFromInput(
        formData.authorName,
        formData.authorRole || 'Contributor',
        formData.authorAvatar,
        formData.authorPosition,
        formData.authorImage
      );

      // Auto-generate excerpt from content (first 150 characters of plain text)
      const excerpt = formData.content
        .replace(/[#*`_]/g, '') // Remove markdown
        .split('\n')
        .find(line => line.trim().length > 0) // First non-empty line
        ?.substring(0, 150)
        .trim() + '...' || 'No excerpt available';

      // Create new post data with conditional image saving
      const newPostData: any = {
        slug: generateSlug(formData.title),
        title: formData.title,
        excerpt: excerpt,
        content: formData.content,
        category: selectedCategory,
        author: author,
        readTime: calculateReadTime(formData.content),
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished
      };

      // QA: Only save featured image if provided (no empty/null images)
      if (imageManager.imageUrl && imageManager.imageUrl.trim()) {
        newPostData.featuredImage = imageManager.imageUrl;
      } else if (formData.featuredImage && formData.featuredImage.trim()) {
        newPostData.featuredImage = formData.featuredImage;
      }
      // If no image provided, don't set featuredImage field at all

      const postId = await BlogService.createPost(newPostData);
      
      // Get the created post
      const createdPost = await BlogService.getPostById(postId);
      if (createdPost) {
        onPostCreated(createdPost);
        setSuccess(true);
        
        // Clear the "new" flag since image is now associated with saved post
        imageManager.reset();
        
        setTimeout(() => {
          onClose();
          resetForm();
        }, 1500);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create post';
      showError('Failed to create post', errorMessage);
      // On error, cleanup any newly uploaded images
      await imageManager.cleanupNewImages();
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      authorName: '',
      authorRole: 'Contributor',
      authorPosition: '',
      authorAvatar: '',
      authorImage: '',
      featuredImage: '',
      isFeatured: false,
      isPublished: false
    });
    setError(null);
    setSuccess(false);
    imageManager.reset();
  };

  const handleClose = async () => {
    // Cleanup any newly uploaded images if form is cancelled
    await imageManager.cleanupNewImages();
    resetForm();
    onClose();
  };

  const handleImageUpload = (url: string) => {
    imageManager.setImage(url, true); // Mark as new image
  };

  const handleImageRemove = () => {
    imageManager.removeImage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-black-rich border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-accent-green to-accent-green/80 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Post</h2>
              <p className="text-white/80 mt-1">Add a new blog post to your collection</p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 bg-black-rich">
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
              >
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400">Blog post created successfully!</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-accent-green/50 focus:outline-none focus:ring-1 focus:ring-accent-green/30 transition-all duration-200"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-accent-green/50 focus:outline-none focus:ring-1 focus:ring-accent-green/30 transition-all duration-200 appearance-none cursor-pointer form-select-custom"
                    required
                  >
                    <option value="" className="bg-black-rich text-white/60">Select category</option>
                    {categories.map(category => (
                      <option 
                        key={category.id} 
                        value={category.id}
                        className="bg-black-rich text-white hover:bg-white/10 py-2"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-accent-green/50 focus:outline-none focus:ring-1 focus:ring-accent-green/30 transition-all duration-200"
                  placeholder="Enter author name..."
                  required
                />
              </div>

              {/* Author Position */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Author Position
                </label>
                <input
                  type="text"
                  value={formData.authorPosition}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorPosition: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-accent-green/50 focus:outline-none focus:ring-1 focus:ring-accent-green/30 transition-all duration-200"
                  placeholder="e.g. Senior Developer, Marketing Manager..."
                />
              </div>

              {/* Author Image */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Author Image
                </label>
                <ImageUpload
                  value={formData.authorImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, authorImage: url }))}
                />
              </div>

              {/* Featured Image */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Featured Image
                </label>
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Content *
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Write your blog post content..."
                />
              </div>

              {/* Post Settings */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-accent-green" />
                  Post Settings
                </h3>
                <div className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-accent-green focus:ring-accent-green/50 focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                    />
                    <div>
                      <span className="text-white font-medium group-hover:text-accent-green/80 transition-colors">Featured Post</span>
                      <p className="text-white/60 text-sm">Display prominently on the blog page</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-accent-green focus:ring-accent-green/50 focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                    />
                    <div>
                      <span className="text-white font-medium group-hover:text-accent-green/80 transition-colors">Publish Post</span>
                      <p className="text-white/60 text-sm">Make this post visible to the public</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-accent-green text-black rounded-xl hover:bg-accent-green/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 font-medium shadow-lg hover:shadow-accent-green/20 btn-premium"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Create Post
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Edit Post Modal (simplified version)
function EditPostModal({ isOpen, onClose, post, onPostUpdated }: EditPostModalProps) {
  const { showSuccess, showError, showInfo } = useNotifications();
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    categoryId: '',
    authorName: '',
    authorRole: 'Contributor',
    authorPosition: '',
    authorAvatar: '',
    authorImage: '',
    featuredImage: '',
    isFeatured: false,
    isPublished: false
  });
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [originalFeaturedImage, setOriginalFeaturedImage] = useState<string>('');
  const [originalAuthorImage, setOriginalAuthorImage] = useState<string>('');

  useEffect(() => {
    if (isOpen && post) {
      loadData();
      setOriginalFeaturedImage(post.featuredImage); // Track original image
      setOriginalAuthorImage(post.author.authorImage || ''); // Track original author image
      setFormData({
        title: post.title,
        content: post.content,
        categoryId: post.category.id,
        authorName: post.author.name,
        authorRole: post.author.role,
        authorPosition: post.author.position || '',
        authorAvatar: post.author.avatar,
        authorImage: post.author.authorImage || '',
        featuredImage: post.featuredImage,
        isFeatured: post.isFeatured,
        isPublished: post.isPublished
      });
    }
  }, [isOpen, post]);

  const loadData = async () => {
    try {
      const categoriesData = await CategoryService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
      showError('Failed to load categories', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setIsLoading(true);

    try {
      if (!formData.title.trim() || !formData.content.trim() || !formData.authorName.trim()) {
        throw new Error('Please fill in all required fields: Title, Content, and Author Name');
      }

      const selectedCategory = categories.find(c => c.id === formData.categoryId);
      if (!selectedCategory) {
        throw new Error('Please select a valid category');
      }

      // Create author object directly from form data with defensive preservation
      const authorData: any = {
        name: formData.authorName,
        role: formData.authorRole || 'Contributor',
        avatar: formData.authorAvatar,
        bio: `Blog contributor at Absterco`
      };

      // QA: Add optional fields only if they have values (defensive programming)
      if (formData.authorPosition?.trim()) {
        authorData.position = formData.authorPosition.trim();
      }
      
      // QA: Only update author image if it has changed (preserve existing if no change)
      if (formData.authorImage !== originalAuthorImage) {
        if (formData.authorImage?.trim()) {
          authorData.authorImage = formData.authorImage.trim();
        }
        // If empty but different from original, user explicitly removed it (don't include)
      } else if (originalAuthorImage) {
        // Preserve original author image if no change
        authorData.authorImage = originalAuthorImage;
      }

      const author = authorData;

      // Auto-generate excerpt from content (first 150 characters of plain text)
      const excerpt = formData.content
        .replace(/[#*`_]/g, '') // Remove markdown
        .split('\n')
        .find(line => line.trim().length > 0) // First non-empty line
        ?.substring(0, 150)
        .trim() + '...' || 'No excerpt available';

      // QA: Defensive image preservation logic
      const updateData: any = {
        slug: generateSlug(formData.title),
        title: formData.title,
        excerpt: excerpt,
        content: formData.content,
        category: selectedCategory,
        author: author,
        readTime: calculateReadTime(formData.content),
        isFeatured: formData.isFeatured,
        isPublished: formData.isPublished
      };

      // QA: Only update featured image if it has changed (preserve existing if no change)
      if (formData.featuredImage !== originalFeaturedImage) {
        // Image has changed - include it in update
        if (formData.featuredImage && formData.featuredImage.trim()) {
          updateData.featuredImage = formData.featuredImage;
        } else {
          // User explicitly removed the image - set to empty
          updateData.featuredImage = '';
        }
      }
      // If featuredImage === originalFeaturedImage, don't include it (preserve existing)

      await BlogService.updatePost(post.id, updateData);
      
      const updatedPost = await BlogService.getPostById(post.id);
      if (updatedPost) {
        onPostUpdated(updatedPost);
        setSuccess(true);
        
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update post';
      showError('Failed to update post', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced image change handler with cleanup
  const handleFeaturedImageChange = async (newImageUrl: string) => {
    const currentImageUrl = formData.featuredImage;
    
    // Update form data immediately for better UX
    setFormData(prev => ({ ...prev, featuredImage: newImageUrl }));
    
    // If we had a previous image that's different from the original, clean it up
    if (currentImageUrl && 
        currentImageUrl !== originalFeaturedImage && 
        currentImageUrl !== newImageUrl) {
      try {
        await BlogImageService.deleteImage(currentImageUrl);
        console.log('Previous image cleaned up:', currentImageUrl);
      } catch (error) {
        console.warn('Failed to cleanup previous image:', error);
        // Don't show error to user as the form update should continue
      }
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-black-rich border border-white/20 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Edit Post</h2>
              <p className="text-white/80 mt-1">Update your blog post</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form - Similar structure to Create Modal but with Edit styling */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6 bg-black-rich">
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3"
              >
                <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400">Blog post updated successfully!</p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Category *
                </label>
                <div className="relative">
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 appearance-none cursor-pointer form-select-custom"
                    required
                  >
                    <option value="" className="bg-black-rich text-white/60">Select category</option>
                    {categories.map(category => (
                      <option 
                        key={category.id} 
                        value={category.id}
                        className="bg-black-rich text-white hover:bg-white/10 py-2"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.authorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorName: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                  placeholder="Enter author name..."
                  required
                />
              </div>

              {/* Author Position */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Author Position
                </label>
                <input
                  type="text"
                  value={formData.authorPosition}
                  onChange={(e) => setFormData(prev => ({ ...prev, authorPosition: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all duration-200"
                  placeholder="e.g. Senior Developer, Marketing Manager..."
                />
              </div>

              {/* Author Image */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Author Image
                  {post && (
                    <span className="text-white/60 text-xs ml-2">
                      (Original will be preserved if unchanged)
                    </span>
                  )}
                </label>
                <ImageUpload
                  value={formData.authorImage}
                  onChange={(url) => setFormData(prev => ({ ...prev, authorImage: url }))}
                  preserveImage={true}
                  originalImage={originalAuthorImage}
                  showPreservationStatus={true}
                />
              </div>

              {/* Featured Image */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Featured Image
                  {post && (
                    <span className="text-white/60 text-xs ml-2">
                      (Original will be preserved if unchanged)
                    </span>
                  )}
                </label>
                <ImageUpload
                  value={formData.featuredImage}
                  onChange={handleFeaturedImageChange}
                  preserveImage={true}
                  originalImage={originalFeaturedImage}
                  showPreservationStatus={true}
                />
              </div>

              {/* Content */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Content *
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Write your blog post content..."
                />
              </div>

              {/* Post Settings */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-blue-500" />
                  Post Settings
                </h3>
                <div className="space-y-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50 focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                    />
                    <div>
                      <span className="text-white font-medium group-hover:text-blue-400 transition-colors">Featured Post</span>
                      <p className="text-white/60 text-sm">Display prominently on the blog page</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                      className="w-5 h-5 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/50 focus:ring-2 focus:ring-offset-0 transition-all duration-200"
                    />
                    <div>
                      <span className="text-white font-medium group-hover:text-blue-400 transition-colors">Publish Post</span>
                      <p className="text-white/60 text-sm">Make this post visible to the public</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 font-medium shadow-lg hover:shadow-blue-500/20 btn-premium"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  Update Post
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// Delete Post Modal (unchanged)
function DeletePostModal({ isOpen, onClose, post, onPostDeleted }: DeletePostModalProps) {
  const { showSuccess, showError } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!post) return;

    setIsLoading(true);

    try {
      await BlogService.deletePost(post.id);
      onPostDeleted(post.id);
      showSuccess('Post deleted successfully');
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete post';
      showError('Failed to delete post', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-black-rich border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-500/10 rounded-xl">
              <Trash2 className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Delete Post</h3>
              <p className="text-white/60 text-sm">This action cannot be undone</p>
            </div>
          </div>

          <p className="text-white/80 mb-6">
            Are you sure you want to delete "<span className="font-medium text-white">{post?.title}</span>"? 
            This will permanently remove the post and all its associated data.
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 disabled:opacity-50 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 font-medium shadow-lg hover:shadow-red-500/20 btn-premium"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Main Blog Management Component
export default function BlogManagement() {
  const { showSuccess, showError, showInfo, NotificationContainer } = useNotifications();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, featured: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  // Debounce search term for better performance
  useEffect(() => {
    const debouncedUpdate = debounce((term: string) => {
      setDebouncedSearchTerm(term);
    }, 300);

    debouncedUpdate(searchTerm);
    
    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedUpdate.cancel?.();
    };
  }, [searchTerm]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [postsData, statsData, categoriesData] = await Promise.all([
        BlogService.getPosts(),
        BlogStatsService.getStats(),
        CategoryService.getCategories()
      ]);
      
      setPosts(postsData);
      setStats(statsData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  // Optimized filtering with useMemo for better performance
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = debouncedSearchTerm === '' || 
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        getContentPreview(post.content, 200).toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || post.category.id === filterCategory;
      const matchesStatus = filterStatus === 'all' || 
                           (filterStatus === 'published' && post.isPublished) ||
                           (filterStatus === 'draft' && !post.isPublished);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, debouncedSearchTerm, filterCategory, filterStatus]);

  const handlePostCreated = useCallback((newPost: BlogPost) => {
    setPosts(prev => [newPost, ...prev]);
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      published: newPost.isPublished ? prev.published + 1 : prev.published,
      drafts: !newPost.isPublished ? prev.drafts + 1 : prev.drafts,
      featured: newPost.isFeatured ? prev.featured + 1 : prev.featured
    }));

    // Show success notification
    showSuccess(
      'Post created successfully',
      newPost.isPublished ? 'Your blog post is now live!' : 'Draft saved. You can publish it later.'
    );
  }, [showSuccess]);

  const handlePostUpdated = useCallback((updatedPost: BlogPost) => {
    setPosts(prev => prev.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));

    // Show success notification
    showSuccess(
      'Post updated successfully',
      'All changes have been saved.'
    );
  }, [showSuccess]);

  const handlePostDeleted = useCallback((id: string) => {
    const deletedPost = posts.find(post => post.id === id);
    setPosts(prev => prev.filter(post => post.id !== id));
    
    if (deletedPost) {
      setStats(prev => ({
        ...prev,
        total: prev.total - 1,
        published: deletedPost.isPublished ? prev.published - 1 : prev.published,
        drafts: !deletedPost.isPublished ? prev.drafts - 1 : prev.drafts,
        featured: deletedPost.isFeatured ? prev.featured - 1 : prev.featured
      }));

      // Show success notification
      showSuccess(
        'Post deleted successfully',
        `"${deletedPost.title}" and its associated image have been removed.`
      );
    }
  }, [posts, showSuccess]);

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowEditModal(true);
  };

  const handleDeletePost = (post: BlogPost) => {
    setSelectedPost(post);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Blog Management</h1>
          <p className="text-white/60 mt-1">Create and manage your blog posts</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
            title="Refresh"
          >
            <Calendar className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-accent-green text-black rounded-xl hover:bg-accent-green/90 active:scale-95 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-accent-green/20 btn-premium"
          >
            <Plus className="h-4 w-4" />
            New Post
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3"
        >
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400">{error}</p>
          <button
            onClick={loadData}
            className="ml-auto px-4 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all duration-200 text-sm font-medium"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Posts</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Eye className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Published</p>
              <p className="text-2xl font-bold text-white">{stats.published}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Edit className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Drafts</p>
              <p className="text-2xl font-bold text-white">{stats.drafts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Star className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Featured</p>
              <p className="text-2xl font-bold text-white">{stats.featured}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:border-accent-green/50 focus:outline-none focus:ring-1 focus:ring-accent-green/30 transition-all duration-200 min-w-[300px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-accent-green/50 focus:outline-none focus:ring-1 focus:ring-accent-green/30 transition-all duration-200 appearance-none cursor-pointer min-w-[160px] form-select-custom"
              >
                <option value="all" className="bg-black-rich text-white">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-black-rich text-white">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
                className="px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:border-accent-green/50 focus:outline-none focus:ring-1 focus:ring-accent-green/30 transition-all duration-200 appearance-none cursor-pointer min-w-[140px] form-select-custom"
              >
                <option value="all" className="bg-black-rich text-white">All Status</option>
                <option value="published" className="bg-black-rich text-white">Published</option>
                <option value="draft" className="bg-black-rich text-white">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block w-8 h-8 border-4 border-white/20 border-t-accent-green rounded-full animate-spin"></div>
            <p className="text-white/60 mt-4">Loading posts...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-4 text-white/80 font-medium">Title</th>
                  <th className="text-left p-4 text-white/80 font-medium">Author</th>
                  <th className="text-left p-4 text-white/80 font-medium">Category</th>
                  <th className="text-left p-4 text-white/80 font-medium">Status</th>
                  <th className="text-left p-4 text-white/80 font-medium">Updated</th>
                  <th className="text-right p-4 text-white/80 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {post.featuredImage && (
                          <div className="w-12 h-8 bg-white/10 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={post.featuredImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium line-clamp-1 text-sm">{post.title}</p>
                          <p className="text-white/60 text-xs line-clamp-2 mt-1">
                            {getContentPreview(post.content, 100)}
                          </p>
                        </div>
                        {post.isFeatured && (
                          <Star className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-accent-green/20 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-accent-green" />
                        </div>
                        <span className="text-white/80 text-sm">{post.author.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span 
                        className="inline-block px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${post.category.color}20`,
                          color: post.category.color 
                        }}
                      >
                        {post.category.name}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        post.isPublished 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-white/60 text-sm">
                        {formatDate(post.updatedAt || post.publishedAt)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-white/60 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-200"
                          title="Edit post"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post)}
                          className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPosts.length === 0 && (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">No posts found</p>
                <p className="text-white/40 text-sm mt-1">
                  {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Create your first blog post to get started'
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showCreateModal && (
          <CreatePostModal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onPostCreated={handlePostCreated}
          />
        )}
        {showEditModal && (
          <EditPostModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            post={selectedPost}
            onPostUpdated={handlePostUpdated}
          />
        )}
        {showDeleteModal && (
          <DeletePostModal
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            post={selectedPost}
            onPostDeleted={handlePostDeleted}
          />
        )}
      </AnimatePresence>

      {/* Notification Container */}
      <NotificationContainer />
    </div>
  );
}