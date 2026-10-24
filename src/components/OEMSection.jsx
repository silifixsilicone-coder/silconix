import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { Check } from 'lucide-react';

export const OEMSection = () => {
  const { openEnquiry } = useConfig();

  return (
    <section id="oem" className="py-20 bg-white border-b border-[#E6EAEB]">
      <div className="site-container">
        
        {/* Subtle Light-Grey Content Panel */}
        <div className="bg-[#F5F7F7] rounded-xl p-8 sm:p-12 border border-[#E6EAEB] max-w-4xl mx-auto text-center">
          
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[#07565A]">
            OEM & Private Label Manufacturing
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm sm:text-base text-[#263536]/80 max-w-2xl mx-auto leading-relaxed">
            Explore silicone sealant manufacturing, private label branding and bulk supply opportunities with Royal Enterprises.
          </p>

          {/* Three Concise Service Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 max-w-2xl mx-auto">
            <div className="bg-white p-4 rounded-lg border border-[#E6EAEB] flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#07565A]/10 flex items-center justify-center text-[#07565A] shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold text-[#07565A]">
                OEM Manufacturing Enquiries
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#E6EAEB] flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#07565A]/10 flex items-center justify-center text-[#07565A] shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold text-[#07565A]">
                Private Label Packaging
              </span>
            </div>

            <div className="bg-white p-4 rounded-lg border border-[#E6EAEB] flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#07565A]/10 flex items-center justify-center text-[#07565A] shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-xs font-bold text-[#07565A]">
                Bulk Supply Partnerships
              </span>
            </div>
          </div>

          {/* One Orange Button */}
          <button
            onClick={() => openEnquiry('OEM Manufacturing', 'OEM & Private Label Inquiry')}
            className="px-8 py-3 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-semibold tracking-wide transition-colors"
          >
            Discuss Your Requirements
          </button>

        </div>

      </div>
    </section>
  );
};
