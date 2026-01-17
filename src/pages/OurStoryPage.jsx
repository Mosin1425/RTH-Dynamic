import React from 'react';
import { motion } from 'framer-motion';

const OurStoryPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh] bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('public/assets/007-vmake.jpg')" }}>
         <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-center px-4">Our Story</h1>
         </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-4xl font-bold text-[#5a9b7f] mb-8 text-center">From Humble Beginnings to Royal Celebrations</h2>
            
            <div className="space-y-6 text-gray-600 text-lg leading-loose">
               <p>
                  <span className="text-6xl float-left mr-4 mt-[-10px] font-serif text-yellow-500">R</span>
                  ajasthan Tent House began in 1999 with a simple yet ambitious vision: to transform the landscape of event management in Bhilwara. What started as a modest tent rental service with a handful of employees has, over the last two decades, blossomed into one of Rajasthan's premier event management companies.
               </p>
               <p>
                  Our founder recognized early on that clients didn't just want tables and chairs; they wanted an atmosphere. They wanted to walk into a venue and feel transported. This realization shifted our focus from mere logistics to holistic event design. We began investing in high-quality fabrics, intricate lighting systems, and training our staff in hospitality and design.
               </p>
               <p>
                  Over the years, we have had the privilege of being part of countless love stories, family reunions, and corporate milestones. Each event has been a teacher. From navigating unexpected weather challenges to executing complex theme requests on tight deadlines, our journey has been one of continuous learning and growth.
               </p>
               <div className="my-12 p-8 bg-[#5a9b7f]/10 rounded-2xl border-l-8 border-[#5a9b7f]">
                  <p className="text-xl font-medium text-gray-800 italic">
                     "We don't just plan events – we craft experiences that become cherished memories for a lifetime. Every smile on a guest's face is a badge of honor for us."
                  </p>
               </div>
               <p>
                  Today, Rajasthan Tent House stands as a symbol of trust and elegance. We have expanded our services beyond simple decor to include end-to-end wedding planning, corporate event management, and theme parties. Despite our growth, our core values remain unchanged: integrity, quality, and a client-first approach.
               </p>
               <p>
                  As we look to the future, we are excited to embrace new trends and technologies in event management, while staying rooted in the traditional hospitality that Rajasthan is famous for. We look forward to being a part of your story.
               </p>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
             <img src="/assets/001.jpg" loading="lazy" className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300" alt="History 1" />
             <img src="/assets/003-vmake.jpg" loading="lazy" className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300" alt="History 2" />
             <img src="/assets/005-vmake.jpg" loading="lazy" className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300" alt="History 3" />
             <img src="/assets/006-vmake.jpg" loading="lazy" className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300" alt="History 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;