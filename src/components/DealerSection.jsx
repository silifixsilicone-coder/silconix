import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { Store, TrendingUp, Truck, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

export const DealerSection = () => {
  const { openEnquiry, getWhatsAppLink } = useConfig();

  const benefits = [
    {
      icon: TrendingUp,
      title: "Attractive Trade Margins",
      desc: "Healthy distributor margins with volume-based quarterly rebates for consistent hardware stockists."
    },
    {
      icon: Truck,
      title: "Priority Bulk Dispatch",
      desc: "Fast delivery from our factory at Dhayari, Pune, ensuring minimal downtime for your retail customers."
    },
    {
      icon: Store,
      title: "Shop Branding & Display",
      desc: "Counter display racks, printed promotional banners, and technical sample kits to boost retail sales."
    },
    {
      icon: ShieldCheck,
      title: "Protected Territory",
      desc: "Regional dealer opportunities for qualified hardware and architectural glass distributors."
    }
  ];

  return (
    <section className="py-20 bg-[#F2F6F8] relative border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 mb-3 shadow-2xs">
            <Store size={14} className="text-[#F47716]" />
            <span className="text-xs font-bold text-[#07565A] uppercase tracking-wider">
              Trade Partnership
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#07565A] tracking-tight">
            Become an Authorized SILICONIX Dealer
          </h2>

          <div className="w-16 h-1 bg-[#F47716] mx-auto mt-4 rounded-full" />

          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            Partner with Royal Enterprises to distribute high-demand SILICONIX silicone sealants to fabricators, contractors, and glass shops in your region.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-lg bg-[#07565A]/10 text-[#07565A] flex items-center justify-center mb-4">
                  <Icon size={22} className="text-[#07565A]" />
                </div>
                <h3 className="text-base font-bold text-[#07565A] mb-1.5">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Dealership Action Banner */}
        <div className="bg-white rounded-2xl border-2 border-[#07565A]/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-black text-[#07565A]">
              Are you a Hardware Store Owner, Glass Trader, or Building Supply Distributor?
            </h4>
            <p className="text-xs text-gray-500">
              Submit your dealership enquiry or connect with our dealer network manager.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openEnquiry('Dealership', 'Authorized Regional Dealership Application')}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#F47716] hover:bg-[#dc650a] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Apply for Dealership</span>
              <ArrowRight size={14} />
            </button>

            <a
              href={getWhatsAppLink('Hello Royal Enterprises, I am interested in becoming an authorized dealer for SILICONIX Silicone Sealants in my city.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-lg border border-[#07565A] text-[#07565A] hover:bg-[#07565A] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle size={15} />
              <span>Dealer WhatsApp Desk</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
