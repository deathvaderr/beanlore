import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CAFE_IMAGES } from "../data";

export default function ImageShowcase({ images = CAFE_IMAGES }: { images?: typeof CAFE_IMAGES }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.05
    },
    center: {
      opacity: 1,
      scale: 1,
      transition: {
        opacity: { duration: 1.6, ease: "easeInOut" },
        scale: { duration: 1.6, ease: "easeOut" }
      }
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      transition: {
        opacity: { duration: 1.2, ease: "easeInOut" }
      }
    }
  };

  // Reset index if it goes out of bounds when images change
  const safeIndex = currentIndex >= images.length ? 0 : currentIndex;

  useEffect(() => {
    if (currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [safeIndex, images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[75vh] min-h-[420px] bg-[#1A1A1A] overflow-hidden group"
      id="hero-images-container"
    >
      {/* Dynamic Image Slideshow */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={safeIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={images[safeIndex]?.url}
              alt={images[safeIndex]?.caption}
              className="w-full h-full object-cover filter brightness-[0.72] select-none scale-[1.01]"
              referrerPolicy="no-referrer"
              draggable="false"
            />
            
            {/* Cinematic overlay vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Overlay Content - Tucked elegantly in the top-left, with no background box and readable shadow */}
      <div className="absolute top-12 left-6 sm:left-12 z-15 pointer-events-none select-none max-w-[280px] sm:max-w-[420px] text-left">
        <div className="space-y-2 text-left">
          <span className="font-mono text-[#9CB49F] text-[8px] sm:text-[9px] uppercase tracking-[0.25em] font-bold block drop-shadow">
            ESTABLISHED IN BANGLORE
          </span>
          <p className="font-serif text-[12px] sm:text-[14px] md:text-[15px] text-white font-light leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
            Where the art of slow roasting meets the warmth of a neighborhood gathering spot. Experience specialty coffee at its finest, crafted intentionally from bean to cup.
          </p>
        </div>
      </div>
    </div>
  );
}
