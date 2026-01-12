const webVitals = require('web-vitals');
console.log('Available exports:', Object.keys(webVitals));
if (typeof webVitals.onINP === 'function') {
  console.log('✅ onINP is available');
} else {
  console.error('❌ onINP is MISSING');
}
if (typeof webVitals.onFID === 'function') {
  console.log('⚠️ onFID is still available');
} else {
  console.log('✅ onFID is correctly missing');
}
