import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    toast({
      title: "Request Sent Successfully!",
      description: "Thank you for contacting us. Our team will get back to you shortly.",
      className: "bg-[#5a9b7f] text-white border-none",
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      date: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Hero Banner with Image */}
       <div className="relative h-[50vh] min-h-[400px]">
          <div className="absolute inset-0">
             <img 
                src="https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80" 
                alt="Contact Us" 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
             <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Contact Us</h1>
             <p className="text-xl md:text-2xl opacity-90 max-w-2xl">Let's Plan Your Perfect Event</p>
          </div>
       </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-yellow-500 h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
              <p className="text-gray-600 mb-8">
                Have questions or ready to book? Reach out to us via phone, email, or visit our office. We are happy to discuss your requirements.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 text-[#5a9b7f]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600 hover:text-[#5a9b7f] transition-colors"><a href="tel:+919876543210">+91 98765 43210</a></p>
                    <p className="text-gray-600 hover:text-[#5a9b7f] transition-colors"><a href="tel:+918765432109">+91 87654 32109</a></p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 text-[#5a9b7f]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600 hover:text-[#5a9b7f] transition-colors"><a href="mailto:info@rajasthantenthouse.com">info@rajasthantenthouse.com</a></p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 text-[#5a9b7f]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Office Location</h4>
                    <p className="text-gray-600">Main Market, Bhilwara<br />Rajasthan, India - 311001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 text-[#5a9b7f]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Working Hours</h4>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#5a9b7f] space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Message</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5a9b7f] focus:border-transparent transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5a9b7f] focus:border-transparent transition-all outline-none"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5a9b7f] focus:border-transparent transition-all outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                   <label htmlFor="eventType" className="block text-sm font-semibold text-gray-700 mb-2">Event Type</label>
                   <select
                     id="eventType"
                     name="eventType"
                     value={formData.eventType}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5a9b7f] focus:border-transparent transition-all outline-none"
                   >
                     <option value="">Select Event</option>
                     <option value="wedding">Wedding</option>
                     <option value="reception">Reception</option>
                     <option value="birthday">Birthday</option>
                     <option value="corporate">Corporate</option>
                     <option value="other">Other</option>
                   </select>
                </div>
                <div>
                   <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                   <input
                     type="date"
                     id="date"
                     name="date"
                     value={formData.date}
                     onChange={handleChange}
                     className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5a9b7f] focus:border-transparent transition-all outline-none"
                   />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5a9b7f] focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#5a9b7f] hover:bg-[#4a826a] text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Inquiry
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;