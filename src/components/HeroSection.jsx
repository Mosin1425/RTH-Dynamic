import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = ({
  title,
  subtitle,
  image,
  images = [],
  showLearnMore = false,
  primaryCtaText = "Book Your Event",
  primaryCtaLink = "/contact",
  secondaryCtaText = "Learn More",
  secondaryCtaLink = "/about",
  badge = "Premier Event Management",
}) => {
  const isSlider = images && images.length > 0;
  const heroImages = isSlider ? images : [image];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isSlider) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isSlider, heroImages.length]);

  return (
    <section className="relative min-h-[70vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-gray-900">
      
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-[2px]" />

          {/* Subtle Radial Glow */}
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

          <img
            src={heroImages[current]}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="text-white space-y-6 max-w-xl">

          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-xs border border-white/30"
            >
              <Star className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" />
              {badge}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-5xl font-bold leading-tight"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/90 text-base sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-3 pt-3"
          >
            <Link to={primaryCtaLink}>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-6 shadow-lg hover:scale-105 transition-all">
                {primaryCtaText}
              </Button>
            </Link>

            {showLearnMore && (
              <Link to={secondaryCtaLink}>
                <Button
                  className="bg-white/10 border border-white/80 text-white hover:bg-white/20 rounded-full px-6 transition-all"
                >
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
