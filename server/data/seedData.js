const bcrypt = require('bcryptjs');

const seedUsers = [
  {
    id: 'usr-admin-1',
    name: 'Carlos Mendoza (Owner/Admin)',
    email: 'admin@retrocompra.com',
    passwordHash: bcrypt.hashSync('Admin123!', 10),
    role: 'admin',
    department: 'Management',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-purchasing-1',
    name: 'Sofia Reyes (Purchasing Lead)',
    email: 'purchasing@retrocompra.com',
    passwordHash: bcrypt.hashSync('Purchasing123!', 10),
    role: 'purchasing',
    department: 'Purchasing & Valuations',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-inspection-1',
    name: 'Mateo Hernandez (Hardware QA & Receiving)',
    email: 'inspection@retrocompra.com',
    passwordHash: bcrypt.hashSync('Inspection123!', 10),
    role: 'inspection',
    department: 'Receiving & Inspection',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-support-1',
    name: 'Valeria Cruz (Customer Service)',
    email: 'support@retrocompra.com',
    passwordHash: bcrypt.hashSync('Support123!', 10),
    role: 'customer_service',
    department: 'Customer Support',
    createdAt: new Date().toISOString()
  }
];

// Helper to generate console records
function createConsole({
  id,
  brand,
  name,
  model,
  baseBuyPrice,
  imageUrl,
  description,
  accessories = {},
  editions = [],
  baseIncludes = ['original_controller', 'power_supply', 'av_cable']
}) {
  return {
    id,
    sku: `CON-${brand.toUpperCase().slice(0, 4)}-${id.toUpperCase().slice(0, 10)}`,
    category: 'consoles',
    categoryName: 'Consolas',
    brand,
    name,
    model: model || name,
    platform: brand,
    baseBuyPrice,
    description: description || `Consola ${name} de ${brand}. Cotización garantizada en MXN.`,
    imageUrl,
    active: true,
    baseIncludes,
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.85,
      has_functional_problems: 0.60,
      does_not_work: 0.35,
      for_parts_only: 0.20
    },
    accessoryPricing: {
      extra_controller: 150,
      original_power_supply: 120,
      av_cable: 80,
      hdmi_adapter: 150,
      memory_card: 100,
      original_box: 200,
      original_manuals: 100,
      missing_controller: -150,
      missing_power_supply: -120,
      missing_av_cable: -60,
      ...accessories
    },
    editions: editions.length > 0 ? editions : [
      { id: 'standard', name: 'Versión Estándar / Color Original', priceDiff: 0 }
    ]
  };
}

