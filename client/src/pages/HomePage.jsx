import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  HeartHandshake, 
  Headphones, 
  CheckCircle2, 
  Search, 
  CloudUpload, 
  CheckCheck, 
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
  SlidersHorizontal,
  Star
} from 'lucide-react';

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
      quote: "The process was clear and the team kept me informed.",
      name: "Alex R.",
      location: "Mexico",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    {
      stars: 5,
      quote: "A straightforward way to pass my old console on.",
      name: "Maria G.",
      location: "Mexico",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      stars: 5,
      quote: "Helpful communication from start to finish.",
      name: "David M.",
      location: "Mexico",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    {
      stars: 5,
      quote: "Vendí mi televisor Sony Trinitron para retrogaming con recolección especializada. Excelente trato.",
      name: "Carlos T.",
      location: "Guadalajara, México",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const faqs = [
    {
      q: "¿Cómo vendo mis artículos?",
      a: "Es muy fácil: 1) Selecciona tu consola, juego o TV en el catálogo. 2) Indica su condición física y accesorios incluidos para ver un estimado instantáneo en MXN. 3) Agrega los artículos a tu carrito de venta y envía tu solicitud con fotos reales. Nuestro equipo la revisará y emitirá la guía de envío correspondiente."
    },
    {
      q: "¿El estimado en línea es definitivo?",
      a: "El monto en línea es una cotización preliminar no vinculante basada en los datos proporcionados. El valor definitivo se ratifica una vez que recibimos el artículo en nuestro centro de inspección técnica y comprobamos su funcionamiento, autenticidad y número de serie."
    },
    {
      q: "¿Debo enviar mis artículos inmediatamente después de enviar el formulario?",
      a: "¡No! De acuerdo con nuestras políticas, los clientes NO deben enviar ningún producto hasta que un miembro autorizado de nuestro equipo apruebe formalmente el envío y te proporcione la guía de paquetería e instrucciones de empaque."
    },
    {
      q: "¿Puedo vender artículos que no están en el catálogo?",
      a: "¡Por supuesto! Contamos con una opción de cotización personalizada para ediciones especiales, consolas retro importadas o títulos raros. Sólo proporciona nombre, fotos y detalles para una valuación manual por nuestros expertos."
    },
    {
      q: "¿Compran televisores CRT retro?",
      a: "Sí. Somos de las pocas plataformas especializadas en México en adquirir televisores de tubo CRT coleccionables (como Sony Trinitron, monitores PVM y JVC D-Series) para la comunidad de retrogaming. Requerimos fotos de pantalla encendida y evaluamos la logística de tarima o recolección según el peso."
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
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Pixel-matched to design image) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-[#0B0F19] text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        
        {/* Subtle background glow ambient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight text-white leading-[1.12]">
                Turn Your Old Games <br />
                Into Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black">Valuable.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                We buy pre-owned consoles, video games, accessories and retro CRT televisions.
              </p>

              {/* Main Call to Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => setView('sell')}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <span>Sell Your Games & Consoles</span>
                  <ArrowRight className="w-5 h-5 text-slate-950" />
                </button>
              </div>

              {/* Value Prop Micro Pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Safe & Secure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Fast Process</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  <span>Fair Offers</span>
                </div>
              </div>

            </div>

            {/* Right Hero Imagery (PS5, Xbox, CRT TV, Controllers on wooden desk) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main image container */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-[#111827]">
                  <img
                    src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1000&q=80"
                    alt="Gaming Consoles and Accessories Buyback"
                    className="w-full h-[380px] object-cover object-center transform hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
                  
                  {/* Floating Badge in image */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#0B0F19]/80 backdrop-blur-md border border-slate-700/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="font-semibold text-white">Compramos en todo México</span>
                    </div>
                    <span className="text-amber-400 font-bold">Valuación en MXN</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. OUR CATEGORIES (Pixel-matched 4 cards) */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              — OUR CATEGORIES —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What Would You Like to Sell?
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Choose from our wide range of gaming items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Gaming Consoles */}
            <div 
              onClick={() => onSelectCategory('consoles')}
              className="card-hover group cursor-pointer bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-amber-400 transition-all"
            >
              <div className="w-36 h-36 mb-6 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80" 
                  alt="Gaming Consoles" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Gaming Consoles
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                PlayStation, Xbox, Nintendo y retro
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 group-hover:text-amber-700">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            {/* 2. Video Games */}
            <div 
              onClick={() => onSelectCategory('video_games')}
              className="card-hover group cursor-pointer bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-amber-400 transition-all"
            >
              <div className="w-36 h-36 mb-6 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80" 
                  alt="Video Games" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Video Games
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Discos y cartuchos modernos y clásicos
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 group-hover:text-amber-700">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            {/* 3. Controllers & Accessories */}
            <div 
              onClick={() => onSelectCategory('accessories')}
              className="card-hover group cursor-pointer bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-amber-400 transition-all"
            >
              <div className="w-36 h-36 mb-6 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80" 
                  alt="Controllers & Accessories" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Controllers & Accessories
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Mandos oficiales, cables, fuentes y cajas
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 group-hover:text-amber-700">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            {/* 4. Retro CRT TVs */}
            <div 
              onClick={() => onSelectCategory('retro_tvs')}
              className="card-hover group cursor-pointer bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-amber-400 transition-all"
            >
              <div className="w-36 h-36 mb-6 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80" 
                  alt="Retro CRT TVs" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Retro CRT TVs
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-5">
                Sony Trinitron, PVM y televisores de tubo
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 group-hover:text-amber-700">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. HOW IT WORKS (Simple 3-Step Process) */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              — HOW IT WORKS —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simple 3-Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-lg shadow-slate-900/10">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  1. Choose Your Items
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Find your model and select condition and accessories.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-lg shadow-slate-900/10">
                <CloudUpload className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  2. Get an Estimate
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  See an indicative estimate and submit your details.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="w-16 h-16 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center shadow-lg shadow-slate-900/10">
                <CheckCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  3. Review & Sell
                </h3>
                <p className="text-sm text-slate-500 max-w-xs mx-auto">
                  Our team reviews your request and confirms the next steps.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. WHY CHOOSE LION? (Gamers Across Mexico) */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                — WHY CHOOSE LION? —
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Trusted by Gamers <br />
                Across <span className="text-amber-500">Mexico</span>
              </h2>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We make selling your used games and consoles simple, secure and rewarding.
              </p>

              {/* 4 Key Points */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-slate-800">
                    Dedicated Gaming Specialists
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-slate-800">
                    Transparent Estimates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-slate-800">
                    Secure Request Handling
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-slate-800">
                    Human Support
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setView('about')}
                  className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all inline-flex items-center gap-2"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Right Image (Gaming controller & game cases) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=900&q=80"
                  alt="Xbox controller and gaming setup"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. TRUST PILLARS BAR (Safe, Fair, Fast, Human) */}
      {/* ======================================================== */}
      <section className="py-14 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Safe & Secure</h4>
              <p className="text-xs text-slate-500">Your data is protected</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Fair Offers</h4>
              <p className="text-xs text-slate-500">Get the best value</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Fast Process</h4>
              <p className="text-xs text-slate-500">Quick and easy</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Human Support</h4>
              <p className="text-xs text-slate-500">We're here to help</p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHAT OUR CUSTOMERS SAY (Testimonials Carousel) */}
      {/* ======================================================== */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              — WHAT OUR CUSTOMERS SAY —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Real Feedback. Real Gamers.
            </h2>
          </div>

          <div className="relative">
            {/* Slider Controls */}
            <button
              onClick={() => setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:text-amber-500 flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md text-slate-700 hover:text-amber-500 flex items-center justify-center transition-all"
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
                    className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-sm text-slate-700 font-medium italic min-h-[50px]">
                      "{item.quote}"
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-amber-300"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.name}</div>
                        <div className="text-[11px] text-slate-500">{item.location}</div>
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
      {/* 7. FREQUENTLY ASKED QUESTIONS & WHATSAPP CARD */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              — FREQUENTLY ASKED QUESTIONS —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Got Questions? We've Got Answers.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left FAQ Accordions */}
            <div className="lg:col-span-8 space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div 
                    key={index}
                    className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : index)}
                      className="w-full px-5 py-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between gap-4 hover:text-amber-600 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-amber-500 shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right WhatsApp Support Callout Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#FEF9EE] border border-amber-200/80 rounded-2xl p-6 text-center space-y-4 shadow-sm">
                <div className="w-24 h-24 mx-auto rounded-xl overflow-hidden bg-amber-100 flex items-center justify-center p-2">
                  <img
                    src="https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=300&q=80"
                    alt="Controller"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-900">
                    Still have questions?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Talk to our team before submitting your request.
                  </p>
                </div>

                <a
                  href="https://wa.me/525587654321?text=Hola%20Lion%20Games%20%26%20TVs,%20tengo%20una%20pregunta%20sobre%20el%20proceso%20de%20venta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-[#0B0F19] text-white hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. STAY IN THE GAME (Newsletter Banner) */}
      {/* ======================================================== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#0B0F19] text-white p-8 sm:p-12 border border-slate-800 shadow-2xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs tracking-wider uppercase">
                  <Mail className="w-4 h-4" />
                  <span>Stay in the Game</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Stay in the Game
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Get occasional updates, selling tips and gaming news.
                </p>
              </div>

              <div className="lg:col-span-6">
                {subscribed ? (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-semibold flex items-center gap-2">
                    <CheckCheck className="w-5 h-5 text-emerald-400" />
                    ¡Gracias por suscribirte al boletín de Lion Games & TVs!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20 transition-all shrink-0"
                    >
                      Subscribe
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
