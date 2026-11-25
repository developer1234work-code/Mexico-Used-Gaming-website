const express = require('express');
const router = express.Router();
const db = require('../services/dbAdapter');

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

module.exports = router;
