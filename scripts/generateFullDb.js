const fs = require('fs');
const path = require('path');
const { conditionTranslations, accessoryKeyMap, imageMapping, makeId } = require('./buildHelper');

function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
  const rows = [];
  let startIdx = 0;
  if (lines[0].startsWith('Category')) startIdx = 1;

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i];
    const fields = [];
    let cur = '';
    let inQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        if (inQuotes && line[c + 1] === '"') {
          cur += '"';
          c++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        fields.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    fields.push(cur.trim());
    if (fields.length >= 6) {
      rows.push({
        category: fields[0],
        model: fields[1],
        priceType: fields[2],
        item: fields[3],
        buyPrice: fields[4] ? Number(fields[4]) : null,
        status: fields[5],
        notes: fields[6] || '',
        currency: fields[7] || 'MXN'
      });
    }
  }
  return rows;
}

const csvPath = path.join(__dirname, '..', 'server', 'data', 'official_pricing.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const rows = parseCSV(csvContent);

console.log(`Parsed ${rows.length} rows from official_pricing.csv`);

// Group by Category and Model
const productsMap = {};
for (const row of rows) {
  const key = `${row.category}|||${row.model}`;
  if (!productsMap[key]) {
    productsMap[key] = {
      category: row.category,
      model: row.model,
      conditions: [],
      accessories: []
    };
  }
  if (row.priceType === 'Condition') {
    productsMap[key].conditions.push(row);
  } else if (row.priceType === 'OEM accessory / add-on') {
    productsMap[key].accessories.push(row);
  }
}

const productKeys = Object.keys(productsMap);
console.log(`Found ${productKeys.length} unique models to construct`);

const fullProducts = [];

for (const key of productKeys) {
  const entry = productsMap[key];
  const cat = entry.category;
  const model = entry.model;

  // Determine system category and brand
  let category = 'consoles';
  let categoryName = 'Consolas';
  let brand = cat;
  let platform = cat;
  let isCRT = false;
  let weightKg = 2.0;
  let dimensions = '30 x 20 x 8 cm';

  if (cat === 'Collectible CRT TV') {
    category = 'retro_tvs';
    categoryName = 'TVs analógicas CRT';
    brand = 'TVs analógicas CRT';
    platform = 'CRT Retro';
    isCRT = true;
    weightKg = 14;
    dimensions = '13" a 21" pulgadas';
  } else if (cat === 'Sony') {
    brand = 'PlayStation';
    platform = 'PlayStation';
    weightKg = 2.1;
  } else if (cat === 'Microsoft') {
    brand = 'Xbox';
    platform = 'Xbox Clásico';
    weightKg = 3.8;
  } else if (cat === 'Sega') {
    brand = 'Sega';
    platform = 'Sega Retro';
    weightKg = 1.8;
  } else if (cat === 'Nintendo') {
    brand = 'Nintendo';
    platform = 'Nintendo';
    if (model.includes('Game Boy') || model.includes('DS') || model.includes('3DS') || model.includes('2DS')) {
      weightKg = 0.4;
      dimensions = 'Portátil';
    } else {
      weightKg = 1.6;
    }
  }

  // Base buy price is the highest approved condition price (usually 'Working good')
  let baseBuyPrice = 0;
  for (const c of entry.conditions) {
    if (c.status === 'Approved' && c.buyPrice && c.buyPrice > baseBuyPrice) {
      baseBuyPrice = c.buyPrice;
    }
  }
  if (baseBuyPrice === 0) {
    // If no approved condition price yet, use the first numeric buyPrice or 500
    const firstNum = entry.conditions.find(c => c.buyPrice > 0);
    baseBuyPrice = firstNum ? firstNum.buyPrice : 500;
  }

  // Condition multipliers and condition list
  const conditionMultipliers = {
    works_perfect: 1.0,
    works_cosmetic_damage: 0.85,
    has_functional_problems: 0.60,
    does_not_work: 0.35,
    for_parts_only: 0.20
  };

  const conditionsList = [];
  for (const c of entry.conditions) {
    const tr = conditionTranslations[c.item] || { label: c.item, code: 'works_cosmetic_damage' };
    const condPrice = c.buyPrice || 0;
    const condMultiplier = baseBuyPrice > 0 && condPrice > 0 ? Number((condPrice / baseBuyPrice).toFixed(3)) : 0;
    
    // Update multiplier for standard key if appropriate
    if (tr.code === 'works_perfect' && condMultiplier > 0) {
      conditionMultipliers.works_perfect = 1.0;
    } else if (tr.code === 'works_cosmetic_damage' && condMultiplier > 0) {
      conditionMultipliers.works_cosmetic_damage = Math.min(0.9, condMultiplier);
    } else if (tr.code === 'has_functional_problems' && condMultiplier > 0) {
      conditionMultipliers.has_functional_problems = Math.min(0.7, condMultiplier);
    } else if (tr.code === 'does_not_work' && condMultiplier > 0) {
      conditionMultipliers.does_not_work = Math.min(0.4, condMultiplier);
    }

    conditionsList.push({
      id: c.item.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
      name: c.item,
      label: tr.label,
      standardCode: tr.code,
      buyPrice: c.buyPrice,
      status: c.status,
      multiplier: condMultiplier,
      isAutomaticOffer: c.status === 'Approved' && c.buyPrice !== null,
      notes: c.notes || ''
    });
  }

  // Accessory pricing
  const accessoryPricing = {};
  const accessoriesList = [];
  const accessoryLabels = {};

  for (const a of entry.accessories) {
    const map = accessoryKeyMap[a.item] || {
      key: a.item.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
      label: a.item
    };
    const accKey = map.key;
    const accPrice = a.buyPrice || 0;
    accessoryPricing[accKey] = accPrice;
    accessoryLabels[accKey] = map.label;

    accessoriesList.push({
      key: accKey,
      name: a.item,
      label: map.label,
      buyPrice: accPrice,
      status: a.status,
      isAutomaticOffer: a.status === 'Approved' && a.buyPrice !== null,
      notes: a.notes || 'Valor adicional genuino si está incluido'
    });
  }

  // Base includes
  const baseIncludes = isCRT 
    ? ['tubo_catodico_funcionando', 'altavoces_integrados']
    : ['original_controller', 'power_supply', 'av_cable'];

  // Image filename
  const imgFile = imageMapping[model] || 'Nintendo 64 console.jpg';
  const imageUrl = `/assets/Consoles and tv pictures/${imgFile}`;

  // Product Name
  let displayName = model;
  if (isCRT) {
    displayName = `Televisor CRT ${model} 13"-21"`;
  }

  // Description
  let description = isCRT
    ? `Televisor analógico CRT de tubo coleccionable temático de ${model} (13 a 21 pulgadas). Aceptamos modelos estándar y combos con DVD/VHS integrado.`
    : `Consola original ${model} de ${brand}. Inspección técnica garantizada con pago por transferencia directa en México.`;

  const prodId = makeId(cat, model);
  const sku = `${category.slice(0, 3).toUpperCase()}-${brand.slice(0, 4).toUpperCase()}-${prodId.slice(0, 10).toUpperCase()}`;

  fullProducts.push({
    id: prodId,
    sku,
    category,
    categoryName,
    brand,
    name: displayName,
    model,
    platform,
    baseBuyPrice,
    description,
    imageUrl,
    active: true,
    isCRT,
    weightKg,
    dimensions,
    baseIncludes,
    conditionMultipliers,
    conditions: conditionsList,
    accessoryPricing,
    accessoryLabels,
    accessoriesList,
    editions: [
      { id: 'standard', name: 'Versión / Color Original', priceDiff: 0 }
    ]
  });
}

console.log(`Generated ${fullProducts.length} official products from Excel data.`);

// Standard Video Games & Accessories to complete the catalog
const standardVideoGames = [
  {
    id: 'game-super-mario-64',
    sku: 'GAM-NINT-SM64',
    category: 'video_games',
    categoryName: 'Videojuegos',
    brand: 'Nintendo',
    name: 'Super Mario 64 (N64 Original)',
    model: 'Super Mario 64',
    platform: 'Nintendo 64',
    baseBuyPrice: 450,
    description: 'Cartucho original de Super Mario 64 para Nintendo 64. Evaluamos estado de la etiqueta, pines y funcionamiento.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    active: true,
    isCRT: false,
    weightKg: 0.15,
    dimensions: '11 x 7 x 2 cm',
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.75,
      has_functional_problems: 0.40,
      does_not_work: 0.15,
      for_parts_only: 0.05
    },
    conditions: [
      { id: 'cib', name: 'CIB (Completo con caja y manual)', label: 'Completo en caja con manuales', standardCode: 'works_perfect', buyPrice: 900, status: 'Approved', multiplier: 2.0, isAutomaticOffer: true },
      { id: 'cart_only_good', name: 'Cartucho solo / Excelente', label: 'Cartucho solo con etiqueta original intacta', standardCode: 'works_perfect', buyPrice: 450, status: 'Approved', multiplier: 1.0, isAutomaticOffer: true },
      { id: 'cart_worn', name: 'Cartucho con etiqueta desgastada', label: 'Cartucho funcionando con desgaste en carátula', standardCode: 'works_cosmetic_damage', buyPrice: 300, status: 'Approved', multiplier: 0.67, isAutomaticOffer: true }
    ],
    accessoryPricing: { original_box: 350, original_manuals: 150 },
    accessoryLabels: { original_box: 'Caja original de cartón', original_manuals: 'Folleto/Manual original' },
    accessoriesList: [
      { key: 'original_box', name: 'Caja original', label: 'Caja original de cartón', buyPrice: 350, status: 'Approved', isAutomaticOffer: true },
      { key: 'original_manuals', name: 'Manual original', label: 'Folleto/Manual original', buyPrice: 150, status: 'Approved', isAutomaticOffer: true }
    ]
  },
  {
    id: 'game-zelda-ocarina',
    sku: 'GAM-NINT-ZELDA-OOT',
    category: 'video_games',
    categoryName: 'Videojuegos',
    brand: 'Nintendo',
    name: 'The Legend of Zelda: Ocarina of Time (N64)',
    model: 'Zelda Ocarina of Time',
    platform: 'Nintendo 64',
    baseBuyPrice: 550,
    description: 'Cartucho original de The Legend of Zelda: Ocarina of Time para Nintendo 64.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    active: true,
    isCRT: false,
    weightKg: 0.15,
    dimensions: '11 x 7 x 2 cm',
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.75,
      has_functional_problems: 0.40,
      does_not_work: 0.15,
      for_parts_only: 0.05
    },
    conditions: [
      { id: 'cart_only_good', name: 'Cartucho solo / Excelente', label: 'Cartucho solo con etiqueta original intacta', standardCode: 'works_perfect', buyPrice: 550, status: 'Approved', multiplier: 1.0, isAutomaticOffer: true },
      { id: 'cart_worn', name: 'Cartucho con etiqueta desgastada', label: 'Cartucho funcionando con desgaste en carátula', standardCode: 'works_cosmetic_damage', buyPrice: 380, status: 'Approved', multiplier: 0.69, isAutomaticOffer: true }
    ],
    accessoryPricing: { original_box: 400, original_manuals: 180 },
    accessoryLabels: { original_box: 'Caja original de cartón', original_manuals: 'Manual original' },
    accessoriesList: [
      { key: 'original_box', name: 'Caja original', label: 'Caja original de cartón', buyPrice: 400, status: 'Approved', isAutomaticOffer: true }
    ]
  },
  {
    id: 'game-smash-melee',
    sku: 'GAM-NINT-MELEE',
    category: 'video_games',
    categoryName: 'Videojuegos',
    brand: 'Nintendo',
    name: 'Super Smash Bros. Melee (GameCube)',
    model: 'Super Smash Bros. Melee',
    platform: 'Nintendo GameCube',
    baseBuyPrice: 700,
    description: 'Disco original de Super Smash Bros. Melee para Nintendo GameCube. Inspección de superficie sin rayones profundos.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
    active: true,
    isCRT: false,
    weightKg: 0.2,
    dimensions: '19 x 13.5 x 1.5 cm',
    conditionMultipliers: { works_perfect: 1.0, works_cosmetic_damage: 0.75, has_functional_problems: 0.40, does_not_work: 0.15, for_parts_only: 0.05 },
    conditions: [
      { id: 'cib', name: 'CIB', label: 'Completo con estuche y manual', standardCode: 'works_perfect', buyPrice: 950, status: 'Approved', multiplier: 1.35, isAutomaticOffer: true },
      { id: 'disc_good', name: 'Disco con estuche', label: 'Disco en buen estado con estuche original', standardCode: 'works_perfect', buyPrice: 700, status: 'Approved', multiplier: 1.0, isAutomaticOffer: true }
    ],
    accessoryPricing: { original_manuals: 150 },
    accessoryLabels: { original_manuals: 'Manual original' },
    accessoriesList: [
      { key: 'original_manuals', name: 'Manual original', label: 'Manual original GameCube', buyPrice: 150, status: 'Approved', isAutomaticOffer: true }
    ]
  }
];

