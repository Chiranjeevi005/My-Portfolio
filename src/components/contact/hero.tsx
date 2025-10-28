'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const ContactHero = () => {
  const { theme } = useTheme();
  const signatureRef = useRef<SVGPathElement>(null);

  // Animate signature on mount
  useEffect(() => {
    if (signatureRef.current) {
      const length = signatureRef.current.getTotalLength();
      signatureRef.current.style.strokeDasharray = `${length}`;
      signatureRef.current.style.strokeDashoffset = `${length}`;
      
      // Animate the signature drawing
      setTimeout(() => {
        if (signatureRef.current) {
          signatureRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
          signatureRef.current.style.strokeDashoffset = '0';
        }
      }, 500);
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center transition-colors duration-700 px-4 py-54 overflow-hidden">
      {/* Dynamic background with particle field */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-light-bgPrimary via-light-bgSecondary to-light-bgSurface 
        dark:from-dark-bgPrimary dark:via-dark-bgSecondary dark:to-dark-bgSurface
        transition-colors duration-700">
        {/* Particle field */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: theme === 'dark' ? '#FF8A5C' : '#E85D45',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Simplified content container */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Content in a clean, simple layout */}
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Let's Create Something <span className="text-light-textAccent dark:text-dark-textAccent">Extraordinary</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-light-textSecondary dark:text-dark-textSecondary mb-8 font-body leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Whether it's a bold vision, a curious question, or a groundbreaking partnership — your ideas deserve to be transformed into reality. Let's build something that leaves a lasting impact.
              </motion.p>
              
              {/* Signature element */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-0.5 bg-light-textAccent dark:bg-dark-textAccent mr-4"></div>
                  <svg 
                    width="150" 
                    height="40" 
                    viewBox="0 0 150 40"
                    className="w-32 h-8 sm:w-40 sm:h-10"
                  >
                    <motion.path
                      ref={signatureRef}
                      d="M10 25 Q 30 10 50 20 Q 70 30 90 15 Q 110 5 130 15"
                      fill="none"
                      stroke={theme === 'dark' ? '#FF8A5C' : '#E85D45'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Visual representation column with 1:1 ratio */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Abstract geometric shapes */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl border-2 border-light-textAccent/30 dark:border-dark-textAccent/30"
                  style={{ transform: 'rotate(15deg)' }}
                  animate={{ 
                    rotate: [15, -15, 15],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                ></motion.div>
                
                <motion.div 
                  className="absolute inset-4 rounded-2xl border-2 border-light-textAccent/50 dark:border-dark-textAccent/50"
                  style={{ transform: 'rotate(-10deg)' }}
                  animate={{ 
                    rotate: [-10, 20, -10],
                    scale: [1, 1.03, 1]
                  }}
                  transition={{ 
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                ></motion.div>
                
                <motion.div 
                  className="absolute inset-8 rounded-2xl bg-gradient-to-br from-light-textAccent/20 to-dark-textAccent/20 dark:from-dark-textAccent/30 dark:to-light-textAccent/30 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <div className="text-4xl sm:text-5xl font-bold text-light-textAccent dark:text-dark-textAccent">
                    &lt;/&gt;
                  </div>
                </motion.div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-light-textAccent dark:bg-dark-textAccent flex items-center justify-center"
                  animate={{ 
                    y: [-10, 10, -10],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg className="w-6 h-6 text-light-bgPrimary dark:text-dark-bgPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-light-textAccent dark:bg-dark-textAccent flex items-center justify-center"
                  animate={{ 
                    y: [10, -10, 10],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <svg className="w-6 h-6 text-light-bgPrimary dark:text-dark-bgPrimary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;