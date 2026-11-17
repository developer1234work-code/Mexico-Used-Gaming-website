const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'client', 'src', 'pages');

// Files + search/replace pairs for adding font-hero-gaming to major h1s
// Strategy: replace className patterns that have h1 page titles
const files = [
  'CataloguePage.jsx',
  'ConsoleBrandSelectorPage.jsx',
  'ConsoleDetailPage.jsx',
  'SpecialEditionsPage.jsx',
  'InfoPages.jsx',
  'SubmitRequestPage.jsx',
  'RequestConfirmationPage.jsx',
  'CustomerTrackingPage.jsx',
  'AdminLoginPage.jsx',
  'CustomQuotePage.jsx',
];

let totalChanges = 0;

files.forEach(fileName => {
  const filePath = path.join(pagesDir, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${fileName}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Add font-hero-gaming to any <h1 className="..."> that doesn't already have it
  // Pattern: <h1 className="  (any classes not containing font-hero-gaming)
  content = content.replace(/<h1 className="(?!.*font-hero-gaming)([^"]+)"/g, (match, classes) => {
    console.log(`  [${fileName}] Adding font-hero-gaming to h1: ${classes.substring(0,60)}...`);
    return `<h1 className="font-hero-gaming ${classes}"`;
  });

  // Also add to major h2 section headers (ones with font-black + tracking-tight)
  content = content.replace(/<h2 className="(?!.*font-hero-gaming)(text-\w+ (?:sm:text-\w+ )?(?:md:text-\w+ )?font-black[^"]+)"/g, (match, classes) => {
    console.log(`  [${fileName}] Adding font-hero-gaming to h2: ${classes.substring(0,60)}...`);
    return `<h2 className="font-hero-gaming ${classes}"`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges++;
    console.log(`✓ Updated: ${fileName}`);
  } else {
    console.log(`- No changes needed: ${fileName}`);
  }
});

console.log(`\nDone! Updated ${totalChanges} files.`);
