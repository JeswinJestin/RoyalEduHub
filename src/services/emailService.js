// Royal EduHub Form Submission Service
// Multi-layered submission system with comprehensive fallback mechanisms:
// 1. Google Apps Script (Primary) - Most reliable with real-time Google Sheets integration
// 2. Google Forms (Fallback) - Direct form submission with CORS limitations
// 3. Email Services (Backup) - Email-based submission via EmailJS/Formspree
// 4. Local Storage (Emergency) - Prevents data loss when all methods fail

import { submitWithEmailFallback, generateMailtoLink } from './emailNotificationService';

// Google Forms submission function
export const submitToGoogleForms = async (formData) => {
  try {
    // Google Forms URL - using the correct prefill URL provided by user
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/1V2j0m9NXtyilFVOh2Zr4DanRer0rLwA8PG9hNsSZgRw/formResponse';
    
    // Submitting to Google Forms
    
    // Map form fields to Google Form entry IDs (extracted from your form)
    const formDataToSubmit = new FormData();
    
    // CRITICAL: These entry IDs must match your actual Google Form
    // Updated with correct entry IDs from user's Google Form
    formDataToSubmit.append('entry.609431024', formData.studentName);  // Student Name
    formDataToSubmit.append('entry.2030790098', formData.parentName);  // Parent Name
    formDataToSubmit.append('entry.1956631819', formData.email);       // Email Address
    formDataToSubmit.append('entry.1228616707', formData.phone);       // Phone Number
    formDataToSubmit.append('entry.190287260', formData.grade);        // Grade
    formDataToSubmit.append('entry.685653769', `${formData.subject} - ${formData.message || 'No message provided'}`); // Subject + Message
    
    // Log the form data entries for debugging
    // FormData prepared for submission
    
    // Submit to Google Forms
    const response = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Forms
      body: formDataToSubmit
    });
    
    // Response received from Google Forms
    
    // Note: Due to CORS policy, we can't read the response from Google Forms
    // But if no error is thrown, the submission was likely successful
    // Form submitted to Google Forms successfully
    return { success: true, message: 'Form submitted successfully' };
    
  } catch (error) {
    console.error('Google Forms submission failed:', error);
    return { success: false, error: error.message };
  }
};

// Google Apps Script Web App integration - PRIMARY METHOD
export const submitToGoogleAppsScript = async (formData) => {
  try {
    // UPDATED: Your correct Google Apps Script Web App URL
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxLDbiz25MVQjCHRowq59rHAJyPZ720vaodFmi3DrcO6HDzlm-1ftgWoozZP57KtJDY/exec';
    
    // Submitting to Google Apps Script
    
    const payload = {
      studentName: formData.studentName,
      parentName: formData.parentName,
      email: formData.email,
      phone: formData.phone,
      grade: formData.grade,
      subjects: formData.subject || formData.subjects || '', // Handle both field names with fallback
      message: formData.message || '',
      timestamp: new Date().toISOString(),
      source: 'Royal EduHub Website'
    };
    
    // Debug: Log each field to identify missing data
    // Payload fields prepared for submission
    
    // Check for missing required fields
    if (!payload.studentName || !payload.email || !payload.phone) {
      console.error('❌ Missing required fields in payload!');
      console.error('Missing fields:', {
        studentName: !payload.studentName,
        email: !payload.email,
        phone: !payload.phone
      });
      throw new Error('Missing required fields: studentName, email, or phone');
    }
    
    // Sending payload to Apps Script
    
    // IMPORTANT: Use no-cors to avoid browser blocking the response due to missing CORS headers
    // We cannot read the response body in this mode, but the request WILL be delivered to Apps Script
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8', // simple header => no preflight
      },
      body: JSON.stringify(payload)
    });

    // Apps Script request dispatched successfully
    
    // We assume success because the browser does not expose the response in no-cors mode
    return {
      success: true,
      message: 'Form submitted successfully to Google Sheets (Apps Script)',
      method: 'google_apps_script',
      details: { opaqueResponse: true }
    };
    
  } catch (error) {
    console.error('Google Apps Script submission error:', error);
    return {
      success: false,
      error: error.message,
      method: 'google_apps_script'
    };
  }
};

