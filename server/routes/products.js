const express = require('express');
const router = express.Router();
const db = require('../services/dbAdapter');
const { authenticateToken, requireRoles } = require('../middleware/auth');

// GET /api/products (public catalogue browse & search)
router.get('/', (req, res) => {
  const { category, search, brand, platform, page = 1, limit = 50 } = req.query;

  let products = db.find('products');

  // Filter only active for non-admin unless specified
  if (req.query.all !== 'true') {
    products = products.filter(p => p.active !== false);
  }

  // Category filter
  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }

  // Brand filter (supports brand and platform aliases like PlayStation/Sony, Xbox/Microsoft, CRT TVs)
  if (brand && brand !== 'all') {
    const b = brand.toLowerCase();
    products = products.filter(p => {
      const pb = (p.brand || '').toLowerCase();
      const pp = (p.platform || '').toLowerCase();
      if (b === 'sony' || b === 'playstation') return pb.includes('sony') || pb.includes('playstation') || pp.includes('playstation');
      if (b === 'microsoft' || b === 'xbox') return pb.includes('microsoft') || pb.includes('xbox') || pp.includes('xbox');
      if (b === 'sega') return pb.includes('sega') || pp.includes('sega');
      if (b === 'nintendo') return pb.includes('nintendo') || pp.includes('nintendo');
      if (b.includes('crt') || b.includes('tv')) return p.isCRT || pb.includes('crt') || pb.includes('tv');
      return pb === b || pp.includes(b);
    });
  }

  // Platform filter
  if (platform && platform !== 'all') {
    products = products.filter(p => p.platform && p.platform.toLowerCase().includes(platform.toLowerCase()));
  }

  // Search keyword (brand, model, name, sku, description)
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    products = products.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.model && p.model.toLowerCase().includes(q)) ||
      (p.platform && p.platform.toLowerCase().includes(q)) ||
      (p.sku && p.sku.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }

  const total = products.length;
  const startIndex = (Number(page) - 1) * Number(limit);
  const paginated = products.slice(startIndex, startIndex + Number(limit));

  res.json({
    products: paginated,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / Number(limit))
  });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = db.findById('products', req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }
  res.json({ product });
});

// POST /api/products (Admin only)
router.post('/', authenticateToken, requireRoles(['admin', 'purchasing']), (req, res) => {
  const {
    name,
    category,
    categoryName,
    brand,
    model,
    platform,
    sku,
    baseBuyPrice,
    description,
    imageUrl,
    conditionMultipliers,
    accessoryAdjustments,
    accessoryPricing,
    baseIncludes,
    editions,
    isCRT,
    dimensions,
    weightKg
  } = req.body;

  if (!name || !category || !baseBuyPrice) {
    return res.status(400).json({ error: 'Nombre, categoría y precio base son obligatorios.' });
  }

  const newProduct = {
    id: `prod-${Date.now()}`,
    sku: sku || `SKU-${Date.now().toString().slice(-6)}`,
    name,
    category,
    categoryName: categoryName || category,
    brand: brand || 'Genérico',
    model: model || '',
    platform: platform || '',
    baseBuyPrice: Number(baseBuyPrice),
    description: description || '',
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    active: true,
    isCRT: Boolean(isCRT),
    dimensions: dimensions || '',
    weightKg: weightKg ? Number(weightKg) : null,
    baseIncludes: baseIncludes || ['original_controller', 'power_supply', 'av_cable'],
    accessoryPricing: accessoryPricing || {
      extra_controller: 150,
      original_box: 200,
      original_manuals: 100,
      expansion_pak: 300,
      memory_card: 100
    },
    editions: editions || [{ id: 'standard', name: 'Edición Estándar', priceDiff: 0 }],
    conditionMultipliers: conditionMultipliers || {
      like_new: 1.0,
      good: 0.85,
      fair: 0.70,
      damaged: 0.40,
      untested: 0.20
    },
    accessoryAdjustments: accessoryAdjustments || {}
  };

  const created = db.insertOne('products', newProduct);

  db.insertOne('auditLogs', {
    id: `audit-${Date.now()}`,
    action: 'PRODUCT_CREATED',
    performedBy: req.user.name,
    productId: created.id,
    timestamp: new Date().toISOString(),
    details: `Producto creado: ${created.name} ($${created.baseBuyPrice} MXN)`
  });

  res.status(201).json({ product: created });
});

// PUT /api/products/:id (Admin only)
router.put('/:id', authenticateToken, requireRoles(['admin', 'purchasing']), (req, res) => {
  const existing = db.findById('products', req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  const updated = db.findByIdAndUpdate('products', req.params.id, req.body);

  db.insertOne('auditLogs', {
    id: `audit-${Date.now()}`,
    action: 'PRODUCT_UPDATED',
    performedBy: req.user.name,
    productId: req.params.id,
    timestamp: new Date().toISOString(),
    details: `Producto actualizado: ${updated.name}`
  });

  res.json({ product: updated });
});

// DELETE /api/products/:id (Admin only)
router.delete('/:id', authenticateToken, requireRoles(['admin']), (req, res) => {
  const existing = db.findById('products', req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Producto no encontrado.' });
  }

  // Soft delete / deactivate
  db.findByIdAndUpdate('products', req.params.id, { active: false });

  db.insertOne('auditLogs', {
    id: `audit-${Date.now()}`,
    action: 'PRODUCT_DEACTIVATED',
    performedBy: req.user.name,
    productId: req.params.id,
    timestamp: new Date().toISOString(),
    details: `Producto desactivado: ${existing.name}`
  });

  res.json({ message: 'Producto desactivado exitosamente.' });
});

module.exports = router;
