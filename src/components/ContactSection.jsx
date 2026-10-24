import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { Phone, MessageCircle, Navigation, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection = () => {
  const { 
    config, 
    addLead, 
    selectedProductForEnquiry, 
    selectedEnquiryType,
    getWhatsAppLink 
  } = useConfig();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'Product Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedLead, setLastSubmittedLead] = useState(null);

  useEffect(() => {
    if (selectedEnquiryType) {
      setFormData(prev => ({ ...prev, enquiryType: selectedEnquiryType }));
    }
  }, [selectedEnquiryType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please provide your name and phone number.');
      return;
    }

    addLead({
      ...formData,
      productRequired: selectedProductForEnquiry || 'General'
    });
    setLastSubmittedLead(formData);
    setSubmitted(true);

    setFormData({
      name: '',
      phone: '',
      email: '',
      enquiryType: 'Product Enquiry',
      message: ''
    });
  };

  const getFormWhatsAppLink = () => {
    if (!lastSubmittedLead) return getWhatsAppLink();
    const text = `*SILICONIX Enquiry*\nName: ${lastSubmittedLead.name}\nPhone: ${lastSubmittedLead.phone}\nType: ${lastSubmittedLead.enquiryType}\nMessage: ${lastSubmittedLead.message || 'Please provide quotation.'}`;
    return getWhatsAppLink(text);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="site-container">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-bold text-[#07565A]">
            Contact Us
          </h2>
          <p className="mt-2 text-sm text-[#263536]/80">
            Get in touch with Royal Enterprises for product enquiries, technical support, and orders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Business Details & 3 Clear Actions */}
          <div className="lg:col-span-5 bg-[#F5F7F7] rounded-xl p-6 sm:p-8 border border-[#E6EAEB] space-y-6">
            
            <div>
              <h3 className="text-xl font-bold text-[#07565A]">
                Royal Enterprises
              </h3>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                SILICONIX Silicone Sealants
              </p>
            </div>

            {/* Address */}
            <div className="text-xs text-[#263536] leading-relaxed space-y-1">
              <p className="font-semibold text-gray-700">Works & Office Address:</p>
              <p>Chavan Industry, Shade No. 1,</p>
              <p>Opposite Vertaxis Futuretech Pvt. Ltd.,</p>
              <p>Dhayari–Narhe Road,</p>
              <p>Dhayari, Pune – 411041, Maharashtra, India.</p>
            </div>

            {/* Phone */}
            <div className="text-xs text-[#263536] space-y-1 pt-1">
              <p className="font-semibold text-gray-700">Phone Contact:</p>
              <a
                href={config.business.telLink}
                className="text-base font-bold text-[#07565A] hover:text-[#F47716] transition-colors block"
              >
                +91 95450 00176
              </a>
            </div>

            {/* Three Clear Actions */}
            <div className="space-y-2.5 pt-4 border-t border-[#E6EAEB]">
              {/* 1. Call Now */}
              <a
                href={config.business.telLink}
                className="w-full py-2.5 px-4 rounded-md bg-[#07565A] hover:bg-[#06484B] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={14} className="text-[#F47716]" />
                <span>Call Now</span>
              </a>

              {/* 2. WhatsApp Enquiry */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={15} />
                <span>WhatsApp Enquiry</span>
              </a>

              {/* 3. Get Directions */}
              <a
                href={config.business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-md border border-[#07565A] text-[#07565A] hover:bg-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <Navigation size={14} className="text-[#F47716]" />
                <span>Get Directions</span>
              </a>
            </div>

          </div>

          {/* Right Column: Simple Clean Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-[#E6EAEB]">
            
            <h3 className="text-xl font-bold text-[#07565A] mb-1">
              Send an Enquiry
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill in the form below and we will get back to you promptly.
            </p>

            {submitted ? (
              <div className="bg-[#F5F7F7] border border-[#E6EAEB] rounded-lg p-6 text-center space-y-4">
                <div className="w-10 h-10 rounded-full bg-[#07565A] text-[#F47716] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#07565A]">
                    Enquiry Submitted Successfully
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Thank you. Our team will contact you shortly.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                  <a
                    href={getFormWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} />
                    <span>Send via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#263536] mb-1">
                      Name <span className="text-[#F47716]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Full Name"
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 focus:border-[#07565A] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263536] mb-1">
                      Phone Number <span className="text-[#F47716]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 focus:border-[#07565A] focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Email & Enquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#263536] mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 focus:border-[#07565A] focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#263536] mb-1">
                      Enquiry Type
                    </label>
                    <select
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 focus:border-[#07565A] focus:outline-hidden bg-white"
                    >
                      <option value="Product Enquiry">Product Enquiry</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="OEM Manufacturing">OEM Manufacturing</option>
                      <option value="Dealership">Dealership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-[#263536] mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe your product requirements or quantities..."
                    className="w-full px-3 py-2 text-xs rounded-md border border-gray-300 focus:border-[#07565A] focus:outline-hidden"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-semibold tracking-wide transition-colors"
                  >
                    Submit Enquiry
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
