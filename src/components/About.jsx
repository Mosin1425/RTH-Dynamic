import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              About Us
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            At Rajasthan Tent House, we believe every celebration deserves to be extraordinary. Our commitment to excellence drives everything we do.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 p-10 rounded-2xl shadow-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              To deliver exceptional event management services that exceed our clients' expectations by combining creativity, professionalism, and meticulous attention to detail. We strive to make every celebration a cherished memory by providing comprehensive solutions tailored to each client's unique vision and requirements.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-rose-50 to-pink-50 p-10 rounded-2xl shadow-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              To be recognized as the leading event management company, setting new standards in the industry through innovation, quality service, and customer satisfaction. We envision creating a lasting impact on every celebration we touch, building long-term relationships with our clients based on trust, excellence, and memorable experiences.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;