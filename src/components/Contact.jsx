import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = "916350089531";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = `
Hi, I visited your website and want to enquire.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Event Type: ${formData.eventType}

Message:
${formData.message}
    `.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <>
      {/* Hero */}
      <div
        className="relative h-[240px] sm:h-[320px] flex items-center text-white"
        style={{
          backgroundImage: "url('/assets/contact-hero.jpg')", // TODO: replace
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold">Contact Us</h1>
        </div>
      </div>

      <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-rose-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-orange-600" />
                    <p className="text-gray-600">+91 96367 98937</p>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-orange-600" />
                    <p className="text-gray-600">events@rajasthantenthouse.com</p>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-orange-600" />
                    <p className="text-gray-600">Rajasthan, India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                <input name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-3 border rounded-lg" />
                <input name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="w-full px-4 py-3 border rounded-lg" />
                <input name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone" className="w-full px-4 py-3 border rounded-lg" />

                <select name="eventType" value={formData.eventType} onChange={handleChange} required className="w-full px-4 py-3 border rounded-lg">
                  <option value="">Select Event Type</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Haldi">Haldi</option>
                  <option value="Ring">Ring</option>
                  <option value="Birthday">Birthday</option>
                  <option value="DJ">DJ</option>
                </select>

                <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full px-4 py-3 border rounded-lg" placeholder="Your message" />

                <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-rose-600 text-white py-6 text-lg">
                  <Send className="w-5 h-5 mr-2" />
                  Send on WhatsApp
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Map */}
          <div className="mt-16 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Find Us</h3>
            <div className="rounded-2xl overflow-hidden shadow-lg h-[450px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3594.097881580614!2d74.32700537519422!3d25.734276477369114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396905ec2a341c23%3A0xbcab8e1abc823035!2sRajasthan%20Tent%20House!5e0!3m2!1sen!2sin!4v1768665805550!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;