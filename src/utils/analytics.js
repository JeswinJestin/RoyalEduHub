export function initAnalytics() {
  const trackingId = process.env.REACT_APP_GA_TRACKING_ID;
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd || !trackingId) {
    return; // Do not initialize analytics in development or without ID
  }

  // Inject gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  document.head.appendChild(script);

  // Setup dataLayer and config
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  // Expose globally so other modules can use if needed
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', trackingId);
}