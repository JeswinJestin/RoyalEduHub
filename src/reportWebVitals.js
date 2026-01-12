const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      if (onCLS) onCLS(onPerfEntry);
      if (onINP) onINP(onPerfEntry);
      if (onFCP) onFCP(onPerfEntry);
      if (onLCP) onLCP(onPerfEntry);
      if (onTTFB) onTTFB(onPerfEntry);
    }).catch(console.error);
  }
};

export default reportWebVitals;
