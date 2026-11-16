import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  ChevronDown,
  Menu,
  X,
  ShoppingBag,
  Gift,
  Shield,
  Star,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo.png';

// ========================================================
// 8 Pixel-Matched Visual Components (Optimized Compact Sizing)
// ========================================================

// 1. Nintendo (NES Classic Controller)
function NesControllerSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-28 h-12 sm:w-32 sm:h-14 object-contain drop-shadow-md">
      {/* Outer gray body with 3D bevel */}
      <rect x="6" y="8" width="128" height="68" rx="6" fill="#C5C7C8" stroke="#8A8E91" strokeWidth="2.5" />
      {/* Black center faceplate */}
      <rect x="12" y="16" width="116" height="52" rx="3" fill="#141517" />
      {/* Top red stripe with Nintendo logo */}
      <rect x="16" y="20" width="30" height="4.5" fill="#E52521" />
      <text x="18" y="23.8" fill="#FFFFFF" fontSize="3" fontWeight="900" letterSpacing="0.5">Nintendo</text>
      {/* D-Pad */}
      <path d="M 28 32 h 8 v 7 h 7 v 8 h -7 v 7 h -8 v -7 h -7 v -8 h 7 z" fill="#18191B" stroke="#383A3D" strokeWidth="1" />
      <circle cx="32" cy="39.5" r="2" fill="#3D4043" />
      {/* Select / Start rubber buttons */}
      <rect x="58" y="44" width="9" height="3.5" rx="1.5" fill="#8E9297" transform="rotate(-25 62 45)" />
      <rect x="73" y="44" width="9" height="3.5" rx="1.5" fill="#8E9297" transform="rotate(-25 77 45)" />
      <text x="61" y="55" fill="#E52521" fontSize="3" fontWeight="bold" textAnchor="middle">SELECT</text>
      <text x="76" y="55" fill="#E52521" fontSize="3" fontWeight="bold" textAnchor="middle">START</text>
      {/* B and A red buttons */}
      <circle cx="98" cy="45" r="6" fill="#E52521" stroke="#9E1A17" strokeWidth="1.5" />
      <circle cx="116" cy="45" r="6" fill="#E52521" stroke="#9E1A17" strokeWidth="1.5" />
      <text x="98" y="60" fill="#E52521" fontSize="4.5" fontWeight="900" textAnchor="middle">B</text>
      <text x="116" y="60" fill="#E52521" fontSize="4.5" fontWeight="900" textAnchor="middle">A</text>
    </svg>
  );
}

// 2. PlayStation (PSone con Pantalla LCD Portátil)
function PlaystationSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-24 h-13 sm:w-28 sm:h-15 object-contain drop-shadow-md">
      {/* Attached Flip-Up LCD Screen */}
      <rect x="36" y="6" width="68" height="42" rx="6" fill="#D8DCE0" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Screen Frame Bezel */}
      <rect x="44" y="10" width="52" height="32" rx="3" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
      {/* LCD Display Glowing with PlayStation Boot/Game Screen */}
      <rect x="47" y="13" width="46" height="26" rx="2" fill="#0284C7" />
      <text x="70" y="29" fill="#FFFFFF" fontSize="6" fontWeight="900" textAnchor="middle" letterSpacing="0.5">PS one</text>
      {/* Left and Right Mini Speaker Grilles */}
      <circle cx="39" cy="22" r="1.5" fill="#64748B" />
      <circle cx="39" cy="28" r="1.5" fill="#64748B" />
      <circle cx="101" cy="22" r="1.5" fill="#64748B" />
      <circle cx="101" cy="28" r="1.5" fill="#64748B" />
      {/* PSone Base Console Body */}
      <rect x="26" y="44" width="88" height="34" rx="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Circular Disc Cover */}
      <circle cx="70" cy="61" r="13" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
      <circle cx="70" cy="61" r="5" fill="#E2E8F0" />
      {/* Power and Open buttons */}
      <ellipse cx="38" cy="61" rx="4" ry="4" fill="#94A3B8" />
      <text x="38" y="62.5" fill="#475569" fontSize="2.5" fontWeight="bold" textAnchor="middle">PWR</text>
      <ellipse cx="102" cy="61" rx="4" ry="4" fill="#94A3B8" />
      <text x="102" y="62.5" fill="#475569" fontSize="2.5" fontWeight="bold" textAnchor="middle">OPEN</text>
      {/* Front Controller & Memory Card Ports */}
      <rect x="42" y="72" width="22" height="4" rx="1" fill="#475569" />
      <rect x="76" y="72" width="22" height="4" rx="1" fill="#475569" />
    </svg>
  );
}

