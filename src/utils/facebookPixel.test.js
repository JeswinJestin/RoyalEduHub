import { initFacebookPixel, trackEvent, trackCustomEvent } from './facebookPixel';
import ReactPixel from 'react-facebook-pixel';

jest.mock('react-facebook-pixel');

describe('Facebook Pixel Utility', () => {
  const originalEnv = process.env;
  const originalNavigator = window.navigator;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    // Reset navigator
    Object.defineProperty(window, 'navigator', {
      value: { ...originalNavigator, userAgent: 'Mozilla/5.0', doNotTrack: null },
      writable: true
    });
  });

  afterAll(() => {
    process.env = originalEnv;
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true
    });
  });

  test('initializes with correct ID and options in production', () => {
    process.env.NODE_ENV = 'production';
    initFacebookPixel();
    expect(ReactPixel.init).toHaveBeenCalledWith(
      '1384296423200471', 
      {}, 
      expect.objectContaining({ autoConfig: true })
    );
  });

  test('initializes with correct ID and options in development', () => {
    process.env.NODE_ENV = 'development';
    initFacebookPixel();
    expect(ReactPixel.init).toHaveBeenCalledWith(
      '1384296423200471', 
      {}, 
      expect.objectContaining({ autoConfig: false })
    );
  });

  test('respects Do Not Track', () => {
    Object.defineProperty(window.navigator, 'doNotTrack', { value: '1', writable: true });
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    initFacebookPixel();
    
    expect(ReactPixel.init).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Do Not Track'));
    consoleSpy.mockRestore();
  });

  test('skips initialization for ReactSnap', () => {
    Object.defineProperty(window.navigator, 'userAgent', { value: 'ReactSnap', writable: true });
    initFacebookPixel();
    expect(ReactPixel.init).not.toHaveBeenCalled();
  });

  test('trackEvent calls ReactPixel.track', () => {
    trackEvent('ViewContent', { id: 123 });
    expect(ReactPixel.track).toHaveBeenCalledWith('ViewContent', { id: 123 });
  });

  test('trackEvent skips for ReactSnap', () => {
    Object.defineProperty(window.navigator, 'userAgent', { value: 'ReactSnap', writable: true });
    trackEvent('ViewContent');
    expect(ReactPixel.track).not.toHaveBeenCalled();
  });

  test('trackCustomEvent calls ReactPixel.trackCustom', () => {
    trackCustomEvent('CustomAction', { value: 10 });
    expect(ReactPixel.trackCustom).toHaveBeenCalledWith('CustomAction', { value: 10 });
  });
});
