'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const centerOrbRef = useRef<HTMLDivElement>(null);
  const leftNodesRef = useRef<HTMLDivElement[]>([]);
  const rightNodesRef = useRef<HTMLDivElement[]>([]);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const mobileLabelsRef = useRef<HTMLSpanElement[]>([]);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
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

  // Skill data for the two hemispheres
  const businessSkills = [
    { 
      name: "Strategic Thinking", 
      description: "Connecting dots across markets to envision future opportunities.",
      angle: -30,
      distance: 160
    },
    { 
      name: "Market Analysis", 
      description: "Transforming data into actionable market insights and forecasts.",
      angle: -10,
      distance: 180
    },
    { 
      name: "Leadership", 
      description: "Guiding teams toward innovation with vision and purpose.",
      angle: 10,
      distance: 180
    },
    { 
      name: "Product Strategy", 
      description: "Turning market insight into scalable product blueprints.",
      angle: 30,
      distance: 160
    },
    { 
      name: "Business Communication", 
      description: "Bridging technical complexity with clear, compelling narratives.",
      angle: -50,
      distance: 130
    },
    { 
      name: "Entrepreneurship", 
      description: "Building ventures from concept to market with calculated risk.",
      angle: 50,
      distance: 130
    },
    { 
      name: "Project Management", 
      description: "Executing complex initiatives with precision and adaptability.",
      angle: -70,
      distance: 100
    },
    { 
      name: "Decision Making", 
      description: "Balancing data and intuition for optimal business outcomes.",
      angle: 70,
      distance: 100
    }
  ];

  const technicalSkills = [
    { 
      name: "React.js / Next.js", 
      description: "Crafting seamless UI experiences with modern frameworks.",
      angle: 150,
      distance: 160
    },
    { 
      name: "Node.js / Express", 
      description: "Building robust backend systems with JavaScript scalability.",
      angle: 170,
      distance: 180
    },
    { 
      name: "Supabase / Firebase", 
      description: "Implementing real-time databases and authentication solutions.",
      angle: 190,
      distance: 180
    },
    { 
      name: "Tailwind CSS / GSAP", 
      description: "Designing stunning interfaces with utility-first CSS and animations.",
      angle: 210,
      distance: 160
    },
    { 
      name: "Python / AI Agents", 
      description: "Creating intelligent automation through machine learning models.",
      angle: 130,
      distance: 130
    },
    { 
      name: "REST & GraphQL APIs", 
      description: "Connecting systems through efficient and scalable data pipelines.",
      angle: 230,
      distance: 130
    },
    { 
      name: "Automation / Data Viz", 
      description: "Transforming complexity into clarity through intelligent workflows.",
      angle: 110,
      distance: 100
    },
    { 
      name: "Cloud Architecture", 
      description: "Designing scalable and secure cloud-native solutions.",
      angle: 250,
      distance: 100
    }
  ];

  // Skill details for modal
  const skillDetails = {
    "Strategic Thinking": "Connecting dots across markets to envision future opportunities. I synthesize complex information into clear strategic frameworks that drive innovation and competitive advantage.",
    "Market Analysis": "Transforming data into actionable market insights and forecasts. My analytical approach combines quantitative research with qualitative understanding to identify growth opportunities.",
    "Leadership": "Guiding teams toward innovation with vision and purpose. I foster collaborative environments where creativity thrives and technical excellence is achieved through shared commitment.",
    "Product Strategy": "Turning market insight into scalable product blueprints. I bridge business objectives with user needs to create products that deliver measurable value and sustainable growth.",
    "Business Communication": "Bridging technical complexity with clear, compelling narratives. I translate intricate concepts into accessible language for diverse stakeholders, ensuring alignment and informed decision-making.",
    "Entrepreneurship": "Building ventures from concept to market with calculated risk. My approach combines visionary thinking with pragmatic execution to create scalable business models that solve real problems.",
    "Project Management": "Executing complex initiatives with precision and adaptability. I balance scope, time, and resources to deliver high-quality outcomes while maintaining team morale and stakeholder confidence.",
    "Decision Making": "Balancing data and intuition for optimal business outcomes. I employ structured decision-making frameworks to navigate uncertainty and maximize strategic impact.",
    "React.js / Next.js": "Crafting seamless UI experiences with modern frameworks. I leverage component-based architecture and server-side rendering to build performant, scalable web applications with exceptional user experiences.",
    "Node.js / Express": "Building robust backend systems with JavaScript scalability. My RESTful APIs and microservices are designed for performance, security, and maintainability in enterprise environments.",
    "Supabase / Firebase": "Implementing real-time databases and authentication solutions. I create secure, scalable backend infrastructures that enable real-time collaboration and seamless user experiences.",
    "Tailwind CSS / GSAP": "Designing stunning interfaces with utility-first CSS and animations. I combine responsive design principles with fluid animations to create engaging, accessible user interfaces.",
    "Python / AI Agents": "Creating intelligent automation through machine learning models. I develop AI-powered solutions that enhance decision-making and streamline complex workflows with predictive capabilities.",
    "REST & GraphQL APIs": "Connecting systems through efficient and scalable data pipelines. I design API architectures that enable seamless data flow between services while maintaining security and performance standards.",
    "Automation / Data Viz": "Transforming complexity into clarity through intelligent workflows. I build automated systems that reduce manual effort while creating compelling visualizations that reveal hidden insights in data.",
    "Cloud Architecture": "Designing scalable and secure cloud-native solutions. I leverage cloud platforms to build resilient systems that scale with business needs while maintaining cost efficiency."
  };

  // Convert polar coordinates to cartesian
  const polarToCartesian = (angle: number, distance: number) => {
    const rad = (angle * Math.PI) / 180;
    // Use a smaller scaling factor for mobile to keep nodes within bounds
    const scaleFactor = deviceType === 'mobile' ? 4 : 3;
    return {
      x: 50 + (distance * Math.cos(rad)) / scaleFactor,
      y: 50 + (distance * Math.sin(rad)) / scaleFactor
    };
  };

  // Adjust distance based on device type - more conservative approach
  const getAdjustedDistance = (distance: number) => {
    // Less aggressive scaling to avoid overlapping
    return deviceType === 'mobile' ? distance * 0.85 : 
           deviceType === 'tablet' ? distance * 0.95 : distance;
  };

  // Animate connection lines with a drawing effect
  const animateLines = () => {
    if (typeof window !== 'undefined' && sphereRef.current) {
      const lines = sphereRef.current.querySelectorAll('line');
      lines.forEach((line, index) => {
        const length = line.getTotalLength();
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0
        });
        
        gsap.to(line, {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 1.5,
          delay: 1.8 + index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sphereRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && sectionRef.current) {
      // Animate section title with a more dynamic effect
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

      // Animate section subtitle with a staggered effect
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

      // Animate sphere container with a more complex entrance
      if (sphereRef.current) {
        // Initial state - smaller and rotated
        gsap.set(sphereRef.current, {
          transformPerspective: 1000,
          transformStyle: "preserve-3d"
        });
        
        gsap.fromTo(
          sphereRef.current,
          { 
            opacity: 0, 
            scale: 0.5,
            rotationX: -30,
            rotationY: -30
          },
          {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.7)",
            delay: 0.5,
            scrollTrigger: {
              trigger: sphereRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            onStart: () => {
              // Animate the connection lines after sphere appears
              setTimeout(() => {
                animateLines();
              }, 1000);
              
              // Add a subtle continuous rotation after initial animation
              if (sphereRef.current) {
                gsap.to(sphereRef.current, {
                  rotationY: 10,
                  duration: 20,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: 1.5
                });
              }
            }
          }
        );
      }

      // Animate floating particles with staggered entrance
      particlesRef.current.forEach((particle, index) => {
        gsap.fromTo(particle, {
          opacity: 0,
          scale: 0
        }, {
          opacity: 0.2,
          scale: 1,
          duration: 1,
          delay: 1 + index * 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: particle.parentElement,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          }
        });
        
        // Continuous floating animation
        gsap.to(particle, {
          x: `${gsap.utils.random(-20, 20)}px`,
          y: `${gsap.utils.random(-20, 20)}px`,
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.2
        });
      });

      // Animate mobile labels if on mobile device
      if (deviceType === 'mobile' && mobileLabelsRef.current.length > 0) {
        // Set initial state
        mobileLabelsRef.current.forEach(label => {
          if (label) {
            gsap.set(label, {
              opacity: 0,
              y: 20
            });
          }
        });
        
        // Animate with stagger
        mobileLabelsRef.current.forEach((label, index) => {
          if (label) {
            gsap.to(label, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 1.5 + index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: sphereRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              }
            });
          }
        });
      }

      // Animate skill nodes with a staggered radial entrance
      const allNodes = [...leftNodesRef.current, ...rightNodesRef.current];
      
      // Set initial state for all nodes
      allNodes.forEach(node => {
        gsap.set(node, {
          opacity: 0,
          scale: 0
        });
      });
      
      // Animate nodes with staggered timing and bounce effect
      allNodes.forEach((node, index) => {
        gsap.to(node, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 1.2 + index * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sphereRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          }
        });
      });

      // Add mouse move effect to sphere
      const handleMouseMove = (e: MouseEvent) => {
        if (sphereRef.current) {
          const rect = sphereRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 30;
          const rotateY = (centerX - x) / 30;
          
          gsap.to(sphereRef.current, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      };

      // Add mouse leave effect
      const handleMouseLeave = () => {
        if (sphereRef.current) {
          gsap.to(sphereRef.current, {
            rotationX: 0,
            rotationY: 0,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      };

      // Add event listeners
      if (sphereRef.current) {
        sphereRef.current.addEventListener('mousemove', handleMouseMove);
        sphereRef.current.addEventListener('mouseleave', handleMouseLeave);
      }

      // Add hover effects to nodes
      [...leftNodesRef.current, ...rightNodesRef.current].forEach((node, index) => {
        node.addEventListener('mouseenter', () => {
          // Highlight node
          gsap.to(node, {
            scale: 1.25,
            duration: 0.3,
            boxShadow: '0 0 25px rgba(255, 111, 97, 0.8)',
          });
          
          // Show tooltip
          if (tooltipRef.current) {
            const skillName = node.querySelector('span')?.textContent || '';
            const description = businessSkills.find(s => s.name === skillName)?.description || 
                               technicalSkills.find(s => s.name === skillName)?.description || 
                               "Empowering business through data-driven code.";
            
            tooltipRef.current.textContent = description;
            tooltipRef.current.style.opacity = '1';
            
            // Position tooltip near the node
            const rect = node.getBoundingClientRect();
            const sphereRect = sphereRef.current?.getBoundingClientRect();
            if (sphereRect) {
              tooltipRef.current.style.left = `${rect.left - sphereRect.left + rect.width/2}px`;
              tooltipRef.current.style.top = `${rect.top - sphereRect.top - 40}px`;
            }
          }
        });

        node.addEventListener('mouseleave', () => {
          // Reset node
          gsap.to(node, {
            scale: 1,
            duration: 0.3,
            boxShadow: '0 0 15px rgba(255, 111, 97, 0.4)',
          });
          
          // Hide tooltip
          if (tooltipRef.current) {
            tooltipRef.current.style.opacity = '0';
          }
        });

        // Remove the click event listener to prevent modal from opening
      });

      // Animate center orb pulse with enhanced effect
      if (centerOrbRef.current) {
        gsap.to(centerOrbRef.current, {
          scale: 1.1,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
        
        // Add a secondary pulse animation
        gsap.to(centerOrbRef.current, {
          scale: 1.05,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 0.5
        });
      }

      // Cleanup
      return () => {
        if (sphereRef.current) {
          sphereRef.current.removeEventListener('mousemove', handleMouseMove);
          sphereRef.current.removeEventListener('mouseleave', handleMouseLeave);
        }
        
        [...leftNodesRef.current, ...rightNodesRef.current].forEach(node => {
          node.removeEventListener('mouseenter', () => {});
          node.removeEventListener('mouseleave', () => {});
        });
      };
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary transition-colors duration-700 relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { if (el) particlesRef.current[i] = el; }}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${Math.random() * 10 + 3}px`,
              height: `${Math.random() * 10 + 3}px`,
              background: 'var(--color-text-accent)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
            Hybrid Stack of Skillset
          </h2>
          <p className="section-subtitle text-lg md:text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto transition-colors duration-700">
            Bridging full-stack developer skills with strategic business intelligence.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Main sphere container with responsive sizing */}
          <div 
            ref={sphereRef}
            className={`relative w-full max-w-3xl ${deviceType === 'mobile' ? 'h-[350px]' : deviceType === 'tablet' ? 'h-[500px]' : 'h-[600px]'} rounded-full perspective-1000 flex items-center justify-center`}
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 111, 97, 0.1), transparent 70%), radial-gradient(circle at 70% 70%, rgba(184, 115, 51, 0.1), transparent 70%)',
              border: '1px solid rgba(255, 111, 97, 0.3)',
              boxShadow: 'inset 0 0 50px rgba(255, 111, 97, 0.1), 0 0 30px rgba(184, 115, 51, 0.1), 0 0 60px rgba(255, 111, 97, 0.05)'
            }}
          >
            {/* Connection lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="businessGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FDF3E7" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#B87333" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6F61" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#B87333" stopOpacity="0.7" />
                </linearGradient>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF6F61" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF6F61" stopOpacity="0" />
                </radialGradient>
              </defs>
              
              {/* Business connections */}
              {businessSkills.map((skill, index) => {
                const adjustedDistance = getAdjustedDistance(skill.distance);
                const pos = polarToCartesian(skill.angle, adjustedDistance);
                return (
                  <line
                    key={`business-${index}`}
                    x1="50%"
                    y1="50%"
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="url(#businessGradient)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />
                );
              })}
              
              {/* Technical connections */}
              {technicalSkills.map((skill, index) => {
                const adjustedDistance = getAdjustedDistance(skill.distance);
                const pos = polarToCartesian(skill.angle, adjustedDistance);
                return (
                  <line
                    key={`tech-${index}`}
                    x1="50%"
                    y1="50%"
                    x2={`${pos.x}%`}
                    y2={`${pos.y}%`}
                    stroke="url(#techGradient)"
                    strokeWidth="1.5"
                    strokeOpacity="0.6"
                  />
                );
              })}
            </svg>
            
            {/* Labels for the two hemispheres - only shown on non-mobile devices */}
            {deviceType !== 'mobile' && (
              <>
                <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                  <span className="text-lg font-bold text-white bg-[#FF6F61]/80 dark:bg-[#FF9D6E]/90 px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Coding Skills
                  </span>
                </div>
                
                <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
                  <span className="text-lg font-bold text-[#B87333] bg-[#FDF3E7]/80 dark:bg-[#FFFFFF]/90 px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Entrepreneurial Skills
                  </span>
                </div>
              </>
            )}
            
            {/* Center orb - "ChiranJeevi" */}
            <div
              ref={centerOrbRef}
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer z-20 ${
                deviceType === 'mobile' ? 'w-28 h-28' : 'w-32 h-32'
              }`}
              style={{
                background: 'radial-gradient(circle at 30% 30%, #FFD1C1, #FF9D6E, #FF6F61, #B87333)',
                boxShadow: '0 0 30px rgba(255, 111, 97, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 111, 97, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              <span className={`font-bold text-center z-10 tracking-wider ${
                deviceType === 'mobile' ? 'text-sm' : 'text-lg'
              } ${
                deviceType === 'mobile' ? 'text-white' : 'text-white'
              }`}>
                Skills Matrix
              </span>
              {/* Inner glow effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, transparent 70%)'
                }}
              />
              {/* Outer pulse ring */}
              <div 
                className="absolute inset-0 rounded-full opacity-30 animate-ping"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 111, 97, 0.5) 0%, transparent 70%)',
                  animationDuration: '3s'
                }}
              />
            </div>
            
            {/* Business Skills Nodes (Left Hemisphere) */}
            {businessSkills.map((skill, index) => {
              const adjustedDistance = getAdjustedDistance(skill.distance);
              const pos = polarToCartesian(skill.angle, adjustedDistance);
              return (
                <div
                  key={`business-${index}`}
                  ref={(el) => { if (el) leftNodesRef.current[index] = el; }}
                  className={`absolute rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                    deviceType === 'mobile' ? 'w-20 h-20' : 'w-24 h-24'
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    background: 'radial-gradient(circle at 30% 30%, #FFFFFF, #FDF3E7, #E8D5C8)',
                    border: '2px solid rgba(184, 115, 51, 0.6)',
                    boxShadow: '0 0 15px rgba(184, 115, 51, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <span className={`font-bold text-center px-2 leading-tight ${
                    deviceType === 'mobile' ? 'text-xs' : 'text-sm'
                  } ${
                    deviceType === 'mobile' ? 'text-[#B87333]' : 'text-[#B87333]'
                  }`}>
                    {skill.name}
                  </span>
                </div>
              );
            })}
            
            {/* Technical Skills Nodes (Right Hemisphere) */}
            {technicalSkills.map((skill, index) => {
              const adjustedDistance = getAdjustedDistance(skill.distance);
              const pos = polarToCartesian(skill.angle, adjustedDistance);
              return (
                <div
                  key={`tech-${index}`}
                  ref={(el) => { if (el) rightNodesRef.current[index] = el; }}
                  className={`absolute rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                    deviceType === 'mobile' ? 'w-20 h-20' : 'w-24 h-24'
                  }`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    background: 'radial-gradient(circle at 30% 30%, #FFD1C1, #FF9D6E, #FF6F61)',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                    boxShadow: '0 0 15px rgba(255, 111, 97, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <span className={`font-bold text-center px-2 leading-tight ${
                    deviceType === 'mobile' ? 'text-xs' : 'text-sm'
                  } ${
                    deviceType === 'mobile' ? 'text-white' : 'text-white'
                  }`}>
                    {skill.name}
                  </span>
                </div>
              );
            })}
            
            {/* Tooltip */}
            <div
              ref={tooltipRef}
              className="absolute px-4 py-3 rounded-xl text-sm bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border shadow-2xl opacity-0 transition-opacity duration-300 pointer-events-none z-30"
              style={{
                transform: 'translateX(-50%)',
                maxWidth: '280px',
                zIndex: 100
              }}
            />
          </div>
        </div>
        
        {/* Hemisphere labels for mobile view - shown below the sphere */}
        {deviceType === 'mobile' && (
          <div className="flex justify-between mt-8 px-4">
            <div className="text-center">
              <span 
                className="text-base font-bold text-white bg-[#FF6F61]/80 dark:bg-[#FF9D6E]/90 px-3 py-1 rounded-full shadow-lg inline-block"
                ref={(el) => { if (el) mobileLabelsRef.current[0] = el; }}
              >
                Coding Skills
              </span>
            </div>
            
            <div className="text-center">
              <span 
                className="text-base font-bold text-[#B87333] bg-[#FDF3E7]/80 dark:bg-[#FFFFFF]/90 px-3 py-1 rounded-full shadow-lg inline-block"
                ref={(el) => { if (el) mobileLabelsRef.current[1] = el; }}
              >
                Entrepreneurial Skills
              </span>
            </div>
          </div>
        )}
        
        {/* Microcopy */}
        <div className="mt-16 text-center">
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary italic">
            "Every skill amplifies the— code, commerce, and creation in harmony"
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes sphere-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 50px rgba(255, 111, 97, 0.9), inset 0 0 40px rgba(255, 255, 255, 0.7), 0 0 100px rgba(255, 111, 97, 0.4);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 0 0 70px rgba(255, 111, 97, 1), inset 0 0 50px rgba(255, 255, 255, 0.9), 0 0 150px rgba(255, 111, 97, 0.6);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 0 0 50px rgba(255, 111, 97, 0.9), inset 0 0 40px rgba(255, 255, 255, 0.7), 0 0 100px rgba(255, 111, 97, 0.4);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;