// 3. Xbox Original (Clásico)
function XboxSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-24 h-13 sm:w-28 sm:h-15 object-contain drop-shadow-md">
      {/* Classic Xbox Bulky Chassis */}
      <rect x="20" y="20" width="100" height="54" rx="6" fill="#18191B" stroke="#2D3035" strokeWidth="2" />
      {/* Bold Top Embossed X Grooves */}
      <line x1="28" y1="22" x2="112" y2="58" stroke="#101113" strokeWidth="6" strokeLinecap="round" />
      <line x1="112" y1="22" x2="28" y2="58" stroke="#101113" strokeWidth="6" strokeLinecap="round" />
      {/* Front Bevel and Disc Tray */}
      <rect x="30" y="52" width="46" height="8" rx="1.5" fill="#25272B" stroke="#3D4046" strokeWidth="1" />
      <circle cx="82" cy="56" r="2.5" fill="#10B981" />
      {/* 4 Front Controller Ports */}
      <rect x="90" y="53" width="6" height="6" rx="1.5" fill="#0C0D0E" />
      <rect x="98" y="53" width="6" height="6" rx="1.5" fill="#0C0D0E" />
      <rect x="106" y="53" width="6" height="6" rx="1.5" fill="#0C0D0E" />
      <rect x="114" y="53" width="6" height="6" rx="1.5" fill="#0C0D0E" />
      {/* Iconic Center Green Jewel */}
      <ellipse cx="70" cy="38" rx="14" ry="11" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
      <ellipse cx="70" cy="38" rx="11" ry="8" fill="#34D399" />
      <text x="70" y="40.5" fill="#064E3B" fontSize="4.5" fontWeight="900" textAnchor="middle" letterSpacing="0.8">XBOX</text>
    </svg>
  );
}

// 4. Sega y Retro (Iconic Blue SEGA Striped Logo)
function SegaSvg() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-2xl sm:text-3xl font-black italic tracking-tighter text-[#0060A9] font-display select-none drop-shadow-[0_3px_12px_rgba(0,96,169,0.5)]">
        SEGA
      </span>
    </div>
  );
}

// 6. Videojuegos (Retro Golden Cartridges - Decreased Size)
function VideoGamesSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-18 h-9 sm:w-20 sm:h-10 object-contain drop-shadow-md">
      {/* Gold Back Cartridge */}
      <rect x="22" y="12" width="50" height="60" rx="4" fill="#D4AF37" stroke="#A6831A" strokeWidth="1.5" />
      <rect x="28" y="20" width="38" height="34" rx="2" fill="#E2E8F0" />
      <rect x="30" y="22" width="34" height="30" rx="1" fill="#DC2626" />
      <circle cx="47" cy="34" r="7" fill="#FBBF24" />
      {/* Front Gray Cartridge */}
      <rect x="58" y="18" width="60" height="60" rx="4" fill="#374151" stroke="#1F2937" strokeWidth="2" />
      <rect x="66" y="26" width="44" height="36" rx="3" fill="#F1F5F9" />
      {/* Mario Sticker Art */}
      <rect x="68" y="28" width="40" height="32" rx="2" fill="#3B82F6" />
      <circle cx="88" cy="38" r="7" fill="#EF4444" />
      <circle cx="88" cy="38" r="4" fill="#FDE047" />
      <path d="M 68 52 L 108 52 L 108 60 L 68 60 Z" fill="#10B981" />
      {/* Top Grip Notches */}
      <line x1="68" y1="18" x2="68" y2="24" stroke="#111827" strokeWidth="2.5" />
      <line x1="108" y1="18" x2="108" y2="24" stroke="#111827" strokeWidth="2.5" />
    </svg>
  );
}

