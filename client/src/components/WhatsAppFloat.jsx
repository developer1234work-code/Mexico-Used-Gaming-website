import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const whatsappNumber = '525587654321';
  const defaultText = encodeURIComponent(
    'Hola equipo de Lion Games & TVs México, deseo vender mis videojuegos / consolas / CRT retro y tengo una pregunta.'
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all group"
      title="Contactar por WhatsApp"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
      </span>
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="hidden sm:inline font-bold text-xs tracking-wide">
        Chat WhatsApp Oficial
      </span>
    </a>
  );
}
