import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  Truck, 
  FileText, 
  Tv, 
  CheckCircle2, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Phone,
  ArrowRight
} from 'lucide-react';

export function HowItWorksPage({ setView }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E59819]">
            — PROCESO TRANSPARENTE —
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
            ¿Cómo Funciona RetroCompra en México?
          </h1>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto">
            Convertimos tus consolas, videojuegos usados y televisores CRT en valor de manera sencilla, justa y transparente.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm flex gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-black font-black flex items-center justify-center shrink-0 text-lg">
              1
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 font-display">1. Selecciona y Cotiza en Línea</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Navega en nuestro catálogo, elige tu modelo (Nintendo, PlayStation, Xbox, Sega, Vintage o CRT retro) y configura su estado y accesorios incluidos. Obtendrás un estimado instantáneo validado en Pesos Mexicanos (MXN).
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm flex gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-black font-black flex items-center justify-center shrink-0 text-lg">
              2
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 font-display">2. Envía tu Solicitud con Fotos</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Sube fotos de tus artículos (frente, número de serie y accesorios) y tus datos en la República Mexicana. Se generará tu folio oficial (REQ-2026-XXXX). <strong>Importante: No envíes nada todavía.</strong>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm flex gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-black font-black flex items-center justify-center shrink-0 text-lg">
              3
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 font-display">3. Aprobación Formal de Envío (AC-09)</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Nuestros valuadores analizan tus fotografías. Una vez aprobado, recibirás tu guía de paquetería prepagada (Estafeta, DHL o logística de tarima para CRTs pesados) con instrucciones de embalaje seguro.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm flex gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-black font-black flex items-center justify-center shrink-0 text-lg">
              4
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-neutral-900 font-display">4. Inspección Técnica y Depósito Inmediato</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Al llegar a nuestra bodega central en CDMX, técnicos especializados verifican el funcionamiento y cosmética. Si todo coincide, ratificamos la oferta y transferimos de inmediato a tu cuenta bancaria. Si existe alguna discrepancia, emitimos una oferta revisada que puedes aceptar o rechazar libremente con devolución asegurada.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => setView('consoles')}
            className="px-8 py-3.5 rounded-2xl font-bold text-xs bg-[#F5A623] hover:bg-[#E59819] text-black shadow-lg shadow-[#F5A623]/25 hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>Iniciar Mi Cotización Ahora</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E59819]">
            — NUESTRA HISTORIA —
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
            Acerca de RetroCompra México
          </h1>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto">
            Impulsando la economía circular del videojuego y la preservación del retrogaming en México.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-6 text-neutral-700 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong>RetroCompra</strong> nació en la Ciudad de México con una misión clara: ofrecer a los jugadores y coleccionistas una alternativa profesional, segura y transparente para vender sus consolas, videojuegos y televisores de tubo CRT coleccionables.
          </p>
          <p>
            A diferencia de los tianguis informales o plataformas de compraventa donde abundan fraudes y regateos sin garantía, nosotros operamos bajo un modelo institucional de <strong>comercio electrónico inverso (Customer-to-Business)</strong>. Cada artículo que compramos es revisado por técnicos certificados, restaurado con refacciones de calidad y reintegrado a la apasionada comunidad de videojugadores.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-100">
            <div className="p-4 rounded-2xl bg-amber-50 text-center space-y-1">
              <span className="text-2xl font-black text-[#B87406] font-mono">+12,000</span>
              <p className="text-xs font-bold text-neutral-800">Juegos y Consolas Valuados</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 text-center space-y-1">
              <span className="text-2xl font-black text-[#B87406] font-mono">32</span>
              <p className="text-xs font-bold text-neutral-800">Estados de México Cubiertos</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 text-center space-y-1">
              <span className="text-2xl font-black text-[#B87406] font-mono">100%</span>
              <p className="text-xs font-bold text-neutral-800">Decisión Libre del Vendedor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E59819]">
            — CENTRO DE AYUDA —
          </span>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight font-display">
            Preguntas Frecuentes
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-6 text-xs sm:text-sm">
          <div className="space-y-1.5 pb-4 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">¿Por qué no piden mis datos bancarios al llenar el formulario?</h3>
            <p className="text-neutral-600">
              Conforme a la especificación de seguridad de RetroCompra, no recopilamos datos bancarios, CLABE ni SPEI en el formulario web para máxima protección de tu privacidad. El finiquito y transferencia se gestionan de común acuerdo una vez que los artículos han sido formalmente aprobados en la inspección física.
            </p>
          </div>

          <div className="space-y-1.5 pb-4 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">¿Qué pasa si mi televisor CRT pesa más de 30 kilos?</h3>
            <p className="text-neutral-600">
              Contamos con convenios con fleteras de carga consolidada (Transportes Castores / Tres Guerras) para recolección en planta baja con empaque reforzado en tarima. Requerimos fotos del televisor encendido para autorizar el servicio.
            </p>
          </div>

          <div className="space-y-1.5 pb-4 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">¿Qué sucede si no estoy de acuerdo con una oferta revisada?</h3>
            <p className="text-neutral-600">
              Tienes el derecho total de rechazarla mediante el botón "Rechazar y Solicitar Devolución" en tu portal de seguimiento. Nuestro personal coordinará el retorno seguro de tus pertenencias.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="text-3xl font-black text-neutral-900 font-display">Términos y Condiciones de Servicio (México)</h1>
        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-4 text-xs text-neutral-600 leading-relaxed">
          <p><strong>Versión: 1.2-MEX-2026 • Última actualización: Noviembre 2026</strong></p>
          <p>El presente documento regula el uso de la plataforma digital operada por RetroCompra en los Estados Unidos Mexicanos.</p>
          <p>1. <strong>Valuaciones e Inspección:</strong> Toda cotización generada en el sitio es preliminar y de carácter ilustrativo. Ningún compromiso comercial se perfecciona hasta la recepción física y comprobación de autenticidad en el laboratorio técnico.</p>
          <p>2. <strong>Reglas de Envío:</strong> Queda estrictamente prohibido al usuario remitir paquetes a las instalaciones de la empresa sin previa autorización escrita y emisión de guía oficial por el personal autorizado.</p>
          <p>3. <strong>Retención y Propiedad:</strong> En ningún caso la empresa asumirá propiedad de los bienes por mero transcurso de tiempo sin la voluntad expresa del cliente.</p>
        </div>
      </div>
    </div>
  );
}

export function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="text-3xl font-black text-neutral-900 font-display">Política de Envío, Recepción e Inspección</h1>
        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-4 text-xs text-neutral-600 leading-relaxed">
          <p>1. <strong>Aprobación Previa Obligatoria:</strong> Los envíos se gestionan únicamente tras la revisión fotográfica por el departamento de compras.</p>
          <p>2. <strong>Embalaje Recomendado:</strong> Consolas y mandos deben protegerse con al menos 3 capas de plástico de burbujas en caja de cartón doble corrugado sin holguras.</p>
          <p>3. <strong>Protocolo Especial para Monitores y CRT:</strong> Televisores de más de 20 pulgadas requieren flejado en tarima de madera. No se aceptan envíos sin protección frontal del cinescopio.</p>
        </div>
      </div>
    </div>
  );
}
