import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, ThumbsUp, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const WhyChooseUsPage = () => {
  const features = [
    {
      icon: Award,
      title: 'Expert Planning',
      description: 'Our team of certified planners brings decades of collective experience to the table. We anticipate challenges before they arise and handle every detail with military precision.'
    },
    {
      icon: Users,
      title: 'Dedicated Team',
      description: 'We believe in a personal approach. You get a dedicated team that is available 24/7 to answer your queries and adapt to your changing needs throughout the planning process.'
    },
    {
      icon: Clock,
      title: 'Timely Execution',
      description: 'We value your time. Our logistics are optimized to ensure setup is completed well in advance, giving you peace of mind and time for final walkthroughs.'
    },
    {
      icon: ThumbsUp,
      title: 'Premium Quality',
      description: 'We own our inventory, which means we guarantee the quality of every chair, drape, and light. No third-party dependencies mean reliable and pristine equipment.'
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Pricing',
      description: 'No hidden costs. We provide detailed quotations and contracts so you know exactly what you are paying for. We work within your budget without compromising on quality.'
    },
    {
      icon: HeartHandshake,
      title: 'Client Satisfaction',
      description: 'Our reputation is built on happy clients. We go the extra mile to add those special touches that make your guests feel welcomed and your event memorable.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#5a9b7f] py-20 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto px-4">The Rajasthan Tent House Difference</p>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Setting the Standard in Event Management</h2>
          <p className="text-gray-600 text-lg">
            With over two decades of experience, we have refined our craft to offer you a seamless and stress-free event experience. Here is why hundreds of families trust us with their most precious moments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#5a9b7f]"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-[#5a9b7f]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-yellow-50 rounded-2xl p-12 text-center shadow-inner">
           <h3 className="text-3xl font-bold text-gray-800 mb-6">Ready to plan your dream event?</h3>
           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Let our experts handle the stress while you enjoy the celebration. Contact us today for a free consultation.</p>
           <Link to="/contact">
              <Button className="bg-[#5a9b7f] hover:bg-[#4a826a] text-white px-8 py-6 text-lg rounded-full shadow-lg">
                 Get in Touch
              </Button>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsPage;