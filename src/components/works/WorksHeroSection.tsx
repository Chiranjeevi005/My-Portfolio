'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { motion } from 'framer-motion';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("fluid", "M0,0 C0.2,0.8 0.4,0.9 0.6,1 C0.8,1 0.9,0.9 1,1");
  CustomEase.create("cinematic", "M0,0 C0.14,0.7 0.24,0.9 0.4,1 C0.6,1 0.8,0.9 1,1");
}

const WorksHeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && gsap) {
      // Description animation with subtle entrance
      if (descriptionRef.current) {
        gsap.fromTo(descriptionRef.current,
          { 
            opacity: 0,
            y: 40,
            filter: 'blur(3px)'
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: "cinematic",
            delay: 0.8
          }
        );
      }
      
      // Highlight element animation
      if (highlightRef.current) {
        gsap.fromTo(highlightRef.current,
          { 
            width: 0,
            opacity: 0
          },
          {
            width: '100%',
            opacity: 1,
            duration: 1.5,
            ease: "cinematic",
            delay: 1.2
          }
        );
      }
    }
  }, []);

  // Only render on client side to prevent hydration issues
  if (!isClient) {
    return (
      <section 
        ref={containerRef}
        className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-light-bgPrimary to-light-bgSecondary transition-colors duration-700"
        aria-hidden="true"
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-light-bgPrimary to-light-bgSecondary"></div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-light-bgPrimary to-light-bgSecondary transition-colors duration-700"
      aria-label="Works Hero Section"
    >
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-6xl w-full">
        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-center mb-6 text-light-textPrimary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Lines of Code, Chapters of Growth
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg sm:text-xl text-light-textSecondary text-center max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Every project here tells a story — not just of code written, but of lessons learned, deadlines conquered, and dreams turned into design. These aren’t just works — they’re milestones in motion.
        </motion.p>

        {/* Highlight Bar */}
        <div 
          ref={highlightRef}
          className="h-1 w-0 bg-gradient-to-r from-light-textAccent to-light-textHighlight mb-8 rounded-full"
        ></div>
      </div>
    </section>
  );
};

export default WorksHeroSection;