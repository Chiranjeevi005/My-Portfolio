'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const triggers = useRef<ScrollTrigger[]>([]);

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkMode);
    };
    
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Refresh ScrollTrigger on resize or theme change
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Track mouse movement for parallax effect (desktop only)
  useEffect(() => {
    if (deviceType !== 'desktop') return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [deviceType]);

  // Apply parallax effect based on mouse position (desktop only)
  useEffect(() => {
    if (deviceType !== 'desktop' || !backgroundElementsRef.current) return;
    
    const elements = backgroundElementsRef.current.querySelectorAll('.parallax-element');
    elements.forEach((element, index) => {
      const speed = (index + 1) * 0.05;
      const x = (mousePosition.x / window.innerWidth - 0.5) * speed * 100;
      const y = (mousePosition.y / window.innerHeight - 0.5) * speed * 100;
      
      gsap.to(element, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }, [mousePosition, deviceType]);

  // Add floating animations for background elements with device-specific settings
  useEffect(() => {
    if (!backgroundElementsRef.current) return;
    
    const elements = backgroundElementsRef.current.querySelectorAll('.floating-element');
    if (elements.length === 0) return;
    
    // Clean up any existing animations
    elements.forEach(element => {
      gsap.killTweensOf(element);
    });
    
    if (deviceType === 'mobile') {
      // Simplified floating animation for mobile to reduce performance impact
      elements.forEach((element, index) => {
        gsap.to(element, {
          y: -5,
          repeat: -1,
          duration: 3 + index * 0.5,
          ease: 'none'
        });
      });
    } else if (deviceType === 'tablet') {
      // Moderate floating animation for tablet
      elements.forEach((element, index) => {
        gsap.to(element, {
          y: -10,
          repeat: -1,
          duration: 4 + index,
          ease: 'none'
        });
      });
    } else {
      // Full floating animation for desktop
      elements.forEach((element, index) => {
        gsap.to(element, {
          y: -10,
          repeat: -1,
          duration: 4 + index,
          ease: 'none'
        });
      });
    }
    
    // Cleanup function
    return () => {
      elements.forEach(element => {
        gsap.killTweensOf(element);
      });
    };
  }, [deviceType]);

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
    // Clean up previous triggers
    triggers.current.forEach(trigger => trigger.kill());
    triggers.current = [];

    if (typeof window !== 'undefined' && containerRef.current) {
      // Set initial visibility for background elements
      if (backgroundElementsRef.current) {
        const elements = backgroundElementsRef.current.querySelectorAll('.floating-element, .parallax-element');
        elements.forEach((element) => {
          // Set base opacity based on theme
          gsap.set(element, {
            opacity: isDarkMode ? 0.1 : 0.05,
          });
        });
      }

      // Force refresh ScrollTrigger to ensure proper initialization
      ScrollTrigger.refresh();

      // Check if element is already in viewport
      const isInViewport = (element: Element) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
      };
      
      // Set initial state for elements already in viewport
      const setInitialIfVisible = (element: Element | null) => {
        if (!element || !isInViewport(element)) return false;
        gsap.set(element, { opacity: 1, y: 0 });
        return true;
      };

      // Animate section title with device-specific timing
      const title = containerRef.current.querySelector('.section-title');
      if (title) {
        if (!setInitialIfVisible(title)) {
          // Otherwise, use ScrollTrigger animation
          const trigger = ScrollTrigger.create({
            trigger: title,
            start: deviceType === 'mobile' ? 'top 90%' : 'top 85%',
            toggleActions: 'play none none reverse',
            animation: gsap.fromTo(
              title,
              { opacity: 0, y: deviceType === 'mobile' ? 20 : 30 },
              {
                opacity: 1,
                y: 0,
                duration: deviceType === 'mobile' ? 0.4 : deviceType === 'tablet' ? 0.6 : 0.8,
                ease: deviceType === 'mobile' ? 'power1.out' : 'power2.out'
              }
            )
          });
          triggers.current.push(trigger);
        } else {
          // Ensure element is fully visible if already in viewport
          gsap.set(title, { opacity: 1, y: 0 });
        }
      }

      // Animate project cards with device-specific settings
      const projectCards = containerRef.current.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        // Reduce animation complexity on mobile
        if (deviceType === 'mobile') {
          if (!setInitialIfVisible(card)) {
            // Simplified animation for mobile
            const trigger = ScrollTrigger.create({
              trigger: card,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
              animation: gsap.fromTo(
                card,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: 'power1.out'
                }
              )
            });
            triggers.current.push(trigger);
          } else {
            // Ensure element is fully visible if already in viewport
            gsap.set(card, { opacity: 1, y: 0 });
          }
        } else {
          if (!setInitialIfVisible(card)) {
            // Full animation for tablet and desktop
            const trigger = ScrollTrigger.create({
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
              animation: gsap.fromTo(
                card,
                { opacity: 0, y: deviceType === 'tablet' ? 30 : 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: deviceType === 'tablet' ? 0.6 : 0.8,
                  delay: deviceType === 'tablet' ? index * 0.1 : index * 0.15,
                  ease: 'power2.out'
                }
              )
            });
            triggers.current.push(trigger);
          } else {
            // Ensure element is fully visible if already in viewport
            gsap.set(card, { opacity: 1, y: 0 });
          }
        }

        // Add hover effect to project cards (desktop only)
        if (deviceType === 'desktop') {
          const mouseEnterHandler = () => {
            gsap.to(card, {
              y: -10,
              duration: 0.3,
              ease: 'power2.out'
            });
          };

          const mouseLeaveHandler = () => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          };

          card.addEventListener('mouseenter', mouseEnterHandler);
          card.addEventListener('mouseleave', mouseLeaveHandler);

          // Cleanup event listeners
          return () => {
            card.removeEventListener('mouseenter', mouseEnterHandler);
            card.removeEventListener('mouseleave', mouseLeaveHandler);
          };
        }
      });

      // Animate buttons (desktop only)
      if (deviceType === 'desktop') {
        const buttons = containerRef.current.querySelectorAll('.view-button, .github-button');
        buttons.forEach((button) => {
          const underline = button.querySelector('.button-underline');
          
          const mouseEnterHandler = () => {
            if (underline) {
              gsap.to(underline, {
                width: '100%',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          };

          const mouseLeaveHandler = () => {
            if (underline) {
              gsap.to(underline, {
                width: '0%',
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          };

          button.addEventListener('mouseenter', mouseEnterHandler);
          button.addEventListener('mouseleave', mouseLeaveHandler);

          // Cleanup event listeners
          return () => {
            button.removeEventListener('mouseenter', mouseEnterHandler);
            button.removeEventListener('mouseleave', mouseLeaveHandler);
          };
        });
      }
      
      // Force another refresh to ensure all triggers are properly initialized
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
    
    return () => {
      triggers.current.forEach(trigger => trigger.kill());
      triggers.current = [];
    };
  }, [isDarkMode, deviceType]);

  // Animation configuration based on device type
  const getAnimationConfig = () => {
    if (deviceType === 'mobile') {
      return {
        duration: 0.4,
        delayFactor: 0.1,
        easing: 'power1.out'
      };
    } else if (deviceType === 'tablet') {
      return {
        duration: 0.6,
        delayFactor: 0.15,
        easing: 'power2.out'
      };
    } else {
      return {
        duration: 0.8,
        delayFactor: 0.2,
        easing: 'power2.out'
      };
    }
  };

  return (
    <section 
      ref={containerRef}
      className="py-16 sm:py-20 relative overflow-hidden"
    >
      {/* Background with theme support */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#1E1614] to-[#241A17]' 
          : 'bg-gradient-to-b from-[#FFF9F5] to-[#FFF1EB]'
      }`}></div>
      
      {/* Interactive background elements with parallax */}
      <div 
        ref={backgroundElementsRef}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Parallax floating elements (desktop only) */}
        {deviceType === 'desktop' && (
          <>
            <div className="parallax-element absolute top-[10%] left-[5%] w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#FFA88C]"></div>
            <div className="parallax-element absolute top-[25%] right-[15%] w-4 h-4 sm:w-5 sm:h-5 rotate-45 bg-white border border-[#FFA88C]"></div>
            <div className="parallax-element absolute top-[40%] left-[20%] w-4 h-0.5 sm:w-6 sm:h-0.5 bg-[#FFA88C]"></div>
            <div className="parallax-element absolute top-[60%] right-[25%] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white border border-[#FFA88C]"></div>
            <div className="parallax-element absolute top-[75%] left-[10%] w-3 h-3 sm:w-4 sm:h-4 rotate-12 bg-[#FFA88C]"></div>
          </>
        )}
        
        {/* Subtle animated particles (all devices) */}
        <div className="floating-element absolute top-[15%] left-[15%] w-1 h-1 rounded-full bg-[#FFA88C]"></div>
        <div className="floating-element absolute top-[20%] right-[20%] w-1 h-1 rounded-full bg-[#FFA88C]"></div>
        <div className="floating-element absolute top-[50%] left-[25%] w-1 h-1 rounded-full bg-[#FFA88C]"></div>
        <div className="floating-element absolute top-[65%] right-[15%] w-1 h-1 rounded-full bg-[#FFA88C]"></div>
        <div className="floating-element absolute top-[80%] left-[30%] w-1 h-1 rounded-full bg-[#FFA88C]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className={`section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-center font-heading ${
          isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
        }`}>
          Work That Matters
        </h2>
        
        <p className={`text-lg md:text-xl max-w-3xl mx-auto text-center mb-12 sm:mb-16 transition-colors duration-700 ${
          isDarkMode ? 'text-[#DAB9A0]' : 'text-[#5A3E36]'
        }`}>
          Blending technical mastery with business vision — every project reflects an idea built to inspire, scale, and create real impact.
        </p>
        
        <div className="space-y-12 sm:space-y-16">
          {/* Project 1 - Responsive grid layout (same as Projects 2 & 3) */}
          <div 
            key={projects[0].id}
            className="project-card rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-700 hover:shadow-2xl backdrop-blur-md border sm:hidden"
          >
            <div className={`rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-700 hover:shadow-2xl backdrop-blur-md border ${
              isDarkMode 
                ? 'bg-[#241A17]/70 border-[#3C2E2A]' 
                : 'bg-white/70 border-white/50'
            }`}>
              <div className="project-image h-32 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 transform transition-transform duration-500 hover:scale-105">
                <div className="w-full h-full bg-gradient-to-r from-[#FF8A5C] to-[#FFA88C] flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-base">
                    {projects[0].title} Preview
                  </span>
                </div>
              </div>
              
              <div className="project-text">
                <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold rounded-full mb-2 sm:mb-3 ${
                  isDarkMode 
                    ? 'bg-[#FF8A5C]/10 text-[#FF8A5C]' 
                    : 'bg-[#FFA88C]/10 text-[#E85D45]'
                }`}>
                  {projects[0].role}
                </span>
                <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${
                  isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                }`}>
                  {projects[0].title}
                </h3>
                <p className={`text-xs sm:text-sm mb-4 ${
                  isDarkMode ? 'text-[#DAB9A0]' : 'text-[#2A2A2A]/80'
                }`}>
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button className={`view-button px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium group relative flex items-center ${
                    isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                  }`}>
                    <ExternalLink size={14} className="mr-1" />
                    View
                    <span className={`button-underline absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full ${
                      isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                    }`}></span>
                  </button>
                  <button className={`github-button px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium group relative flex items-center ${
                    isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                  }`}>
                    <Github size={14} className="mr-1" />
                    Code
                    <span className={`button-underline absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full ${
                      isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                    }`}></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project 1 - Full width with responsive layout (desktop/tablet view) */}
          <div 
            key={`${projects[0].id}-desktop`}
            className="project-card relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] hidden sm:block"
          >
            {/* Project image with responsive positioning */}
            <div 
              className={`project-image absolute w-full sm:w-3/4 h-[300px] sm:h-[400px] md:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 left-0`}
              style={{
                top: '0',
                clipPath: 'none',
              }}
            >
              <div className="w-full h-full bg-gradient-to-r from-[#FF8A5C] to-[#FFA88C] flex items-center justify-center transform transition-transform duration-500 hover:scale-105">
                <span className="text-white font-bold text-lg sm:text-xl md:text-2xl">
                  {projects[0].title} Preview
                </span>
              </div>
            </div>
            
            {/* Project information panel with responsive positioning */}
            <div 
              className={`project-text absolute w-full sm:w-2/5 p-6 sm:p-8 rounded-2xl border shadow-xl transition-all duration-700 right-0 sm:right-4 md:right-10 backdrop-blur-md ${
                isDarkMode 
                  ? 'bg-[#241A17]/70 border-[#3C2E2A]' 
                  : 'bg-white/70 border-white/50'
              }`}
              style={{
                top: '200px',
              }}
            >
              <div className="max-w-md">
                <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4 ${
                  isDarkMode 
                    ? 'bg-[#FF8A5C]/10 text-[#FF8A5C]' 
                    : 'bg-[#FFA88C]/10 text-[#E85D45]'
                }`}>
                  {projects[0].role}
                </span>
                <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 ${
                  isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                }`}>
                  {projects[0].title}
                </h3>
                <p className={`text-sm sm:text-base mb-4 sm:mb-6 ${
                  isDarkMode ? 'text-[#DAB9A0]' : 'text-[#2A2A2A]/80'
                }`}>
                  {projects[0].description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className={`view-button px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium group relative flex items-center ${
                    isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                  }`}>
                    <ExternalLink size={16} className="mr-2" />
                    View Project
                    <span className={`button-underline absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full ${
                      isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                    }`}></span>
                  </button>
                  <button className={`github-button px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium group relative flex items-center ${
                    isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                  }`}>
                    <Github size={16} className="mr-2" />
                    GitHub
                    <span className={`button-underline absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full ${
                      isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                    }`}></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Projects 2 & 3 - Responsive grid layout */}
          <div className="project-card grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {projects.slice(1).map((project, _index) => (
              <div 
                key={project.id}
                className={`rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-700 hover:shadow-2xl backdrop-blur-md border ${
                  isDarkMode 
                    ? 'bg-[#241A17]/70 border-[#3C2E2A]' 
                    : 'bg-white/70 border-white/50'
                }`}
              >
                <div className="project-image h-32 sm:h-40 md:h-48 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 transform transition-transform duration-500 hover:scale-105">
                  <div className="w-full h-full bg-gradient-to-r from-[#FF8A5C] to-[#FFA88C] flex items-center justify-center">
                    <span className="text-white font-bold text-sm sm:text-base">
                      {project.title} Preview
                    </span>
                  </div>
                </div>
                
                <div className="project-text">
                  <span className={`inline-block px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-semibold rounded-full mb-2 sm:mb-3 ${
                    isDarkMode 
                      ? 'bg-[#FF8A5C]/10 text-[#FF8A5C]' 
                      : 'bg-[#FFA88C]/10 text-[#E85D45]'
                  }`}>
                    {project.role}
                  </span>
                  <h3 className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-xs sm:text-sm mb-4 ${
                    isDarkMode ? 'text-[#DAB9A0]' : 'text-[#2A2A2A]/80'
                  }`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button className={`view-button px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium group relative flex items-center ${
                      isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                    }`}>
                      <ExternalLink size={14} className="mr-1" />
                      View
                      <span className={`button-underline absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full ${
                        isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                      }`}></span>
                    </button>
                    <button className={`github-button px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium group relative flex items-center ${
                      isDarkMode ? 'text-[#F6E8D8]' : 'text-[#2A2A2A]'
                    }`}>
                      <Github size={14} className="mr-1" />
                      Code
                      <span className={`button-underline absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full ${
                        isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                      }`}></span>
                    </button>
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

export default FeaturedWork;