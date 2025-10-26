'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const VisionSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="py-16 sm:py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-light-textAccent/5 dark:bg-dark-textAccent/5 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-light-textAccent/5 dark:bg-dark-textAccent/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-8">
            The Vision Forward
          </h2>
          
          <motion.div
            className="text-xl sm:text-2xl text-light-textSecondary dark:text-dark-textSecondary mb-12 italic leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="mb-6">
              "I'm not just building software — I'm building systems that think, evolve, and connect people with purpose."
            </p>
            <p>
              My mission is to create technology that empowers individuals and organizations to achieve more than they thought possible.
            </p>
          </motion.div>
          
          <motion.div
            className="text-2xl sm:text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="signature-text" style={{
              fontFamily: "'Great Vibes', cursive",
              color: theme === 'dark' ? '#FF8A5C' : '#E85D45',
              textShadow: theme === 'dark' 
                ? '0 0 15px rgba(255, 138, 92, 0.5)' 
                : '0 0 15px rgba(232, 93, 69, 0.3)'
            }}>
              – Chiran Jeevi
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button className="px-8 py-4 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-xl font-bold text-lg transition-all duration-300 ease-in-out hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              Let's Build Together
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;