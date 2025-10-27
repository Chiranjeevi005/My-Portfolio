'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const FloatingWallBackground = () => {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Predefined positions to avoid hydration issues
  const predefinedPositions = [
    { top: 10, left: 15, size: 40 },
    { top: 20, left: 70, size: 30 },
    { top: 30, left: 25, size: 50 },
    { top: 40, left: 80, size: 35 },
    { top: 50, left: 10, size: 45 },
    { top: 60, left: 60, size: 25 },
    { top: 70, left: 30, size: 55 },
    { top: 80, left: 85, size: 30 },
    { top: 15, left: 45, size: 35 },
    { top: 25, left: 20, size: 40 },
    { top: 35, left: 75, size: 30 },
    { top: 45, left: 40, size: 50 },
    { top: 55, left: 85, size: 25 },
    { top: 65, left: 15, size: 45 },
    { top: 75, left: 50, size: 35 },
    { top: 85, left: 25, size: 40 },
    { top: 10, left: 60, size: 30 },
    { top: 20, left: 5, size: 50 },
    { top: 30, left: 65, size: 35 },
    { top: 40, left: 35, size: 45 },
    // Additional positions for more elements
    { top: 5, left: 25, size: 30 },
    { top: 15, left: 75, size: 40 },
    { top: 25, left: 50, size: 35 },
    { top: 35, left: 10, size: 45 },
    { top: 45, left: 65, size: 30 },
    { top: 55, left: 20, size: 50 },
    { top: 65, left: 70, size: 35 },
    { top: 75, left: 40, size: 40 },
    { top: 85, left: 75, size: 30 },
    { top: 10, left: 35, size: 35 },
    { top: 20, left: 80, size: 45 },
    { top: 30, left: 15, size: 30 },
    { top: 40, left: 55, size: 50 },
    { top: 50, left: 80, size: 35 },
    { top: 60, left: 25, size: 40 },
    { top: 70, left: 75, size: 30 },
    { top: 80, left: 10, size: 45 },
    { top: 90, left: 50, size: 35 },
    { top: 5, left: 70, size: 40 },
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
    // Entrepreneurship icons
    { type: 'business', path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { type: 'growth', path: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { type: 'analytics', path: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { type: 'strategy', path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { type: 'idea', path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
    { type: 'team', path: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { type: 'finance', path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { type: 'project', path: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Floating geometric shapes and icons */}
      {predefinedPositions.map((position, i) => {
        const isIconElement = i % 3 === 2; // Every 3rd element will be an icon
        const iconData = iconElements[i % iconElements.length];
        
        if (isIconElement) {
          // Render SVG icon elements
          return (
            <motion.div
              key={i}
              className="absolute opacity-10"
              style={{
                top: `${position.top}%`,
                left: `${position.left}%`,
                width: position.size,
                height: position.size,
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
                  color: i % 4 === 0 
                    ? (theme === 'dark' ? '#FF6F61' : '#E85D45') 
                    : i % 4 === 1 
                      ? (theme === 'dark' ? '#FF8A5C' : '#D94A33') 
                      : i % 4 === 2 
                        ? (theme === 'dark' ? '#A07E69' : '#9B7C72')
                        : (theme === 'dark' ? '#B87333' : '#FDF3E7'),
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
          // Render geometric shapes
          return (
            <motion.div
              key={i}
              className="absolute rounded-lg opacity-10"
              style={{
                width: position.size,
                height: position.size,
                top: `${position.top}%`,
                left: `${position.left}%`,
                backgroundColor: i % 4 === 0 
                  ? (theme === 'dark' ? '#FF6F61' : '#E85D45') 
                  : i % 4 === 1 
                    ? (theme === 'dark' ? '#FF8A5C' : '#D94A33') 
                    : i % 4 === 2 
                      ? (theme === 'dark' ? '#A07E69' : '#9B7C72')
                      : (theme === 'dark' ? '#B87333' : '#FDF3E7'),
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