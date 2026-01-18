import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Users,
  Clock,
  ThumbsUp,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import SEO from "@/components/SEO";
import SEOFAQ from "@/components/SEOFAQ";

const ownerPhotos = [
  "/assets/owner1.jpg",
  "/assets/owner2.jpg",
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

const features = [
  {
    icon: Award,
    title: "Expert Planning",
    description:
      "Our team brings decades of experience. We anticipate challenges before they arise and handle every detail with precision.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description:
      "You get a personal team available throughout the journey, adapting to your needs at every stage.",
  },
  {
    icon: Clock,
    title: "Timely Execution",
    description:
      "Our logistics ensure setup is completed well in advance so you enjoy complete peace of mind.",
  },
  {
    icon: ThumbsUp,
    title: "Premium Quality",
    description:
      "We own our inventory, guaranteeing pristine equipment with zero third-party dependency.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    description:
      "No hidden costs. Clear quotations and honest commitments every time.",
  },
  {
    icon: HeartHandshake,
    title: "Client Satisfaction",
    description:
      "We go the extra mile to make your event unforgettable and stress-free.",
  },
];

const WhyChooseUsPage = () => {
  return (
    <div className="min-h-screen bg-white">

      <SEO
        title="Why Choose Us – Best Event Planner in Bhilwara"
        description="Discover why families across Bhilwara and Rajasthan trust Rajasthan Tent House for weddings and events. Expert planning, premium quality, transparent pricing, and flawless execution."
        url="https://rajasthantenthouse.com/why-choose-us"
      />

      {/* HERO */}
      <HeroSection
        title="Why Choose Rajasthan Tent House"
        subtitle="The Difference You Can See. The Quality You Can Trust."
        image="/assets/001.jpg"
      />

      <div className="container mx-auto px-4 py-20">

        {/* INTRO */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Setting the Standard in Event Management
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            With over two decades of experience, we deliver a seamless,
            stress-free event journey. Families across Rajasthan trust us with
            their most precious moments — and here’s why.
          </p>
        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-[#5a9b7f]"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-[#5a9b7f]" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* OWNER SECTION */}
        <section className="py-20 bg-gray-50 rounded-3xl mb-28">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold">
              A Legacy You Can Trust
            </h3>
            <p className="text-gray-600 mt-2">
              Built on generations of relationships and reliability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto px-4">
            {ownerPhotos.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-72 object-cover rounded-2xl shadow-xl"
                alt={`Rajasthan Tent House Owner ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mb-28 bg-yellow-50 rounded-3xl p-12 text-center shadow-inner">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to plan your dream event?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our experts handle the stress while you enjoy the celebration.
          </p>
          <Link to="/contact">
            <Button className="bg-[#5a9b7f] hover:bg-[#4a826a] text-white px-10 py-6 text-lg rounded-full">
              Get in Touch
            </Button>
          </Link>
        </div>
        <SEOFAQ />
        {/* 8 PHOTO GRID */}
        <section className="py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stripImages.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-36 sm:h-48 object-cover rounded-lg shadow"
                alt={`Rajasthan Tent House Event Setup ${i + 1}`}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default WhyChooseUsPage;
