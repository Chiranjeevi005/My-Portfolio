'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const EntrepreneurialTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const timelineEvents = [
    {
      year: "2022",
      title: "First Project Launch",
      description: "Launched my first commercial web application with 500+ initial users",
      icon: "🚀",
    },
    {
      year: "2023",
      title: "Team Expansion",
      description: "Grew the team to 8 talented developers and designers",
      icon: "👥",
    },
    {
      year: "2024",
      title: "Product Milestone",
      description: "Reached 100,000 active users across all platforms",
      icon: "📈",
    },
    {
      year: "2025",
      title: "Series A Funding",
      description: "Secured $2.5M in Series A funding to accelerate growth",
      icon: "💼",
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

      // Animate timeline events
      const events = containerRef.current.querySelectorAll('.timeline-event');
      events.forEach((event, index) => {
        gsap.fromTo(
          event,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: event,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.2,
          }
        );

        // Add pulse animation to timeline dots
        const dot = event.querySelector('.timeline-dot');
        if (dot) {
          gsap.to(dot, {
            scale: 1.2,
            repeat: -1,
            yoyo: true,
            duration: 1,
            ease: 'power1.inOut',
            delay: index * 0.5,
          });
        }
      });
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
          My Journey
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Curved timeline path */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-light-textAccent dark:bg-dark-textAccent rounded-full"></div>
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full opacity-20"
            style={{
              background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q25,30 50,50 T100,50' stroke='%23${typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'FF8A5C' : 'E85D45'}' fill='none' stroke-width='2' stroke-dasharray='5,5'/%3E%3C/svg%3E")`,
              backgroundSize: '100% 100px',
            }}
          ></div>
          
          {/* Timeline events */}
          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <div 
                key={index}
                className={`timeline-event flex items-center relative ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Year on one side */}
                <div className={`w-2/5 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="text-2xl font-bold text-light-textAccent dark:text-dark-textAccent transition-colors duration-700">
                    {event.year}
                  </div>
                </div>
                
                {/* Timeline dot in the center */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="timeline-dot w-8 h-8 rounded-full bg-light-textAccent dark:bg-dark-textAccent flex items-center justify-center transition-colors duration-700">
                    <span className="text-light-buttonText dark:text-dark-buttonText text-lg">{event.icon}</span>
                  </div>
                </div>
                
                {/* Event content on the other side */}
                <div className={`w-2/5 ${index % 2 === 0 ? 'text-left pl-8' : 'text-right pr-8'}`}>
                  <div className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-lg transition-all duration-700">
                    <h3 className="text-xl font-bold mb-2 text-light-textPrimary dark:text-dark-textPrimary transition-colors duration-700">
                      {event.title}
                    </h3>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-700">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntrepreneurialTimeline;