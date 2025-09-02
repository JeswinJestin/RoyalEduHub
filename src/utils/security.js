/**
 * Security utility functions for input validation and sanitization
 */

// XSS Prevention - Sanitize HTML content
export const sanitizeHTML = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// SQL Injection Prevention - Basic input sanitization
export const sanitizeInput = (input, maxLength = 500) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>"'&\\]/g, '') // Remove potentially dangerous characters
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/(union|select|insert|update|delete|drop|create|alter|exec|execute)/gi, '') // Remove SQL keywords
    .substring(0, maxLength);
};

// Email validation with security considerations
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  
  // Basic email regex that prevents common injection patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Additional security checks
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:/i,
    /vbscript:/i,
    /onload/i,
    /onerror/i
  ];
  
  const hasDangerousPattern = dangerousPatterns.some(pattern => pattern.test(email));
  
  return emailRegex.test(email) && !hasDangerousPattern && email.length <= 100;
};

// Phone number validation
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  
  // Remove spaces and check format
  const cleanPhone = phone.replace(/\s/g, '');
  const phoneRegex = /^[\d+\-()]{10,15}$/;
  
  return phoneRegex.test(cleanPhone);
};

// Name validation (for student/parent names)
export const validateName = (name) => {
  if (!name || typeof name !== 'string') return false;
  
  // Allow only letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /data:/i,
    /\{\{/,
    /\}\}/
  ];
  
  const hasDangerousPattern = dangerousPatterns.some(pattern => pattern.test(name));
  
  return nameRegex.test(name.trim()) && !hasDangerousPattern;
};

// Rate limiting helper (client-side)
export const createRateLimiter = (maxAttempts = 5, windowMs = 60000) => {
  const attempts = new Map();
  
  return (identifier) => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);
    
    if (recentAttempts.length >= maxAttempts) {
      return false; // Rate limit exceeded
    }
    
    // Add current attempt
    recentAttempts.push(now);
    attempts.set(identifier, recentAttempts);
    
    return true; // Allow the request
  };
};

// CSRF Token generator (for future backend integration)
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Content validation for text areas
export const validateContent = (content, maxLength = 1000) => {
  if (!content || typeof content !== 'string') return true; // Optional field
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi
  ];
  
  const hasDangerousPattern = dangerousPatterns.some(pattern => pattern.test(content));
  
  return !hasDangerousPattern && content.length <= maxLength;
};

// Secure form data preparation
export const prepareSecureFormData = (formData) => {
  const secureData = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      secureData[key] = sanitizeInput(value);
    } else {
      secureData[key] = value;
    }
  }
  
  return secureData;
};

// Environment-based security configuration
export const getSecurityConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  return {
    enableCSP: !isDevelopment,
    enableHSTS: !isDevelopment,
    logSecurityEvents: true,
    maxFormSubmissionRate: isDevelopment ? 10 : 3, // per minute
    sessionTimeout: isDevelopment ? 3600000 : 1800000 // 1 hour dev, 30 min prod
  };
};

const securityUtils = {
  sanitizeHTML,
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateName,
  createRateLimiter,
  generateCSRFToken,
  validateContent,
  prepareSecureFormData,
  getSecurityConfig
};

export default securityUtils;