import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from 'lucide-react';
import { servicesData, PHONE_DISPLAY, WHATSAPP_NUMBER } from '@/constants/data';
import { useLenis } from '@/components/motion/SmoothScroll';
import { EASE } from '@/components/motion/Reveal';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Our Story', path: '/our-story' },
  { label: 'Why Us', path: '/why-choose-us' },
  { label: 'Gallery', path: '/gallery' },
];

const Brand = () => (
  <Link to="/" className="relative z-[60] flex items-center gap-3" aria-label="Rajasthan Tent House home">
    <span className="grid h-11 w-14 place-items-center rounded-xl border border-gold-400/30 bg-emerald-800/80 shadow-inner sm:h-12 sm:w-16">
      <Logo className="h-8 w-12 sm:h-9 sm:w-14" />
    </span>
    <span className="leading-none">
      <span className="block font-display text-xl font-semibold tracking-wide text-gold-300">Rajasthan</span>
      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.35em] text-ivory/80">Tent House</span>
    </span>
  </Link>
);

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const lenis = useLenis();

  // Glass background once the page scrolls; hide while scrolling down, reveal on scroll up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !mobileOpen);
  });

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, lenis]);

  // Pages without a dark hero (e.g. /admin) need a solid bar from the start.
  const solid = scrolled || pathname.startsWith('/admin');

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: EASE }}
        className="fixed inset-x-0 top-0 z-[86] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <div
          className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl px-3 transition-all duration-500 sm:h-[72px] sm:px-5 ${
            solid
              ? 'border border-white/10 bg-emerald-950/75 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <Brand />

          {/* Desktop */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {navLinks.slice(0, 4).map((link) => (
              <NavItem key={link.path} {...link} />
            ))}

            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
                className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                  pathname.startsWith('/services') ? 'text-gold-300' : 'text-ivory/85 hover:text-ivory'
                }`}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-4"
                  >
                    <div className="grid grid-cols-2 gap-1 rounded-3xl border border-white/10 bg-emerald-950/95 p-3 shadow-2xl backdrop-blur-xl">
                      {servicesData.map((s) => (
                        <Link
                          key={s.id}
                          to={`/services/${s.id}`}
                          className="group flex items-center gap-3 rounded-2xl p-2 transition hover:bg-white/5"
                        >
                          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                            <img src={s.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                          </span>
                          <span>
                            <span className="block text-sm font-semibold text-ivory group-hover:text-gold-300">{s.title}</span>
                            <span className="mt-0.5 line-clamp-1 text-xs text-ivory/50">{s.description}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavItem {...navLinks[4]} />
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-ivory/80 transition hover:text-ivory xl:flex"
            >
              <Phone className="h-4 w-4 text-gold-300" /> {PHONE_DISPLAY}
            </a>
            <Link to="/contact" className="btn-gold hidden !px-5 !py-2.5 sm:inline-flex">
              Book your event <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5 text-ivory backdrop-blur lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grain fixed inset-0 z-[85] overflow-y-auto bg-emerald-950 lg:hidden"
            data-lenis-prevent
          >
            <div className="pattern-jaali absolute inset-0 opacity-40" />
            <div className="relative flex min-h-full flex-col px-6 pb-10 pt-28">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
                className="space-y-1"
              >
                {[...navLinks, { label: 'Contact', path: '/contact' }].map((link) => (
                  <motion.li
                    key={link.path}
                    variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                  >
                    <Link
                      to={link.path}
                      className={`block py-1.5 font-display text-4xl font-semibold ${pathname === link.path ? 'text-gold-300' : 'text-ivory'}`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                className="mt-10"
              >
                <p className="eyebrow text-gold-300">Services</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {servicesData.map((s) => (
                    <Link key={s.id} to={`/services/${s.id}`} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-2">
                      <img src={s.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                      <span className="text-xs font-medium text-ivory/90">{s.shortTitle}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mt-auto pt-10"
              >
                <Link to="/contact" className="btn-gold w-full">
                  Book your event <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="mt-4 flex items-center justify-center gap-2 text-sm text-ivory/70">
                  <Phone className="h-4 w-4 text-gold-300" /> {PHONE_DISPLAY}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function NavItem({ label, path }) {
  return (
    <NavLink
      to={path}
      end={path === '/'}
      className={({ isActive }) =>
        `relative rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'text-gold-300' : 'text-ivory/85 hover:text-ivory'}`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
        </>
      )}
    </NavLink>
  );
}

export default Navbar;
