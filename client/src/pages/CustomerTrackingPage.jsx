import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  FileText, 
  Camera, 
  MessageCircle,
  HelpCircle
} from 'lucide-react';
import { api } from '../services/api';
import { formatMXN, formatDate, STATUS_MAP } from '../utils/formatters';

export default function CustomerTrackingPage({ initialRequestId = '', initialEmail = '' }) {
  const [requestId, setRequestId] = useState(initialRequestId);
  const [email, setEmail] = useState(initialEmail);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [decisionSubmitting, setDecisionSubmitting] = useState(false);

  useEffect(() => {
    if (initialRequestId) {
      handleLookup(initialRequestId, initialEmail);
    }
  }, [initialRequestId]);

  const handleLookup = async (idToLookup, emailToLookup) => {
    const targetId = (idToLookup || requestId).trim();
    if (!targetId) {
      setErrorMsg('Por favor introduce tu número de folio (ej. REQ-2026-8801).');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await api.trackRequest(targetId, emailToLookup || email);
      if (res.request) {
        setRequest(res.request);
      } else {
        setErrorMsg(res.error || 'No se encontró la solicitud.');
        setRequest(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al consultar el servidor.');
      setRequest(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle customer decision on revised or preliminary offer (AC-11)
  const handleDecision = async (decision, offerType) => {
    if (!request) return;
    setDecisionSubmitting(true);
    try {
      const res = await api.submitCustomerDecision(request.id, decision, offerType);
      if (res.request) {
        setRequest(res.request);
      }
    } catch (err) {
      console.error(err);
      alert('Error al registrar la decisión.');
    } finally {
      setDecisionSubmitting(false);
    }
  };

  const statusInfo = request ? (STATUS_MAP[request.status] || {
    label: request.statusLabel || request.status,
    color: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'En proceso operativo.'
  }) : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-10 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            — PORTAL DE SEGUIMIENTO C2B —
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Consulta el Estatus de tu Solicitud
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Ingresa tu número de folio oficial (REQ-2026-XXXX) para revisar la revisión, guía de envío o dictamen de inspección.
          </p>
        </div>

        {/* Search Bar Box */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-8">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleLookup(); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value.toUpperCase())}
                placeholder="Folio de Solicitud (ej. REQ-2026-8801)..."
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="sm:w-64">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico (opcional)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-500 shadow-md transition-all shrink-0"
            >
              {loading ? 'Consultando...' : 'Buscar Folio'}
            </button>
          </form>

          {/* Demo Folio Quick Pills */}
          <div className="pt-3 border-t border-slate-100 mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span>Folios de demostración rápida:</span>
            <button
              type="button"
              onClick={() => { setRequestId('REQ-2026-8801'); handleLookup('REQ-2026-8801'); }}
              className="font-mono px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-200"
            >
              REQ-2026-8801 (En Revisión)
            </button>
            <button
              type="button"
              onClick={() => { setRequestId('REQ-2026-8802'); handleLookup('REQ-2026-8802'); }}
              className="font-mono px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-200"
            >
              REQ-2026-8802 (Envío Aprobado)
            </button>
            <button
              type="button"
              onClick={() => { setRequestId('REQ-2026-8803'); handleLookup('REQ-2026-8803'); }}
              className="font-mono px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-200"
            >
              REQ-2026-8803 (Oferta Revisada AC-11)
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold mb-6 flex items-center gap-2">
            <XCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Request Details View */}
        {request && (
          <div className="space-y-6">
            
            {/* Top Status Banner */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-mono font-black text-slate-900">
                      {request.id}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Registrado el: {formatDate(request.createdAt)}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Monto Valuado</span>
                  <span className="text-2xl font-black text-amber-600">
                    {formatMXN(request.revisedOffer ? request.revisedOffer.revisedAmount : request.totalEstimatedAmount)}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {statusInfo.description}
              </p>
            </div>

            {/* ======================================================== */}
            {/* REVISED OFFER DECISION BANNER (AC-11: Explicit Decision) */}
            {/* ======================================================== */}
            {request.status === 'REVISED_OFFER_SENT' && request.revisedOffer && (
              <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-lg space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      ACCIÓN REQUERIDA DEL CLIENTE (SRS 6.5 / AC-11)
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-amber-950 leading-tight">
                      Propuesta de Oferta Revisada tras Inspección Física
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-amber-200">
                  <div>
                    <span className="text-xs text-slate-400 block">Estimado Inicial Preliminar:</span>
                    <strike className="text-lg font-bold text-slate-400">
                      {formatMXN(request.revisedOffer.originalAmount)}
                    </strike>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-800 block">Nueva Oferta Revisada:</span>
                    <span className="text-2xl font-black text-amber-600">
                      {formatMXN(request.revisedOffer.revisedAmount)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-700 block">
                    Motivo técnico del ajuste determinado en laboratorio:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 bg-white p-3.5 rounded-xl border border-amber-200 leading-relaxed italic">
                    "{request.revisedOffer.reason}"
                  </p>
                </div>

                {/* Evidence photos if present */}
                {request.inspection?.inspectionEvidenceUrls?.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 block">
                      Evidencia fotográfica tomada por el inspector:
                    </span>
                    <div className="flex gap-3">
                      {request.inspection.inspectionEvidenceUrls.map((url, i) => (
                        <img 
                          key={i} 
                          src={url} 
                          alt="Evidencia técnica" 
                          className="w-20 h-20 rounded-xl object-cover border border-amber-300" 
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-3 rounded-xl bg-white/80 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                  <strong>Política de Decisión Libre:</strong> No asumimos aceptación tácita ni forzada. Si aceptas, confirmaremos la compra por el nuevo monto. Si rechazas, te devolveremos tus artículos sin penalización.
                </div>

                {/* Acceptance / Rejection Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => handleDecision('ACCEPT', 'revised')}
                    disabled={decisionSubmitting}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Aceptar Oferta Revisada ({formatMXN(request.revisedOffer.revisedAmount)})</span>
                  </button>

                  <button
                    onClick={() => handleDecision('REJECT', 'revised')}
                    disabled={decisionSubmitting}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Rechazar y Solicitar Devolución</span>
                  </button>
                </div>
              </div>
            )}

            {/* Revised Offer Accepted or Rejected Message */}
            {request.revisedOffer?.customerDecision && (
              <div className={`p-5 rounded-2xl border ${
                request.revisedOffer.customerDecision === 'ACCEPTED'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {request.revisedOffer.customerDecision === 'ACCEPTED' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span>
                    Decisión registrada: {request.revisedOffer.customerDecision === 'ACCEPTED' ? 'Oferta Aceptada por el Cliente' : 'Oferta Rechazada - Retorno Solicitado'}
                  </span>
                </div>
                <p className="text-xs mt-1">
                  Fecha de decisión: {formatDate(request.revisedOffer.customerDecisionAt)}
                </p>
              </div>
            )}

            {/* ======================================================== */}
            {/* SHIPPING INSTRUCTIONS (AC-09: Only when approved!) */}
            {/* ======================================================== */}
            {request.shippingApproval?.approved ? (
              <div className="bg-sky-50 rounded-3xl p-6 sm:p-8 border border-sky-200 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-black">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                      ENVÍO FORMALMENTE APROBADO (AC-09)
                    </span>
                    <h3 className="text-lg font-bold text-sky-950">
                      Instrucciones de Despacho y Guía Asignada
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-2xl border border-sky-100 text-xs">
                  <div>
                    <span className="text-slate-400 block">Transportista / Paquetería:</span>
                    <strong className="text-slate-900 text-sm">{request.shippingApproval.carrier}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Número de Guía / Rastreo:</span>
                    <strong className="text-sky-700 text-sm font-mono">{request.shippingApproval.trackingNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Referencia de Etiqueta:</span>
                    <span className="text-slate-800">{request.shippingApproval.labelReference || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Fecha de Aprobación:</span>
                    <span className="text-slate-800">{formatDate(request.shippingApproval.approvedAt)}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-sky-950 block mb-1">
                    Instrucciones Especiales de Empaque:
                  </span>
                  <p className="text-xs text-sky-900 bg-white p-3.5 rounded-xl border border-sky-100 leading-relaxed">
                    {request.shippingApproval.instructions || 'Empacar con abundante plástico de burbujas en caja de cartón rígida.'}
                  </p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-sky-100 text-xs text-slate-600 space-y-1">
                  <strong className="text-slate-900">Dirección de Destino (Bodega Central RetroCompra):</strong>
                  <p>Av. Cuitláhuac 240, Nave 4, Col. San Salvador Xochimanca, Azcapotzalco, CDMX, C.P. 02870, México.</p>
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 text-amber-900 text-xs space-y-1">
                <strong>Estatus de Envío: En Espera de Validación por el Personal</strong>
                <p className="text-amber-800">
                  De acuerdo con el requisito AC-09, ninguna guía ni instrucción de envío se emite automáticamente. Un valuador revisará tus fotografías y te notificará por correo en cuanto esté autorizado el transporte.
                </p>
              </div>
            )}

            {/* Items in Request */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100">
                Artículos Incluidos en esta Solicitud ({request.items.length})
              </h3>

              <div className="space-y-3">
                {request.items.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{item.productName}</h4>
                      <p className="text-slate-500 mt-0.5">Estado declarado: {item.conditionLabel}</p>
                      {item.customerNotes && (
                        <p className="text-slate-600 italic mt-1">"{item.customerNotes}"</p>
                      )}
                    </div>
                    <span className="text-base font-black text-amber-600">
                      {formatMXN(item.calculatedEstimate)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status History / Audit Trail */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Historial de Actualizaciones del Trámite</span>
              </h3>

              <div className="space-y-3">
                {request.statusHistory?.map((entry, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{entry.status}</span>
                        <span className="text-slate-400">• {formatDate(entry.timestamp)}</span>
                      </div>
                      <p className="text-slate-600">{entry.notes}</p>
                      <span className="text-[10px] text-slate-400">Por: {entry.changedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
