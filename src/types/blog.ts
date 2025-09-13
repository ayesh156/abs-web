export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: {
    name: string;
    role: string;
    position?: string;  // Optional professional position/title
    avatar: string;
    authorImage?: string;  // Optional high-quality author profile image
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  featuredImage: string;
  isFeatured: boolean;
  isPublished: boolean;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
  };
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface BlogFilters {
  category?: string;
  author?: string;
  search?: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}
