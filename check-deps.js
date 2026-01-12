try {
  require('puppeteer');
  console.log('puppeteer available');
} catch (e) {
  console.log('puppeteer missing');
}
try {
  require('serve-handler');
  console.log('serve-handler available');
} catch (e) {
  console.log('serve-handler missing');
}
