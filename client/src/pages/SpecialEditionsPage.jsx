import React from 'react';
import { 
  Flame, 
  MessageCircle, 
  Mail, 
  Phone, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star 
} from 'lucide-react';

export default function SpecialEditionsPage({ onGoToConsoles, onOpenCustomQuote }) {
  const sampleEditions = [
    {
      name: "Nintendo 64 Pikachu Edition (Azul / Amarillo)",
      baseVal: "$2,300 - $3,500 MXN",
      notes: "Carcasa exclusiva con mejillas iluminadas y figura en relieve de Pikachu."
    },
    {
      name: "New Nintendo 3DS XL - The Legend of Zelda Majora's Mask Gold",
      baseVal: "$3,600 - $5,000 MXN",
      notes: "Edición limitada dorada de colección con máscara de Majora grabada."
    },
    {
      name: "PlayStation 4 Pro 500 Million Limited Edition (Azul Translúcido)",
      baseVal: "$5,500 - $7,800 MXN",
      notes: "Numerada individualmente con placa de cobre y disco de 2TB."
    },
    {
      name: "Nintendo GameCube Panasonic Q (DVD Híbrido Japón)",
      baseVal: "$6,000 - $9,500 MXN",
      notes: "Consola de acero inoxidable con bandeja DVD comercial y display digital."
    },
    {
      name: "Xbox 360 Edición R2-D2 Star Wars con Sonidos Oficiales",
      baseVal: "$2,400 - $3,800 MXN",
      notes: "Acabado blanco y azul con control C-3PO dorado y sensor Kinect blanco."
    },
    {
      name: "Game Boy Advance SP AGS-101 Brighter Backlight (Cualquier Color)",
      baseVal: "$2,200 - $3,200 MXN",
      notes: "Pantalla retroiluminada de alta intensidad de fábrica muy cotizada."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-12 border border-neutral-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] text-xs font-bold">
              <Flame className="w-4 h-4 fill-current" />
              <span>Valuación de Coleccionismo y Ediciones Especiales</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-display text-white">
              ¿Tienes una edición especial?
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Si tu consola tiene colores exclusivos (Funtastic, Pokémon, Zelda, Halo), carcasas translúcidas o es una edición conmemorativa limitada, <strong>pagamos primas de valor superiores al modelo estándar</strong>.
            </p>

            <div className="pt-3 flex flex-wrap gap-3">
              <a
                href="https://wa.me/525512345678?text=Hola%20RetroCompra,%20tengo%20una%20edici%C3%B3n%20especial%20para%20vender"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shimmer px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Escríbenos por WhatsApp</span>
              </a>

              <button
                onClick={onOpenCustomQuote}
                className="px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs border border-neutral-700 flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#F5A623]" />
                <span>Envíanos un mensaje</span>
              </button>

              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-neutral-900/80 text-xs text-neutral-300 font-mono">
                <Phone className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>55 1234 5678</span>
              </div>
            </div>
          </div>
        </div>

        {/* Examples of Special Editions We Buy */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-neutral-900 font-display">
              Ejemplos de Ediciones con Cotización Premium
            </h3>
            <p className="text-xs text-neutral-500">
              Valores aproximados en base a conservación de sellos, caja original y accesorios correspondientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sampleEditions.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black uppercase text-[#F5A623] bg-amber-50 px-2 py-0.5 rounded-full border border-[#F0C068]/50">
                    Edición Especial
                  </span>
                  <Star className="w-4 h-4 text-[#F5A623] fill-current" />
                </div>
                <h4 className="font-bold text-sm text-neutral-900 font-display leading-tight">
                  {item.name}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {item.notes}
                </p>
                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-400 font-medium">Rango estimado:</span>
                  <span className="font-black text-emerald-700 font-mono">{item.baseVal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={onGoToConsoles}
            className="px-8 py-3.5 rounded-2xl font-bold text-xs bg-black text-[#F5A623] hover:bg-neutral-800 transition-all inline-flex items-center gap-2"
          >
            <span>Ver Catálogo General de Consolas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
