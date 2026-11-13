import React from 'react';
import { Mail, MessageSquare, Facebook, Youtube, Instagram, Twitter, Phone } from 'lucide-react';

export default function Footer({ setView }) {
  return (
    <footer className="bg-[#0B0F19] border-t border-slate-800 text-slate-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <svg className="w-6 h-6 text-slate-950" viewBox="0 0 24 24" fill="currentColor">
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
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your trusted partner for buying pre-owned games, consoles and retro CRT televisions in Mexico.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-amber-500 hover:text-slate-950 flex items-center justify-center text-slate-300 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setView('sell')} className="hover:text-amber-400 transition-colors">
                  Sell Your Gear
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-amber-400 transition-colors">
                  Consoles
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-amber-400 transition-colors">
                  Video Games
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-amber-400 transition-colors">
                  Accessories
                </button>
              </li>
              <li>
                <button onClick={() => setView('catalogue')} className="hover:text-amber-400 transition-colors">
                  Retro CRT TVs
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setView('about')} className="hover:text-amber-400 transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setView('how-it-works')} className="hover:text-amber-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setView('faq')} className="hover:text-amber-400 transition-colors">
                  FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setView('track')} className="hover:text-amber-400 transition-colors">
                  Rastreo de Folio
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setView('contact')} className="hover:text-amber-400 transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => setView('shipping-policy')} className="hover:text-amber-400 transition-colors">
                  Shipping & Inspection
                </button>
              </li>
              <li>
                <button onClick={() => setView('privacy')} className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setView('terms')} className="hover:text-amber-400 transition-colors">
                  Terms of Service
                </button>
              </li>
            </ul>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Lion Games & TVs. All rights reserved.</p>
          <p className="text-slate-400">
            Mercado Objetivo: México | Moneda: MXN | Plataforma C2B de Recompra Inversa
          </p>
        </div>
      </div>
    </footer>
  );
}
