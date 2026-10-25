import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import FloatingActions from '@/components/FloatingActions';
import Preloader from '@/components/Preloader';
import SmoothScroll, { useLenis } from '@/components/motion/SmoothScroll';
import ScrollProgress from '@/components/motion/ScrollProgress';
import Home from '@/pages/Home';

// Home ships in the main bundle; every other page loads on demand.
const WhyChooseUsPage = lazy(() => import('@/pages/WhyChooseUsPage'));
const OurStoryPage = lazy(() => import('@/pages/OurStoryPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const AdminPage = lazy(() => import('@/pages/AdminPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const PageFallback = () => <div className="min-h-screen bg-emerald-950" />;

function AnimatedRoutes() {
  const location = useLocation();
  const lenis = useLenis();

  // Jump to the top once the old page has faded out, so it doesn't visibly snap first.
  const scrollTop = () => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={scrollTop}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <>
      <Preloader />
      <ScrollProgress />

      <div className="flex min-h-screen flex-col bg-ivory">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <Toaster />
        <FloatingActions />
      </div>
    </>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </Router>
    </MotionConfig>
  );
}
