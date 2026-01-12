import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initFacebookPixel, trackEvent } from '../../utils/facebookPixel';

const FacebookPixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Pixel when the component mounts
    initFacebookPixel();
  }, []);

  useEffect(() => {
    // Track PageView on every route change
    // We wrap it in a small timeout to ensure it runs after the title update if possible,
    // though React's batching usually handles this fine.
    trackEvent('PageView');
  }, [location]);

  return null;
};

export default FacebookPixelTracker;
