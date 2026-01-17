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

// TODO – replace with real images
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

      {/* HERO */}
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
            <img src={heroImages[currentImage]} className="w-full h-full object-cover" />
          </motion.div>
        </AnimatePresence>

        <div className="container mx-auto px-4 relative z-20">
          <div className="text-white space-y-5 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs">
              <Star className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" />
              Premier Event Management
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              We Create <span className="text-yellow-300">Timeless</span> Memories
            </h1>

            <p className="text-white/90">
              Rajasthan Tent House transforms your dreams into reality.
            </p>

            <div className="flex gap-3">
              <Link to="/contact">
                <Button className="bg-yellow-500 text-white rounded-full">Book Your Event</Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="border-white text-white rounded-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OWNER SECTION */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">A Legacy of Excellence</h3>
          <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
            {ownerPhotos.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-64 object-cover rounded-2xl shadow-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Our Premium Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.slice(0, 6).map((service) => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <div className="bg-white rounded-2xl shadow border p-6 hover:shadow-xl">
                  <service.icon className="w-10 h-10 text-[#5a9b7f] mb-3" />
                  <h3 className="font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS IN ACTION */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">Events in Action</h3>
          <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/-Q70hPY9rfY"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 8 PHOTO GRID (NO SCROLL, MOBILE FRIENDLY) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stripImages.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full h-36 sm:h-48 object-cover rounded-lg shadow"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
