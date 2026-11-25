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
  Phone,
  CreditCard,
  Package,
  HandCoins,
  UserRound
} from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

// Metallic Gold Wave Ribbons
function GoldRibbonDividerDarkToLight() {
  return (
    <div className="relative w-full overflow-hidden leading-none z-10 -mb-[1px]">
      <svg
        viewBox="0 0 1440 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-14 sm:h-20 md:h-24 object-fill block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldRibbonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A3000" />
            <stop offset="20%" stopColor="#C49028" />
            <stop offset="45%" stopColor="#FBD778" />
            <stop offset="65%" stopColor="#E2A737" />
            <stop offset="85%" stopColor="#8C5C0C" />
            <stop offset="100%" stopColor="#3B2500" />
          </linearGradient>
          <linearGradient id="goldRibbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2A737" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFF2BF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#96610E" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {/* Fill underneath into light section */}
        <path d="M0,110 L1440,110 L1440,65 C1120,95 820,25 460,70 C240,98 100,55 0,65 Z" fill="#FFFFFF" />
        {/* Sweeping metallic gold ribbon */}
        <path
          d="M0,30 C280,-15 580,70 920,35 C1160,10 1320,60 1440,40 L1440,75 C1280,95 1040,40 800,75 C500,110 220,45 0,70 Z"
          fill="url(#goldRibbonGrad1)"
          opacity="0.95"
        />
        {/* Shimmer metallic wave highlight */}
        <path
          d="M0,40 C320,5 640,80 960,45 C1200,20 1360,65 1440,50 L1440,58 C1320,72 1140,30 880,62 C560,98 260,35 0,52 Z"
          fill="url(#goldRibbonGrad2)"
        />
      </svg>
    </div>
  );
}

function GoldRibbonDividerLightToDark() {
  return (
    <div className="relative w-full overflow-hidden leading-none z-10 -mb-[1px]">
      <svg
        viewBox="0 0 1440 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-14 sm:h-20 md:h-24 object-fill block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="goldRibbonGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B2500" />
            <stop offset="25%" stopColor="#96610E" />
            <stop offset="50%" stopColor="#FFF0B5" />
            <stop offset="75%" stopColor="#D99B26" />
            <stop offset="100%" stopColor="#5C3A00" />
          </linearGradient>
          <linearGradient id="goldRibbonGrad4" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F5C04A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFF7D6" stopOpacity="1" />
            <stop offset="100%" stopColor="#A86C0A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Fill underneath into dark section */}
        <path d="M0,110 L1440,110 L1440,55 C1180,15 880,90 560,45 C260,10 100,50 0,55 Z" fill="#0A0A0B" />
        {/* Sweeping metallic gold ribbon */}
        <path
          d="M0,40 C200,80 520,10 820,50 C1100,90 1320,25 1440,60 L1440,90 C1260,60 1020,110 740,70 C440,25 180,90 0,80 Z"
          fill="url(#goldRibbonGrad3)"
          opacity="0.95"
        />
        {/* Shimmer metallic wave highlight */}
        <path
          d="M0,52 C240,88 540,22 840,60 C1120,98 1340,35 1440,70 L1440,76 C1300,50 1060,102 780,64 C480,18 220,78 0,64 Z"
          fill="url(#goldRibbonGrad4)"
        />
      </svg>
    </div>
  );
}

