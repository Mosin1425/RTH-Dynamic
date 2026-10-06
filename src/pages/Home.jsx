import React from "react";
import { useReducedMotion } from "framer-motion";
import SEO from "@/components/SEO";
import SEOFAQ from "@/components/SEOFAQ";
import CtaBand from "@/components/CtaBand";
import HomeHero from "@/components/home/HomeHero";
import CinematicHero from "@/components/home/CinematicHero";
import ServicesTicker from "@/components/home/ServicesTicker";
import LegacySection from "@/components/home/LegacySection";
import ServicesBento from "@/components/home/ServicesBento";
import SignatureScroll from "@/components/home/SignatureScroll";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import Testimonials from "@/components/home/Testimonials";
import VideoShowcase from "@/components/home/VideoShowcase";
import PhotoRibbon from "@/components/home/PhotoRibbon";
import BuiltByMosinSection from "@/components/home/BuiltByMosinSection";
import { SITE_URL } from "@/constants/data";

const Home = () => {
  // The scroll-scrubbed intro is all motion; reduced-motion visitors get the simpler slideshow hero.
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full overflow-x-clip">
      <SEO
        title="Tent House & Event Management in Bhilwara"
        description="Rajasthan Tent House is a premium event management company in Bhilwara. We specialize in weddings, decorations, DJ, and complete event setups across Rajasthan."
        url={`${SITE_URL}/`}
      />

      {reduceMotion ? <HomeHero /> : <CinematicHero />}
      <ServicesTicker />
      <LegacySection />
      <ServicesBento />
      <SignatureScroll />
      <ProcessTimeline />
      <Testimonials />
      <VideoShowcase />
      <PhotoRibbon />
      <SEOFAQ />
      <CtaBand />
      <BuiltByMosinSection />
    </div>
  );
};

export default Home;
