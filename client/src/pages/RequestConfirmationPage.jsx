import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  ShieldAlert, 
  Package, 
  Clock, 
  FileCheck
} from 'lucide-react';
import { formatMXN } from '../utils/formatters';

export default function RequestConfirmationPage({ request, onTrackRequest, onGoHome }) {
  const [copied, setCopied] = useState(false);

  if (!request) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(request.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola equipo de Lion Games & TVs México, acabo de enviar mi solicitud de venta con folio ${request.id} por un total estimado de ${formatMXN(request.totalEstimatedAmount)} MXN.`
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              ¡SOLICITUD REGISTRADA EXITOSAMENTE!
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Hemos recibido tus artículos para valuación
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Se ha enviado un correo de confirmación con los detalles a <strong>{request.customer.email}</strong>.
            </p>
          </div>

          {/* Folio Box */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-2">
            <span className="text-[10px] text-amber-400 uppercase font-black tracking-widest block">
              FOLIO OFICIAL DE SEGUIMIENTO
            </span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-black text-white">
                {request.id}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copiar folio"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Guarda este folio para consultar el estatus en cualquier momento.
            </p>
          </div>

          {/* Summary */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left space-y-2 text-xs">
            <div className="flex justify-between text-slate-700">
              <span>Cliente:</span>
              <strong className="text-slate-900">{request.customer.fullName}</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Origen de Envío:</span>
              <strong className="text-slate-900">{request.customer.city}, {request.customer.state}</strong>
            </div>
            <div className="flex justify-between text-slate-700">
              <span>Artículos:</span>
              <strong className="text-slate-900">{request.items.length} artículos</strong>
            </div>
            <div className="flex justify-between text-amber-900 pt-2 border-t border-amber-200/60 font-black text-sm">
              <span>Monto Estimado Preliminar:</span>
              <span className="text-amber-600 font-black">{formatMXN(request.totalEstimatedAmount)}</span>
            </div>
          </div>

          {/* Critical Shipping Warning (SRS 1.2 & 6.3) */}
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-left flex items-start gap-3 text-xs text-red-900">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong>¡REGLA FUNDAMENTAL DE LOGÍSTICA!</strong>
              <p className="text-red-700 mt-0.5 leading-relaxed">
                <strong>NO envíes tus artículos en este momento.</strong> Nuestro equipo de compras primero revisará tus fotos e información. Una vez validada, recibirás la notificación con la guía de paquetería autorizada e instrucciones de embalaje.
              </p>
            </div>
          </div>

          {/* Next Steps 3-Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <Clock className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-xs text-slate-900">1. Revisión</h4>
              <p className="text-[11px] text-slate-500">Valuadores analizan fotos en 24-48 hrs hábiles.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <FileCheck className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-xs text-slate-900">2. Oferta & Guía</h4>
              <p className="text-[11px] text-slate-500">Aprobamos envío y emitimos guía de paquetería.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
              <Package className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-xs text-slate-900">3. Inspección</h4>
              <p className="text-[11px] text-slate-500">Recepción en bodega y confirmación de oferta.</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onTrackRequest(request.id, request.customer.email)}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Ver Estatus de Mi Solicitud en Vivo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/525587654321?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Notificar al Equipo por WhatsApp</span>
            </a>

            <button
              onClick={onGoHome}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Volver a la Página Principal
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
