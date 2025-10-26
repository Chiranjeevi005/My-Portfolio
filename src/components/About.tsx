'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { GraduationCap, Server, Bot, Laptop, Rocket, ChevronUp, ChevronDown } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundElementsRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const _timelinePathRef = useRef<SVGPathElement>(null);
  const skillCardRefs = useRef<HTMLDivElement[]>([]);
  const milestoneRefs = useRef<HTMLDivElement[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const triggers = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const darkMode = document.documentElement.classList.contains('dark');
      setIsDarkMode(darkMode);
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Highlight active card
    skillCardRefs.current.forEach((card, index) => {
      if (index === activeCardIndex) {
        gsap.to(card, {
          boxShadow: isDarkMode 
            ? '0 0 25px rgba(255, 138, 92, 0.6)' 
            : '0 0 25px rgba(232, 93, 69, 0.5)',
          scale: 1.02,
          duration: 0.3
        });
      } else {
        gsap.to(card, {
          boxShadow: 'none',
          scale: 1,
          duration: 0.3
        });
      }
    });
  }, [activeCardIndex, isDarkMode]);

  // Add floating animations for background elements with device-specific settings
  useEffect(() => {
    if (!backgroundElementsRef.current) return;
    
    const elements = backgroundElementsRef.current.querySelectorAll('.floating-element');
    if (elements.length === 0) return;
    
    // Clean up any existing animations
    elements.forEach(element => {
      gsap.killTweensOf(element);
    });
    
    if (window.innerWidth < 768) {
      // Simplified floating animation for mobile to reduce performance impact
      elements.forEach((element, index) => {
        gsap.to(element, {
          y: -5,
          repeat: -1,
          duration: 3 + index * 0.5,
          ease: 'none'
        });
      });
    } else if (window.innerWidth < 1024) {
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
  }, [isDarkMode]);

  useEffect(() => {
    // Add a small delay to ensure elements are rendered
    const timer = setTimeout(() => {
      // Clean up previous triggers
      triggers.current.forEach(trigger => trigger.kill());
      triggers.current = [];

      if (typeof window !== 'undefined' && sectionRef.current) {
        // Set initial visibility for background elements
        if (backgroundElementsRef.current) {
          const elements = backgroundElementsRef.current.querySelectorAll('.floating-element');
          elements.forEach((element) => {
            // Set base opacity based on theme
            gsap.set(element, {
              opacity: isDarkMode ? 0.15 : 0.1,
            });
            
            // Reduce animation intensity on mobile
            if (window.innerWidth < 768) {
              // Simplified animation for mobile
              gsap.set(element, {
                y: 0,
                rotation: 0
              });
            }
          });
        }
        
        // Force refresh ScrollTrigger to ensure proper initialization
        ScrollTrigger.refresh();
        
        // Check if element is already in viewport
        const isInViewport = (element: Element | null) => {
          if (!element) return false;
          const rect = element.getBoundingClientRect();
          return rect.top < window.innerHeight && rect.bottom >= 0;
        };
        
        // Set initial state for elements already in viewport
        const setInitialIfVisible = (element: Element | null) => {
          if (isInViewport(element)) {
            gsap.set(element, { opacity: 1, y: 0 });
            return true;
          }
          return false;
        };

        // Animate headline with device-specific settings
        if (headlineRef.current) {
          if (!setInitialIfVisible(headlineRef.current)) {
            // Otherwise, use ScrollTrigger animation
            const trigger = ScrollTrigger.create({
              trigger: headlineRef.current,
              start: window.innerWidth < 768 ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none reverse',
              animation: gsap.fromTo(
                headlineRef.current,
                { 
                  opacity: 0,
                  y: window.innerWidth < 768 ? 20 : 30,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: window.innerWidth < 768 ? 0.4 : 0.8,
                  ease: window.innerWidth < 768 ? 'power1.out' : 'power2.out'
                }
              )
            });
            triggers.current.push(trigger);
          } else {
            // Ensure element is fully visible if already in viewport
            gsap.set(headlineRef.current, { opacity: 1, y: 0 });
          }
        }
        
        // Animate subtext with device-specific settings
        if (subtextRef.current) {
          if (!setInitialIfVisible(subtextRef.current)) {
            // Otherwise, use ScrollTrigger animation
            const trigger = ScrollTrigger.create({
              trigger: subtextRef.current,
              start: window.innerWidth < 768 ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none reverse',
              animation: gsap.fromTo(
                subtextRef.current,
                { 
                  opacity: 0,
                  y: window.innerWidth < 768 ? 15 : 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: window.innerWidth < 768 ? 0.4 : 0.8,
                  delay: window.innerWidth < 768 ? 0.1 : 0.2,
                  ease: window.innerWidth < 768 ? 'power1.out' : 'power2.out'
                }
              )
            });
            triggers.current.push(trigger);
          } else {
            // Ensure element is fully visible if already in viewport
            gsap.set(subtextRef.current, { opacity: 1, y: 0 });
          }
        }
        
        // Animate content container with device-specific settings
        if (contentContainerRef.current) {
          if (!setInitialIfVisible(contentContainerRef.current)) {
            // Otherwise, use ScrollTrigger animation
            const trigger = ScrollTrigger.create({
              trigger: contentContainerRef.current,
              start: window.innerWidth < 768 ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none reverse',
              animation: gsap.fromTo(
                contentContainerRef.current,
                { 
                  opacity: 0,
                  y: window.innerWidth < 768 ? 30 : 40,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: window.innerWidth < 768 ? 0.4 : 0.8,
                  delay: window.innerWidth < 768 ? 0.2 : 0.4,
                  ease: window.innerWidth < 768 ? 'power1.out' : 'power2.out'
                }
              )
            });
            triggers.current.push(trigger);
          } else {
            // Ensure element is fully visible if already in viewport
            gsap.set(contentContainerRef.current, { opacity: 1, y: 0 });
          }
        }
        
        // Animate timeline container with device-specific settings
        if (timelineContainerRef.current) {
          if (!setInitialIfVisible(timelineContainerRef.current)) {
            // Otherwise, use ScrollTrigger animation
            const trigger = ScrollTrigger.create({
              trigger: timelineContainerRef.current,
              start: window.innerWidth < 768 ? 'top 90%' : 'top 85%',
              toggleActions: 'play none none reverse',
              animation: gsap.fromTo(
                timelineContainerRef.current,
                { 
                  opacity: 0,
                  y: window.innerWidth < 768 ? 30 : 40,
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: window.innerWidth < 768 ? 0.4 : 0.8,
                  delay: window.innerWidth < 768 ? 0.3 : 0.6,
                  ease: window.innerWidth < 768 ? 'power1.out' : 'power2.out'
                }
              )
            });
            triggers.current.push(trigger);
          } else {
            // Ensure element is fully visible if already in viewport
            gsap.set(timelineContainerRef.current, { opacity: 1, y: 0 });
          }
        }
        
        // Animate central timeline with device-specific settings
        const timelineElement = timelineContainerRef.current?.querySelector('div.absolute > div');
        if (timelineElement && timelineContainerRef.current) {
          if (!setInitialIfVisible(timelineContainerRef.current)) {
            // Otherwise, use ScrollTrigger animation
            const trigger = ScrollTrigger.create({
              trigger: timelineContainerRef.current,
              start: window.innerWidth < 768 ? 'top 85%' : 'top 80%',
              toggleActions: 'play none none reverse',
              animation: gsap.fromTo(
                timelineElement,
                { scaleY: 0 },
                {
                  scaleY: 1,
                  duration: window.innerWidth < 768 ? 0.6 : 1.2,
                  ease: 'power2.out',
                }
              )
            });
            triggers.current.push(trigger);
          } else {
            // Ensure element is fully visible if already in viewport
            gsap.set(timelineElement, { scaleY: 1 });
          }
        }
        
        // Animate milestones with staggered timeline effect and device-specific settings
        if (milestoneRefs.current.length > 0 && timelineContainerRef.current) {
          milestoneRefs.current.forEach((milestone, index) => {
            // Animate milestone card
            const card = milestone.querySelector('div.relative');
            if (card) {
              if (window.innerWidth < 768) {
                if (!setInitialIfVisible(timelineContainerRef.current)) {
                  // Simplified animation for mobile
                  const trigger = ScrollTrigger.create({
                    trigger: timelineContainerRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    animation: gsap.fromTo(
                      card,
                      { 
                        opacity: 0,
                        x: index % 2 === 0 ? -20 : 20,
                      },
                      {
                        opacity: 1,
                        x: 0,
                        duration: 0.4,
                        delay: 0.1 + index * 0.05,
                        ease: 'power1.out'
                      }
                    )
                  });
                  triggers.current.push(trigger);
                } else {
                  // Ensure element is fully visible if already in viewport
                  gsap.set(card, { opacity: 1, x: 0 });
                }
              } else {
                if (!setInitialIfVisible(timelineContainerRef.current)) {
                  // Full animation for tablet and desktop
                  const trigger = ScrollTrigger.create({
                    trigger: timelineContainerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                    animation: gsap.fromTo(
                      card,
                      { 
                        opacity: 0,
                        x: index % 2 === 0 ? -30 : 30,
                      },
                      {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: 0.5 + index * 0.15,
                        ease: 'power2.out'
                      }
                    )
                  });
                  triggers.current.push(trigger);
                } else {
                  // Ensure element is fully visible if already in viewport
                  gsap.set(card, { opacity: 1, x: 0 });
                }
              }
            }
          });
        }
        
        // Force another refresh to ensure all triggers are properly initialized
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    }, 100); // Small delay to ensure elements are rendered
    
    return () => {
      clearTimeout(timer);
      triggers.current.forEach(trigger => trigger.kill());
      triggers.current = [];
    };
  }, [isDarkMode]);

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

  // Function to handle navigation
  const goToPreviousCard = () => {
    setActiveCardIndex(prev => Math.max(0, prev - 1));
  };

  const goToNextCard = () => {
    setActiveCardIndex(prev => Math.min(3, prev + 1));
  };

  // Skill cards data with detailed descriptions
  const skillCards = [
    {
      id: 1,
      title: "Business Intelligence Meets Code",
      description: "Strategic thinking fused with technical execution",
      details: "With a Bachelor of Business Administration foundation and hands-on experience as a Full-Stack Developer, I uniquely combine business strategy and coding expertise. I understand how user behavior, market dynamics, and business goals intersect, and I translate these insights into technical solutions. Every project I build is not just functional — it's designed to create measurable business impact while maintaining clean, scalable code."
    },
    {
      id: 2,
      title: "Full-Stack Craftsmanship",
      description: "Building robust, scalable digital solutions",
      details: "Leveraging my experience as a Full-Stack Developer and passion for AI-driven projects, I build end-to-end digital solutions that are both technically robust and user-focused. I specialize in frontend development with Next.js and TailwindCSS, and backend development using Supabase and Node.js for scalable, maintainable systems. I emphasize clean architecture, reusable components, and performance optimization, ensuring that every project — from interactive dashboards to portfolio apps — scales seamlessly and delivers measurable impact."
    },
    {
      id: 3,
      title: "AI & Automation Enthusiast",
      description: "Exploring future technologies and intelligent systems",
      details: "I’m deeply passionate about applying AI and automation to create smarter, business-aware digital solutions. From predictive models that anticipate user behavior to automation workflows that optimize app performance, I combine my Full-Stack expertise (Next.js, Tailwind, Supabase) with my BBA background to ensure technology decisions align with business goals. My focus is on building intelligent, scalable systems that not only demonstrate technical innovation but also deliver measurable impact and efficiency for real-world applications."
    },
    {
      id: 4,
      title: "Entrepreneurial Spirit",
      description: "Innovation through market-driven insights",
      details: "My business administration foundation (BBA) fuels an entrepreneurial mindset that shapes every project I build. I approach development with a founder’s perspective, focusing on validating ideas, iterating based on user feedback, and delivering MVPs that solve real problems. By combining this with my Full-Stack skills (Next.js, Tailwind, Supabase) and AI exploration, I craft scalable, user-centric digital solutions that are technically robust and strategically aligned. I think like a business leader, code like a developer, and innovate like an entrepreneur."
    }
  ];

  // Professional milestone data 
  const milestones = [
    {
      id: 1,
      icon: 'GraduationCap',
      title: 'BBA Degree',
      subtitle: 'Strategic Business Foundation',
      description: 'Built a strong foundation in strategic thinking, business logic, and market insight.',
      position: 'left'
    },
    {
      id: 2,
      icon: 'Server',
      title: 'Full-Stack Skills',
      subtitle: 'End-to-End Development',
      description: 'Mastered end-to-end web development from concept to deployment.',
      position: 'right'
    },
    {
      id: 3,
      icon: 'Bot',
      title: 'AI & Automation',
      subtitle: 'Intelligent Solutions',
      description: 'Developed data-driven applications and intelligent workflows.',
      position: 'left'
    },
    {
      id: 4,
      icon: 'Laptop',
      title: 'Full-Stack Developer – Nxtwave',
      subtitle: 'Real-World Projects',
      description: 'Delivered scalable, maintainable digital solutions for real-world projects.',
      position: 'right'
    },
    {
      id: 5,
      icon: 'Rocket',
      title: 'Entrepreneurial Mindset',
      subtitle: 'Impact-Driven Innovation',
      description: 'Combines strategy and innovation to build impactful, user-centric solutions.',
      position: 'left'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative section min-h-screen flex items-center overflow-hidden py-12 sm:py-16 md:py-20"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#181210] via-[#1E1614] to-[#241A17]' 
          : 'bg-gradient-to-br from-[#FFF9F3] via-[#FFF3E9] to-[#FFFFFF]'
      }`} />
      
      {/* Floating background elements */}
      <div 
        ref={backgroundElementsRef}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Code symbols */}
        <div className="floating-element absolute top-1/6 left-4 sm:left-6 md:left-10 text-2xl sm:text-3xl md:text-4xl font-mono text-[#FF8A5C]">
          {'{'}
        </div>
        <div className="floating-element absolute top-1/4 right-1/5 text-lg sm:text-xl md:text-2xl font-mono text-[#FF8A5C]">
          1
        </div>
        <div className="floating-element absolute top-1/3 left-1/10 text-xl sm:text-2xl md:text-3xl font-mono text-[#FF8A5C]">
          ;
        </div>
        <div className="floating-element absolute top-2/5 right-1/4 text-base sm:text-lg md:text-xl font-mono text-[#FF8A5C]">
          {'}'}
        </div>
        <div className="floating-element absolute top-1/2 left-1/12 text-lg sm:text-xl md:text-2xl font-mono text-[#FF8A5C]">
          0
        </div>
        
        {/* Business motifs */}
        <div className="floating-element absolute top-1/5 right-1/6 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-2 border-[#FF8A5C]"></div>
        <div className="floating-element absolute top-2/5 left-1/4 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 rotate-45 border-2 border-[#FF8A5C]"></div>
        <div className="floating-element absolute top-1/2 right-1/3 w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg border-2 border-[#FF8A5C]"></div>
        <div className="floating-element absolute top-3/4 left-1/6 w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rotate-12 border-2 border-[#FF8A5C]"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center">
          {/* Top Section - About Me */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 w-full max-w-4xl">
            <h2 
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700"
            >
              The Mind Behind the Interface
            </h2>
          </div>
          
          {/* New "Integrated Identity" Section */}
          <div className="w-full max-w-[1200px] mx-auto py-8 px-8 md:px-20 mb-16">
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-20 items-center px-4 sm:px-6">
              {/* Portrait Zone */}
              <div className="relative flex-1 flex justify-center">
                {/* Floating particles/spark effects */}
                <div className="absolute inset-0">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-20 mix-blend-overlay animate-pulse"
                      style={{
                        backgroundColor: isDarkMode ? '#FF8A5C' : '#E85D45',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Portrait with glow effect */}
                <div className="relative group">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl shadow-[0_0_60px_rgba(255,138,92,0.25)] opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Portrait image */}
                  <div 
                    className="relative w-64 h-[455px] sm:w-80 sm:h-[569px] md:w-[400px] md:h-[711px] lg:w-[450px] lg:h-[800px] rounded-2xl overflow-hidden transform transition-all duration-600 group-hover:translate-y-[-4px] group-hover:scale-[1.02]"
                    style={{
                      maskImage: 'linear-gradient(to right, transparent 0%, #FF8A5C 25%, #FF8A5C 75%, transparent 100%)'
                    }}
                  >
                    {/* Placeholder for portrait - in a real implementation, this would be an actual image */}
                    <div className={`w-full h-full ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-[#241A17] to-[#3C2E2A]' 
                        : 'bg-gradient-to-br from-[#FFF3E9] to-[#E8D5C8]'
                    } flex items-center justify-center`}>
                      <div className={`text-4xl font-bold ${
                        isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'
                      }`}>
                        CJ
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlapping text phrases - redesigned as signature-style elements */}
                  <div className="absolute inset-0">
                    {/* "Think in code." - top left, overlapping the portrait */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="absolute top-4 left-0 whitespace-nowrap z-10 transform -translate-x-1/2"
                      style={{
                        color: isDarkMode ? '#FFC48A' : '#D7745B',
                        textShadow: '0 0 15px rgba(255, 138, 92, 0.6)',
                        fontWeight: 600,
                        letterSpacing: '0.15em',
                        fontFamily: 'Great Vibes',
                        fontSize: 'clamp(1rem, 4vw, 2.2rem)' // responsive font size
                      }}
                    >
                      Think in code.
                    </motion.div>
                    
                    {/* "Build with intent." - middle left, rotated */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="absolute top-3/3 left-0 transform -translate-y-1/2 -translate-x-[10%] -rotate-90 origin-left whitespace-nowrap z-20 italic"
                      style={{
                        color: isDarkMode ? '#FF8A5C' : '#E85D45',
                        textShadow: '0 0 15px rgba(255, 138, 92, 0.6)',
                        fontWeight: 600,
                        letterSpacing: '0.01em',
                        fontFamily: 'Satoshi',
                        fontSize: 'clamp(1.5rem, 6vw, 2.7rem)' // responsive font size
                      }}
                    >
                      Build with intent.
                    </motion.div>
                    
                    {/* "Create with clarity." - bottom right, overlapping the portrait */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="absolute bottom-4 right-0 whitespace-nowrap z-10 transform translate-x-1/2"
                      style={{
                        color: isDarkMode ? '#FFC48A' : '#D7745B',
                        textShadow: '0 0 15px rgba(255, 138, 92, 0.6)',
                        fontWeight: 600,
                        letterSpacing: '0.11em',
                        fontFamily: 'Great Vibes',
                        fontSize: 'clamp(1rem, 4vw, 2.1rem)' // responsive font size
                      }}
                    >
                      Create with clarity.
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Text Zone */}
              <div className="flex-1 max-w-[480px] relative">
                {/* Vertical divider line */}
                <div className={`absolute left-[-2rem] top-0 h-[80%] w-0.5 opacity-40 ${
                  isDarkMode ? 'bg-[#3C2E2A]' : 'bg-[#E8D5C8]'
                }`}></div>
                
                <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed text-base md:text-lg">
                  👋 Namaste, I'm{' '}
                  <span className={`font-bold underline decoration-[1.5px] ${
                    isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'
                  }`}>
                    Chiran Jeevi
                  </span>{' '}
                  — where business strategy meets code craft. I turn complex market needs into robust, scalable digital solutions, merging analytical thinking with creative engineering to build systems that are both functional and strategic.
                  <br /><br />
                  A thinker who builds, a creator who analyzes, and a developer fluent in technical precision and visionary insights. I solve problems with hands-on coding expertise and data-driven decisions, ensuring every solution delivers real impact.
                  <br /><br />
                  I bridge boardroom logic with coding expertise, creating efficient, user-centric applications that elevate business value. Every project becomes a platform for innovation, growth, and seamless technology integration.
                </p>
              </div>
            </div>
          </div>
          
          {/* Two-column layout: Stacked Cards (Left) + Timeline (Right) */}
          <div 
            ref={contentContainerRef}
            className="flex flex-col lg:flex-row gap-8 sm:gap-12 md:gap-16 w-full max-w-7xl"
          >
            {/* Left Column - Stacked Skill Cards */}
            <div className="flex-1">
              <div className="mb-4 sm:mb-6 flex justify-between items-center">
                <h3 className="text-xl sm:text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                  Core Strengths
                </h3>
                {/* Navigation Arrows */}
                <div className="flex space-x-1 sm:space-x-2">
                  <button
                    onClick={goToPreviousCard}
                    disabled={activeCardIndex === 0}
                    className={`p-1 sm:p-2 rounded-full ${
                      activeCardIndex === 0
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover'
                    } ${
                      isDarkMode 
                        ? 'bg-[#241A17]/50 border border-[#3C2E2A]' 
                        : 'bg-[#FFF3E9]/50 border border-[#E8D5C8]'
                    }`}
                    aria-label="Previous card"
                  >
                    <ChevronUp 
                      size={16}
                      className={
                        isDarkMode 
                          ? 'text-[#FF8A5C]' 
                          : 'text-[#E85D45]'
                      } 
                    />
                  </button>
                  <button
                    onClick={goToNextCard}
                    disabled={activeCardIndex === skillCards.length - 1}
                    className={`p-1 sm:p-2 rounded-full ${
                      activeCardIndex === skillCards.length - 1
                        ? 'opacity-30 cursor-not-allowed'
                        : 'hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover'
                    } ${
                      isDarkMode 
                        ? 'bg-[#241A17]/50 border border-[#3C2E2A]' 
                        : 'bg-[#FFF3E9]/50 border border-[#E8D5C8]'
                    }`}
                    aria-label="Next card"
                  >
                    <ChevronDown 
                      size={16}
                      className={
                        isDarkMode 
                          ? 'text-[#FF8A5C]' 
                          : 'text-[#E85D45]'
                      } 
                    />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                {skillCards.map((card, index) => (
                  <div
                    key={card.id}
                    ref={(el) => { if (el) skillCardRefs.current[index] = el; }}
                    className={`p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-[#241A17]/50 border border-[#3C2E2A]' 
                        : 'bg-[#FFF3E9]/50 border border-[#E8D5C8]'
                    } backdrop-blur-sm shadow-lg ${
                      index === activeCardIndex 
                        ? (isDarkMode 
                            ? 'shadow-[0_0_25px_rgba(255,138,92,0.6)] scale-[1.02]' 
                            : 'shadow-[0_0_25px_rgba(232,93,69,0.5)] scale-[1.02]')
                        : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mt-1 sm:mt-2 mr-4 sm:mr-6 flex-shrink-0 ${
                        isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 text-[#FF8A5C]">{card.title}</h3>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4 sm:mb-6 text-base sm:text-lg">{card.description}</p>
                        {index === activeCardIndex && (
                          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-light-border dark:border-dark-border">
                            <p className="text-light-textSecondary dark:text-dark-textSecondary text-base sm:text-lg">
                              {card.details}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Minimalist card position indicators */}
              <div className="mt-6 sm:mt-8 flex justify-center">
                <div className="flex space-x-1 sm:space-x-2">
                  {skillCards.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        index === activeCardIndex
                          ? (isDarkMode ? 'bg-[#FF8A5C] w-4 sm:w-6' : 'bg-[#E85D45] w-4 sm:w-6')
                          : (isDarkMode ? 'bg-[#3C2E2A]' : 'bg-[#E8D5C8]')
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Subtle decorative element matching journey timeline */}
              <div className="mt-8 sm:mt-10 flex justify-center">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className={`w-2 h-0.5 sm:w-3 ${isDarkMode ? 'bg-[#3C2E2A]' : 'bg-[#E8D5C8]'}`}></div>
                  <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isDarkMode ? 'bg-[#FF8A5C]/50' : 'bg-[#E85D45]/50'}`}></div>
                  <div className={`w-2 h-0.5 sm:w-3 ${isDarkMode ? 'bg-[#3C2E2A]' : 'bg-[#E8D5C8]'}`}></div>
                </div>
              </div>
            </div>
            
            {/* Right Column - My Journey Timeline */}
            <div 
              ref={timelineContainerRef}
              className="flex-1"
            >
              <div className={`relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl h-full min-h-full ${
                isDarkMode 
                  ? 'bg-[#241A17]/40 border border-[#3C2E2A]' 
                  : 'bg-[#FFF3E9]/40 border border-[#E8D5C8]'
              } backdrop-blur-sm shadow-xl`}>
                <div className="flex items-center mb-6 sm:mb-8">
                  <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full mr-3 sm:mr-4 ${
                    isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                  }`}></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                    My Journey
                  </h3>
                </div>
                
                {/* Innovative roadmap design with synchronized milestones */}
                <div className="relative h-full min-h-[500px] sm:min-h-[600px] md:min-h-[750px] flex flex-col justify-between py-6 sm:py-8 md:py-12">
                  {/* Central timeline with gradient */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 sm:w-1 transform -translate-x-1/2">
                    <div className={`h-full w-full rounded-full ${isDarkMode ? 'bg-gradient-to-b from-[#FF8A5C]/20 via-[#FF8A5C] to-[#FF8A5C]/20' : 'bg-gradient-to-b from-[#E85D45]/20 via-[#E85D45] to-[#E85D45]/20'}`}></div>
                  </div>
                  
                  {/* Milestones with enhanced design */}
                  {milestones.map((milestone, index) => (
                    <div
                      key={milestone.id}
                      ref={(el) => {
                        if (el) milestoneRefs.current[index] = el;
                      }}
                      className={`relative flex items-center transition-all duration-500 ${
                        milestone.position === 'left' ? 'justify-start' : 'justify-end'
                      }`}
                      style={{
                        zIndex: 20 - index,
                      }}
                    >
                      {/* Connector line */}
                      <div className={`absolute h-0.5 ${milestone.position === 'left' ? 'left-1/2 right-0' : 'left-0 right-1/2'} ${isDarkMode ? 'bg-[#FF8A5C]/30' : 'bg-[#E85D45]/30'}`}></div>
                      
                      {/* Milestone content card */}
                      <div className={`relative w-7/12 p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#241A17]/90 border border-[#3C2E2A] shadow-lg' 
                          : 'bg-[#FFF3E9]/90 border border-[#E8D5C8] shadow-md'
                      } ${milestone.position === 'left' ? 'mr-6 sm:mr-12' : 'ml-6 sm:ml-12'}`}>
                        <div className="flex items-start mb-2 sm:mb-3">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg mr-2 sm:mr-3 ${
                            isDarkMode 
                              ? 'bg-[#241A17] border border-[#FF8A5C]' 
                              : 'bg-[#FFF3E9] border border-[#E85D45]'
                          }`}>
                            {milestone.icon === 'GraduationCap' && <GraduationCap size={16} className={`sm:w-5 sm:h-5 ${isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'}`} />}
                            {milestone.icon === 'Server' && <Server size={16} className={`sm:w-5 sm:h-5 ${isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'}`} />}
                            {milestone.icon === 'Bot' && <Bot size={16} className={`sm:w-5 sm:h-5 ${isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'}`} />}
                            {milestone.icon === 'Laptop' && <Laptop size={16} className={`sm:w-5 sm:h-5 ${isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'}`} />}
                            {milestone.icon === 'Rocket' && <Rocket size={16} className={`sm:w-5 sm:h-5 ${isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'}`} />}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#FF8A5C] text-base sm:text-lg">{milestone.title}</h4>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary font-medium text-xs sm:text-sm">{milestone.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary text-xs sm:text-sm">{milestone.description}</p>
                      </div>
                      
                      {/* Milestone dot on timeline */}
                      <div className={`absolute left-1/2 w-4 h-4 sm:w-6 sm:h-6 rounded-full transform -translate-x-1/2 flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-[#241A17] border-2 border-[#FF8A5C]' 
                          : 'bg-[#FFF3E9] border-2 border-[#E85D45]'
                      } shadow-lg`}>
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;