// Enhanced submission function with multiple fallback methods
export const submitFormWithFallback = async (formData) => {
  // Starting form submission with fallback mechanism
  
  // Store submission locally as backup
  storeSubmissionLocally(formData);
  
  // PRIMARY METHOD: Try Google Apps Script first (most reliable)
  try {
    // Attempting Google Apps Script submission (Primary)
    const appsScriptResult = await submitToGoogleAppsScript(formData);
    
    if (appsScriptResult.success) {
      // Primary method successful
      clearLocalSubmission(formData.email); // Clear backup on success
      return appsScriptResult;
    }
    
    // If Google Apps Script returns success: false, throw error to trigger fallback
    throw new Error(appsScriptResult.error || 'Google Apps Script submission failed');
    
  } catch (appsScriptError) {
    console.warn('Primary method failed, trying fallback:', appsScriptError.message);
    
    // FALLBACK METHOD: Google Forms direct submission
    try {
      // Attempting Google Forms direct submission (Fallback)
      const googleFormsResult = await submitToGoogleForms(formData);
      
      if (googleFormsResult.success) {
        // Fallback method completed successfully
        
        // Wait a moment to allow the submission to process
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        clearLocalSubmission(formData.email); // Clear backup on success
        return {
          success: true,
          message: 'Form submitted successfully to Google Forms (fallback method)',
          method: 'google_forms_fallback'
        };
      }
      
      // If Google Forms returns success: false, throw error to trigger email backup
      throw new Error(googleFormsResult.error || 'Google Forms submission failed');
      
    } catch (googleFormsError) {
      console.warn('Google Forms fallback failed, trying email backup:', googleFormsError.message);
      
      // BACKUP METHOD: Email notification services
      try {
        // Attempting email submission (Backup)
        const emailResult = await submitWithEmailFallback(formData);
        
        if (emailResult.success) {
          // Email backup method successful
          clearLocalSubmission(formData.email); // Clear backup on success
          return {
            ...emailResult,
            message: emailResult.message + ' (backup method used)'
          };
        }
        
        // If email backup fails, throw error to trigger final fallback
        throw new Error(emailResult.error || 'Email backup submission failed');
        
      } catch (emailError) {
        console.error('All automated submission methods failed');
          console.error('Apps Script Error:', appsScriptError.message);
          console.error('Google Forms Error:', googleFormsError.message);
          console.error('Email Error:', emailError.message);
        
        // Generate mailto link as last resort
        const mailtoLink = generateMailtoLink(formData);
        
        // Keep local backup for manual processing
        return {
          success: false,
          error: 'All automated submission methods failed. Your data has been saved locally and we will contact you soon.',
          details: {
            primaryError: appsScriptError.message,
            fallbackError: googleFormsError.message,
            emailError: emailError.message,
            localBackup: true,
            mailtoLink: mailtoLink,
            suggestion: 'You can also click the mailto link to send us an email directly.'
          }
        };
      }
    }
  }
};

// Local storage backup functions
const storeSubmissionLocally = (formData) => {
  try {
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const submission = {
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    submissions.push(submission);
    localStorage.setItem('pendingSubmissions', JSON.stringify(submissions));
    // Form data backed up locally
    
  } catch (error) {
    console.warn('Failed to store submission locally:', error);
  }
};

const clearLocalSubmission = (email) => {
  try {
    const submissions = JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
    const filtered = submissions.filter(s => s.email !== email);
    localStorage.setItem('pendingSubmissions', JSON.stringify(filtered));
  } catch (error) {
    console.warn('Failed to clear local submission:', error);
  }
};

export const getPendingSubmissions = () => {
  try {
    return JSON.parse(localStorage.getItem('pendingSubmissions') || '[]');
  } catch (error) {
    return [];
  }
};

// Email via Formspree as additional backup
export const sendContactEmailFormspree = async (formData) => {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your_form_id';
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    return { success: response.ok };
  } catch (error) {
    return { success: false, error: error.message };
  }
};