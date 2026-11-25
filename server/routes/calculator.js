const express = require('express');
const router = express.Router();
const { calculateItemEstimate } = require('../services/pricingService');

// POST /api/calculator/estimate
router.post('/estimate', (req, res) => {
  try {
    const { productId, condition, accessories, customData } = req.body;
    const estimate = calculateItemEstimate({
      productId,
      condition,
      accessories,
      customData
    });
    res.json({ estimate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/calculator/cart-estimate
router.post('/cart-estimate', (req, res) => {
  try {
    const { items = [] } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.json({
        items: [],
        totalEstimatedAmount: 0,
        currency: 'MXN'
      });
    }

    const validatedItems = items.map((item, index) => {
      const calculated = calculateItemEstimate(item);
      return {
        ...calculated,
        itemId: item.itemId || `cart-item-${index + 1}`,
        customerNotes: item.customerNotes || ''
      };
    });

    const totalEstimatedAmount = validatedItems.reduce((acc, curr) => acc + (curr.calculatedEstimate || 0), 0);

    res.json({
      items: validatedItems,
      totalEstimatedAmount,
      currency: 'MXN',
      disclaimer: 'Precios estimados informativos en MXN sujetos a revisión física y verificación de componentes en bodega.'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
