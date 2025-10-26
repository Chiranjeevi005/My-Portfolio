'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, Fragment } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLinkedin, faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Add the icons to the library
library.add(faLinkedin, faGithub, faWhatsapp);
import { Code, Palette, Target, MessageCircle, Linkedin, Github} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const milestoneRefs = useRef<HTMLDivElement[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const triggers = useRef<ScrollTrigger[]>([]);

  // 🌗 Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkMode);
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // 🎬 GSAP scroll animations
  useEffect(() => {
    triggers.current.forEach(trigger => trigger.kill());
    triggers.current = [];

    if (typeof window === 'undefined' || !sectionRef.current) return;

    const setVisible = (element: Element | null) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        gsap.set(element, { opacity: 1, y: 0, scale: 1 });
      }
    };

    // Headline Animation
    if (headlineRef.current)
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' }
        }
      );

    // Subtext Animation
    if (subtextRef.current)
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: { trigger: subtextRef.current, start: 'top 90%' }
        }
      );

    // Timeline Animation
    if (timelineContainerRef.current)
      gsap.fromTo(
        timelineContainerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: timelineContainerRef.current, start: 'top 90%' }
        }
      );

    milestoneRefs.current.forEach((milestone, index) => {
      gsap.fromTo(
        milestone,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          delay: index * 0.2,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: milestone, start: 'top 95%' }
        }
      );
    });

    ScrollTrigger.refresh();
  }, [isDarkMode]);

  // 🌌 Floating background elements animation
  useEffect(() => {
    if (!backgroundElementsRef.current) return;
    const elements = backgroundElementsRef.current.querySelectorAll('.floating-element');
    elements.forEach((el, i) =>
      gsap.to(el, {
        y: -15,
        repeat: -1,
        duration: 4 + i,
        yoyo: true,
        ease: 'sine.inOut'
      })
    );
  }, [isDarkMode]);

  const milestones = [
    { label: "Code", icon: Code },
    { label: "Design", icon: Palette },
    { label: "Impact", icon: Target }
  ];

  // Handle CTA button click
  const handleCTAClick = () => {
    // Replace with your actual Google Form URL
    window.open('https://forms.gle/your-google-form-url', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="section bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700 relative overflow-hidden"
    >
      {/* ✨ Floating Background Elements */}
      <div ref={backgroundElementsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-light-textAccent dark:bg-dark-textAccent opacity-10 blur-3xl"></div>
        <div className="floating-element absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-light-textHighlight dark:bg-dark-textHighlight opacity-10 blur-3xl"></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-light-buttonPrimary dark:bg-dark-buttonPrimary opacity-10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* 🌠 Headline Section */}
        <div className="text-center mb-16">
          <h2
            ref={headlineRef}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700"
          >
            From Vision to Reality
          </h2>
          <p
            ref={subtextRef}
            className="text-xl max-w-2xl mx-auto text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-700"
          >
            A journey of ideas evolving into impactful creations — let&apos;s make the next chapter together.
          </p>
        </div>

        {/* 🕓 Timeline Section */}
        <div ref={timelineContainerRef} className="relative max-w-5xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between md:justify-around w-full relative gap-6 md:gap-x-8">
            {milestones.map((milestone, index) => (
              <Fragment key={index}>
                <div
                  ref={el => { if (el) milestoneRefs.current[index] = el; }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-light-textAccent to-light-textHighlight dark:from-dark-textAccent dark:to-dark-textHighlight shadow-[0_0_30px_var(--tw-gradient-stops)] flex items-center justify-center"
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    animate={{
                      y: [0, -10, 0],
                      transition: { duration: 2 + index * 0.4, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <milestone.icon className="text-light-buttonText dark:text-dark-buttonText w-6 h-6 md:w-8 md:h-8" />
                  </motion.div>
                  <motion.span
                    className="mt-2 md:mt-4 text-sm md:text-base text-light-textSecondary dark:text-dark-textSecondary font-medium"
                    whileHover={{ scale: 1.1 }}
                  >
                    {milestone.label}
                  </motion.span>
                </div>

                {/* Connecting Lines with Longer Arrows */}
                {index < milestones.length - 1 && (
                  <>
                    {/* Horizontal (desktop) */}
                    <div className="hidden md:flex items-center flex-grow h-2 min-w-[80px] mx-4">
                      <div className="flex-grow h-2 
                        bg-gradient-to-r from-light-textAccent to-light-textHighlight 
                        dark:from-dark-textAccent dark:to-dark-textHighlight 
                        shadow-[0_0_15px_var(--tw-gradient-stops)] rounded-full animate-pulse"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-3 text-light-textAccent dark:text-dark-textAccent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                      <div className="flex-grow h-2 
                        bg-gradient-to-r from-light-textAccent to-light-textHighlight 
                        dark:from-dark-textAccent dark:to-dark-textHighlight 
                        shadow-[0_0_15px_var(--tw-gradient-stops)] rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Vertical (mobile) */}
                    <div className="md:hidden flex flex-col items-center w-2 min-h-[80px] mx-auto my-4">
                      <div className="flex-grow w-2 
                        bg-gradient-to-b from-light-textAccent to-light-textHighlight 
                        dark:from-dark-textAccent dark:to-dark-textHighlight 
                        shadow-[0_0_15px_var(--tw-gradient-stops)] rounded-full animate-pulse"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 my-2 transform rotate-90 text-light-textAccent dark:text-dark-textAccent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                      <div className="flex-grow w-2 
                        bg-gradient-to-b from-light-textAccent to-light-textHighlight 
                        dark:from-dark-textAccent dark:to-dark-textHighlight 
                        shadow-[0_0_15px_var(--tw-gradient-stops)] rounded-full animate-pulse"></div>
                    </div>
                  </>
                )}
              </Fragment>
            ))}

            {/* Connector to CTA Button with Longer Arrow */}
            <div className="hidden md:flex items-center flex-grow h-2 min-w-[80px] mx-4">
              <div className="flex-grow h-2 
                bg-gradient-to-r from-light-textAccent to-light-textHighlight 
                dark:from-dark-textAccent dark:to-dark-textHighlight 
                shadow-[0_0_15px_var(--tw-gradient-stops)] rounded-full animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-3 text-light-textAccent dark:text-dark-textAccent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              <div className="flex-grow h-2 
                bg-gradient-to-r from-light-textAccent to-light-textHighlight 
                dark:from-dark-textAccent dark:to-dark-textHighlight 
                shadow-[0_0_15px_var(--tw-gradient-stops)] rounded-full animate-pulse"></div>
            </div>

            {/* Final CTA Node - Professional Redesign */}
            <div
              ref={el => { if (el) milestoneRefs.current[milestones.length] = el; }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Professional CTA Node Container */}
              <div className="relative group">
                {/* Outer glow ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-light-textAccent to-light-textHighlight dark:from-dark-textAccent dark:to-dark-textHighlight opacity-30 blur-lg group-hover:opacity-50 transition-opacity duration-300"></div>
                
                {/* Main CTA Button Node */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCTAClick}
                  className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-light-buttonPrimary to-light-textAccent dark:from-dark-buttonPrimary dark:to-dark-textAccent shadow-[0_0_40px_var(--tw-gradient-stops)] flex items-center justify-center border-4 border-light-textAccent dark:border-dark-textAccent transition-all duration-500 overflow-hidden"
                >
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-light-textAccent to-light-textHighlight dark:from-dark-textAccent dark:to-dark-textHighlight opacity-20"></div>
                  
                  {/* CTA Icon */}
                  <div className="relative z-10 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-12 md:h-12 text-light-buttonText dark:text-dark-buttonText" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="mt-1 md:mt-2 text-[0.6rem] md:text-xs font-bold text-light-buttonText dark:text-dark-buttonText">FORM</span>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-light-buttonHover to-light-textHighlight dark:from-dark-buttonHover dark:to-dark-textHighlight opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </motion.button>
              </div>
              
              {/* Professional CTA Text */}
              <motion.div 
                className="mt-4 md:mt-6 text-center max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-1 md:mb-2">
                  Ready to Start Your Project?
                </h3>
                <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary">
                  Fill out our project form and let's build something amazing together
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 md:mt-16 text-center">
          <motion.p
            className="text-light-textMuted dark:text-dark-textMuted mb-4 text-sm md:text-base"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Let&apos;s connect personally — I&apos;d love to hear from you.
          </motion.p>

          <div className="flex justify-center gap-4 md:gap-6">
            <motion.a
              href="https://wa.me/918105564693?text=Namaste"
              target="_blank"
              className="hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors"
              whileHover={{ y: -5, scale: 1.1 }}
            >
              <FontAwesomeIcon icon={faWhatsapp} size="2x" className="md:w-10 md:h-10" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/chiranjeevi005"
              target="_blank"
              className="hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors"
              whileHover={{ y: -5, scale: 1.1 }}
            >
              <FontAwesomeIcon icon={faLinkedin} size="2x" className="md:w-10 md:h-10" />
            </motion.a>
            <motion.a
              href="https://github.com/Chiranjeevi005"
              target="_blank"
              className="hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors"
              whileHover={{ y: -5, scale: 1.1 }}
            >
              <FontAwesomeIcon icon={faGithub} size="2x" className="md:w-10 md:h-10" />
            </motion.a>
          </div>
        </div>

        {/* 🪶 Closing Line */}
        <motion.p
          className="text-sm md:text-base italic text-light-textMuted dark:text-dark-textMuted mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Every connection begins with a shared vision — let&apos;s make ours real.
        </motion.p>
      </div>
    </section>
  );
};

export default CTA;
