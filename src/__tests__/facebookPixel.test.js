import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FacebookPixelTracker from '../components/common/FacebookPixelTracker';
import { initFacebookPixel, trackEvent } from '../utils/facebookPixel';

// Mock the utility
jest.mock('../utils/facebookPixel', () => ({
  initFacebookPixel: jest.fn(),
  trackEvent: jest.fn(),
}));

describe('FacebookPixelTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes pixel and tracks PageView on mount', () => {
    render(
      <MemoryRouter>
        <FacebookPixelTracker />
      </MemoryRouter>
    );

    expect(initFacebookPixel).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith('PageView');
  });
});
