import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { X, ArrowRight } from 'lucide-react';

export const ProductCatalog = () => {
  const { config, openEnquiry } = useConfig();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="products" className="py-20 bg-white border-b border-[#E6EAEB]">
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-[#07565A]">
            Product Catalogue
          </h2>
          <p className="mt-2 text-sm text-[#263536]/80">
            Professional silicone sealants engineered for dependable adhesion and durability.
          </p>
        </div>

        {/* Clean 3-Card Grid (Desktop: 3 cols, Tablet: 2 cols, Mobile: 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {config.products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg border border-[#E6EAEB] overflow-hidden flex flex-col justify-between hover:border-[#07565A]/40 transition-colors"
            >
              <div>
                {/* One Product Image with consistent dimensions */}
                <div className="bg-[#F5F7F7] p-6 h-64 flex items-center justify-center border-b border-[#E6EAEB]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-52 w-auto object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Content: Title & Short Description (Max 2 lines) */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#07565A] mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#263536]/80 line-clamp-2 leading-relaxed">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              {/* Single Clean Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full py-2.5 px-4 rounded-md border border-[#07565A] text-[#07565A] hover:bg-[#07565A] hover:text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Clean Modal for Technical Details */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-[#E6EAEB] space-y-5 animate-in fade-in duration-150">
            
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#F47716] uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h3 className="text-xl font-bold text-[#07565A] mt-0.5">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-gray-700 p-1"
                aria-label="Close Modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="bg-[#F5F7F7] p-4 rounded-md flex items-center justify-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-48 object-contain"
              />
            </div>

            <p className="text-xs text-[#263536] leading-relaxed">
              {selectedProduct.shortDesc}
            </p>

            {/* Technical Parameters */}
            <div className="border border-[#E6EAEB] rounded-md overflow-hidden text-xs">
              <div className="bg-[#F5F7F7] px-3 py-2 font-bold text-[#07565A] border-b border-[#E6EAEB]">
                Product Specifications
              </div>
              <div className="divide-y divide-[#E6EAEB]">
                {Object.entries(selectedProduct.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between px-3 py-2">
                    <span className="text-gray-600">{k}</span>
                    <span className="font-semibold text-[#07565A]">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const prod = selectedProduct;
                  setSelectedProduct(null);
                  openEnquiry('Product Enquiry', prod.name);
                }}
                className="flex-1 py-2.5 px-4 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-semibold tracking-wide transition-colors text-center"
              >
                Enquire for this Product
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="py-2.5 px-4 rounded-md border border-[#E6EAEB] text-gray-700 text-xs font-semibold hover:bg-gray-50"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
