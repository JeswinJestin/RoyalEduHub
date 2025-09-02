import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode double-invokes effects in dev; disabling to avoid duplicate logs
  <App />
);