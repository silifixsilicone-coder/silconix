import React, { useState, useEffect } from 'react';
import { ConfigProvider } from './context/ConfigContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { OEMSection } from './components/OEMSection';
import { ApplicationsSection } from './components/ApplicationsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';

function MainRouter() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // 1. Direct Admin Route Handling (/admin or /admin/login)
  const isAdminRoute = currentPath.startsWith('/admin');

  if (isAdminRoute) {
    if (loading) {
      return (
        <div className="min-h-screen bg-[#F5F7F7] flex items-center justify-center text-xs font-semibold text-[#07565A]">
          Verifying administrator authentication...
        </div>
      );
    }

    // If unauthenticated: redirect/show Admin Login page
    if (!isAuthenticated) {
      return (
        <AdminLoginPage
          onLoginSuccess={() => navigateTo('/admin')}
          onBackToSite={() => navigateTo('/')}
        />
      );
    }

    // If authenticated: show protected Admin Dashboard
    return (
      <AdminDashboardPage
        onLogout={() => navigateTo('/admin/login')}
        onNavigateHome={() => navigateTo('/')}
      />
    );
  }

  // 2. Public-Facing Website (Zero Admin links, buttons, or controls visible)
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#263536]">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <OEMSection />
        <ApplicationsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ConfigProvider>
        <MainRouter />
      </ConfigProvider>
    </AuthProvider>
  );
}