const seedProducts = [
  // ==========================================
  // NINTENDO CONSOLES (21 Systems Requested)
  // ==========================================
  createConsole({
    id: 'nes-original',
    brand: 'Nintendo',
    name: 'Nintendo Entertainment System (NES)',
    model: 'NES-001 (Front Loader)',
    baseBuyPrice: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'La legendaria consola de 8 bits de Nintendo que revolucionó los videojuegos caseros en 1985.',
    accessories: { extra_controller: 150, original_box: 450, zapper_gun: 200 },
    editions: [
      { id: 'standard', name: 'Front Loader Original', priceDiff: 0 },
      { id: 'toploader', name: 'NES-101 Top Loader (Rara)', priceDiff: 800 }
    ]
  }),
  createConsole({
    id: 'snes-original',
    brand: 'Nintendo',
    name: 'Super Nintendo (SNES)',
    model: 'SNS-001 / 16-Bit',
    baseBuyPrice: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola Super Nintendo de 16 bits original.',
    accessories: { extra_controller: 180, original_box: 500, super_scope: 350 },
    editions: [
      { id: 'standard', name: 'SNES Original SNS-001', priceDiff: 0 },
      { id: 'jr', name: 'SNES Jr. SNS-101 (Rediseño)', priceDiff: 400 }
    ]
  }),
  createConsole({
    id: 'n64-original',
    brand: 'Nintendo',
    name: 'Nintendo 64',
    model: 'NUS-001 (Charcoal Black)',
    baseBuyPrice: 900,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola clásica N64 de 64 bits con joystick analógico.',
    accessories: { 
      extra_controller: 150, 
      expansion_pak: 300, 
      original_box: 200, 
      memory_card: 100, 
      rumble_pak: 120 
    },
    editions: [
      { id: 'charcoal', name: 'Charcoal Black Estándar', priceDiff: 0 },
      { id: 'funtastic_jungle', name: 'Funtastic Jungle Green', priceDiff: 500 },
      { id: 'funtastic_ice', name: 'Funtastic Ice Blue', priceDiff: 500 },
      { id: 'funtastic_fire', name: 'Funtastic Fire Orange', priceDiff: 600 },
      { id: 'funtastic_grape', name: 'Funtastic Grape Purple', priceDiff: 600 },
      { id: 'funtastic_smoke', name: 'Funtastic Smoke Grey', priceDiff: 700 },
      { id: 'funtastic_watermelon', name: 'Funtastic Watermelon Red', priceDiff: 800 },
      { id: 'pikachu', name: 'Pikachu Edition (Azul/Amarillo)', priceDiff: 1400 },
      { id: 'gold', name: 'Gold Edition', priceDiff: 900 }
    ]
  }),
  createConsole({
    id: 'gamecube-original',
    brand: 'Nintendo',
    name: 'Nintendo GameCube',
    model: 'DOL-001 / DOL-101',
    baseBuyPrice: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Cubo compacto de Nintendo con formato miniDVD.',
    accessories: { extra_controller: 250, original_box: 400, game_boy_player: 650, memory_card: 120 },
    editions: [
      { id: 'indigo', name: 'Indigo Morado Original', priceDiff: 0 },
      { id: 'jet_black', name: 'Jet Black Negro', priceDiff: 0 },
      { id: 'platinum', name: 'Platinum Plateado', priceDiff: 150 },
      { id: 'orange_spice', name: 'Spice Orange (Import)', priceDiff: 600 }
    ]
  }),
  createConsole({
    id: 'nintendo-wii',
    brand: 'Nintendo',
    name: 'Nintendo Wii',
    model: 'RVL-001 (Retrocompatible GC)',
    baseBuyPrice: 850,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola revolucionaria con controles por movimiento Wii Remote y barra de sensores.',
    accessories: { extra_controller: 150, nunchuk: 80, original_box: 200, balance_board: 250 }
  }),
  createConsole({
    id: 'nintendo-wii-u',
    brand: 'Nintendo',
    name: 'Nintendo Wii U',
    model: 'WUP-010 Deluxe 32GB',
    baseBuyPrice: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola con GamePad táctil integrado de 6.2 pulgadas y soporte HD.',
    accessories: { original_gamepad: 600, pro_controller: 250, original_box: 350 },
    editions: [
      { id: 'deluxe_32', name: 'Deluxe Black 32GB', priceDiff: 0 },
      { id: 'zelda_windwaker', name: 'Zelda Wind Waker HD Edition', priceDiff: 700 }
    ]
  }),
  createConsole({
    id: 'nintendo-switch-v2',
    brand: 'Nintendo',
    name: 'Nintendo Switch',
    model: 'HAC-001(-01) Batería Mejorada',
    baseBuyPrice: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-8be9f1505e60?auto=format&fit=crop&w=600&q=80',
    description: 'Consola híbrida portátil y de sobremesa con dock y Joy-Cons desmontables.',
    accessories: { extra_controller: 450, pro_controller: 400, original_box: 250, case: 100 }
  }),
  createConsole({
    id: 'nintendo-switch-lite',
    brand: 'Nintendo',
    name: 'Nintendo Switch Lite',
    model: 'HDH-001 100% Portátil',
    baseBuyPrice: 1900,
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-8be9f1505e60?auto=format&fit=crop&w=600&q=80',
    description: 'Versión compacta y ligera optimizada exclusivamente para el juego portátil.',
    accessories: { original_box: 200, charger: 150 },
    editions: [
      { id: 'standard_color', name: 'Colores Estándar (Turquesa/Gris/Amarillo/Coral/Azul)', priceDiff: 0 },
      { id: 'zacian_zamazenta', name: 'Edición Pokémon Zacian & Zamazenta', priceDiff: 350 },
      { id: 'dialga_palkia', name: 'Edición Pokémon Dialga & Palkia', priceDiff: 350 },
      { id: 'hyrule', name: 'Edición Dorada Hyrule Edition', priceDiff: 500 }
    ]
  }),
  createConsole({
    id: 'nintendo-switch-oled',
    brand: 'Nintendo',
    name: 'Nintendo Switch OLED',
    model: 'HEG-001 Pantalla OLED 7"',
    baseBuyPrice: 4200,
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-8be9f1505e60?auto=format&fit=crop&w=600&q=80',
    description: 'Pantalla OLED vibrante de 7 pulgadas con soporte ancho ajustable y puerto LAN.',
    accessories: { extra_controller: 500, pro_controller: 450, original_box: 300 },
    editions: [
      { id: 'white', name: 'Blanco Estándar', priceDiff: 0 },
      { id: 'neon', name: 'Neón Azul/Rojo', priceDiff: 0 },
      { id: 'zelda_totk', name: 'Edición Zelda Tears of the Kingdom', priceDiff: 650 },
      { id: 'pokemon_sv', name: 'Edición Pokémon Scarlet & Violet', priceDiff: 600 },
      { id: 'mario_red', name: 'Edición Mario Red', priceDiff: 400 },
      { id: 'splatoon_3', name: 'Edición Splatoon 3', priceDiff: 550 }
    ]
  }),
  createConsole({
    id: 'nintendo-switch-2',
    brand: 'Nintendo',
    name: 'Nintendo Switch 2',
    model: 'Next-Generation Console',
    baseBuyPrice: 5500,
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-8be9f1505e60?auto=format&fit=crop&w=600&q=80',
    description: 'La próxima generación de consola Nintendo. Valuación prioritaria garantizada en RetroCompra.',
    accessories: { extra_controller: 600, original_box: 400 }
  }),
  createConsole({
    id: 'gameboy-original',
    brand: 'Nintendo',
    name: 'Original Game Boy',
    model: 'DMG-01 (Gris Clásico)',
    baseBuyPrice: 950,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'El Game Boy clásico de 1989 diseñado por Gunpei Yokoi. Tubo de pantalla monocromática.',
    accessories: { original_box: 600, original_manuals: 200, link_cable: 100 }
  }),
  createConsole({
    id: 'gameboy-pocket',
    brand: 'Nintendo',
    name: 'Game Boy Pocket',
    model: 'MGB-001',
    baseBuyPrice: 850,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Versión delgada y compacta con pantalla LCD en blanco y negro real (True B&W).',
    accessories: { original_box: 450 }
  }),
  createConsole({
    id: 'gameboy-color',
    brand: 'Nintendo',
    name: 'Game Boy Color',
    model: 'CGB-001',
    baseBuyPrice: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola portátil con pantalla a color de 56 colores simultáneos.',
    accessories: { original_box: 500 },
    editions: [
      { id: 'standard', name: 'Colores Estándar (Atomic Purple, Teal, Berry)', priceDiff: 0 },
      { id: 'pokemon_yellow', name: 'Edición Pokémon Yellow Pikachu/Togepi', priceDiff: 750 }
    ]
  }),
  createConsole({
    id: 'gameboy-advance',
    brand: 'Nintendo',
    name: 'Game Boy Advance',
    model: 'AGB-001 (Horizontal)',
    baseBuyPrice: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Portátil de 32 bits ergonómica horizontal.',
    accessories: { original_box: 450, worm_light: 80 }
  }),
  createConsole({
    id: 'gameboy-advance-sp',
    brand: 'Nintendo',
    name: 'Game Boy Advance SP',
    model: 'AGS-001 / AGS-101',
    baseBuyPrice: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Diseño plegable clamshell con batería recargable y pantalla iluminada.',
    accessories: { original_charger: 120, original_box: 450 },
    editions: [
      { id: 'ags_001', name: 'Frontlight Modelo AGS-001', priceDiff: 0 },
      { id: 'ags_101', name: 'Brighter Backlit Modelo AGS-101 (Muy Cotizado)', priceDiff: 900 },
      { id: 'nes_edition', name: 'Classic NES Edition', priceDiff: 600 }
    ]
  }),
  createConsole({
    id: 'nintendo-ds-original',
    brand: 'Nintendo',
    name: 'Nintendo DS',
    model: 'NTR-001 ("Phat")',
    baseBuyPrice: 650,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Doble pantalla con pantalla táctil inferior y ranura para cartuchos de GBA.',
    accessories: { original_stylus: 50, original_charger: 100, original_box: 200 }
  }),
  createConsole({
    id: 'nintendo-ds-lite',
    brand: 'Nintendo',
    name: 'Nintendo DS Lite',
    model: 'USG-001',
    baseBuyPrice: 750,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Rediseño estilizado con pantallas más brillantes de 4 niveles y batería prolongada.',
    accessories: { original_charger: 100, original_stylus: 50, original_box: 250 }
  }),
  createConsole({
    id: 'nintendo-dsi',
    brand: 'Nintendo',
    name: 'Nintendo DSi',
    model: 'TWL-001 / DSi XL',
    baseBuyPrice: 850,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Cámaras duales integradas y lector de tarjetas SD.',
    accessories: { original_charger: 100, original_box: 250 }
  }),
  createConsole({
    id: 'nintendo-2ds',
    brand: 'Nintendo',
    name: 'Nintendo 2DS',
    model: 'FTR-001 (Formato Cuña)',
    baseBuyPrice: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Diseño robusto no plegable compatible con todos los juegos de 3DS en 2D.',
    accessories: { original_charger: 100, original_box: 250 }
  }),
  createConsole({
    id: 'nintendo-3ds',
    brand: 'Nintendo',
    name: 'Nintendo 3DS',
    model: 'CTR-001 / 3DS XL',
    baseBuyPrice: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Efecto 3D estereoscópico sin necesidad de gafas y giroscopio integrado.',
    accessories: { original_charger: 100, charging_cradle: 80, original_box: 300 }
  }),
  createConsole({
    id: 'new-nintendo-3ds',
    brand: 'Nintendo',
    name: 'New Nintendo 3DS',
    model: 'KTR-001 / New 3DS XL',
    baseBuyPrice: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Procesador mejorado, C-Stick adicional, 3D súper estable y compatibilidad NFC Amiibo.',
    accessories: { original_charger: 100, original_box: 400 },
    editions: [
      { id: 'standard_xl', name: 'New 3DS XL Estándar', priceDiff: 0 },
      { id: 'zelda_majoras', name: "Edición Zelda Majora's Mask Gold", priceDiff: 1200 },
      { id: 'pokemon_sol_luna', name: 'Edición Pokémon Sol y Luna', priceDiff: 700 },
      { id: 'super_famicom', name: 'Super Famicom Edition', priceDiff: 1400 },
      { id: 'pikachu_yellow', name: 'Pikachu Yellow Edition', priceDiff: 1100 }
    ]
  }),

  // ==========================================
  // SONY PLAYSTATION CONSOLES (16 Systems)
  // ==========================================
  createConsole({
    id: 'ps1-original',
    brand: 'PlayStation',
    name: 'PlayStation 1',
    model: 'SCPH-1001 / 5501 (Gris Clásico)',
    baseBuyPrice: 900,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'La primera consola de sobremesa de Sony que redefinió los videojuegos en 3D en 1994.',
    accessories: { extra_controller: 120, memory_card: 80, original_box: 300 }
  }),
  createConsole({
    id: 'ps1-slim',
    brand: 'PlayStation',
    name: 'PlayStation 1 Slim',
    model: 'PSone (SCPH-101)',
    baseBuyPrice: 950,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Versión compacta y estilizada de PS1.',
    accessories: { lcd_screen_attachment: 700, original_box: 300, extra_controller: 120 }
  }),
  createConsole({
    id: 'ps2-original',
    brand: 'PlayStation',
    name: 'PlayStation 2 Original',
    model: 'SCPH-30000 / 50000 (Fat)',
    baseBuyPrice: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'La consola más vendida de la historia con reproductor de DVD y bahía para disco duro.',
    accessories: { extra_controller: 150, memory_card: 100, network_adapter: 200, original_box: 350 }
  }),
  createConsole({
    id: 'ps2-slim',
    brand: 'PlayStation',
    name: 'PlayStation 2 Slim',
    model: 'SCPH-70000 / 90000',
    baseBuyPrice: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Diseño ultradelgado de PS2 con puerto Ethernet integrado.',
    accessories: { extra_controller: 150, memory_card: 100, original_box: 300 }
  }),
  createConsole({
    id: 'ps3-original',
    brand: 'PlayStation',
    name: 'PlayStation 3',
    model: 'CECHA01 / CECHE01 (Fat Retrocompatible)',
    baseBuyPrice: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Consola PS3 con lector Blu-ray y retrocompatibilidad con PS2 (4 puertos USB).',
    accessories: { extra_controller: 200, original_box: 350 },
    editions: [
      { id: 'retrocompatible_ps2', name: 'Fat con 4 USB (Retrocompatible PS2 Hardware)', priceDiff: 1000 },
      { id: 'fat_standard', name: 'Fat Estándar 2 USB (40GB/80GB)', priceDiff: 0 }
    ]
  }),
  createConsole({
    id: 'ps3-slim',
    brand: 'PlayStation',
    name: 'PlayStation 3 Slim',
    model: 'CECH-2000 / 2500 / 3000',
    baseBuyPrice: 1400,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Modelo Slim de PS3 eficiente y silencioso.',
    accessories: { extra_controller: 200, original_box: 250 }
  }),
  createConsole({
    id: 'ps3-super-slim',
    brand: 'PlayStation',
    name: 'PlayStation 3 Super Slim',
    model: 'CECH-4000 (Tapa Deslizable)',
    baseBuyPrice: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Último rediseño de PS3 ultraligero con tapa superior deslizante.',
    accessories: { extra_controller: 200, original_box: 250 }
  }),
  createConsole({
    id: 'ps4-original',
    brand: 'PlayStation',
    name: 'PlayStation 4',
    model: 'CUH-1000 / 1100 / 1200 (Fat)',
    baseBuyPrice: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=600&q=80',
    description: 'Consola PS4 Fat de 500GB con arquitectura x86.',
    accessories: { extra_controller: 350, original_box: 200 }
  }),
  createConsole({
    id: 'ps4-slim',
    brand: 'PlayStation',
    name: 'PlayStation 4 Slim',
    model: 'CUH-2000 / 2200 (500GB/1TB)',
    baseBuyPrice: 2600,
    imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=600&q=80',
    description: 'Consola PS4 delgada de menor consumo energético y HDR.',
    accessories: { extra_controller: 350, original_box: 200 }
  }),
  createConsole({
    id: 'ps4-pro',
    brand: 'PlayStation',
    name: 'PlayStation 4 Pro',
    model: 'CUH-7000 / 7200 4K 1TB',
    baseBuyPrice: 3300,
    imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=600&q=80',
    description: 'Consola con doble potencia gráfica para juegos en resolución 4K y modo rendimiento.',
    accessories: { extra_controller: 350, original_box: 250 }
  }),
  createConsole({
    id: 'ps5-original',
    brand: 'PlayStation',
    name: 'PlayStation 5',
    model: 'CFI-1000 / 1100 / 1200 (Standard Con Lector)',
    baseBuyPrice: 6500,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Consola PlayStation 5 con lector de discos Blu-ray Ultra HD y SSD ultrarrápido.',
    accessories: { extra_controller: 600, original_box: 300, charging_station: 250 }
  }),
  createConsole({
    id: 'ps5-digital',
    brand: 'PlayStation',
    name: 'PlayStation 5 Digital',
    model: 'CFI-1000B / 1100B / 1200B Digital',
    baseBuyPrice: 5600,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola PS5 edición digital sin unidad de disco óptico.',
    accessories: { extra_controller: 600, original_box: 300 }
  }),
  createConsole({
    id: 'ps5-slim',
    brand: 'PlayStation',
    name: 'PlayStation 5 Slim',
    model: 'CFI-2000 (Chasis Reducido 1TB)',
    baseBuyPrice: 6800,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Nuevo modelo estilizado con 1TB de almacenamiento interno.',
    accessories: { extra_controller: 600, original_box: 300 }
  }),
  createConsole({
    id: 'ps5-pro',
    brand: 'PlayStation',
    name: 'PlayStation 5 Pro',
    model: 'CFI-7000 2TB High-End',
    baseBuyPrice: 11000,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'La consola más potente de Sony con PSSR AI Upscaling y trazado de rayos avanzado.',
    accessories: { extra_controller: 700, disc_drive_attachment: 900, original_box: 500 }
  }),
  createConsole({
    id: 'psp-original',
    brand: 'PlayStation',
    name: 'PlayStation Portable (PSP)',
    model: 'PSP 1000 / 2000 / 3000 / Go',
    baseBuyPrice: 950,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'La primera consola portátil de Sony con discos ópticos UMD y pantalla panorámica 16:9.',
    accessories: { memory_stick: 100, original_charger: 100, original_box: 300 },
    editions: [
      { id: 'psp_1000_3000', name: 'PSP Modelo Estándar (1000/2000/3000)', priceDiff: 0 },
      { id: 'psp_go', name: 'PSP Go (Deslizable)', priceDiff: 400 },
      { id: 'god_of_war', name: 'God of War Red Edition', priceDiff: 500 }
    ]
  }),
  createConsole({
    id: 'ps-vita',
    brand: 'PlayStation',
    name: 'PlayStation Vita',
    model: 'PCH-1000 (OLED) / PCH-2000 (Slim)',
    baseBuyPrice: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Portátil de alta gama con pantalla táctil OLED de 5 pulgadas y touchpad trasero.',
    accessories: { vita_memory_card_16gb: 250, vita_memory_card_32gb: 450, original_charger: 120, original_box: 400 },
    editions: [
      { id: 'oled_1000', name: 'Modelo OLED Original PCH-1000', priceDiff: 150 },
      { id: 'slim_2000', name: 'Modelo Slim PCH-2000', priceDiff: 0 }
    ]
  }),

  // ==========================================
  // MICROSOFT XBOX CONSOLES (9 Systems)
  // ==========================================
  createConsole({
    id: 'xbox-original',
    brand: 'Xbox',
    name: 'Original Xbox',
    model: 'Xbox Clásica (2001)',
    baseBuyPrice: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
    description: 'La primera incursión de Microsoft con disco duro integrado y puerto Ethernet de serie.',
    accessories: { duke_controller: 200, controller_s: 150, original_box: 400 }
  }),
  createConsole({
    id: 'xbox-360-original',
    brand: 'Xbox',
    name: 'Xbox 360',
    model: 'Xbox 360 Fat (Pro / Elite / Arcade)',
    baseBuyPrice: 950,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
    description: 'Segunda generación de Xbox con resolución en alta definición y Xbox Live.',
    accessories: { extra_controller: 150, hard_drive_hdd: 150, original_box: 250 }
  }),
  createConsole({
    id: 'xbox-360-slim',
    brand: 'Xbox',
    name: 'Xbox 360 Slim',
    model: 'Model 1439 (Sleek Black)',
    baseBuyPrice: 1250,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
    description: 'Diseño silencioso con Wi-Fi integrado y protección térmica avanzada.',
    accessories: { extra_controller: 180, original_box: 250, kinect_sensor: 120 }
  }),
  createConsole({
    id: 'xbox-360-e',
    brand: 'Xbox',
    name: 'Xbox 360 E',
    model: 'Model 1538 (Estilo Xbox One)',
    baseBuyPrice: 1350,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
    description: 'El último rediseño de Xbox 360 ultra-compacto inspirado en Xbox One.',
    accessories: { extra_controller: 180, original_box: 250 }
  }),
  createConsole({
    id: 'xbox-one-original',
    brand: 'Xbox',
    name: 'Xbox One',
    model: 'Model 1540 (Fat 500GB/1TB)',
    baseBuyPrice: 1700,
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola con lector Blu-ray y capacidades multimedia HDMI Pass-Through.',
    accessories: { extra_controller: 300, original_box: 200 }
  }),
  createConsole({
    id: 'xbox-one-s',
    brand: 'Xbox',
    name: 'Xbox One S',
    model: 'Model 1681 (4K Ultra HD Blu-ray)',
    baseBuyPrice: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola blanca compacta 40% más pequeña con fuente de alimentación interna y HDR.',
    accessories: { extra_controller: 350, original_box: 200 }
  }),
  createConsole({
    id: 'xbox-one-x',
    brand: 'Xbox',
    name: 'Xbox One X',
    model: 'Model 1787 (4K Nativo 6 Teraflops)',
    baseBuyPrice: 2900,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
    description: 'La consola de generación anterior más potente, con juegos en 4K nativo.',
    accessories: { extra_controller: 400, original_box: 250 }
  }),
  createConsole({
    id: 'xbox-series-s',
    brand: 'Xbox',
    name: 'Xbox Series S',
    model: 'Model 1883 512GB / 1TB',
    baseBuyPrice: 3400,
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
    description: 'Nueva generación en formato digital compacto hasta 120 FPS y arquitectura Xbox Velocity.',
    accessories: { extra_controller: 500, original_box: 250 }
  }),
  createConsole({
    id: 'xbox-series-x',
    brand: 'Xbox',
    name: 'Xbox Series X',
    model: 'Model 1882 1TB 4K Gaming',
    baseBuyPrice: 6200,
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=600&q=80',
    description: 'La cúspide de Microsoft con 12 Teraflops de potencia, lector de discos y 1TB SSD.',
    accessories: { extra_controller: 550, original_box: 350 }
  }),

  // ==========================================
  // SEGA CONSOLES (7 Systems)
  // ==========================================
  createConsole({
    id: 'sega-master-system',
    brand: 'Sega',
    name: 'Sega Master System',
    model: 'Master System I / II',
    baseBuyPrice: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola retro de 8 bits de Sega con ranura de cartuchos y tarjetas Sega Card.',
    accessories: { extra_controller: 200, original_box: 600, light_phaser: 300 }
  }),
  createConsole({
    id: 'sega-genesis',
    brand: 'Sega',
    name: 'Sega Genesis',
    model: 'Genesis Model 1 / Model 2 / Model 3',
    baseBuyPrice: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola de 16 bits de Sega con el procesador Motorola 68000 y sonido estéreo.',
    accessories: { extra_controller_6button: 150, original_box: 450 }
  }),
  createConsole({
    id: 'sega-cd',
    brand: 'Sega',
    name: 'Sega CD',
    model: 'Sega CD Model 1 (Tray) / Model 2',
    baseBuyPrice: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Expansión de CD-ROM para Genesis con audio con calidad de CD y video full-motion.',
    accessories: { original_box: 800, original_power_supply: 250 }
  }),
  createConsole({
    id: 'sega-32x',
    brand: 'Sega',
    name: 'Sega 32X',
    model: 'Super 32X (MK-84000)',
    baseBuyPrice: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Periférico en forma de hongo con dos procesadores Hitachi SH-2 de 32 bits.',
    accessories: { patch_cable: 200, original_box: 700 }
  }),
  createConsole({
    id: 'sega-saturn',
    brand: 'Sega',
    name: 'Sega Saturn',
    model: 'MK-80000 (Model 1 / 2)',
    baseBuyPrice: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Potente consola 2D y 3D con procesadores duales SH-2 y lector CD-ROM.',
    accessories: { extra_controller: 250, backup_memory_cartridge: 300, original_box: 750 },
    editions: [
      { id: 'standard_black', name: 'Negro Estándar Americano', priceDiff: 0 },
      { id: 'white_japanese', name: 'Blanco Japonés Shiro', priceDiff: 500 }
    ]
  }),
  createConsole({
    id: 'sega-dreamcast',
    brand: 'Sega',
    name: 'Sega Dreamcast',
    model: 'HKT-3020 (GD-ROM)',
    baseBuyPrice: 1900,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'La pionera consola con módem para juego en línea de fábrica y memoria VMU con pantalla.',
    accessories: { vmu_memory_screen: 200, extra_controller: 200, vga_box: 350, original_box: 600 }
  }),
  createConsole({
    id: 'sega-game-gear',
    brand: 'Sega',
    name: 'Sega Game Gear',
    model: 'MK-2110 (Pantalla a Color Iluminada)',
    baseBuyPrice: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Portátil de 8 bits a color con pantalla retroiluminada de Sega.',
    accessories: { tv_tuner: 300, original_box: 600, car_adapter: 100 }
  }),

  // ==========================================
  // ATARI & VINTAGE RETRO SYSTEMS
  // ==========================================
  createConsole({
    id: 'atari-2600',
    brand: 'Atari',
    name: 'Atari 2600',
    model: 'VCS (Woodgrain 4/6 Switches o Black Vader)',
    baseBuyPrice: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'El clásico atemporal de 1977 con acabado frontal de madera o modelo Vader.',
    accessories: { joystick_controller: 150, paddle_controllers: 200, original_box: 500 },
    editions: [
      { id: 'heavy_sixer', name: 'Heavy Sixer 1977 (Sunnyvale)', priceDiff: 900 },
      { id: 'four_switch', name: '4-Switch Woodgrain', priceDiff: 0 },
      { id: 'vader', name: 'All-Black Vader', priceDiff: 100 }
    ]
  }),
  createConsole({
    id: 'atari-7800',
    brand: 'Atari',
    name: 'Atari 7800 ProSystem',
    model: 'Retrocompatible con Atari 2600',
    baseBuyPrice: 1600,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola avanzada retrocompatible de fábrica con toda la biblioteca de Atari 2600.',
    accessories: { proline_controller: 200, original_box: 600 }
  }),
  createConsole({
    id: 'atari-lynx',
    brand: 'Atari',
    name: 'Atari Lynx',
    model: 'Lynx I / Lynx II',
    baseBuyPrice: 1900,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'La primera consola portátil del mundo con pantalla LCD a color y aceleración 3D por hardware.',
    accessories: { carrying_case: 200, original_box: 700 }
  }),
  createConsole({
    id: 'neo-geo-aes',
    brand: 'Vintage',
    name: 'Neo Geo AES',
    model: 'Advanced Entertainment System',
    baseBuyPrice: 9500,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'La "Rolls-Royce" de las consolas de videojuegos. Hardware idéntico a las máquinas arcade MVS.',
    accessories: { arcade_stick: 1200, original_box: 2500 }
  }),
  createConsole({
    id: '3do-interactive',
    brand: 'Vintage',
    name: '3DO Interactive Multiplayer',
    model: 'Panasonic FZ-1 / FZ-10',
    baseBuyPrice: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Consola pionera de 32 bits de Panasonic y The 3DO Company.',
    accessories: { controller: 300, original_box: 800 }
  }),
  createConsole({
    id: 'turbografx-16',
    brand: 'Vintage',
    name: 'TurboGrafx-16 / PC Engine',
    model: 'NEC TurboGrafx-16 (HuCard)',
    baseBuyPrice: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Elegante y codiciada consola con juegos en formato de tarjeta ultrafina HuCard.',
    accessories: { turbopad: 350, turbo_booster: 500, original_box: 1000 }
  }),

  // ==========================================
  // VIDEO GAMES (Flagships for Buyback)
  // ==========================================
  {
    id: 'prod-game-zelda-totk',
    sku: 'GAM-NSW-ZELDA-TOTK',
    category: 'video_games',
    categoryName: 'Videojuegos',
    brand: 'Nintendo',
    name: 'The Legend of Zelda: Tears of the Kingdom',
    model: 'Nintendo Switch Cartridge',
    platform: 'Nintendo Switch',
    baseBuyPrice: 750,
    description: 'Aventura épica en las tierras y los cielos de Hyrule.',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    active: true,
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.85,
      has_functional_problems: 0.60,
      does_not_work: 0.35,
      for_parts_only: 0.20
    },
    accessoryPricing: { original_box: 100, original_manuals: 50 }
  },
  {
    id: 'prod-game-pokemon-hgss',
    sku: 'GAM-NDS-POKEMON-HG',
    category: 'video_games',
    categoryName: 'Videojuegos',
    brand: 'Nintendo',
    name: 'Pokémon HeartGold / SoulSilver (CIB con Pokewalker)',
    model: 'Nintendo DS',
    platform: 'Nintendo DS',
    baseBuyPrice: 2200,
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    description: 'Una de las joyas más codiciadas de Pokémon en Nintendo DS.',
    active: true,
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.85,
      has_functional_problems: 0.60,
      does_not_work: 0.35,
      for_parts_only: 0.20
    },
    accessoryPricing: { pokewalker: 600, big_outer_box: 500 }
  },
  {
    id: 'prod-game-silent-hill-2',
    sku: 'GAM-PS2-SH2',
    category: 'video_games',
    categoryName: 'Videojuegos',
    brand: 'Konami',
    name: 'Silent Hill 2 (Black Label)',
    model: 'PlayStation 2 DVD',
    platform: 'PlayStation 2',
    baseBuyPrice: 1700,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    description: 'Clásico del survival horror psicológico de Team Silent.',
    active: true,
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.85,
      has_functional_problems: 0.60,
      does_not_work: 0.35,
      for_parts_only: 0.20
    },
    accessoryPricing: { original_box: 250, original_manuals: 200 }
  },

  // ==========================================
  // RETRO CRT TELEVISIONS
  // ==========================================
  {
    id: 'prod-tv-sony-trinitron-27',
    sku: 'CRT-SONY-KV27FV310',
    category: 'retro_tvs',
    categoryName: 'TVs CRT',
    brand: 'Sony Trinitron',
    name: 'Sony Trinitron WEGA 27" Flat CRT (KV-27FV310)',
    model: 'KV-27FV310 / NTSC Componentes',
    platform: 'Retro Display',
    baseBuyPrice: 3500,
    description: 'El "Santo Grial" de los televisores CRT para retrogaming en México. Tubo plano FD Trinitron con subwoofer integrado.',
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCRT: true,
    dimensions: '76 x 58 x 52 cm',
    weightKg: 46,
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.85,
      has_functional_problems: 0.60,
      does_not_work: 0.30,
      for_parts_only: 0.15
    },
    accessoryPricing: {
      original_remote: 350,
      stand_furniture: 500,
      component_cable_test: 200
    }
  },
  {
    id: 'prod-tv-sony-pvm-14',
    sku: 'CRT-SONY-PVM14M4U',
    category: 'retro_tvs',
    categoryName: 'TVs CRT',
    brand: 'Sony PVM',
    name: 'Sony PVM-14M4U 14" RGB Broadcast Monitor (800 TVL)',
    model: 'PVM-14M4U High Resolution RGB',
    platform: 'Broadcast Monitor',
    baseBuyPrice: 7800,
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCRT: true,
    dimensions: '39 x 34 x 42 cm',
    weightKg: 18,
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.85,
      has_functional_problems: 0.60,
      does_not_work: 0.35,
      for_parts_only: 0.20
    },
    accessoryPricing: {
      bnc_terminators: 250,
      rgb_scart_cable: 400
    }
  },
  {
    id: 'prod-tv-jvc-dseries',
    sku: 'CRT-JVC-AV27D302',
    category: 'retro_tvs',
    categoryName: 'TVs CRT',
    brand: 'JVC',
    name: 'JVC D-Series 27" Curved CRT Television',
    model: 'AV-27D302 Component Video',
    platform: 'Retro Display',
    baseBuyPrice: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
    active: true,
    isCRT: true,
    dimensions: '72 x 56 x 49 cm',
    weightKg: 38,
    conditionMultipliers: {
      works_perfect: 1.0,
      works_cosmetic_damage: 0.85,
      has_functional_problems: 0.60,
      does_not_work: 0.30,
      for_parts_only: 0.15
    },
    accessoryPricing: {
      original_remote: 250
    }
  }
];

