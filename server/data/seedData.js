const bcrypt = require('bcryptjs');

const seedUsers = [
  {
    id: 'usr-admin-1',
    name: 'Carlos Mendoza (Owner/Admin)',
    email: 'admin@liongamestv.mx',
    passwordHash: bcrypt.hashSync('Admin123!', 10),
    role: 'admin',
    department: 'Management',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-purchasing-1',
    name: 'Sofia Reyes (Purchasing Lead)',
    email: 'purchasing@liongamestv.mx',
    passwordHash: bcrypt.hashSync('Purchasing123!', 10),
    role: 'purchasing',
    department: 'Purchasing & Valuations',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-inspection-1',
    name: 'Mateo Hernandez (Hardware QA & Receiving)',
    email: 'inspection@liongamestv.mx',
    passwordHash: bcrypt.hashSync('Inspection123!', 10),
    role: 'inspection',
    department: 'Receiving & Inspection',
    createdAt: new Date().toISOString()
  },
  {
    id: 'usr-support-1',
    name: 'Valeria Cruz (Customer Service)',
    email: 'support@liongamestv.mx',
    passwordHash: bcrypt.hashSync('Support123!', 10),
    role: 'customer_service',
    department: 'Customer Support',
    createdAt: new Date().toISOString()
  }
];

