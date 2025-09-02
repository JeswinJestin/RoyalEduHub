/**
 * Utility functions for handling time calculations and formatting
 */

/**
 * Calculate the time difference between a given date and now
 * @param {Date|string} date - The date to compare against
 * @returns {string} - Formatted time difference (e.g., "2 days ago", "14 hours ago")
 */
export const getTimeAgo = (date) => {
  const now = new Date();
  const reviewDate = new Date(date);
  const diffInMs = now - reviewDate;
  
  // Convert to different time units
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);
  
  // Return appropriate format based on time difference
  if (diffInYears > 0) {
    return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
  } else if (diffInMonths > 0) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  } else if (diffInWeeks > 0) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
  } else if (diffInDays > 0) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  } else {
    return 'Just now';
  }
};

/**
 * Create a date object from a relative time string (for backwards compatibility)
 * @param {string} timeAgo - Time ago string like "2 days ago"
 * @returns {Date} - Calculated date
 */
export const createDateFromTimeAgo = (timeAgo) => {
  const now = new Date();
  
  // Parse the time ago string
  const match = timeAgo.match(/(\d+)\s+(minute|hour|day|week|month|year)s?\s+ago/);
  
  if (!match) {
    // If it's "Just now" or invalid format, return current time
    return now;
  }
  
  const amount = parseInt(match[1]);
  const unit = match[2];
  
  switch (unit) {
    case 'minute':
      return new Date(now - amount * 60 * 1000);
    case 'hour':
      return new Date(now - amount * 60 * 60 * 1000);
    case 'day':
      return new Date(now - amount * 24 * 60 * 60 * 1000);
    case 'week':
      return new Date(now - amount * 7 * 24 * 60 * 60 * 1000);
    case 'month':
      return new Date(now - amount * 30 * 24 * 60 * 60 * 1000);
    case 'year':
      return new Date(now - amount * 365 * 24 * 60 * 60 * 1000);
    default:
      return now;
  }
};

/**
 * Format a date to a readable string
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};