import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Headphones,
  CheckCircle2,
  Search,
  ClipboardList,
  Truck,
  Handshake,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  MessageCircle,
  Mail,
  Sparkles,
  Gamepad2,
  Tv,
  Disc,
  Star,
  Phone
} from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

// 1. Nintendo NES Console Graphic
function NesConsoleGraphic() {
  return (
    <svg viewBox="0 0 160 110" className="w-full h-full object-contain drop-shadow-md">
      <ellipse cx="80" cy="100" rx="65" ry="8" fill="#E2E8F0" />
      <rect x="20" y="24" width="120" height="70" rx="3" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="20" y="24" width="75" height="34" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="20" y1="58" x2="95" y2="58" stroke="#9CA3AF" strokeWidth="1.5" />
      <text x="26" y="52" fill="#DC2626" fontSize="4.5" fontWeight="900" letterSpacing="0.4">Nintendo</text>
      <text x="50" y="52" fill="#1F2937" fontSize="3" fontWeight="bold">Entertainment System</text>
      <rect x="95" y="24" width="45" height="70" fill="#374151" stroke="#1F2937" strokeWidth="1" />
      {[30, 36, 42, 48, 54, 60, 66, 72, 78, 84].map((y) => (
        <line key={y} x1="95" y1={y} x2="140" y2={y} stroke="#1F2937" strokeWidth="1.5" />
      ))}
      <rect x="20" y="70" width="75" height="24" fill="#1F2937" />
      <rect x="25" y="76" width="12" height="7" rx="1" fill="#DC2626" />
      <text x="31" y="81" fill="#FFFFFF" fontSize="2.8" fontWeight="bold" textAnchor="middle">POWER</text>
      <circle cx="41" cy="79.5" r="1.5" fill="#EF4444" />
      <rect x="46" y="76" width="12" height="7" rx="1" fill="#4B5563" />
      <text x="52" y="81" fill="#FFFFFF" fontSize="2.8" fontWeight="bold" textAnchor="middle">RESET</text>
      <rect x="64" y="75" width="12" height="9" rx="1.5" fill="#111827" stroke="#374151" strokeWidth="1" />
      <rect x="80" y="75" width="12" height="9" rx="1.5" fill="#111827" stroke="#374151" strokeWidth="1" />
    </svg>
  );
}

// 2. Disney's Cars Lightning McQueen CRT TV Graphic
function CarsCrtTvGraphic() {
  return (
    <svg viewBox="0 0 160 110" className="w-full h-full object-contain drop-shadow-md">
      <ellipse cx="80" cy="100" rx="60" ry="8" fill="#E2E8F0" />
      <line x1="68" y1="18" x2="48" y2="4" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="92" y1="18" x2="112" y2="4" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 28 32 C 28 20, 50 14, 80 14 C 110 14, 132 20, 132 32 L 136 78 C 136 88, 120 92, 80 92 C 40 92, 24 88, 24 78 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <rect x="46" y="12" width="68" height="5" rx="2" fill="#B91C1C" />
      <rect x="42" y="24" width="76" height="50" rx="9" fill="#18181B" stroke="#7F1D1D" strokeWidth="2" />
      <rect x="46" y="28" width="68" height="42" rx="7" fill="#38BDF8" />
      <ellipse cx="66" cy="48" rx="7.5" ry="9" fill="#FFFFFF" />
      <circle cx="67" cy="48" r="4.5" fill="#1D4ED8" />
      <circle cx="68" cy="47" r="2" fill="#FFFFFF" />
      <ellipse cx="94" cy="48" rx="7.5" ry="9" fill="#FFFFFF" />
      <circle cx="93" cy="48" r="4.5" fill="#1D4ED8" />
      <circle cx="94" cy="47" r="2" fill="#FFFFFF" />
      <path d="M 58 37 Q 66 35 74 39" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 86 39 Q 94 35 102 37" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <ellipse cx="33" cy="62" rx="4.5" ry="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      <ellipse cx="127" cy="62" rx="4.5" ry="8" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      <path d="M 62 84 Q 80 90 98 84" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="29" y="38" width="11" height="7" rx="1.5" fill="#F59E0B" />
      <text x="34.5" y="43" fill="#78350F" fontSize="4" fontWeight="900" textAnchor="middle">95</text>
    </svg>
  );
}

