import React from "react";
import { Award, Clock, HeartHandshake, ShieldCheck, ThumbsUp, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import SEOFAQ from "@/components/SEOFAQ";
import CtaBand from "@/components/CtaBand";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import Testimonials from "@/components/home/Testimonials";
import { SITE_URL } from "@/constants/data";

const features = [
  { icon: Award, title: "Expert Planning", description: "Decades of experience. We anticipate challenges before they arise and handle every detail with precision." },
  { icon: Users, title: "Dedicated Team", description: "A personal team available throughout the journey, adapting to your needs at every stage." },
  { icon: Clock, title: "Timely Execution", description: "Our logistics ensure setup is completed well in advance so you enjoy complete peace of mind." },
  { icon: ThumbsUp, title: "Premium Quality", description: "We own our inventory, guaranteeing pristine equipment with zero third-party dependency." },
  { icon: ShieldCheck, title: "Transparent Pricing", description: "No hidden costs. Clear quotations and honest commitments every time." },
  { icon: HeartHandshake, title: "Client Satisfaction", description: "We go the extra mile to make your event unforgettable and stress-free." },
];

const WhyChooseUsPage = () => {
  return (
    <div className="overflow-x-clip">
      <SEO
        title="Why Choose Us – Best Event Planner in Bhilwara"
        description="Discover why families across Bhilwara and Rajasthan trust Rajasthan Tent House for weddings and events. Expert planning, premium quality, transparent pricing, and flawless execution."
        url={`${SITE_URL}/why-choose-us`}
      />

      <PageHero
        eyebrow="Why choose us"
        title="The difference you can *see*"
        subtitle="The quality you can trust. With decades of experience, we deliver a seamless, stress-free event journey."
        image="/assets/002-vmake.jpg"
        crumbs={[{ label: "Why Choose Us" }]}
      />

      <section className="py-24 sm:py-32">
        <div className="container">
          <SectionHeading
            eyebrow="Our promise"
            title="Setting the standard in *event management*"
            description="Families across Rajasthan trust us with their most precious moments, and here’s why."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-4xl border border-emerald-900/10 bg-emerald-900/10 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.08} className="bg-ivory">
                <SpotlightCard className="h-full p-8 sm:p-10" color="rgba(201,154,53,0.14)">
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-900 text-gold-300 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                      <f.icon className="h-6 w-6" />
                    </span>
                    <span className="font-display text-4xl font-semibold text-emerald-900/10">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-8 text-3xl font-semibold text-emerald-900">{f.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{f.description}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline />
      <Testimonials />
      <SEOFAQ />
      <CtaBand title="Ready to plan your *dream event?*" text="Let our experts handle the stress while you enjoy the celebration." />
    </div>
  );
};

export default WhyChooseUsPage;