// 7. Accesorios (Dual Retro Controllers - Decreased Size)
function AccessoriesSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-18 h-9 sm:w-20 sm:h-10 object-contain drop-shadow-md">
      {/* Left Purple N64 Controller */}
      <path d="M 14 36 C 14 26, 62 26, 62 36 L 62 44 L 54 74 L 46 50 L 38 74 L 30 50 L 22 74 Z" fill="#7C3AED" stroke="#5B21B6" strokeWidth="1.5" />
      <circle cx="38" cy="35" r="5.5" fill="#E4E4E7" stroke="#71717A" strokeWidth="0.8" />
      <circle cx="26" cy="38" r="3" fill="#18181B" />
      <circle cx="50" cy="38" r="2.5" fill="#FBBF24" />
      <circle cx="55" cy="34" r="2.5" fill="#FBBF24" />
      {/* Right Dark Retro Gamepad */}
      <path d="M 72 34 C 72 28, 122 28, 122 34 C 126 48, 128 68, 120 70 C 114 72, 108 58, 102 55 L 88 55 C 82 58, 76 72, 70 70 C 62 68, 64 48, 72 34 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
      <circle cx="86" cy="42" r="5" fill="#38BDF8" />
      <circle cx="106" cy="52" r="5" fill="#F43F5E" />
    </svg>
  );
}

// 7. Televisiones Analógicas CRT (Disney's Cars Lightning McQueen CRT TV)
function CrtTvSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-26 h-13 sm:w-30 sm:h-15 object-contain drop-shadow-md">
      {/* Rabbit-ear Antennas */}
      <line x1="58" y1="12" x2="42" y2="2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <line x1="82" y1="12" x2="98" y2="2" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      {/* Lightning McQueen Red Car Body Chassis */}
      <path d="M 22 28 C 22 18, 40 12, 70 12 C 100 12, 118 18, 118 28 L 122 64 C 122 72, 110 74, 70 74 C 30 74, 18 72, 18 64 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      {/* Roof spoiler */}
      <rect x="38" y="10" width="64" height="4" rx="2" fill="#B91C1C" />
      {/* CRT Screen Frame (Windshield) */}
      <rect x="36" y="20" width="68" height="42" rx="8" fill="#18181B" stroke="#7F1D1D" strokeWidth="1.5" />
      {/* Screen Tube (Cars Windshield with Eyes) */}
      <rect x="40" y="24" width="60" height="34" rx="6" fill="#38BDF8" />
      {/* Blue Eyes of Lightning McQueen */}
      <ellipse cx="58" cy="41" rx="6" ry="7" fill="#FFFFFF" />
      <circle cx="59" cy="41" r="3.5" fill="#1D4ED8" />
      <circle cx="60" cy="40" r="1.5" fill="#FFFFFF" />
      <ellipse cx="82" cy="41" rx="6" ry="7" fill="#FFFFFF" />
      <circle cx="81" cy="41" r="3.5" fill="#1D4ED8" />
      <circle cx="82" cy="40" r="1.5" fill="#FFFFFF" />
      {/* Eyebrows */}
      <path d="M 52 32 Q 58 30 64 33" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 76 33 Q 82 30 88 32" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Yellow Headlights / Turning Signals on Bumper */}
      <ellipse cx="28" cy="52" rx="4" ry="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      <ellipse cx="112" cy="52" rx="4" ry="7" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
      {/* McQueen Smile Grille */}
      <path d="M 54 68 Q 70 73 86 68" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Lightning 95 Badge */}
      <rect x="23" y="32" width="10" height="6" rx="1" fill="#F59E0B" />
      <text x="28" y="36.5" fill="#78350F" fontSize="3.5" fontWeight="900" textAnchor="middle">95</text>
    </svg>
  );
}

// Announcements list for the running marquee (leisurely smooth reading speed)
const ANNOUNCEMENTS = [
  "⚡ ¡Compramos tus consolas retro, videojuegos y tvs analógicas de 13 hasta 21 pulgadas en todo México!",
  "🎮 Nintendo (NES, SNES, N64, GameCube), PlayStation (PS1 con pantalla portátil, PS2), Xbox Clásico Original y Sega",
  "📺 Compramos tvs analógicas CRT temáticas (Disney Cars Rayo McQueen, personajes, combos DVD/VHS, 13\" a 21\")",
  "🚚 Envíos asegurados y guías de paquetería prepagada con recolección directa en tu domicilio",
  "💰 Transferencia a tu cuenta bancaria o método de preferencia de 1 a 3 días hábiles tras inspección",
  "🛡️ Valuación técnica transparente, sin regateos ni comisiones ocultas • Lion Games & TVs",
  "✨ ¿Tienes ediciones especiales o carcasas de colección? ¡Escríbenos y cotiza de inmediato!",
  "📱 Atención personalizada y asesoría técnica directa vía WhatsApp: 55 1234 5678"
];

