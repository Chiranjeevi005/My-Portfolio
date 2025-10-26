'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const AboutHeroSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-light-bgPrimary dark:bg-dark-bgPrimary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Portrait */}
          <motion.div 
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-light-textAccent/30 dark:ring-dark-textAccent/30 mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full" />
            {/* Decorative elements */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent animate-pulse"
              style={{
                boxShadow: theme === 'dark' 
                  ? '0 0 30px rgba(255, 138, 92, 0.4)' 
                  : '0 0 30px rgba(232, 93, 69, 0.3)'
              }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="text-center lg:text-left max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-light-textPrimary dark:text-dark-textPrimary font-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Chiran Jeevi — <span className="text-light-textAccent dark:text-dark-textAccent">The Thinker Who Builds</span>
            </motion.h1>
            
            <motion.div 
              className="h-1 w-24 sm:w-32 bg-light-textAccent dark:bg-dark-textAccent rounded-full mx-auto lg:mx-0 mb-6"
              initial={{ width: 0 }}
              animate={{ width: '8rem' }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            />
            
            <motion.p 
              className="text-lg sm:text-xl text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              A developer, designer, and strategist merging <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">logic</span> with <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">creativity</span>.  
              My journey blends <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">business strategy</span>, <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">technical precision</span>,  
              and a deep passion for <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">building meaningful digital experiences</span>.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <button className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-xl font-bold text-base transition-all duration-300 ease-in-out hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Download Resume
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-4 w-4 h-4 rounded-full bg-light-textAccent/20 dark:bg-dark-textAccent/20 animate-pulse" />
      <div className="absolute top-1/3 right-8 w-3 h-3 rounded-full bg-light-textAccent/30 dark:bg-dark-textAccent/30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-12 w-5 h-5 rounded-full bg-light-textAccent/25 dark:bg-dark-textAccent/25 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default AboutHeroSection;