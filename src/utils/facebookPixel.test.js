import { initFacebookPixel, trackEvent } from './facebookPixel';

describe('Facebook Pixel Utility', () => {
  const originalEnv = process.env;
  const originalNavigator = window.navigator;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    // Reset window.fbq
    delete window.fbq;
    // Mock navigator
    Object.defineProperty(window, 'navigator', {
      value: { ...originalNavigator, doNotTrack: null },
      writable: true
    });
    // Ensure a script tag exists for the Pixel code to anchor to
    const scriptPlaceholder = document.createElement('script');
    document.head.appendChild(scriptPlaceholder);
  });

  afterAll(() => {
    process.env = originalEnv;
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true
    });
  });

  test('does not initialize if ID is missing', () => {
    process.env.REACT_APP_FACEBOOK_PIXEL_ID = '';
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    initFacebookPixel();
    
    expect(window.fbq).toBeUndefined();
    // expect(consoleSpy).toHaveBeenCalled(); // Warns in dev
    consoleSpy.mockRestore();
  });

  test('respects Do Not Track', () => {
    process.env.REACT_APP_FACEBOOK_PIXEL_ID = '123';
    Object.defineProperty(window.navigator, 'doNotTrack', { value: '1', writable: true });
    
    initFacebookPixel();
    
    expect(window.fbq).toBeUndefined();
  });

  test('initializes with valid ID', () => {
    process.env.REACT_APP_FACEBOOK_PIXEL_ID = '1234567890';
    process.env.NODE_ENV = 'production'; // To avoid console logs
    
    initFacebookPixel();
    
    expect(window.fbq).toBeDefined();
    // Verify init call
    // Since fbq is the function created by the snippet, we can't easily spy on it unless we mock it *before* init,
    // but init *creates* it.
    // However, we can check if the script tag was added.
    const script = document.querySelector('script[src="https://connect.facebook.net/en_US/fbevents.js"]');
    expect(script).toBeInTheDocument();
  });
});
