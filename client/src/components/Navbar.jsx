import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ChevronDown, 
  Menu, 
  X, 
  Lock, 
  Search, 
  Tv, 
  Gamepad2, 
  Disc, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatMXN } from '../utils/formatters';

export default function Navbar({ currentView, setView }) {
  const { itemCount, totalEstimate, openCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const navLinkClass = (viewName) =>
    `cursor-pointer transition-colors duration-200 text-[13px] font-semibold tracking-wide ${
      currentView === viewName ? 'text-[#F5A623]' : 'text-neutral-300 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-neutral-900 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setView('home')} 
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Stylized Golden Lion Emblem */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A623] via-[#E59819] to-[#B87406] flex items-center justify-center shadow-lg shadow-[#F5A623]/20 group-hover:scale-105 transition-all duration-300">
              <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[19px] font-black tracking-wider text-white leading-none font-display">
                LION
              </span>
              <span className="text-[10px] tracking-[0.25em] font-bold text-[#F5A623] uppercase leading-tight mt-0.5">
                GAMES & TVs
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <span onClick={() => setView('home')} className={navLinkClass('home')}>
              Home
            </span>
            <span onClick={() => setView('sell')} className={navLinkClass('sell')}>
              Sell Your Gear
            </span>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-neutral-300 hover:text-white transition-colors py-2"
              >
                <span>Categories</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-[#F5A623] transition-transform duration-200 group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block z-50 animate-fade-in">
                <div className="bg-[#09090b] border border-neutral-800 rounded-2xl p-2 shadow-2xl space-y-1">
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 text-neutral-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <Gamepad2 className="w-4 h-4 text-[#F5A623]" />
                    <div>
                      <div className="text-xs font-semibold">Gaming Consoles</div>
                      <div className="text-[11px] text-neutral-400">PS5, Xbox Series, Switch</div>
                    </div>
                  </div>
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 text-neutral-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <Disc className="w-4 h-4 text-[#F5A623]" />
                    <div>
                      <div className="text-xs font-semibold">Video Games</div>
                      <div className="text-[11px] text-neutral-400">Títulos actuales y retro</div>
                    </div>
                  </div>
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 text-neutral-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[#F5A623]" />
                    <div>
                      <div className="text-xs font-semibold">Controllers & Accessories</div>
                      <div className="text-[11px] text-neutral-400">Mandos, cables y cajas</div>
                    </div>
                  </div>
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-900 text-neutral-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <Tv className="w-4 h-4 text-[#F5A623]" />
                    <div>
                      <div className="text-xs font-semibold">Retro CRT TVs</div>
                      <div className="text-[11px] text-neutral-400">Trinitron, PVM, JVC D-Series</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span onClick={() => setView('how-it-works')} className={navLinkClass('how-it-works')}>
              How It Works
            </span>
            <span onClick={() => setView('about')} className={navLinkClass('about')}>
              About Us
            </span>
            <span onClick={() => setView('faq')} className={navLinkClass('faq')}>
              FAQs
            </span>
            <span onClick={() => setView('track')} className={navLinkClass('track')}>
              Rastrear Folio
            </span>
            <span 
              onClick={() => setView('admin')} 
              className={`flex items-center gap-1.5 ${navLinkClass('admin')} text-xs px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#F5A623]/50 transition-all`}
            >
              <Lock className="w-3.5 h-3.5 text-[#F5A623]" />
              <span>Admin Dashboard</span>
            </span>
          </nav>

          {/* Right Header CTAs & Selling Cart */}
          <div className="flex items-center gap-3.5">
            
            {/* Selling Cart Pill */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#F5A623]/60 transition-all text-neutral-200 hover:text-white"
              title="Ver carrito de venta"
            >
              <ShoppingBag className="w-4 h-4 text-[#F5A623]" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[9px] text-neutral-400 uppercase font-bold tracking-wider leading-none">Mi Venta</span>
                <span className="text-xs font-extrabold text-[#F5A623] leading-tight font-mono">
                  {totalEstimate > 0 ? formatMXN(totalEstimate) : 'Vacío'}
                </span>
              </div>
              {itemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#F5A623] text-black font-black text-[11px] flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: "Get a Quote" */}
            <button
              onClick={() => setView('sell')}
              className="btn-shimmer hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide bg-gradient-to-r from-[#F5A623] via-[#E59819] to-[#D48806] hover:brightness-105 text-black shadow-md shadow-[#F5A623]/20 hover:shadow-[#F5A623]/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Get a Quote</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-900 space-y-2 animate-fade-in">
            <div 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-neutral-200 hover:bg-neutral-900 cursor-pointer text-sm font-semibold"
            >
              Home
            </div>
            <div 
              onClick={() => { setView('sell'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-[#F5A623] font-bold hover:bg-neutral-900 cursor-pointer text-sm"
            >
              Sell Your Gear
            </div>
            <div 
              onClick={() => { setView('catalogue'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-neutral-200 hover:bg-neutral-900 cursor-pointer text-sm font-semibold"
            >
              Browse Catalogue
            </div>
            <div 
              onClick={() => { setView('how-it-works'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-neutral-200 hover:bg-neutral-900 cursor-pointer text-sm font-semibold"
            >
              How It Works
            </div>
            <div 
              onClick={() => { setView('about'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-neutral-200 hover:bg-neutral-900 cursor-pointer text-sm font-semibold"
            >
              About Us
            </div>
            <div 
              onClick={() => { setView('faq'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-neutral-200 hover:bg-neutral-900 cursor-pointer text-sm font-semibold"
            >
              FAQs
            </div>
            <div 
              onClick={() => { setView('track'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-neutral-200 hover:bg-neutral-900 cursor-pointer text-sm font-semibold"
            >
              Rastrear Folio
            </div>
            <div 
              onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
              className="px-3.5 py-2 rounded-xl text-amber-300 bg-neutral-900 border border-neutral-800 flex items-center gap-2 text-xs font-semibold"
            >
              <Lock className="w-3.5 h-3.5" /> Admin Dashboard
            </div>
            <div className="pt-2">
              <button
                onClick={() => { setView('sell'); setMobileMenuOpen(false); }}
                className="w-full py-3 rounded-xl font-bold text-center text-black bg-[#F5A623] hover:bg-[#E59819] text-xs transition-colors"
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
