import React from 'react';
import { X, Trash2, ArrowRight, PlusCircle, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatMXN } from '../utils/formatters';

export default function SellingCartDrawer({ onProceedToSubmit, onAddMore }) {
  const { 
    items, 
    removeItem, 
    updateItemCondition, 
    totalEstimate, 
    itemCount, 
    isCartOpen, 
    closeCart,
    isSyncing 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-5 bg-black text-white flex items-center justify-between border-b border-neutral-900">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#F5A623]/20 text-[#F5A623] flex items-center justify-center font-black">
                {itemCount}
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight font-display">Tu Carrito de Venta</h3>
                <p className="text-[11px] text-neutral-400">Precios estimados en Pesos Mexicanos (MXN)</p>
              </div>
            </div>

            <button 
              onClick={closeCart}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sync indicator */}
          {isSyncing && (
            <div className="bg-amber-50 px-4 py-1.5 text-xs text-amber-800 flex items-center justify-center gap-2 border-b border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Recalculando estimación oficial del servidor...
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <PlusCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">Tu carrito de venta está vacío</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                    Selecciona tus consolas, videojuegos o televisores CRT para obtener tu cotización estimada.
                  </p>
                </div>
                <button
                  onClick={() => { closeCart(); onAddMore(); }}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-amber-400 text-slate-950 hover:bg-amber-500 shadow-md transition-all"
                >
                  Explorar Catálogo y Cotizar
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.itemId}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-amber-400/50 transition-all space-y-3"
                >
                  <div className="flex gap-3">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.productName} 
                        className="w-16 h-16 rounded-lg object-cover bg-slate-200 shrink-0" 
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0">
                        RETRO
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 leading-tight truncate">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.platform || item.brand || 'Coleccionable'}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-base font-black text-amber-600">
                          {formatMXN(item.calculatedEstimate)}
                        </span>
                        <button
                          onClick={() => removeItem(item.itemId)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                          title="Eliminar artículo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Condition selector inside cart */}
                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <label className="text-[11px] font-semibold text-slate-500 uppercase">
                      Estado:
                    </label>
                    <select
                      value={item.condition}
                      onChange={(e) => updateItemCondition(item.itemId, e.target.value)}
                      className="text-xs rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium"
                    >
                      <option value="like_new">Excelente / Como Nuevo</option>
                      <option value="good">Buen Estado (Uso normal)</option>
                      <option value="fair">Regular / Desgaste Cosmético</option>
                      <option value="damaged">Dañado / Con Detalles</option>
                      <option value="untested">Sin Probar / Para Piezas</option>
                      {item.category === 'video_games' && (
                        <>
                          <option value="cib">Completo en Caja (CIB)</option>
                          <option value="sealed">Nuevo / Sellado</option>
                          <option value="game_only">Cartucho/Disco Suelto</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              
              {/* Disclaimer per SRS 1.2 */}
              <div className="flex gap-2.5 p-3 rounded-lg bg-amber-50/80 border border-amber-200/60 text-amber-900 text-[11px] leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Estimado no vinculante:</strong> El monto final depende de la inspección física de funcionalidad, número de serie y cosmética en bodega.
                </div>
              </div>

              {/* Total Calculation */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs text-slate-500 font-semibold uppercase">Total Estimado ({itemCount} {itemCount === 1 ? 'artículo' : 'artículos'}):</span>
                  <div className="text-2xl font-black text-slate-900">
                    {formatMXN(totalEstimate)}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> Sin comisiones ocultas
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    closeCart();
                    onProceedToSubmit();
                  }}
                  className="btn-shimmer w-full py-3.5 px-4 rounded-xl font-bold text-xs tracking-wide text-black bg-gradient-to-r from-[#F5A623] via-[#E59819] to-[#D48806] hover:brightness-105 shadow-lg shadow-[#F5A623]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>Continuar a Solicitud de Venta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    closeCart();
                    onAddMore();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-neutral-700 bg-white border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  + Agregar más consolas o juegos a la venta
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
