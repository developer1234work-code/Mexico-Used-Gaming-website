import React, { useState, useEffect, useRef } from 'react';
import { 
  Home,
  ChevronDown, 
  Menu, 
  X, 
  ShoppingBag, 
  Gift, 
  User, 
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

// 2. PlayStation (PS5 Tower + DualSense)
function PlaystationSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-24 h-13 sm:w-28 sm:h-15 object-contain drop-shadow-md">
      {/* PS5 Console Tower */}
      <path d="M 28 6 Q 34 38 31 78 L 47 78 Q 50 38 45 6 Z" fill="#F8FAFC" />
      <path d="M 33 12 L 44 12 L 45 74 L 34 74 Z" fill="#090D16" />
      {/* Blue LED Light Strip */}
      <path d="M 33 12 L 34 72" stroke="#38BDF8" strokeWidth="1.2" opacity="0.95" />
      {/* DualSense Controller */}
      <path d="M 64 36 C 64 30, 118 30, 118 36 C 122 50, 124 70, 116 72 C 110 74, 104 60, 98 55 L 84 55 C 78 60, 72 74, 66 72 C 58 70, 60 50, 64 36 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.2" />
      {/* Center Black touchpad */}
      <rect x="80" y="34" width="22" height="13" rx="3" fill="#090D16" />
      <rect x="79.5" y="33.5" width="23" height="14" rx="3.5" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.8" />
      {/* Thumbsticks */}
      <circle cx="82" cy="55" r="5" fill="#334155" stroke="#1E293B" strokeWidth="1" />
      <circle cx="100" cy="55" r="5" fill="#334155" stroke="#1E293B" strokeWidth="1" />
      {/* D-pad and Action buttons */}
      <circle cx="73" cy="41" r="2.5" fill="#94A3B8" />
      <circle cx="109" cy="41" r="2.5" fill="#94A3B8" />
    </svg>
  );
}

// 3. Xbox (Xbox Series X Tower + Wireless Controller)
function XboxSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-24 h-13 sm:w-28 sm:h-15 object-contain drop-shadow-md">
      {/* Series X Monolith Tower */}
      <rect x="25" y="10" width="30" height="66" rx="3" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
      {/* Top green concave ventilating exhaust */}
      <ellipse cx="40" cy="10" rx="14" ry="3.5" fill="#10B981" opacity="0.9" />
      {/* Glowing Xbox logo power button */}
      <circle cx="33" cy="18" r="2.5" fill="#F4F4F5" />
      <rect x="31" y="40" width="1.5" height="18" fill="#3F3F46" />
      {/* Xbox Wireless Controller */}
      <path d="M 70 34 C 70 28, 120 28, 120 34 C 124 48, 126 68, 118 70 C 112 72, 106 58, 100 55 L 86 55 C 80 58, 74 72, 68 70 C 60 68, 62 48, 70 34 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
      {/* Xbox jewel */}
      <circle cx="95" cy="35" r="3.5" fill="#F4F4F5" />
      {/* Left thumbstick */}
      <circle cx="82" cy="42" r="5" fill="#27272A" stroke="#52525B" strokeWidth="0.8" />
      {/* Right thumbstick */}
      <circle cx="103" cy="52" r="5" fill="#27272A" stroke="#52525B" strokeWidth="0.8" />
      {/* D-pad */}
      <circle cx="88" cy="54" r="4" fill="#3F3F46" />
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

// 5. Atari y Sistemas Clásicos (Iconic Red ATARI Fuji Logo)
function AtariSvg() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg viewBox="0 0 90 55" className="w-14 h-9 sm:w-16 sm:h-10 object-contain drop-shadow-[0_3px_12px_rgba(229,37,33,0.5)]">
        {/* Central pillar */}
        <rect x="41" y="2" width="8" height="38" fill="#E52521" rx="1.5" />
        {/* Left wing */}
        <path d="M 18 40 C 27 40, 32 22, 34 2 L 27 2 C 25 20, 20 33, 11 40 Z" fill="#E52521" />
        {/* Right wing */}
        <path d="M 72 40 C 63 40, 58 22, 56 2 L 63 2 C 65 20, 70 33, 79 40 Z" fill="#E52521" />
      </svg>
      <span className="text-xs sm:text-sm font-black tracking-[0.25em] text-[#E52521] mt-0.5 select-none font-display">
        ATARI
      </span>
    </div>
  );
}

// 6. Videojuegos (Retro Golden Cartridges)
function VideoGamesSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-26 h-13 sm:w-30 sm:h-15 object-contain drop-shadow-md">
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

// 7. Accesorios (Dual Retro Controllers)
function AccessoriesSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-26 h-13 sm:w-30 sm:h-15 object-contain drop-shadow-md">
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

