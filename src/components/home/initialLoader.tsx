'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes";

type Props = { onFinish?: () => void; durationMs?: number };

export default function InitialLoader({ onFinish, durationMs = 5600 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const codeElementRef = useRef<HTMLDivElement | null>(null);
  const businessElementRef = useRef<HTMLDivElement | null>(null);
  const codeTextRef = useRef<HTMLHeadingElement | null>(null);
  const futureTextRef = useRef<HTMLHeadingElement | null>(null);
  const codeLinePathRef = useRef<SVGPathElement | null>(null);
  const futureLinePathRef = useRef<SVGPathElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<SVGCircleElement | null>(null);
  const beamRef = useRef<SVGPathElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    if (typeof window === "undefined") return;
    
    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // reduced motion: short fade
      const t = setTimeout(() => {
        if (onFinish) onFinish();
      }, 300);
      return () => clearTimeout(t);
    }

    // Light/Dark mode colors
    const isDarkMode = theme === "dark" || resolvedTheme === "dark";

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Mark animation as complete
        setIsAnimationComplete(true);
      },
    });

    // Set initial hidden states for all elements
    if (codeElementRef.current) {
      gsap.set(codeElementRef.current, { opacity: 0, scale: 0 });
    }
    
    if (businessElementRef.current) {
      gsap.set(businessElementRef.current, { opacity: 0, scale: 0 });
    }
    
    if (codeTextRef.current) {
      gsap.set(codeTextRef.current, { opacity: 0 });
    }
    
    if (futureTextRef.current) {
      gsap.set(futureTextRef.current, { opacity: 0 });
    }
    
    if (codeLinePathRef.current) {
      gsap.set(codeLinePathRef.current, { opacity: 0 });
    }
    
    if (futureLinePathRef.current) {
      gsap.set(futureLinePathRef.current, { opacity: 0 });
    }
    
    if (lineRef.current) {
      gsap.set(lineRef.current, { opacity: 0 });
    }
    
    if (orbitRef.current) {
      gsap.set(orbitRef.current, { opacity: 0, scale: 0 });
    }
    
    if (beamRef.current) {
      gsap.set(beamRef.current, { opacity: 0 });
    }
    
    if (particlesRef.current) {
      const particles = particlesRef.current.querySelectorAll('.spark, .ember');
      if (particles.length > 0) {
        gsap.set(particles, { opacity: 0, scale: 0 });
      }
    }

    // Enhanced timing for 5.6s total duration with smoother transitions
    // Scene 1: 0-1.2s (Awakening Pulse)
    // Scene 2: 1.2-2.7s (Code the Passion Reveal)
    // Scene 3: 2.7-3.6s (Transition Element)
    // Scene 4: 3.6-4.8s (Build the Future Reveal)
    // Scene 5: 4.8-5.6s (Exit)

    // Initial container fade in
    if (containerRef.current) {
      tl.fromTo(containerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.0,
          ease: "elastic.out(1, 0.7)"
        },
        0
      );
    }

    // Scene 1: Awakening Pulse (0-1.2s) - Enhanced with glow effect
    if (glowRef.current) {
      tl.fromTo(glowRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 2,
          opacity: 0.7,
          duration: 1.2,
          ease: "power2.out"
        },
        0.2
      ).to(glowRef.current,
        {
          scale: 3,
          opacity: 0,
          duration: 1.0,
          ease: "power2.in"
        },
        1.0
      );
    }

    if (!isDarkMode && lineRef.current) {
      // Light mode - enhanced line drawing with glow
      const length = lineRef.current.getTotalLength();
      gsap.set(lineRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      
      tl.to(lineRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "none"
      }, 0.5);
      
      tl.to(lineRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out"
      }, 0.5);
      
      // Enhanced particle effects with staggered animation
      const particles = particlesRef.current?.querySelectorAll('.spark');
      if (particles && particles.length > 0) {
        particles.forEach((particle, i) => {
          tl.fromTo(particle,
            { opacity: 0, scale: 0, y: 30 },
            {
              opacity: 0.9,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)"
            },
            0.8 + i * 0.08
          );
        });
      }
    } else if (isDarkMode && beamRef.current) {
      // Dark mode - enhanced beam shooting with pulse
      const length = beamRef.current.getTotalLength();
      gsap.set(beamRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      
      tl.to(beamRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "none"
      }, 0.5);
      
      tl.to(beamRef.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out"
      }, 0.5);
      
      // Enhanced ember particles with floating effect
      const embers = particlesRef.current?.querySelectorAll('.ember');
      if (embers && embers.length > 0) {
        embers.forEach((ember, i) => {
          tl.fromTo(ember,
            { opacity: 0, scale: 0, y: 30 },
            {
              opacity: 0.9,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)"
            },
            0.8 + i * 0.08
          );
          
          // Add floating animation
          tl.to(ember, {
            y: -20,
            duration: 2.0,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          }, 1.5);
        });
      }
    }

    // Scene 2: "Code the Passion" Reveal (1.2-2.7s) - Enhanced with staggered letters
    if (codeTextRef.current) {
      // Set up text for animation
      const text = "Code the Passion";
      codeTextRef.current.innerHTML = text.split('').map(char => 
        `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      const letters = codeTextRef.current.querySelectorAll('span');
      if (letters.length > 0) {
        tl.to(codeTextRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: "none"
        }, 1.2);
        
        tl.fromTo(letters,
          { opacity: 0, y: 50, rotateX: -90, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)"
          },
          1.2
        );
        
        // Hold text for 1 second
        tl.to(letters, {
          opacity: 0,
          y: -50,
          rotateX: 90,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.in(1.5)"
        }, 2.5);
      }
    }

    // Animated line for "Code the Passion"
    if (codeLinePathRef.current) {
      const length = codeLinePathRef.current.getTotalLength();
      gsap.set(codeLinePathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      
      tl.to(codeLinePathRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "none"
      }, 1.2);
      
      tl.to(codeLinePathRef.current, {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: "power2.out"
      }, 1.2);
      
      tl.to(codeLinePathRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      }, 2.5);
    }

    // Scene 3: Transition Element (2.7-3.6s) - Enhanced with smoother transitions
    if (!isDarkMode) {
      // Light mode - line to orbit transition with glow
      if (lineRef.current) {
        tl.to(lineRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.in"
        }, 2.7);
      }
      
      // Orbit formation with enhanced animation
      if (orbitRef.current) {
        tl.to(orbitRef.current,
          { opacity: 1, scale: 1.5, duration: 0.1, ease: "none" },
          2.9
        );
        
        tl.fromTo(orbitRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1.5,
            opacity: 0.8,
            duration: 0.8,
            ease: "elastic.out(1, 0.7)"
          },
          2.9
        );
        
        // Enhanced continuous rotation with easing
        tl.to(orbitRef.current, {
          rotation: 360,
          duration: 1.5,
          ease: "none"
        }, 3.2);
      }
    } else {
      // Dark mode - beam transformation with pulse
      if (beamRef.current) {
        tl.to(beamRef.current, {
          attr: { d: "M 100 250 Q 200 100 300 250" },
          duration: 0.8,
          ease: "power2.out"
        }, 2.7);
      }
    }
    
    // Enhanced business element animation with bounce
    if (businessElementRef.current) {
      tl.to(businessElementRef.current,
        { opacity: 1, scale: 1.2, duration: 0.1, ease: "none" },
        3.0
      );
      
      tl.fromTo(businessElementRef.current,
        { scale: 0, opacity: 0, y: 50 },
        {
          scale: 1.2,
          opacity: 0.3,
          y: 0,
          duration: 1.0,
          ease: "elastic.out(1, 0.7)"
        },
        3.0
      );
    }

    // Scene 4: "Build the Future" Reveal (3.6-4.8s) - Enhanced with staggered letters
    if (futureTextRef.current) {
      // Set up text for animation
      const text = "Build the Future";
      futureTextRef.current.innerHTML = text.split('').map(char => 
        `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');
      
      const letters = futureTextRef.current.querySelectorAll('span');
      if (letters.length > 0) {
        tl.to(futureTextRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: "none"
        }, 3.6);
        
        tl.fromTo(letters,
          { opacity: 0, y: 50, rotateX: -90, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)"
          },
          3.6
        );
        
        // Hold text for 1 second
        tl.to(letters, {
          opacity: 0,
          y: -50,
          rotateX: 90,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.in(1.5)"
        }, 4.8);
      }
    }

    // Animated line for "Build the Future"
    if (futureLinePathRef.current) {
      const length = futureLinePathRef.current.getTotalLength();
      gsap.set(futureLinePathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      
      tl.to(futureLinePathRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "none"
      }, 3.6);
      
      tl.to(futureLinePathRef.current, {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: "power2.out"
      }, 3.6);
      
      tl.to(futureLinePathRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.in"
      }, 4.8);
    }

    // Scene 5: Exit (4.8-5.6s) - Enhanced with smoother transition
    if (containerRef.current) {
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.inOut"
      }, 4.8);
    }

    // Cleanup
    return () => {
      tl.kill();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, resolvedTheme, isClient]);

  // Handle completion - only trigger onFinish when animation is truly complete
  useEffect(() => {
    if (isAnimationComplete) {
      // Add a small delay to ensure all visual elements have finished
      const timer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isAnimationComplete, onFinish]);

  // Ultimate fallback - ensure animation completes even if GSAP fails
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setTimeout(() => {
      if (!isAnimationComplete && onFinish) {
        onFinish();
      }
    }, durationMs + 500); // Add buffer time
    
    return () => clearTimeout(timer);
  }, [onFinish, durationMs, isAnimationComplete, isClient]);

  // Particle positions
  const sparkData = [
    { left: "15%", top: "40%" },
    { left: "25%", top: "35%" },
    { left: "35%", top: "45%" },
    { left: "45%", top: "40%" },
    { left: "55%", top: "50%" },
    { left: "65%", top: "45%" },
    { left: "75%", top: "55%" },
    { left: "85%", top: "50%" },
  ];
  
  const emberData = [
    { left: "20%", top: "35%" },
    { left: "30%", top: "55%" },
    { left: "40%", top: "30%" },
    { left: "50%", top: "60%" },
    { left: "60%", top: "40%" },
    { left: "70%", top: "50%" },
    { left: "80%", top: "45%" },
  ];

  // For server-side rendering, we need to render a neutral state
  // The client will enhance this with the correct theme
  if (!isClient) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: "#FFF9F3",
          backgroundImage: "radial-gradient(circle, #FFF9F5, #FFF9F5)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        role="status"
        aria-live="polite"
        aria-label="Loading portfolio"
      >
        {/* Pre-render compatible loader elements - hidden by default */}
        <div 
          className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 z-20"
          style={{
            top: "40%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-dashed border-current flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
        
        <div
          className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 z-20"
          style={{
            top: "40%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-dotted border-current flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        <div className="relative z-30 text-center flex flex-col items-center">
          <div className="mb-8">
            <div className="w-72 h-1.5 mx-auto mb-4 bg-current rounded-full opacity-0"></div>
            <h2 
              className="text-4xl md:text-5xl font-bold"
              style={{ 
                color: "#3A2D28",
                fontFamily: "'Poppins', 'Clash Display', 'Playfair Display', sans-serif",
                letterSpacing: "0.5px",
                opacity: 0,
              }}
            >
              Code the Passion
            </h2>
          </div>
          
          <div>
            <div className="w-72 h-1.5 mx-auto mb-4 bg-current rounded-full opacity-0"></div>
            <h2 
              className="text-4xl md:text-5xl font-bold"
              style={{ 
                color: "#3A2D28",
                fontFamily: "'Poppins', 'Clash Display', 'Playfair Display', sans-serif",
                letterSpacing: "0.5px",
                opacity: 0,
              }}
            >
              Build the Future
            </h2>
          </div>
        </div>
      </div>
    );
  }

  // Client-side rendering with theme detection
  const isDarkMode = theme === "dark" || resolvedTheme === "dark";

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: isDarkMode ? "#181210" : "#FFF9F3",
        backgroundImage: isDarkMode 
          ? "radial-gradient(circle, #0E0E10, #1A1A1E)" 
          : "radial-gradient(circle, #FFF9F5, #FFF9F5)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        transition: "background 600ms ease",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Main background element */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          background: isDarkMode 
            ? "radial-gradient(circle at center, rgba(255, 138, 92, 0.15) 0%, transparent 70%)" 
            : "radial-gradient(circle at center, rgba(232, 93, 69, 0.1) 0%, transparent 70%)",
          opacity: 0.8,
        }}
      ></div>

      {/* Glow effect for enhanced visual appeal */}
      <div 
        ref={glowRef}
        className="absolute w-48 h-48 rounded-full pointer-events-none"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, #FF8A5C, transparent)"
            : "radial-gradient(circle, #E85D45, transparent)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
        }}
      ></div>

      <div 
        ref={containerRef}
        className="relative z-30 flex flex-col items-center justify-center"
      >
        {/* Light Mode Elements */}
        {!isDarkMode && (
          <>
            {/* Line drawing */}
            <svg 
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 10 }}
            >
              <path
                ref={lineRef}
                d="M 50 250 L 350 250"
                stroke="#E85D45"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 6px rgba(232, 93, 69, 0.8))",
                  opacity: 0,
                }}
              />
            </svg>
            
            {/* Spark particles */}
            <div ref={particlesRef} className="absolute inset-0">
              {sparkData.map((spark, i) => (
                <div
                  key={i}
                  className="spark absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "#E85D45",
                    left: spark.left,
                    top: spark.top,
                    opacity: 0,
                    scale: 0,
                  }}
                />
              ))}
            </div>
            
            {/* Orbit circle */}
            <svg 
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 15 }}
            >
              <circle
                ref={orbitRef}
                cx="200"
                cy="250"
                r="100"
                stroke="#E85D45"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,8"
                style={{
                  transformOrigin: "200px 250px",
                  opacity: 0,
                  filter: "drop-shadow(0 0 6px rgba(232, 93, 69, 0.8))",
                }}
              />
            </svg>
          </>
        )}

        {/* Dark Mode Elements */}
        {isDarkMode && (
          <>
            {/* Beam shooting across screen */}
            <svg 
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 10 }}
            >
              <path
                ref={beamRef}
                d="M 0 250 L 400 250"
                stroke="#FF8A5C"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                style={{
                  filter: "drop-shadow(0 0 12px #FF8A5C)",
                  opacity: 0,
                }}
              />
            </svg>
            
            {/* Ember particles */}
            <div ref={particlesRef} className="absolute inset-0">
              {emberData.map((ember, i) => (
                <div
                  key={i}
                  className="ember absolute w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: "#FF8A5C",
                    left: ember.left,
                    top: ember.top,
                    opacity: 0,
                    scale: 0,
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Code Element (using same visual style as Hero section) */}
        <div 
          ref={codeElementRef}
          className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 z-20 transition-all duration-700"
          style={{
            top: "40%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            scale: 0,
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-dashed flex items-center justify-center"
            style={{
              borderColor: isDarkMode ? "#FF8A5C" : "#E85D45",
              boxShadow: isDarkMode 
                ? "0 0 20px rgba(255, 138, 92, 0.6)" 
                : "0 0 15px rgba(232, 93, 69, 0.4)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              style={{
                color: isDarkMode ? "#FF8A5C" : "#E85D45",
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>
        
        {/* Business Element (using same visual style as Hero section) */}
        <div
          ref={businessElementRef}
          className="absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 z-20 transition-all duration-700"
          style={{
            top: "40%",
            left: "70%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            scale: 0,
          }}
        >
          <div className="w-full h-full rounded-full border-2 border-dotted flex items-center justify-center"
            style={{
              borderColor: isDarkMode ? "#FF8A5C" : "#E85D45",
              boxShadow: isDarkMode 
                ? "0 0 20px rgba(255, 138, 92, 0.6)" 
                : "0 0 15px rgba(232, 93, 69, 0.4)",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              style={{
                color: isDarkMode ? "#FF8A5C" : "#E85D45",
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        {/* Text elements with animated lines */}
        <div className="relative z-30 text-center flex flex-col items-center">
          {/* Code the Passion with line animation */}
          <div className="mb-8">
            <svg
              className="w-72 h-1.5 mx-auto mb-4"
              style={{ zIndex: 25 }}
            >
              <path
                ref={codeLinePathRef}
                d="M 0 0 L 288 0"
                stroke={isDarkMode ? "#FF8A5C" : "#E85D45"}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0 }}
              />
            </svg>
            <h2 
              ref={codeTextRef}
              className="text-4xl md:text-5xl font-bold transition-colors duration-700"
              style={{ 
                color: isDarkMode ? "#F6E8D8" : "#3A2D28",
                fontFamily: "'Poppins', 'Clash Display', 'Playfair Display', sans-serif",
                textShadow: isDarkMode 
                  ? "0 0 15px rgba(255, 138, 92, 0.6)" 
                  : "0 0 8px rgba(232, 93, 69, 0.4)",
                letterSpacing: "0.5px",
                opacity: 0,
              }}
            >
              Code the Passion
            </h2>
          </div>
          
          {/* Build the Future with opposite line animation */}
          <div>
            <svg
              className="w-72 h-1.5 mx-auto mb-4"
              style={{ zIndex: 25 }}
            >
              <path
                ref={futureLinePathRef}
                d="M 288 0 L 0 0"
                stroke={isDarkMode ? "#FF8A5C" : "#E85D45"}
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ opacity: 0 }}
              />
            </svg>
            <h2 
              ref={futureTextRef}
              className="text-4xl md:text-5xl font-bold transition-colors duration-700"
              style={{ 
                color: isDarkMode ? "#F6E8D8" : "#3A2D28",
                fontFamily: "'Poppins', 'Clash Display', 'Playfair Display', sans-serif",
                textShadow: isDarkMode 
                  ? "0 0 15px rgba(255, 138, 92, 0.6)" 
                  : "0 0 8px rgba(232, 93, 69, 0.4)",
                letterSpacing: "0.5px",
                opacity: 0,
              }}
            >
              Build the Future
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}