// Seed demo requests
const seedSellRequests = [
  {
    id: 'REQ-2026-8801',
    customer: {
      fullName: 'Roberto Garcia Perez',
      email: 'roberto.garcia@example.com',
      phone: '+52 55 1234 5678',
      whatsapp: '+52 55 1234 5678',
      city: 'Ciudad de México',
      state: 'Ciudad de México (CDMX)',
      postalCode: '03100',
      shippingOrigin: 'Benito Juárez, CDMX'
    },
    items: [
      {
        itemId: 'item-1',
        productId: 'n64-original',
        productName: 'Nintendo 64',
        edition: 'Funtastic Jungle Green',
        category: 'consoles',
        condition: 'works_perfect',
        conditionLabel: 'Funciona perfectamente',
        accessories: {
          extra_controller: true,
          expansion_pak: true,
          original_box: true
        },
        calculatedEstimate: 1950,
        customerNotes: 'N64 Jungle Green con expansion pak instalado y control extra.'
      }
    ],
    totalEstimatedAmount: 1950,
    currency: 'MXN',
    status: 'SUBMITTED',
    statusLabel: 'En Revisión Preliminar',
    customerNotes: 'Disponible para entrega o recolección.',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
        label: 'Consola y accesorios'
      }
    ],
    termsAccepted: true,
    termsAcceptedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: { amount: 1950, preparedBy: 'Sofia Reyes', sentAt: null },
    shippingApproval: { approved: false },
    inspection: null,
    revisedOffer: null,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Roberto Garcia)',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        notes: 'Solicitud creada con cotización de Nintendo 64 Jungle Green.'
      }
    ]
  }
];

module.exports = {
  seedUsers,
  seedProducts,
  seedSellRequests
};