const standardAccessories = [
  {
    id: 'acc-n64-expansion-pak',
    sku: 'ACC-NINT-EXP-PAK',
    category: 'accessories',
    categoryName: 'Accesorios',
    brand: 'Nintendo',
    name: 'Expansion Pak Original N64 (4MB)',
    model: 'Expansion Pak',
    platform: 'Nintendo 64',
    baseBuyPrice: 400,
    description: 'Módulo de expansión de memoria original de 4MB para Nintendo 64 con tapa superior roja.',
    imageUrl: '/assets/Consoles and tv pictures/Nintendo 64 console.jpg',
    active: true,
    isCRT: false,
    weightKg: 0.1,
    dimensions: '5 x 4 x 2 cm',
    conditionMultipliers: { works_perfect: 1.0, works_cosmetic_damage: 0.85, has_functional_problems: 0.5, does_not_work: 0.2, for_parts_only: 0.1 },
    conditions: [
      { id: 'works_perfect', name: 'Working good', label: 'Funciona perfectamente', standardCode: 'works_perfect', buyPrice: 400, status: 'Approved', multiplier: 1.0, isAutomaticOffer: true }
    ],
    accessoryPricing: {},
    accessoryLabels: {},
    accessoriesList: []
  },
  {
    id: 'acc-gamecube-wavebird',
    sku: 'ACC-NINT-WAVEBIRD',
    category: 'accessories',
    categoryName: 'Accesorios',
    brand: 'Nintendo',
    name: 'Control Inalámbrico WaveBird GameCube con Receptor',
    model: 'WaveBird Controller',
    platform: 'Nintendo GameCube',
    baseBuyPrice: 650,
    description: 'Control oficial inalámbrico WaveBird para Nintendo GameCube incluyendo receptor de radiofrecuencia original.',
    imageUrl: '/assets/Consoles and tv pictures/Nintendo gamecube consoles.png',
    active: true,
    isCRT: false,
    weightKg: 0.35,
    dimensions: '14 x 13 x 6 cm',
    conditionMultipliers: { works_perfect: 1.0, works_cosmetic_damage: 0.85, has_functional_problems: 0.5, does_not_work: 0.2, for_parts_only: 0.1 },
    conditions: [
      { id: 'works_perfect', name: 'Working good with receiver', label: 'Funciona al 100% con receptor incluido', standardCode: 'works_perfect', buyPrice: 650, status: 'Approved', multiplier: 1.0, isAutomaticOffer: true }
    ],
    accessoryPricing: {},
    accessoryLabels: {},
    accessoriesList: []
  }
];

