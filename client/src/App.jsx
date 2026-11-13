import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SellingCartDrawer from './components/SellingCartDrawer';
import WhatsAppFloat from './components/WhatsAppFloat';

// Pages
import HomePage from './pages/HomePage';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
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

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setView('catalogue');
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
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <Navbar currentView={currentView} setView={setView} />

      {/* Main Content Pages */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage 
            setView={setView} 
            onSelectCategory={handleSelectCategory} 
          />
        )}

        {(currentView === 'sell' || currentView === 'catalogue') && (
          <CataloguePage 
            initialCategory={selectedCategory}
            onOpenCustomQuote={() => setView('custom-quote')}
          />
        )}

        {currentView === 'custom-quote' && (
          <CustomQuotePage 
            onBackToCatalogue={() => setView('catalogue')}
          />
        )}

        {currentView === 'submit-request' && (
          <SubmitRequestPage
            onSubmissionSuccess={handleSubmissionSuccess}
            onBackToCart={openCart}
          />
        )}

        {currentView === 'confirmation' && (
          <RequestConfirmationPage
            request={submittedRequest}
            onTrackRequest={handleTrackRequest}
            onGoHome={() => setView('home')}
          />
        )}

        {currentView === 'track' && (
          <CustomerTrackingPage
            initialRequestId={trackingRequestId}
            initialEmail={trackingEmail}
          />
        )}

        {currentView === 'admin' && (
          isAuthenticated ? (
            <AdminDashboardPage onLogout={() => setView('home')} />
          ) : (
            <AdminLoginPage onLoginSuccess={() => setView('admin')} />
          )
        )}

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
        onAddMore={() => setView('catalogue')}
      />

      {/* Floating WhatsApp Support Button */}
      <WhatsAppFloat />

      {/* Global Footer (shown on all customer pages) */}
      {currentView !== 'admin' && <Footer setView={setView} />}
    </div>
  );
}
