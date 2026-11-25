import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Upload, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Camera, 
  Lock,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { formatMXN } from '../utils/formatters';

const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas',
  'Chihuahua', 'Ciudad de México (CDMX)', 'Coahuila', 'Colima', 'Durango',
  'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de México',
  'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz',
  'Yucatán', 'Zacatecas'
];

export default function SubmitRequestPage({ onSubmissionSuccess, onBackToCart }) {
  const { items, totalEstimate, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    city: '',
    state: 'Ciudad de México (CDMX)',
    postalCode: '',
    streetAddress: ''
  });

  const [customerNotes, setCustomerNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Photo uploads
  const [photos, setPhotos] = useState([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhotoUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingPhotos(true);
    setErrorMsg('');
    try {
      const res = await api.uploadPhotos(files);
      if (res.photos) {
        setPhotos(prev => [...prev, ...res.photos]);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al subir fotografías. Asegúrate de que sean formato JPG, PNG o WEBP menores a 10MB.');
    } finally {
      setUploadingPhotos(false);
    }
  };

  const removePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMsg('Tu carrito de venta está vacío.');
      return;
    }
    if (!termsAccepted) {
      setErrorMsg('Debes aceptar los Términos y Condiciones para continuar.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        customer,
        items,
        photos: photos.map(p => ({
          url: p.url,
          label: p.originalName || 'Foto del artículo'
        })),
        customerNotes,
        termsAccepted: true
      };

      const res = await api.submitSellRequest(payload);

      if (res.requestId) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {}

        clearCart();
        onSubmissionSuccess(res.request);
      } else {
        setErrorMsg(res.error || 'Ocurrió un error al procesar tu solicitud.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de conexión al enviar la solicitud.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="mb-8 text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
            — FINALIZAR SOLICITUD DE RECOMPRA —
          </span>
          <h1 className="font-hero-gaming text-3xl font-black text-slate-900 tracking-tight">
            Datos de Contacto y Envío en México
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Por favor ingresa tus datos reales para coordinar la guía de paquetería y la cotización definitiva.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Summary of Items */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                1. Resumen de Artículos a Vender ({items.length})
              </h2>
              <button
                type="button"
                onClick={onBackToCart}
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 underline"
              >
                Editar carrito
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.itemId} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{item.productName}</span>
                    <span className="text-slate-500 block">
                      Estado: {item.conditionLabel}
                    </span>
                  </div>
                  <span className="font-black text-amber-600 text-sm">
                    {formatMXN(item.calculatedEstimate)}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F19] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Estimado Inicial:</span>
                <div className="text-2xl font-black text-amber-400">
                  {formatMXN(totalEstimate)}
                </div>
              </div>
              <span className="text-xs text-slate-300">
                Precios en Pesos Mexicanos (MXN)
              </span>
            </div>
          </div>

          {/* Customer Contact Details (SRS 5.2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              2. Datos del Propietario / Contacto
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nombre Completo (como aparece en identificación): *
                </label>
                <input
                  type="text"
                  required
                  value={customer.fullName}
                  onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                  placeholder="Ej. Roberto García Pérez"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Correo Electrónico (para notificaciones y ofertas): *
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Teléfono Móvil: *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="Ej. 55 1234 5678"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Número de WhatsApp (opcional para avisos rápidos):
                </label>
                <input
                  type="tel"
                  value={customer.whatsapp}
                  onChange={(e) => setCustomer({ ...customer, whatsapp: e.target.value })}
                  placeholder="Ej. 55 1234 5678"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Shipping Origin in Mexico (SRS 5.2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500" />
              <span>3. Origen del Envío en la República Mexicana</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Estado: *
                </label>
                <select
                  value={customer.state}
                  onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  {MEXICAN_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Municipio / Alcaldía / Ciudad: *
                </label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  placeholder="Ej. Guadalajara / Benito Juárez"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Código Postal (5 dígitos): *
                </label>
                <input
                  type="text"
                  maxLength="5"
                  required
                  value={customer.postalCode}
                  onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                  placeholder="Ej. 03100"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Calle, Número Exterior e Interior y Colonia (para recolección posterior):
              </label>
              <input
                type="text"
                value={customer.streetAddress}
                onChange={(e) => setCustomer({ ...customer, streetAddress: e.target.value })}
                placeholder="Ej. Av. Insurgentes Sur 1234, Depto 402, Col. Del Valle"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Photo Uploads (SRS 5.2 / AC-06) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  4. Fotografías Reales de tus Artículos (Requerido)
                </h2>
                <p className="text-xs text-slate-500">
                  Sube fotos claras del frente, etiqueta con número de serie, accesorios y detalles visibles.
                </p>
              </div>
              <Camera className="w-5 h-5 text-amber-500" />
            </div>

            {/* Upload Area */}
            <label className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-2xl p-6 text-center flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50 hover:bg-amber-50/20">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm font-bold text-slate-800">
                {uploadingPhotos ? 'Subiendo archivos...' : 'Haz clic para seleccionar o arrastra tus fotos'}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Formatos permitidos: JPG, PNG, WEBP (hasta 10 fotos)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploadingPhotos}
                className="hidden"
              />
            </label>

            {/* Photos Preview Grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {photos.map((photo, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                    <img
                      src={photo.url}
                      alt={`Foto ${idx + 1}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="p-1 text-[10px] text-slate-600 truncate bg-white">
                      {photo.originalName || `Foto ${idx + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customer Notes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900">
              5. Comentarios Adicionales para los Valuadores
            </h2>
            <textarea
              rows="3"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Indica horarios preferidos de contacto, si conservas tickets de compra, etc."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          {/* Legal / Terms of Service (SRS 5.2) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            
            {/* Warning per SRS 1.2 & 6.3 */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300/80 text-amber-950 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Lineamientos Críticos de Recompra RetroCompra:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 pl-1">
                <li>Los precios mostrados son estimaciones preliminares sujetas a revisión técnica física.</li>
                <li><strong>NO debes enviar tus artículos</strong> hasta que un empleado autorizado apruebe formalmente el envío.</li>
                <li>Cualquier ajuste de precio o discrepancia requerirá tu aceptación o rechazo explícito en el portal.</li>
                <li>No se solicita ni procesa ningún pago o número bancario en esta fase inicial.</li>
              </ul>
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 mt-0.5"
              />
              <span className="text-xs text-slate-700 leading-normal">
                He leído y acepto los{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="font-bold text-amber-600 underline hover:text-amber-700"
                >
                  Términos y Condiciones de Compraventa Inversa y Aviso de Privacidad
                </button>{' '}
                (Versión 1.1-MEX-2026). Declaro ser el legítimo propietario de los artículos.
              </span>
            </label>
          </div>

          {/* Final Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center gap-3 hover:scale-[1.01]"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{isSubmitting ? 'Enviando y Generando Folio...' : 'Enviar Solicitud de Venta'}</span>
            </button>
          </div>

        </form>

      </div>

      {/* Terms Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[80vh] overflow-y-auto space-y-4">
            <h3 className="font-black text-lg text-slate-900">
              Términos y Condiciones de Servicio (Versión 1.1 México)
            </h3>
            <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
              <p><strong>1. Naturaleza del Servicio:</strong> RetroCompra opera un modelo de compraventa inversa (Customer-to-Business) en México, adquiriendo videojuegos, consolas y equipo retro pre-poseído para su restauración y coleccionismo.</p>
              <p><strong>2. Carácter No Vinculante del Estimado:</strong> El monto calculado en la plataforma web constituye únicamente una cotización preliminar informativa y no representa una oferta vinculante de compra.</p>
              <p><strong>3. Prohibición de Envío No Autorizado:</strong> Ningún usuario deberá enviar productos sin contar con la aprobación expresa y la guía de paquetería proporcionada por nuestro personal autorizado.</p>
              <p><strong>4. Inspección Física:</strong> A la recepción física de las mercancías, nuestro equipo técnico realiza pruebas de funcionalidad, autenticidad y número de serie.</p>
              <p><strong>5. Ofertas Revisadas y Retorno:</strong> En caso de discrepancias, se emitirá una oferta revisada con exposición de motivos. El cliente tiene el derecho inalienable de aceptarla o rechazarla. En caso de rechazo, se coordina el retorno seguro.</p>
            </div>
            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800"
            >
              Cerrar y Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
