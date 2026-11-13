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
  ChevronRight,
  HelpCircle,
  Truck,
  ShieldCheck,
  FileText,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import logoImg from '../assets/logo.png';

// ========================================================
// 8 Pixel-Matched Visual Components (matching screenshot)
// ========================================================

// 1. Nintendo (NES Classic Controller)
function NesControllerSvg() {
  return (
    <svg viewBox="0 0 100 64" className="w-full h-full object-contain drop-shadow-md">
      <rect x="4" y="6" width="92" height="52" rx="4" fill="#C5C7C8" stroke="#4B4F54" strokeWidth="2" />
      {/* Black center stripe */}
      <rect x="8" y="14" width="84" height="36" fill="#18191B" rx="2" />
      {/* Red NES badge */}
      <rect x="12" y="18" width="22" height="4" fill="#E52521" />
      {/* D-Pad */}
      <path d="M 22 24 h 6 v 5 h 5 v 6 h -5 v 5 h -6 v -5 h -5 v -6 h 5 z" fill="#18191B" stroke="#333" strokeWidth="0.8" />
      <circle cx="25" cy="29.5" r="1.5" fill="#4B4F54" />
      {/* Select / Start */}
      <rect x="42" y="32" width="6" height="2.5" rx="1" fill="#8E9297" transform="rotate(-25 45 33)" />
      <rect x="52" y="32" width="6" height="2.5" rx="1" fill="#8E9297" transform="rotate(-25 55 33)" />
      {/* B & A buttons (Red) */}
      <circle cx="70" cy="32" r="4.5" fill="#E52521" stroke="#8E1815" strokeWidth="1" />
      <circle cx="82" cy="32" r="4.5" fill="#E52521" stroke="#8E1815" strokeWidth="1" />
      <text x="70" y="44" fill="#E52521" fontSize="4" fontWeight="bold" textAnchor="middle">B</text>
      <text x="82" y="44" fill="#E52521" fontSize="4" fontWeight="bold" textAnchor="middle">A</text>
    </svg>
  );
}

// 2. PlayStation (PS5 Tower + DualSense)
function PlaystationSvg() {
  return (
    <svg viewBox="0 0 100 64" className="w-full h-full object-contain drop-shadow-md">
      {/* PS5 Console */}
      <path d="M 22 6 Q 26 28 24 58 L 36 58 Q 38 28 34 6 Z" fill="#F8FAFC" />
      <path d="M 25 10 L 33 10 L 34 56 L 26 56 Z" fill="#0F172A" />
      {/* Blue LED line */}
      <path d="M 25 10 L 25 54" stroke="#38BDF8" strokeWidth="1" opacity="0.9" />
      {/* DualSense Controller */}
      <path d="M 50 28 C 50 24, 88 24, 88 28 C 90 38, 92 52, 86 54 C 82 56, 78 46, 75 42 L 63 42 C 60 46, 56 56, 52 54 C 46 52, 48 38, 50 28 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      {/* Center Black touchpad */}
      <rect x="62" y="27" width="14" height="9" rx="2" fill="#0F172A" />
      {/* Thumbsticks */}
      <circle cx="63" cy="42" r="4" fill="#334155" />
      <circle cx="75" cy="42" r="4" fill="#334155" />
      {/* Blue glow around touchpad */}
      <rect x="61.5" y="26.5" width="15" height="10" rx="2.5" fill="none" stroke="#38BDF8" strokeWidth="0.8" opacity="0.8" />
    </svg>
  );
}

