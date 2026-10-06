import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SEO from '@/components/SEO';
import CtaBand from '@/components/CtaBand';
import PhotoGallery from '@/components/PhotoGallery';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import Magnetic from '@/components/motion/Magnetic';
import { useAdmin } from '@/hooks/useAdmin';
import { useImages } from '@/hooks/useImages';
import { SITE_URL, servicesData, showcaseImages, whatsappLink } from '@/constants/data';
import NotFoundPage from './NotFoundPage';

const included = ['Concept & décor design', 'Own inventory & crew', 'Lighting & sound', 'On-site event manager'];

const ServiceDetailPage = () => {
  const { id } = useParams();
  const index = servicesData.findIndex((s) => s.id === id);
  const service = servicesData[index];

  const { isAdmin, logout } = useAdmin();
  const { images, loading, uploading, upload, remove } = useImages('service', service ? id : null);

  if (!service) return <NotFoundPage />;

  const prev = servicesData[(index - 1 + servicesData.length) % servicesData.length];
  const next = servicesData[(index + 1) % servicesData.length];
  const quoteLink = whatsappLink(`I want a quote for "${service.title}". Please contact me.`);

  return (
    <div className="overflow-x-clip">
      <SEO
        title={`${service.title} in Bhilwara`}
        description={`${service.title} services by Rajasthan Tent House in Bhilwara. Premium setups, professional planning, and complete event execution across Rajasthan.`}
        url={`${SITE_URL}/services/${id}`}
        image={service.image}
      />

      <PageHero
        eyebrow={service.shortTitle}
        title={service.title}
        subtitle={service.description}
        image={service.image}
        crumbs={[{ label: 'Services' }, { label: service.shortTitle }]}
      >
        <div className="flex flex-wrap gap-3">
          <Magnetic>
            <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
              <MessageCircle className="h-4 w-4" /> Get an instant quote
            </a>
          </Magnetic>
          <a href="#photos" className="btn-ghost">See the setups</a>
        </div>
      </PageHero>

      <section className="py-24 sm:py-28">
        <div className="container grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <span className="eyebrow">The experience</span>
            <p className="mt-6 font-display text-2xl leading-relaxed text-emerald-900 sm:text-3xl">{service.longDescription}</p>
          </Reveal>

          <Reveal delay={0.15} className="self-start lg:sticky lg:top-28">
            <div className="rounded-4xl bg-emerald-900 p-8 text-ivory">
              <service.icon className="h-10 w-10 text-gold-300" />
              <h2 className="mt-5 text-3xl font-semibold">Want this setup for your event?</h2>
              <ul className="mt-6 space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ivory/80">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-gold-300" /> {item}
                  </li>
                ))}
              </ul>
              <a href={quoteLink} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8 w-full">
                Get instant quote on WhatsApp
              </a>
              <Link to="/contact" className="mt-3 flex items-center justify-center gap-1 text-sm text-ivory/70 hover:text-gold-300">
                or send a detailed enquiry <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="photos" className="scroll-mt-28 bg-ivory-100 py-24 sm:py-28">
        <div className="container">
          <SectionHeading align="left" eyebrow="Portfolio" title="Real setups, *real celebrations*" className="mb-12" />
          <PhotoGallery
            images={images}
            loading={loading}
            uploading={uploading}
            isAdmin={isAdmin}
            onUpload={upload}
            onRemove={remove}
            onLogout={logout}
            altPrefix={`${service.title} setup – Rajasthan Tent House`}
            requestLabel={`this ${service.title} setup`}
            inputId="service-upload"
            fallback={[service.image, ...showcaseImages.filter((src) => src !== service.image)]}
          />
        </div>
      </section>

      {/* Prev / next service */}
      <nav className="container grid gap-4 py-16 sm:grid-cols-2" aria-label="More services">
        {[
          { s: prev, label: 'Previous', Icon: ArrowLeft },
          { s: next, label: 'Next', Icon: ArrowRight },
        ].map(({ s, label, Icon }) => (
          <Link key={label} to={`/services/${s.id}`} className="group relative flex h-40 items-end overflow-hidden rounded-3xl p-6 text-ivory">
            <img src={s.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform [transition-duration:1.2s] group-hover:scale-110" />
            <span className="absolute inset-0 bg-emerald-950/60 transition group-hover:bg-emerald-950/50" />
            <span className="relative">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                <Icon className="h-4 w-4" /> {label} service
              </span>
              <span className="mt-1 block font-display text-2xl font-semibold sm:text-3xl">{s.title}</span>
            </span>
          </Link>
        ))}
      </nav>

      <CtaBand message={`Hi, I want to plan a ${service.title} event.`} />
    </div>
  );
};

export default ServiceDetailPage;
