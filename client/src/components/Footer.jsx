import React from 'react';
import { Mail, Phone, MapPin, Facebook, Youtube, Instagram, Gamepad2, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.png';

export default function Footer({ setView, onSelectCategory }) {
  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-300 pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800/80">
          
          {/* Col 1 & 2: Brand info with visible logo */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => setView('home')} 
              className="cursor-pointer inline-block group"
            >
              <img 
                src={logoImg} 
                alt="RetroCompra" 
                className="h-16 sm:h-20 w-auto object-contain brightness-110 group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
              Tu destino confiable para vender videojuegos, consolas de todas las generaciones y televisores retro CRT en México con cotización instantánea y pago seguro.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#F5A623] hover:text-black flex items-center justify-center text-neutral-400 transition-colors border border-neutral-800 hover:border-[#F5A623]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#F5A623] hover:text-black flex items-center justify-center text-neutral-400 transition-colors border border-neutral-800 hover:border-[#F5A623]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-900 hover:bg-[#F5A623] hover:text-black flex items-center justify-center text-neutral-400 transition-colors border border-neutral-800 hover:border-[#F5A623]"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5A623]">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setView('home')} className="hover:text-white transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => setView('consoles')} className="hover:text-[#F5A623] font-semibold transition-colors">
                  Vende tus Consolas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { if (onSelectCategory) onSelectCategory('video_games'); setView('catalogue'); }} 
                  className="hover:text-white transition-colors"
                >
                  Videojuegos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { if (onSelectCategory) onSelectCategory('retro_tvs'); setView('catalogue'); }} 
                  className="hover:text-white transition-colors"
                >
                  TVs CRT Retro
                </button>
              </li>
              <li>
                <button onClick={() => setView('special-editions')} className="hover:text-white transition-colors">
                  Ediciones Especiales
                </button>
              </li>
              <li>
                <button onClick={() => setView('how-it-works')} className="hover:text-white transition-colors">
                  ¿Cómo Funciona?
                </button>
              </li>
              <li>
                <button onClick={() => setView('faq')} className="hover:text-white transition-colors">
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Información */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5A623]">
              Información
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => setView('about')} className="hover:text-white transition-colors">
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button onClick={() => setView('terms')} className="hover:text-white transition-colors">
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button onClick={() => setView('privacy')} className="hover:text-white transition-colors">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => setView('shipping-policy')} className="hover:text-white transition-colors">
                  Envíos e Inspección Técnica
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-xl">
                <ShieldCheck className="w-3.5 h-3.5" /> Recompra Garantizada MXN
              </span>
            </div>
          </div>

          {/* Col 5: Contáctanos */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#F5A623]">
              Contáctanos
            </h4>
            <ul className="space-y-3 text-xs text-neutral-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F5A623] shrink-0" />
                <a 
                  href="https://wa.me/525512345678?text=Hola%20RetroCompra,%20quiero%20vender%20mis%20art%C3%ADculos" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition-colors font-mono"
                >
                  55 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F5A623] shrink-0" />
                <a href="mailto:hola@retrocompra.com" className="hover:text-white transition-colors">
                  hola@retrocompra.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5A623] shrink-0" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-neutral-500">
              Atención a clientes: Lunes a Sábado de 10:00 a 19:00 hrs (CDMX)
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© 2026 RetroCompra. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-neutral-300">
            <Gamepad2 className="w-4 h-4 text-[#F5A623]" />
            <span className="font-semibold">¡Dale una segunda vida a tus videojuegos y consolas!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
