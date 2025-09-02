import {
  sanitizeInput,
  validateEmail,
  validatePhone,
  validateName,
  validateContent,
  prepareSecureFormData,
  createRateLimiter,
} from '../utils/security';

// Careers submission service (separate from student enquiries)
// IMPORTANT: Set this to the new Careers Apps Script/Web App URL (DO NOT use the existing student Apps Script URL)
const APPS_SCRIPT_CAREERS_URL = 'https://script.google.com/macros/s/AKfycbymcSO-d0VLuckd0Q9FiHbH1fHAFRg3mE5-1_2TgGg2FeaxXCLR8xDUmsmcXudr1I6ESQ/exec';

// Allowed resume MIME types and max size (5 MB)
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

// Rate limiter: 10 attempts per minute per email (increased for testing)
const rateLimit = createRateLimiter(10, 60_000);

export const fileToBase64 = async (file) => {
  if (!file) throw new Error('No file provided');

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error('Only PDF, DOC, or DOCX files are allowed');
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('File too large. Maximum allowed size is 5 MB');
  }

  const arrayBuffer = await file.arrayBuffer();

  // Hash file for integrity and basic tamper-detection
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const sha256 = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

  // Convert to Base64 (fixed for large files to prevent stack overflow)
  const uint8Array = new Uint8Array(arrayBuffer);
  let binaryString = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  const base64 = btoa(binaryString);

  return {
    base64,
    name: sanitizeInput(file.name, 120),
    type: file.type,
    size: file.size,
    sha256,
  };
};

const validateCareerForm = (data) => {
  if (!validateName(data.name)) {
    throw new Error('Please enter a valid full name');
  }
  if (!validateEmail(data.email)) {
    throw new Error('Please enter a valid email address');
  }
  if (!validatePhone(data.phone)) {
    throw new Error('Please enter a valid phone number');
  }
  if (!Array.isArray(data.departments) || data.departments.length === 0) {
    throw new Error('Please select at least one department');
  }
  if (!Array.isArray(data.vacancies) || data.vacancies.length === 0) {
    throw new Error('Please select at least one job vacancy');
  }
  if (!validateContent(data.message || '', 1000)) {
    throw new Error('Your message contains disallowed content or is too long');
  }
};

export const submitCareerApplication = async (formData) => {
  if (!APPS_SCRIPT_CAREERS_URL || APPS_SCRIPT_CAREERS_URL.startsWith('REPLACE_')) {
    throw new Error('Careers submission endpoint is not configured');
  }

  // Rate limiting by email
  if (!rateLimit(`careers_${formData.email}`)) {
    throw new Error('Too many submission attempts. Please wait a minute before trying again.');
  }

  // Validate and sanitize
  validateCareerForm(formData);
  const secure = prepareSecureFormData(formData);

  // Build payload
  const payload = {
    // Personal
    name: secure.name,
    email: secure.email,
    phone: secure.phone,

    // Multi-selection
    departments: Array.isArray(secure.departments) ? secure.departments : [],
    vacancies: Array.isArray(secure.vacancies) ? secure.vacancies : [],

    // Optional message
    message: secure.message || '',

    // Resume file (base64 + metadata if provided)
    resume: secure.resume || null,

    // Metadata
    timestamp: new Date().toISOString(),
    source: 'Royal EduHub Careers Page',
  };

  // Post to Careers Apps Script (no email sending on backend)
  // Use no-cors: we can't read response body, but the request will be delivered
  try {
    await fetch(APPS_SCRIPT_CAREERS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    // Since we use no-cors mode, we can't read the response
    // But if fetch doesn't throw an error, the request was sent successfully
    return {
      success: true,
      message: 'Application submitted successfully! Due to CORS policy, we cannot read the response body, but the request was delivered.',
      method: 'google_apps_script_careers',
    };
  } catch (error) {
    // Network error or other fetch failure
    console.error('Career application submission failed:', error);
    return {
      success: false,
      error: 'Network error: Unable to submit application. Please check your internet connection and try again.',
      method: 'google_apps_script_careers',
    };
  }
};