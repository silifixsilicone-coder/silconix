import React from 'react';
import { useConfig } from '../context/ConfigContext';

export const ApplicationsSection = () => {
  const { config } = useConfig();

  const applicationsList = [
    { title: "Aluminium Windows & Doors", img: "/images/silconix-sc.png", subtitle: "Multi-surface adhesion" },
    { title: "Glass & Glazing Work", img: "/images/silconix-as.png", subtitle: "All-weather protection" },
    { title: "Exterior Construction Joints", img: "/images/silconix-wp.png", subtitle: "Heavy-duty flexible seal" },
    { title: "Roofing & Gutters", img: "/images/silconix-wp.png", subtitle: "Waterproof & UV resistant" },
    { title: "Tiles & Masonry Joints", img: "/images/silconix-sc.png", subtitle: "Long-lasting bonding" },
    { title: "Industrial & General Use", img: "/images/silconix-as.png", subtitle: "Anti-fungal & durable" }
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E6EAEB]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-[#07565A]">
            Applications
          </h2>
          <p className="mt-2 text-sm text-[#263536]/80">
            Versatile silicone solutions designed for reliable performance across varied substrates.
          </p>
        </div>

        {/* Clean 6-Item Grid (3x2 on desktop, 2x3 on tablet, 1/2 on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {applicationsList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-[#E6EAEB] overflow-hidden hover:border-[#07565A]/40 transition-colors flex flex-col"
            >
              <div className="bg-[#F5F7F7] h-40 sm:h-44 p-4 flex items-center justify-center border-b border-[#E6EAEB]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xs sm:text-sm font-bold text-[#07565A]">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
