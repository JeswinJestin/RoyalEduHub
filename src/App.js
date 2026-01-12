import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';

// Animation Components
import SmoothScroll from './components/animations/SmoothScroll';

// Styles
import './styles/globals.css';

import SEOManager from './utils/seo';
import FacebookPixelTracker from './components/common/FacebookPixelTracker';

// Lazy-loaded Page Components for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const CoursesPage = React.lazy(() => import('./pages/CoursesPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const HelpCenterPage = React.lazy(() => import('./pages/HelpCenterPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));
const ContactUsPage = React.lazy(() => import('./pages/ContactUsPage'));
const CareersPage = React.lazy(() => import('./pages/CareersPage'));

// Scroll to top component - only scroll to top if no hash is present
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash (anchor link)
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Route-change preloader only when triggered via Footer Support links
function RoutePreloader() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cleanup;
    let timeoutId;
    let triggerTimeoutId;


    try {
      if (sessionStorage.getItem('footerSupportPreloader') === '1') {
        setShow(true);
        sessionStorage.removeItem('footerSupportPreloader');
        timeoutId = setTimeout(() => setShow(false), 2200);
      }
      // Removed auto-showing loader on direct visits/reloads - only show when footer clicked
    } catch (_) {
      // ignore storage errors
    }

    // Listen for global manual triggers (e.g., photo clicks or high-load scenarios)
    const onTrigger = (e) => {
      setShow(true);
      const duration = e?.detail?.duration ?? 2200;
      try { if (triggerTimeoutId) clearTimeout(triggerTimeoutId); } catch(_) {}
      triggerTimeoutId = setTimeout(() => setShow(false), duration);
    };
    try { window.addEventListener('app:trigger-loader', onTrigger); } catch(_) {}

    cleanup = () => {
      try { if (timeoutId) clearTimeout(timeoutId); } catch(_) {}
      try { if (triggerTimeoutId) clearTimeout(triggerTimeoutId); } catch(_) {}
      try { window.removeEventListener('app:trigger-loader', onTrigger); } catch(_) {}
    };

    return cleanup;
  }, [location]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px]">
        <DotLottieReact
          src="https://lottie.host/1aa35c09-805d-452e-ba1f-9324ddd11b78/P0yiwhdjob.lottie"
          loop
          autoplay
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

// Routed content (inside Router so useLocation is valid)
// Loading component for lazy-loaded pages
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function RoutedContent() {
  const mainPadding = 'pt-0';
  return (
    <>
      <Header />
      <main className={mainPadding}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help-center" element={<HelpCenterPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/careers" element={<CareersPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return sessionStorage.getItem('introShown') !== '1';
    } catch (_) {
      return false;
    }
  });
  const [introFading, setIntroFading] = useState(false);

  useEffect(() => {
    if (!showIntro) return;
    // Mark shown for this session and lock scroll during intro
    try { sessionStorage.setItem('introShown', '1'); } catch (_) {}
    try { document.body.style.overflow = 'hidden'; } catch (_) {}
    const INTRO_DURATION_MS = 5500; // Playful timing at 5.5 seconds
    const FADE_START_MS = 5000; // Start fade 500ms before end
    
    // Start fade transition
    const fadeTimer = setTimeout(() => {
      setIntroFading(true);
    }, FADE_START_MS);
    
    // Hide intro completely
    const hideTimer = setTimeout(() => {
      setShowIntro(false);
      setIntroFading(false);
      try { document.body.style.overflow = ''; } catch (_) {}
    }, INTRO_DURATION_MS);
    
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [showIntro]);

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {showIntro && (
        <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
          introFading ? 'opacity-0' : 'opacity-100'
        }`}>
          <div className="w-[300px] h-[300px] sm:w-[360px] sm:h-[360px]">
            <DotLottieReact
              src="https://lottie.host/9678f28d-3e71-4746-b9a3-06de01b92a6a/zz3Uv5hBE4.lottie"
              loop={false}
              autoplay
              className="w-full h-full"
            />
          </div>
        </div>
      )}
      <ScrollToTop />
      <SmoothScroll>
        {/* Footer-triggered route preloader overlay */}
        <RoutePreloader />
        <SEOManager />
        <FacebookPixelTracker />
        <RoutedContent />
      </SmoothScroll>
      <Toaster position="top-right" />
      <Analytics />
    </Router>
  );
}

export default App;
