import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Music, UtensilsCrossed, Gift, DoorOpen, Flower2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Wedding Events & Receptions',
      description: 'Transform your special day into a fairy tale with our comprehensive wedding planning services. From elegant mandap designs to grand reception setups, we handle every detail with precision and care.'
    },
    {
      icon: DoorOpen,
      title: 'Grand Entryways & Elegant Counters',
      description: 'Make a stunning first impression with our beautifully designed entryways and sophisticated counter arrangements. We create welcoming spaces that set the tone for your entire event.'
    },
    {
      icon: Flower2,
      title: 'Haldi Ceremony',
      description: 'Celebrate this vibrant pre-wedding ritual with our traditional yet contemporary Haldi ceremony setups. Bright colors, floral decorations, and comfortable seating arrangements create the perfect atmosphere.'
    },
    {
      icon: Sparkles,
      title: 'Ring Ceremony',
      description: 'Mark this significant milestone with our elegant ring ceremony arrangements. We create intimate and romantic settings that make your engagement celebration truly special.'
    },
    {
      icon: Gift,
      title: 'Memorable Birthday Celebrations',
      description: 'From milestone birthdays to themed parties, we create magical celebrations that bring joy to all ages. Our creative themes and attention to detail ensure unforgettable memories.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Stylish Dining Arrangements',
      description: 'Elevate your dining experience with our sophisticated table settings, elegant furniture, and beautiful decor. We ensure your guests enjoy both the ambiance and the cuisine.'
    },
    {
      icon: Music,
      title: 'Lively DJ Night Parties',
      description: 'Light up the night with our high-energy DJ party setups. Professional sound systems, dynamic lighting, and vibrant decorations create the perfect party atmosphere.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-orange-50 via-white to-rose-50">
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
              Our Services
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Comprehensive event management solutions tailored to make your celebrations extraordinary
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;