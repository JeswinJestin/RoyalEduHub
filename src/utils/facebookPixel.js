// Facebook Pixel Utility
export const initFacebookPixel = () => {
  const pixelId = process.env.REACT_APP_FACEBOOK_PIXEL_ID;
  const isProd = process.env.NODE_ENV === 'production';

  // Respect Do Not Track
  if (navigator.doNotTrack === '1') {
    console.log('Facebook Pixel skipped due to Do Not Track preference.');
    return;
  }

  if (!pixelId) {
    if (!isProd) {
      console.warn('Facebook Pixel ID not found in environment variables (REACT_APP_FACEBOOK_PIXEL_ID).');
    }
    return;
  }

  if (!isProd) {
    console.log('Facebook Pixel initialized in development mode (events will be logged but not sent unless configured).');
  }

  // Standard Facebook Pixel Code
  /* eslint-disable no-unused-expressions */
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable no-unused-expressions */

  window.fbq('init', pixelId);
};

export const trackEvent = (eventName, data = {}) => {
  if (window.fbq) {
    window.fbq('track', eventName, data);
  } else {
    // Only log in development or if specifically debugging
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[FB Pixel] Track ${eventName}`, data);
    }
  }
};

export const trackCustomEvent = (eventName, data = {}) => {
  if (window.fbq) {
    window.fbq('trackCustom', eventName, data);
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[FB Pixel] TrackCustom ${eventName}`, data);
    }
  }
};
