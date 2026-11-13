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

export default function HomePage({ setView, onSelectCategory }) {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(0);

  // Testimonial slider state
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const testimonials = [
    {
      stars: 5,
      quote: "El proceso fue completamente transparente y el equipo me mantuvo informado en todo momento con fotos de la inspección.",
      name: "Alejandro R.",
      location: "Ciudad de México",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      stars: 5,
      quote: "Una forma directa y segura de vender mis consolas antiguas sin lidiar con regateos ni riesgos en la calle. Excelente cotización por mi Nintendo 64.",
      name: "María G.",
      location: "Monterrey, N.L.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      stars: 5,
      quote: "Excelente comunicación desde la creación del folio hasta la transferencia bancaria. El pago llegó el mismo día de la revisión técnica.",
      name: "David M.",
      location: "Guadalajara, Jal.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      stars: 5,
      quote: "Vendí mi televisor Sony Trinitron para retrogaming con recolección especializada en mi domicilio. Trato profesional y seguro.",
      name: "Carlos T.",
      location: "Puebla, Pue.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const faqs = [
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
      a: "¡Por supuesto! Nos especializamos en televisores de tubo CRT coleccionables para retrogaming (Sony Trinitron, monitores profesionales PVM/BVM, JVC). Coordinamos recolecciones especiales en toda la República Mexicana."
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

            {/* Title exactly matching user reference image */}
            <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black tracking-tight text-white leading-[1.08] font-display">
                Vende tus consolas, <br />
                videojuegos y <span className="text-[#F5A623]">TVs</span>
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
                href="https://wa.me/525512345678?text=Hola%20RetroCompra,%20quiero%20vender%20mis%20consolas%20y%20videojuegos"
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

            {/* 1. Consolas (Direct link to Consoles Brand Selector) */}
            <div
              onClick={() => setView('consoles')}
              className="group cursor-pointer bg-[#FFFDF8] hover:bg-white rounded-3xl border border-[#F0E6D2] hover:border-[#F5A623] p-6 shadow-sm hover:shadow-xl hover:shadow-[#F5A623]/10 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center p-2 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=300&q=80"
                    alt="Consolas"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                    Consolas
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                    Nintendo, PlayStation, Xbox, Sega y Vintage
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

            {/* 3. TVs CRT */}
            <div
              onClick={() => { if (onSelectCategory) onSelectCategory('retro_tvs'); setView('catalogue'); }}
              className="group cursor-pointer bg-[#FFFDF8] hover:bg-white rounded-3xl border border-[#F0E6D2] hover:border-[#F5A623] p-6 shadow-sm hover:shadow-xl hover:shadow-[#F5A623]/10 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center p-2 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=300&q=80"
                    alt="TVs CRT"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-black text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                    TVs CRT
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5 font-medium">
                    Trinitron, PVM y monitores retro
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
                Recibe tu oferta
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs leading-relaxed">
                Confirmación de inspección técnica y depósito inmediato a tu cuenta.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. ¿TIENES UNA EDICIÓN ESPECIAL? (Banner matching reference image) */}
      {/* ======================================================== */}
      <section className="py-14 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">

            {/* Ambient light glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#F5A623]/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

              {/* Left Column: Console Photo */}
              <div className="lg:col-span-3 flex justify-center">
                <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-neutral-900/90 border border-neutral-800 flex items-center justify-center p-3 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=400&q=80"
                    alt="Edición Especial"
                    className="w-full h-full object-contain hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-[#F5A623] text-black">
                    Especial
                  </div>
                </div>
              </div>

              {/* Center Column: Text */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#F5A623] font-display">
                  ¿Tienes una edición especial?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                  Si tu consola no aparece en el listado (como ediciones especiales, carcasas translúcidas o variantes importadas), ¡contáctanos! Podemos pagar diferentes precios.
                </p>
              </div>

              {/* Right Column: Actions matching image */}
              <div className="lg:col-span-4 space-y-3 flex flex-col justify-center">
                {/* Button WhatsApp */}
                <a
                  href="https://wa.me/525512345678?text=Hola%20RetroCompra,%20tengo%20una%20edici%C3%B3n%20especial%20para%20vender"
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
      {/* 6. TESTIMONIOS (Real Feedback. Real Gamers en México) */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-0.5 bg-[#F5A623]" />
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight font-display">
                Comentarios de Gamers Reales en México
              </h2>
              <div className="w-12 h-0.5 bg-[#F5A623]" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
              Conoce la experiencia de quienes ya vendieron sus consolas y juegos con nosotros
            </p>
          </div>

          <div className="relative">
            {/* Slider Controls */}
            <button
              onClick={() => setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md text-neutral-700 hover:text-[#F5A623] hover:border-[#F5A623] flex items-center justify-center transition-all"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md text-neutral-700 hover:text-[#F5A623] hover:border-[#F5A623] flex items-center justify-center transition-all"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Testimonials 3-card grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const idx = (testimonialIndex + offset) % testimonials.length;
                const item = testimonials[idx];
                return (
                  <div
                    key={idx}
                    className="p-7 rounded-3xl border border-neutral-200/90 bg-[#FAF9F6] hover:bg-white transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex gap-1 text-[#F5A623]">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F5A623]" />
                      ))}
                    </div>

                    <p className="text-xs text-neutral-700 font-medium italic min-h-[48px] leading-relaxed">
                      "{item.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-2 border-t border-neutral-200/60">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#F5A623]/40"
                      />
                      <div>
                        <div className="text-xs font-bold text-neutral-900">{item.name}</div>
                        <div className="text-[11px] text-neutral-500">{item.location}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. PREGUNTAS FRECUENTES (FAQs 100% Spanish) */}
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
                  href="https://wa.me/525512345678?text=Hola%20RetroCompra,%20tengo%20una%20duda%20sobre%20el%20proceso%20de%20recompra"
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
      {/* 8. BOLETÍN GAMER (100% Spanish Newsletter) */}
      {/* ======================================================== */}
      <section className="py-14 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center gap-2 text-[#F5A623] font-bold text-xs tracking-wider uppercase">
                  <Mail className="w-4 h-4" />
                  <span>Boletín RetroCompra</span>
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
                    ¡Gracias por suscribirte al boletín de RetroCompra!
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
