import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import WhyChooseUsPage from '@/pages/WhyChooseUsPage';
import OurStoryPage from '@/pages/OurStoryPage';
import AboutPage from '@/pages/AboutPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import GalleryPage from '@/pages/GalleryPage';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

function AppContent() {
  return (
    <>
      <ScrollToTop />

      <Helmet>
        <title>Rajasthan Tent House - Premier Event Management</title>
        <meta
          name="description"
          content="Rajasthan Tent House - Creating unforgettable moments with extraordinary event management services."
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />

        {/* Floating WhatsApp Button */}
        <WhatsAppFloat />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
