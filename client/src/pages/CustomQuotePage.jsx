import React, { useState } from 'react';
import { Plus, ArrowLeft, Upload, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';

export default function CustomQuotePage({ onBackToCatalogue }) {
  const { addItem } = useCart();
  const [formData, setFormData] = useState({
    title: '',
    category: 'consoles',
    platform: '',
    condition: 'good',
    suggestedPrice: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      await addItem({
        productId: 'custom',
        productName: formData.title.trim(),
        category: formData.category,
        condition: formData.condition,
        customData: {
          title: formData.title.trim(),
          category: formData.category,
          suggestedPrice: Number(formData.suggestedPrice) || 500,
          description: formData.description
        },
        customerNotes: `[Cotización Manual] Plataforma: ${formData.platform || 'N/A'}. ${formData.description}`
      });
      setAddedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <button
          onClick={onBackToCatalogue}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Regresar al catálogo
        </button>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              — COTIZACIÓN PERSONALIZADA —
            </span>
            <h1 className="font-hero-gaming text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              ¿Tienes un artículo no listado?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Ediciones de colección, consolas retro japonesas o americanas, accesorios vintage o pantallas CRT especiales.
            </p>
          </div>

          {addedSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-emerald-900">
                  ¡Artículo agregado al carrito de venta!
                </h3>
                <p className="text-xs text-emerald-700 mt-1 max-w-sm mx-auto">
                  Aparece ahora en tu carrito. Podrás subir fotografías reales y especificar el domicilio de recolección en el siguiente paso.
                </p>
              </div>
              <button
                onClick={onBackToCatalogue}
                className="px-6 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition-all"
              >
                Volver al Catálogo
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nombre del Producto o Título del Juego / TV: *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej. Nintendo 64 Pikachu Edition / Sony PVM 20M2U"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Categoría:
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="consoles">Consola de Videojuegos</option>
                    <option value="video_games">Videojuego / Cartucho / Disco</option>
                    <option value="accessories">Accesorio o Mando</option>
                    <option value="retro_tvs">Televisor CRT Retro</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Plataforma / Marca:
                  </label>
                  <input
                    type="text"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    placeholder="Ej. Sega Genesis, Sony PVM, SNES"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Estado Aproximado:
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    <option value="like_new">Excelente / Como Nuevo</option>
                    <option value="good">Buen Estado (Funcional)</option>
                    <option value="fair">Desgaste Cosmético / Marcas</option>
                    <option value="damaged">Con Falla / Dañado</option>
                    <option value="untested">Sin Probar / Para Piezas</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Monto Aproximado que Esperas (MXN):
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={formData.suggestedPrice}
                    onChange={(e) => setFormData({ ...formData, suggestedPrice: e.target.value })}
                    placeholder="Ej. 1200"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Descripción Detallada y Accesorios que Incluye:
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles sobre cables, controles, si enciende, detalles en pantalla, etc..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Revisión Manual por Especialistas:</strong> Nuestro equipo de compras analizará las fotos que adjuntes en el siguiente paso para emitir una oferta preliminar personalizada.
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{isSubmitting ? 'Guardando...' : 'Agregar a Mi Venta'}</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
