import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const { openEnquiry } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E6EAEB]">
      <div className="site-container">
        <div className="flex items-center justify-between h-18">
          
          {/* Left: Exact SILICONIX Wordmark Logo */}
          <a href="#" className="flex items-center">
            <img 
              src="/images/siliconix-logo.svg" 
              alt="SILICONIX Silicone Sealants" 
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Right: Desktop Navigation Links & Orange Button */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#263536]">
            <a href="#" className="hover:text-[#07565A] transition-colors">
              Home
            </a>
            <a href="#products" className="hover:text-[#07565A] transition-colors">
              Products
            </a>
            <a href="#oem" className="hover:text-[#07565A] transition-colors">
              OEM Manufacturing
            </a>
            <a href="#about" className="hover:text-[#07565A] transition-colors">
              About
            </a>
            <a href="#contact" className="hover:text-[#07565A] transition-colors">
              Contact
            </a>

            {/* Orange "Get a Quote" Button */}
            <button
              onClick={() => openEnquiry('Product Enquiry')}
              className="px-5 py-2.5 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              Get a Quote
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => openEnquiry('Product Enquiry')}
              className="px-3 py-1.5 rounded-md bg-[#F47716] text-white text-xs font-semibold"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#263536] hover:text-[#07565A] focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E6EAEB] px-5 py-4 space-y-3">
          <div className="flex flex-col space-y-2.5 text-sm font-medium text-[#263536]">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#07565A]"
            >
              Home
            </a>
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#07565A]"
            >
              Products
            </a>
            <a 
              href="#oem" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#07565A]"
            >
              OEM Manufacturing
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#07565A]"
            >
              About
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#07565A]"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