// 3. Xbox (Xbox Series X Tower + Wireless Controller)
function XboxSvg() {
  return (
    <svg viewBox="0 0 100 64" className="w-full h-full object-contain drop-shadow-md">
      {/* Series X Tower */}
      <rect x="20" y="10" width="22" height="48" rx="2" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
      {/* Green concave top grill */}
      <ellipse cx="31" cy="10" rx="10" ry="2.5" fill="#10B981" opacity="0.8" />
      <circle cx="25" cy="16" r="1.5" fill="#E4E4E7" />
      <rect x="24" y="32" width="1" height="12" fill="#3F3F46" />
      {/* Xbox Controller */}
      <path d="M 52 26 C 52 22, 88 22, 88 26 C 92 36, 94 50, 88 52 C 84 54, 80 44, 76 42 L 64 42 C 60 44, 56 54, 52 52 C 46 50, 48 36, 52 26 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
      <circle cx="70" cy="27" r="2.5" fill="#E4E4E7" />
      <circle cx="60" cy="32" r="3.5" fill="#27272A" stroke="#52525B" strokeWidth="0.5" />
      <circle cx="74" cy="40" r="3.5" fill="#27272A" stroke="#52525B" strokeWidth="0.5" />
    </svg>
  );
}

// 4. Sega y Retro (Iconic Blue SEGA Striped Logo)
function SegaSvg() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-3xl sm:text-4xl font-black italic tracking-tighter text-[#0060A9] font-display select-none drop-shadow-[0_2px_8px_rgba(0,96,169,0.5)]">
        SEGA
      </span>
    </div>
  );
}

// 5. Atari y Sistemas Clásicos (Iconic Red ATARI Fuji Logo)
function AtariSvg() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg viewBox="0 0 80 50" className="w-16 h-10 object-contain drop-shadow-[0_2px_8px_rgba(229,37,33,0.5)]">
        {/* Central pillar */}
        <rect x="36" y="2" width="8" height="34" fill="#E52521" rx="1" />
        {/* Left wing */}
        <path d="M 16 36 C 24 36, 28 20, 30 2 L 24 2 C 22 18, 18 30, 10 36 Z" fill="#E52521" />
        {/* Right wing */}
        <path d="M 64 36 C 56 36, 52 20, 50 2 L 56 2 C 58 18, 62 30, 70 36 Z" fill="#E52521" />
      </svg>
      <span className="text-[13px] font-black tracking-[0.25em] text-[#E52521] mt-1 select-none font-display">
        ATARI
      </span>
    </div>
  );
}

// 6. Videojuegos (Retro Golden Cartridges)
function VideoGamesSvg() {
  return (
    <svg viewBox="0 0 100 64" className="w-full h-full object-contain drop-shadow-md">
      {/* Back Cartridge */}
      <rect x="18" y="10" width="36" height="44" rx="3" fill="#D4AF37" stroke="#997A15" strokeWidth="1" />
      <rect x="23" y="16" width="26" height="24" rx="1.5" fill="#E2E8F0" />
      <circle cx="36" cy="28" r="6" fill="#EF4444" />
      {/* Front Cartridge (N64 / SNES) */}
      <rect x="42" y="14" width="44" height="44" rx="3" fill="#3B4252" stroke="#2E3440" strokeWidth="1.5" />
      <rect x="48" y="20" width="32" height="26" rx="2" fill="#E5E9F0" />
      {/* Art sticker illustration */}
      <rect x="50" y="22" width="28" height="22" rx="1" fill="#60A5FA" />
      <circle cx="64" cy="30" r="5" fill="#F59E0B" />
      <path d="M 50 40 L 78 40 L 78 44 L 50 44 Z" fill="#10B981" />
      {/* Top grip notches */}
      <line x1="50" y1="14" x2="50" y2="18" stroke="#1F232B" strokeWidth="2" />
      <line x1="78" y1="14" x2="78" y2="18" stroke="#1F232B" strokeWidth="2" />
    </svg>
  );
}

