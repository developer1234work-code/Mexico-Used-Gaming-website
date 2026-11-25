const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'client', 'src', 'pages', 'HomePage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove useEffect from import
content = content.replace(
  "import React, { useState } from 'react';",
  "import React, { useState } from 'react';"
);

// 2. Remove the HERO_PHRASES array and HeroTypewriterHeading function (lines 32-129)
// Find the block from "// Typewriter Heading" to "}" closing HeroTypewriterHeading
const typewriterStart = content.indexOf('// Typewriter Heading Component matching');
const typewriterEnd = content.indexOf('\n// Metallic Gold Wave Ribbons');
if (typewriterStart !== -1 && typewriterEnd !== -1) {
  const removed = content.slice(typewriterStart, typewriterEnd);
  console.log('Removing typewriter block, length:', removed.length, 'chars');
  content = content.slice(0, typewriterStart) + content.slice(typewriterEnd + 1);
  console.log('Typewriter block removed OK');
} else {
  console.log('WARNING: typewriter block not found. start:', typewriterStart, 'end:', typewriterEnd);
}

// 3. Replace <HeroTypewriterHeading /> with static h1
content = content.replace(
  `            {/* Heading with Typewriter effect & exact gaming font (not italic) */}\n            <HeroTypewriterHeading />`,
  `            {/* Static Heading — Chakra Petch gaming font, upright, single phrase */}\n            <h1 className="font-hero-gaming not-italic text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.14]">\n              <span className="block">\n                Consolas <span className="text-[#F5A623]">Cl\u00e1sicas</span>\n              </span>\n              <span className="block mt-1 sm:mt-1.5">\n                para Verdaderos <span className="text-[#F5A623]">Fan\u00e1ticos</span>\n              </span>\n            </h1>`
);

// 4. Add font-hero-gaming to major h2 section headings in HomePage
// "¿Qué quieres vender?" section h2
content = content.replace(
  `<h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-neutral-900 tracking-tight font-display leading-[1.18] mb-3">`,
  `<h2 className="font-hero-gaming text-3xl sm:text-4xl md:text-[42px] font-black text-neutral-900 tracking-tight leading-[1.18] mb-3">`
);

// "¿Por qué elegirnos?" h2
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight font-display">`,
  `<h2 className="font-hero-gaming text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">`
);

// "¿Cómo funciona?" h2 (dark background, white text)
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-display">`,
  `<h2 className="font-hero-gaming text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">`
);

// "Preguntas Frecuentes" h2
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display">`,
  `<h2 className="font-hero-gaming text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">`
);

// Special edition card h3 (gold colored)
content = content.replace(
  `<h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5A623] font-display">`,
  `<h3 className="font-hero-gaming text-2xl sm:text-3xl font-black tracking-tight text-[#F5A623]">`
);

// FAQ h3 (white, dark bg)
content = content.replace(
  `<h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">`,
  `<h3 className="font-hero-gaming text-2xl sm:text-3xl font-black tracking-tight text-white">`
);

// Sell section card h3s (text-xl, font-display)
content = content.replaceAll(
  `<h3 className="text-xl font-black text-neutral-900 font-display mb-1.5">`,
  `<h3 className="font-hero-gaming text-xl font-black text-neutral-900 mb-1.5">`
);

// "Cómo funciona" steps h3 (white, font-display)
content = content.replaceAll(
  `<h3 className="text-white font-extrabold text-base sm:text-lg font-display mt-5 mb-1.5">`,
  `<h3 className="font-hero-gaming text-white font-extrabold text-base sm:text-lg mt-5 mb-1.5">`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('HomePage.jsx updated successfully!');
console.log('Total length:', content.length);
