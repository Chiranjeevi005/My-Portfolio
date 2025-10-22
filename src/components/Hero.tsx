'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTheme } from 'next-themes';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<SVGSVGElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const codeIconRef = useRef<HTMLDivElement>(null);
  const businessIconRef = useRef<HTMLDivElement>(null);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const { theme } = useTheme();

  const titles = [
    "CHIRANJEEVI",
    "BUSINESS STRATEGIC",
    "FULL-STACK DEVELOPER",
    "AI ENTHUSIAST"
  ];

  useEffect(() => {
    // Rotate titles every 3 seconds
    const titleInterval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);

    return () => clearInterval(titleInterval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && titleRef.current) {
      // Animate title change
      gsap.fromTo(
        titleRef.current,
        { 
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
    
    // Animate icons based on current title
    if (codeIconRef.current && businessIconRef.current) {
      if (currentTitleIndex === 2) { // FULL-STACK DEVELOPER
        gsap.to(codeIconRef.current, {
          y: -10,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut'
        });
      } else if (currentTitleIndex === 1 || currentTitleIndex === 3) { // BUSINESS STRATEGIC or AI ENTHUSIAST
        gsap.to(businessIconRef.current, {
          y: -10,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut'
        });
      }
    }
  }, [currentTitleIndex]);

  useEffect(() => {
    if (typeof window !== 'undefined' && heroRef.current) {
      // Animate background
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out'
        }
      );

      // Animate welcome line
      const welcomeLine = heroRef.current.querySelector('.welcome-line');
      if (welcomeLine) {
        gsap.fromTo(
          welcomeLine,
          { 
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power2.out'
          }
        );
      }

      // Animate tagline
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { 
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power2.out'
          }
        );
      }

      // Animate signature line
      if (lineRef.current) {
        const path = lineRef.current.querySelector('path');
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.5,
            delay: 1,
            ease: 'power2.out'
          });
        }
      }

      // Animate buttons
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('button');
        gsap.fromTo(
          buttons,
          { 
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.5,
            stagger: 0.1,
            ease: 'power2.out'
          }
        );
      }

      // Add pulse animation to radial glow
      const glow = heroRef.current.querySelector('.name-glow');
      if (glow) {
        gsap.to(glow, {
          opacity: 0.8,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: 'power1.inOut'
        });
      }

      // Animate interactive icons with same animation
      if (codeIconRef.current) {
        gsap.to(codeIconRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      if (businessIconRef.current) {
        gsap.to(businessIconRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut'
        });
      }

      // Handle scroll effects
      const handleScroll = () => {
        if (!heroRef.current) return;
        
        const scrollPosition = window.scrollY;
        
        // Move hero content upward on scroll
        gsap.to(heroRef.current, {
          y: -scrollPosition * 0.5,
          duration: 0.1,
          ease: 'none'
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700 overflow-hidden px-4 sm:px-6 md:px-12 lg:px-24 py-12"
    >
      {/* Radial glow behind name */}
      <div className="name-glow absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full opacity-40 pointer-events-none transition-colors duration-700"
        style={{
          background: 'radial-gradient(ellipse at center, var(--color-text-accent) 0%, rgba(232, 93, 69, 0) 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
      ></div>

      {/* Floating interactive elements */}
      <div 
        ref={codeIconRef}
        className="absolute top-1/4 left-4 sm:left-8 md:top-1/3 md:left-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-20 transition-colors duration-700"
      >
        <div className="w-full h-full rounded-full border-2 border-dashed border-light-textAccent dark:border-dark-textAccent flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-light-textAccent dark:text-dark-textAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </div>

      <div 
        ref={businessIconRef}
        className="absolute bottom-1/4 right-4 sm:right-8 md:bottom-1/3 md:right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 opacity-20 transition-colors duration-700"
      >
        <div className="w-full h-full rounded-full border-2 border-dotted border-light-textAccent dark:border-dark-textAccent flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-light-textAccent dark:text-dark-textAccent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Welcome line */}
        <p className="welcome-line text-base sm:text-lg md:text-xl text-light-textAccent dark:text-dark-textAccent font-medium mb-6 sm:mb-8 transition-colors duration-700">
          Welcome to my portfolio
        </p>

        {/* Rotating title */}
        <h1 
          ref={titleRef}
          className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700 mb-6 sm:mb-8 tracking-tight"
          style={{ 
            fontFamily: "'Poppins', 'Clash Display', 'Playfair Display', sans-serif",
            minHeight: '2.5rem',
            textShadow: theme === 'dark' 
              ? '0 0 15px rgba(232, 93, 69, 0.5)' 
              : '0 0 15px rgba(232, 93, 69, 0.3)'
          }}
        >
          {titles[currentTitleIndex]}
        </h1>

        {/* Signature line */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <svg 
            ref={lineRef}
            width="200" 
            height="15" 
            viewBox="0 0 200 15" 
            className="sm:w-[300px] md:w-[400px] w-[150px]"
          >
            <path 
              d="M5 7 Q 100 2 195 10" 
              stroke="var(--color-text-accent)" 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 4px var(--color-text-accent))',
              }}
            />
          </svg>
        </div>

        {/* Tagline */}
        <p 
          ref={taglineRef}
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-light-textMuted dark:text-dark-textMuted italic transition-colors duration-700"
          style={{ 
            fontFamily: "'Inter', 'Manrope', 'DM Sans', sans-serif",
          }}
        >
          Code the Passion. Build the Future.
        </p>

        {/* Buttons */}
        <div 
          ref={buttonsRef}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-12"
        >
          <button 
            className="px-6 py-3 sm:px-8 sm:py-4 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ease-in-out hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transform hover:-translate-y-1"
          >
            Explore My Work
          </button>
          <button 
            className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-light-buttonPrimary dark:border-dark-buttonPrimary text-light-buttonPrimary dark:text-dark-buttonPrimary rounded-xl font-bold text-base sm:text-lg transition-all duration-300 ease-in-out hover:bg-light-buttonPrimary/10 dark:hover:bg-dark-buttonPrimary/10 transform hover:-translate-y-1"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-colors duration-700">
        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-light-textAccent dark:text-dark-textAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;