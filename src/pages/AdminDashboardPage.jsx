import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useAuth } from '../context/AuthContext';
import { 
  Building, 
  Package, 
  Inbox, 
  MessageSquare, 
  LogOut, 
  Save, 
  RotateCcw, 
  Trash2, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  Upload, 
  Plus, 
  ShieldCheck, 
  Eye 
} from 'lucide-react';

export const AdminDashboardPage = ({ onLogout, onNavigateHome }) => {
  const { config, updateConfig, resetToDefault, leads, deleteLead, clearLeads } = useConfig();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('contact');
  const [formData, setFormData] = useState(config);
  const [saveToast, setSaveToast] = useState(false);

  const handleBusinessChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      business: {
        ...prev.business,
        [field]: value
      }
    }));
  };

  const handleProductChange = (index, field, value) => {
    const updated = [...formData.products];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      products: updated
    }));
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleProductChange(index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const raw = formData.business.phone.replace(/[^0-9]/g, '').slice(-10);
    const updated = {
      ...formData,
      business: {
        ...formData.business,
        rawPhone: raw,
        telLink: `tel:+91${raw}`
      }
    };
    updateConfig(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore official default contact details and products?")) {
      resetToDefault();
      setFormData(config);
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2000);
    }
  };

  const handleUserLogout = async () => {
    await logout();
    if (onLogout) onLogout();
  };

  const exportLeadsCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export.");
      return;
    }
    const headers = ["ID", "Date", "Name", "Company", "Phone", "Email", "Enquiry Type", "Product Required", "Message"];
    const rows = leads.map(l => [
      l.id,
      new Date(l.createdAt).toLocaleString(),
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.companyName || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.enquiryType || '').replace(/"/g, '""')}"`,
      `"${(l.productRequired || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `siliconix_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#F5F7F7] flex flex-col text-[#263536]">
      
      {/* Top Admin Navbar */}
      <nav className="bg-[#07565A] text-white px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#06484B]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#F47716] flex items-center justify-center font-bold text-white text-sm">
            S
          </div>
          <div>
            <div className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
              <span>SILICONIX Admin Control Panel</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-mono">
                Authenticated
              </span>
            </div>
            <div className="text-[10px] text-gray-300">
              Logged in as {user?.email || 'admin@royalenterprises.co.in'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateHome}
            className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Eye size={14} />
            <span className="hidden sm:inline">View Public Website</span>
          </button>

          <button
            onClick={handleUserLogout}
            className="px-3 py-1.5 rounded-md bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Main Admin Content Container */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {saveToast && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-md text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span>Configuration changes successfully published live to the public website!</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg border border-[#E6EAEB] flex overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-5 flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'contact'
                ? 'border-[#07565A] text-[#07565A] bg-[#F5F7F7]/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Building size={15} />
            <span>Business Contact Details</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 px-5 flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'leads'
                ? 'border-[#07565A] text-[#07565A] bg-[#F5F7F7]/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Inbox size={15} />
            <span>Customer Leads ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-5 flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'products'
                ? 'border-[#07565A] text-[#07565A] bg-[#F5F7F7]/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package size={15} />
            <span>Product Management ({formData.products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-5 flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'content'
                ? 'border-[#07565A] text-[#07565A] bg-[#F5F7F7]/50'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare size={15} />
            <span>Headlines & Taglines</span>
          </button>
        </div>

        {/* TAB 1: Business Contact Details */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-lg border border-[#E6EAEB] p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#07565A]">
                Business Contact Details
              </h2>
              <p className="text-xs text-gray-500">
                Updating these values synchronizes the public contact section, footer, and communication links.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Company Entity Name</label>
                <input
                  type="text"
                  value={formData.business.companyName}
                  onChange={(e) => handleBusinessChange('companyName', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:border-[#07565A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={formData.business.brandName}
                  onChange={(e) => handleBusinessChange('brandName', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:border-[#07565A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Public Mobile (+91 95450 00176)</label>
                <input
                  type="text"
                  value={formData.business.phone}
                  onChange={(e) => handleBusinessChange('phone', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:border-[#07565A] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Sales Email Address</label>
                <input
                  type="email"
                  value={formData.business.email}
                  onChange={(e) => handleBusinessChange('email', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:border-[#07565A] focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <label className="block font-semibold text-gray-700">Official Works & Plant Address</label>
              <input
                type="text"
                value={formData.business.addressLine1}
                onChange={(e) => handleBusinessChange('addressLine1', e.target.value)}
                placeholder="Address Line 1"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={formData.business.addressLine2}
                onChange={(e) => handleBusinessChange('addressLine2', e.target.value)}
                placeholder="Address Line 2"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={formData.business.addressCityState}
                onChange={(e) => handleBusinessChange('addressCityState', e.target.value)}
                placeholder="Dhayari, Pune – 411041, Maharashtra, India."
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Google Maps Search / Directions Link</label>
                <input
                  type="text"
                  value={formData.business.googleMapsUrl}
                  onChange={(e) => handleBusinessChange('googleMapsUrl', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Default WhatsApp Prefilled Message</label>
                <textarea
                  rows={2}
                  value={formData.business.whatsappDefaultMsg}
                  onChange={(e) => handleBusinessChange('whatsappDefaultMsg', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6EAEB] flex items-center justify-between">
              <button
                onClick={handleReset}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <RotateCcw size={13} />
                <span>Restore Defaults</span>
              </button>

              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#07565A] hover:bg-[#06484B] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Save size={14} />
                <span>Save Contact Details</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Customer Leads Inbox */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-lg border border-[#E6EAEB] p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#07565A]">
                  Customer & OEM Leads Inbox
                </h2>
                <p className="text-xs text-gray-500">
                  {leads.length} enquiries submitted from the website contact forms.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportLeadsCSV}
                  className="px-3 py-1.5 bg-[#07565A] hover:bg-[#06484B] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
                {leads.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm("Clear all lead records?")) clearLeads();
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 text-xs font-semibold rounded-md transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="text-center py-12 bg-[#F5F7F7] rounded-md border border-[#E6EAEB]">
                <Inbox size={28} className="text-gray-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-600">No enquiries submitted yet.</p>
                <p className="text-[11px] text-gray-400">Incoming inquiries from the contact form will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-md border border-[#E6EAEB] hover:border-[#07565A]/40 transition-colors bg-white flex flex-col sm:flex-row justify-between items-start gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#07565A]">{lead.name}</span>
                        <span className="bg-[#F47716]/10 text-[#F47716] text-[10px] font-bold px-2 py-0.5 rounded">
                          {lead.enquiryType}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 flex flex-wrap items-center gap-3">
                        <span className="font-semibold text-gray-900">Phone: {lead.phone}</span>
                        {lead.email && <span>Email: {lead.email}</span>}
                        {lead.productRequired && <span className="text-[#07565A]">Product: {lead.productRequired}</span>}
                      </div>
                      {lead.message && (
                        <p className="text-xs text-gray-700 bg-[#F5F7F7] p-2 rounded mt-1">
                          "{lead.message}"
                        </p>
                      )}
                      <span className="text-[10px] text-gray-400 block pt-1">
                        Received: {new Date(lead.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex sm:flex-col items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/91${(lead.phone || '').replace(/[^0-9]/g, '').slice(-10)}?text=${encodeURIComponent(`Hello ${lead.name}, thank you for contacting Royal Enterprises regarding SILICONIX sealants.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded bg-[#F47716] hover:bg-[#dc650a] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink size={12} />
                        <span>Reply WhatsApp</span>
                      </a>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100"
                        title="Delete Lead"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Product Management & Image Uploads */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-lg border border-[#E6EAEB] p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#07565A]">
                Product Management & Image Uploads
              </h2>
              <p className="text-xs text-gray-500">
                Update product names, 2-line descriptions, cartridge photos, and technical parameters.
              </p>
            </div>

            <div className="space-y-6">
              {formData.products.map((prod, idx) => (
                <div key={prod.id} className="p-5 rounded-lg border border-[#E6EAEB] bg-[#F5F7F7] space-y-4">
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md bg-white p-1 border border-[#E6EAEB] flex items-center justify-center shrink-0">
                      <img src={prod.image} alt={prod.name} className="max-h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#07565A]">{prod.name}</h3>
                      <label className="mt-1 cursor-pointer inline-flex items-center gap-1 text-[11px] font-semibold text-[#07565A] hover:underline">
                        <Upload size={12} />
                        <span>Upload New Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageUpload(idx, e)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Product Title</label>
                      <input
                        type="text"
                        value={prod.name}
                        onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Category Label</label>
                      <input
                        type="text"
                        value={prod.category}
                        onChange={(e) => handleProductChange(idx, 'category', e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-gray-700 mb-1">Short Description (Max 2 lines)</label>
                    <textarea
                      rows={2}
                      value={prod.shortDesc}
                      onChange={(e) => handleProductChange(idx, 'shortDesc', e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#07565A] hover:bg-[#06484B] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Save size={14} />
                <span>Save Product Changes</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: Headlines & Taglines */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-lg border border-[#E6EAEB] p-6 space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#07565A]">
                Headlines & Taglines
              </h2>
              <p className="text-xs text-gray-500">
                Configure primary hero headline and brand tagline.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={formData.business.tagline}
                  onChange={(e) => handleBusinessChange('tagline', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Hero Main Headline</label>
                <input
                  type="text"
                  value={formData.business.mainHeadline}
                  onChange={(e) => handleBusinessChange('mainHeadline', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Hero Supporting Text</label>
                <textarea
                  rows={2}
                  value={formData.business.heroSubtitle}
                  onChange={(e) => handleBusinessChange('heroSubtitle', e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#07565A] hover:bg-[#06484B] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Save size={14} />
                <span>Save Content</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