// 8. Televisiones CRT (Classic CRT Monitor with pixel game screen)
function CrtTvSvg() {
  return (
    <svg viewBox="0 0 140 85" className="w-24 h-13 sm:w-28 sm:h-15 object-contain drop-shadow-md">
      {/* Vintage Wood Bezel TV */}
      <rect x="22" y="12" width="96" height="66" rx="8" fill="#78350F" stroke="#451A03" strokeWidth="2" />
      {/* Inner Screen Bezel */}
      <rect x="28" y="18" width="66" height="54" rx="6" fill="#1C1917" stroke="#292524" strokeWidth="1.5" />
      {/* Glass Tube with 2D Mario Game */}
      <rect x="31" y="21" width="60" height="48" rx="5" fill="#38BDF8" />
      {/* Sky & Clouds */}
      <ellipse cx="44" cy="28" rx="7" ry="3" fill="#FFFFFF" />
      <ellipse cx="66" cy="30" rx="6" ry="2.5" fill="#FFFFFF" />
      {/* Ground */}
      <rect x="31" y="55" width="60" height="14" fill="#15803D" />
      {/* Brick block & Question block */}
      <rect x="52" y="44" width="8" height="8" fill="#D97706" stroke="#78350F" strokeWidth="0.8" />
      <rect x="62" y="44" width="8" height="8" fill="#EAB308" stroke="#78350F" strokeWidth="0.8" />
      <text x="66" y="50" fill="#78350F" fontSize="5" fontWeight="900" textAnchor="middle">?</text>
      {/* Mario */}
      <rect x="42" y="45" width="7" height="10" fill="#DC2626" />
      <circle cx="45.5" cy="42" r="3" fill="#FDE047" />
      {/* Knobs on the right bezel */}
      <circle cx="104" cy="28" r="4.5" fill="#B45309" stroke="#451A03" strokeWidth="1" />
      <circle cx="104" cy="44" r="4.5" fill="#B45309" stroke="#451A03" strokeWidth="1" />
      <rect x="100" y="56" width="8" height="3" fill="#451A03" />
      <rect x="100" y="62" width="8" height="3" fill="#451A03" />
      {/* Rabbit-ear Antenna */}
      <line x1="55" y1="12" x2="38" y2="2" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
      <line x1="75" y1="12" x2="92" y2="2" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Announcements list for the running marquee
const ANNOUNCEMENTS = [
  "⚡ ¡Compramos tus consolas y videojuegos usados en todo México con cotización garantizada en MXN!",
  "🎮 Nintendo, PlayStation, Xbox, Sega, Atari y sistemas retro al mejor valor del mercado",
  "🚚 Envíos asegurados y guías de paquetería prepagada (Estafeta y DHL) con recolección directa",
  "💰 Depósito y transferencia electrónica a tu cuenta bancaria el mismo día de la inspección",
  "📺 Compramos televisores de tubo CRT para retrogaming (Sony Trinitron, PVM y monitores de tubo)",
  "🛡️ Valuación técnica transparente, sin regateos ni comisiones ocultas",
  "✨ ¿Tienes ediciones especiales o de colección? ¡Escríbenos y recibe ofertas preferentes!",
  "📱 Atención personalizada y asesoría directa vía WhatsApp: 55 1234 5678"
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

  // 8 Category definitions matching the user reference image structure
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
      subtitle: 'PS1, PS2, PS3, PS4, PS5',
      component: <PlaystationSvg />,
      action: () => handleBrandClick('PlayStation')
    },
    {
      id: 'xbox',
      name: 'Xbox',
      subtitle: 'Xbox Clásico, 360, One y más',
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
      id: 'atari',
      name: 'Atari y Sistemas Clásicos',
      subtitle: '2600, 5200, 7800 y más',
      component: <AtariSvg />,
      action: () => handleBrandClick('Atari')
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
      name: 'Televisiones CRT',
      subtitle: 'Trinitron, WEGA y más',
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
              className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 ${
                isHomeActive 
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
              className={`px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all duration-200 ${
                catDropdownOpen
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
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                currentView === 'how-it-works' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Cómo Funciona
            </button>

            {/* Ediciones Especiales */}
            <button 
              onClick={() => { setView('special-editions'); setCatDropdownOpen(false); }} 
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                currentView === 'special-editions' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-[#F5A623]'
              }`}
            >
              Ediciones Especiales
            </button>

            {/* Nosotros */}
            <button 
              onClick={() => { setView('about'); setCatDropdownOpen(false); }} 
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                currentView === 'about' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Nosotros
            </button>

            {/* Contáctanos */}
            <button 
              onClick={() => { setView('contact'); setCatDropdownOpen(false); }} 
              className={`px-3 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                currentView === 'contact' ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-white'
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

            {/* 3. User Profile Icon */}
            <button
              onClick={() => { setView('admin'); setCatDropdownOpen(false); }}
              className="w-10 h-10 rounded-full border border-[#F5A623]/80 bg-neutral-900/90 hover:bg-neutral-800 hover:border-[#F5A623] transition-all flex items-center justify-center text-[#F5A623] shadow-[0_0_12px_rgba(245,166,35,0.25)] hover:scale-110 active:scale-95 group"
              title="Mi Cuenta"
              aria-label="Mi Cuenta"
            >
              <User className="w-4 h-4 text-[#F5A623]" />
            </button>

            {/* 4. Admin Button (Filled Golden Capsule) */}
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
                    <path d="M7 6h10a6 6 0 0 1 6 6v3a4 4 0 0 1-6.9 2.6L13.7 15H10.3l-2.4 2.6A4 4 0 0 1 1 15v-3a6 6 0 0 1 6-6zm-1 5v2h2v-2H6zm2 2v2H6v-2h2zm-2 0H4v-2h2v2zm2-2V9H6v2h2zm9-1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm2 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
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
              <span>Explorar Categorías (8 Secciones)</span>
              <ChevronDown className="w-4 h-4 text-[#F5A623]" />
            </div>

            <div 
              onClick={() => { setView('consoles'); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-2xl text-neutral-200 hover:bg-neutral-900 cursor-pointer"
            >
              Vende tus Consolas (59+ Sistemas)
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
              Televisiones CRT
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
              Nosotros
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
