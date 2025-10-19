'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  // Deterministic random number generator
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && heroRef.current) {
      // Animate background particles
      const particles = heroRef.current.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        gsap.fromTo(
          particle,
          { 
            opacity: 0,
            scale: 0,
            x: (seededRandom(index * 10) * 100) - 50,
            y: (seededRandom(index * 20) * 100) - 50,
          },
          {
            opacity: 0.7,
            scale: 1,
            x: 0,
            y: 0,
            duration: 1.5,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          }
        );
      });

      // Animate floating shapes
      const shapes = heroRef.current.querySelectorAll('.floating-shape');
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          y: index % 2 === 0 ? -20 : 20,
          rotation: index % 2 === 0 ? -10 : 10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      });

      // Animate headline letters
      lettersRef.current.forEach((letter, index) => {
        gsap.fromTo(
          letter,
          { 
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: 'power2.out',
          }
        );
      });

      // Animate subtitle
      const subtitle = heroRef.current.querySelector('.subtitle');
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
        );
      }

      // Animate CTA buttons
      const buttons = heroRef.current.querySelectorAll('.cta-button');
      buttons.forEach((button, index) => {
        gsap.fromTo(
          button,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, delay: 0.8 + index * 0.1, ease: 'power2.out' }
        );
      });
    }
  }, []);

  const headline = "Building Digital Experiences";
  const headlineLetters = headline.split("");

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
    { width: 13, height: 13, top: 50, left: 65 },
    { width: 18, height: 18, top: 70, left: 20 },
    { width: 10, height: 10, top: 95, left: 80 },
    { width: 14, height: 14, top: 5, left: 45 },
    { width: 17, height: 17, top: 35, left: 95 },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-lightBg dark:bg-darkBg transition-colors duration-700"
    >
      {/* Background particles */}
      {particleData.map((particle, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-accent1Light dark:bg-accent1Dark opacity-20"
          style={{
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            top: `${particle.top}%`,
            left: `${particle.left}%`,
          }}
        />
      ))}

      {/* Floating shapes */}
      <div className="floating-shape absolute top-20 left-10 w-24 h-24 border-2 border-accent2Light dark:border-accent2Dark rotate-45 opacity-20 transition-colors duration-700"></div>
      <div className="floating-shape absolute bottom-40 right-20 w-16 h-16 rounded-full bg-accent1Light dark:bg-accent1Dark opacity-20 transition-colors duration-700"></div>
      <div className="floating-shape absolute top-1/3 right-1/4 w-20 h-20 border-2 border-accent1Light dark:border-accent1Dark opacity-20 transition-colors duration-700"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-textPrimaryLight dark:text-textPrimaryDark font-heading transition-colors duration-700">
          {headlineLetters.map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                if (el) lettersRef.current[index] = el;
              }}
              className="inline-block hover:text-accent1Light dark:hover:text-accent1Dark transition-colors duration-300 cursor-default"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </h1>
        
        <p className="subtitle text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-textSecondaryLight dark:text-textSecondaryDark transition-colors duration-700">
          Crafting immersive digital experiences with cutting-edge technology and creative design
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="cta-button glow-hover bg-accent1Light dark:bg-accent1Dark text-textPrimaryDark dark:text-textPrimaryLight px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            View My Work
          </button>
          <button className="cta-button pulse-hover border-2 border-accent1Light dark:border-accent1Dark text-accent1Light dark:text-accent1Dark px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce transition-colors duration-700">
        <svg className="w-6 h-6 text-accent1Light dark:text-accent1Dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;