'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from 'next-themes';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Deterministic random number generator
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && heroRef.current) {
      // Animate headline entrance
      const headline = heroRef.current.querySelector('.hero-headline');
      if (headline) {
        gsap.fromTo(
          headline,
          { 
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          }
        );
      }

      // Animate subtitle
      const subtitle = heroRef.current.querySelector('.hero-subtitle');
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
        );
      }

      // Animate CTA buttons
      const buttons = heroRef.current.querySelectorAll('.cta-button');
      buttons.forEach((button, index) => {
        gsap.fromTo(
          button,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.6 + index * 0.1, ease: 'power2.out' }
        );
      });

      // Animate layered shapes with parallax effect
      if (shapeRef.current) {
        const handleMouseMove = (e: MouseEvent) => {
          if (!shapeRef.current) return;
          
          const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
          
          gsap.to(shapeRef.current, {
            duration: 0.5,
            x: xAxis,
            y: yAxis,
            ease: 'power2.out'
          });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }
  }, [theme]);

  // Handle scroll effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !shapeRef.current) return;
      
      const scrollPosition = window.scrollY;
      const heroSection = heroRef.current;
      
      // Move hero content upward on scroll
      gsap.to(heroSection, {
        y: -scrollPosition * 0.5,
        duration: 0.1,
        ease: 'none'
      });
      
      // Move accent shape sideways on scroll
      gsap.to(shapeRef.current, {
        x: scrollPosition * 0.3,
        duration: 0.1,
        ease: 'none'
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Predefined particle positions and sizes for consistent SSR
  const particleData = [
    { width: 15, height: 15, top: 10, left: 20 },
    { width: 12, height: 12, top: 25, left: 80 },
    { width: 18, height: 18, top: 40, left: 30 },
    { width: 10, height: 10, top: 60, left: 70 },
    { width: 14, height: 14, top: 80, left: 15 },
    { width: 16, height: 16, top: 15, left: 60 },
    { width: 11, height: 11, top: 35, left: 40 },
    { width: 13, height: 13, top: 55, left: 85 },
    { width: 17, height: 17, top: 75, left: 25 },
    { width: 9, height: 9, top: 90, left: 50 },
    { width: 19, height: 19, top: 20, left: 10 },
    { width: 12, height: 12, top: 45, left: 75 },
    { width: 15, height: 15, top: 65, left: 35 },
    { width: 11, height: 11, top: 85, left: 90 },
    { width: 16, height: 16, top: 30, left: 5 },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700"
    >
      {/* Layered shapes with gradients */}
      <div
        ref={shapeRef}
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none transition-colors duration-700"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(ellipse at center, var(--color-text-accent-dark) 0%, rgba(255,138,92,0) 70%)'
            : 'radial-gradient(ellipse at center, var(--color-text-accent-light) 0%, rgba(232,93,69,0) 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
      ></div>
      
      {/* Secondary shape */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none transition-colors duration-700"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(ellipse at center, var(--color-text-secondary-dark) 0%, rgba(217,191,174,0) 70%)'
            : 'radial-gradient(ellipse at center, var(--color-text-secondary-light) 0%, rgba(90,62,54,0) 70%)',
          top: '40%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(50px)',
        }}
      ></div>

      {/* Floating particles for depth */}
      <div className="absolute inset-0 overflow-hidden">
        {particleData.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              background: theme === 'dark' 
                ? 'var(--color-text-accent-dark)' 
                : 'var(--color-text-accent-light)',
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animation: `float ${seededRandom(i * 10) * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${seededRandom(i * 20) * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="hero-headline text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
          I engineer digital experiences that build the future.
        </h1>
        
        <p className="hero-subtitle text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-700">
          Crafting immersive solutions with precision and creativity
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="cta-button glow-hover bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover">
            Explore My Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce transition-colors duration-700">
        <svg className="w-6 h-6 text-light-textAccent dark:text-dark-textAccent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;