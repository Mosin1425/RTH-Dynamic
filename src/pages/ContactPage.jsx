import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import Reveal from '@/components/motion/Reveal';
import { ADDRESS_LINES, PHONE_DISPLAY, SITE_URL, WHATSAPP_NUMBER, whatsappLink } from '@/constants/data';

const eventTypes = ['Wedding', 'Reception', 'Haldi', 'Ring Ceremony', 'Birthday', 'DJ Night', 'Other'];

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">{label}</span>
    {children}
  </label>
);

const inputClass =
  'w-full rounded-2xl border border-emerald-900/15 bg-ivory/60 px-4 py-3.5 text-ink placeholder:text-ink-soft/50 transition focus:border-gold-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold-300/30';

// Enquiries are sent as a pre-filled WhatsApp message; there is no email backend.
const ContactPage = () => {
  const [form, setForm] = useState({ name: '', phone: '', eventType: '', date: '', guests: '', message: '' });

  const set = (name) => (e) => setForm({ ...form, [name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const lines = [
      'Hi, I visited your website and want to enquire.',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Event Type: ${form.eventType}`,
      form.date && `Event Date: ${form.date}`,
      form.guests && `Guests: ${form.guests}`,
      form.message && `\nMessage:\n${form.message}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener');
  };

  const contactCards = [
    { icon: MessageCircle, label: 'WhatsApp', value: 'Chat instantly', href: whatsappLink('Hi, I want to enquire about an event.') },
    { icon: Phone, label: 'Call us', value: PHONE_DISPLAY, href: `tel:+${WHATSAPP_NUMBER}` },
    { icon: MapPin, label: 'Visit', value: ADDRESS_LINES.join(', '), href: 'https://www.google.com/maps/search/?api=1&query=Rajasthan+Tent+House+Asind+Bhilwara' },
  ];

  return (
    <div className="overflow-x-clip">
      <SEO
        title="Contact – Event Planner in Bhilwara"
        description="Contact Rajasthan Tent House in Bhilwara for weddings, decorations, DJ nights and complete event management. Get instant quotes on WhatsApp."
        url={`${SITE_URL}/contact`}
      />

      <PageHero
        eyebrow="Contact"
        title="Let’s plan something *beautiful*"
        subtitle="We’re ready to work with you. Share a few details and we’ll reply on WhatsApp with ideas and a quote."
        image="/assets/005-vmake.jpg"
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="relative py-20 sm:py-28">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          {/* Info */}
          <div className="space-y-4">
            {contactCards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.08}>
                <a
                  href={c.href}
                  target={c.href.startsWith('tel') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-3xl border border-emerald-900/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(12,31,26,0.4)]"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-900 text-gold-300 transition group-hover:bg-gold-400 group-hover:text-emerald-950">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">{c.label}</span>
                    <span className="mt-0.5 block font-display text-xl font-semibold text-emerald-900">{c.value}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-soft transition group-hover:rotate-45 group-hover:text-emerald-900" />
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="rounded-3xl bg-emerald-900 p-6 text-ivory">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gold-300" />
                  <p className="font-semibold">We usually reply within an hour</p>
                </div>
                <p className="mt-2 text-sm text-ivory/65">Peak wedding season dates fill up fast, so enquire early to lock in your date.</p>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-4xl border border-emerald-900/10 bg-white p-6 shadow-[0_40px_100px_-50px_rgba(12,31,26,0.5)] sm:p-10">
              <h2 className="text-4xl font-semibold text-emerald-900">Send an enquiry</h2>
              <p className="mt-2 text-sm text-ink-soft">Opens WhatsApp with your details filled in.</p>

              <div className="mt-8">
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">Event type</span>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Event type">
                  {eventTypes.map((t) => {
                    const active = form.eventType === t;
                    return (
                      <button
                        type="button"
                        key={t}
                        role="radio"
                        aria-checked={active}
                        onClick={() => setForm({ ...form, eventType: t })}
                        className={`relative rounded-full border px-4 py-2 text-sm font-medium transition ${
                          active ? 'border-emerald-900 text-ivory' : 'border-emerald-900/15 text-ink hover:border-emerald-900/40'
                        }`}
                      >
                        {active && <motion.span layoutId="event-chip" className="absolute inset-0 -z-0 rounded-full bg-emerald-900" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                        <span className="relative">{t}</span>
                      </button>
                    );
                  })}
                </div>
                {/* Keeps the native "required" check for the chip group */}
                <input
                  tabIndex={-1}
                  aria-hidden="true"
                  className="pointer-events-none h-0 w-full opacity-0"
                  value={form.eventType}
                  onChange={() => {}}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Please choose an event type')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </div>

              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <Field label="Full name">
                  <input value={form.name} onChange={set('name')} required autoComplete="name" placeholder="Your name" className={inputClass} />
                </Field>
                <Field label="Phone">
                  <input value={form.phone} onChange={set('phone')} required type="tel" autoComplete="tel" placeholder="+91" className={inputClass} />
                </Field>
                <Field label="Event date">
                  <input value={form.date} onChange={set('date')} type="date" className={inputClass} />
                </Field>
                <Field label="Approx. guests">
                  <input value={form.guests} onChange={set('guests')} inputMode="numeric" placeholder="e.g. 300" className={inputClass} />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Tell us more">
                  <textarea value={form.message} onChange={set('message')} rows={4} placeholder="Venue, theme, colours, anything you have in mind…" className={`${inputClass} resize-none`} />
                </Field>
              </div>

              <button type="submit" className="btn-gold mt-8 w-full !py-4 text-base">
                <Send className="h-4 w-4" /> Send on WhatsApp
              </button>
            </form>
          </Reveal>
        </div>

        {/* Map */}
        <div className="container mt-20">
          <Reveal>
            <div className="overflow-hidden rounded-4xl border border-emerald-900/10 shadow-2xl">
              <iframe
                title="Rajasthan Tent House location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.097881580614!2d74.32700537519422!3d25.734276477369114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396905ec2a341c23%3A0xbcab8e1abc823035!2sRajasthan%20Tent%20House!5e0!3m2!1sen!2sin!4v1768665805550!5m2!1sen!2sin"
                className="h-[420px] w-full border-0 grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
