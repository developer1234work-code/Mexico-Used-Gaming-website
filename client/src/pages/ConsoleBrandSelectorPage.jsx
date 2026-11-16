import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Gamepad2, 
  ArrowRight, 
  Sparkles, 
  Plus, 
  Flame, 
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import { formatMXN } from '../utils/formatters';

const BRANDS = [
  { id: 'all', name: 'Todas las Marcas Retro', count: 'Catálogo Oficial' },
  { id: 'Nintendo', name: 'Nintendo', count: '31 Modelos', color: 'text-red-500' },
  { id: 'PlayStation', name: 'Sony PlayStation Retro', count: 'PS1 & PS2', color: 'text-blue-500' },
  { id: 'Xbox', name: 'Xbox Clásico (Original)', count: 'Xbox 2001', color: 'text-emerald-500' },
  { id: 'Sega', name: 'Sega Retro', count: '6 Modelos', color: 'text-sky-500' }
];

export default function ConsoleBrandSelectorPage({ 
  initialBrand = 'all', 
  onSelectConsole, 
  onOpenCustomQuote,
  onOpenSpecialEditions
}) {
  const [consoles, setConsoles] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedBrand(initialBrand);
  }, [initialBrand]);

  useEffect(() => {
    fetchConsoles();
  }, [selectedBrand, searchQuery]);

  async function fetchConsoles() {
    setLoading(true);
    try {
      const res = await api.getProducts({
        category: 'consoles',
        brand: selectedBrand === 'all' ? undefined : selectedBrand,
        search: searchQuery
      });
      if (res.products) {
        setConsoles(res.products);
      }
    } catch (err) {
      console.error('Error fetching consoles:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#E59819] block">
            — VENDE TUS CONSOLAS EN MÉXICO —
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight font-display">
            Selecciona tu Marca y Sistema
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Compramos todas las generaciones de consolas clásicas y modernas. 
            Elige tu modelo para configurar su estado y sumar tus accesorios originales.
          </p>
        </div>

        {/* Brand Selector Toolbar */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-neutral-200/90 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por consola (ej. N64, PS2 Slim, GameCube, Xbox Series)..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50/50 text-xs text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Special Edition Prompt */}
            <button
              onClick={onOpenSpecialEditions}
              className="text-xs font-bold text-[#B87406] bg-amber-50 hover:bg-amber-100 border border-[#F0C068] px-4 py-3 rounded-2xl flex items-center gap-2 transition-all shrink-0"
            >
              <Flame className="w-4 h-4 fill-current text-[#F5A623]" />
              <span>¿Tienes una edición especial? Consulta precios aquí</span>
            </button>
          </div>

          {/* Brand Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-100">
            {BRANDS.map((b) => {
              const isSelected = selectedBrand === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-black text-[#F5A623] shadow-md scale-[1.02]'
                      : 'bg-neutral-100/80 text-neutral-600 hover:bg-neutral-200/70 hover:text-neutral-900'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>{b.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-neutral-800 text-amber-300' : 'bg-white text-neutral-500'
                  }`}>
                    {b.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Consoles Grid */}
        {loading ? (
          <div className="py-24 text-center space-y-3">
            <div className="w-9 h-9 border-3 border-[#F5A623] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-neutral-500 font-semibold">Cargando sistemas disponibles...</p>
          </div>
        ) : consoles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 space-y-4">
            <h3 className="text-base font-bold text-neutral-800">
              No encontramos una consola que coincida con tu búsqueda
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Si tu consola es una edición rara o modificada que no figura en la lista, puedes enviarla a valuación personalizada.
            </p>
            <button
              onClick={onOpenCustomQuote}
              className="px-6 py-3 rounded-2xl bg-[#F5A623] text-black font-bold text-xs hover:bg-[#E59819] transition-all"
            >
              Cotizar Consola No Catalogada
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {consoles.map((consoleItem) => (
              <div
                key={consoleItem.id}
                onClick={() => onSelectConsole(consoleItem)}
                className="card-premium group cursor-pointer bg-white rounded-3xl border border-neutral-200/90 p-5 flex flex-col justify-between shadow-sm hover:border-[#F5A623] transition-all"
              >
                <div>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-neutral-50/80 mb-4 flex items-center justify-center p-3 border border-neutral-100 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={consoleItem.imageUrl}
                      alt={consoleItem.name}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black text-[#F5A623]">
                      {consoleItem.brand}
                    </span>
                    {consoleItem.editions && consoleItem.editions.length > 1 && (
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-[#B87406]">
                        {consoleItem.editions.length} Versiones
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-black text-neutral-900 group-hover:text-[#B87406] transition-colors line-clamp-2 font-display">
                    {consoleItem.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-medium mt-0.5">
                    {consoleItem.model}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider block">
                      Pagamos hasta
                    </span>
                    <span className="text-base font-black text-neutral-900">
                      {formatMXN(consoleItem.baseBuyPrice)}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-black text-[#F5A623] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F5A623] group-hover:text-black transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
