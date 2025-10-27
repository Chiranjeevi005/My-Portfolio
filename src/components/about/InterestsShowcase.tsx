'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  BookOpen, 
  HandHeart, 
  TrendingUp, 
  Cpu, 
  Film 
} from 'lucide-react';

const InterestsShowcase = () => {
  const interests = [
    { 
      icon: Plane, 
      title: "Travel & Exploration", 
      narrative: "Learning from every horizon. Travel teaches me perspective — every culture, city, and person adds depth to how I design and build. I explore places not just to see, but to understand stories that inspire better experiences." 
    },
    { 
      icon: BookOpen, 
      title: "Edutainment & Lifelong Learning", 
      narrative: "Blending curiosity with creativity. I believe in learning that excites and challenges me to grow continuously. From online courses to books, I'm always seeking knowledge that enhances my skills and worldview." 
    },
    { 
      icon: HandHeart, 
      title: "Volunteering & Community Impact", 
      narrative: "Building with empathy. Contributing to community initiatives and volunteering my skills helps me understand diverse perspectives and creates a sense of purpose in my work." 
    },
    { 
      icon: TrendingUp, 
      title: "Business Strategy & Product Thinking", 
      narrative: "Ideas that drive impact. I enjoy analyzing market trends, understanding user behavior, and developing strategies that align business goals with user needs to create successful products." 
    },
    { 
      icon: Cpu, 
      title: "Exploring AI & Emerging Tech", 
      narrative: "Shaping tomorrow, today. I'm fascinated by artificial intelligence, machine learning, and how these technologies can solve complex problems and enhance human capabilities." 
    },
    { 
      icon: Film, 
      title: "Movies, Webinars & Cultural Programs", 
      narrative: "Stories that spark innovation. Cinema, documentaries, and cultural events provide creative inspiration and fresh perspectives that influence my approach to design and storytelling." 
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate container width for animation
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Create a seamless loop by duplicating the interests array
  const loopedInterests = [...interests, ...interests, ...interests, ...interests, ...interests];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-light-textPrimary dark:text-dark-textPrimary mb-4">
            Beyond the Screen
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto text-lg">
            Exploring interests that shape my perspective and fuel my creativity
          </p>
          <div className="w-24 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Auto-scrolling carousel container */}
        <div 
          ref={containerRef}
          className="relative py-8"
        >
          {/* Fade masks for cinematic effect */}
          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-light-bgSecondary dark:from-dark-bgSecondary to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-light-bgSecondary dark:from-dark-bgSecondary to-transparent z-10 pointer-events-none"></div>
          
          {/* Single row with bidirectional switching - 5 seconds each direction */}
          <motion.div
            className="flex"
            animate={{ 
              x: [0, -containerWidth, 0, containerWidth, 0]
            }}
            transition={{ 
              duration: 20, 
              times: [0, 0.25, 0.5, 0.75, 1],
              repeat: Infinity, 
              ease: "linear"
            }}
          >
            {loopedInterests.map((interest, index) => {
              const IconComponent = interest.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-64 h-64 mx-3 relative group cursor-pointer"
                >
                  {/* Card background with gradient */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-light-bgSurface/80 to-light-bgPrimary dark:from-dark-bgSurface/80 dark:to-dark-bgPrimary shadow-lg border border-light-border dark:border-dark-border overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e85d45_1px,transparent_2px)] [background-size:16px_16px]"></div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-light-buttonPrimary/10 dark:bg-dark-buttonPrimary/10 flex items-center justify-center mb-4 group-hover:bg-light-buttonPrimary/20 dark:group-hover:bg-dark-buttonPrimary/20 transition-all duration-300 group-hover:opacity-0">
                        <IconComponent className="text-light-textAccent dark:text-dark-textAccent w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold font-heading text-light-textPrimary dark:text-dark-textPrimary mb-2 group-hover:opacity-0 transition-opacity duration-300">
                        {interest.title}
                      </h3>
                    </div>
                    
                    {/* Overlay with description that appears on hover/click */}
                    <div className="absolute inset-0 bg-light-bgPrimary/70 dark:bg-dark-bgPrimary/70 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-light-border dark:ring-dark-border shadow-[0_0_10px_var(--tw-shadow-color)] shadow-light-border dark:shadow-dark-border">
                      <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-sm text-light-textMuted dark:text-dark-textMuted">
                          {interest.narrative}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
        
        {/* Texture overlay for organic aesthetic */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIxMCUiIGN5PSIxMCUiIHI9IjEiIGZpbGw9IiMwMDAiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjQwJSIgcj0iMSIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjcwJSIgY3k9IjYwJSIgcj0iMSIgZmlsbD0iIzAwMCIvPjxjaXJjbGUgY3g9IjkwJSIgY3k9IjIwJSIgcj0iMSIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]"></div>
      </div>
    </section>
  );
};

export default InterestsShowcase;