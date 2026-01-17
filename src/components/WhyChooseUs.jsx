import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, ThumbsUp } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Expert Planning',
      description: 'Professianal event planners with years of experience in creating memorable celebrations'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'A passionate team committed to bringing your vision to life with precision and care'
    },
    {
      icon: Clock,
      title: 'Timely Execution',
      description: 'Punctual setup and seamless coordination ensuring your event runs smoothly'
    },
    {
      icon: ThumbsUp,
      title: 'Quality Assurance',
      description: 'Premium quality decorations, furniture, and equipment for flawless events'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
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
              Why Choose Us
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover what makes Rajasthan Tent House the preferred choice for exceptional event management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-orange-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;