// 7. Accesorios (Dual Retro Controllers)
function AccessoriesSvg() {
  return (
    <svg viewBox="0 0 100 64" className="w-full h-full object-contain drop-shadow-md">
      {/* Left Purple N64 Controller */}
      <path d="M 12 28 C 12 20, 48 20, 48 28 L 48 34 L 42 56 L 36 38 L 30 56 L 24 38 L 18 56 Z" fill="#7C3AED" stroke="#5B21B6" strokeWidth="1" opacity="0.95" />
      <circle cx="30" cy="27" r="4" fill="#D4D4D8" />
      <circle cx="20" cy="30" r="2" fill="#18181B" />
      <circle cx="40" cy="30" r="1.8" fill="#FBBF24" />
      <circle cx="44" cy="27" r="1.8" fill="#FBBF24" />
      {/* Right Modern Gamepad */}
      <path d="M 54 26 C 54 22, 90 22, 90 26 C 94 36, 96 50, 90 52 C 86 54, 82 44, 78 42 L 66 42 C 62 44, 58 54, 54 52 C 48 50, 50 36, 54 26 Z" fill="#1E293B" stroke="#475569" strokeWidth="1" />
      <circle cx="64" cy="32" r="3.5" fill="#38BDF8" />
      <circle cx="78" cy="40" r="3.5" fill="#F43F5E" />
    </svg>
  );
}

