'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const AboutHeroSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Portrait - Left Column with enhanced design */}
          <motion.div 
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.03,
              rotate: 2,
              transition: { duration: 0.3 }
            }}
          >
            {/* Enhanced professional portrait placeholder with refined border design */}
            <div className="absolute inset-0 bg-gradient-to-br from-light-bgSecondary to-light-bgPrimary dark:from-dark-bgSecondary dark:to-dark-bgPrimary flex items-center justify-center">
              <div className="relative">
                {/* Camera icon for better UX indication */}
                <svg 
                  className="w-16 h-16 text-light-textAccent/40 dark:text-dark-textAccent/40" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                
                {/* Overlay text for better UX */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-light-textSecondary dark:text-dark-textSecondary text-sm font-body whitespace-nowrap">
                  Professional Headshot
                </div>
              </div>
            </div>
            
            {/* Refined dual-ring border effect for premium look */}
            <div className="absolute inset-0 rounded-full border-4 border-light-textAccent/20 dark:border-dark-textAccent/20"></div>
            <div className="absolute inset-2 rounded-full border-2 border-light-textAccent/40 dark:border-dark-textAccent/40"></div>
            
            {/* Subtle inner highlight for depth */}
            <div className="absolute top-0 left-0 w-full h-1/2 rounded-full bg-gradient-to-b from-white/30 to-transparent dark:from-white/20 dark:to-transparent"></div>
            
            {/* Soft outer glow for depth */}
            <div className="absolute -inset-2 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 blur-xl"></div>
          </motion.div>

          {/* Text Content - Right Column with more spacing */}
          <motion.div 
            className="text-center lg:text-left max-w-2xl lg:pl-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {/* Professional Heading */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading text-center lg:text-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ChiranJeevi P.K
            </motion.h1>
            
            {/* Animated Role Text - Single Line for Desktop/Tablet, Stacked for Mobile */}
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-light-textAccent dark:text-dark-textAccent font-heading text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="hidden sm:inline-block whitespace-nowrap">
                Full-Stack Developer | Business Strategist | AI Enthusiast
              </span>
              <span className="sm:hidden inline-block">
                Full-Stack Developer<br />
                Business Strategist<br />
                AI Enthusiast
              </span>
            </motion.div>
            
            {/* Paragraph 1 */}
            <motion.p 
              className="text-lg sm:text-xl text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-6 font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
               — a business-minded <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">full-stack developer</span> and <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">AI enthusiast</span>. I combine strategy with technical skills to create <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">digital solutions</span> that deliver real impact. I enjoy turning complex problems into simple, scalable systems.
            </motion.p>
            
            {/* Paragraph 2 */}
            <motion.p 
              className="text-lg sm:text-xl text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-6 font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              My approach merges <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">user-centric design</span> with code precision. I thrive at the intersection of technology, analytics, and creativity, enabling businesses to achieve measurable growth and innovation.
            </motion.p>
            
            {/* Paragraph 3 */}
            <motion.p 
              className="text-lg sm:text-xl text-light-textSecondary dark:text-dark-textSecondary leading-relaxed mb-8 font-body"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Beyond coding, I'm passionate about learning <span className="font-semibold text-light-textAccent dark:text-dark-textAccent">AI trends</span>, optimizing workflows, and mentoring peers. I aim to build products that not only work but empower users and organizations.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <button className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-xl font-bold text-base transition-all duration-300 ease-in-out hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Download Resume
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating particles for visual interest */}
      <div className="absolute top-1/4 left-4 w-4 h-4 rounded-full bg-light-textAccent/20 dark:bg-dark-textAccent/20 animate-pulse" />
      <div className="absolute top-1/3 right-8 w-3 h-3 rounded-full bg-light-textAccent/30 dark:bg-dark-textAccent/30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-12 w-5 h-5 rounded-full bg-light-textAccent/25 dark:bg-dark-textAccent/25 animate-pulse" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default AboutHeroSection;