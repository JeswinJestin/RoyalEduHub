import './polyfills';
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { initAnalytics } from './utils/analytics';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');
// Initialize analytics only in production with a valid tracking ID
initAnalytics();

// Ensure we only hydrate if there is substantial content (not just whitespace)
const hasContent = container.hasChildNodes() && container.innerHTML.trim().length > 0;

if (hasContent) {
  hydrateRoot(container, <App />);
} else {
  const root = createRoot(container);
  root.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (navigator.userAgent !== 'ReactSnap') {
  reportWebVitals(console.log);
}