// 8. Televisiones CRT (Classic CRT Monitor with pixel game screen)
function CrtTvSvg() {
  return (
    <svg viewBox="0 0 100 64" className="w-full h-full object-contain drop-shadow-md">
      {/* TV Bezel */}
      <rect x="18" y="10" width="64" height="46" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
      {/* Screen frame */}
      <rect x="23" y="14" width="44" height="36" rx="4" fill="#1C1917" stroke="#292524" strokeWidth="1" />
      {/* Screen Glass with Pixel Game */}
      <rect x="25" y="16" width="40" height="32" rx="3" fill="#38BDF8" />
      {/* Cloud & Mario silhouette */}
      <ellipse cx="33" cy="22" rx="5" ry="2.5" fill="#FFFFFF" />
      <ellipse cx="48" cy="24" rx="4" ry="2" fill="#FFFFFF" />
      <rect x="25" y="40" width="40" height="8" fill="#15803D" />
      <rect x="42" y="32" width="6" height="8" fill="#DC2626" />
      <circle cx="45" cy="30" r="2.5" fill="#FDE047" />
      {/* TV Controls & Knobs on right */}
      <circle cx="74" cy="22" r="3" fill="#D97706" stroke="#451A03" strokeWidth="0.8" />
      <circle cx="74" cy="32" r="3" fill="#D97706" stroke="#451A03" strokeWidth="0.8" />
      <rect x="71" y="40" width="6" height="2" fill="#451A03" />
      <rect x="71" y="44" width="6" height="2" fill="#451A03" />
      {/* Antenna */}
      <line x1="42" y1="10" x2="30" y2="2" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="58" y1="10" x2="70" y2="2" stroke="#9CA3AF" strokeWidth="1.5" />
    </svg>
  );
}

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

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-900 text-white transition-all shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. Left Logo (Lion Games and TVs / RetroCompra) */}
          <div 
            onClick={() => { setView('home'); setCatDropdownOpen(false); }} 
            className="flex items-center cursor-pointer select-none group py-1 shrink-0"
          >
            <img 
              src={logoImg} 
              alt="Lion Games & TVs" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_12px_rgba(245,166,35,0.2)]" 
            />
          </div>

          {/* 2. Center Navigation Links (Matching Screenshot Layout) */}
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

          {/* 3. Right Icons & Admin Button (Matching Screenshot Layout) */}
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
        {/* 4. MEGA MENU FLOATING DROPDOWN PANEL (PIXEL-PERFECT) */}
        {/* ======================================================== */}
        {catDropdownOpen && (
          <div className="fixed left-1/2 -translate-x-1/2 top-20 w-[96vw] max-w-6xl z-50 animate-mega-menu pt-3">
            <div className="bg-[#0B0C10]/98 backdrop-blur-2xl rounded-[2.5rem] border-2 border-[#F5A623] p-6 sm:p-8 glow-mega-box shadow-[0_0_60px_rgba(245,166,35,0.35),0_25px_60px_rgba(0,0,0,0.95)] space-y-6">
              
              {/* Top Header inside Mega Menu */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#B87406] flex items-center justify-center text-black font-black shadow-md shadow-[#F5A623]/25">
                    🎮
                  </div>
                  <div className="w-0.5 h-6 bg-[#F5A623] mx-1 rounded-full" />
                  <h2 className="text-lg sm:text-2xl font-black text-white font-display tracking-wide">
                    Explora por Categoría
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleCategoryClick('consoles')}
                    className="px-4 py-2 rounded-full border border-[#F5A623]/80 bg-[#F5A623]/10 hover:bg-[#F5A623]/20 text-[#F5A623] text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm hover:scale-105"
                  >
                    <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                    <span>Todas las Categorías →</span>
                  </button>

                  <button
                    onClick={() => setCatDropdownOpen(false)}
                    className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 8 Category Cards (4 columns x 2 rows) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Nintendo */}
                <div
                  onClick={() => handleBrandClick('Nintendo')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <NesControllerSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        Nintendo
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        NES, SNES, N64 y más
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 2. PlayStation */}
                <div
                  onClick={() => handleBrandClick('PlayStation')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <PlaystationSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        PlayStation
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        PS1, PS2, PS3, PS4, PS5
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 3. Xbox */}
                <div
                  onClick={() => handleBrandClick('Xbox')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <XboxSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        Xbox
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        Xbox Clásico, 360, One y más
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 4. Sega y Retro */}
                <div
                  onClick={() => handleBrandClick('Sega')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <SegaSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        Sega y Retro
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        Genesis, Dreamcast y más
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 5. Atari y Sistemas Clásicos */}
                <div
                  onClick={() => handleBrandClick('Atari')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <AtariSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        Atari y Sistemas Clásicos
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        2600, 5200, 7800 y más
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 6. Videojuegos */}
                <div
                  onClick={() => handleCategoryClick('video_games')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <VideoGamesSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        Videojuegos
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        Juegos para todas las consolas
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 7. Accesorios */}
                <div
                  onClick={() => handleCategoryClick('accessories')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <AccessoriesSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        Accesorios
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        Controles, cables y más
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* 8. Televisiones CRT */}
                <div
                  onClick={() => handleCategoryClick('retro_tvs')}
                  className="bg-[#12141D] hover:bg-[#1A1D2A] border border-neutral-800 hover:border-[#F5A623] rounded-3xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,166,35,0.2)]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <CrtTvSvg />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-white group-hover:text-[#F5A623] transition-colors font-display">
                        Televisiones CRT
                      </h3>
                      <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
                        Trinitron, WEGA y más
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#F5A623] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

              </div>

              {/* Bottom Nav Bar inside Mega Menu (Divided by subtle vertical lines) */}
              <div className="border border-neutral-800 bg-[#07080B]/95 rounded-2xl py-3 px-5 sm:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-neutral-300">
                <button 
                  onClick={() => { setView('faq'); setCatDropdownOpen(false); }}
                  className="hover:text-[#F5A623] flex items-center gap-1.5 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>FAQs</span>
                </button>

                <div className="hidden sm:block text-neutral-700">|</div>

                <button 
                  onClick={() => { setView('shipping-policy'); setCatDropdownOpen(false); }}
                  className="hover:text-[#F5A623] flex items-center gap-1.5 transition-colors"
                >
                  <Truck className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Envíos</span>
                </button>

                <div className="hidden sm:block text-neutral-700">|</div>

                <button 
                  onClick={() => { setView('shipping-policy'); setCatDropdownOpen(false); }}
                  className="hover:text-[#F5A623] flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Inspección y Devoluciones</span>
                </button>

                <div className="hidden sm:block text-neutral-700">|</div>

                <button 
                  onClick={() => { setView('terms'); setCatDropdownOpen(false); }}
                  className="hover:text-[#F5A623] flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Términos y Condiciones</span>
                </button>

                <div className="hidden sm:block text-neutral-700">|</div>

                <button 
                  onClick={() => { setView('privacy'); setCatDropdownOpen(false); }}
                  className="hover:text-[#F5A623] flex items-center gap-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>Política de Privacidad</span>
                </button>
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
