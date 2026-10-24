import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Calculator, ArrowRight, CheckCircle2, Box, Info, Sparkles, MessageCircle } from 'lucide-react';

export const JointCalculator = () => {
  const { openEnquiry, getWhatsAppLink } = useConfig();

  const [jointType, setJointType] = useState('butt'); // 'butt' or 'fillet'
  const [width, setWidth] = useState(10); // mm
  const [depth, setDepth] = useState(6); // mm
  const [totalMeters, setTotalMeters] = useState(100); // meters
  const [cartridgeSize, setCartridgeSize] = useState(300); // ml
  const [wastage, setWastage] = useState(10); // %

  // Calculation logic
  // For butt joint: area = width * depth mm^2 -> volume/meter = width * depth ml
  // For fillet (triangular corner): area = 0.5 * width * depth mm^2
  const crossSectionArea = jointType === 'butt' ? (width * depth) : (0.5 * width * depth);
  const mlPerMeter = crossSectionArea; // 1 mm^2 * 1000 mm = 1000 mm^3 = 1 ml
  const metersPerCartridge = mlPerMeter > 0 ? (cartridgeSize / mlPerMeter) : 0;
  
  const rawCartridges = metersPerCartridge > 0 ? (totalMeters / metersPerCartridge) : 0;
  const totalCartridgesNeeded = Math.ceil(rawCartridges * (1 + wastage / 100));
  const boxesNeeded = Math.ceil(totalCartridgesNeeded / 24);

  const handleOrderCalculation = () => {
    const text = `Joint Calculation: ${totalMeters}m run (${width}mm × ${depth}mm joint) requires approx ${totalCartridgesNeeded} cartridges (${boxesNeeded} boxes of 24).`;
    openEnquiry('Bulk Order', text);
  };

  const getWhatsAppCalculationLink = () => {
    const msg = `Hello SILICONIX, I used your Sealant Calculator for a project: Joint ${width}mm x ${depth}mm, Total ${totalMeters} meters. Calculated: ${totalCartridgesNeeded} cartridges (${boxesNeeded} boxes of 24). Please provide quotation.`;
    return getWhatsAppLink(msg);
  };

  return (
    <section id="calculator" className="py-20 bg-white relative border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2F6F8] border border-gray-200 mb-3 shadow-2xs">
            <Calculator size={14} className="text-[#F47716]" />
            <span className="text-xs font-bold text-[#07565A] uppercase tracking-wider">
              Contractor Tool
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#07565A] tracking-tight">
            Silicone Sealant Joint & Box Calculator
          </h2>

          <div className="w-16 h-1 bg-[#F47716] mx-auto mt-4 rounded-full" />

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Estimate the exact number of SILICONIX cartridges and 24-cartridge master boxes required for your project joint dimensions.
          </p>
        </div>

        {/* Calculator Widget Container */}
        <div className="max-w-4xl mx-auto bg-[#F2F6F8] rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Joint Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-[#172A2B] uppercase tracking-wider mb-2">
                  Joint Configuration
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setJointType('butt')}
                    className={`py-2.5 px-4 rounded-lg text-xs font-bold border transition-all text-center ${
                      jointType === 'butt'
                        ? 'bg-[#07565A] text-white border-[#07565A] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Rectangular / Butt Joint
                  </button>
                  <button
                    type="button"
                    onClick={() => setJointType('fillet')}
                    className={`py-2.5 px-4 rounded-lg text-xs font-bold border transition-all text-center ${
                      jointType === 'fillet'
                        ? 'bg-[#07565A] text-white border-[#07565A] shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Triangular Corner / Fillet
                  </button>
                </div>
              </div>

              {/* Width & Depth Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172A2B] mb-1.5 flex items-center justify-between">
                    <span>Joint Width</span>
                    <span className="text-[#F47716] font-extrabold">{width} mm</span>
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    step="1"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-[#07565A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>4 mm</span>
                    <span>15 mm</span>
                    <span>30 mm</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172A2B] mb-1.5 flex items-center justify-between">
                    <span>Joint Depth</span>
                    <span className="text-[#F47716] font-extrabold">{depth} mm</span>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="20"
                    step="1"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full accent-[#07565A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>3 mm</span>
                    <span>10 mm</span>
                    <span>20 mm</span>
                  </div>
                </div>
              </div>

              {/* Total Run Length (Meters) */}
              <div>
                <label className="block text-xs font-bold text-[#172A2B] mb-1.5">
                  Total Joint Run Length (in meters)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    value={totalMeters}
                    onChange={(e) => setTotalMeters(Math.max(1, Number(e.target.value)))}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-300 text-sm font-bold text-[#07565A] focus:outline-hidden focus:border-[#07565A] focus:ring-1 focus:ring-[#07565A]"
                  />
                  <span className="absolute right-4 top-2.5 text-xs font-bold text-gray-400">
                    Linear Meters
                  </span>
                </div>
              </div>

              {/* Cartridge Size & Wastage Percentage */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#172A2B] mb-1.5">
                    Cartridge Size
                  </label>
                  <select
                    value={cartridgeSize}
                    onChange={(e) => setCartridgeSize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-gray-300 rounded-lg focus:border-[#07565A]"
                  >
                    <option value="280">280 ml (Standard)</option>
                    <option value="300">300 ml (Standard)</option>
                    <option value="310">310 ml (Industrial)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172A2B] mb-1.5">
                    Tooling Wastage Allowance
                  </label>
                  <select
                    value={wastage}
                    onChange={(e) => setWastage(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-gray-300 rounded-lg focus:border-[#07565A]"
                  >
                    <option value="5">5% (Expert applicator)</option>
                    <option value="10">10% (Recommended standard)</option>
                    <option value="15">15% (Rough masonry / exterior)</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Output Calculation Result Box */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-[#07565A]/20 shadow-lg text-center relative overflow-hidden flex flex-col justify-between h-full">
                
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#07565A] via-[#F47716] to-[#07565A]" />

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                    Estimated Project Requirement
                  </span>
                  
                  {/* Cartridges Big Metric */}
                  <div className="my-3">
                    <span className="text-5xl font-black text-[#07565A] tracking-tight">
                      {totalCartridgesNeeded}
                    </span>
                    <span className="text-sm font-bold text-gray-600 ml-2 uppercase">
                      Cartridges
                    </span>
                  </div>

                  {/* Boxes Metric */}
                  <div className="bg-[#F2F6F8] p-3 rounded-xl border border-gray-200 mb-4 flex items-center justify-center gap-2">
                    <Box size={18} className="text-[#F47716]" />
                    <span className="text-xs font-bold text-[#172A2B]">
                      ≈ <strong className="text-[#07565A] text-sm">{boxesNeeded} Master Box{boxesNeeded > 1 ? 'es' : ''}</strong> (24 Cartridges/Box)
                    </span>
                  </div>

                  {/* Coverage Details */}
                  <div className="space-y-1.5 text-xs text-gray-600 text-left border-t border-gray-100 pt-3">
                    <div className="flex justify-between">
                      <span>Joint cross-section:</span>
                      <strong className="text-[#172A2B]">{width} × {depth} mm</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage per cartridge:</span>
                      <strong className="text-[#07565A]">{metersPerCartridge.toFixed(1)} meters</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Wastage allowance included:</span>
                      <strong className="text-[#172A2B]">+{wastage}%</strong>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-5 mt-4 space-y-2">
                  <button
                    onClick={handleOrderCalculation}
                    className="w-full py-3 px-4 rounded-lg bg-[#F47716] hover:bg-[#dc650a] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Enquire for {totalCartridgesNeeded} Cartridges</span>
                    <ArrowRight size={14} />
                  </button>

                  <a
                    href={getWhatsAppCalculationLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-lg border border-[#07565A] text-[#07565A] hover:bg-[#07565A] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} />
                    <span>Send Calc to WhatsApp</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
