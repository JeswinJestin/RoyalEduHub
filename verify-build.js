const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build');
const indexHtmlPath = path.join(buildDir, 'index.html');

console.log('Verifying build output...');

if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory not found!');
  process.exit(1);
}

if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ index.html not found in build directory!');
  process.exit(1);
}

const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

const checks = [
  { label: 'Title', regex: /<title>Royal Edu Hub/ },
  { label: 'Meta Description', regex: /<meta name="description"/ },
  { label: 'Root Element', regex: /id="root"/ },
  { label: 'SSR Content (Business Name)', regex: /Royal Edu Hub/ },
  { label: 'SSR Content (Navigation)', regex: /OUR COURSES/ },
  { label: 'SSR Content (Phone)', regex: /703411168/ }
];

let allPassed = true;

checks.forEach(check => {
  if (check.regex.test(htmlContent)) {
    console.log(`✅ ${check.label} found.`);
  } else {
    console.error(`❌ ${check.label} NOT found!`);
    allPassed = false;
  }
});

// Check if content is actually rendered (not just empty div)
if (htmlContent.includes('<div id="root"></div>') || htmlContent.includes('<div id="root"></div>')) {
    // Ideally, react-snap should fill this. If it's empty, it failed.
    // However, spaces might vary.
    // A better check is to see if "root" contains children.
    const rootMatch = htmlContent.match(/<div id="root">([\s\S]*?)<\/div>/);
    if (rootMatch && rootMatch[1].trim().length === 0) {
         console.error('❌ Root element is empty! SSR/Prerendering failed.');
         allPassed = false;
    } else {
         console.log('✅ Root element has content.');
    }
}

if (allPassed) {
  console.log('\n🎉 Verification PASSED: Critical content is present in initial HTML.');
} else {
  console.error('\nmw Verification FAILED: Some critical content is missing.');
  process.exit(1);
}
