import { useState } from 'react';

/**
 * Custom hook for clipboard functionality compatible with React 19
 * Alternative to react-use-clipboard which doesn't support React 19
 */
export function useClipboard(text: string, timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return { copied, copy };
}

/**
 * Utility function to copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}
