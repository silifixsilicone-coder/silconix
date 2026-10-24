import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { ShieldCheck, Layers, SunMedium, Wrench, CheckCircle, Award, Droplets, Zap } from 'lucide-react';

export const KeyBenefits = () => {
  const { config } = useConfig();

  const benefitDetails = [
    {
      icon: Layers,
      title: "Strong Adhesion",
      subtitle: "Unmatched Bonding Strength",
      description: "Formulated for superior primerless adhesion to glass, anodized aluminium, masonry, ceramics, timber, and non-porous building surfaces.",
      highlights: ["High tensile bond", "Non-slump formulation", "Zero bond failure on glass & metals"]
    },
    {
      icon: Zap,
      title: "Flexible & Durable",
      subtitle: "Accommodates Structural Movement",
      description: "Maintains permanent joint elasticity over years without cracking, embrittlement, or shrinkage caused by architectural thermal cycles.",
      highlights: ["Permanent rubber elasticity", "High joint movement capability", "Crack and shrink resistant"]
    },
    {
      icon: SunMedium,
      title: "Weather Resistant",
      subtitle: "All-Weather & UV Defence",
      description: "Proven performance under harsh Indian monsoon rains, high ambient humidity, intense UV sunlight, and extreme seasonal temperature swings.",
      highlights: ["100% Waterproof seal", "UV & ozone resistant", "Withstands -40°C to +150°C"]
    },
    {
      icon: Wrench,
      title: "Multiple Surface Applications",
      subtitle: "Versatile Industrial Sealing",
      description: "Engineered for window and door fabrication, structural glazing, kitchen and bath waterproofing, ACP façade cladding, and OEM manufacturing.",
      highlights: ["Clean tooling finish", "Multi-substrate compatibility", "Fast tack-free cure"]
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F6F8] border border-gray-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#F47716]" />
            <span className="text-xs font-bold text-[#07565A] uppercase tracking-wider">
              Industrial Reliability
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07565A] tracking-tight">
            Engineered for Demanding Joints. <br />
            <span className="text-[#F47716]">Built to Last Generations.</span>
          </h2>

          <div className="w-16 h-1 bg-[#F47716] mx-auto mt-4 rounded-full" />

          <p className="mt-4 text-base text-gray-600 leading-relaxed">
            SILICONIX sealants are designed to meet rigorous standards required by fabricators, facade contractors, and industrial manufacturing plants.
          </p>
        </div>

        {/* 4 Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitDetails.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#07565A]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Subtle top orange accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 group-hover:bg-[#F47716] transition-colors" />

                <div>
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-xl bg-[#F2F6F8] group-hover:bg-[#07565A] flex items-center justify-center transition-colors mb-5">
                    <Icon size={24} className="text-[#07565A] group-hover:text-white transition-colors" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg font-bold text-[#07565A] group-hover:text-[#06484B]">
                    {benefit.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#F47716] mt-0.5 mb-3">
                    {benefit.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {benefit.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-3 border-t border-gray-100">
                  {benefit.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-[#172A2B] font-medium">
                      <CheckCircle size={13} className="text-[#F47716] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

        {/* Industrial Performance Stats Strip */}
        <div className="mt-14 rounded-2xl bg-[#06484B] text-white p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#07565A]">
          <div className="pt-3 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-[#F47716]">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-200 mt-1">Pure Silicone Polymer</div>
            <div className="text-[11px] text-gray-400">Zero solvent dilution</div>
          </div>
          <div className="pt-3 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-white">±25%</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-200 mt-1">Movement Capability</div>
            <div className="text-[11px] text-gray-400">Flexible thermal expansion</div>
          </div>
          <div className="pt-3 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-[#F47716]">-40°C / +150°C</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-200 mt-1">Thermal Stability</div>
            <div className="text-[11px] text-gray-400">Resistant to extreme heat & cold</div>
          </div>
          <div className="pt-3 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-black text-white">24 Cartridges</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-200 mt-1">Standard Box Packing</div>
            <div className="text-[11px] text-gray-400">Secure industrial master cartons</div>
          </div>
        </div>

      </div>
    </section>
  );
};
