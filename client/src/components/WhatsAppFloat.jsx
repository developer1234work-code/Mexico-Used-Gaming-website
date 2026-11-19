import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const whatsappNumber = '525512345678';
  const defaultText = encodeURIComponent(
    'Hola equipo de Lion Games & TVs, deseo vender mis consolas / videojuegos / TVs analógicas y tengo una pregunta.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-950/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      title="Contactar por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <span className="relative flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-[#25D366] opacity-40"></span>
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10" />
      </span>
    </a>
  );
}
