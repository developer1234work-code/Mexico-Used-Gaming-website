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
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  const navLinkClass = (viewName) =>
    `cursor-pointer transition-colors duration-150 text-sm font-medium ${
      currentView === viewName ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setView('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* Stylized Golden Lion Emblem */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white leading-none">
                LION
              </span>
              <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-400 uppercase leading-tight">
                GAMES & TVs
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
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
                className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
              >
                Categories
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>

              <div className="absolute top-full left-0 w-64 pt-2 hidden group-hover:block z-50">
                <div className="bg-[#111827] border border-slate-700/80 rounded-xl p-2 shadow-2xl space-y-1">
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <Gamepad2 className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-sm font-medium">Gaming Consoles</div>
                      <div className="text-xs text-slate-400">PS5, Xbox Series, Switch</div>
                    </div>
                  </div>
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <Disc className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-sm font-medium">Video Games</div>
                      <div className="text-xs text-slate-400">Títulos actuales y retro</div>
                    </div>
                  </div>
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-sm font-medium">Controllers & Accessories</div>
                      <div className="text-xs text-slate-400">Mandos, cables y cajas</div>
                    </div>
                  </div>
                  <div 
                    onClick={() => { setView('catalogue'); setCatDropdownOpen(false); }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-800 text-slate-200 hover:text-white cursor-pointer transition-colors"
                  >
                    <Tv className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-sm font-medium">Retro CRT TVs</div>
                      <div className="text-xs text-slate-400">Trinitron, PVM, JVC D-Series</div>
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
              className={`flex items-center gap-1.5 ${navLinkClass('admin')} text-xs px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 hover:border-amber-500/50`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Admin Dashboard
            </span>
          </nav>

          {/* Right Header CTAs & Selling Cart */}
          <div className="flex items-center gap-3">
            
            {/* Selling Cart Pill */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700 hover:border-amber-500/60 transition-all text-slate-200 hover:text-white"
              title="Ver carrito de venta"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 uppercase font-semibold leading-none">Mi Venta</span>
                <span className="text-xs font-bold text-amber-300 leading-tight">
                  {totalEstimate > 0 ? formatMXN(totalEstimate) : 'Vacío'}
                </span>
              </div>
              {itemCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[11px] flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button: "Get a Quote" */}
            <button
              onClick={() => setView('sell')}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              Get a Quote
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 space-y-2">
            <div 
              onClick={() => { setView('home'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              Home
            </div>
            <div 
              onClick={() => { setView('sell'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-amber-400 font-semibold hover:bg-slate-800"
            >
              Sell Your Gear
            </div>
            <div 
              onClick={() => { setView('catalogue'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              Browse Catalogue
            </div>
            <div 
              onClick={() => { setView('how-it-works'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              How It Works
            </div>
            <div 
              onClick={() => { setView('about'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              About Us
            </div>
            <div 
              onClick={() => { setView('faq'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              FAQs
            </div>
            <div 
              onClick={() => { setView('track'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-slate-200 hover:bg-slate-800"
            >
              Rastrear Folio
            </div>
            <div 
              onClick={() => { setView('admin'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg text-amber-300 bg-slate-800/80 flex items-center gap-2"
            >
              <Lock className="w-4 h-4" /> Admin Dashboard
            </div>
            <div className="pt-2">
              <button
                onClick={() => { setView('sell'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl font-bold text-center text-slate-950 bg-amber-400"
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
