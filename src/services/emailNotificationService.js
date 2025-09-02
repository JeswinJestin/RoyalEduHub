// Email Notification Service
// Provides email-based form submission as an additional backup method

// EmailJS configuration (free email service)
// Setup instructions: https://www.emailjs.com/
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_EMAILJS_SERVICE_ID', // Replace with your EmailJS service ID
  templateId: 'YOUR_EMAILJS_TEMPLATE_ID', // Replace with your EmailJS template ID
  publicKey: 'YOUR_EMAILJS_PUBLIC_KEY' // Replace with your EmailJS public key
};

// Initialize EmailJS (load the library dynamically)
let emailJSLoaded = false;

const loadEmailJS = async () => {
  if (emailJSLoaded) return;
  
  try {
    // Load EmailJS library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    
    await new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
    
    // Initialize EmailJS
    window.emailjs.init(EMAILJS_CONFIG.publicKey);
    emailJSLoaded = true;
    // EmailJS loaded successfully
    
  } catch (error) {
    console.error('Failed to load EmailJS:', error);
    throw new Error('Email service unavailable');
  }
};

// Submit form via email notification
export const submitViaEmail = async (formData) => {
  try {
    // Attempting email submission
    
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.serviceId === 'YOUR_EMAILJS_SERVICE_ID') {
      throw new Error('EmailJS not configured. Please set up email service.');
    }
    
    // Load EmailJS if not already loaded
    await loadEmailJS();
    
    // Prepare email template parameters
    const templateParams = {
      student_name: formData.studentName,
      parent_name: formData.parentName || 'Not provided',
      email: formData.email,
      phone: formData.phone,
      grade: formData.grade || 'Not specified',
      subjects: formData.subject || 'Not specified',
      message: formData.message || 'No additional message',
      submission_time: new Date().toLocaleString(),
      source: 'Royal EduHub Website (Email Backup)'
    };
    
    // Email template params prepared
    
    // Send email using EmailJS
    const response = await window.emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );
    
    // Email sent successfully
    
    return {
      success: true,
      message: 'Form submitted successfully via email',
      method: 'email_notification',
      data: response
    };
    
  } catch (error) {
    console.error('Email submission failed:', error);
    throw error;
  }
};

// Alternative: Formspree integration (simpler setup)
export const submitViaFormspree = async (formData) => {
  try {
    // Attempting Formspree submission
    
    // Replace with your Formspree form ID
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
    
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
      throw new Error('Formspree not configured. Please set up Formspree endpoint.');
    }
    
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentName: formData.studentName,
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        grade: formData.grade,
        subjects: formData.subject,
        message: formData.message,
        _replyto: formData.email,
        _subject: `New Royal EduHub Enquiry - ${formData.studentName}`,
        _template: 'table' // Use table format for better readability
      }),
    });
    
    if (response.ok) {
      // Formspree submission successful
      return {
        success: true,
        message: 'Form submitted successfully via Formspree',
        method: 'formspree',
        data: await response.json()
      };
    } else {
      const errorData = await response.text();
      throw new Error(`Formspree error (${response.status}): ${errorData}`);
    }
    
  } catch (error) {
    console.error('Formspree submission failed:', error);
    throw error;
  }
};

// Enhanced email submission with multiple providers
export const submitWithEmailFallback = async (formData) => {
  // Starting email submission with fallback
  
  try {
    // Try EmailJS first
    return await submitViaEmail(formData);
    
  } catch (emailJSError) {
    console.warn('⚠️ EmailJS failed, trying Formspree...', emailJSError.message);
    
    try {
      // Fallback to Formspree
      return await submitViaFormspree(formData);
      
    } catch (formspreeError) {
      console.error('❌ All email methods failed');
      console.error('EmailJS Error:', emailJSError.message);
      console.error('Formspree Error:', formspreeError.message);
      
      throw new Error('All email submission methods failed');
    }
  }
};

// Email service configuration checker
export const checkEmailServiceConfig = () => {
  const emailJSConfigured = EMAILJS_CONFIG.serviceId !== 'YOUR_EMAILJS_SERVICE_ID';
  const formspreeConfigured = !('https://formspree.io/f/YOUR_FORM_ID'.includes('YOUR_FORM_ID'));
  
  return {
    emailJS: emailJSConfigured,
    formspree: formspreeConfigured,
    anyConfigured: emailJSConfigured || formspreeConfigured
  };
};

// Generate mailto link as last resort
export const generateMailtoLink = (formData) => {
  const subject = encodeURIComponent(`New Royal EduHub Enquiry - ${formData.studentName}`);
  const body = encodeURIComponent(
    `New student enquiry details:\n\n` +
    `Student Name: ${formData.studentName}\n` +
    `Parent Name: ${formData.parentName || 'Not provided'}\n` +
    `Email: ${formData.email}\n` +
    `Phone: ${formData.phone}\n` +
    `Grade: ${formData.grade || 'Not specified'}\n` +
    `Subjects: ${formData.subject || 'Not specified'}\n` +
    `Message: ${formData.message || 'No additional message'}\n\n` +
    `Submitted: ${new Date().toLocaleString()}\n` +
    `Source: Royal EduHub Website`
  );
  
  return `mailto:your-email@example.com?subject=${subject}&body=${body}`;
};

// Removed anonymous default export to comply with lint rule import/no-anonymous-default-export
// All exports from this module are named above; no default export.