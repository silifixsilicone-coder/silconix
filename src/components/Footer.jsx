import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { Phone, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const { config, getWhatsAppLink } = useConfig();

  return (
    <footer className="bg-[#07565A] text-white py-12">
      <div className="site-container">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10 text-xs">
          
          {/* Logo & Tagline */}
          <div className="md:col-span-4 space-y-3">
            <div className="bg-white rounded-md px-3 py-2 inline-block shadow-xs">
              <img 
                src="/images/siliconix-logo.svg" 
                alt="SILICONIX Silicone Sealants" 
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 text-xs leading-relaxed max-w-xs pt-1">
              Manufactured & distributed by {config.business.companyName}.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-semibold text-white tracking-wide uppercase text-[11px]">
              Navigation
            </div>
            <ul className="space-y-1.5 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#oem" className="hover:text-white transition-colors">OEM Manufacturing</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Address Details */}
          <div className="md:col-span-5 space-y-2">
            <div className="font-semibold text-white tracking-wide uppercase text-[11px]">
              Contact Details
            </div>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">Royal Enterprises</strong><br />
              Chavan Industry, Shade No. 1,<br />
              Opposite Vertaxis Futuretech Pvt. Ltd.,<br />
              Dhayari–Narhe Road, Dhayari, Pune – 411041.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
              <a
                href={config.business.telLink}
                className="hover:text-[#F47716] transition-colors flex items-center gap-1.5"
              >
                <Phone size={13} className="text-[#F47716]" />
                <span>+91 95450 00176</span>
              </a>
              <span className="hidden sm:inline text-white/30">•</span>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F47716] transition-colors flex items-center gap-1.5"
              >
                <MessageCircle size={13} className="text-[#F47716]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Notice */}
        <div className="pt-6 text-center sm:text-left text-[11px] text-gray-300">
          <p>© {new Date().getFullYear()} Royal Enterprises. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};
