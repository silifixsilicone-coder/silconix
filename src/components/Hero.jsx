import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ArrowRight, Check } from 'lucide-react';

export const Hero = () => {
  const { config, openEnquiry } = useConfig();

  return (
    <section className="bg-white py-14 sm:py-20 border-b border-[#E6EAEB]">
      <div className="site-container">
        
        {/* Two-Column Clean Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Side: Clean Typography & 2 Buttons */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Label */}
            <div className="text-xs font-bold uppercase tracking-wider text-[#07565A]">
              SILICONE SEALANT SOLUTIONS
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-black text-[#07565A] tracking-tight leading-[1.15]">
              Seal Strong.<br />Last Long.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#263536]/85 font-normal leading-relaxed max-w-xl">
              Reliable silicone sealant solutions for windows, glass, aluminium, construction and industrial applications.
            </p>

            {/* Two Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#products"
                className="px-6 py-3 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-sm font-semibold tracking-wide transition-colors"
              >
                Explore Products
              </a>

              <a
                href="#oem"
                className="px-6 py-3 rounded-md bg-white hover:bg-[#F5F7F7] border border-[#07565A] text-[#07565A] text-sm font-semibold tracking-wide transition-colors"
              >
                OEM Manufacturing
              </a>
            </div>

          </div>

          {/* Right Side: ONE large, high-quality cartridge image on clean background */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-[#F5F7F7] rounded-xl p-6 sm:p-8 border border-[#E6EAEB] flex items-center justify-center">
              <img
                src="/images/siliconix-gp.jpg"
                alt="SILICONIX Silicone Sealant Cartridge"
                className="max-h-[380px] w-auto object-contain"
                loading="eager"
              />
            </div>
          </div>

        </div>

        {/* Below Hero: Three Small Benefit Labels */}
        <div className="mt-14 pt-8 border-t border-[#E6EAEB]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#07565A]/10 flex items-center justify-center text-[#07565A] shrink-0">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="text-sm font-bold text-[#07565A]">
                Strong Adhesion
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#07565A]/10 flex items-center justify-center text-[#07565A] shrink-0">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="text-sm font-bold text-[#07565A]">
                Weather Resistant
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#07565A]/10 flex items-center justify-center text-[#07565A] shrink-0">
                <Check size={13} strokeWidth={3} />
              </div>
              <span className="text-sm font-bold text-[#07565A]">
                Flexible & Durable
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
