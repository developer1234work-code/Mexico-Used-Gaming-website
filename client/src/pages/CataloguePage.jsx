import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Gamepad2, 
  Disc, 
  SlidersHorizontal, 
  Tv, 
  Check, 
  ArrowRight, 
  Plus, 
  Sparkles,
  Info,
  ShieldAlert
} from 'lucide-react';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';
import { formatMXN } from '../utils/formatters';

export default function CataloguePage({ initialCategory = 'all', onOpenCustomQuote }) {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state for configuring condition & accessories before adding to cart
  const [activeProduct, setActiveProduct] = useState(null);
  const [condition, setCondition] = useState('good');
  const [accessories, setAccessories] = useState({});
  const [calculatedAmount, setCalculatedAmount] = useState(0);
  const [itemNotes, setItemNotes] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await api.getProducts({
        category: selectedCategory,
        search: searchTerm
      });
      if (res.products) {
        setProducts(res.products);
      }
    } catch (err) {
      console.error('Error fetching catalogue:', err);
    } finally {
      setLoading(false);
    }
  }

  // Open configuration modal
  const handleStartEstimate = (product) => {
    setActiveProduct(product);
    setCondition(product.category === 'video_games' ? 'cib' : 'good');
    
    // Set default accessory state
    const defaultAcc = {};
    if (product.accessoryAdjustments) {
      Object.keys(product.accessoryAdjustments).forEach(k => {
        defaultAcc[k] = false;
      });
    }
    setAccessories(defaultAcc);
    setItemNotes('');
    
    // Calculate initial preview
    calculatePreview(product.id, product.category === 'video_games' ? 'cib' : 'good', defaultAcc);
  };

  const calculatePreview = async (prodId, cond, acc) => {
    try {
      const res = await api.calculateEstimate({
        productId: prodId,
        condition: cond,
        accessories: acc
      });
      if (res.estimate) {
        setCalculatedAmount(res.estimate.calculatedEstimate);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleConditionChange = (newCond) => {
    setCondition(newCond);
    if (activeProduct) {
      calculatePreview(activeProduct.id, newCond, accessories);
    }
  };

  const handleAccessoryToggle = (key) => {
    const next = { ...accessories, [key]: !accessories[key] };
    setAccessories(next);
    if (activeProduct) {
      calculatePreview(activeProduct.id, condition, next);
    }
  };

  const handleConfirmAddToCart = async () => {
    if (!activeProduct) return;
    setIsAdding(true);
    try {
      await addItem({
        productId: activeProduct.id,
        productName: activeProduct.name,
        category: activeProduct.category,
        condition,
        accessories,
        customerNotes: itemNotes
      });
      setActiveProduct(null);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            — CATÁLOGO DE COMPRA MÉXICO —
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Valúa tus Consolas, Juegos y TVs CRT
          </h1>
          <p className="text-sm text-slate-600">
            Busca tu modelo, ajusta su estado y obtén una cotización inmediata garantizada en MXN.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por modelo, consola o título (ej. PS5, Zelda, Trinitron)..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Non-catalogue Custom Link */}
            <button
              onClick={onOpenCustomQuote}
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              ¿No encuentras tu artículo? Cotizar manualmente
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos los Artículos
            </button>

            <button
              onClick={() => setSelectedCategory('consoles')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'consoles'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" /> Consolas
            </button>

            <button
              onClick={() => setSelectedCategory('video_games')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'video_games'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Disc className="w-3.5 h-3.5" /> Videojuegos
            </button>

            <button
              onClick={() => setSelectedCategory('accessories')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'accessories'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Accesorios y Mandos
            </button>

            <button
              onClick={() => setSelectedCategory('retro_tvs')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === 'retro_tvs'
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Tv className="w-3.5 h-3.5" /> Televisores CRT Retro
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-slate-500 font-medium">Cargando catálogo actualizado...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-800">No encontramos resultados para tu búsqueda</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Si tienes una edición especial o un artículo retro que no figura en la lista, puedes enviar una solicitud personalizada con fotos.
            </p>
            <button
              onClick={onOpenCustomQuote}
              className="px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-500 transition-all"
            >
              Cotizar Artículo No Catalogado
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="card-hover bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-amber-400 transition-all group"
              >
                <div>
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-50 mb-4 flex items-center justify-center p-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-900 text-amber-400">
                      {product.platform || product.category}
                    </span>
                    {product.isCRT && (
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                        {product.weightKg ? `${product.weightKg} kg` : 'CRT Pesado'}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                    {product.brand} {product.model ? `• ${product.model}` : ''}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pagamos hasta</span>
                    <span className="text-lg font-black text-amber-600">
                      {formatMXN(product.baseBuyPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartEstimate(product)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* ESTIMATE MODAL / CALCULATOR CONFIGURATOR (AC-03) */}
      {/* ======================================================== */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex gap-3 items-center">
                <img
                  src={activeProduct.imageUrl}
                  alt={activeProduct.name}
                  className="w-14 h-14 rounded-xl object-contain bg-slate-100 p-1"
                />
                <div>
                  <span className="text-[11px] font-bold text-amber-600 uppercase">Configurar Cotización</span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                    {activeProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500">{activeProduct.platform} • {activeProduct.brand}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveProduct(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="py-5 space-y-6">
              
              {/* 1. Condition Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
                  <span>1. Estado Físico y Operativo:</span>
                  <span className="text-amber-600 font-semibold normal-case">Multiplicador oficial aplicado</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeProduct.category === 'video_games' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => handleConditionChange('sealed')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'sealed'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Nuevo / Sellado (+25%)</div>
                        <div className="text-[11px] text-slate-500">Con plástico original intacto</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConditionChange('cib')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'cib'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Completo en Caja (CIB)</div>
                        <div className="text-[11px] text-slate-500">Caja, portada y disco/cartucho</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConditionChange('box_game')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'box_game'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Con Caja / Sin Manual</div>
                        <div className="text-[11px] text-slate-500">Le falta folleto o manual</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConditionChange('game_only')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'game_only'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Sólo Disco / Cartucho Suelto</div>
                        <div className="text-[11px] text-slate-500">Sin caja original</div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleConditionChange('like_new')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'like_new'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Excelente / Como Nuevo (100%)</div>
                        <div className="text-[11px] text-slate-500">Sin rayones visibles, probado</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConditionChange('good')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'good'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Buen Estado (Uso Normal 85%)</div>
                        <div className="text-[11px] text-slate-500">Micro-detalles estéticos leves</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConditionChange('fair')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'fair'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Desgaste Cosmético (70%)</div>
                        <div className="text-[11px] text-slate-500">Marcas visibles pero funciona</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleConditionChange('damaged')}
                        className={`p-3 rounded-xl border text-left text-xs transition-all ${
                          condition === 'damaged'
                            ? 'border-amber-500 bg-amber-50/80 font-bold text-amber-900 ring-2 ring-amber-400/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-bold">Con Detalles / Falla (40%)</div>
                        <div className="text-[11px] text-slate-500">Drift en sticks, puertos flojos</div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* 2. Accessories & Extras (Adjustments) */}
              {activeProduct.accessoryAdjustments && Object.keys(activeProduct.accessoryAdjustments).length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    2. Accesorios y Componentes Incluidos:
                  </label>

                  <div className="space-y-2">
                    {Object.entries(activeProduct.accessoryAdjustments).map(([key, val]) => (
                      <label
                        key={key}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/80 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={Boolean(accessories[key])}
                            onChange={() => handleAccessoryToggle(key)}
                            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span className="font-medium text-slate-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </span>
                        </div>
                        <span className={`font-bold ${val > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                          {val > 0 ? `+${formatMXN(val)}` : formatMXN(val)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* CRT Special Warning */}
              {activeProduct.isCRT && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300/80 flex items-start gap-2.5 text-xs text-amber-900">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Aviso Especial para Televisores CRT:</strong> Debido a su peso ({activeProduct.weightKg || 40} kg) y fragilidad de vidrio al vacío, coordinaremos recolección en planta baja o tarima protectora una vez revisadas tus fotos.
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Notas sobre el estado de tu artículo (opcional):
                </label>
                <input
                  type="text"
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                  placeholder="Ej. Incluye control camuflado y cable HDMI 2.1..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Live Price Display */}
              <div className="p-4 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Estimado en Tiempo Real</span>
                  <div className="text-2xl font-black text-amber-400">
                    {formatMXN(calculatedAmount)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-400 max-w-[180px]">
                  Validado por el servidor bajo reglas oficiales de Lion Games & TVs.
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmAddToCart}
                disabled={isAdding}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-500 shadow-md shadow-amber-500/25 transition-all flex items-center gap-2"
              >
                <span>{isAdding ? 'Agregando...' : 'Agregar al Carrito de Venta'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
