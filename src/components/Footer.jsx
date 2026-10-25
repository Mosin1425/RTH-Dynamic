import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Facebook, Instagram, MapPin, MessageCircle, Phone, Youtube } from 'lucide-react';
import { ADDRESS_LINES, PHONE_DISPLAY, WHATSAPP_NUMBER, servicesData, whatsappLink } from '@/constants/data';
import { useLenis } from '@/components/motion/SmoothScroll';
import Marquee from '@/components/motion/Marquee';
import Logo from './Logo';

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/rajasthan_tent_asind/profilecard/?igsh=cnJqNHN2bjkyZnRw' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/watch?v=VpKXy1vbbpQ&t=8s' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/QYNbMibhfoPGrX2i/?mibextid=qi2Omg' },
  { icon: MessageCircle, label: 'WhatsApp', href: whatsappLink() },
];

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Story', path: '/our-story' },
  { label: 'Why Choose Us', path: '/why-choose-us' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const locations = ['Bhilwara', 'Asind', 'Mandal', 'Shahpura', 'Chittorgarh', 'Ajmer', 'Udaipur', 'Jaipur'];

const Footer = () => {
  const lenis = useLenis();
  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));

  return (
    <footer className="grain relative overflow-hidden bg-emerald-950 text-ivory">
      {/* Locations ticker */}
      <div className="border-y border-white/10 py-5">
        <Marquee duration={35}>
          {locations.map((city) => (
            <span key={city} className="flex items-center gap-8 pr-8 font-display text-2xl italic text-ivory/70 sm:text-3xl">
              {city}
              <span className="text-gold-400">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <div className="container relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-16 place-items-center rounded-xl border border-gold-400/30 bg-emerald-800">
                <Logo className="h-9 w-14" />
              </span>
              <span className="leading-none">
                <span className="block font-display text-2xl font-semibold text-gold-300">Rajasthan</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.35em] text-ivory/70">Tent House</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/60">
              A leading event management and tent house company in Bhilwara, Rajasthan, specializing in weddings,
              decorations, DJ setups, and complete event planning across Rajasthan.
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-ivory/70 transition hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-emerald-950"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-gold-300">Explore</h3>
            <ul className="mt-5 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-ivory/65 transition hover:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-gold-300">Services</h3>
            <ul className="mt-5 space-y-2.5">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <Link to={`/services/${s.id}`} className="text-sm text-ivory/65 transition hover:text-gold-300">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-gold-300">Visit us</h3>
            <div className="mt-5 space-y-4 text-sm text-ivory/65">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
                <span>
                  {ADDRESS_LINES[0]}
                  <br />
                  {ADDRESS_LINES[1]}
                </span>
              </p>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-3 transition hover:text-gold-300">
                <Phone className="h-4 w-4 text-gold-400" /> {PHONE_DISPLAY}
              </a>
              <Link to="/contact" className="btn-gold mt-2 !px-5 !py-2.5">
                Send an enquiry <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Giant wordmark */}
        <p
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display text-[15vw] font-semibold leading-none text-transparent [-webkit-text-stroke:1px_rgba(232,200,115,0.4)] lg:text-[11.5rem]"
        >
          Rajasthan
        </p>

        <div className="mt-10 border-t border-white/10 pt-8 text-xs leading-relaxed text-ivory/40">
          <p>
            Serving {locations.join(', ')} and across Rajasthan with premium wedding decoration, tent house services,
            event planning, DJ setups, stage décor, and complete event management.
          </p>
          <p className="mt-2">
            Wedding decorator in Bhilwara · Tent house for marriage in Rajasthan · Event planner in Bhilwara · Best tent
            house in Rajasthan · Royal wedding decoration · DJ setup for weddings · Corporate event management in Rajasthan
          </p>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 pb-28 sm:flex-row sm:pb-0 sm:pr-64">
          <p className="text-xs text-ivory/40">© {new Date().getFullYear()} Rajasthan Tent House. All rights reserved.</p>
          <button
            onClick={toTop}
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/60 transition hover:text-gold-300"
          >
            Back to top
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition group-hover:-translate-y-1 group-hover:border-gold-400">
              <ArrowUp className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
