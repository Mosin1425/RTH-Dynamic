import React from "react";
import { Link } from "react-router-dom";
import { servicesData } from "@/constants/data";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";
import SEOFAQ from "@/components/SEOFAQ";
import PremiumShowcaseSection from "@/components/PremiumShowcaseSection";

const heroImages = [
  "/assets/001.jpg",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
  "/assets/005-vmake.jpg",
  "/assets/007-vmake.jpg",
];

const ownerPhotos = [
  "/assets/owner1.jpg",
  "/assets/owner2.jpg",
  "/assets/owner3.jpg"
];

const stripImages = [
  "/assets/todo1.png",
  "/assets/todo2.jpg",
  "/assets/todo3.jpg",
  "/assets/todo4.jpg",
  "/assets/todo5.jpg",
  "/assets/todo6.jpg",
  "/assets/todo7.jpg",
  "/assets/todo8.jpg",
];

const Home = () => {
  return (
    <div className="w-full overflow-x-hidden bg-white">
      <SEO
        title="Tent House & Event Management in Bhilwara"
        description="Rajasthan Tent House is a premium event management company in Bhilwara. We specialize in weddings, decorations, DJ, and complete event setups across Rajasthan."
        url="https://rajasthantenthouse.com/"
      />

      {/* HERO */}
      <HeroSection
        title={
          <>
            Crafting <span className="text-yellow-300">Grand Events</span> & Timeless Memories
          </>
        }
        subtitle="Rajasthan Tent House brings tradition, elegance, and flawless execution to your most important moments."
        images={heroImages}
        showLearnMore
      />
      {/* <PremiumShowcaseSection /> */}
      {/* OWNER / LEGACY */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            A Legacy of Excellence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            For over two decades, families across Rajasthan have trusted us with
            their most precious celebrations.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {ownerPhotos.map((src, i) => (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 flex justify-center">
                <img
                  src={src}
                  className="w-full max-w-xs h-64 sm:h-72 object-cover rounded-2xl shadow-xl"
                  alt={`Rajasthan Tent House Owner ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <PremiumShowcaseSection />
      {/* SERVICES */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Our Premium Services
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            From intimate gatherings to grand weddings, we manage every detail
            with perfection.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.slice(0, 6).map((service) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <div className="bg-white rounded-2xl shadow-md border p-7 hover:shadow-xl transition-all h-full">
                  <service.icon className="w-10 h-10 text-[#5a9b7f] mb-4" />
                  <h3 className="font-bold text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS IN ACTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Events in Action
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Watch how we transform ordinary spaces into extraordinary
            experiences.
          </p>

          <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/-Q70hPY9rfY"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 8 PHOTO GRID */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stripImages.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full h-36 sm:h-48 object-cover rounded-lg shadow"
              alt="Showcase"
            />
          ))}
        </div>
      </section>

      {/* BUILT BY MOSIN – LEAD SECTION */}
      <section className="py-20 bg-gradient-to-r from-[#5a9b7f] to-[#4a826a] text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Want a Website Like This for Your Business?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            I design and build premium business websites like this that convert
            visitors into customers.
          </p>

          <a
            href="https://wa.me/919636798937?text=I%20want%20a%20website%20like%20Rajasthan%20Tent%20House"
            target="_blank"
            className="inline-block bg-white text-[#5a9b7f] font-semibold px-10 py-4 rounded-full text-lg shadow-xl hover:scale-105 transition"
          >
            Chat with Mosin on WhatsApp
          </a>

          <p className="mt-4 text-xs text-white/70">
            Designed & developed by Mosin
          </p>
        </div>
      </section>

      <SEOFAQ />
    </div>
  );
};

export default Home;
