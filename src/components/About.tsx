'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Server, Bot, Laptop, Rocket } from 'lucide-react';

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
  const timelinePathRef = useRef<SVGPathElement>(null);
  const skillCardRefs = useRef<HTMLDivElement[]>([]);
  const milestoneRefs = useRef<HTMLDivElement[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

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
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveCardIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveCardIndex(prev => Math.min(3, prev + 1));
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('keydown', handleKeyDown);
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

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current) {
      // Animate background elements
      if (backgroundElementsRef.current) {
        const elements = backgroundElementsRef.current.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
          gsap.fromTo(
            element,
            { 
              opacity: 0,
              y: 50,
              rotation: 0,
            },
            {
              opacity: isDarkMode ? 0.15 : 0.1,
              y: 0,
              rotation: 360,
              duration: 2,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              }
            }
          );
          
          // Continuous floating animation
          gsap.to(element, {
            y: -20,
            rotation: 360,
            repeat: -1,
            duration: 15 + index * 2,
            ease: 'none'
          });
        });
      }
      
      // Animate headline
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { 
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
      
      // Animate subtext
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { 
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
      
      // Animate content container
      if (contentContainerRef.current) {
        gsap.fromTo(
          contentContainerRef.current,
          { 
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.4,
            scrollTrigger: {
              trigger: contentContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
      
      // Animate timeline container
      if (timelineContainerRef.current) {
        gsap.fromTo(
          timelineContainerRef.current,
          { 
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.6,
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
      
      // Animate central timeline
      const timelineElement = timelineContainerRef.current?.querySelector('div.absolute > div');
      if (timelineElement) {
        gsap.fromTo(
          timelineElement,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
      
      // Animate milestones with staggered timeline effect
      if (milestoneRefs.current.length > 0) {
        milestoneRefs.current.forEach((milestone, index) => {
          // Animate milestone card
          const card = milestone.querySelector('div.relative');
          if (card) {
            gsap.fromTo(
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
                scrollTrigger: {
                  trigger: timelineContainerRef.current,
                  start: 'top 80%',
                  toggleActions: 'play none none reverse',
                }
              }
            );
          }
          
          // Add hover effect only to the content card
          const contentCard = milestone.querySelector('div.relative');
          if (contentCard) {
            contentCard.addEventListener('mouseenter', () => {
              gsap.to(contentCard, {
                scale: 1.05,
                boxShadow: isDarkMode 
                  ? '0 0 20px rgba(255, 138, 92, 0.6)' 
                  : '0 0 20px rgba(232, 93, 69, 0.5)',
                duration: 0.3
              });
            });
            
            contentCard.addEventListener('mouseleave', () => {
              gsap.to(contentCard, {
                scale: 1,
                boxShadow: 'none',
                duration: 0.3
              });
            });
          }
        });
      }
      
      // Animate highlighted words
      const highlightWords = sectionRef.current.querySelectorAll('.highlight-word');
      highlightWords.forEach((word, index) => {
        gsap.fromTo(
          word,
          { 
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 1.0 + index * 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDarkMode]);

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
      className="relative section min-h-screen flex items-center overflow-hidden py-20"
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
        <div className="floating-element absolute top-1/6 left-10 text-4xl opacity-0 font-mono text-[#FF8A5C]">
          {'{'}
        </div>
        <div className="floating-element absolute top-1/4 right-1/5 text-2xl opacity-0 font-mono text-[#FF8A5C]">
          1
        </div>
        <div className="floating-element absolute top-1/3 left-1/10 text-3xl opacity-0 font-mono text-[#FF8A5C]">
          ;
        </div>
        <div className="floating-element absolute top-2/5 right-1/4 text-xl opacity-0 font-mono text-[#FF8A5C]">
          {'}'}
        </div>
        <div className="floating-element absolute top-1/2 left-1/12 text-2xl opacity-0 font-mono text-[#FF8A5C]">
          0
        </div>
        
        {/* Business motifs */}
        <div className="floating-element absolute top-1/5 right-1/6 w-8 h-8 opacity-0 rounded-full border-2 border-[#FF8A5C]"></div>
        <div className="floating-element absolute top-2/5 left-1/4 w-6 h-6 opacity-0 rotate-45 border-2 border-[#FF8A5C]"></div>
        <div className="floating-element absolute top-3/5 right-1/3 w-10 h-10 opacity-0 rounded-lg border-2 border-[#FF8A5C]"></div>
        <div className="floating-element absolute top-3/4 left-1/6 w-7 h-7 opacity-0 rotate-12 border-2 border-[#FF8A5C]"></div>
      </div>
      
      <div className="container mx-auto relative z-10 px-4">
        <div className="flex flex-col items-center">
          {/* Top Section - About Me */}
          <div className="text-center mb-20 w-full max-w-4xl">
            <h2 
              ref={headlineRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700"
            >
              I build tech that thinks — and businesses that grow.
            </h2>
            
            <p 
              ref={subtextRef}
              className="text-xl mb-12 text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto transition-colors duration-700 leading-relaxed"
            >
              Hi, I'm{' '}
              <span className={`font-bold ${isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'}`}>
                Chiran Jeevi
              </span>
              , a Business-minded Full-Stack Developer and AI enthusiast. I merge strategic business insight with modern technology to create scalable digital solutions that empower brands and users alike.
            </p>
          </div>
          
          {/* Two-column layout: Stacked Cards (Left) + Timeline (Right) */}
          <div 
            ref={contentContainerRef}
            className="flex flex-col lg:flex-row gap-16 w-full max-w-7xl"
          >
            {/* Left Column - Stacked Skill Cards */}
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                  Core Strengths
                </h3>
              </div>
              
              <div className="space-y-6">
                {skillCards.map((card, index) => (
                  <div
                    key={card.id}
                    ref={(el) => { if (el) skillCardRefs.current[index] = el; }}
                    className={`p-10 rounded-3xl transition-all duration-300 ${
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
                      <div className={`w-4 h-4 rounded-full mt-2 mr-6 flex-shrink-0 ${
                        isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="font-bold text-2xl mb-4 text-[#FF8A5C]">{card.title}</h3>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6 text-lg">{card.description}</p>
                        {index === activeCardIndex && (
                          <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border">
                            <p className="text-light-textSecondary dark:text-dark-textSecondary text-lg">
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
              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  {skillCards.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeCardIndex
                          ? (isDarkMode ? 'bg-[#FF8A5C] w-6' : 'bg-[#E85D45] w-6')
                          : (isDarkMode ? 'bg-[#3C2E2A]' : 'bg-[#E8D5C8]')
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              
              {/* Subtle decorative element matching journey timeline */}
              <div className="mt-10 flex justify-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-0.5 ${isDarkMode ? 'bg-[#3C2E2A]' : 'bg-[#E8D5C8]'}`}></div>
                  <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#FF8A5C]/50' : 'bg-[#E85D45]/50'}`}></div>
                  <div className={`w-3 h-0.5 ${isDarkMode ? 'bg-[#3C2E2A]' : 'bg-[#E8D5C8]'}`}></div>
                </div>
              </div>
            </div>
            
            {/* Right Column - My Journey Timeline */}
            <div 
              ref={timelineContainerRef}
              className="flex-1"
            >
              <div className={`relative p-10 rounded-3xl h-full min-h-full ${
                isDarkMode 
                  ? 'bg-[#241A17]/40 border border-[#3C2E2A]' 
                  : 'bg-[#FFF3E9]/40 border border-[#E8D5C8]'
              } backdrop-blur-sm shadow-xl`}>
                <div className="flex items-center mb-8">
                  <div className={`w-4 h-4 rounded-full mr-4 ${
                    isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'
                  }`}></div>
                  <h3 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                    My Journey
                  </h3>
                </div>
                
                {/* Innovative roadmap design with synchronized milestones */}
                <div className="relative h-full min-h-[750px] flex flex-col justify-between py-12">
                  {/* Central timeline with gradient */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
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
                      <div className={`relative w-7/12 p-6 rounded-2xl transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#241A17]/90 border border-[#3C2E2A] shadow-lg' 
                          : 'bg-[#FFF3E9]/90 border border-[#E8D5C8] shadow-md'
                      } ${milestone.position === 'left' ? 'mr-12' : 'ml-12'}`}>
                        <div className="flex items-start mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mr-3 ${
                            isDarkMode 
                              ? 'bg-[#241A17] border border-[#FF8A5C]' 
                              : 'bg-[#FFF3E9] border border-[#E85D45]'
                          }`}>
                            {milestone.icon === 'GraduationCap' && <GraduationCap size={20} className={isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'} />}
                            {milestone.icon === 'Server' && <Server size={20} className={isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'} />}
                            {milestone.icon === 'Bot' && <Bot size={20} className={isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'} />}
                            {milestone.icon === 'Laptop' && <Laptop size={20} className={isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'} />}
                            {milestone.icon === 'Rocket' && <Rocket size={20} className={isDarkMode ? 'text-[#FF8A5C]' : 'text-[#E85D45]'} />}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#FF8A5C] text-lg">{milestone.title}</h4>
                            <p className="text-light-textSecondary dark:text-dark-textSecondary font-medium text-sm">{milestone.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">{milestone.description}</p>
                      </div>
                      
                      {/* Milestone dot on timeline */}
                      <div className={`absolute left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 flex items-center justify-center ${
                        isDarkMode 
                          ? 'bg-[#241A17] border-2 border-[#FF8A5C]' 
                          : 'bg-[#FFF3E9] border-2 border-[#E85D45]'
                      } shadow-lg`}>
                        <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-[#FF8A5C]' : 'bg-[#E85D45]'}`}></div>
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