const seedProducts = [
  // --- GAMING CONSOLES ---
  {
    id: 'prod-ps5-disc',
    sku: 'CON-SONY-PS5-DISC',
    category: 'consoles',
    categoryName: 'Gaming Consoles',
    brand: 'Sony',
    name: 'PlayStation 5 (Standard Disc Edition)',
    model: 'CFI-1215A / 825GB',
    platform: 'PS5',
    baseBuyPrice: 6500, // in MXN
    description: 'Consola Sony PlayStation 5 con lector de discos Ultra HD Blu-ray, almacenamiento de 825GB SSD.',
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.70,
      damaged: 0.40,
      untested: 0.20
    },
    accessoryAdjustments: {
      extraController: 550,
      originalBox: 300,
      missingPowerCable: -150,
      missingHdmi: -80,
      missingController: -600
    }
  },
  {
    id: 'prod-ps5-digital',
    sku: 'CON-SONY-PS5-DIG',
    category: 'consoles',
    categoryName: 'Gaming Consoles',
    brand: 'Sony',
    name: 'PlayStation 5 Digital Edition',
    model: 'CFI-1215B / 825GB',
    platform: 'PS5',
    baseBuyPrice: 5500,
    description: 'Consola PlayStation 5 edición 100% digital sin lector óptico.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.70,
      damaged: 0.40,
      untested: 0.20
    },
    accessoryAdjustments: {
      extraController: 550,
      originalBox: 300,
      missingPowerCable: -150,
      missingHdmi: -80,
      missingController: -600
    }
  },
  {
    id: 'prod-xbox-series-x',
    sku: 'CON-MS-XSX-1TB',
    category: 'consoles',
    categoryName: 'Gaming Consoles',
    brand: 'Microsoft',
    name: 'Xbox Series X 1TB',
    model: 'Model 1882 / 1TB SSD',
    platform: 'Xbox Series',
    baseBuyPrice: 6200,
    description: 'Consola Xbox Series X de Microsoft con lector 4K Blu-ray y 1TB SSD interno.',
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.70,
      damaged: 0.40,
      untested: 0.20
    },
    accessoryAdjustments: {
      extraController: 500,
      originalBox: 250,
      missingPowerCable: -120,
      missingHdmi: -80,
      missingController: -550
    }
  },
  {
    id: 'prod-xbox-series-s',
    sku: 'CON-MS-XSS-512',
    category: 'consoles',
    categoryName: 'Gaming Consoles',
    brand: 'Microsoft',
    name: 'Xbox Series S 512GB Blanco',
    model: 'Model 1883 / 512GB SSD',
    platform: 'Xbox Series',
    baseBuyPrice: 3400,
    description: 'Consola Xbox Series S compacta para gaming digital hasta 1440p a 120 FPS.',
    imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.70,
      damaged: 0.40,
      untested: 0.20
    },
    accessoryAdjustments: {
      extraController: 500,
      originalBox: 200,
      missingPowerCable: -120,
      missingHdmi: -80,
      missingController: -500
    }
  },
  {
    id: 'prod-switch-oled',
    sku: 'CON-NINT-SW-OLED',
    category: 'consoles',
    categoryName: 'Gaming Consoles',
    brand: 'Nintendo',
    name: 'Nintendo Switch Modelo OLED 64GB',
    model: 'HEG-001 White / Neon',
    platform: 'Nintendo Switch',
    baseBuyPrice: 4200,
    description: 'Nintendo Switch con pantalla OLED de 7 pulgadas y soporte ancho ajustable.',
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-8be9f1505e60?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.70,
      damaged: 0.40,
      untested: 0.20
    },
    accessoryAdjustments: {
      extraJoyCons: 450,
      originalBox: 250,
      missingDock: -450,
      missingCharger: -200,
      missingJoyCons: -650
    }
  },
  {
    id: 'prod-ps4-pro',
    sku: 'CON-SONY-PS4-PRO',
    category: 'consoles',
    categoryName: 'Gaming Consoles',
    brand: 'Sony',
    name: 'PlayStation 4 Pro 1TB',
    model: 'CUH-7215B / 1TB',
    platform: 'PS4',
    baseBuyPrice: 3200,
    description: 'Consola PS4 Pro con soporte para resolución 4K dinámica y HDR.',
    imageUrl: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.70,
      damaged: 0.35,
      untested: 0.20
    },
    accessoryAdjustments: {
      extraController: 350,
      originalBox: 200,
      missingPowerCable: -100,
      missingHdmi: -80,
      missingController: -400
    }
  },
  {
    id: 'prod-n64-console',
    sku: 'CON-RET-N64-BLK',
    category: 'consoles',
    categoryName: 'Gaming Consoles',
    brand: 'Nintendo',
    name: 'Nintendo 64 Charcoal Black',
    model: 'NUS-001 (NTSC-U)',
    platform: 'Retro Consoles',
    baseBuyPrice: 1800,
    description: 'Consola retro clásica Nintendo 64 original para entusiastas.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.2, // Retro collectors pay a premium for mint condition!
      good: 1.0,
      fair: 0.75,
      damaged: 0.40,
      untested: 0.25
    },
    accessoryAdjustments: {
      expansionPak: 600,
      extraController: 350,
      originalBox: 800,
      missingPowerSupply: -250,
      missingAvCable: -100
    }
  },

  // --- VIDEO GAMES ---
  {
    id: 'prod-game-zelda-totk',
    sku: 'GAM-NSW-ZELDA-TOTK',
    category: 'video_games',
    categoryName: 'Video Games',
    brand: 'Nintendo',
    name: 'The Legend of Zelda: Tears of the Kingdom',
    model: 'Nintendo Switch Cartridge',
    platform: 'Nintendo Switch',
    baseBuyPrice: 750,
    description: 'Aventura épica en las tierras y los cielos de Hyrule.',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      sealed: 1.30,
      cib: 1.0, // Complete in box
      box_game: 0.90,
      game_only: 0.75,
      scratched: 0.50
    },
    accessoryAdjustments: {
      hasManual: 50,
      hasCase: 100
    }
  },
  {
    id: 'prod-game-spiderman-2',
    sku: 'GAM-PS5-SM2',
    category: 'video_games',
    categoryName: 'Video Games',
    brand: 'Sony Interactive',
    name: "Marvel's Spider-Man 2",
    model: 'PS5 Blu-ray Disc',
    platform: 'PS5',
    baseBuyPrice: 700,
    description: 'Juega como Peter Parker y Miles Morales contra Venom.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      sealed: 1.25,
      cib: 1.0,
      box_game: 0.90,
      game_only: 0.70,
      scratched: 0.45
    },
    accessoryAdjustments: {
      hasCase: 100
    }
  },
  {
    id: 'prod-game-smash-ultimate',
    sku: 'GAM-NSW-SSBU',
    category: 'video_games',
    categoryName: 'Video Games',
    brand: 'Nintendo',
    name: 'Super Smash Bros. Ultimate',
    model: 'Nintendo Switch Cartridge',
    platform: 'Nintendo Switch',
    baseBuyPrice: 650,
    description: 'El mayor crossover de lucha en Nintendo Switch.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      sealed: 1.25,
      cib: 1.0,
      box_game: 0.90,
      game_only: 0.70,
      scratched: 0.40
    },
    accessoryAdjustments: {
      hasCase: 100
    }
  },
  {
    id: 'prod-game-gow-ragnarok',
    sku: 'GAM-PS5-GOWR',
    category: 'video_games',
    categoryName: 'Video Games',
    brand: 'Sony Interactive',
    name: 'God of War Ragnarök',
    model: 'PS5 Blu-ray Disc',
    platform: 'PS5',
    baseBuyPrice: 650,
    description: 'Viaje nórdico épico con Kratos y Atreus.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      sealed: 1.25,
      cib: 1.0,
      box_game: 0.90,
      game_only: 0.70,
      scratched: 0.45
    },
    accessoryAdjustments: {
      hasCase: 100
    }
  },
  {
    id: 'prod-game-silent-hill-2-ps2',
    sku: 'GAM-RET-SH2-PS2',
    category: 'video_games',
    categoryName: 'Video Games',
    brand: 'Konami',
    name: 'Silent Hill 2 (Black Label)',
    model: 'PlayStation 2 DVD-ROM',
    platform: 'PS2 Retro',
    baseBuyPrice: 1600,
    description: 'Obra maestra del survival horror retro. Muy cotizada por coleccionistas.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      sealed: 2.2,
      cib: 1.0,
      box_game: 0.80,
      game_only: 0.55,
      scratched: 0.35
    },
    accessoryAdjustments: {
      hasManual: 250,
      hasCase: 200
    }
  },

  // --- CONTROLLERS & ACCESSORIES ---
  {
    id: 'prod-acc-dualsense',
    sku: 'ACC-SONY-DS-WHT',
    category: 'accessories',
    categoryName: 'Controllers & Accessories',
    brand: 'Sony',
    name: 'Control Inalámbrico DualSense Blanco (PS5)',
    model: 'CFI-ZCT1W',
    platform: 'PS5',
    baseBuyPrice: 600,
    description: 'Control oficial con respuesta háptica y gatillos adaptativos.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.65,
      damaged: 0.30, // Stick drift etc.
      untested: 0.15
    },
    accessoryAdjustments: {
      originalBox: 100,
      usbCable: 50
    }
  },
  {
    id: 'prod-acc-xbox-controller',
    sku: 'ACC-MS-XBCON-BLK',
    category: 'accessories',
    categoryName: 'Controllers & Accessories',
    brand: 'Microsoft',
    name: 'Control Inalámbrico Xbox Robot White / Carbon Black',
    model: 'Model 1914',
    platform: 'Xbox Series / One',
    baseBuyPrice: 550,
    description: 'Control oficial para Xbox Series X|S, Xbox One y PC Bluetooth.',
    imageUrl: 'https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.65,
      damaged: 0.30,
      untested: 0.15
    },
    accessoryAdjustments: {
      originalBox: 80
    }
  },
  {
    id: 'prod-acc-switch-pro',
    sku: 'ACC-NINT-SWPRO',
    category: 'accessories',
    categoryName: 'Controllers & Accessories',
    brand: 'Nintendo',
    name: 'Nintendo Switch Pro Controller',
    model: 'HAC-013',
    platform: 'Nintendo Switch',
    baseBuyPrice: 600,
    description: 'Control tradicional ergonómico de alta precisión con vibración HD.',
    imageUrl: 'https://images.unsplash.com/photo-1578303512597-8be9f1505e60?auto=format&fit=crop&w=800&q=80',
    active: true,
    conditionMultipliers: {
      like_new: 1.0,
      good: 0.85,
      fair: 0.65,
      damaged: 0.30,
      untested: 0.15
    },
    accessoryAdjustments: {
      originalBox: 90,
      chargingCable: 40
    }
  },

  // --- RETRO CRT TELEVISIONS ---
  {
    id: 'prod-tv-sony-trinitron-27',
    sku: 'CRT-SONY-KV27FV310',
    category: 'retro_tvs',
    categoryName: 'Retro CRT TVs',
    brand: 'Sony Trinitron',
    name: 'Sony Trinitron WEGA 27" Flat CRT (KV-27FV310)',
    model: 'KV-27FV310 / NTSC',
    platform: 'Retro Display',
    baseBuyPrice: 3500,
    description: 'El "Santo Grial" de los televisores CRT de consumo para retrogaming en México. Equipado con circuito de alto voltaje separado y entrada por componentes.',
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
    active: true,
    isCRT: true,
    dimensions: '76 x 58 x 52 cm',
    weightKg: 46,
    conditionMultipliers: {
      like_new: 1.25,
      good: 1.0,
      fair: 0.75,
      damaged: 0.30,
      untested: 0.20
    },
    accessoryAdjustments: {
      originalRemote: 350,
      componentInputVerified: 400,
      screenBurnFree: 300,
      scratchedGlass: -500
    }
  },
  {
    id: 'prod-tv-jvc-dseries',
    sku: 'CRT-JVC-AV27D302',
    category: 'retro_tvs',
    categoryName: 'Retro CRT TVs',
    brand: 'JVC',
    name: 'JVC D-Series 27" Curved CRT Television',
    model: 'AV-27D302',
    platform: 'Retro Display',
    baseBuyPrice: 2200,
    description: 'Aclamado tubo curvo con excelentes líneas de escaneo (scanlines) y entradas de video por componentes YPbPr.',
    imageUrl: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
    active: true,
    isCRT: true,
    dimensions: '72 x 56 x 49 cm',
    weightKg: 38,
    conditionMultipliers: {
      like_new: 1.20,
      good: 1.0,
      fair: 0.70,
      damaged: 0.30,
      untested: 0.20
    },
    accessoryAdjustments: {
      originalRemote: 250,
      screenBurnFree: 250
    }
  },
  {
    id: 'prod-tv-sony-pvm-14',
    sku: 'CRT-SONY-PVM14M4U',
    category: 'retro_tvs',
    categoryName: 'Retro CRT TVs',
    brand: 'Sony PVM',
    name: 'Sony Trinitron PVM-14M4U 14" RGB Broadcast Monitor (800 TVL)',
    model: 'PVM-14M4U High Resolution HR Trinitron',
    platform: 'Broadcast CRT',
    baseBuyPrice: 7500,
    description: 'Monitor profesional de transmisión con entradas BNC RGB / Component y 800 líneas de resolución horizontal.',
    imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80',
    active: true,
    isCRT: true,
    dimensions: '39 x 34 x 42 cm',
    weightKg: 18,
    conditionMultipliers: {
      like_new: 1.30,
      good: 1.0,
      fair: 0.75,
      damaged: 0.35,
      untested: 0.20
    },
    accessoryAdjustments: {
      bncTerminators: 200,
      screenBurnFree: 600
    }
  }
];

