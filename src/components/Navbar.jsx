import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { servicesData } from '@/constants/data';
import Logo from './Logo';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Why Choose Us', path: '/why-choose-us' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#5a9b7f] text-white shadow-md">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3 z-50">
            <div className="bg-[#4a826a] p-2 rounded-lg shadow-md">
              <Logo className="h-9 sm:h-11 w-18 sm:w-22" />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className="block font-serif text-lg tracking-wide text-yellow-300">Rajasthan</span>
              <span className="block text-xs uppercase tracking-widest text-white/90">Tent House</span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium text-white/90 hover:text-white relative group ${
                  location.pathname === link.path ? 'font-bold text-white' : ''
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center font-medium text-white/90 hover:text-white py-2">
                Services
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white rounded-lg shadow-xl py-2 mt-2 text-gray-800 border-t-4 border-yellow-500"
                  >
                    {servicesData.map((s) => (
                      <Link
                        key={s.id}
                        to={`/services/${s.id}`}
                        className="block px-4 py-3 hover:bg-gray-50 hover:text-[#5a9b7f] border-b last:border-0 text-sm font-medium"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/gallery" className="font-medium text-white/90 hover:text-white">
              Gallery
            </Link>

            <Link
              to="/contact"
              className="bg-yellow-500 hover:bg-yellow-400 text-white px-5 py-2 rounded-md font-semibold shadow-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="lg:hidden p-3 text-white rounded-lg active:scale-95"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#5a9b7f] border-t border-white/20 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 rounded-lg text-white hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-4 pt-2">
                <p className="text-yellow-300 font-semibold mb-2 text-sm">Services</p>
                <div className="space-y-1 pl-2">
                  {servicesData.map((s) => (
                    <Link
                      key={s.id}
                      to={`/services/${s.id}`}
                      onClick={closeMobileMenu}
                      className="block py-2 text-white/90"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/gallery"
                onClick={closeMobileMenu}
                className="block px-4 py-3 rounded-lg text-white hover:bg-white/10"
              >
                Gallery
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="block mt-4 bg-yellow-500 text-white py-4 rounded-lg text-center font-bold"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
