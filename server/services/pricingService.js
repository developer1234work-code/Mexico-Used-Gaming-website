const db = require('./dbAdapter');

/**
 * Calculates a verified non-binding estimate for a single console or item.
 * Runs on the server to prevent client-side price tampering.
 */
function calculateItemEstimate(itemData) {
  const { 
    productId, 
    editionId, 
    condition = 'works_perfect', 
    accessories = {}, 
    customData 
  } = itemData;

  // Handle custom non-catalogue item
  if (!productId || productId === 'custom') {
    const userEstimatedValue = Number(customData?.suggestedPrice || 0);
    return {
      productId: 'custom',
      productName: customData?.title || 'Consola o Artículo No Catalogado',
      category: customData?.category || 'custom',
      isCustom: true,
      condition,
      conditionLabel: getConditionLabel(condition),
      accessories,
      calculatedEstimate: userEstimatedValue > 0 ? userEstimatedValue : 500,
      calculationBreakdown: {
        basePrice: userEstimatedValue || 500,
        conditionMultiplier: 1.0,
        accessoriesTotal: 0,
        note: 'Cotización sujeta a revisión especializada por el equipo de compras.'
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

  let basePrice = Number(product.baseBuyPrice) || 0;
  let selectedEditionName = 'Estándar';
  let editionPriceDiff = 0;

  // Handle editions, colors and special versions
  if (editionId && Array.isArray(product.editions)) {
    const foundEdition = product.editions.find(e => e.id === editionId);
    if (foundEdition) {
      selectedEditionName = foundEdition.name;
      editionPriceDiff = Number(foundEdition.priceDiff) || 0;
      basePrice += editionPriceDiff;
    }
  }

  // Condition Multiplier
  const multipliers = product.conditionMultipliers || {
    works_perfect: 1.0,
    works_cosmetic_damage: 0.85,
    has_functional_problems: 0.60,
    does_not_work: 0.35,
    for_parts_only: 0.20
  };

  const conditionKey = mapConditionKey(condition);
  const conditionMultiplier = multipliers[conditionKey] !== undefined ? multipliers[conditionKey] : 1.0;

  let subtotal = Math.round(basePrice * conditionMultiplier);
  let accessoriesAdjustmentTotal = 0;
  const accessoryPrices = product.accessoryPricing || product.accessoryAdjustments || {};

  // Track itemized breakdown to avoid double-charging
  const itemizedAccessories = [];

  // Calculate accessory adjustments
  for (const [key, isSelected] of Object.entries(accessories)) {
    if (isSelected === true && accessoryPrices[key]) {
      const priceVal = Number(accessoryPrices[key]);
      accessoriesAdjustmentTotal += priceVal;
      itemizedAccessories.push({
        key,
        name: formatAccessoryName(key),
        price: priceVal,
        type: 'ADDITIONAL'
      });
    } else if (isSelected === false && accessoryPrices[key] && Number(accessoryPrices[key]) < 0) {
      // Deduction for missing essential component
      const penaltyVal = Number(accessoryPrices[key]);
      accessoriesAdjustmentTotal += penaltyVal;
      itemizedAccessories.push({
        key,
        name: formatAccessoryName(key),
        price: penaltyVal,
        type: 'DEDUCTION'
      });
    }
  }

  let finalEstimate = Math.max(100, Math.round(subtotal + accessoriesAdjustmentTotal));

  return {
    productId: product.id,
    sku: product.sku,
    productName: product.name,
    edition: selectedEditionName,
    editionPriceDiff,
    category: product.category,
    categoryName: product.categoryName,
    platform: product.platform || product.brand,
    brand: product.brand,
    imageUrl: product.imageUrl,
    condition: conditionKey,
    conditionLabel: getConditionLabel(conditionKey),
    accessories,
    itemizedAccessories,
    calculatedEstimate: finalEstimate,
    calculationBreakdown: {
      basePrice,
      originalBasePrice: product.baseBuyPrice,
      editionPriceDiff,
      conditionMultiplier,
      subtotalAfterCondition: subtotal,
      accessoriesAdjustmentTotal,
      currency: 'MXN'
    },
    pricingRuleSnapshot: {
      appliedAt: new Date().toISOString(),
      basePrice,
      multiplier: conditionMultiplier,
      accessoryPrices
    }
  };
}

function mapConditionKey(key) {
  const alias = {
    'like_new': 'works_perfect',
    'good': 'works_cosmetic_damage',
    'fair': 'has_functional_problems',
    'damaged': 'does_not_work',
    'untested': 'for_parts_only',
    'cib': 'works_perfect',
    'sealed': 'works_perfect'
  };
  return alias[key] || key;
}

function getConditionLabel(conditionKey) {
  const map = {
    works_perfect: 'Funciona perfectamente (100%)',
    works_cosmetic_damage: 'Funciona pero tiene daño estético (85%)',
    has_functional_problems: 'Tiene problemas funcionales (60%)',
    does_not_work: 'No funciona (35%)',
    for_parts_only: 'Para piezas únicamente (20%)'
  };
  return map[conditionKey] || conditionKey;
}

function formatAccessoryName(key) {
  const map = {
    extra_controller: 'Control adicional / Extra original',
    expansion_pak: 'Expansion Pak (Memoria N64)',
    original_box: 'Caja original con inserts',
    original_manuals: 'Manuales y folletos originales',
    memory_card: 'Memory Card / Tarjeta de memoria',
    hdmi_adapter: 'Adaptador HDMI / Cable digital',
    original_power_supply: 'Fuente de poder original',
    av_cable: 'Cable AV original',
    game_boy_player: 'Game Boy Player (GameCube)',
    vmu_memory_screen: 'VMU con pantalla (Dreamcast)',
    arcade_stick: 'Arcade Stick de colección',
    zapper_gun: 'Pistola Zapper / Super Scope',
    rumble_pak: 'Rumble Pak de vibración',
    pro_controller: 'Pro Controller oficial',
    original_remote: 'Control remoto oficial (CRT)'
  };
  return map[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

module.exports = {
  calculateItemEstimate,
  getConditionLabel,
  formatAccessoryName
};
