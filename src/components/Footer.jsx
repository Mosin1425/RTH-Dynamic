import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/rajasthan_tent_asind/profilecard/?igsh=cnJqNHN2bjkyZnRw', color: 'hover:text-pink-400' },
    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/watch?v=VpKXy1vbbpQ&t=8s', color: 'hover:text-red-400' },
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/QYNbMibhfoPGrX2i/?mibextid=qi2Omg', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', href: 'mailto:events@rajasthantenthouse.com', color: 'hover:text-yellow-400' }
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
      <div className="container mx-auto px-4 py-14 sm:py-18">
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
              Rajasthan Tent House is a leading event management and tent house company in Bhilwara, Rajasthan, specializing in weddings, decorations, DJ setups, and complete event planning across Rajasthan.
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
              <li><Link to="/services/wedding-events" className="text-gray-400 hover:text-white">Wedding Decoration in Bhilwara</Link></li>
              <li><Link to="/services/haldi-ceremony" className="text-gray-400 hover:text-white">Haldi Ceremony Setup</Link></li>
              <li><Link to="/services/ring-ceremony" className="text-gray-400 hover:text-white">Ring Ceremony Decoration</Link></li>
              <li><Link to="/services/birthday-celebrations" className="text-gray-400 hover:text-white">Birthday Party Decoration</Link></li>
              <li><Link to="/services/dj-parties" className="text-gray-400 hover:text-white">DJ Setup for Weddings</Link></li>
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
              <p>Uperly Haveli, Gread Road Asind, Bhilwara<br />Rajasthan (311301)</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              <p>+91 96367 98937</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4" />
              <p>events@rajasthantenthouse.com</p>
            </div>
          </motion.div>
        </div>

        {/* Locations We Serve */}
        <div className="mt-14 pt-10 border-t border-gray-800">
          <h4 className="text-lg font-semibold text-[#5a9b7f] mb-3">
            Locations We Serve
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Bhilwara, Asind, Mandal, Shahpura, Chittorgarh, Ajmer, Udaipur, Jaipur and across Rajasthan.
            We provide premium wedding decoration, tent house services, event planning, DJ setups, stage décor,
            and complete event management throughout Rajasthan.
          </p>

          <p className="mt-4 text-xs text-gray-500 leading-relaxed">
            Wedding decorator in Bhilwara · Tent house for marriage in Rajasthan · Event planner in Bhilwara ·
            Best tent house in Rajasthan · Royal wedding decoration · DJ setup for weddings ·
            Corporate event management in Rajasthan
          </p>
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
