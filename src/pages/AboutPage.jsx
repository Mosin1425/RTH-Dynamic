import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Flag } from "lucide-react";
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

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">

      <SEO
        title="About Us – Rajasthan Tent House | Event Management in Bhilwara"
        description="Learn about Rajasthan Tent House – a trusted event management company in Bhilwara with over 24 years of experience in weddings and grand events across Rajasthan."
        url="https://rajasthantenthouse.com/about"
      />

      <HeroSection
        title="About Rajasthan Tent House"
        subtitle="Dedication, Creativity & Excellence"
        image="/assets/001.jpg"
      />

      <div className="container mx-auto px-4 py-20">

        {/* WHO WE ARE */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Rajasthan Tent House is a premier event management company based in
              Bhilwara, Rajasthan. We specialize in wedding decoration, tent house
              services, DJ setups, and complete event planning.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Whether it’s a grand wedding or an intimate ceremony, we treat
              every event with the same passion and precision.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="/assets/001.jpg"
              alt="Rajasthan Tent House Team"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 hidden md:block">
              <p className="text-4xl font-bold text-[#5a9b7f]">24+</p>
              <p className="text-gray-600">Years of Experience</p>
            </div>
          </motion.div>
        </div>

        {/* MISSION / VISION / VALUES */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To deliver exceptional event experiences with flawless execution.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To become Rajasthan’s most trusted event brand.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-md">
            <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <Flag className="w-7 h-7 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Values</h3>
            <p className="text-gray-600">
              Integrity, innovation, customer-first mindset, and teamwork.
            </p>
          </div>
        </div>

        {/* OWNER */}
        <section className="py-20 bg-gray-50 rounded-3xl mb-24">
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold">
              A Legacy of Excellence
            </h3>
            <p className="text-gray-600 mt-2">
              Built on trust, carried forward with pride.
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

        {/* FAQ SEO BLOCK */}
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

export default AboutPage;
