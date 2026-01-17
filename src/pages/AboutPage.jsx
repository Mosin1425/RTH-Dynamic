import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Flag } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
       <div className="bg-[#5a9b7f] py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto px-4">Dedication, Creativity, and Excellence</p>
      </div>

      <div className="container mx-auto px-4 py-20">
         <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
            >
               <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
               <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Rajasthan Tent House is a premier event management company based in Bhilwara, Rajasthan. With a deep understanding of Indian traditions and modern event trends, we bring a unique blend of culture and contemporary style to every event.
               </p>
               <p className="text-gray-600 text-lg leading-relaxed">
                  Our team consists of creative designers, logistical experts, and hospitality professionals who work in unison to deliver flawless execution. Whether it's a grand wedding of 2,000 guests or an intimate ring ceremony, we treat every event with the same level of passion and attention to detail.
               </p>
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className="relative"
            >
               <img src="/assets/001.jpg" loading="lazy" alt="Team at work" className="rounded-2xl shadow-xl w-full" />
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 hidden md:block">
                  <p className="text-4xl font-bold text-[#5a9b7f]">24+</p>
                  <p className="text-gray-600">Years of Experience</p>
               </div>
            </motion.div>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
               <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-red-600" />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
               <p className="text-gray-600 leading-relaxed">
                  To deliver exceptional event management services that exceed our clients' expectations by combining creativity, professionalism, and meticulous attention to detail.
               </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
               <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-blue-600" />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
               <p className="text-gray-600 leading-relaxed">
                  To be recognized as the leading event management company in Rajasthan, setting new standards in the industry through innovation, quality service, and customer satisfaction.
               </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
               <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <Flag className="w-7 h-7 text-yellow-600" />
               </div>
               <h3 className="text-xl font-bold text-gray-800 mb-4">Our Values</h3>
               <p className="text-gray-600 leading-relaxed">
                  We believe in Integrity, Innovation, Customer-Centricity, and Teamwork. These core values guide every decision we make and every event we plan.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AboutPage;