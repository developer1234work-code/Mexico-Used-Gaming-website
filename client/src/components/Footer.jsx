import React from 'react';
import { Mail, MessageSquare, Facebook, Youtube, Instagram, Twitter } from 'lucide-react';

export default function Footer({ setView }) {
  return (
    <footer className="bg-black border-t border-neutral-900 text-neutral-300 pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5A623] via-[#E59819] to-[#B87406] flex items-center justify-center shadow-lg shadow-[#F5A623]/20">
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
            
            <p className="text-[13px] text-neutral-400 max-w-sm leading-relaxed">
              Your trusted partner for buying pre-owned games, consoles and retro CRT televisions in Mexico.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#F5A623] hover:text-black flex items-center justify-center text-neutral-400 transition-colors border border-neutral-800 hover:border-[#F5A623]">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#F5A623] hover:text-black flex items-center justify-center text-neutral-400 transition-colors border border-neutral-800 hover:border-[#F5A623]">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#F5A623] hover:text-black flex items-center justify-center text-neutral-400 transition-colors border border-neutral-800 hover:border-[#F5A623]">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#F5A623] hover:text-black flex items-center justify-center text-neutral-400 transition-colors border border-neutral-800 hover:border-[#F5A623]">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">Explore</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setView('sell')} className="hover:text-white transition-colors">
                  Sell Your Gear
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-white transition-colors">
                  Consoles
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-white transition-colors">
                  Video Games
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-white transition-colors">
                  Accessories
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-white transition-colors">
                  Retro CRT TVs
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">Company</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setView('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setView('how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setView('faq')} className="hover:text-white transition-colors">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setView('track')} className="hover:text-white transition-colors">
                  Rastreo de Folio
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5A623]">Support</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setView('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => setView('shipping-policy')} className="hover:text-white transition-colors">
                  Shipping & Inspection
                </button>
              </li>
              <li>
                <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setView('terms')} className="hover:text-white transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>

            <div className="pt-2 space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F5A623]" />
                <a href="mailto:contacto@liongamestv.mx" className="hover:text-white transition-colors">
                  contacto@liongamestv.mx
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <a 
                  href="https://wa.me/525587654321?text=Hola%20Lion%20Games%20%26%20TVs,%20deseo%20vender%20mis%20art%C3%ADculos" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Support (+52 55 8765 4321)
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Lion Games & TVs. All rights reserved.</p>
          <p className="text-neutral-500">
            Mercado Objetivo: México | Moneda: MXN | Plataforma C2B de Recompra Inversa
          </p>
        </div>
      </div>
    </footer>
  );
}
