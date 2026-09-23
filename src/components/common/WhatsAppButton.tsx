import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useApp();

  const cleanNumber = settings.whatsappNumber ? settings.whatsappNumber.replace(/\D/g, '') : '5562984289911';
  const message = encodeURIComponent(`Olá! Gostaria de tirar uma dúvida sobre os cursos da ${settings.platformName}.`);

  return (
    <aside aria-label="Suporte WhatsApp" className="fixed bottom-5 right-5 z-40">
      <a
        href={`https://wa.me/${cleanNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 font-medium text-xs sm:text-sm group focus-visible:outline-hidden"
        title="Falar com Suporte pelo WhatsApp"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline font-semibold">Tire suas Dúvidas</span>
      </a>
    </aside>
  );
};