// 3. Nintendo 64 Pikachu Edition Console Graphic
function N64PikachuGraphic() {
  return (
    <svg viewBox="0 0 180 130" className="w-full h-full object-contain drop-shadow-xl">
      <ellipse cx="90" cy="118" rx="75" ry="9" fill="rgba(0,0,0,0.3)" />
      <path d="M 20 45 C 20 35, 45 32, 110 32 L 155 45 C 162 60, 162 95, 150 105 C 135 112, 35 112, 22 105 C 15 95, 15 60, 20 45 Z" fill="#1E3A8A" stroke="#172554" strokeWidth="2" />
      <path d="M 24 88 C 24 82, 30 80, 80 80 L 120 80 C 125 80, 128 85, 128 92 L 122 104 C 115 107, 35 107, 24 102 Z" fill="#FACC15" />
      <rect x="32" y="87" width="16" height="11" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
      <rect x="52" y="87" width="16" height="11" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
      <rect x="72" y="87" width="16" height="11" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
      <rect x="92" y="87" width="16" height="11" rx="2" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
      <rect x="36" y="40" width="56" height="16" rx="3" fill="#0F172A" />
      <rect x="42" y="58" width="44" height="12" rx="2" fill="#1E40AF" stroke="#1D4ED8" strokeWidth="1" />
      <circle cx="28" cy="65" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M 21 65 H 35" stroke="#FFFFFF" strokeWidth="1.5" />
      <circle cx="28" cy="65" r="2.5" fill="#FFFFFF" stroke="#000" strokeWidth="0.8" />
      <text x="28" y="77" fill="#FACC15" fontSize="3" fontWeight="bold" textAnchor="middle">POWER</text>
      {/* 3D Pikachu Figure */}
      <path d="M 125 25 L 116 8 Q 120 5 125 10 L 132 28 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.2" />
      <path d="M 116 8 L 121 6 L 124 14 L 118 13 Z" fill="#1F2937" />
      <path d="M 148 28 L 165 14 Q 168 18 163 24 L 145 35 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.2" />
      <path d="M 165 14 L 168 18 L 158 24 L 157 18 Z" fill="#1F2937" />
      <ellipse cx="138" cy="60" rx="24" ry="26" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="128" cy="50" r="3" fill="#1F2937" />
      <circle cx="129" cy="49" r="1" fill="#FFFFFF" />
      <circle cx="144" cy="50" r="3" fill="#1F2937" />
      <circle cx="145" cy="49" r="1" fill="#FFFFFF" />
      <polygon points="135,54 137,54 136,56" fill="#1F2937" />
      <path d="M 132 58 Q 136 61 140 58" stroke="#1F2937" strokeWidth="1.2" fill="none" />
      <circle cx="122" cy="58" r="4.5" fill="#EF4444" />
      <circle cx="150" cy="58" r="4.5" fill="#EF4444" />
      <ellipse cx="128" cy="74" rx="4" ry="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
      <ellipse cx="144" cy="74" rx="4" ry="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
      <path d="M 160 52 L 170 42 L 164 38 L 174 26 L 162 46 Z" fill="#FACC15" stroke="#B45309" strokeWidth="1" />
    </svg>
  );
}

