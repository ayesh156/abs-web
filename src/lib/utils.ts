import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Blog content utilities for clean UI display
export function stripHtmlTags(html: string): string {
  // Remove HTML tags while preserving text content
  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
    .replace(/&amp;/g, '&') // Replace HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * World-class text cleaning specifically for blog descriptions
 * Removes all anchor tags (including complex ones with multiple attributes) while preserving their text content
 */
export function cleanBlogDescription(content: string): string {
  if (!content) return '';
  
  let cleaned = content;
  
  // Step 1: Extract text from ALL anchor tags while preserving the link text
  // This comprehensive regex matches <a> tags with ANY attributes and captures the text content
  // Handles: <a>, <a href="...">, <a target="blank" rel="nofollow" class="...">, etc.
  cleaned = cleaned.replace(/<a\s[^>]*>(.*?)<\/a>/gi, '$1'); // <a with attributes>content</a>
  cleaned = cleaned.replace(/<a>(.*?)<\/a>/gi, '$1');        // <a>content</a> (no attributes)
  
  // Step 2: Handle self-closing or malformed anchor tags
  cleaned = cleaned.replace(/<a\s[^>]*\/>/gi, ''); // Self-closing <a ... />
  cleaned = cleaned.replace(/<a[^>]*>/gi, '');     // Orphaned opening <a ...>
  cleaned = cleaned.replace(/<\/a>/gi, '');       // Orphaned closing </a>
  
  // Step 3: Remove any remaining HTML tags (including other elements)
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Step 4: Decode HTML entities for proper text display
  const entityMap: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
    '&mdash;': '—',
    '&ndash;': '–',
    '&hellip;': '…',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&rsquo;': '\u2019', // Right single quotation mark
    '&lsquo;': '\u2018', // Left single quotation mark
    '&rdquo;': '\u201D', // Right double quotation mark
    '&ldquo;': '\u201C'  // Left double quotation mark
  };
  
  // Replace HTML entities
  for (const [entity, replacement] of Object.entries(entityMap)) {
    cleaned = cleaned.replace(new RegExp(entity, 'gi'), replacement);
  }
  
  // Step 5: Normalize whitespace and remove extra spaces
  cleaned = cleaned
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\n\s*\n/g, '\n') // Clean up multiple line breaks
    .trim();
  
  return cleaned;
}

export function truncateText(text: string, maxLength: number = 120): string {
  if (text.length <= maxLength) return text;
  
  // Find the last complete word within the limit
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If there's a space, cut at the last word boundary, otherwise cut at maxLength
  const cutPoint = lastSpaceIndex > maxLength * 0.8 ? lastSpaceIndex : maxLength;
  
  return text.substring(0, cutPoint).trim() + '...';
}

export function getContentPreview(content: string, maxLength: number = 120): string {
  // Use the enhanced blog description cleaner, then truncate
  const cleanText = cleanBlogDescription(content);
  return truncateText(cleanText, maxLength);
}

// Performance optimized debounce for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: NodeJS.Timeout;
  
  const debouncedFunction = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  
  debouncedFunction.cancel = () => {
    clearTimeout(timeout);
  };
  
  return debouncedFunction;
}