// Demo requests so admin & inspection workflows can be immediately tested and verified!
const seedSellRequests = [
  {
    id: 'REQ-2026-8801',
    customer: {
      fullName: 'Roberto Garcia Perez',
      email: 'roberto.garcia@example.com',
      phone: '+52 55 1234 5678',
      whatsapp: '+52 55 1234 5678',
      city: 'Ciudad de México',
      state: 'CDMX',
      postalCode: '03100',
      shippingOrigin: 'Benito Juárez, CDMX'
    },
    items: [
      {
        itemId: 'item-1',
        productId: 'prod-ps5-disc',
        productName: 'PlayStation 5 (Standard Disc Edition)',
        category: 'consoles',
        condition: 'good',
        conditionLabel: 'Buen Estado (Uso normal)',
        accessories: {
          extraController: true,
          originalBox: true,
          missingPowerCable: false,
          missingHdmi: false,
          missingController: false
        },
        calculatedEstimate: 6375,
        customerNotes: 'La consola funciona al 100%, incluye caja original y un control negro adicional.'
      }
    ],
    totalEstimatedAmount: 6375,
    currency: 'MXN',
    status: 'SUBMITTED',
    statusLabel: 'En Revisión Preliminar',
    customerNotes: 'Disponible para envío de lunes a viernes.',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
        label: 'Consola y caja frontal'
      },
      {
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
        label: 'Etiqueta serial CFI-1215A'
      }
    ],
    termsAccepted: true,
    termsAcceptedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: {
      amount: 6375,
      preparedBy: 'Sofia Reyes',
      sentAt: null
    },
    shippingApproval: {
      approved: false,
      approvedBy: null,
      approvedAt: null,
      carrier: null,
      trackingNumber: null,
      instructions: null
    },
    inspection: null,
    revisedOffer: null,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Roberto Garcia)',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        notes: 'Solicitud enviada a través del portal de venta.'
      }
    ]
  },
  {
    id: 'REQ-2026-8802',
    customer: {
      fullName: 'Alejandra Morales V.',
      email: 'alejandra.morales@example.com',
      phone: '+52 33 9876 5432',
      whatsapp: '+52 33 9876 5432',
      city: 'Guadalajara',
      state: 'Jalisco',
      postalCode: '44100',
      shippingOrigin: 'Centro, Guadalajara, JAL'
    },
    items: [
      {
        itemId: 'item-2',
        productId: 'prod-switch-oled',
        productName: 'Nintendo Switch Modelo OLED 64GB',
        category: 'consoles',
        condition: 'like_new',
        conditionLabel: 'Como Nuevo (Sin marcas)',
        accessories: {
          extraJoyCons: false,
          originalBox: true,
          missingDock: false,
          missingCharger: false,
          missingJoyCons: false
        },
        calculatedEstimate: 4450,
        customerNotes: 'Prácticamente sin uso, con mica de cristal templado instalada.'
      }
    ],
    totalEstimatedAmount: 4450,
    currency: 'MXN',
    status: 'SHIPPING_APPROVED',
    statusLabel: 'Envío Aprobado (Guía Emitida)',
    customerNotes: 'Tengo empaque protector listo.',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1578303512597-8be9f1505e60?auto=format&fit=crop&w=600&q=80',
        label: 'Switch OLED con caja y dock'
      }
    ],
    termsAccepted: true,
    termsAcceptedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: {
      amount: 4450,
      preparedBy: 'Sofia Reyes',
      sentAt: new Date(Date.now() - 3600000 * 40).toISOString(),
      acceptedByCustomer: true,
      acceptedAt: new Date(Date.now() - 3600000 * 36).toISOString()
    },
    shippingApproval: {
      approved: true,
      approvedBy: 'Carlos Mendoza',
      approvedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
      carrier: 'Estafeta México',
      trackingNumber: 'EST-MX-9823419082',
      labelReference: 'LION-LBL-2026-0882',
      instructions: 'Empacar con al menos 3 capas de plástico de burbujas en caja rígida. Llevar a cualquier sucursal Estafeta autorizada.'
    },
    inspection: null,
    revisedOffer: null,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Alejandra Morales)',
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        notes: 'Solicitud creada con estimado preliminar $4,450 MXN'
      },
      {
        status: 'PRELIMINARY_OFFER_SENT',
        changedBy: 'Sofia Reyes (Purchasing)',
        timestamp: new Date(Date.now() - 3600000 * 40).toISOString(),
        notes: 'Oferta preliminar autorizada y enviada por correo.'
      },
      {
        status: 'OFFER_ACCEPTED',
        changedBy: 'Cliente (Alejandra Morales)',
        timestamp: new Date(Date.now() - 3600000 * 36).toISOString(),
        notes: 'Cliente aceptó la oferta preliminar.'
      },
      {
        status: 'SHIPPING_APPROVED',
        changedBy: 'Carlos Mendoza (Admin)',
        timestamp: new Date(Date.now() - 3600000 * 30).toISOString(),
        notes: 'Envío aprobado explícitamente. Guía Estafeta EST-MX-9823419082 generada.'
      }
    ]
  },
  {
    id: 'REQ-2026-8803',
    customer: {
      fullName: 'Eduardo Jimenez Rios',
      email: 'eduardo.j@example.com',
      phone: '+52 81 2345 6789',
      whatsapp: '+52 81 2345 6789',
      city: 'Monterrey',
      state: 'Nuevo León',
      postalCode: '64000',
      shippingOrigin: 'San Pedro Garza García, NL'
    },
    items: [
      {
        itemId: 'item-3',
        productId: 'prod-tv-sony-trinitron-27',
        productName: 'Sony Trinitron WEGA 27" Flat CRT (KV-27FV310)',
        category: 'retro_tvs',
        condition: 'good',
        conditionLabel: 'Buen Estado Funcional',
        accessories: {
          originalRemote: false,
          componentInputVerified: true,
          screenBurnFree: true,
          scratchedGlass: false
        },
        calculatedEstimate: 3900,
        customerNotes: 'TV CRT muy pesado. Se entrega con cable de alimentación original.'
      }
    ],
    totalEstimatedAmount: 3900,
    currency: 'MXN',
    status: 'REVISED_OFFER_SENT',
    statusLabel: 'Oferta Revisada Pendiente de Decisión',
    customerNotes: 'Verificar por favor con mucho cuidado.',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80',
        label: 'Tubo frontal encendido'
      }
    ],
    termsAccepted: true,
    termsAcceptedAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: {
      amount: 3900,
      preparedBy: 'Sofia Reyes',
      sentAt: new Date(Date.now() - 3600000 * 80).toISOString(),
      acceptedByCustomer: true,
      acceptedAt: new Date(Date.now() - 3600000 * 75).toISOString()
    },
    shippingApproval: {
      approved: true,
      approvedBy: 'Carlos Mendoza',
      approvedAt: new Date(Date.now() - 3600000 * 70).toISOString(),
      carrier: 'Castores Transporte Especializado (Tarima)',
      trackingNumber: 'CAST-PAL-441092',
      labelReference: 'LION-CRT-SPEC-091',
      instructions: 'Recolección en domicilio de planta baja con flejado en tarima de madera y esquineros.'
    },
    inspection: {
      inspectedBy: 'Mateo Hernandez',
      inspectedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      serialVerified: 'KV-27FV310-901428',
      functionalityStatus: 'fully_functional',
      physicalCondition: 'fair',
      discrepancies: 'Se detectó rasguño visible en la carcasa superior y pequeña descalibración de geometría en la esquina superior izquierda.',
      missingAccessories: ['Control Remoto Original Ausente', 'Falta tapa posterior de conexiones frontales'],
      inspectionEvidenceUrls: [
        'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80'
      ]
    },
    revisedOffer: {
      originalAmount: 3900,
      revisedAmount: 3200,
      reason: 'Ajuste de $700 MXN por detalle cosmético en carcasa plástica y falta del control remoto RM-Y181 original que requiere reemplazo.',
      issuedBy: 'Sofia Reyes',
      issuedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      customerDecision: null, // PENDING ACCEPTANCE OR REJECTION (AC-11)
      customerDecisionAt: null
    },
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Eduardo Jimenez)',
        timestamp: new Date(Date.now() - 3600000 * 96).toISOString(),
        notes: 'Solicitud creada para CRT de 27 pulgadas.'
      },
      {
        status: 'SHIPPING_APPROVED',
        changedBy: 'Carlos Mendoza',
        timestamp: new Date(Date.now() - 3600000 * 70).toISOString(),
        notes: 'Aprobación especial de logística pesada (Castores).'
      },
      {
        status: 'RECEIVED',
        changedBy: 'Mateo Hernandez',
        timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
        notes: 'Recepción física en bodega central Azcapotzalco CDMX.'
      },
      {
        status: 'REVISED_OFFER_SENT',
        changedBy: 'Mateo Hernandez & Sofia Reyes',
        timestamp: new Date(Date.now() - 3600000 * 10).toISOString(),
        notes: 'Inspección completada: Oferta revisada a $3,200 MXN emitida por detalles cosméticos.'
      }
    ]
  }
];

module.exports = {
  seedUsers,
  seedProducts,
  seedSellRequests
};
