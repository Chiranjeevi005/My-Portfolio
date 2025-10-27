'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';

interface FloatingElement {
  id: number;
  top: number;
  left: number;
  size: number;
  type: 'shape' | 'icon';
  shapeType?: number;
  iconType?: number;
  colorIndex: number;
  speed: number;
}

const FloatingWallBackground = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const elementIdCounter = useRef(0);

  // Predefined positions to avoid hydration issues
  const predefinedPositions = [
    { top: 5, left: 10, size: 30 },
    { top: 15, left: 75, size: 40 },
    { top: 25, left: 20, size: 35 },
    { top: 35, left: 85, size: 25 },
    { top: 45, left: 15, size: 45 },
    { top: 55, left: 70, size: 30 },
    { top: 65, left: 25, size: 50 },
    { top: 75, left: 80, size: 35 },
    { top: 85, left: 10, size: 40 },
    { top: 10, left: 45, size: 35 },
    { top: 20, left: 30, size: 40 },
    { top: 30, left: 75, size: 30 },
    { top: 40, left: 40, size: 50 },
    { top: 50, left: 85, size: 25 },
    { top: 60, left: 20, size: 45 },
    { top: 70, left: 70, size: 35 },
    { top: 80, left: 35, size: 40 },
    { top: 90, left: 75, size: 30 },
    { top: 5, left: 60, size: 35 },
    { top: 15, left: 5, size: 50 },
    { top: 25, left: 65, size: 35 },
    { top: 35, left: 35, size: 45 },
    { top: 45, left: 80, size: 30 },
    { top: 55, left: 25, size: 40 },
    { top: 65, left: 75, size: 30 },
    { top: 75, left: 10, size: 45 },
    { top: 85, left: 50, size: 35 },
    { top: 10, left: 25, size: 40 },
    { top: 20, left: 80, size: 45 },
    { top: 30, left: 15, size: 30 },
    { top: 40, left: 55, size: 50 },
    { top: 50, left: 80, size: 35 },
    { top: 60, left: 25, size: 40 },
    { top: 70, left: 75, size: 30 },
    { top: 80, left: 10, size: 45 },
    { top: 90, left: 50, size: 35 },
    { top: 5, left: 70, size: 40 },
    { top: 15, left: 5, size: 35 },
    { top: 25, left: 60, size: 50 },
    { top: 35, left: 25, size: 30 },
    { top: 45, left: 75, size: 40 },
    { top: 55, left: 15, size: 35 },
    { top: 65, left: 70, size: 45 },
    { top: 75, left: 30, size: 30 },
    { top: 85, left: 80, size: 40 },
    { top: 10, left: 40, size: 35 },
    { top: 20, left: 85, size: 45 },
    { top: 30, left: 20, size: 30 },
    { top: 40, left: 65, size: 50 },
    { top: 50, left: 10, size: 35 },
    { top: 60, left: 60, size: 40 },
    { top: 70, left: 25, size: 30 },
    { top: 80, left: 75, size: 45 },
    { top: 90, left: 15, size: 35 },
  ];

  // Coding and entrepreneurship related icons as SVG paths
  const iconElements = [
    // Coding icons
    { type: 'code', path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { type: 'bracket', path: 'M8 3v18m8-18v18M3 8h18M3 16h18' },
    { type: 'function', path: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { type: 'database', path: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6' },
    { type: 'terminal', path: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { type: 'api', path: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2' },
    { type: 'cloud', path: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z' },
    { type: 'mobile', path: 'M12 18h-6a2 2 0 01-2-2V6a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2zm-3-2h2M9 2h6a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V4a2 2 0 012-2z' },
    { type: 'git', path: 'M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' },
    { type: 'ai', path: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { type: 'blockchain', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { type: 'devops', path: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z' },
    { type: 'responsive', path: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { type: 'security', path: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { type: 'testing', path: 'M9 9h6m-6 3h6m-6 3h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z' },
    { type: 'performance', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
    // Entrepreneurship icons
    { type: 'business', path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { type: 'growth', path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { type: 'analytics', path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { type: 'strategy', path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { type: 'idea', path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { type: 'team', path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { type: 'finance', path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { type: 'project', path: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { type: 'marketing', path: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { type: 'network', path: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2' },
    { type: 'innovation', path: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { type: 'leadership', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
    { type: 'startup', path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { type: 'vision', path: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M21 12c0 1.657-8 8-8 8s-8-6.343-8-8a8 8 0 0116 0z' },
    { type: 'scaling', path: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
    { type: 'customer', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  // Generate elements from predefined positions
  const generateElementsFromPositions = () => {
    const newElements: FloatingElement[] = [];
    predefinedPositions.forEach((position, index) => {
      elementIdCounter.current += 1;
      newElements.push({
        id: elementIdCounter.current,
        top: position.top,
        left: position.left,
        size: position.size,
        type: index % 3 === 0 ? 'icon' : 'shape', // More icons for variety
        shapeType: Math.floor(Math.random() * 4),
        iconType: Math.floor(Math.random() * iconElements.length),
        colorIndex: Math.floor(Math.random() * 5),
        speed: 0.05 + Math.random() * 0.15,
      });
    });
    return newElements;
  };

  // Initialize elements
  useEffect(() => {
    setIsMounted(true);
    const initialElements = generateElementsFromPositions();
    setElements(initialElements);
  }, []);

  // Handle scroll-based element generation and movement
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollPosition = window.scrollY;
      const scrollDelta = scrollPosition - scrollPositionRef.current;
      scrollPositionRef.current = scrollPosition;

      // Update existing elements positions
      setElements(prevElements => {
        return prevElements.map(el => ({
          ...el,
          top: el.top - scrollDelta * el.speed,
        })).filter(el => el.top > -100 && el.top < 200); // Increased range for smoother transition
      });

      // Add new elements when scrolling both up and down
      if (Math.abs(scrollDelta) > 5) {
        const scrollThreshold = 100;
        if (scrollPosition % scrollThreshold < 10 || scrollPosition % scrollThreshold > scrollThreshold - 10) {
          setElements(prevElements => {
            // Only add elements if we don't already have too many
            if (prevElements.length < 100) {
              const newElements: FloatingElement[] = [];
              // Add 3-5 new elements at a time for smoother experience
              const elementsToAdd = 3 + Math.floor(Math.random() * 3);
              for (let i = 0; i < elementsToAdd; i++) {
                elementIdCounter.current += 1;
                newElements.push({
                  id: elementIdCounter.current,
                  // Position new elements based on scroll direction
                  top: scrollDelta > 0 ? 110 + Math.random() * 20 : -20 - Math.random() * 20,
                  left: Math.random() * 100,
                  size: 20 + Math.random() * 40,
                  type: Math.random() > 0.4 ? 'icon' : 'shape', // Even more icons
                  shapeType: Math.floor(Math.random() * 4),
                  iconType: Math.floor(Math.random() * iconElements.length),
                  colorIndex: Math.floor(Math.random() * 5),
                  speed: 0.05 + Math.random() * 0.15,
                });
              }
              return [...prevElements, ...newElements];
            }
            return prevElements;
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Floating geometric shapes and icons */}
      {elements.map((element) => {
        if (element.type === 'icon') {
          const iconData = iconElements[element.iconType || 0];
          return (
            <motion.div
              key={element.id}
              className="absolute opacity-10"
              style={{
                top: `${element.top}%`,
                left: `${element.left}%`,
                width: element.size,
                height: element.size,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, (Math.random() - 0.5) * 20, 0],
                rotate: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-full h-full"
                style={{
                  color: element.colorIndex === 0 
                    ? (theme === 'dark' ? '#FF6F61' : '#E85D45') 
                    : element.colorIndex === 1 
                      ? (theme === 'dark' ? '#FF8A5C' : '#D94A33') 
                      : element.colorIndex === 2 
                        ? (theme === 'dark' ? '#A07E69' : '#9B7C72')
                        : element.colorIndex === 3 
                          ? (theme === 'dark' ? '#B87333' : '#FDF3E7')
                          : (theme === 'dark' ? '#F8E8D8' : '#3C2E2A'),
                }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d={iconData.path} 
                />
              </svg>
            </motion.div>
          );
        } else {
          return (
            <motion.div
              key={element.id}
              className={`absolute opacity-10 ${
                element.shapeType === 0 ? 'rounded-lg' : 
                element.shapeType === 1 ? 'rounded-full' : 
                element.shapeType === 2 ? 'rounded-sm' : ''}`}
              style={{
                width: element.size,
                height: element.size,
                top: `${element.top}%`,
                left: `${element.left}%`,
                backgroundColor: element.colorIndex === 0 
                  ? (theme === 'dark' ? '#FF6F61' : '#E85D45') 
                  : element.colorIndex === 1 
                    ? (theme === 'dark' ? '#FF8A5C' : '#D94A33') 
                    : element.colorIndex === 2 
                      ? (theme === 'dark' ? '#A07E69' : '#9B7C72')
                      : element.colorIndex === 3 
                        ? (theme === 'dark' ? '#B87333' : '#FDF3E7')
                        : (theme === 'dark' ? '#F8E8D8' : '#3C2E2A'),
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, (Math.random() - 0.5) * 20, 0],
                rotate: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        }
      })}
    </div>
  );
};

export default FloatingWallBackground;