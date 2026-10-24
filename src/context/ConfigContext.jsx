import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultConfig } from '../data/defaultConfig';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const ConfigContext = createContext(null);

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('siliconix_website_config');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load config from localStorage', e);
    }
    return defaultConfig;
  });

  const [leads, setLeads] = useState(() => {
    try {
      const savedLeads = localStorage.getItem('siliconix_website_leads');
      if (savedLeads) {
        return JSON.parse(savedLeads);
      }
    } catch (e) {
      console.error('Failed to load leads from localStorage', e);
    }
    return [];
  });

  const [selectedProductForEnquiry, setSelectedProductForEnquiry] = useState(null);
  const [selectedEnquiryType, setSelectedEnquiryType] = useState('Product Enquiry');

  // Real-time synchronization with Firestore enquiries collection
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(q, (snapshot) => {
        const firestoreLeads = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toISOString() : new Date().toISOString()
        }));
        if (firestoreLeads.length > 0) {
          setLeads(firestoreLeads);
          localStorage.setItem('siliconix_website_leads', JSON.stringify(firestoreLeads));
        }
      }, (err) => {
        // Fallback to local leads if offline or rules awaiting auth
        console.log('Firestore snapshot fallback:', err.message);
      });
    } catch (e) {
      console.log('Firestore init notice:', e);
    }
    return () => unsubscribe();
  }, []);

  // Save config changes to localStorage
  const updateConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('siliconix_website_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  };

  // Reset to original default config
  const resetToDefault = () => {
    setConfig(defaultConfig);
    try {
      localStorage.removeItem('siliconix_website_config');
    } catch (e) {
      console.error('Failed to clear config', e);
    }
  };

  // Add a new lead from contact enquiry form (syncs with Firestore and local storage)
  const addLead = async (lead) => {
    const localId = Date.now().toString();
    const newLead = { 
      ...lead, 
      id: localId, 
      createdAt: new Date().toISOString() 
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    try {
      localStorage.setItem('siliconix_website_leads', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save lead to local storage', e);
    }

    // Push to Firestore
    try {
      await addDoc(collection(db, 'enquiries'), {
        name: lead.name || '',
        companyName: lead.companyName || '',
        phone: lead.phone || '',
        email: lead.email || '',
        enquiryType: lead.enquiryType || 'Product Enquiry',
        productRequired: lead.productRequired || 'General',
        message: lead.message || '',
        createdAt: serverTimestamp()
      });
    } catch (fsErr) {
      console.log('Enquiry stored locally (Firestore sync queued):', fsErr.message);
    }
  };

  // Delete a lead (from both local storage and Firestore)
  const deleteLead = async (id) => {
    const updated = leads.filter(item => item.id !== id);
    setLeads(updated);
    try {
      localStorage.setItem('siliconix_website_leads', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete lead from local storage', e);
    }

    try {
      await deleteDoc(doc(db, 'enquiries', id));
    } catch (e) {
      // Local delete succeeded
    }
  };

  // Clear all leads
  const clearLeads = () => {
    setLeads([]);
    try {
      localStorage.removeItem('siliconix_website_leads');
    } catch (e) {
      console.error('Failed to clear leads', e);
    }
  };

  // Helper to build WhatsApp links
  const getWhatsAppLink = (customText) => {
    const rawNumber = config.business.rawPhone || '9545000176';
    const message = customText || config.business.whatsappDefaultMsg;
    return `https://wa.me/91${rawNumber}?text=${encodeURIComponent(message)}`;
  };

  // Scroll smoothly to contact form and prefill product/type
  const openEnquiry = (enquiryType = 'Product Enquiry', productName = '') => {
    setSelectedEnquiryType(enquiryType);
    setSelectedProductForEnquiry(productName);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ConfigContext.Provider
      value={{
        config,
        updateConfig,
        resetToDefault,
        leads,
        addLead,
        deleteLead,
        clearLeads,
        selectedProductForEnquiry,
        setSelectedProductForEnquiry,
        selectedEnquiryType,
        setSelectedEnquiryType,
        getWhatsAppLink,
        openEnquiry
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
