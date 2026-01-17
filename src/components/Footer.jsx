import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:text-pink-400' },
    { icon: Youtube, label: 'YouTube', href: '#', color: 'hover:text-red-400' },
    { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', href: 'mailto:info@rajasthantenthouse.com', color: 'hover:text-yellow-400' }
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Why Choose Us', path: '/why-choose-us' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="bg-[#4a826a] p-2 rounded-lg">
                <Logo className="h-9 w-18" />
              </div>
              <div className="leading-tight">
                <span className="block font-serif text-lg tracking-wide text-yellow-300">Rajasthan</span>
                <span className="block text-xs uppercase tracking-widest text-white/70">Tent House</span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Creating unforgettable moments and exceptional celebrations since 1999.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-gray-400 ${social.color} bg-gray-800 p-2.5 rounded-full hover:bg-gray-700 transition-all`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-base font-bold mb-4 text-[#5a9b7f]">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="block py-1 text-sm text-gray-400 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-base font-bold mb-4 text-[#5a9b7f]">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/wedding-events" className="text-gray-400 hover:text-white">Wedding Events</Link></li>
              <li><Link to="/services/haldi-ceremony" className="text-gray-400 hover:text-white">Haldi Ceremony</Link></li>
              <li><Link to="/services/ring-ceremony" className="text-gray-400 hover:text-white">Ring Ceremony</Link></li>
              <li><Link to="/services/birthday-celebrations" className="text-gray-400 hover:text-white">Birthday Parties</Link></li>
              <li><Link to="/services/dj-parties" className="text-gray-400 hover:text-white">DJ Night Parties</Link></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <h3 className="text-base font-bold mb-3 text-[#5a9b7f]">Contact</h3>

            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 mt-0.5" />
              <p>Main Market, Bhilwara<br />Rajasthan - 311001</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              <p>+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4" />
              <p>info@rajasthantenthouse.com</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-gray-800 bg-black/30">
        <div className="container mx-auto px-4 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Rajasthan Tent House. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
