import React from 'react';
import { useConfig } from '../context/ConfigContext';

export const AboutSection = () => {
  const { config } = useConfig();

  return (
    <section id="about" className="py-20 bg-white border-b border-[#E6EAEB]">
      <div className="site-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text: One clear heading, one short paragraph */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-3xl font-bold text-[#07565A]">
              About Royal Enterprises
            </h2>
            <p className="text-sm sm:text-base text-[#263536]/85 leading-relaxed">
              Royal Enterprises is a dedicated manufacturer and supplier of SILICONIX silicone sealants based in Pune, Maharashtra. We deliver high-purity silicone formulations engineered for durable bonding, weather protection, and structural integrity across architectural fabrication, glazing, and industrial applications.
            </p>
          </div>

          {/* One relevant clean image */}
          <div className="lg:col-span-5">
            <div className="bg-[#F5F7F7] rounded-xl overflow-hidden border border-[#E6EAEB] p-2">
              <img
                src="/images/siliconix-oem.jpg"
                alt="Royal Enterprises Manufacturing"
                className="w-full h-64 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
