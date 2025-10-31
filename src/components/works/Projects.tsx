'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const { portfolioData } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate pagination
  const projectsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(portfolioData.projects.length / projectsPerPage);
  const startIndex = currentPage * projectsPerPage;
  const visibleProjects = portfolioData.projects.slice(startIndex, startIndex + projectsPerPage);

  // Handle responsive design
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle page navigation
  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Animation for project cards
  useEffect(() => {
    if (typeof window !== 'undefined' && galleryRef.current) {
      const cards = galleryRef.current.querySelectorAll('.project-card');
      
      // Store card references
      cardsRef.current = Array.from(cards) as HTMLDivElement[];
      
      // Create subtle floating animation for each card with different depths
      cards.forEach((card, index) => {
        // Different z-depths for parallax effect
        const depth = index % 3;
        const zValue = depth === 0 ? 0 : depth === 1 ? 10 : 20;
        
        // Subtle oscillation animation
        gsap.to(card, {
          y: `-=${3 + depth * 2}`,
          x: `-=${1 + depth * 0.5}`,
          rotationX: `-=${0.3 + depth * 0.1}`,
          rotationY: `-=${0.3 + depth * 0.1}`,
          z: zValue,
          duration: 8 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
        
        // Scroll-triggered animation
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 30,
            z: -30,
            rotationX: 3,
            rotationY: 3,
          },
          {
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            duration: 1.0,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.05
          }
        );
      });

      // Cleanup function
      return () => {
        cards.forEach(card => {
          const triggers = ScrollTrigger.getAll().filter(t => t.trigger === card);
          triggers.forEach(trigger => trigger.kill());
        });
      };
    }
  }, [currentPage]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full overflow-hidden bg-light-bgPrimary dark:bg-dark-bgPrimary py-24 transition-colors duration-700"
    >
      {/* Ambient particle field - reduced number */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10 dark:opacity-5"
            style={{
              width: `${2 + (i % 6)}px`,
              height: `${2 + (i % 6)}px`,
              top: `${(i * 12) % 100}%`,
              left: `${(i * 18) % 100}%`,
              backgroundColor: i % 3 === 0 
                ? 'var(--color-text-accent-light)' 
                : i % 3 === 1 
                  ? 'var(--color-text-accent-dark)' 
                  : 'var(--color-bg-primary-light)',
              animationName: 'float',
              animationDuration: `${20 + (i % 15)}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              animationDelay: `${i % 4}s`,
              animationFillMode: 'both',
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto font-body"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            A showcase of my work, demonstrating expertise across various technologies and problem domains.
          </motion.p>
        </div>
        
        {/* Floating Depth Gallery with Pagination */}
        <div className="relative">
          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-light-bgPrimary/80 dark:bg-dark-bgPrimary/80 p-3 rounded-full shadow-lg border border-light-cardBorder dark:border-dark-cardBorder hover:bg-light-textAccent dark:hover:bg-dark-textAccent hover:text-light-buttonText dark:hover:text-dark-buttonText transition-all duration-300 backdrop-blur-sm"
                aria-label="Previous projects"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-light-bgPrimary/80 dark:bg-dark-bgPrimary/80 p-3 rounded-full shadow-lg border border-light-cardBorder dark:border-dark-cardBorder hover:bg-light-textAccent dark:hover:bg-dark-textAccent hover:text-light-buttonText dark:hover:text-dark-buttonText transition-all duration-300 backdrop-blur-sm"
                aria-label="Next projects"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          
          {/* Projects Container */}
          <div 
            ref={galleryRef}
            className="floating-stream flex flex-wrap justify-center gap-6 perspective-[1200px]"
          >
            {visibleProjects.map((project, index) => {
              // Assign depth layers
              const depthLayer = index % 3;
              let cardStyle = {};
              
              switch(depthLayer) {
                case 0: // Foreground
                  cardStyle = { 
                    transform: 'translateZ(20px) rotateY(1deg)',
                    zIndex: 30
                  };
                  break;
                case 1: // Midground
                  cardStyle = { 
                    transform: 'translateZ(10px) rotateY(0.7deg)',
                    zIndex: 20
                  };
                  break;
                case 2: // Background
                  cardStyle = { 
                    transform: 'translateZ(0px) rotateY(0.3deg)',
                    zIndex: 10
                  };
                  break;
                default:
                  cardStyle = { 
                    transform: 'translateZ(0px) rotateY(0.3deg)',
                    zIndex: 10
                  };
              }
              
              return (
                <motion.div
                  key={project.id}
                  className="project-card relative group flex-shrink-0 w-full sm:w-[280px] md:w-[300px]"
                  style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d',
                    ...cardStyle
                  }}
                  whileHover={{ 
                    z: 30,
                    scale: 1.02,
                    transition: { duration: 0.2, type: "spring", stiffness: 80, damping: 12 }
                  }}
                >
                  {/* Coral glow border - using CSS variables for theme consistency */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-light-textAccent to-light-textHighlight dark:from-dark-textAccent dark:to-dark-textHighlight opacity-0 group-hover:opacity-40 blur-sm transition-all duration-300 -z-10"></div>
                  
                  {/* Main card with frosted glass effect */}
                  <div 
                    className="relative bg-light-cardBg/80 dark:bg-dark-cardBg/80 rounded-2xl overflow-hidden shadow-lg border border-light-cardBorder dark:border-dark-cardBorder transition-all duration-300 backdrop-blur-sm"
                    style={{
                      transform: 'translateZ(0px)',
                    }}
                  >
                    {/* Project image/video placeholder */}
                    <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
                      <div className="bg-gray-200 border-2 border-dashed w-full h-full" />
                      
                      {/* Action buttons - visible on mobile, hover on desktop */}
                      <div className="absolute inset-0 flex items-end p-3">
                        <div className="flex gap-2 w-full sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <a 
                            href={project.liveUrl} 
                            className="bg-light-bgPrimary dark:bg-dark-bgPrimary p-2 rounded-full text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-textAccent dark:hover:bg-dark-textAccent hover:text-light-buttonText dark:hover:text-dark-buttonText transition-colors shadow-md flex-1 flex justify-center"
                            aria-label={`View ${project.title} live`}
                          >
                            <ExternalLink size={16} />
                            <span className="ml-2 hidden sm:inline"></span>
                          </a>
                          <a 
                            href={project.githubUrl} 
                            className="bg-light-bgPrimary dark:bg-dark-bgPrimary p-2 rounded-full text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-textAccent dark:hover:bg-dark-textAccent hover:text-light-buttonText dark:hover:text-dark-buttonText transition-colors shadow-md flex-1 flex justify-center"
                            aria-label={`View ${project.title} source code`}
                          >
                            <Github size={16} />
                            <span className="ml-2 hidden sm:inline"></span>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project details */}
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-bold text-light-textPrimary dark:text-dark-textPrimary font-heading">
                          {project.title}
                        </h3>
                        <span className="text-xs font-semibold bg-light-textAccent/20 dark:bg-dark-textAccent/20 text-light-textAccent dark:text-dark-textAccent px-2 py-1 rounded-full whitespace-nowrap">
                          {project.role}
                        </span>
                      </div>
                      
                      <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4 text-sm font-body">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-light-bgSecondary/50 dark:bg-dark-bgSecondary/50 text-light-textMuted dark:text-dark-textMuted text-xs px-3 py-1 rounded-full font-body backdrop-blur-md border border-light-cardBorder/30 dark:border-dark-cardBorder/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentPage === index
                      ? 'bg-light-textAccent dark:bg-dark-textAccent scale-125'
                      : 'bg-light-textMuted/30 dark:bg-dark-textMuted/30 hover:bg-light-textMuted/50 dark:hover:bg-dark-textMuted/50'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) translateX(3px) rotate(45deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(90deg);
          }
        }
        
        .floating-stream {
          perspective: 1200px;
        }
        
        .project-card {
          transform-style: preserve-3d;
          transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        @media (max-width: 640px) {
          .floating-stream {
            gap: 1.25rem;
          }
          
          .project-card {
            width: 100%;
            max-width: 100%;
          }
          
          /* Show buttons on mobile by default */
          .project-card .flex.opacity-0 {
            opacity: 1 !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .project-card {
            width: calc(50% - 1rem);
            max-width: 280px;
          }
        }
        
        @media (min-width: 769px) {
          .project-card {
            width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;