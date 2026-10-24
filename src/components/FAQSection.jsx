import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FAQSection = () => {
  const { getWhatsAppLink } = useConfig();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the difference between Acetoxy (General Purpose) and Neutral Cure silicone?",
      answer: "Acetoxy silicone cures with the release of a slight vinegar (acetic) odor and provides very rapid skinning and high tensile bond strength, making it ideal for glass-to-glass, aluminium frames, and non-sensitive metals. Neutral cure silicone releases an alcohol/oxime byproduct and is completely odorless and non-corrosive, making it specifically required for sensitive surfaces like ACP sheets, stone, concrete, and painted metals."
    },
    {
      question: "What is the typical cure time and weather resistance speed?",
      answer: "SILICONIX sealants form a tack-free skin in approximately 10 to 15 minutes at room temperature (25°C, 50% RH). Full deep-section cure proceeds at approximately 2mm to 3mm depth per 24 hours. Joints can withstand light exposure within hours, with full rubber elasticity and weatherproofing achieved after complete cure."
    },
    {
      question: "What are the options and MOQ for OEM and Private Label Manufacturing?",
      answer: "Royal Enterprises provides customized cartridge printing with your proprietary brand name, custom graphics, and company details. Minimum order quantities (MOQ), cylinder setup, and batch sizes depend on the chosen formulation grade and packaging size. Contact our OEM sales desk via our enquiry form or WhatsApp for a customized quote."
    },
    {
      question: "Which surfaces does SILICONIX adhere to without a primer?",
      answer: "SILICONIX sealants offer outstanding primerless adhesion to most standard building materials, including anodized aluminium, float and toughened glass, ceramics, glazed tiles, uPVC profiles, and standard architectural metals. For dusty or porous masonry, ensuring a clean, dry, and dust-free surface is essential for maximum bond longevity."
    },
    {
      question: "How are cartridges packaged and what is the shelf life?",
      answer: "Standard packaging consists of 24 cartridges securely packed in a reinforced corrugated master carton. When stored unopened in cool, dry conditions below 27°C, SILICONIX sealants maintain a guaranteed shelf life of 12 months from the date of manufacture."
    },
    {
      question: "How quickly does Royal Enterprises dispatch orders across Maharashtra and pan-India?",
      answer: "Standard stock items (General Purpose, Weatherproof Glazing, Sanitary) are dispatched same-day or within 24 hours from our facility at Dhayari, Pune. Bulk contractor orders and OEM manufacturing schedules are confirmed upon order finalization with dedicated freight logistics."
    }
  ];

  return (
    <section className="py-20 bg-white relative border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F6F8] border border-gray-200 mb-3">
            <HelpCircle size={14} className="text-[#F47716]" />
            <span className="text-xs font-bold text-[#07565A] uppercase tracking-wider">
              Common Questions
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#07565A] tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="w-16 h-1 bg-[#F47716] mx-auto mt-4 rounded-full" />

          <p className="mt-4 text-sm sm:text-base text-gray-600">
            Answers to common queries regarding product applications, OEM partnerships, and supply.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white hover:border-[#07565A]/30"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#07565A] bg-[#F2F6F8]/40 hover:bg-[#F2F6F8] transition-colors"
                >
                  <span className="text-[#172A2B]">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#F47716] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="py-4 px-5 text-xs sm:text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Prompt */}
        <div className="mt-10 p-5 rounded-xl bg-[#F2F6F8] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-[#07565A]">
              Have a technical question not answered here?
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Speak directly with our technical team at Royal Enterprises.
            </p>
          </div>
          <a
            href={getWhatsAppLink("Hello SILICONIX, I have a technical query regarding silicone sealant selection.")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <MessageCircle size={15} />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
