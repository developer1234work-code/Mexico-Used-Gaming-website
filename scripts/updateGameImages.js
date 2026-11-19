const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'server', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

let updated = 0;
db.products = db.products.map(p => {
  if (p.id === 'game-super-mario-64') {
    updated++;
    return { ...p, imageUrl: '/assets/video games/super-mario-64.avif' };
  }
  if (p.id === 'game-zelda-ocarina') {
    updated++;
    return { ...p, imageUrl: '/assets/video games/zelda-ocarina-of-time.avif' };
  }
  if (p.id === 'game-smash-melee') {
    updated++;
    return { ...p, imageUrl: '/assets/video games/super-smash-bros-melee.png' };
  }
  return p;
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Updated ${updated} products in db.json with local video game asset paths.`);

// Also update seedData.js if exists
const seedPath = path.join(__dirname, '..', 'server', 'data', 'seedData.js');
if (fs.existsSync(seedPath)) {
  fs.writeFileSync(seedPath, `module.exports = ${JSON.stringify(db, null, 2)};\n`, 'utf8');
  console.log('Updated seedData.js');
}

// Also update scripts/generateFullDb.js
const genPath = path.join(__dirname, 'generateFullDb.js');
if (fs.existsSync(genPath)) {
  let genContent = fs.readFileSync(genPath, 'utf8');
  genContent = genContent.replace(
    /id: 'game-super-mario-64',[\s\S]*?imageUrl: '[^']+'/,
    (m) => m.replace(/imageUrl: '[^']+'/, "imageUrl: '/assets/video games/super-mario-64.avif'")
  );
  genContent = genContent.replace(
    /id: 'game-zelda-ocarina',[\s\S]*?imageUrl: '[^']+'/,
    (m) => m.replace(/imageUrl: '[^']+'/, "imageUrl: '/assets/video games/zelda-ocarina-of-time.avif'")
  );
  genContent = genContent.replace(
    /id: 'game-smash-melee',[\s\S]*?imageUrl: '[^']+'/,
    (m) => m.replace(/imageUrl: '[^']+'/, "imageUrl: '/assets/video games/super-smash-bros-melee.png'")
  );
  fs.writeFileSync(genPath, genContent, 'utf8');
  console.log('Updated generateFullDb.js');
}