// ========================================================
// Main Navbar Component
// ========================================================
export default function Navbar({ currentView, setView, onSelectBrand, onSelectCategory }) {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const navRef = useRef(null);

  // Close mega dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setCatDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrandClick = (brandName) => {
    if (onSelectBrand) {
      onSelectBrand(brandName);
    }
    setView('consoles');
    setCatDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'consoles') {
      if (onSelectBrand) onSelectBrand('all');
      setView('consoles');
    } else {
      if (onSelectCategory) onSelectCategory(categoryName);
      setView('catalogue');
    }
    setCatDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isHomeActive = currentView === 'home';

  // 7 Category definitions (No Atari, PS1 pantalla portátil + PS2, Xbox Clásico Original, TVs analógicas CRT)
  const CATEGORIES = [
    {
      id: 'nintendo',
      name: 'Nintendo',
      subtitle: 'NES, SNES, N64 y más',
      component: <NesControllerSvg />,
      action: () => handleBrandClick('Nintendo')
    },
    {
      id: 'playstation',
      name: 'PlayStation',
      subtitle: 'PS1 con pantalla portátil y PS2',
      component: <PlaystationSvg />,
      action: () => handleBrandClick('PlayStation')
    },
    {
      id: 'xbox',
      name: 'Xbox',
      subtitle: 'Xbox Clásico (Original)',
      component: <XboxSvg />,
      action: () => handleBrandClick('Xbox')
    },
    {
      id: 'sega',
      name: 'Sega y Retro',
      subtitle: 'Genesis, Dreamcast y más',
      component: <SegaSvg />,
      action: () => handleBrandClick('Sega')
    },
    {
      id: 'video_games',
      name: 'Videojuegos',
      subtitle: 'Juegos para todas las consolas',
      component: <VideoGamesSvg />,
      action: () => handleCategoryClick('video_games')
    },
    {
      id: 'accessories',
      name: 'Accesorios',
      subtitle: 'Controles, cables y más',
      component: <AccessoriesSvg />,
      action: () => handleCategoryClick('accessories')
    },
    {
      id: 'retro_tvs',
      name: 'Tvs analógicas CRT',
      subtitle: '13" a 21" temáticas, Cars y más',
      component: <CrtTvSvg />,
      action: () => handleCategoryClick('retro_tvs')
    }
  ];

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-900 text-white transition-all shadow-2xl">

      {/* ======================================================== */}
      {/* 1. RUNNING MARQUEE ANNOUNCEMENT BAR (AT THE VERY TOP)   */}
      {/* ======================================================== */}
      <div className="w-full bg-[#070709] border-b border-[#F5A623]/25 py-2 px-3 sm:px-4 overflow-hidden relative select-none z-50 flex items-center shadow-inner">
        {/* Live Indicator Badge */}
        <div className="flex items-center gap-2 pr-3 sm:pr-4 shrink-0 z-20 bg-[#070709] border-r border-[#F5A623]/30">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F5A623] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F5A623]"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#F5A623] font-display whitespace-nowrap">
            AVISOS EN VIVO
          </span>
        </div>

        {/* Marquee Smooth Continuous Scroller (Paused on Hover) */}
        <div className="overflow-hidden w-full relative">
          <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs text-neutral-300 font-medium cursor-default">
            {/* Set 1 */}
            {ANNOUNCEMENTS.map((text, idx) => (
              <div key={`msg-1-${idx}`} className="flex items-center gap-3">
                <span className="text-neutral-200">{text}</span>
                <span className="text-[#F5A623] font-bold">★</span>
              </div>
            ))}
            {/* Set 2 (Seamless loop duplicate) */}
            {ANNOUNCEMENTS.map((text, idx) => (
              <div key={`msg-2-${idx}`} className="flex items-center gap-3">
                <span className="text-neutral-200">{text}</span>
                <span className="text-[#F5A623] font-bold">★</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN NAVBAR BAR                                      */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Logo (Lion Games and TVs / RetroCompra) */}
          <div
            onClick={() => { setView('home'); setCatDropdownOpen(false); }}
            className="flex items-center cursor-pointer select-none group py-1 shrink-0"
          >
            <img
              src={logoImg}
              alt="RetroCompra"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_12px_rgba(245,166,35,0.2)]"
            />
          </div>

          {/* Center Navigation Links (Matching Screenshot Layout) */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5">

            {/* Inicio (Golden Pill with Home Icon) */}
            <button
              onClick={() => { setView('home'); setCatDropdownOpen(false); }}
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 ${isHomeActive
                ? 'border border-[#F5A623] bg-neutral-900/90 text-white shadow-[0_0_15px_rgba(245,166,35,0.3)] scale-[1.02]'
                : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                }`}
            >
              <Home className="w-4 h-4 text-[#F5A623]" />
              <span>Inicio</span>
            </button>

            {/* Categorías (Golden Active Pill Button with Chevron) */}
            <button
              onClick={() => setCatDropdownOpen(!catDropdownOpen)}
              className={`px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 ${catDropdownOpen
                ? 'border-2 border-[#F5A623] bg-neutral-900 text-[#F5A623] shadow-[0_0_22px_rgba(245,166,35,0.45)] scale-[1.02]'
                : 'border border-[#F5A623]/80 bg-neutral-900/80 text-neutral-200 hover:text-[#F5A623] hover:border-[#F5A623] shadow-[0_0_10px_rgba(245,166,35,0.2)]'
                }`}
            >
              <span>Categorías</span>
              <ChevronDown className={`w-4 h-4 text-[#F5A623] transition-transform duration-300 ${catDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Cómo Funciona */}
            <button
              onClick={() => { setView('how-it-works'); setCatDropdownOpen(false); }}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${currentView === 'how-it-works' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-white'
                }`}
            >
              Cómo Funciona
            </button>

            {/* Ediciones Especiales */}
            <button
              onClick={() => { setView('special-editions'); setCatDropdownOpen(false); }}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${currentView === 'special-editions' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-[#F5A623]'
                }`}
            >
              Ediciones Especiales
            </button>

            {/* Sobre Nosotros */}
            <button
              onClick={() => { setView('about'); setCatDropdownOpen(false); }}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${currentView === 'about' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-white'
                }`}
            >
              Sobre Nosotros
            </button>

            {/* Contáctanos */}
            <button
              onClick={() => { setView('contact'); setCatDropdownOpen(false); }}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${currentView === 'contact' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-white'
                }`}
            >
              Contáctanos
            </button>

          </nav>

          {/* Right Icons & Admin Button (Matching Screenshot Layout) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* 1. Shopping Cart Icon with Red Counter Badge */}
            <button
              onClick={openCart}
              className="relative w-10 h-10 rounded-full border border-[#F5A623]/80 bg-neutral-900/90 hover:bg-neutral-800 hover:border-[#F5A623] transition-all flex items-center justify-center text-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.25)] hover:scale-110 active:scale-95 group"
              title="Carrito de Venta"
              aria-label="Carrito de Venta"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white font-black text-[10px] flex items-center justify-center shadow-md">
                {itemCount}
              </span>
            </button>

            {/* 2. Gift / Package Icon (Tracking de Folio) */}
            <button
              onClick={() => { setView('track'); setCatDropdownOpen(false); }}
              className="w-10 h-10 rounded-full border border-[#F5A623]/80 bg-neutral-900/90 hover:bg-neutral-800 hover:border-[#F5A623] transition-all flex items-center justify-center text-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.25)] hover:scale-110 active:scale-95 group"
              title="Rastrear Solicitud / Folio"
              aria-label="Rastrear Solicitud"
            >
              <Gift className="w-4 h-4 text-[#F5A623]" />
            </button>

            {/* 3. Admin Button (Filled Golden Capsule) */}
            <button
              onClick={() => { setView('admin'); setCatDropdownOpen(false); }}
              className="btn-shimmer px-4 py-2 rounded-full bg-gradient-to-r from-[#F5A623] via-[#E59819] to-[#D48806] text-black font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,166,35,0.4)] hover:brightness-110 hover:scale-105 active:scale-95 transition-all"
              title="Panel de Administración"
            >
              <Shield className="w-4 h-4 fill-black text-black" />
              <span>Admin</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors ml-1"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 3. COMPACT CATEGORY SUB-MENU (REDUCED SLEEK HEIGHT)      */}
        {/* ======================================================== */}
        {catDropdownOpen && (
          <div className="fixed left-1/2 -translate-x-1/2 top-28 w-[95vw] max-w-6xl z-50 animate-mega-menu pt-1">
            <div
              style={{
                background: 'radial-gradient(ellipse at 25% 10%, rgba(245, 166, 35, 0.12) 0%, transparent 50%), #0C0D10'
              }}
              className="backdrop-blur-2xl rounded-3xl sm:rounded-[2rem] border border-[#F5A623]/70 p-4 sm:p-5 shadow-[0_0_50px_rgba(245,166,35,0.28),0_25px_60px_rgba(0,0,0,0.95)] space-y-3"
            >

              {/* Header inside Sub-Menu (Compact) */}
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800/80">
                <div className="flex items-center gap-2.5">
                  {/* Yellow Gamepad Icon matching reference image */}
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#F5A623] text-[#F5A623] drop-shadow-[0_2px_8px_rgba(245,166,35,0.5)]">
                    <path d="M7 6h10a6 6 0 0 1 6 6v3a4 4 0 0 1-6.9 2.6L13.7 15H10.3l-2.4 2.6A4 4 0 0 1 1 15v-3a6 6 0 0 1 6-6zm-1 5v2h2v-2H6zm2 2v2H6v-2h2zm-2 0H4v-2h2v2zm2-2V9H6v2h2zm9-1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm2 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                  </svg>
                  <div className="w-0.5 h-5 bg-[#F5A623] mx-0.5 rounded-full" />
                  <h2 className="text-base sm:text-lg font-black text-white font-display tracking-tight">
                    Explora por Categoría
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  {/* "Todas las Categorías ->" Pill Button with Star */}
                  <button
                    onClick={() => handleCategoryClick('consoles')}
                    className="px-3.5 py-1 rounded-full border border-[#F5A623]/80 bg-black/40 hover:bg-[#F5A623] text-[#F5A623] hover:text-black text-[11px] font-black flex items-center gap-1.5 transition-all duration-200 shadow-sm hover:scale-105"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>Todas las Categorías →</span>
                  </button>

                  <button
                    onClick={() => setCatDropdownOpen(false)}
                    className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                    aria-label="Cerrar submenú"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 8 Themed Category Cards (Compact Height: min-h-[140px], Image h-16 sm:h-20) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={cat.action}
                    className="bg-[#16171B] hover:bg-[#1E2026] border border-neutral-800 hover:border-[#F5A623] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(245,166,35,0.2)] min-h-[135px] sm:min-h-[145px] shadow-sm"
                  >
                    {/* Compact Upper Visual Container */}
                    <div className="w-full h-16 sm:h-20 flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
                      {cat.component}
                    </div>

                    {/* Bottom Row: Title + Subtitle on Left, Chevron Arrow on Right */}
                    <div className="flex items-end justify-between pt-2 border-t border-neutral-800/60 mt-1">
                      <div>
                        <h3 className="font-extrabold text-xs sm:text-sm text-white group-hover:text-[#F5A623] transition-colors font-display tracking-tight leading-tight">
                          {cat.name}
                        </h3>
                        <p className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 line-clamp-1 font-medium">
                          {cat.subtitle}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0 ml-1.5" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-900 space-y-2 animate-fade-in text-sm font-semibold">
            <div
              onClick={() => { setView('home'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-[#F5A623]" />
              <span>Inicio</span>
            </div>

            <div
              onClick={() => { setCatDropdownOpen(!catDropdownOpen); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-[#F5A623] font-bold hover:bg-neutral-900 cursor-pointer flex items-center justify-between"
            >
              <span>Explorar Categorías</span>
              <ChevronDown className="w-4 h-4 text-[#F5A623]" />
            </div>

            <div
              onClick={() => { setView('consoles'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer"
            >
              Vende tus Consolas Retro
            </div>

            <div
              onClick={() => { handleCategoryClick('video_games'); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer"
            >
              Videojuegos
            </div>

            <div
              onClick={() => { handleCategoryClick('retro_tvs'); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer"
            >
              Tvs analógicas CRT (13" a 21")
            </div>

            <div
              onClick={() => { setView('special-editions'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-[#F5A623] hover:bg-neutral-900 cursor-pointer flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Ediciones Especiales</span>
            </div>

            <div
              onClick={() => { setView('how-it-works'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer"
            >
              Cómo Funciona
            </div>

            <div
              onClick={() => { setView('about'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer"
            >
              Sobre Nosotros
            </div>

            <div
              onClick={() => { setView('contact'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer"
            >
              Contáctanos
            </div>

            <div
              onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-black font-bold bg-[#F5A623] rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md"
            >
              <Shield className="w-4 h-4 fill-black text-black" />
              <span>Panel de Administración</span>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
