import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Award, Calendar, CheckCircle } from "lucide-react";

/* ===========================
   Animated Counter Component
=========================== */
const Counter = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [target]);

  return <span>{count}+</span>;
};

/* ===========================
   Stats Data
=========================== */
const stats = [
  { number: 15, text: "Professional Team Members", icon: Users },
  { number: 1000, text: "Happy Customers Served", icon: Award },
  { number: 30, text: "Years of Experience", icon: Calendar },
  { number: 500, text: "Successful Events", icon: CheckCircle },
];

/* ===========================
   Process Steps
=========================== */
const processSteps = [
  "Consultation",
  "Design & Planning",
  "Execution",
  "Celebrate",
];

/* ===========================
   Testimonials
=========================== */
const testimonials = [
  {
    name: "Rahul Sharma",
    text: "Rajasthan Tent House made our wedding unforgettable. Everything was perfectly executed.",
  },
  {
    name: "Priya Mehta",
    text: "Professional team, beautiful decoration, and flawless management.",
  },
  {
    name: "Ankit Jain",
    text: "Highly recommended for premium event setups in Rajasthan.",
  },
];

const PremiumExperienceSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ================= PROCESS ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-16">
            Our Event Execution Process
          </h2>

          <div className="relative grid md:grid-cols-4 gap-12">
            
            {/* Glowing Line */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#5a9b7f] to-transparent blur-sm" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-gray-50 p-8 rounded-2xl shadow hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="text-[#5a9b7f] text-4xl font-bold mb-4">
                  0{index + 1}
                </div>
                <h3 className="font-bold text-lg">{step}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <item.icon className="w-8 h-8 mx-auto text-[#5a9b7f] mb-4" />
                <h3 className="text-3xl font-bold text-[#5a9b7f] mb-2">
                  <Counter target={item.number} />
                </h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL CAROUSEL ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            What Our Clients Say
          </h2>

          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 p-10 rounded-3xl shadow-xl"
          >
            <p className="text-gray-700 text-lg mb-6">
              “{testimonials[current].text}”
            </p>
            <h4 className="font-semibold text-[#5a9b7f]">
              {testimonials[current].name}
            </h4>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PremiumExperienceSection;
