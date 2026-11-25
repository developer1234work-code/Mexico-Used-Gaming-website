// Standalone Frontend Mock Data for Admin Dashboard & Authentication
// Fully decouples Admin Dashboard and Login from the backend

export const DEMO_USERS = {
  'admin@retrocompra.com': {
    id: 'usr-admin-01',
    name: 'Carlos Mendoza (Owner/Admin)',
    email: 'admin@retrocompra.com',
    role: 'admin',
    department: 'Management'
  },
  'purchasing@retrocompra.com': {
    id: 'usr-purchasing-02',
    name: 'Sofia Reyes (Purchasing Lead)',
    email: 'purchasing@retrocompra.com',
    role: 'purchasing',
    department: 'Purchasing & Valuations'
  },
  'inspection@retrocompra.com': {
    id: 'usr-inspection-03',
    name: 'Mateo Hernandez (Hardware QA & Receiving)',
    email: 'inspection@retrocompra.com',
    role: 'inspection',
    department: 'Receiving & Inspection'
  },
  'support@retrocompra.com': {
    id: 'usr-support-04',
    name: 'Valeria Cruz (Customer Service)',
    email: 'support@retrocompra.com',
    role: 'customer_service',
    department: 'Customer Support'
  }
};

export const INITIAL_REQUESTS = [
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
    customerNotes: 'Disponible para recolección o envío inmediato por paquetería.',
    photos: [
      {
        url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
        label: 'Consola y accesorios'
      }
    ],
    termsAccepted: true,
    termsAcceptedAt: '2026-11-20T18:04:49.865Z',
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: {
      amount: 1950,
      preparedBy: 'Sofia Reyes',
      sentAt: null
    },
    shippingApproval: {
      approved: false
    },
    inspection: null,
    revisedOffer: null,
    createdAt: '2026-11-20T18:04:49.866Z',
    updatedAt: '2026-11-20T18:04:49.866Z',
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Roberto Garcia)',
        timestamp: '2026-11-20T18:04:49.866Z',
        notes: 'Solicitud creada con cotización de Nintendo 64 Jungle Green.'
      }
    ]
  },
  {
    id: 'REQ-2026-7025',
    customer: {
      fullName: 'Juan Pablo Montoya',
      email: 'juan.pablo@test.mx',
      phone: '+52 55 9988 7766',
      whatsapp: '+52 55 9988 7766',
      city: 'Puebla',
      state: 'Puebla',
      postalCode: '72000',
      shippingOrigin: 'Puebla, Puebla C.P. 72000'
    },
    items: [
      {
        itemId: 'item-2',
        productId: 'n64-original',
        productName: 'Nintendo 64',
        edition: 'Estándar',
        category: 'consoles',
        condition: 'works_perfect',
        conditionLabel: 'Funciona perfectamente (100%)',
        accessories: {
          extra_controller: true,
          expansion_pak: true,
          original_box: true
        },
        calculatedEstimate: 1550,
        customerNotes: ''
      }
    ],
    totalEstimatedAmount: 1550,
    currency: 'MXN',
    status: 'FINAL_ACCEPTED',
    statusLabel: 'Oferta Revisada Aceptada',
    customerNotes: '',
    photos: [],
    termsAccepted: true,
    termsAcceptedAt: '2026-11-21T19:11:40.529Z',
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: {
      amount: 1550,
      preparedBy: 'Carlos Mendoza',
      sentAt: '2026-11-21T19:20:00.000Z',
      acceptedByCustomer: true,
      acceptedAt: '2026-11-21T19:30:00.000Z'
    },
    shippingApproval: {
      approved: true,
      approvedBy: 'Carlos Mendoza (Owner/Admin)',
      approvedByRole: 'admin',
      approvedAt: '2026-11-22T10:15:00.000Z',
      carrier: 'Estafeta México',
      trackingNumber: 'EST-TEST-12345678',
      labelReference: 'LION-100755',
      instructions: 'Empacar con 3 capas de plástico burbuja',
      isCRTVerified: false
    },
    inspection: {
      inspectedBy: 'Mateo Hernandez',
      inspectedByRole: 'inspection',
      inspectedAt: '2026-11-23T14:30:00.000Z',
      serialVerified: 'SN-N64-TEST-999',
      functionalityStatus: 'fully_functional',
      physicalCondition: 'fair',
      authenticityVerified: 'authentic',
      discrepancies: 'Rasguño cosmético en carcasa lateral',
      missingAccessories: [],
      inspectionEvidenceUrls: []
    },
    revisedOffer: {
      originalAmount: 1550,
      revisedAmount: 1400,
      reason: 'Ajuste de $150 MXN por detalle estético en la cubierta',
      issuedBy: 'Sofia Reyes',
      issuedAt: '2026-11-23T15:00:00.000Z',
      customerDecision: 'ACCEPTED',
      customerDecisionAt: '2026-11-23T16:00:00.000Z'
    },
    createdAt: '2026-11-21T19:11:40.529Z',
    updatedAt: '2026-11-23T16:00:00.000Z',
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Juan Pablo Montoya)',
        timestamp: '2026-11-21T19:11:40.529Z',
        notes: 'Solicitud creada en línea.'
      },
      {
        status: 'SHIPPING_APPROVED',
        changedBy: 'Carlos Mendoza (Admin)',
        timestamp: '2026-11-22T10:15:00.000Z',
        notes: 'Envío aprobado. Guía EST-TEST-12345678 asignada.'
      },
      {
        status: 'FINAL_ACCEPTED',
        changedBy: 'Cliente (Juan Pablo Montoya)',
        timestamp: '2026-11-23T16:00:00.000Z',
        notes: 'Cliente aceptó explícitamente la oferta revisada de $1,400 MXN.'
      }
    ]
  },
  {
    id: 'REQ-2026-5120',
    customer: {
      fullName: 'Mariana Torres Ruiz',
      email: 'mariana.torres@gmail.com',
      phone: '+52 33 4567 8901',
      whatsapp: '+52 33 4567 8901',
      city: 'Guadalajara',
      state: 'Jalisco',
      postalCode: '44100',
      shippingOrigin: 'Guadalajara, Jalisco'
    },
    items: [
      {
        itemId: 'item-3',
        productId: 'ps2-slim',
        productName: 'PlayStation 2 Slim',
        edition: 'Negro Estándar',
        category: 'consoles',
        condition: 'works_perfect',
        conditionLabel: 'Excelente estado con caja',
        accessories: {
          extra_controller: true,
          memory_card: true,
          original_box: true
        },
        calculatedEstimate: 1450,
        customerNotes: 'PS2 Slim con 2 controles DualShock 2 originales y cable AV.'
      },
      {
        itemId: 'item-4',
        productId: 'crt-sony-trinitron-14',
        productName: 'Sony Trinitron 14" CRT TV',
        edition: 'Gris Plata',
        category: 'retro_tvs',
        condition: 'works_perfect',
        conditionLabel: 'Tubo perfecto sin quemaduras',
        accessories: {
          remote_control: true
        },
        calculatedEstimate: 1350,
        customerNotes: 'TV CRT en perfecto estado con control remoto original.'
      }
    ],
    totalEstimatedAmount: 2800,
    currency: 'MXN',
    status: 'SHIPPING_APPROVED',
    statusLabel: 'Envío Aprobado (Guía Emitida)',
    customerNotes: 'Se empacará con plástico burbuja de alta densidad para el CRT.',
    photos: [],
    termsAccepted: true,
    termsAcceptedAt: '2026-11-22T11:00:00.000Z',
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: {
      amount: 2800,
      preparedBy: 'Sofia Reyes',
      sentAt: '2026-11-22T12:00:00.000Z',
      acceptedByCustomer: true,
      acceptedAt: '2026-11-22T12:30:00.000Z'
    },
    shippingApproval: {
      approved: true,
      approvedBy: 'Carlos Mendoza',
      approvedByRole: 'admin',
      approvedAt: '2026-11-23T09:00:00.000Z',
      carrier: 'DHL Express México',
      trackingNumber: 'DHL-MX-98765432',
      labelReference: 'LION-CRT-5120',
      instructions: 'Empacar CRT con tarima o soporte de poliestireno rígido.',
      isCRTVerified: true
    },
    inspection: null,
    revisedOffer: null,
    createdAt: '2026-11-22T11:00:00.000Z',
    updatedAt: '2026-11-23T09:00:00.000Z',
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Mariana Torres)',
        timestamp: '2026-11-22T11:00:00.000Z',
        notes: 'Solicitud enviada para PS2 Slim y CRT Sony Trinitron 14".'
      },
      {
        status: 'SHIPPING_APPROVED',
        changedBy: 'Carlos Mendoza (Admin)',
        timestamp: '2026-11-23T09:00:00.000Z',
        notes: 'Aprobación de envío y guía DHL emitida con verificación técnica CRT.'
      }
    ]
  },
  {
    id: 'REQ-2026-3490',
    customer: {
      fullName: 'Alejandro Ortiz Silva',
      email: 'alex.ortiz@outlook.com',
      phone: '+52 81 2345 6789',
      whatsapp: '+52 81 2345 6789',
      city: 'Monterrey',
      state: 'Nuevo León',
      postalCode: '64000',
      shippingOrigin: 'Monterrey, N.L.'
    },
    items: [
      {
        itemId: 'item-5',
        productId: 'gamecube-platinum',
        productName: 'Nintendo GameCube',
        edition: 'Platinum Silver',
        category: 'consoles',
        condition: 'works_perfect',
        conditionLabel: 'Lector láser calibrado',
        accessories: {
          extra_controller: true,
          memory_card: true
        },
        calculatedEstimate: 1650,
        customerNotes: 'GameCube Platinum con control WaveBird inalámbrico.'
      }
    ],
    totalEstimatedAmount: 1650,
    currency: 'MXN',
    status: 'RECEIVED',
    statusLabel: 'Paquete Recibido en Bodega',
    customerNotes: '',
    photos: [],
    termsAccepted: true,
    termsAcceptedAt: '2026-11-19T08:00:00.000Z',
    termsVersion: '1.1-MEX-2026',
    preliminaryOffer: {
      amount: 1650,
      preparedBy: 'Sofia Reyes',
      sentAt: '2026-11-19T09:00:00.000Z',
      acceptedByCustomer: true,
      acceptedAt: '2026-11-19T10:00:00.000Z'
    },
    shippingApproval: {
      approved: true,
      approvedBy: 'Carlos Mendoza',
      approvedByRole: 'admin',
      approvedAt: '2026-11-19T11:00:00.000Z',
      carrier: 'FedEx México',
      trackingNumber: 'FDX-MX-88990011',
      labelReference: 'LION-GC-3490',
      instructions: 'Empaque seguro contra impactos.',
      isCRTVerified: false
    },
    inspection: null,
    revisedOffer: null,
    createdAt: '2026-11-19T08:00:00.000Z',
    updatedAt: '2026-11-24T15:30:00.000Z',
    statusHistory: [
      {
        status: 'SUBMITTED',
        changedBy: 'Cliente (Alejandro Ortiz)',
        timestamp: '2026-11-19T08:00:00.000Z',
        notes: 'Solicitud enviada para GameCube Platinum Silver.'
      },
      {
        status: 'RECEIVED',
        changedBy: 'Mateo Hernandez (Inspección)',
        timestamp: '2026-11-24T15:30:00.000Z',
        notes: 'Paquete recibido físicamente en muelle de carga Azcapotzalco.'
      }
    ]
  }
];