const allProducts = [...fullProducts, ...standardVideoGames, ...standardAccessories];
console.log(`Total catalog products: ${allProducts.length}`);

// Load existing db.json to preserve users, requests, inspections, audit_logs
const dbJsonPath = path.join(__dirname, '..', 'server', 'data', 'db.json');
let existingDb = { users: [], requests: [], inspections: [], audit_logs: [] };
if (fs.existsSync(dbJsonPath)) {
  try {
    existingDb = JSON.parse(fs.readFileSync(dbJsonPath, 'utf8'));
  } catch (e) {
    console.error('Error reading existing db.json:', e);
  }
}

existingDb.products = allProducts;

fs.writeFileSync(dbJsonPath, JSON.stringify(existingDb, null, 2), 'utf8');
console.log(`Successfully wrote ${allProducts.length} products to ${dbJsonPath}`);

// Also update seedData.js products export
const seedDataPath = path.join(__dirname, '..', 'server', 'data', 'seedData.js');
if (fs.existsSync(seedDataPath)) {
  const seedContent = `// Auto-generated official catalog seed data
module.exports = ${JSON.stringify(existingDb, null, 2)};
`;
  fs.writeFileSync(seedDataPath, seedContent, 'utf8');
  console.log(`Successfully updated ${seedDataPath}`);
}
