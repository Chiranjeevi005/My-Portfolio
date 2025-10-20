'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && projectsRef.current) {
      const projectCards = projectsRef.current.querySelectorAll('.project-card');
      
      projectCards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );

        // Add hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -15,
            scale: 1.03,
            rotation: index % 2 === 0 ? -2 : 2,
            duration: 0.3,
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-featured online shopping experience with real-time inventory.",
      image: "/project1.jpg",
    },
    {
      title: "Task Management App",
      description: "Collaborative productivity tool with team features and analytics.",
      image: "/project2.jpg",
    },
    {
      title: "Health & Fitness Tracker",
      description: "Mobile application for tracking workouts, nutrition, and health metrics.",
      image: "/project3.jpg",
    },
  ];

  return (
    <section 
      id="projects" 
      ref={projectsRef}
      className="section bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
            Featured Projects
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-light-textSecondary dark:text-dark-textSecondary transition-colors duration-700">
            Explore our latest work and see how we bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl overflow-hidden border border-light-border dark:border-dark-border shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group"
            >
              <div className="h-48 bg-gradient-to-r from-light-buttonPrimary to-light-textAccent dark:from-dark-buttonPrimary dark:to-dark-textAccent flex items-center justify-center transition-all duration-700">
                <span className="text-light-buttonText dark:text-dark-buttonText font-bold text-lg transition-colors duration-700">
                  Project Image
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-light-textPrimary dark:text-dark-textPrimary transition-colors duration-700">
                  {project.title}
                </h3>
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4 transition-colors duration-700">
                  {project.description}
                </p>
                <button className="text-light-textAccent dark:text-dark-textAccent font-bold hover:text-light-textHighlight dark:hover:text-dark-textHighlight transition-colors duration-300">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;