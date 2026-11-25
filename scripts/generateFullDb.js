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

  // Ezra Requirement 3: We don't buy the original Playstation 1 fat, so it can be removed.
  if (cat === 'Sony' && (model === 'PlayStation PS1 Original' || model.includes('PS1 Original'))) {
    continue;
  }

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
    let condPrice = c.buyPrice || 0;
    let condStatus = c.status;
    let condNotes = c.notes || '';
    let condLabel = tr.label;

    // Ezra Rule: We won't be buying consoles that have cracks and yellowish together,
    // applies for all kinds of consoles except Game Boy SP 001 and 101 models.
    const isCracksAndYellowing = c.item.toLowerCase().includes('yellowing and cracks') || 
      (c.item.toLowerCase().includes('yellow') && c.item.toLowerCase().includes('crack'));
    const isGameBoySP = model === 'GBA SP AGS-001' || model === 'GBA SP AGS-101';

    if (isCracksAndYellowing && !isGameBoySP) {
      condStatus = 'No automatic offer';
      condPrice = null;
      condLabel = 'Carcasa cuarteada y con amarilleo (No se compra)';
      condNotes = 'No compramos consolas con grietas y amarilleo juntos (excepto Game Boy Advance SP 001 y 101).';
    }

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
      label: condLabel,
      standardCode: tr.code,
      buyPrice: condPrice,
      status: condStatus,
      multiplier: condMultiplier,
      isAutomaticOffer: condStatus === 'Approved' && condPrice !== null,
      notes: condNotes
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

  // Ezra Requirement 4: GameCube accessories & clean description (no WaveBird in base description)
  if (model === 'GameCube') {
    accessoryPricing['wavebird_controller'] = 650;
    accessoryPricing['extra_controller'] = 200;
    accessoryPricing['power_adapter'] = 120;
    accessoryPricing['av_cable'] = 80;
    accessoryPricing['memory_card'] = 100;
    accessoryLabels['wavebird_controller'] = 'Control inalámbrico WaveBird original con receptor';
    accessoryLabels['extra_controller'] = 'Control original GameCube (alámbrico)';
    accessoryLabels['power_adapter'] = 'Eliminador / adaptador de corriente original GameCube';
    accessoryLabels['av_cable'] = 'Cable de Audio/Video AV original GameCube';
    accessoryLabels['memory_card'] = 'Tarjeta de memoria Memory Card original GameCube';

    accessoriesList.length = 0;
    accessoriesList.push(
      { key: 'wavebird_controller', name: 'Control inalámbrico WaveBird con receptor', label: 'Control inalámbrico WaveBird original con receptor RF', buyPrice: 650, status: 'Approved', isAutomaticOffer: true, notes: 'Control WaveBird oficial con receptor de radiofrecuencia' },
      { key: 'extra_controller', name: 'Control original GameCube (alámbrico)', label: 'Control original GameCube oficial', buyPrice: 200, status: 'Approved', isAutomaticOffer: true, notes: 'Mando oficial funcionando' },
      { key: 'power_adapter', name: 'Adaptador de corriente original', label: 'Eliminador de corriente original GameCube', buyPrice: 120, status: 'Approved', isAutomaticOffer: true, notes: 'Fuente de poder original Nintendo' },
      { key: 'av_cable', name: 'Cable AV original', label: 'Cable de Audio/Video AV original', buyPrice: 80, status: 'Approved', isAutomaticOffer: true, notes: 'Cable de video oficial Nintendo' },
      { key: 'memory_card', name: 'Memory Card original', label: 'Tarjeta de memoria Memory Card oficial', buyPrice: 100, status: 'Approved', isAutomaticOffer: true, notes: 'Tarjeta de memoria oficial' }
    );
  }

  // Ezra Requirement 3: PSone Slim (Combo with original LCD screen attached)
  if (model === 'PSone Slim') {
    baseBuyPrice = 1000; // $200 console + $800 working OEM LCD screen attached
    conditionsList.length = 0;
    conditionsList.push(
      {
        id: 'working_good_with_screen',
        name: 'Pantalla en buen estado y consola leyendo discos',
        label: 'Pantalla LCD en buen estado y consola leyendo discos',
        standardCode: 'works_perfect',
        buyPrice: 1000,
        status: 'Approved',
        multiplier: 1.0,
        isAutomaticOffer: true,
        notes: 'Consola PsOne Slim con pantalla portátil oficial Sony adjunta funcionando al 100%'
      },
      {
        id: 'screen_damaged_or_not_reading',
        name: 'Sin pantalla o no lee discos',
        label: 'Sin pantalla portátil, pantalla dañada o no lee discos (No se compra)',
        standardCode: 'does_not_work',
        buyPrice: null,
        status: 'No automatic offer',
        multiplier: 0,
        isAutomaticOffer: false,
        notes: 'Solo compramos PsOne Slim con pantalla oficial adjunta en buen estado y leyendo discos.'
      }
    );

    accessoryPricing['extra_controller'] = 150;
    accessoryPricing['power_adapter'] = 75;
    accessoryPricing['av_cable'] = 75;
    accessoryPricing['memory_card'] = 25;
    delete accessoryPricing['psone_lcd_screen'];

    accessoryLabels['extra_controller'] = 'Control original PSone oficial';
    accessoryLabels['power_adapter'] = 'Eliminador / adaptador de corriente original PSone';
    accessoryLabels['av_cable'] = 'Cable AV original Sony';
    accessoryLabels['memory_card'] = 'Memory Card original oficial';
    delete accessoryLabels['psone_lcd_screen'];

    accessoriesList.length = 0;
    accessoriesList.push(
      { key: 'extra_controller', name: 'OEM controller', label: 'Control original PSone oficial', buyPrice: 150, status: 'Approved', isAutomaticOffer: true, notes: 'Control oficial gris claro funcionando' },
      { key: 'power_adapter', name: 'OEM power adapter', label: 'Eliminador / adaptador de corriente original', buyPrice: 75, status: 'Approved', isAutomaticOffer: true, notes: 'Adaptador de corriente oficial Sony' },
      { key: 'av_cable', name: 'OEM AV cable', label: 'Cable AV original Sony', buyPrice: 75, status: 'Approved', isAutomaticOffer: true, notes: 'Cable de video oficial' },
      { key: 'memory_card', name: 'OEM memory card', label: 'Memory Card original oficial', buyPrice: 25, status: 'Approved', isAutomaticOffer: true, notes: 'Tarjeta de memoria oficial' }
    );
  }

  // Ezra Requirement 2: Base includes console only (no cables or controllers in base price)
  const baseIncludes = isCRT 
    ? ['tubo_catodico_funcionando', 'altavoces_integrados']
    : (model === 'PSone Slim' ? ['consola_psone', 'pantalla_lcd_adjunta'] : ['consola_sola']);

  // Image filename
  const imgFile = imageMapping[model] || 'Nintendo 64 console.jpg';
  const imageUrl = `/assets/Consoles and tv pictures/${imgFile}`;

  // Product Name
  let displayName = model;
  if (isCRT) {
    displayName = `Televisor CRT ${model} 13"-21"`;
  } else if (model === 'PSone Slim') {
    displayName = 'PlayStation PsOne Slim (Con Pantalla LCD Portátil)';
  }

  // Description: Every console option is console only (no cables or controllers)
  let description = '';
  if (isCRT) {
    description = `Televisor analógico CRT de tubo coleccionable temático de ${model} (13 a 21 pulgadas). Aceptamos modelos estándar y combos con DVD/VHS integrado.`;
  } else if (model === 'PSone Slim') {
    description = `Consola PlayStation PsOne Slim incluyendo la pantalla LCD portátil adjunta oficial. Compramos exclusivamente el combo con pantalla en buen estado y consola leyendo discos. Puedes agregar controles y cables originales en la configuración.`;
  } else if (model === 'GameCube') {
    description = `Consola original GameCube de Nintendo. Precio base por la consola sola (sin cables ni controles). Agrega en la configuración tus cables y controles (incluyendo WaveBird) para recibir una mayor cotización.`;
  } else {
    description = `Consola original ${model} de ${brand}. Precio base por la consola sola (sin cables ni controles). Al configurarla puedes agregar tus cables y controles originales para recibir un mayor importe.`;
  }

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
