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
          <h1 className="font-hero-gaming text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
            ¿Cómo funciona nuestro sistema de compras de tus artículos?
          </h1>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto">
            Convertimos tus consolas retro, videojuegos usados y tvs analógicas CRT en valor de manera sencilla, justa y transparente.
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
                Navega en nuestro catálogo, elige tu modelo (Nintendo, PlayStation retro, Xbox Clásico, Sega o TVs analógicas CRT) y configura su estado y accesorios incluidos. Obtendrás un estimado instantáneo validado en Pesos Mexicanos (MXN).
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
                Nuestros valuadores analizan tus fotografías. Una vez aprobado, recibirás tu guía de paquetería prepagada (Estafeta, DHL o fletera para paquetes) con instrucciones de embalaje seguro.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm flex gap-6 items-start">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-black font-black flex items-center justify-center shrink-0 text-lg">
              4
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-neutral-900 font-display">4. Inspección Técnica y Transferencia</h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Al llegar a nuestra bodega, técnicos especializados verifican el funcionamiento y cosmética. Si todo coincide con lo especificado, ratificamos la oferta y transferimos a tu cuenta bancaria o a tu método de preferencia de 1-3 días hábiles. Si existe alguna discrepancia, emitimos una oferta revisada que puedes aceptar o rechazar libremente con devolución asegurada.
              </p>
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs font-medium leading-relaxed">
                <strong>Nota sobre gastos de envío y devoluciones:</strong> Una vez recibidos los artículos, en caso de arrepentimiento del vendedor (seller's remorse) o cancelación de la venta debido a que los artículos no correspondían con lo previamente descrito, los gastos de envío correrán por cuenta del cliente.
              </div>
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
          <h1 className="font-hero-gaming text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
            Acerca de Lion Games & TVs
          </h1>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto">
            Impulsando la preservación del retrogaming y la compra profesional de videojuegos, consolas y televisores analógicos CRT.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-6 text-neutral-700 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong>Lion Games & TVs</strong> nació con una misión clara: ofrecer a los jugadores y coleccionistas una alternativa profesional, segura y transparente para vender sus consolas retro, videojuegos y televisores de tubo CRT coleccionables.
          </p>
          <p>
            A diferencia de los tianguis informales o plataformas de compraventa donde abundan fraudes y regateos sin garantía, nosotros operamos bajo un modelo institucional de <strong>comercio electrónico inverso (Customer-to-Business)</strong>. Cada artículo que compramos es revisado por técnicos especializados para garantizar una valuación justa y un pago confiable.
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
          <h1 className="font-hero-gaming text-3xl font-black text-neutral-900 tracking-tight font-display">
            Preguntas Frecuentes
          </h1>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-6 text-xs sm:text-sm">
          <div className="space-y-1.5 pb-4 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">¿Por qué no piden mis datos bancarios al llenar el formulario?</h3>
            <p className="text-neutral-600">
              Conforme a la especificación de seguridad LionGamesAndTvs, no recopilamos datos bancarios, CLABE ni SPEI en el formulario web para máxima protección de tu privacidad. El finiquito y transferencia se gestionan de común acuerdo una vez que los artículos han sido formalmente aprobados en la inspección física.
            </p>
          </div>

          <div className="space-y-1.5 pb-4 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">¿Compran televisores CRT analógicos?</h3>
            <p className="text-neutral-600">
              Sí, compramos exclusivamente televisores analógicos de tubo CRT de 12 hasta 21 pulgadas, especialmente modelos temáticos de personajes (como Disney Cars Rayo McQueen, Shrek, Bob Esponja, Mickey Mouse o Batman). El precio de compra varía si incluyen su control remoto temático original correspondiente, combo con reproductor DVD o videocasetera VHS integrada.
            </p>
          </div>

          <div className="space-y-1.5 pb-4 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">¿Qué sucede si no estoy de acuerdo con una oferta revisada?</h3>
            <p className="text-neutral-600">
              Tienes el derecho de aceptar o rechazar libremente la oferta revisada. En caso de discrepancia o arrepentimiento del vendedor al no coincidir el estado físico con lo declarado, los gastos de envío de retorno correrán por cuenta del cliente.
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
        <h1 className="font-hero-gaming text-3xl font-black text-neutral-900 font-display">Términos y Condiciones de Servicio (México)</h1>
        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-4 text-xs text-neutral-600 leading-relaxed">
          <p><strong>Versión: 1.3-MEX-2026 • Última actualización: Noviembre 2026</strong></p>
          <p>El presente documento regula el uso de la plataforma digital operada por Lion Games & TVs en los Estados Unidos Mexicanos.</p>
          <p>1. <strong>Valuaciones e Inspección:</strong> Toda cotización generada en el sitio es preliminar y de carácter ilustrativo. Ningún compromiso comercial se perfecciona hasta la recepción física y comprobación de autenticidad y funcionamiento en nuestra bodega técnica.</p>
          <p>2. <strong>Reglas de Envío y Devoluciones:</strong> Los envíos autorizados se gestionan con guías de paquetería prepagadas. En caso de desistimiento, arrepentimiento del vendedor o discrepancias por artículos no conformes con lo declarado, los gastos de paquetería correrán a cuenta del usuario.</p>
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
        <h1 className="font-hero-gaming text-3xl font-black text-neutral-900 font-display">Política de Envío, Recepción e Inspección</h1>
        <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-4 text-xs text-neutral-600 leading-relaxed">
          <p>1. <strong>Aprobación Previa Obligatoria:</strong> Los envíos se gestionan únicamente tras la revisión fotográfica por el departamento de compras.</p>
          <p>2. <strong>Embalaje Recomendado:</strong> Consolas y mandos deben protegerse con al menos 3 capas de plástico de burbujas en caja de cartón doble corrugado sin holguras.</p>
          <p>3. <strong>Protocolo Especial para Monitores y CRT:</strong> Televisores de más de 20 pulgadas requieren flejado en tarima de madera. No se aceptan envíos sin protección frontal del cinescopio.</p>
        </div>
      </div>
    </div>
  );
}
