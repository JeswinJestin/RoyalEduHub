import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initAnalytics } from './utils/analytics';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Initialize analytics only in production with a valid tracking ID
initAnalytics();
root.render(
  // StrictMode double-invokes effects in dev; disabling to avoid duplicate logs
  <App />
);