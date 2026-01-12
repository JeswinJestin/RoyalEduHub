# Facebook Pixel Guide

## Overview
This project uses `react-facebook-pixel` to integrate Meta (Facebook) Pixel tracking. The implementation is designed to be performance-conscious, privacy-aware, and compatible with our prerendering strategy (`ReactSnap`).

## Configuration
The Pixel configuration is managed in `src/utils/facebookPixel.js`.

### Key Features
- **Prerendering Safety**: Pixel initialization and tracking are disabled when `navigator.userAgent` matches `ReactSnap`. This prevents prerendering build failures.
- **Do Not Track**: Respects user's `navigator.doNotTrack` setting.
- **Environment Awareness**: 
  - `autoConfig`: Enabled only in **production** to prevent "Privacy Sandbox" errors and noise during development.
  - `debug`: Enabled in **development** for easier troubleshooting.
- **Data Processing**: Explicitly sets `dataProcessingOptions` to `[]` for compliance stability.

## Usage

### 1. Global Tracking
The `FacebookPixelTracker` component (`src/components/common/FacebookPixelTracker.js`) is mounted in `App.js`. It automatically:
- Initializes the Pixel on mount.
- Tracks `PageView` events on every route change.

### 2. Custom Events
To track specific actions (e.g., button clicks, form submissions), use the utility functions:

```javascript
import { trackEvent, trackCustomEvent } from '../utils/facebookPixel';

// Standard Event
trackEvent('Contact', { method: 'email' });

// Custom Event
trackCustomEvent('CourseInquiry', { course: 'Science' });
```

## Troubleshooting

### `net::ERR_ABORTED .../privacy_sandbox/...`
**Cause**: This error occurs when the browser (e.g., Chrome) blocks the Facebook SDK from accessing the Privacy Sandbox Topics API. It is common in local development environments (`localhost`) or when using ad blockers.
**Resolution**: 
- This error is harmless and non-blocking. 
- We have set `autoConfig: false` in development to minimize this noise.
- Ensure your ad blocker is disabled if you need to verify tracking locally.

### Pixel Not Firing locally
- Check if you have an ad blocker enabled.
- Verify `process.env.NODE_ENV` is not interfering (debug logs should appear in console).
- Ensure `Do Not Track` is disabled in your browser settings.

## Verification
1. **Facebook Pixel Helper**: Install this Chrome extension.
2. **Production Test**: Run `npm run build` and `serve -s build`. Open `http://localhost:5000` (or the port served) and check the extension.
3. **Events Manager**: Check the "Test Events" tab in Facebook Events Manager.
