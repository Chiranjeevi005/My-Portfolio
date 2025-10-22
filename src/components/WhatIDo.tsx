'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const WhatIDo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const services = [
    {
      title: "Realtime Web Apps",
      description: "Building dynamic, interactive applications with real-time data synchronization and seamless user experiences.",
      icon: "🌐",
    },
    {
      title: "Data-Driven Dashboards",
      description: "Creating insightful visualization platforms that transform complex data into actionable business intelligence.",
      icon: "📊",
    },
    {
      title: "Product Innovations",
      description: "Designing and developing cutting-edge digital products that solve real-world problems with elegant solutions.",
      icon: "💡",
    },
    {
      title: "Mobile Experiences",
      description: "Crafting responsive mobile applications with native-like performance and intuitive interfaces.",
      icon: "📱",
    },
    {
      title: "Cloud Architecture",
      description: "Designing scalable cloud solutions with microservices and serverless technologies for optimal performance.",
      icon: "☁️",
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // Animate section title
      const title = containerRef.current.querySelector('.section-title');
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

      // Animate service cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.1,
            }
          );

          // Add hover effect
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              scale: 1.05,
              duration: 0.3,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            });
          });
        });
      }
    }

    // Cleanup
    return () => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        cards.forEach(card => {
          card.removeEventListener('mouseenter', () => {});
          card.removeEventListener('mouseleave', () => {});
        });
      }
    };
  }, []);

  // Handle drag for horizontal scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!cardsRef.current) return;
    
    isDown.current = true;
    startX.current = e.pageX - cardsRef.current.offsetLeft;
    scrollLeft.current = cardsRef.current.scrollLeft;
    cardsRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !cardsRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - cardsRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    cardsRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (cardsRef.current) {
      cardsRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (cardsRef.current) {
      cardsRef.current.style.cursor = 'grab';
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary transition-colors duration-700 overflow-hidden"
      id="what-i-do"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
          What I Do
        </h2>
        
        <div 
          ref={cardsRef}
          className="flex gap-6 pb-8 cursor-grab overflow-x-auto scrollbar-hide"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card flex-shrink-0 w-[300px] md:w-[350px] bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-8 border border-light-border dark:border-dark-border shadow-lg transition-all duration-300 ease-in-out hover:border-light-textAccent dark:hover:border-dark-textAccent"
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-light-textPrimary dark:text-dark-textPrimary transition-colors duration-700">
                {service.title}
              </h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-700">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-700">
            ← Drag to explore →
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;