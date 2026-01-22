/**
 * URL Validation Utility
 * Validates and sanitizes URLs to prevent XSS and protocol injection attacks
 */

/**
 * Validates if a URL is safe to use in href or src attributes
 * @param {string} url - The URL to validate
 * @param {string} fallback - Fallback URL if validation fails (default: '#')
 * @returns {string} - Validated URL or fallback
 */
export const validateUrl = (url, fallback = '#') => {
  if (!url || typeof url !== 'string') {
    return fallback;
  }

  // Trim whitespace
  url = url.trim();

  // Check for empty string
  if (!url) {
    return fallback;
  }

  try {
    // Try to parse as absolute URL
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return fallback;
    }
    
    return url;
  } catch (e) {
    // If URL parsing fails, check if it's a relative URL
    // Allow relative URLs starting with / or ./
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      return url;
    }
    
    // If it's not a valid absolute or relative URL, return fallback
    return fallback;
  }
};

/**
 * Validates and extracts the first URL from a comma-separated string
 * @param {string} urlString - Comma-separated URLs
 * @param {string} fallback - Fallback URL if validation fails
 * @returns {string} - First valid URL or fallback
 */
export const validateFirstUrl = (urlString, fallback = '#') => {
  if (!urlString || typeof urlString !== 'string') {
    return fallback;
  }

  const urls = urlString.split(',').map(u => u.trim()).filter(Boolean);
  
  if (urls.length === 0) {
    return fallback;
  }

  return validateUrl(urls[0], fallback);
};

/**
 * Validates image URLs specifically
 * @param {string} url - Image URL to validate
 * @param {string} fallback - Fallback image URL (default: '/default-placeholder.png')
 * @returns {string} - Validated URL or fallback
 */
export const validateImageUrl = (url, fallback = '/default-placeholder.png') => {
  return validateUrl(url, fallback);
};
