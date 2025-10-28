'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Code, Bot, BarChart, MessageCircle, Search } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [selectedSkill, setSelectedSkill] = useState<{name: string, description: string} | null>(null);
  
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

  // Skill ribbons data with theme-appropriate colors
  const skillRibbons = [
    {
      title: "Programming & Web Development",
      icon: <Code className="w-5 h-5" />,
      colorGradient: ["#FF6F61", "#FDF3E7"],
      skills: [
        { name: "HTML5", description: "Semantic and responsive markup." },
        { name: "CSS3", description: "Modern layouts, animations, and responsive design." },
        { name: "React.js", description: "Component-driven UI architecture with hooks and routing." },
        { name: "Next.js", description: "Server-side rendering and static site generation." },
        { name: "Tailwind CSS", description: "Utility-first responsive styling system." },
        { name: "Supabase", description: "Realtime database and auth integration." },
        { name: "Vercel / Netlify", description: "Modern deployment platforms for JAMStack." },
      ],
    },
    {
      title: "AI & Automation",
      icon: <Bot className="w-5 h-5" />,
      colorGradient: ["#B87333", "#FDF3E7"],
      skills: [
        { name: "ChatGPT / Cursor AI", description: "AI-assisted code generation and debugging." },
        { name: "Prompt Engineering", description: "Designing effective prompts for productivity." },
        { name: "AI Workflows", description: "Automation through AI-based task enhancement." },
        { name: "Notion AI / Copilot", description: "Productivity enhancement with intelligent tools." },
        { name: "Canva / Figma AI", description: "AI-driven design automation and ideation." },
      ],
    },
    {
      title: "Business & Analytics",
      icon: <BarChart className="w-5 h-5" />,
      colorGradient: ["#D7745B", "#FDF3E7"],
      skills: [
        { name: "Strategic Thinking", description: "Connecting market insights to opportunities." },
        { name: "Power BI", description: "Data visualization and analytics dashboards." },
        { name: "Product Management", description: "Feature planning and MVP thinking." },
        { name: "Entrepreneurship", description: "Transforming ideas into viable ventures." },
        { name: "Process Optimization", description: "Leveraging AI for business efficiency." },
      ],
    },
    {
      title: "Soft & Professional Skills",
      icon: <MessageCircle className="w-5 h-5" />,
      colorGradient: ["#FF9D6E", "#FDF3E7"],
      skills: [
        { name: "Leadership", description: "Inspiring teams with purpose and vision." },
        { name: "Communication", description: "Conveying complex ideas simply and clearly." },
        { name: "Creativity", description: "Innovative thinking across design and code." },
        { name: "Adaptability", description: "Learning and applying new tech quickly." },
        { name: "Storytelling", description: "Crafting narratives that connect emotionally." },
      ],
    },
    {
      title: "Expertise Overview",
      icon: <Search className="w-5 h-5" />,
      colorGradient: ["#FFAD91", "#FDF3E7"],
      skills: [
        { name: "Full-Stack Development", description: "End-to-end web application development." },
        { name: "UI/UX Design", description: "User-centered design principles and implementation." },
        { name: "Cloud Architecture", description: "Scalable and secure cloud solutions." },
        { name: "Data Visualization", description: "Transforming complex data into clear insights." },
        { name: "Project Management", description: "Agile methodologies and team coordination." },
      ],
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current) {
      // Animate section title
      const title = sectionRef.current.querySelector('.section-title');
      if (title) {
        gsap.fromTo(
          title,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate section subtitle
      const subtitle = sectionRef.current.querySelector('.section-subtitle');
      if (subtitle) {
        gsap.fromTo(
          subtitle,
          { 
            opacity: 0, 
            y: 30,
            skewX: -10
          },
          {
            opacity: 1,
            y: 0,
            skewX: 0,
            duration: 1,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
              trigger: subtitle,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cleanup
      return () => {
        // Clean up GSAP animations if needed
      };
    }
  }, []);

  // Close modal handler
  const closeModal = () => {
    setSelectedSkill(null);
  };

  // Skill Ribbon Component with Infinite Scroll
  const SkillRibbon = ({ 
    ribbon, 
    index 
  }: { 
    ribbon: any; 
    index: number; 
  }) => {
    const ribbonRef = useRef<HTMLDivElement>(null);
    
    // Determine animation direction: 1st, 3rd, 5th (index 0, 2, 4) = left to right, 2nd, 4th (index 1, 3) = right to left
    const isReverseDirection = index === 1 || index === 3;
    const animationName = isReverseDirection ? 'scroll-right' : 'scroll-left';
    
    return (
      <div className="mb-8">
        {/* Category title above the ribbon */}
        <h3 className="text-xl font-bold mb-3 text-light-textPrimary dark:text-dark-textPrimary flex items-center gap-2">
          {ribbon.icon}
          {ribbon.title}
        </h3>
        
        {/* Animated ribbon */}
        <div 
          ref={ribbonRef}
          className="relative h-16 overflow-hidden rounded-[50px]"
          style={{
            background: `linear-gradient(90deg, ${ribbon.colorGradient[0]}, ${ribbon.colorGradient[1]})`,
            boxShadow: '0 4px 20px rgba(255, 111, 97, 0.2)',
          }}
        >
          {/* Animated skill capsules container - Enhanced infinite scroll implementation */}
          <div className="absolute inset-0 flex items-center">
            {/* Reduced content duplication for better performance */}
            <div className="flex gap-4 pl-4 pr-4 animate-infinite-scroll" style={{ 
              display: 'flex',
              animation: `${animationName} ${120 + index * 30}s linear infinite`
            }}>
              {Array(15).fill(0).map((_, repIndex) => (
                <React.Fragment key={`rep-${index}-${repIndex}`}>
                  {ribbon.skills.map((skill: any, skillIndex: number) => (
                    <div
                      key={`skill-${index}-${repIndex}-${skillIndex}`}
                      className="flex-shrink-0 cursor-pointer backdrop-blur-md rounded-full px-4 py-2 border border-light-border dark:border-dark-border shadow-lg skill-capsule transition-all duration-300"
                      onClick={() => setSelectedSkill(skill)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <span className="font-medium text-light-textPrimary dark:text-dark-textPrimary text-sm whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary transition-colors duration-700 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
            Hybrid Stack of Skillset
          </h2>
          <p className="section-subtitle text-lg md:text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto transition-colors duration-700">
             Bridging full-stack developer skills with strategic business intelligence.
          </p>
        </div>

        {/* Skill ribbons container */}
        <div className="max-w-6xl mx-auto">
          {skillRibbons.map((ribbon, index) => (
            <SkillRibbon key={`ribbon-${index}`} ribbon={ribbon} index={index} />
          ))}
        </div>
        
        {/* Microcopy */}
        <div className="mt-16 text-center">
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary italic">
            "My expertise isn’t static — it lives, learns, and transforms. These ribbons carry the essence of my craft: design clarity, technical precision, and strategic creativity — all in continuous motion."
          </p>
        </div>
      </div>
      
      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-3xl p-6 max-w-md w-full border border-light-border dark:border-dark-border shadow-2xl backdrop-blur-xl"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                {selectedSkill.name}
              </h3>
              <button 
                onClick={closeModal}
                className="text-light-textMuted dark:text-dark-textMuted hover:text-light-textPrimary dark:hover:text-dark-textPrimary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="h-1 w-16 bg-light-buttonPrimary dark:bg-dark-buttonPrimary rounded-full mb-4"></div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary">
              {selectedSkill.description}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-infinite-scroll {
          will-change: transform;
        }
        
        /* Light mode specific styles */
        :global(.light) .skill-capsule {
          background: rgba(255, 255, 255, 0.7);
        }
        
        /* Dark mode specific styles */
        :global(.dark) .skill-capsule {
          background: rgba(36, 26, 23, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Skills;