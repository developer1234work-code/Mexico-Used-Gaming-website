const express = require('express');
const router = express.Router();
const db = require('../services/dbAdapter');
const { authenticateToken, requireRoles } = require('../middleware/auth');

// GET /api/csv/export-products (Export catalogue to CSV)
router.get('/export-products', authenticateToken, requireRoles(['admin', 'purchasing']), (req, res) => {
  try {
    const products = db.find('products');

    const headers = ['id', 'sku', 'name', 'category', 'categoryName', 'brand', 'model', 'platform', 'baseBuyPrice', 'active', 'description'];
    const rows = products.map(p => [
      `"${p.id || ''}"`,
      `"${p.sku || ''}"`,
      `"${(p.name || '').replace(/"/g, '""')}"`,
      `"${p.category || ''}"`,
      `"${p.categoryName || ''}"`,
      `"${p.brand || ''}"`,
      `"${p.model || ''}"`,
      `"${p.platform || ''}"`,
      p.baseBuyPrice || 0,
      p.active !== false ? 'true' : 'false',
      `"${(p.description || '').replace(/"/g, '""')}"`
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="lion_catalogue_export.csv"');
    res.status(200).send('\uFEFF' + csvContent); // Add UTF-8 BOM for Excel compatibility in Mexico
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/csv/import-products (Import products from CSV payload or raw string)
router.post('/import-products', authenticateToken, requireRoles(['admin', 'purchasing']), express.text({ type: ['text/csv', 'text/plain', 'application/json'] }), (req, res) => {
  try {
    let csvData = req.body;
    if (typeof csvData === 'object' && csvData.csvText) {
      csvData = csvData.csvText;
    }

    if (!csvData || typeof csvData !== 'string') {
      return res.status(400).json({ error: 'Contenido CSV vacío o inválido.' });
    }

    const lines = csvData.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) {
      return res.status(400).json({ error: 'El archivo CSV debe tener una fila de encabezados y al menos un registro.' });
    }

    const headers = lines[0].split(',').map(h => h.replace(/^["']|["']$/g, '').trim().toLowerCase());
    
    const requiredCols = ['name', 'category', 'basebuyprice'];
    const missingCols = requiredCols.filter(col => !headers.includes(col));
    if (missingCols.length > 0) {
      return res.status(400).json({
        error: `Faltan columnas requeridas en el CSV: ${missingCols.join(', ')}. Encabezados esperados: name, category, baseBuyPrice, etc.`
      });
    }

    const results = {
      imported: 0,
      updated: 0,
      errors: []
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Regex to parse comma separated while respecting quoted strings
      const parts = line.match(/(?:[^\s,"]+|"[^"]*")+/g);
      if (!parts || parts.length === 0) continue;

      const cleanParts = parts.map(p => p.replace(/^"|"$/g, '').trim());
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = cleanParts[idx] !== undefined ? cleanParts[idx] : '';
      });

      if (!row['name'] || !row['basebuyprice']) {
        results.errors.push(`Línea ${i + 1}: Nombre o precio base ausente.`);
        continue;
      }

      const price = Number(row['basebuyprice']);
      if (isNaN(price) || price < 0) {
        results.errors.push(`Línea ${i + 1}: Precio "${row['basebuyprice']}" no es un número válido.`);
        continue;
      }

      // Check if product exists by SKU or ID
      let existing = null;
      if (row['sku']) {
        existing = db.findOne('products', { sku: row['sku'] });
      }
      if (!existing && row['id']) {
        existing = db.findById('products', row['id']);
      }

      if (existing) {
        db.findByIdAndUpdate('products', existing.id, {
          name: row['name'],
          baseBuyPrice: price,
          category: row['category'] || existing.category,
          brand: row['brand'] || existing.brand,
          model: row['model'] || existing.model,
          platform: row['platform'] || existing.platform,
          description: row['description'] || existing.description
        });
        results.updated++;
      } else {
        db.insertOne('products', {
          id: `prod-${Date.now()}-${i}`,
          sku: row['sku'] || `SKU-${Date.now().toString().slice(-6)}-${i}`,
          name: row['name'],
          category: row['category'] || 'consoles',
          categoryName: row['categoryname'] || row['category'] || 'Gaming Consoles',
          brand: row['brand'] || 'Marca',
          model: row['model'] || '',
          platform: row['platform'] || '',
          baseBuyPrice: price,
          description: row['description'] || '',
          imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
          active: row['active'] !== 'false',
          conditionMultipliers: {
            like_new: 1.0,
            good: 0.85,
            fair: 0.70,
            damaged: 0.40,
            untested: 0.20
          },
          accessoryAdjustments: {}
        });
        results.imported++;
      }
    }

    db.insertOne('auditLogs', {
      id: `audit-${Date.now()}`,
      action: 'CSV_CATALOGUE_IMPORT',
      performedBy: req.user.name,
      timestamp: new Date().toISOString(),
      details: `Importación CSV: ${results.imported} creados, ${results.updated} actualizados, ${results.errors.length} errores`
    });

    res.json({
      message: 'Procesamiento de catálogo CSV completado.',
      results
    });
  } catch (err) {
    console.error('CSV import error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
