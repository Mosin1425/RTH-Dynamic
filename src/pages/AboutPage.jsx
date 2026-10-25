import React from "react";
import { Eye, Flag, Target } from "lucide-react";
import PageHero from "@/components/PageHero";
import SEO from "@/components/SEO";
import SEOFAQ from "@/components/SEOFAQ";
import CtaBand from "@/components/CtaBand";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import SpotlightCard from "@/components/motion/SpotlightCard";
import PhotoRibbon from "@/components/home/PhotoRibbon";
import { SITE_URL, ownerPhotos, stats } from "@/constants/data";

const pillars = [
  { icon: Target, title: "Our Mission", text: "To deliver exceptional event experiences with flawless execution." },
  { icon: Eye, title: "Our Vision", text: "To become Rajasthan’s most trusted event brand." },
  { icon: Flag, title: "Our Values", text: "Integrity, innovation, a customer-first mindset, and teamwork." },
];

const AboutPage = () => {
  return (
    <div className="overflow-x-clip">
      <SEO
        title="About Us – Event Management in Bhilwara"
        description="Learn about Rajasthan Tent House – a trusted event management company in Bhilwara with decades of experience in weddings and grand events across Rajasthan."
        url={`${SITE_URL}/about`}
      />

      <PageHero
        eyebrow="About us"
        title="Dedication, creativity & *excellence*"
        subtitle="A premier event management company based in Bhilwara, Rajasthan."
        image="/assets/003-vmake.jpg"
        crumbs={[{ label: "About" }]}
      />

      {/* WHO WE ARE */}
      <section className="py-24 sm:py-32">
        <div className="container grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who we are"
              title="Every event, treated like *our own*"
              description="Rajasthan Tent House specializes in wedding decoration, tent house services, DJ setups, and complete event planning. Whether it’s a grand wedding or an intimate ceremony, we treat every event with the same passion and precision."
            />
          </div>
          <Reveal x={40} y={0} className="relative">
            <img src="/assets/001.jpg" alt="Rajasthan Tent House wedding stage" className="aspect-[4/3] w-full rounded-4xl object-cover shadow-2xl" loading="lazy" />
            <div className="absolute -bottom-8 left-6 rounded-3xl bg-emerald-900 px-7 py-5 text-ivory shadow-2xl sm:-left-8">
              <p className="font-display text-5xl font-semibold text-gold-300">
                <CountUp value={30} suffix="+" />
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/70">Years of experience</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="grain relative bg-emerald-950 py-24 sm:py-32">
        <div className="pattern-jaali absolute inset-0 opacity-40" />
        <div className="container relative">
          <SectionHeading dark eyebrow="What drives us" title="Built on *purpose*" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-400 text-emerald-950">
                    <p.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-3xl font-semibold text-ivory">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-ivory/65">{p.text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-5xl font-semibold text-gold-300 sm:text-6xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.15em] text-ivory/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <SectionHeading eyebrow="The family" title="A legacy of *excellence*" description="Built on trust, carried forward with pride." />
          <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-3">
            {ownerPhotos.map((src, i) => (
              <Reveal key={src} delay={i * 0.1} className={i === 1 ? "sm:translate-y-10" : ""}>
                <div className="group overflow-hidden rounded-4xl">
                  <img src={src} alt={`Rajasthan Tent House family member ${i + 1}`} loading="lazy" className="aspect-[3/4] w-full object-cover object-top transition-transform [transition-duration:1.2s] group-hover:scale-105" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PhotoRibbon />
      <SEOFAQ />
      <CtaBand />
    </div>
  );
};

export default AboutPage;
