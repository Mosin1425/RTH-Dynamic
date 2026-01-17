// "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { servicesData } from '@/constants/data';

const heroImages = [
  "/assets/001.jpg",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
  "/assets/005-vmake.jpg",
  "/assets/007-vmake.jpg"
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[78vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img
              src={heroImages[currentImage]}
              alt="Event"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 relative z-20 pt-8 sm:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-5 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs sm:text-sm">
              <Star className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" />
              Premier Event Management
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              We Create <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
                Timeless
              </span>{" "}
              Memories
            </h1>

            <p className="text-sm sm:text-lg text-white/90 leading-relaxed">
              Rajasthan Tent House transforms your dreams into reality — from royal weddings to intimate gatherings.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-5 text-base sm:text-lg rounded-full">
                  Book Your Event
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white px-6 py-5 text-base sm:text-lg rounded-full"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentImage ? 'bg-yellow-400 w-6' : 'bg-white/50 w-2'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-14 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3">
              Our Premium Services
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[#5a9b7f] mx-auto mb-3" />
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of services designed to make every occasion spectacular.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {servicesData.slice(0, 6).map((service) => (
              <Link key={service.id} to={`/services/${service.id}`} className="group block">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border p-5 sm:p-6 h-full">
                  <service.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#5a9b7f] mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-[#5a9b7f]">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-3">
                    {service.description}
                  </p>
                  <div className="flex items-center text-[#5a9b7f] font-semibold text-sm sm:text-base">
                    View Details <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/services/wedding-events">
              <Button className="bg-[#5a9b7f] hover:bg-[#4a826a] text-white px-7 py-4 sm:px-8 sm:py-5 text-base sm:text-lg rounded-full">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
