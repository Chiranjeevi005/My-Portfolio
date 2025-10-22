'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // Animate section title
      const title = containerRef.current.querySelector('.cta-title');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate CTA button
      const button = containerRef.current.querySelector('.cta-button');
      if (button) {
        gsap.fromTo(
          button,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.3,
            scrollTrigger: {
              trigger: button,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Add pulse animation to button
        gsap.to(button, {
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: 'power1.inOut',
          delay: 2,
        });
      }
    }

    // Animate wave
    if (waveRef.current) {
      gsap.fromTo(
        waveRef.current,
        { x: '-100%' },
        {
          x: '100%',
          duration: 3,
          ease: 'power1.inOut',
          repeat: -1,
        }
      );
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-32 bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700 relative overflow-hidden"
    >
      {/* Wave shape at the top */}
      <div 
        ref={waveRef}
        className="absolute top-0 left-0 w-full h-20 opacity-20"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23${typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'FF8A5C' : 'E85D45'}'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="cta-title text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
            Let's Build the Future Together
          </h2>
          
          <button className="cta-button glow-hover px-8 py-4 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;