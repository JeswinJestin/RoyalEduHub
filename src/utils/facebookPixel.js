import ReactPixel from 'react-facebook-pixel';

const FACEBOOK_PIXEL_ID = '1384296423200471';

// Facebook Pixel Utility
export const initFacebookPixel = () => {
  const isProd = process.env.NODE_ENV === 'production';

  // Skip during react-snap prerendering
  if (navigator.userAgent === 'ReactSnap') {
    return;
  }

  // Respect Do Not Track
  if (navigator.doNotTrack === '1') {
    console.log('Facebook Pixel skipped due to Do Not Track preference.');
    return;
  }

  const options = {
    autoConfig: isProd, // Enable advanced matching only in production to reduce dev noise (e.g. Privacy Sandbox errors)
    debug: !isProd,     // Enable debug mode in development
  };

  ReactPixel.init(FACEBOOK_PIXEL_ID, {}, options);
  
  // Explicitly set data processing options for compliance and stability
  if (window.fbq) {
    window.fbq('dataProcessingOptions', []);
  }
  
  if (!isProd) {
    console.log('Facebook Pixel initialized with ID:', FACEBOOK_PIXEL_ID);
    console.log('Facebook Pixel autoConfig:', isProd);
  }
};

export const trackEvent = (eventName, data = {}) => {
  // Skip during react-snap prerendering
  if (navigator.userAgent === 'ReactSnap') return;

  ReactPixel.track(eventName, data);
  
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[FB Pixel] Track ${eventName}`, data);
  }
};

export const trackCustomEvent = (eventName, data = {}) => {
  // Skip during react-snap prerendering
  if (navigator.userAgent === 'ReactSnap') return;

  ReactPixel.trackCustom(eventName, data);
  
  if (process.env.NODE_ENV !== 'production') {
    console.debug(`[FB Pixel] TrackCustom ${eventName}`, data);
  }
};
