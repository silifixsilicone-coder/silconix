import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { X, FileText, CheckCircle2, ShieldAlert, ArrowRight, Printer, Download } from 'lucide-react';

export const TDSModal = ({ product, isOpen, onClose }) => {
  const { config, openEnquiry } = useConfig();

  if (!isOpen || !product) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="bg-[#07565A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F47716] flex items-center justify-center font-bold text-white">
              <FileText size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Technical Data Sheet (TDS)
              </h3>
              <p className="text-[11px] text-gray-200">
                {product.name} — Royal Enterprises
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-[#172A2B]">
          
          {/* Header Summary */}
          <div className="flex flex-col sm:flex-row gap-5 items-start justify-between border-b border-gray-200 pb-5">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F47716] bg-[#F2F6F8] px-2.5 py-0.5 rounded">
                {product.category}
              </span>
              <h4 className="text-xl font-black text-[#07565A]">
                {product.name}
              </h4>
              <p className="text-xs text-gray-600 max-w-lg leading-relaxed">
                {product.shortDesc}
              </p>
            </div>

            <div className="w-24 h-24 rounded-xl bg-[#F2F6F8] border border-gray-200 p-2 shrink-0 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h5 className="text-xs font-bold text-[#07565A] uppercase tracking-wider mb-3">
              1. Verified Physical & Mechanical Properties
            </h5>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F2F6F8] text-[#07565A] font-bold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-4">Parameter</th>
                    <th className="py-2.5 px-4">Standard / Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key} className="hover:bg-gray-50/50">
                      <td className="py-2 px-4 font-semibold text-[#172A2B]">{key}</td>
                      <td className="py-2 px-4 text-[#07565A] font-bold">{val}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2 px-4 font-semibold text-[#172A2B]">Specific Gravity</td>
                    <td className="py-2 px-4 text-[#07565A] font-bold">~0.98 – 1.02 g/cm³</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-[#172A2B]">Slump / Sagging</td>
                    <td className="py-2 px-4 text-[#07565A] font-bold">Non-sag (&lt; 2mm)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-[#172A2B]">Shelf Life</td>
                    <td className="py-2 px-4 text-[#07565A] font-bold">12 Months (Unopened below 27°C)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Application & Joint Design Guide */}
          <div>
            <h5 className="text-xs font-bold text-[#07565A] uppercase tracking-wider mb-2">
              2. Recommended Joint Design & Preparation
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F2F6F8] p-3.5 rounded-xl border border-gray-200/80">
                <h6 className="font-bold text-[#07565A] mb-1">Surface Cleaning</h6>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  Surfaces must be clean, dry, and free from dust, grease, oil, and loose particles. For glass and aluminium, use lint-free solvent wipe before application.
                </p>
              </div>

              <div className="bg-[#F2F6F8] p-3.5 rounded-xl border border-gray-200/80">
                <h6 className="font-bold text-[#07565A] mb-1">Joint Proportion</h6>
                <p className="text-gray-600 leading-relaxed text-[11px]">
                  For expansion joints, a 2:1 width-to-depth ratio is recommended. Minimum joint width is 6mm. Backer rods should be used to control sealant depth.
                </p>
              </div>
            </div>
          </div>

          {/* Packaging & Safety */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-amber-900 leading-relaxed">
              <strong>Application Safety:</strong> Ensure proper ventilation during application and curing. Avoid contact with eyes and skin. Keep away from direct heat and out of reach of children.
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F2F6F8] border-t border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Data Sheet</span>
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                openEnquiry('Product Enquiry', product.name);
              }}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-white bg-[#F47716] hover:bg-[#dc650a] rounded-lg shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Enquire for {product.name}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
