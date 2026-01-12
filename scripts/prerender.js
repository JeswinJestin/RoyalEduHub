const puppeteer = require('puppeteer');
const handler = require('serve-handler');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const PORT = 45678;

async function prerender() {
  console.log('🚀 Starting custom prerendering...');

  // 1. Start static server
  const server = http.createServer((request, response) => {
    return handler(request, response, {
      public: BUILD_DIR,
      rewrites: [
        { source: '**', destination: '/index.html' }
      ]
    });
  });

  await new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`📡 Server running at http://localhost:${PORT}`);
      resolve();
    });
  });

  let browser;
  try {
    // 2. Launch Puppeteer
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set User Agent to 'ReactSnap' to trigger our code's optimizations/fallbacks
    await page.setUserAgent('ReactSnap');

    // Log console messages for debugging
    page.on('console', msg => {
        const type = msg.type();
        const text = msg.text();
        if (type === 'error') console.error(`[PAGE ERROR] ${text}`);
        else console.log(`[PAGE LOG] ${text}`);
    });
    
    page.on('pageerror', err => {
      console.error('🔥 [PAGE EXCEPTION]', err);
      console.error('Stack trace:', err.stack);
    });
    page.on('requestfailed', request => {
        // Ignore expected failures if any, but log everything for now
        if (request.url().includes('google-analytics')) return;
        console.error(`❌ [FAILED REQUEST] ${request.url()} - ${request.failure().errorText}`);
    });
    page.on('response', response => {
        if (response.status() >= 400) {
            console.warn(`⚠️ [HTTP ERROR] ${response.status()} ${response.url()}`);
        }
    });

    console.log('🕷️  Crawling / ...');
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0', timeout: 60000 });

    // 3. Wait for hydration/rendering
    // We look for a key element that indicates the app has mounted.
    // The "root" div should contain something.
    try {
        await page.waitForFunction('document.getElementById("root").innerHTML.trim().length > 0', { timeout: 30000 });
        console.log('✅ App mounted (root has content).');
    } catch (e) {
        console.error('❌ App did not mount within timeout!');
        throw e;
    }

    // Optional: Wait for specific elements to ensure critical CSS/JS loaded
    // await page.waitForSelector('nav'); 

    // 4. Capture HTML
    const html = await page.content();
    
    // 5. Save to index.html
    const indexPath = path.join(BUILD_DIR, 'index.html');
    fs.writeFileSync(indexPath, html);
    console.log('💾 Prerendered index.html saved.');

  } catch (error) {
    console.error('❌ Prerendering failed:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('👋 Prerender process finished.');
  }
}

prerender();