export const INITIAL_EMAIL_LOGS = [
  {
    id: 'eml-101',
    to: 'roberto.garcia@example.com',
    customerName: 'Roberto Garcia Perez',
    subject: 'Confirmación de solicitud de venta - REQ-2026-8801 | RetroCompra',
    eventType: 'CUSTOMER_SUBMISSION_CONFIRMATION',
    requestId: 'REQ-2026-8801',
    sentAt: '2026-11-20T18:05:00.000Z',
    status: 'SENT',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2 style="color: #059669;">Solicitud de Venta Recibida</h2>
        <p>Estimado/a Roberto Garcia Perez,</p>
        <p>Hemos recibido tu solicitud <strong>REQ-2026-8801</strong> por un estimado de <strong>$1,950.00 MXN</strong>.</p>
        <p>Nuestro equipo de valuación revisará los detalles y fotos enviadas.</p>
      </div>
    `
  },
  {
    id: 'eml-102',
    to: 'mariana.torres@gmail.com',
    customerName: 'Mariana Torres Ruiz',
    subject: '¡Envío Aprobado! Instrucciones y Guía para REQ-2026-5120 | RetroCompra',
    eventType: 'SHIPPING_APPROVAL',
    requestId: 'REQ-2026-5120',
    sentAt: '2026-11-23T09:05:00.000Z',
    status: 'SENT',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2 style="color: #0284c7;">Envío Autorizado</h2>
        <p>Estimado/a Mariana Torres Ruiz,</p>
        <p>Tu envío ha sido formalmente aprobado con la paquetería <strong>DHL Express México</strong>.</p>
        <p><strong>Guía:</strong> DHL-MX-98765432</p>
      </div>
    `
  },
  {
    id: 'eml-103',
    to: 'juan.pablo@test.mx',
    customerName: 'Juan Pablo Montoya',
    subject: '[ACCIÓN REQUERIDA] Oferta Revisada tras inspección para REQ-2026-7025 | RetroCompra',
    eventType: 'REVISED_OFFER',
    requestId: 'REQ-2026-7025',
    sentAt: '2026-11-23T15:05:00.000Z',
    status: 'SENT',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; padding: 24px;">
        <h2 style="color: #d97706;">Oferta Revisada tras Inspección</h2>
        <p>Estimado/a Juan Pablo Montoya,</p>
        <p>Nueva Oferta Revisada: <strong>$1,400.00 MXN</strong> por detalle estético en la cubierta.</p>
      </div>
    `
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'audit-001',
    action: 'SYSTEM_FRONTEND_MODE',
    performedBy: 'Sistema Frontend Standalone',
    userId: 'usr-admin-01',
    role: 'admin',
    timestamp: '2026-11-25T16:00:00.000Z',
    details: 'Panel de administración operando en modo frontend cliente sin backend.'
  },
  {
    id: 'audit-002',
    action: 'SHIPPING_EXPLICITLY_APPROVED',
    performedBy: 'Carlos Mendoza (Owner/Admin)',
    userId: 'usr-admin-01',
    role: 'admin',
    timestamp: '2026-11-23T09:00:00.000Z',
    details: 'Envío autorizado con guía DHL-MX-98765432 para REQ-2026-5120'
  },
  {
    id: 'audit-003',
    action: 'INSPECTION_RECORDED',
    performedBy: 'Mateo Hernandez',
    userId: 'usr-inspection-03',
    role: 'inspection',
    timestamp: '2026-11-23T14:30:00.000Z',
    details: 'Dictamen de inspección completado para REQ-2026-7025'
  },
  {
    id: 'audit-004',
    action: 'CUSTOMER_OFFER_ACCEPT',
    performedBy: 'Juan Pablo Montoya',
    userId: 'client',
    role: 'customer',
    timestamp: '2026-11-23T16:00:00.000Z',
    details: 'Cliente aceptó formalmente la oferta revisada de $1,400 MXN'
  }
];