// 3D Video Games Stack Graphic (matching reference image games stack)
function VideoGamesStackGraphic() {
  return (
    <svg viewBox="0 0 160 115" className="w-full h-full object-contain drop-shadow-md">
      <ellipse cx="80" cy="106" rx="60" ry="7" fill="rgba(0,0,0,0.12)" />

      {/* Game Case 1 (Left - Blue Case) */}
      <g transform="translate(16, 12) skewY(-7) scale(0.85)">
        <rect x="0" y="0" width="46" height="86" rx="4" fill="#003791" stroke="#00225E" strokeWidth="1.5" />
        <rect x="0" y="0" width="8" height="86" rx="2" fill="#00225E" />
        <rect x="10" y="5" width="32" height="76" rx="2" fill="#1E3A8A" />
        <rect x="10" y="5" width="32" height="14" fill="#000000" />
        <text x="26" y="15" fill="#FFFFFF" fontSize="6" fontWeight="bold" textAnchor="middle">PS5</text>
        <circle cx="26" cy="45" r="11" fill="#3B82F6" opacity="0.6" />
      </g>

      {/* Game Case 2 (Middle - Red Case) */}
      <g transform="translate(46, 8) skewY(-3) scale(0.92)">
        <rect x="0" y="0" width="50" height="90" rx="4" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5" />
        <rect x="0" y="0" width="8" height="90" rx="2" fill="#991B1B" />
        <rect x="10" y="5" width="36" height="80" rx="2" fill="#B91C1C" />
        <rect x="10" y="5" width="36" height="15" fill="#18181B" />
        <text x="28" y="16" fill="#FFFFFF" fontSize="6.5" fontWeight="900" textAnchor="middle">SPIDER</text>
        <path d="M 20 40 Q 28 30 36 40 Q 40 54 28 64 Q 16 54 20 40 Z" fill="#FBBF24" />
        <text x="28" y="78" fill="#FFFFFF" fontSize="5" fontWeight="extrabold" textAnchor="middle">GAME</text>
      </g>

      {/* Game Case 3 (Front Right - Collector Box) */}
      <g transform="translate(84, 15) scale(0.96)">
        <rect x="0" y="0" width="54" height="88" rx="4" fill="#0F172A" stroke="#E5A83B" strokeWidth="1.5" />
        <rect x="0" y="0" width="9" height="88" rx="2" fill="#020617" />
        <rect x="11" y="5" width="39" height="78" rx="2" fill="#1E293B" />
        <rect x="11" y="5" width="39" height="14" fill="#0F172A" />
        <text x="30" y="15" fill="#E5A83B" fontSize="6" fontWeight="black" textAnchor="middle">RETRO</text>
        <circle cx="30" cy="44" r="13" fill="#E5A83B" opacity="0.25" />
        <polygon points="30,34 34,42 42,43 36,49 38,57 30,53 22,57 24,49 18,43 26,42" fill="#E5A83B" />
        <text x="30" y="73" fill="#FFFFFF" fontSize="5" fontWeight="bold" textAnchor="middle">DISCS</text>
      </g>
    </svg>
  );
}

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
      {/* 1. HERO SECTION (Matching User Design, Exact Typography, Typewriter) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-black text-white min-h-[580px] lg:min-h-[640px] flex items-center">

        {/* Background Image Layer from Asset (NES, N64, Gold Glow & Reflections) */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-right lg:bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Subtle gradient for mobile/tablet to ensure text contrast while keeping artwork vivid */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent lg:from-black/40 lg:via-transparent lg:to-transparent pointer-events-none" />

        {/* Subtle checkered flag motif at bottom-left */}
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-20 sm:h-24 pointer-events-none z-10 opacity-30 [mask-image:linear-gradient(to_top_right,black_15%,transparent_85%)]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #444 25%, transparent 25%),
                linear-gradient(-45deg, #444 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #444 75%),
                linear-gradient(-45deg, transparent 75%, #444 75%)
              `,
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
          <div className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-7">

            {/* Kicker flanked by horizontal accent lines */}
            <div className="flex items-center gap-3 animate-fade-in">
              <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-r from-transparent to-[#F5A623]" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#F5A623]">
                COMPRA DIRECTA DE VIDEOJUEGOS Y RETROGAMING
              </span>
              <div className="w-8 sm:w-14 h-[1px] bg-gradient-to-l from-transparent to-[#F5A623]" />
            </div>

            {/* Static Heading — Exact user requested Spanish phrase */}
            <h1 className="font-hero-gaming not-italic text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.14]">
              <span className="block">
                Vende tus consolas y <span className="text-[#F5A623]">TVs analógicas</span>
              </span>
              <span className="block mt-1 sm:mt-1.5">
                de <span className="text-[#F5A623]">13 hasta 21 pulgadas</span>
              </span>
            </h1>

            {/* Subtitle paragraph */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-lg">
              Cotiza tus consolas clásicas y televisores CRT con pago seguro por transferencia y recolección garantizada en todo México.
            </p>

            {/* Five diagonal gold hazard/speed slashes ///// */}
            <div className="flex items-center gap-1.5 pt-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="inline-block w-2.5 h-3.5 bg-[#F5A623] -skew-x-[24deg] rounded-[1px] shadow-sm shadow-[#F5A623]/30"
                />
              ))}
            </div>

            {/* CTAs: Explora Nuestra Colección + Conoce Más */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5 sm:gap-4">
              {/* Button 1: Solid gold pill button */}
              <button
                type="button"
                onClick={() => {
                  if (onSelectCategory) onSelectCategory('all');
                  setView('catalogue');
                }}
                className="btn-shimmer px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide bg-[#F5A623] hover:bg-[#E59819] text-black shadow-lg shadow-[#F5A623]/30 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4 text-black stroke-[2.2]" />
                <span>Explora Nuestra Colección</span>
                <ArrowRight className="w-4 h-4 text-black stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Button 2: Dark outline pill button with gold border */}
              {/* <button
                type="button"
                onClick={() => {
                  const target = document.getElementById('que-quieres-vender');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setView('como-funciona');
                  }
                }}
                className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm tracking-wide bg-black/100 hover:bg-neutral-900 text-white border border-[#F5A623]/80 hover:border-[#F5A623] hover:text-[#F5A623] shadow-md transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span className="text-[#F5A623] text-sm leading-none font-bold">▷</span>
                <span>Conoce Más</span>
              </button> */}
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 2. ¿QUÉ QUIERES VENDER? — Modern light-theme showcase cards     */}
      {/* ================================================================ */}
      <section id="que-quieres-vender" className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Section Header ── */}
          <div className="text-center mb-14 animate-fade-in-up" style={{ animationDelay: '0s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-[#B87406]">Cotiza ahora</span>
            </div>
            <h2 className="font-hero-gaming text-3xl sm:text-4xl md:text-[42px] font-black text-neutral-900 tracking-tight leading-[1.18] mb-3">
              ¿Qué quieres <span className="text-[#F5A623]">vender?</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#F5A623]" />
              <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#F5A623]" />
            </div>
            <p className="text-sm sm:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed font-normal">
              Selecciona tu categoría para comenzar a vender con la mejor oferta garantizada.
            </p>
          </div>

          {/* ── 3 Showcase Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* ─ 1. Consolas ─ */}
            <div
              onClick={() => setView('consoles')}
              className="sell-card relative cursor-pointer bg-white rounded-[28px] border border-neutral-200 overflow-hidden flex flex-col"
            >
              {/* Image Area */}
              <div className="sell-card-img-wrap relative bg-gradient-to-br from-[#FFFBF2] via-[#FFF8EC] to-[#FFF3DD] p-8 pb-0 flex items-end justify-center overflow-hidden" style={{ minHeight: '210px' }}>
                {/* Decorative circle glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 rounded-full bg-[#F5A623]/10 blur-2xl" />
                </div>
                {/* Category badge */}
                <span className="sell-pill absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F5A623] text-black shadow-sm">
                  Retro &amp; Recientes
                </span>
                <div className="relative z-10 w-44 h-44 flex items-end justify-center drop-shadow-xl">
                  <NesConsoleGraphic />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-hero-gaming text-xl font-black text-neutral-900 mb-1.5">
                  Consolas
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">
                  Nintendo (NES, SNES, N64), PlayStation retro, Xbox Clásico y Sega. Cotiza según estado y accesorios.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['38+ sistemas', 'Con/sin caja', 'Pago inmediato'].map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-neutral-100 text-neutral-600">{t}</span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-xs font-bold text-neutral-700">Explorar consolas</span>
                  <div className="sell-arrow w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center shadow-md">
                    <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ─ 2. Videojuegos ─ */}
            <div
              onClick={() => { if (onSelectCategory) onSelectCategory('video_games'); setView('catalogue'); }}
              className="sell-card relative cursor-pointer bg-white rounded-[28px] border border-neutral-200 overflow-hidden flex flex-col"
            >
              {/* Image Area */}
              <div className="sell-card-img-wrap relative bg-gradient-to-br from-[#FFFBF2] via-[#FFF8EC] to-[#FFF3DD] p-8 pb-0 flex items-end justify-center overflow-hidden" style={{ minHeight: '210px' }}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 rounded-full bg-[#F5A623]/10 blur-2xl" />
                </div>
                <span className="sell-pill absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F5A623] text-black shadow-sm">
                  Discos &amp; Cartuchos
                </span>
                <div className="relative z-10 w-44 h-44 flex items-end justify-center drop-shadow-xl">
                  <VideoGamesStackGraphic />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-hero-gaming text-xl font-black text-neutral-900 mb-1.5">
                  Videojuegos
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">
                  Juegos originales en cartuchos y discos para consolas retro y modernas. Con manual, caja o cartucho suelto.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['Originales', 'Ed. especiales', 'Lotes o sueltos'].map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-neutral-100 text-neutral-600">{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-xs font-bold text-neutral-700">Explorar videojuegos</span>
                  <div className="sell-arrow w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center shadow-md">
                    <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ─ 3. TVs analógicas CRT ─ */}
            <div
              onClick={() => { if (onSelectCategory) onSelectCategory('retro_tvs'); setView('catalogue'); }}
              className="sell-card relative cursor-pointer bg-white rounded-[28px] border border-neutral-200 overflow-hidden flex flex-col"
            >
              {/* Image Area */}
              <div className="sell-card-img-wrap relative bg-gradient-to-br from-[#FFFBF2] via-[#FFF8EC] to-[#FFF3DD] p-8 pb-0 flex items-end justify-center overflow-hidden" style={{ minHeight: '210px' }}>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-40 h-40 rounded-full bg-[#F5A623]/10 blur-2xl" />
                </div>
                <span className="sell-pill absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F5A623] text-black shadow-sm">
                  13&quot; – 21&quot; pulgadas
                </span>
                <div className="relative z-10 w-44 h-44 flex items-end justify-center drop-shadow-xl">
                  <CarsCrtTvGraphic />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-hero-gaming text-xl font-black text-neutral-900 mb-1.5">
                  TVs analógicas CRT
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">
                  Televisores de tubo CRT de 13 a 21 pulgadas. Disney Cars, Shrek, Sony Trinitron y más. Mejor precio con control remoto.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {['Combos VHS/DVD', 'Con control', 'Máx. valuación'].map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-neutral-100 text-neutral-600">{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-xs font-bold text-neutral-700">Explorar TVs analógicas</span>
                  <div className="sell-arrow w-9 h-9 rounded-full bg-[#F5A623] flex items-center justify-center shadow-md">
                    <ArrowRight className="w-4 h-4 text-black stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. ¿POR QUÉ ELEGIRNOS? (Matching reference image) */}
      {/* ======================================================== */}
      <section className="relative py-14 sm:py-18 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14 relative z-10">

          {/* Section Header flanked by gold lines */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#E5A83B]" />
              <h2 className="font-hero-gaming text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight">
                — ¿Por qué <span className="text-[#E5A83B]">elegirnos?</span> —
              </h2>
              <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#E5A83B]" />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-xl mx-auto font-medium">
              Porque tus artículos merecen la mejor oferta y una experiencia sin complicaciones.
            </p>
          </div>

          {/* 4 Pillar Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

            {/* 1. Cotización Gratuita */}
            <div className="bg-white rounded-[26px] border border-[#F0DEC2] p-7 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#E5A83B] transition-all duration-300 group flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-[#E5A83B] text-[#E5A83B] flex items-center justify-center mx-auto shadow-md mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-7 h-7 fill-[#E5A83B] text-[#E5A83B]" />
              </div>
              <h4 className="font-extrabold text-base sm:text-lg text-neutral-900 font-display mb-2">
                Cotización Gratuita
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Obtén una valuación justa e instantánea para tus artículos.
              </p>
            </div>

            {/* 2. Proceso Seguro */}
            <div className="bg-white rounded-[26px] border border-[#F0DEC2] p-7 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#E5A83B] transition-all duration-300 group flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-[#E5A83B] text-[#E5A83B] flex items-center justify-center mx-auto shadow-md mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-7 h-7 text-[#E5A83B]" />
              </div>
              <h4 className="font-extrabold text-base sm:text-lg text-neutral-900 font-display mb-2">
                Proceso Seguro
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Tus datos y transacciones están siempre protegidos.
              </p>
            </div>

            {/* 3. Pago Rápido */}
            <div className="bg-white rounded-[26px] border border-[#F0DEC2] p-7 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#E5A83B] transition-all duration-300 group flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-[#E5A83B] text-[#E5A83B] flex items-center justify-center mx-auto shadow-md mb-5 group-hover:scale-105 transition-transform">
                <CreditCard className="w-7 h-7 text-[#E5A83B]" />
              </div>
              <h4 className="font-extrabold text-base sm:text-lg text-neutral-900 font-display mb-2">
                Pago Rápido
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Recibe tu pago de manera rápida y segura.
              </p>
            </div>

            {/* 4. Atención Personalizada */}
            <div className="bg-white rounded-[26px] border border-[#F0DEC2] p-7 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-[#E5A83B] transition-all duration-300 group flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-[#E5A83B] text-[#E5A83B] flex items-center justify-center mx-auto shadow-md mb-5 group-hover:scale-105 transition-transform">
                <UserRound className="w-7 h-7 text-[#E5A83B]" />
              </div>
              <h4 className="font-extrabold text-base sm:text-lg text-neutral-900 font-display mb-2">
                Atención Personalizada
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                Nuestro equipo está aquí para ayudarte en cada paso del proceso.
              </p>
            </div>

          </div>

        </div>


      </section>

      {/* ======================================================== */}
      {/* 4. ¿CÓMO FUNCIONA? (Matching reference image) */}
      {/* ======================================================== */}
      <section className="relative py-16 sm:py-20 bg-[#0A0A0B] text-white overflow-hidden">
        {/* Ambient background gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E5A83B]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">

          {/* Section Header flanked by gold lines */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#E5A83B]" />
              <h2 className="font-hero-gaming text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                — ¿Cómo <span className="text-[#E5A83B]">funciona?</span> —
              </h2>
              <div className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#E5A83B]" />
            </div>
            <p className="text-xs sm:text-sm md:text-base text-neutral-300 max-w-xl mx-auto font-normal">
              Vende tus artículos en 4 sencillos pasos.
            </p>
          </div>

          {/* 4 Connected Process Steps */}
          <div className="relative max-w-6xl mx-auto">
            {/* Horizontal gold connecting line behind circles on desktop */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#E5A83B]/20 via-[#E5A83B] to-[#E5A83B]/20 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#E5A83B] text-black flex items-center justify-center shadow-[0_0_25px_rgba(229,168,59,0.35)] group-hover:scale-105 transition-transform">
                    <Search className="w-8 h-8 text-black stroke-[2.2]" />
                  </div>
                  <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#E5A83B] text-black font-extrabold text-xs flex items-center justify-center shadow-md">
                    1
                  </span>
                </div>
                <h3 className="font-hero-gaming text-white font-extrabold text-base sm:text-lg mt-5 mb-1.5">
                  Busca tu producto
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-[210px]">
                  Busca y selecciona el artículo que deseas vender.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#E5A83B] text-black flex items-center justify-center shadow-[0_0_25px_rgba(229,168,59,0.35)] group-hover:scale-105 transition-transform">
                    <ClipboardList className="w-8 h-8 text-black stroke-[2.2]" />
                  </div>
                  <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#E5A83B] text-black font-extrabold text-xs flex items-center justify-center shadow-md">
                    2
                  </span>
                </div>
                <h3 className="font-hero-gaming text-white font-extrabold text-base sm:text-lg mt-5 mb-1.5">
                  Completa el formulario
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-[210px]">
                  Comparte los detalles sobre la condición de tu artículo.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#E5A83B] text-black flex items-center justify-center shadow-[0_0_25px_rgba(229,168,59,0.35)] group-hover:scale-105 transition-transform">
                    <Package className="w-8 h-8 text-black stroke-[2.2]" />
                  </div>
                  <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#E5A83B] text-black font-extrabold text-xs flex items-center justify-center shadow-md">
                    3
                  </span>
                </div>
                <h3 className="font-hero-gaming text-white font-extrabold text-base sm:text-lg mt-5 mb-1.5">
                  Envíanos tus artículos
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-[210px]">
                  Envía o entrega tu artículo en nuestra ubicación.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#E5A83B] text-black flex items-center justify-center shadow-[0_0_25px_rgba(229,168,59,0.35)] group-hover:scale-105 transition-transform">
                    <HandCoins className="w-8 h-8 text-black stroke-[2.2]" />
                  </div>
                  <span className="absolute -top-1 -left-1 w-7 h-7 rounded-full bg-[#E5A83B] text-black font-extrabold text-xs flex items-center justify-center shadow-md">
                    4
                  </span>
                </div>
                <h3 className="font-hero-gaming text-white font-extrabold text-base sm:text-lg mt-5 mb-1.5">
                  Recibe tu pago
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-[210px]">
                  Recibe tu pago rápidamente una vez verificado tu artículo.
                </p>
              </div>

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
                <h3 className="font-hero-gaming text-2xl sm:text-3xl font-black tracking-tight text-[#F5A623]">
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
              <h2 className="font-hero-gaming text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
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
                <h3 className="font-hero-gaming text-2xl sm:text-3xl font-black tracking-tight text-white">
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
