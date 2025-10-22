'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      role: "Full-Stack Developer",
      description: "A scalable e-commerce solution with real-time inventory management and personalized recommendations.",
      image: "/project1.jpg",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      role: "Frontend Lead",
      description: "Interactive data visualization platform for enterprise clients with real-time metrics and reporting.",
      image: "/project2.jpg",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      role: "Product Engineer",
      description: "Secure mobile banking application with biometric authentication and financial insights.",
      image: "/project3.jpg",
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

      // Animate project cards
      const projectCards = containerRef.current.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.2,
          }
        );

        // Add scroll-triggered animations for image and text
        const image = card.querySelector('.project-image');
        const text = card.querySelector('.project-text');

        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, scale: 1.2 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
              delay: 0.3,
            }
          );
        }
      });
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-light-bgSurface dark:bg-dark-bgSurface transition-colors duration-700"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
          Featured Work
        </h2>
        
        <div className="space-y-32">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="project-card relative min-h-[600px]"
            >
              {/* Project image with offset positioning */}
              <div 
                className={`project-image absolute w-full md:w-3/4 h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${
                  index % 2 === 0 ? 'left-0' : 'right-0'
                }`}
                style={{
                  top: index === 0 ? '0' : index === 1 ? '100px' : '200px',
                  clipPath: index === 1 ? 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' : 
                           index === 2 ? 'polygon(0 15%, 100% 0, 100% 100%, 0 100%)' : 
                           'none',
                }}
              >
                <div className="w-full h-full bg-gradient-to-r from-light-buttonPrimary to-light-textAccent dark:from-dark-buttonPrimary dark:to-dark-textAccent flex items-center justify-center">
                  <span className="text-light-buttonText dark:text-dark-buttonText font-bold text-2xl">
                    {project.title} Preview
                  </span>
                </div>
              </div>
              
              {/* Project information panel */}
              <div 
                className={`project-text absolute w-full md:w-2/5 p-8 rounded-2xl bg-light-bgPrimary dark:bg-dark-bgPrimary border border-light-border dark:border-dark-border shadow-xl transition-all duration-700 ${
                  index % 2 === 0 ? 'right-0 md:right-10' : 'left-0 md:left-10'
                }`}
                style={{
                  top: index === 0 ? '300px' : index === 1 ? '400px' : '500px',
                }}
              >
                <div className="max-w-md">
                  <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-light-buttonPrimary/10 dark:bg-dark-buttonPrimary/10 text-light-textAccent dark:text-dark-textAccent mb-4">
                    {project.role}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-light-textPrimary dark:text-dark-textPrimary transition-colors duration-700">
                    {project.title}
                  </h3>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6 transition-colors duration-700">
                    {project.description}
                  </p>
                  <button className="glow-hover px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-xl font-bold transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;