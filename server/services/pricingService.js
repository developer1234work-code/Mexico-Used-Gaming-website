const db = require('./dbAdapter');

/**
 * Calculates a verified non-binding estimate for a single item.
 * Runs on the server to prevent client-side price tampering.
 */
function calculateItemEstimate(itemData) {
  const { productId, condition, accessories = {}, customData } = itemData;

  // Handle custom non-catalogue item
  if (!productId || productId === 'custom') {
    const userEstimatedValue = Number(customData?.suggestedPrice || 0);
    return {
      productId: 'custom',
      productName: customData?.title || 'Artículo Personalizado / No Catalogado',
      category: customData?.category || 'custom',
      isCustom: true,
      condition: condition || 'good',
      conditionLabel: getConditionLabel(condition),
      accessories,
      calculatedEstimate: userEstimatedValue > 0 ? userEstimatedValue : 500, // Subject to manual review
      calculationBreakdown: {
        basePrice: userEstimatedValue || 500,
        conditionMultiplier: 1.0,
        accessoriesTotal: 0,
        note: 'Cotización manual sujeta a revisión especializada por el equipo de compras.'
      },
      pricingRuleSnapshot: {
        timestamp: new Date().toISOString(),
        ruleType: 'CUSTOM_MANUAL_REVIEW'
      }
    };
  }

  const product = db.findById('products', productId);
  if (!product) {
    throw new Error(`Producto con ID ${productId} no encontrado en el catálogo.`);
  }

  const basePrice = Number(product.baseBuyPrice) || 0;
  const multipliers = product.conditionMultipliers || {
    like_new: 1.0,
    good: 0.85,
    fair: 0.70,
    damaged: 0.40,
    untested: 0.20
  };

  const conditionKey = condition || 'good';
  const conditionMultiplier = multipliers[conditionKey] !== undefined ? multipliers[conditionKey] : 0.85;

  let subtotal = Math.round(basePrice * conditionMultiplier);
  let accessoriesAdjustmentTotal = 0;
  const itemAdjustments = product.accessoryAdjustments || {};

  // Calculate accessory adjustments
  for (const [key, value] of Object.entries(accessories)) {
    if (value === true && itemAdjustments[key]) {
      accessoriesAdjustmentTotal += itemAdjustments[key];
    } else if (value === false && itemAdjustments[key] && itemAdjustments[key] < 0) {
      // Missing accessory penalty applied when user explicitly reports it is NOT included
      accessoriesAdjustmentTotal += itemAdjustments[key];
    }
  }

  let finalEstimate = Math.max(100, Math.round(subtotal + accessoriesAdjustmentTotal));

  return {
    productId: product.id,
    sku: product.sku,
    productName: product.name,
    category: product.category,
    categoryName: product.categoryName,
    platform: product.platform,
    brand: product.brand,
    imageUrl: product.imageUrl,
    condition: conditionKey,
    conditionLabel: getConditionLabel(conditionKey),
    accessories,
    calculatedEstimate: finalEstimate,
    calculationBreakdown: {
      basePrice,
      conditionMultiplier,
      accessoriesAdjustmentTotal,
      currency: 'MXN'
    },
    pricingRuleSnapshot: {
      appliedAt: new Date().toISOString(),
      basePrice,
      multiplier: conditionMultiplier,
      adjustments: itemAdjustments
    }
  };
}

function getConditionLabel(conditionKey) {
  const map = {
    sealed: 'Nuevo / Sellado de Fábrica',
    like_new: 'Excelente / Como Nuevo',
    cib: 'Completo en Caja (CIB)',
    good: 'Buen Estado (Uso normal)',
    box_game: 'Con Caja / Sin Manual',
    fair: 'Regular / Desgaste Cosmético',
    game_only: 'Sólo Disco / Cartucho Suelto',
    damaged: 'Con Detalles / Dañado',
    scratched: 'Disco Rayado / Desgaste Marcado',
    untested: 'Sin Probar / Para Reparación o Piezas'
  };
  return map[conditionKey] || conditionKey;
}

module.exports = {
  calculateItemEstimate,
  getConditionLabel
};
