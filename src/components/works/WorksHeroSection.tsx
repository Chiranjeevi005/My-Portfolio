'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins only on client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin);
}

const WorksHeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [animationStage, setAnimationStage] = useState<'initial' | 'particles' | 'timeline' | 'content'>('initial');
  const timelineRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  // Deterministic particle positions for SSR compatibility
  const particles = [
    { id: 1, size: 8, top: 20, left: 15, animation: 'float1' },
    { id: 2, size: 12, top: 35, left: 85, animation: 'float2' },
    { id: 3, size: 6, top: 70, left: 25, animation: 'float3' },
    { id: 4, size: 10, top: 50, left: 75, animation: 'float1' },
    { id: 5, size: 14, top: 85, left: 45, animation: 'float2' },
    { id: 6, size: 7, top: 40, left: 35, animation: 'float3' },
    { id: 7, size: 11, top: 60, left: 90, animation: 'float1' },
    { id: 8, size: 9, top: 15, left: 65, animation: 'float2' },
    { id: 9, size: 13, top: 75, left: 20, animation: 'float3' },
    { id: 10, size: 5, top: 30, left: 10, animation: 'float1' },
    { id: 11, size: 15, top: 65, left: 80, animation: 'float2' },
    { id: 12, size: 8, top: 55, left: 55, animation: 'float3' },
    { id: 13, size: 12, top: 80, left: 40, animation: 'float1' },
    { id: 14, size: 6, top: 25, left: 70, animation: 'float2' },
    { id: 15, size: 10, top: 45, left: 30, animation: 'float3' },
  ];

  useEffect(() => {
    // Mark as client-side to avoid SSR rendering of client-only elements
    setIsClient(true);
    
    // Stage 1: Show particles
    const particlesTimer = setTimeout(() => {
      setAnimationStage('particles');
      
      // Stage 2: Start timeline animation after particles are visible
      const timelineTimer = setTimeout(() => {
        setAnimationStage('timeline');
        
        // Start timeline animation
        if (timelineRef.current && pathRef.current && dotRef.current && lineRef.current) {
          const path = pathRef.current;
          const dot = dotRef.current;
          const line = lineRef.current;
          
          // Draw the timeline with GSAP - from left to right
          const tl = gsap.timeline({
            onComplete: () => {
              // After timeline completes, transition to content
              setTimeout(() => {
                setAnimationStage('content');
              }, 300);
            }
          });
          
          // Animate the glowing dot at the start (left side)
          tl.fromTo(dot, 
            { 
              attr: { r: 0 },
              opacity: 0,
              cx: 150, // Start from left
              cy: 400
            },
            {
              attr: { r: 8 },
              opacity: 1,
              duration: 1,
              ease: "power2.inOut"
            }
          );
          
          // Draw the line from left to right
          const pathLength = path.getTotalLength();
          line.style.strokeDasharray = `${pathLength}`;
          line.style.strokeDashoffset = `${pathLength}`;
          
          tl.to(line, {
            strokeDashoffset: 0,
            duration: 2.8,
            ease: "power2.inOut"
          }, "<");
          
          // Animate the dot along the path (left to right)
          tl.to(dot, {
            motionPath: {
              path: path,
              align: path,
              autoRotate: false
            },
            duration: 2.8,
            ease: "power2.inOut"
          }, "<");
        }
      }, 1000);
      
      return () => clearTimeout(timelineTimer);
    }, 100);
    
    return () => clearTimeout(particlesTimer);
  }, []);

  // Only render on client side to prevent hydration issues
  if (!isClient) {
    return (
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-light-bgPrimary dark:bg-dark-bgPrimary">
        <div className="absolute inset-0 z-0 bg-light-bgPrimary dark:bg-dark-bgPrimary"></div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-light-bgPrimary dark:bg-dark-bgPrimary">
      {/* Floating Particles Background - Only rendered during particles and timeline stages */}
      {(animationStage === 'particles' || animationStage === 'timeline') && (
        <div className="absolute inset-0 z-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute rounded-full bg-light-textAccent dark:bg-dark-textAccent opacity-20 ${particle.animation}`}
              style={{
                width: particle.size,
                height: particle.size,
                top: `${particle.top}%`,
                left: `${particle.left}%`,
              }}
            />
          ))}
        </div>
      )}

      {/* Timeline SVG - Only rendered during timeline animation stage */}
      {animationStage === 'timeline' && (
        <svg 
          ref={timelineRef}
          className="absolute inset-0 w-full h-full z-10"
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Define the horizontal path for the timeline (left to right) */}
          <path
            ref={pathRef}
            d="M 150 400 Q 300 350 500 400 Q 700 450 850 400" // Curved horizontal path
            fill="none"
            stroke="none"
          />
          
          {/* The actual visible line that gets drawn */}
          <path
            ref={lineRef}
            d="M 150 400 Q 300 350 500 400 Q 700 450 850 400" // Curved horizontal path
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Glowing dot that travels along the path */}
          <circle
            ref={dotRef}
            cx="150"
            cy="400"
            r="0"
            fill="none"
            stroke="url(#dotGradient)"
            strokeWidth="8"
            className="filter drop-shadow-[0_0_12px_rgba(255,138,92,0.9)]"
          />
          
          {/* Gradients for the line and dot */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF8A5C" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFC48A" stopOpacity="1" />
              <stop offset="100%" stopColor="#FF8A5C" stopOpacity="0.8" />
            </linearGradient>
            
            <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#FF8A5C" stopOpacity="1" />
              <stop offset="70%" stopColor="#FF6B57" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF8A5C" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      )}

      {/* Content Container - Only rendered during content stage */}
      {animationStage === 'content' && (
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-light-textAccent to-light-textHighlight dark:from-dark-textAccent dark:to-dark-textHighlight bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            LEGACY IN MOTION
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-light-textSecondary dark:text-dark-textSecondary mb-12 max-w-3xl mx-auto font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            From curiosity to creation — this is the journey that built my story.
          </motion.p>
          
          {/* Underline swipe effect */}
          <motion.div
            className="h-1 w-48 md:w-64 bg-gradient-to-r from-light-textAccent to-light-textHighlight dark:from-dark-textAccent dark:to-dark-textHighlight mb-20 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      )}

      {/* Scroll Indicator - Only rendered during content stage */}
      {animationStage === 'content' && (
        <motion.div 
          className="absolute bottom-20 z-20 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-light-textAccent dark:border-dark-textAccent flex items-center justify-center mb-2"
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(255, 138, 92, 0.7)",
                "0 0 0 12px rgba(255, 138, 92, 0)",
                "0 0 0 0 rgba(255, 138, 92, 0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.svg 
              className="w-6 h-6 text-light-textAccent dark:text-dark-textAccent"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
          <motion.span 
            className="text-sm text-light-textSecondary dark:text-dark-textSecondary"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll to Explore
          </motion.span>
        </motion.div>
      )}
      
      {/* CSS for particle animations */}
      <style jsx global>{`
        @keyframes float1 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -15px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float2 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-10px, -15px); }
          100% { transform: translate(0, 0); }
        }
        
        @keyframes float3 {
          0% { transform: translate(0, 0); }
          50% { transform: translate(5px, -10px); }
          100% { transform: translate(0, 0); }
        }
        
        .float1 {
          animation: float1 6s ease-in-out infinite;
        }
        
        .float2 {
          animation: float2 6s ease-in-out infinite;
        }
        
        .float3 {
          animation: float3 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WorksHeroSection;