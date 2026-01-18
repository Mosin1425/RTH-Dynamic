import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import SEO from '@/components/SEO';

const OurStoryPage = () => {
  return (
    <div className="min-h-screen bg-white">

      <SEO
        title="Our Story – Rajasthan Tent House | Event Management in Bhilwara"
        description="Discover the journey of Rajasthan Tent House, a trusted tent house and event management company in Bhilwara since 1989, crafting royal weddings and grand celebrations across Rajasthan."
        url="https://rajasthantenthouse.com/our-story"
      />

      <HeroSection
        title="Our Story"
        subtitle="From Humble Beginnings to Royal Celebrations"
        image="/assets/007-vmake.jpg"
      />

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#5a9b7f] text-center">
              A Trusted Event Management Company in Bhilwara
            </h2>

            <div className="space-y-6 text-gray-600 text-lg leading-loose">
              <p>
                Rajasthan Tent House began in 1989 with a simple yet ambitious vision:
                to redefine event management in Bhilwara. What started as a modest
                tent rental service evolved into one of Rajasthan’s most trusted
                wedding and event management companies.
              </p>

              <p>
                Our founder understood that clients wanted more than chairs and tents —
                they wanted atmosphere, elegance, and emotion. This belief led us to
                specialize in wedding decoration, stage décor, lighting, and complete
                event planning across Rajasthan.
              </p>

              <p>
                Over the decades, we have executed thousands of weddings, haldi ceremonies,
                ring ceremonies, birthdays, and corporate events. Each event sharpened our
                ability to deliver flawless setups under every condition.
              </p>

              <div className="my-12 p-8 bg-[#5a9b7f]/10 rounded-2xl border-l-8 border-[#5a9b7f]">
                <p className="text-xl font-medium text-gray-800 italic">
                  “We don’t just plan events — we craft experiences that become lifelong memories.
                  Every smile is our reward.”
                </p>
              </div>

              <p>
                Today, Rajasthan Tent House is known across Bhilwara and Rajasthan for
                premium wedding decoration, royal mandap setups, DJ nights, and complete
                event management. Our values remain unchanged: integrity, quality,
                and a client-first mindset.
              </p>

              <p>
                As we move forward, we continue blending modern trends with Rajasthan’s
                timeless hospitality — ensuring every celebration feels extraordinary.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {["001.jpg","003-vmake.jpg","005-vmake.jpg","006-vmake.jpg"].map((img, i) => (
              <img
                key={i}
                src={`/assets/${img}`}
                loading="lazy"
                className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                alt={`Rajasthan Tent House Event Setup ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStoryPage;