export default function HomePage({ setView, onSelectCategory }) {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const faqs = [
    {
      q: "¿Por qué no piden mis datos bancarios al llenar el formulario?",
      a: "Conforme a la especificación de seguridad LionGamesAndTvs, no recopilamos datos bancarios, CLABE ni SPEI en el formulario web para máxima protección de tu privacidad. El finiquito y transferencia se gestionan de común acuerdo una vez que los artículos han sido formalmente aprobados en la inspección física."
    },
    {
      q: "¿Cómo vendo mis consolas y videojuegos?",
      a: "1) Elige tu consola o juego en nuestro catálogo interactivo. 2) Configura su estado estético y marca los accesorios extras incluidos para obtener una oferta calculada al instante en MXN. 3) Agrega los artículos a tu carrito de venta y envía tu solicitud con fotos. Nuestro equipo revisará los datos y te enviará tu guía de paquetería prepagada."
    },
    {
      q: "¿La cotización en línea es definitiva?",
      a: "La cotización en línea es una oferta inicial no vinculante basada en los datos y condición que seleccionaste. La oferta final se confirma tras la inspección física en nuestras instalaciones para verificar autenticidad, funcionamiento y números de serie."
    },
    {
      q: "¿Debo enviar mis artículos inmediatamente después de registrar la solicitud?",
      a: "¡No! No debes enviar ningún artículo hasta que nuestro equipo de especialistas revise tu solicitud y apruebe el envío proporcionándote la guía oficial de paquetería e instrucciones de empaque seguro."
    },
    {
      q: "¿Puedo vender artículos o ediciones que no aparecen en el catálogo?",
      a: "¡Sí! Si tienes consolas de edición limitada (como Pikachu, Zelda, Pokémon, carcasas translúcidas) o sistemas poco comunes, puedes usar nuestro formulario de cotización personalizada o escribirnos directamente por WhatsApp."
    },
    {
      q: "¿Compran televisores CRT retro?",
      a: "Sí, compramos exclusivamente televisores analógicos de tubo CRT de 12 hasta 21 pulgadas, especialmente modelos temáticos de personajes (como Disney Cars Rayo McQueen, Shrek, Bob Esponja, Mickey Mouse o Batman). El precio de compra varía si incluyen su control remoto temático original correspondiente, combo con reproductor DVD o videocasetera VHS integrada."
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-neutral-900 selection:bg-[#F5A623] selection:text-black">

      {/* ======================================================== */}
      {/* 1. HERO SECTION (100% Spanish, Pure Black, Hero Background) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-black text-white min-h-[580px] lg:min-h-[615px] flex items-center">

        {/* Background Image Layer from Asset */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100 hover:scale-[1.02]"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Sophisticated Dual Gradient Overlay for legibility & contrast */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/85 to-black/35 lg:via-black/75" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/40" />

        {/* Subtle breathing ambient glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-[#F5A623]/15 blur-[140px] rounded-full pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10 w-full">
          <div className="max-w-2xl space-y-7">

            {/* Title specifying analog TVs up to 21 inches */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight text-white leading-[1.12] font-display">
                Vende tus consolas, videojuegos <br className="hidden sm:inline" />
                y <span className="text-[#F5A623]">tvs analógicas de 13 hasta 21 pulgadas</span>
              </h1>
            </div>

            {/* Subtitle with vertical gold bar matching image */}
            <div
              className="flex items-center gap-3 animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              <div className="w-1.5 h-8 bg-[#F5A623] rounded-full shrink-0" />
              <p className="text-base sm:text-lg text-neutral-200 font-semibold leading-relaxed">
                Rápido, fácil y seguro.
              </p>
            </div>

            {/* CTAs: WhatsApp button + Send message button */}
            <div
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              {/* Button 1: Contáctanos por WhatsApp */}
              <a
                href="https://wa.me/525512345678?text=Hola%20LionGamesAndTvs,%20quiero%20vender%20mis%20consolas%20y%20videojuegos"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer px-7 py-3.5 rounded-full font-bold text-xs tracking-wide bg-[#F5A623] hover:bg-[#E59819] text-black shadow-xl shadow-[#F5A623]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
              >
                <MessageCircle className="w-4 h-4 fill-current text-black" />
                <span>Contáctanos por WhatsApp</span>
              </a>

              {/* Button 2: Envíanos un mensaje */}
              <button
                onClick={() => setView('custom-quote')}
                className="px-7 py-3.5 rounded-full font-bold text-xs tracking-wide bg-black/80 hover:bg-neutral-900 text-white border border-neutral-700 hover:border-[#F5A623] transition-all flex items-center justify-center gap-2.5 group"
              >
                <Mail className="w-4 h-4 text-[#F5A623]" />
                <span>Envíanos un mensaje</span>
              </button>
            </div>

            {/* Value Prop Micro Pills */}
            <div
              className="pt-4 flex flex-wrap items-center gap-6 text-xs text-neutral-300 font-medium animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-4 h-4 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <span className="group-hover:text-white transition-colors">Cotización sin compromiso</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-4 h-4 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <span className="group-hover:text-white transition-colors">Pago rápido garantizado</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-4 h-4 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <span className="group-hover:text-white transition-colors">Envíos asegurados en todo México</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. ¿QUÉ QUIERES VENDER? (Matching the 3 cards in reference image) */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#FAF9F6] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-[#F5A623]" />
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display">
                ¿Qué quieres vender?
              </h2>
              <div className="w-12 h-0.5 bg-[#F5A623]" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              Selecciona tu categoría para ver precios y cotizar de inmediato
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 1. Consolas (NES Nintendo representation) */}
            <div
              onClick={() => setView('consoles')}
              className="group cursor-pointer bg-[#FFFDF8] hover:bg-white rounded-3xl border border-[#F0E6D2] hover:border-[#F5A623] p-6 shadow-sm hover:shadow-xl hover:shadow-[#F5A623]/10 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center p-2 overflow-hidden group-hover:scale-105 transition-transform shadow-inner">
                  <NesConsoleGraphic />
                </div>
                <div>
                  <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                    Consolas
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                    Nintendo (NES, SNES, N64), PS retro, Xbox Clásico y Sega
                  </p>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#F5A623] text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E59819] transition-all shadow-md shrink-0 ml-3">
                <ChevronRight className="w-5 h-5 text-black" />
              </div>
            </div>

            {/* 2. Videojuegos */}
            <div
              onClick={() => { if (onSelectCategory) onSelectCategory('video_games'); setView('catalogue'); }}
              className="group cursor-pointer bg-[#FFFDF8] hover:bg-white rounded-3xl border border-[#F0E6D2] hover:border-[#F5A623] p-6 shadow-sm hover:shadow-xl hover:shadow-[#F5A623]/10 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center p-2 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80"
                    alt="Videojuegos"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                    Videojuegos
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                    Cartuchos y discos originales
                  </p>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#F5A623] text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E59819] transition-all shadow-md shrink-0 ml-3">
                <ChevronRight className="w-5 h-5 text-black" />
              </div>
            </div>

            {/* 3. TVs analógicas CRT (Disney's Cars CRT TV) */}
            <div
              onClick={() => { if (onSelectCategory) onSelectCategory('retro_tvs'); setView('catalogue'); }}
              className="group cursor-pointer bg-[#FFFDF8] hover:bg-white rounded-3xl border border-[#F0E6D2] hover:border-[#F5A623] p-6 shadow-sm hover:shadow-xl hover:shadow-[#F5A623]/10 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center p-2 overflow-hidden group-hover:scale-105 transition-transform shadow-inner">
                  <CarsCrtTvGraphic />
                </div>
                <div>
                  <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                    TVs analógicas CRT
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                    13 a 21 pulgadas, temáticas Disney Cars y más
                  </p>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-[#F5A623] text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E59819] transition-all shadow-md shrink-0 ml-3">
                <ChevronRight className="w-5 h-5 text-black" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. ¿POR QUÉ ELEGIRNOS? (4 Pillars matching reference image) */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-[#F5A623]" />
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display">
                ¿Por qué elegirnos?
              </h2>
              <div className="w-12 h-0.5 bg-[#F5A623]" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              La plataforma de recompra gamer más segura, transparente y rápida de México
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* 1. Cotización sin compromiso */}
            <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-neutral-200/90 text-center space-y-3 hover:border-[#F5A623] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-black text-[#F5A623] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 fill-[#F5A623]" />
              </div>
              <h4 className="font-extrabold text-base text-neutral-900 font-display">
                Cotización sin compromiso
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Recibe una cotización inmediata y transparente sin costo alguno ni obligación de venta.
              </p>
            </div>

            {/* 2. Compra segura */}
            <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-neutral-200/90 text-center space-y-3 hover:border-[#F5A623] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-black text-[#F5A623] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h4 className="font-extrabold text-base text-neutral-900 font-display">
                Compra segura
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Tus datos y artículos están protegidos en todo momento mediante guías y contratos oficiales.
              </p>
            </div>

            {/* 3. Pago rápido */}
            <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-neutral-200/90 text-center space-y-3 hover:border-[#F5A623] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-black text-[#F5A623] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 fill-[#F5A623]" />
              </div>
              <h4 className="font-extrabold text-base text-neutral-900 font-display">
                Pago rápido
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Transferencia electrónica directa a tu cuenta bancaria el mismo día de la inspección técnica.
              </p>
            </div>

            {/* 4. Atención personalizada */}
            <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-neutral-200/90 text-center space-y-3 hover:border-[#F5A623] transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-black text-[#F5A623] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h4 className="font-extrabold text-base text-neutral-900 font-display">
                Atención personalizada
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Soporte y asesoría humana directa por WhatsApp y correo en todo momento.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. ¿CÓMO FUNCIONA? (4 Steps matching reference image) */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#FAF9F6] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-[#F5A623]" />
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display">
                ¿Cómo funciona?
              </h2>
              <div className="w-12 h-0.5 bg-[#F5A623]" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              Vende tus artículos en 4 pasos sencillos sin complicaciones
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-sm group-hover:border-[#F5A623] group-hover:scale-110 transition-all">
                  <Search className="w-7 h-7 text-neutral-800" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F5A623] text-black font-black text-xs flex items-center justify-center shadow-md">
                  1
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-display">
                Busca tu producto
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Encuentra tu consola o juego en nuestro catálogo de más de 59 sistemas.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-sm group-hover:border-[#F5A623] group-hover:scale-110 transition-all">
                  <ClipboardList className="w-7 h-7 text-neutral-800" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F5A623] text-black font-black text-xs flex items-center justify-center shadow-md">
                  2
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-display">
                Completa el formulario
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Selecciona la condición física y marca los accesorios extras incluidos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-sm group-hover:border-[#F5A623] group-hover:scale-110 transition-all">
                  <Truck className="w-7 h-7 text-neutral-800" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F5A623] text-black font-black text-xs flex items-center justify-center shadow-md">
                  3
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-display">
                Envíanos tus artículos
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Te enviamos la guía de paquetería prepagada y protegida por paquetería líder.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3 group">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-200 text-neutral-900 flex items-center justify-center shadow-sm group-hover:border-[#F5A623] group-hover:scale-110 transition-all">
                  <Handshake className="w-7 h-7 text-neutral-800" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F5A623] text-black font-black text-xs flex items-center justify-center shadow-md">
                  4
                </span>
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-display">
                Recibe tu oferta y pago
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Al llegar a nuestra bodega, técnicos especializados verifican el funcionamiento y cosmética. Si todo coincide con lo especificado, ratificamos la oferta y transferimos a tu cuenta en 1-3 días hábiles.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ¿TIENES UNA EDICIÓN ESPECIAL? (Banner with N64 Pikachu) */}
      {/* ======================================================== */}
      <section className="py-14 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">

            {/* Ambient light glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5A623]/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              {/* Left Column: Console Photo - Nintendo 64 Pikachu Edition */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-neutral-900/90 border border-neutral-800 flex items-center justify-center p-3 shadow-xl">
                  <N64PikachuGraphic />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#F5A623] text-black shadow">
                    N64 Pikachu Edition
                  </div>
                </div>
              </div>

              {/* Center Column: Text */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5A623] font-display">
                  ¿Tienes una edición especial?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  Si tu consola retro es una edición especial (como Nintendo 64 Pikachu Edition, Funtastic de colores translúcidos, Game Boy Pokémon / Zelda o consolas conmemorativas de colección), ¡contáctanos! Podemos pagar diferentes precios.
                </p>
              </div>

              {/* Right Column: Actions */}
              <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
                {/* Button WhatsApp */}
                <a
                  href="https://wa.me/525512345678?text=Hola%20LionGamesAndTvs,%20tengo%20una%20edici%C3%B3n%20especial%20para%20vender"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-full font-bold text-xs bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Escríbenos por WhatsApp</span>
                </a>

                {/* Button Message */}
                <button
                  onClick={() => setView('custom-quote')}
                  className="w-full py-3.5 px-5 rounded-full font-bold text-xs bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02]"
                >
                  <Mail className="w-4 h-4 text-[#F5A623]" />
                  <span>Envíanos un mensaje</span>
                </button>

                {/* Direct Phone Number */}
                <div className="flex items-center justify-center gap-2 pt-1 text-xs text-neutral-300 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span className="font-bold">55 1234 5678</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. PREGUNTAS FRECUENTES (FAQs 100% Spanish) */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-[#F5A623]" />
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display">
                ¿Preguntas frecuentes? Tenemos respuestas
              </h2>
              <div className="w-12 h-0.5 bg-[#F5A623]" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              Todo lo que necesitas saber antes de solicitar tu cotización
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left FAQ Accordions */}
            <div className="lg:col-span-8 space-y-3.5">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-neutral-200/90 bg-white overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full px-6 py-4.5 text-left font-bold text-xs sm:text-sm text-neutral-900 flex items-center justify-between gap-4 hover:text-[#B87406] transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#F5A623] shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3 animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right WhatsApp Support Callout Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#FAF4E6] border border-[#F0C068]/80 rounded-3xl p-7 text-center space-y-4 shadow-sm">
                <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden bg-amber-100/60 flex items-center justify-center p-2">
                  <Gamepad2 className="w-12 h-12 text-[#F5A623]" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-neutral-900 font-display">
                    ¿Aún tienes dudas?
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Habla directamente con nuestro equipo técnico antes de enviar tu solicitud.
                  </p>
                </div>

                <a
                  href="https://wa.me/525512345678?text=Hola%20LionGamesAndTvs,%20tengo%20una%20duda%20sobre%20el%20proceso%20de%20recompra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-black text-white hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>Chatear por WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. BOLETÍN GAMER (100% Spanish Newsletter) */}
      {/* ======================================================== */}
      <section className="py-14 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center gap-2 text-[#F5A623] font-bold text-xs tracking-wider uppercase">
                  <Mail className="w-4 h-4" />
                  <span>Boletín Lion Games & TVs</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
                  Mantente en el Juego
                </h3>
                <p className="text-xs text-neutral-400">
                  Recibe guías de precios de colección, avisos de consolas buscadas y promociones exclusivas.
                </p>
              </div>

              <div className="lg:col-span-6">
                {subscribed ? (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ¡Gracias por suscribirte al boletín de Lion Games & TVs!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Ingresa tu correo electrónico"
                      required
                      className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F5A623]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-[#F5A623] hover:bg-[#E59819] text-black transition-all shrink-0 shadow-md shadow-[#F5A623]/20"
                    >
                      Suscribirme
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
