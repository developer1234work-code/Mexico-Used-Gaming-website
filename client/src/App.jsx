import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SellingCartDrawer from './components/SellingCartDrawer';
import WhatsAppFloat from './components/WhatsAppFloat';

// Customer & Catalog Pages
import HomePage from './pages/HomePage';
import ConsoleBrandSelectorPage from './pages/ConsoleBrandSelectorPage';
import ConsoleDetailPage from './pages/ConsoleDetailPage';
import SpecialEditionsPage from './pages/SpecialEditionsPage';
import CataloguePage from './pages/CataloguePage';
import CustomQuotePage from './pages/CustomQuotePage';
import SubmitRequestPage from './pages/SubmitRequestPage';
import RequestConfirmationPage from './pages/RequestConfirmationPage';
import CustomerTrackingPage from './pages/CustomerTrackingPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { 
  HowItWorksPage, 
  AboutPage, 
  FAQPage, 
  TermsPage, 
  ShippingPolicyPage 
} from './pages/InfoPages';

import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedConsole, setSelectedConsole] = useState(null);
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [trackingRequestId, setTrackingRequestId] = useState('');
  const [trackingEmail, setTrackingEmail] = useState('');

  const { isAuthenticated } = useAuth();
  const { openCart } = useCart();

  // Scroll to top on view changes
  const setView = (viewName) => {
    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setView('consoles');
  };

  const handleSelectConsole = (consoleItem) => {
    setSelectedConsole(consoleItem);
    setView('console-detail');
  };

  const handleSelectCategory = (category) => {
    if (category === 'consoles') {
      setSelectedBrand('all');
      setView('consoles');
    } else {
      setSelectedCategory(category);
      setView('catalogue');
    }
  };

  const handleSubmissionSuccess = (request) => {
    setSubmittedRequest(request);
    setView('confirmation');
  };

  const handleTrackRequest = (reqId, email) => {
    setTrackingRequestId(reqId || '');
    setTrackingEmail(email || '');
    setView('track');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] text-neutral-900">
      {/* Top Header Navigation (Pure black, clean and modern) */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        onSelectBrand={handleSelectBrand}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        
        {/* 1. Home Page */}
        {currentView === 'home' && (
          <HomePage 
            setView={setView} 
            onSelectCategory={handleSelectCategory} 
          />
        )}

        {/* 2. Console Brand Selector Page (Vende tus Consolas - 59+ systems) */}
        {currentView === 'consoles' && (
          <ConsoleBrandSelectorPage
            initialBrand={selectedBrand}
            onSelectConsole={handleSelectConsole}
            onOpenCustomQuote={() => setView('custom-quote')}
            onOpenSpecialEditions={() => setView('special-editions')}
          />
        )}

        {/* 3. Individual Console Pricing & Configuration Page */}
        {currentView === 'console-detail' && selectedConsole && (
          <ConsoleDetailPage
            consoleItem={selectedConsole}
            onBack={() => setView('consoles')}
            onOpenCustomQuote={() => setView('custom-quote')}
          />
        )}

        {/* 4. Special Editions Valuation Page */}
        {currentView === 'special-editions' && (
          <SpecialEditionsPage
            onGoToConsoles={() => setView('consoles')}
            onOpenCustomQuote={() => setView('custom-quote')}
          />
        )}

        {/* 5. General Catalogue (Video Games & Retro CRT TVs) */}
        {(currentView === 'sell' || currentView === 'catalogue') && (
          <CataloguePage 
            initialCategory={selectedCategory}
            onOpenCustomQuote={() => setView('custom-quote')}
          />
        )}

        {/* 6. Custom Unlisted Valuation Request */}
        {currentView === 'custom-quote' && (
          <CustomQuotePage 
            onBackToCatalogue={() => setView('catalogue')}
          />
        )}

        {/* 7. Submit Request Checkout Form */}
        {currentView === 'submit-request' && (
          <SubmitRequestPage
            onSubmissionSuccess={handleSubmissionSuccess}
            onBackToCart={openCart}
          />
        )}

        {/* 8. Request Confirmation with Official Carrier Guidelines */}
        {currentView === 'confirmation' && (
          <RequestConfirmationPage
            request={submittedRequest}
            onTrackRequest={handleTrackRequest}
            onGoHome={() => setView('home')}
          />
        )}

        {/* 9. Customer Tracking Page (Accessible from confirmation or links) */}
        {currentView === 'track' && (
          <CustomerTrackingPage
            initialRequestId={trackingRequestId}
            initialEmail={trackingEmail}
          />
        )}

        {/* 10. Admin Dashboard & Login */}
        {currentView === 'admin' && (
          isAuthenticated ? (
            <AdminDashboardPage onLogout={() => setView('home')} />
          ) : (
            <AdminLoginPage onLoginSuccess={() => setView('admin')} />
          )
        )}

        {/* Informational Pages */}
        {currentView === 'how-it-works' && <HowItWorksPage setView={setView} />}
        {currentView === 'about' && <AboutPage />}
        {currentView === 'faq' && <FAQPage />}
        {currentView === 'terms' && <TermsPage />}
        {currentView === 'shipping-policy' && <ShippingPolicyPage />}
        {currentView === 'privacy' && <TermsPage />}
        {currentView === 'contact' && <FAQPage />}
      </main>

      {/* Selling Cart Slide-in Drawer */}
      <SellingCartDrawer
        onProceedToSubmit={() => setView('submit-request')}
        onAddMore={() => setView('consoles')}
      />

      {/* Floating WhatsApp Support Button */}
      <WhatsAppFloat />

      {/* Global Footer (shown on all customer pages) */}
      {currentView !== 'admin' && (
        <Footer 
          setView={setView} 
          onSelectCategory={handleSelectCategory}
        />
      )}
    </div>
  );
}
