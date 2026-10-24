import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { Phone, MessageCircle, Send } from 'lucide-react';

export const StickyMobileBar = () => {
  const { config, getWhatsAppLink, openEnquiry } = useConfig();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 shadow-2xl md:hidden">
      <div className="grid grid-cols-3 gap-2">
        {/* Call Button */}
        <a
          href={config.business.telLink}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#07565A] text-white text-center shadow-xs"
        >
          <Phone size={16} className="text-[#F47716] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-[#F47716] text-white text-center shadow-xs"
        >
          <MessageCircle size={16} className="text-white mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Enquire Button */}
        <button
          onClick={() => openEnquiry('Product Enquiry')}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-lg border border-[#07565A] text-[#07565A] text-center bg-white"
        >
          <Send size={15} className="text-[#07565A] mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Enquire</span>
        </button>
      </div>
    </div>
  );
};
