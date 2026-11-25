import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Plus, 
  Minus, 
  Info, 
  ShoppingBag, 
  Sparkles,
  Layers,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { formatMXN } from '../utils/formatters';

export default function ConsoleDetailPage({ consoleItem, onBack, onOpenCustomQuote }) {
  const { addItem, openCart } = useCart();

  // Edition selection
  const [selectedEditionId, setSelectedEditionId] = useState(
    consoleItem.editions && consoleItem.editions.length > 0 ? consoleItem.editions[0].id : 'standard'
  );

  // Dynamic conditions from product data (with fallback to standard 5)
  const hasCustomConditions = Array.isArray(consoleItem.conditions) && consoleItem.conditions.length > 0;
  const [condition, setCondition] = useState(
    hasCustomConditions ? consoleItem.conditions[0].id : 'works_perfect'
  );

  // Dynamic accessories from product data
  const hasCustomAccessories = Array.isArray(consoleItem.accessoriesList) && consoleItem.accessoriesList.length > 0;
  const [accessories, setAccessories] = useState(() => {
    const initial = {};
    if (hasCustomAccessories) {
      consoleItem.accessoriesList.forEach(a => {
        initial[a.key] = false;
      });
    } else {
      initial.extra_controller = false;
      initial.expansion_pak = false;
      initial.original_box = false;
    }
    return initial;
  });

  const [customerNotes, setCustomerNotes] = useState('');
  const [estimateData, setEstimateData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // When consoleItem changes, reset condition & accessories
  useEffect(() => {
    if (hasCustomConditions) {
      setCondition(consoleItem.conditions[0].id);
    } else {
      setCondition('works_perfect');
    }
    if (hasCustomAccessories) {
      const initial = {};
      consoleItem.accessoriesList.forEach(a => {
        initial[a.key] = false;
      });
      setAccessories(initial);
    }
  }, [consoleItem.id]);

  // Recalculate server-side estimate whenever condition, edition or accessories change
  useEffect(() => {
    async function calculate() {
      setIsCalculating(true);
      try {
        const res = await api.calculateEstimate({
          productId: consoleItem.id,
          editionId: selectedEditionId,
          condition,
          accessories
        });
        if (res.estimate) {
          setEstimateData(res.estimate);
        }
      } catch (err) {
        console.error('Error calculating estimate:', err);
      } finally {
        setIsCalculating(false);
      }
    }
    calculate();
  }, [consoleItem.id, selectedEditionId, condition, accessories]);

  const toggleAccessory = (key) => {
    setAccessories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const selectedEdition = consoleItem.editions?.find(e => e.id === selectedEditionId);
      await addItem({
        productId: consoleItem.id,
        productName: `${consoleItem.name} ${selectedEdition && selectedEdition.id !== 'standard' ? `(${selectedEdition.name})` : ''}`,
        editionId: selectedEditionId,
        category: 'consoles',
        condition,
        accessories,
        customerNotes: customerNotes ? `[${consoleItem.name}] ${customerNotes}` : ''
      });
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        openCart();
      }, 700);
    } finally {
      setIsAdding(false);
    }
  };

  // Get available accessory pricing definitions from consoleItem
  const accessoryPrices = consoleItem.accessoryPricing || {
    extra_controller: 150,
    expansion_pak: 300,
    original_box: 200,
    original_manuals: 100,
    memory_card: 100,
    hdmi_adapter: 150
  };

  const currentEstimatedTotal = estimateData?.calculatedEstimate || consoleItem.baseBuyPrice;

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Back */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-[#B87406] mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Regresar a la selección de consolas</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Console Image, Base Info & Disclaimer */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm text-center space-y-4">
              <div className="w-full h-64 rounded-2xl bg-neutral-50 p-4 flex items-center justify-center overflow-hidden border border-neutral-100">
                <img
                  src={consoleItem.imageUrl}
                  alt={consoleItem.name}
                  className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="text-left space-y-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#E59819] block">
                  {consoleItem.brand}
                </span>
                <h1 className="font-hero-gaming text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display">
                  {consoleItem.name}
                </h1>
                <p className="text-xs text-neutral-500 font-medium">
                  Modelo o Versión: <strong>{consoleItem.model}</strong>
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed pt-2">
                  {consoleItem.description}
                </p>
              </div>

              {/* Base buying price badge */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
                    Precio Base de Recompra:
                  </span>
                  <span className="text-2xl font-black text-neutral-900">
                    {formatMXN(consoleItem.baseBuyPrice)}
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-amber-50 text-[#B87406] px-2.5 py-1 rounded-full border border-[#F0C068]/50">
                  En buen estado
                </span>
              </div>
            </div>

            {/* Clear Base Price Inclusions */}
            <div className="bg-[#FAF4E6] rounded-2xl p-5 border border-[#F0C068]/70 text-xs space-y-2">
              <div className="flex items-center gap-2 font-black text-neutral-900">
                <CheckCircle2 className="w-4 h-4 text-[#F5A623]" />
                <span>¿Qué incluye el precio base?</span>
              </div>
              <p className="text-neutral-700 leading-relaxed text-[11px]">
                {consoleItem.id === 'ps1-slim'
                  ? <>El precio base incluye la <strong>consola PSone Slim con la pantalla portátil LCD adjunta</strong> en buen estado y leyendo discos. Agrega controles y cables adicionales para recibir una cotización mayor.</>
                  : <>El precio base es por la <strong>consola sola</strong> (sin cables ni controles). Agrega en los accesorios de abajo tus cables y controles originales para recibir un <strong>mayor importe</strong>.</>
                }
              </p>
            </div>

            {/* WhatsApp Direct Help */}
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 flex items-center justify-between text-xs">
              <span className="text-neutral-600">¿Dudas sobre tu versión o modelo?</span>
              <a
                href={`https://wa.me/525512345678?text=Hola%20RetroCompra,%20tengo%20dudas%20sobre%20mi%20${encodeURIComponent(consoleItem.name)}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#B87406] hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Pricing Engine Configuration */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Edition, Color & Special Version Selector */}
            {consoleItem.editions && consoleItem.editions.length > 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-neutral-900 block flex items-center justify-between">
                  <span>1. Selecciona Edición, Color o Variante:</span>
                  <span className="text-[11px] text-[#B87406] font-bold">Diferencial de precio automático</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {consoleItem.editions.map((ed) => {
                    const isSelected = selectedEditionId === ed.id;
                    return (
                      <button
                        key={ed.id}
                        type="button"
                        onClick={() => setSelectedEditionId(ed.id)}
                        className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'border-[#F5A623] bg-amber-50/70 font-bold text-black ring-2 ring-[#F5A623]/30'
                            : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/50'
                        }`}
                      >
                        <div className="font-bold text-neutral-900">{ed.name}</div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">
                          {ed.priceDiff > 0 ? `+${formatMXN(ed.priceDiff)} adicional` : 'Precio estándar'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Condition Options (Dynamic from official Excel or standard 5) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-neutral-900 block">
                2. Selecciona la Condición de {consoleItem.isCRT ? 'la Televisión' : 'la Consola'}:
              </label>

              <div className="space-y-2">
                {hasCustomConditions ? (
                  consoleItem.conditions.map((cond) => {
                    const isSelected = condition === cond.id;
                    const isApproved = cond.status === 'Approved' && cond.buyPrice !== null;
                    return (
                      <div
                        key={cond.id}
                        onClick={() => setCondition(cond.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#F5A623] bg-amber-50/70 font-bold ring-2 ring-[#F5A623]/30'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <div className="space-y-0.5 max-w-[70%]">
                          <div className="text-xs font-bold text-neutral-900">{cond.label || cond.name}</div>
                          <div className="text-[11px] text-neutral-500 truncate">
                            {cond.notes ? cond.notes : isApproved ? 'Inspección técnica estándar' : 'Evaluación especializada requerida'}
                          </div>
                        </div>
                        <div>
                          {isApproved ? (
                            <span className={`text-[11px] font-bold px-2 py-0.5 rounded font-mono ${
                              isSelected ? 'bg-[#F5A623] text-black' : 'bg-neutral-100 text-neutral-800'
                            }`}>
                              {formatMXN(cond.buyPrice)}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                              Revisión manual
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  [
                    {
                      key: 'works_perfect',
                      title: 'Funciona perfectamente',
                      sub: '100% operativa, sin fallas de software, lector ni puertos.',
                      rate: '100% del valor base'
                    },
                    {
                      key: 'works_cosmetic_damage',
                      title: 'Funciona pero tiene daño estético',
                      sub: 'Rayones visibles, desgaste normal o ligeras manchas en la carcasa.',
                      rate: '85% del valor base'
                    },
                    {
                      key: 'has_functional_problems',
                      title: 'Tiene problemas funcionales',
                      sub: 'Lector láser con problemas, botones flojos o sobrecalentamiento.',
                      rate: '60% del valor base'
                    },
                    {
                      key: 'does_not_work',
                      title: 'No funciona',
                      sub: 'No enciende, luz azul/roja o requiere reparación profunda.',
                      rate: '35% del valor base'
                    },
                    {
                      key: 'for_parts_only',
                      title: 'Para piezas únicamente',
                      sub: 'Incompleta, rota o para reciclaje de componentes.',
                      rate: '20% del valor base'
                    }
                  ].map((cond) => {
                    const isSelected = condition === cond.key;
                    return (
                      <div
                        key={cond.key}
                        onClick={() => setCondition(cond.key)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#F5A623] bg-amber-50/70 font-bold ring-2 ring-[#F5A623]/30'
                            : 'border-neutral-200 hover:border-neutral-300 bg-white'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-bold text-neutral-900">{cond.title}</div>
                          <div className="text-[11px] text-neutral-500">{cond.sub}</div>
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-[#F5A623] text-black' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {cond.rate}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Step 3: Available Accessories & Individual Additional Buying Prices */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-sm space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-neutral-900 block">
                  3. Accesorios Adicionales y Componentes Genuinos:
                </label>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Marca los extras que tienes para sumarlos automáticamente a tu oferta garantizada.
                </p>
              </div>

              <div className="space-y-2">
                {hasCustomAccessories ? (
                  consoleItem.accessoriesList.map((acc) => {
                    const isChecked = Boolean(accessories[acc.key]);
                    const isApproved = acc.status === 'Approved' && acc.buyPrice !== null && acc.buyPrice > 0;
                    return (
                      <label
                        key={acc.key}
                        className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                          isChecked 
                            ? 'border-[#F5A623] bg-amber-50/50' 
                            : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/40'
                        }`}
                      >
                        <div className="flex items-center gap-3 max-w-[70%]">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAccessory(acc.key)}
                            className="w-4 h-4 rounded text-[#F5A623] focus:ring-[#F5A623]"
                          />
                          <div>
                            <div className="text-xs font-bold text-neutral-900">{acc.label || acc.name}</div>
                            <div className="text-[10px] text-neutral-500 truncate">{acc.notes || 'Valor adicional genuino'}</div>
                          </div>
                        </div>
                        <div>
                          {isApproved ? (
                            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 font-mono">
                              +{formatMXN(acc.buyPrice)}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              Revisión manual
                            </span>
                          )}
                        </div>
                      </label>
                    );
                  })
                ) : (
                  [
                    {
                      key: 'extra_controller',
                      name: 'Control original adicional / extra',
                      price: accessoryPrices.extra_controller || 150,
                      note: 'Mando oficial funcionando'
                    },
                    {
                      key: 'expansion_pak',
                      name: 'Expansion Pak (Memoria de 4MB N64)',
                      price: accessoryPrices.expansion_pak || 300,
                      showOnly: consoleItem.id === 'n64-original',
                      note: 'Tapa roja oficial de memoria'
                    },
                    {
                      key: 'original_box',
                      name: 'Caja original con protectores / inserts',
                      price: accessoryPrices.original_box || 200,
                      note: 'Embalaje original en buen estado'
                    },
                    {
                      key: 'original_manuals',
                      name: 'Manuales y folletos originales de fábrica',
                      price: accessoryPrices.original_manuals || 100,
                      note: 'Instructivos originales'
                    },
                    {
                      key: 'memory_card',
                      name: 'Memory Card / Tarjeta de memoria original',
                      price: accessoryPrices.memory_card || 100,
                      note: 'Tarjeta de memoria oficial'
                    },
                    {
                      key: 'hdmi_adapter',
                      name: 'Adaptador HDMI o cable de alta definición',
                      price: accessoryPrices.hdmi_adapter || 150,
                      note: 'Para televisores modernos'
                    }
                  ].filter(item => item.showOnly === undefined || item.showOnly === true).map((acc) => {
                    const isChecked = Boolean(accessories[acc.key]);
                    return (
                      <label
                        key={acc.key}
                        className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                          isChecked 
                            ? 'border-[#F5A623] bg-amber-50/50' 
                            : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleAccessory(acc.key)}
                            className="w-4 h-4 rounded text-[#F5A623] focus:ring-[#F5A623]"
                          />
                          <div>
                            <div className="text-xs font-bold text-neutral-900">{acc.name}</div>
                            <div className="text-[10px] text-neutral-500">{acc.note}</div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                          +{formatMXN(acc.price)}
                        </span>
                      </label>
                    );
                  })
                )}
              </div>
            </div>

            {/* Step 4: Live Total Estimated Offer Box (100% Spanish) */}
            <div className="bg-black text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <span className="text-xs font-black uppercase tracking-wider text-[#F5A623]">
                  OFERTA TOTAL ESTIMADA:
                </span>
                <span className="text-[11px] font-mono text-neutral-400">Pesos Mexicanos (MXN)</span>
              </div>

              {/* Real-time Calculation Breakdown matching user's exact N64 example! */}
              {estimateData?.requiresManualReview ? (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#F5A623] font-bold">
                    <AlertCircle className="w-4 h-4 text-[#F5A623]" />
                    <span>Cotización Especializada Requerida</span>
                  </div>
                  <p className="text-neutral-300 text-[11px] leading-relaxed">
                    La condición seleccionada ({estimateData?.conditionLabel}) requiere evaluación individual por nuestro equipo de tasación técnica. Puedes agregarla a tu solicitud de venta y te contactaremos de inmediato.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>{consoleItem.name} ({estimateData?.edition || 'Estándar'}):</span>
                    <span className="font-bold text-white font-mono">
                      {formatMXN(estimateData?.calculationBreakdown?.subtotalAfterCondition || consoleItem.baseBuyPrice)}
                    </span>
                  </div>

                  {estimateData?.itemizedAccessories?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-neutral-300 text-[11px]">
                      <span>+ {item.name}:</span>
                      <span className="font-bold text-emerald-400 font-mono">+{formatMXN(item.price)}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider block">
                    {estimateData?.requiresManualReview ? 'VALOR A COTIZAR:' : 'TOTAL ESTIMADO A PAGAR:'}
                  </span>
                  <div className="text-3xl font-black text-[#F5A623] font-mono">
                    {estimateData?.requiresManualReview ? 'Por Evaluar' : formatMXN(currentEstimatedTotal)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="btn-shimmer px-6 py-3.5 rounded-2xl font-bold text-xs bg-[#F5A623] hover:bg-[#E59819] text-black shadow-lg shadow-[#F5A623]/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>{isAdding ? 'Agregando...' : addedSuccess ? '¡Agregado al carrito!' : estimateData?.requiresManualReview ? 'Agregar para Cotización' : 'Agregar a Mi Venta'}</span>
                </button>
              </div>

              <p className="text-[10px] text-neutral-500 leading-tight">
                * Precios calculados automáticamente en servidor según reglas y accesorios seleccionados. Sujeto a inspección física en bodega.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
