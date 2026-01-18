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
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/55 z-10" />
          <img
            src={heroImages[current]}
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-white space-y-5 max-w-xl">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-xs">
              <Star className="w-3.5 h-3.5 text-yellow-300" fill="currentColor" />
              {badge}
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/90 text-base sm:text-lg">
              {subtitle}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to={primaryCtaLink}>
              <Button className="bg-yellow-500 text-white rounded-full px-6">
                {primaryCtaText}
              </Button>
            </Link>

            {showLearnMore && (
              <Link to={secondaryCtaLink}>
                <Button
                  className="bg-white/10 border border-white/80 text-white hover:bg-white/20 rounded-full px-6"
                >
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
