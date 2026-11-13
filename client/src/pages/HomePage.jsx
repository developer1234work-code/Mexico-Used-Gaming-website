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
      q: "How do I sell my items?",
      a: "1) Choose your model from our catalogue. 2) Select its condition and included accessories to see an instant server-validated MXN estimate. 3) Add items to your selling cart and submit with real photos. Once reviewed, our team approves shipping and sends your official prepaid carrier label."
    },
    {
      q: "Is the online estimate final?",
      a: "The online estimate is an indicative, non-binding quote based on the details submitted. The final offer is confirmed upon physical arrival at our facility following technical inspection of functionality, authenticity and serial numbers."
    },
    {
      q: "Should I ship my items after submitting?",
      a: "No! Customers must NOT ship items until an authorized staff member explicitly reviews your submission and approves shipping with an official carrier tracking number and packaging guidelines."
    },
    {
      q: "Can I sell items not listed?",
      a: "Yes! Use our 'Custom Quote' option for rare collector editions, imported retro consoles, CRT monitors or unlisted accessories for a personalized valuation by our specialists."
    },
    {
      q: "Do you buy retro CRT televisions?",
      a: "Yes! We specialize in collectible retro gaming CRT televisions (Sony Trinitron, PVM broadcast monitors, JVC D-Series). Due to weight and fragility, we coordinate freight pallet pickups across Mexico."
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
      {/* 1. HERO SECTION (With asset image as hero background) */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-black text-white min-h-[620px] lg:min-h-[700px] flex items-center">
        
        {/* Background Image Layer from Asset */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-100 hover:scale-[1.02]"
          style={{ backgroundImage: `url(${heroBg})` }}
        />

        {/* Sophisticated Dual Gradient Overlay for legibility & premium contrast */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/85 to-black/30 lg:via-black/75" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        
        {/* Subtle breathing ambient glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-[#F5A623]/15 blur-[140px] rounded-full pointer-events-none animate-pulse-glow" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10 w-full">
          <div className="max-w-2xl space-y-7">
            
            {/* Title with staggered entrance */}
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-black tracking-tight text-white leading-[1.08] font-display">
                Turn Your Old Games <br />
                Into Something <span className="text-[#F5A623] font-black">Valuable.</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p 
              className="text-base sm:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed animate-fade-in-up"
              style={{ animationDelay: '200ms' }}
            >
              We buy pre-owned consoles, video games, accessories and retro CRT televisions.
            </p>

            {/* Main Call to Action */}
            <div 
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <button
                onClick={() => setView('sell')}
                className="btn-shimmer px-8 py-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-[#F5A623] via-[#E59819] to-[#D48806] hover:brightness-105 text-black shadow-xl shadow-[#F5A623]/25 hover:shadow-[#F5A623]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
              >
                <span>Sell Your Games & Consoles</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Value Prop Micro Pills */}
            <div 
              className="pt-4 flex flex-wrap items-center gap-7 text-xs sm:text-sm text-neutral-300 font-medium animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-4 h-4 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <span className="group-hover:text-white transition-colors">Safe & Secure</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-4 h-4 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <span className="group-hover:text-white transition-colors">Fast Process</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <div className="w-4 h-4 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#F5A623]" />
                </div>
                <span className="group-hover:text-white transition-colors">Fair Offers</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. OUR CATEGORIES (Pixel-matched 4 cards) */}
      {/* ======================================================== */}
      <section className="py-24 bg-white border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-16">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#E59819] block">
              — OUR CATEGORIES —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
              What Would You Like to Sell?
            </h2>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Choose from our wide range of gaming items
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Gaming Consoles */}
            <div 
              onClick={() => onSelectCategory('consoles')}
              className="card-premium group cursor-pointer bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col items-center text-center shadow-sm hover:border-[#F5A623] hover:shadow-xl hover:shadow-[#F5A623]/10"
            >
              <div className="w-40 h-40 mb-6 rounded-2xl overflow-hidden bg-neutral-50 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=400&q=80" 
                  alt="Gaming Consoles" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                Gaming Consoles
              </h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                PlayStation, Xbox, Nintendo y retro
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#E59819] group-hover:text-[#B87406]">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </span>
            </div>

            {/* 2. Video Games */}
            <div 
              onClick={() => onSelectCategory('video_games')}
              className="card-premium group cursor-pointer bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col items-center text-center shadow-sm hover:border-[#F5A623] hover:shadow-xl hover:shadow-[#F5A623]/10"
            >
              <div className="w-40 h-40 mb-6 rounded-2xl overflow-hidden bg-neutral-50 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80" 
                  alt="Video Games" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                Video Games
              </h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                Discos y cartuchos modernos y clásicos
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#E59819] group-hover:text-[#B87406]">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </span>
            </div>

            {/* 3. Controllers & Accessories */}
            <div 
              onClick={() => onSelectCategory('accessories')}
              className="card-premium group cursor-pointer bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col items-center text-center shadow-sm hover:border-[#F5A623] hover:shadow-xl hover:shadow-[#F5A623]/10"
            >
              <div className="w-40 h-40 mb-6 rounded-2xl overflow-hidden bg-neutral-50 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80" 
                  alt="Controllers & Accessories" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                Controllers & Accessories
              </h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                Mandos oficiales, cables, fuentes y cajas
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#E59819] group-hover:text-[#B87406]">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </span>
            </div>

            {/* 4. Retro CRT TVs */}
            <div 
              onClick={() => onSelectCategory('retro_tvs')}
              className="card-premium group cursor-pointer bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col items-center text-center shadow-sm hover:border-[#F5A623] hover:shadow-xl hover:shadow-[#F5A623]/10"
            >
              <div className="w-40 h-40 mb-6 rounded-2xl overflow-hidden bg-neutral-50 flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80" 
                  alt="Retro CRT TVs" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#B87406] transition-colors font-display">
                Retro CRT TVs
              </h3>
              <p className="text-xs text-neutral-500 mt-1 mb-6">
                Sony Trinitron, PVM y televisores de tubo
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#E59819] group-hover:text-[#B87406]">
                Get an estimate <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. HOW IT WORKS (Simple 3-Step Process) */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-18">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#E59819] block">
              — HOW IT WORKS —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
              Simple 3-Step Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-10">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-black text-[#F5A623] flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 group-hover:shadow-[#F5A623]/25 transition-all duration-300 border border-neutral-800">
                <Search className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-neutral-900 font-display">
                  1. Choose Your Items
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Find your model and select condition and accessories.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-black text-[#F5A623] flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 group-hover:shadow-[#F5A623]/25 transition-all duration-300 border border-neutral-800">
                <CloudUpload className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-neutral-900 font-display">
                  2. Get an Estimate
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  See an indicative estimate and submit your details.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-black text-[#F5A623] flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 group-hover:shadow-[#F5A623]/25 transition-all duration-300 border border-neutral-800">
                <CheckCheck className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-neutral-900 font-display">
                  3. Review & Sell
                </h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
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
      <section className="py-24 bg-white border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#E59819] block">
                — WHY CHOOSE LION? —
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight font-display">
                Trusted by Gamers <br />
                Across <span className="text-[#F5A623]">Mexico</span>
              </h2>

              <p className="text-neutral-600 leading-relaxed text-sm">
                We make selling your used games and consoles simple, secure and rewarding.
              </p>

              {/* 4 Key Points */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 text-[#F5A623] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-[#F5A623] text-white" />
                  </div>
                  <span className="font-semibold text-xs text-neutral-800">
                    Dedicated Gaming Specialists
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 text-[#F5A623] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-[#F5A623] text-white" />
                  </div>
                  <span className="font-semibold text-xs text-neutral-800">
                    Transparent Estimates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 text-[#F5A623] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-[#F5A623] text-white" />
                  </div>
                  <span className="font-semibold text-xs text-neutral-800">
                    Secure Request Handling
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-50 text-[#F5A623] flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 fill-[#F5A623] text-white" />
                  </div>
                  <span className="font-semibold text-xs text-neutral-800">
                    Human Support
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setView('about')}
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F5A623] to-[#E59819] text-black shadow-md shadow-[#F5A623]/20 hover:shadow-[#F5A623]/35 hover:scale-[1.02] transition-all inline-flex items-center gap-2 group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Image (Gaming controller & game cases with ambient light) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 group">
                <img
                  src="https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=900&q=80"
                  alt="Xbox controller and gaming setup"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. TRUST PILLARS BAR (Safe, Fair, Fast, Human) */}
      {/* ======================================================== */}
      <section className="py-16 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="card-premium bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F5A623] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-neutral-900 font-display">Safe & Secure</h4>
              <p className="text-xs text-neutral-500">Your data is protected</p>
            </div>

            <div className="card-premium bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F5A623] flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-neutral-900 font-display">Fair Offers</h4>
              <p className="text-xs text-neutral-500">Get the best value</p>
            </div>

            <div className="card-premium bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F5A623] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-neutral-900 font-display">Fast Process</h4>
              <p className="text-xs text-neutral-500">Quick and easy</p>
            </div>

            <div className="card-premium bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col items-center text-center space-y-2.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F5A623] flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-neutral-900 font-display">Human Support</h4>
              <p className="text-xs text-neutral-500">We're here to help</p>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. WHAT OUR CUSTOMERS SAY (Testimonials Carousel) */}
      {/* ======================================================== */}
      <section className="py-24 bg-white border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-16">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#E59819] block">
              — WHAT OUR CUSTOMERS SAY —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
              Real Feedback. Real Gamers.
            </h2>
          </div>

          <div className="relative">
            {/* Slider Controls */}
            <button
              onClick={() => setTestimonialIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md text-neutral-700 hover:text-[#F5A623] hover:border-[#F5A623] flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTestimonialIndex(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md text-neutral-700 hover:text-[#F5A623] hover:border-[#F5A623] flex items-center justify-center transition-all"
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
                    className="card-premium p-7 rounded-2xl border border-neutral-200/90 bg-[#FAF9F6] hover:bg-white transition-all space-y-4 shadow-sm"
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
      {/* 7. FREQUENTLY ASKED QUESTIONS & WHATSAPP CARD */}
      {/* ======================================================== */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-16">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#E59819] block">
              — FREQUENTLY ASKED QUESTIONS —
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight font-display">
              Got Questions? We've Got Answers.
            </h2>
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
                  <img
                    src="https://images.unsplash.com/photo-1526509867162-5b0c0d1b4b33?auto=format&fit=crop&w=300&q=80"
                    alt="Controller"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-base text-neutral-900 font-display">
                    Still have questions?
                  </h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Talk to our team before submitting your request.
                  </p>
                </div>

                <a
                  href="https://wa.me/525587654321?text=Hola%20Lion%20Games%20%26%20TVs,%20tengo%20una%20pregunta%20sobre%20el%20proceso%20de%20venta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-black text-white hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02]"
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
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center gap-2 text-[#F5A623] font-bold text-xs tracking-wider uppercase">
                  <Mail className="w-4 h-4" />
                  <span>Stay in the Game</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
                  Stay in the Game
                </h3>
                <p className="text-xs text-neutral-400">
                  Get occasional updates, selling tips and gaming news.
                </p>
              </div>

              <div className="lg:col-span-6">
                {subscribed ? (
                  <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCheck className="w-4 h-4 text-emerald-400" />
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
                      className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#F5A623]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F5A623] to-[#E59819] text-black hover:brightness-105 shadow-md shadow-[#F5A623]/20 transition-all shrink-0"
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
