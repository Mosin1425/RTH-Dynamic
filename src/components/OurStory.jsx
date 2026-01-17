import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const OurStory = () => {
  return (
    <section id="our-story" className="py-20 bg-gradient-to-br from-orange-50 via-white to-rose-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img class="rounded-2xl shadow-2xl w-full h-[500px] object-cover" alt="Our journey in event management" src="https://images.unsplash.com/photo-1649190800807-6f1d42a4bc05" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-100 px-4 py-2 rounded-full">
              <Heart className="w-5 h-5 text-rose-600" />
              <span className="text-rose-800 font-semibold">Our Story</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                A Journey of Excellence
              </span>
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Rajasthan Tent House began with a simple vision: to transform ordinary events into extraordinary experiences. What started as a small tent rental service has blossomed into a comprehensive event management company.
              </p>
              
              <p className="text-lg">
                Over the years, we've had the privilege of being part of countless celebrations – from intimate family gatherings to grand wedding receptions. Each event has taught us something new, helping us refine our craft and deepen our understanding of what makes celebrations truly special.
              </p>
              
              <p className="text-lg">
                Today, we stand proud as one of the most trusted names in event management, known for our attention to detail, creative designs, and unwavering commitment to excellence. Our team brings passion, expertise, and a personal touch to every project we undertake.
              </p>
              
              <p className="text-lg font-semibold text-orange-600">
                We don't just plan events – we create memories that last a lifetime.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;