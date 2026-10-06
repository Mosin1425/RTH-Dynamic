import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle, Users, Award, Calendar, Star } from "lucide-react";
import LuxuryBackground from "@/components/LuxuryBackground";

// ---------------- STATS ----------------
const stats = [
  { number: "15+", text: "Professional Team Members", icon: Users },
  { number: "1000+", text: "Happy Customers Served", icon: Award },
  { number: "30+", text: "Years of Experience", icon: Calendar },
  { number: "500+", text: "Successful Events Executed", icon: CheckCircle },
];

// ---------------- PROCESS ----------------
const processSteps = [
  { title: "Consultation", description: "We understand your vision and expectations." },
  { title: "Design & Planning", description: "Creative décor layouts tailored for you." },
  { title: "Execution", description: "Flawless on-ground management and setup." },
  { title: "Celebrate", description: "Enjoy your day while we handle everything." },
];

// ---------------- TESTIMONIALS ----------------
const testimonials = [
  { name: "Rajesh Sharma", text: "Absolutely stunning decoration and flawless management." },
  { name: "Neha Jain", text: "Professional team and magical wedding setup." },
  { name: "Amit Singh", text: "Premium event experience from start to finish." },
];

// ---------------- COUNT UP ----------------
function CountUp({ value, duration = 1.5 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const match = String(value).match(/^([\d,\.]+)(.*)$/);
    if (!match) return;

    const num = Number(match[1].replace(/,/g, ""));
    const suffix = match[2] || "";
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const current = Math.floor(num * progress);
      setDisplay(current.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return <span ref={ref}>{display}</span>;
}

const PremiumShowcaseSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ================= PROCESS SECTION ================= */}
      <section className="py-24 bg-white relative overflow-hidden">
        <LuxuryBackground />

        <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Our Event Execution Process
          </h2>

          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#5a9b7f] to-yellow-400 rounded-full mb-16" />

          <div className="relative grid md:grid-cols-4 gap-10">
            {/* Glowing connector */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent blur-md" />

            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ rotateX: 6, rotateY: -6 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-yellow-500 text-4xl font-bold mb-4">
                  {`0${index + 1}`}
                </div>
                <h3 className="font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <item.icon className="w-8 h-8 mx-auto text-yellow-500 mb-4" />
                <h3 className="text-3xl font-bold text-[#5a9b7f] mb-2">
                  <CountUp value={item.number} />
                </h3>
                <p className="text-gray-600 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL CAROUSEL ================= */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">

          <h2 className="text-3xl font-bold mb-12">
            What Our Clients Say
          </h2>

          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 p-8 rounded-2xl shadow-lg"
              >
                <Star className="w-6 h-6 mx-auto text-yellow-400 mb-3" fill="currentColor" />
                <p className="text-gray-700 italic mb-4">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <h4 className="font-semibold text-[#5a9b7f]">
                  {testimonials[currentTestimonial].name}
                </h4>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ================= LEAD FUNNEL ================= */}
      <section className="py-24 bg-gradient-to-r from-[#5a9b7f] to-[#4a826a] text-white relative overflow-hidden">
        <LuxuryBackground />

        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Planning a Wedding or Event in Rajasthan?
          </motion.h2>

          <p className="text-white/90 text-lg mb-8">
            Let Rajasthan Tent House handle everything — décor, planning and flawless execution.
          </p>

          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/919636798937?text=I%20want%20to%20plan%20my%20event"
            target="_blank"
            className="inline-block bg-white text-[#5a9b7f] font-semibold px-10 py-4 rounded-full text-lg shadow-2xl"
          >
            Get Instant Quote on WhatsApp
          </motion.a>

          <p className="mt-4 text-xs text-white/70">
            Trusted by families across Rajasthan
          </p>
        </div>
      </section>
    </>
  );
};

export default PremiumShowcaseSection;
