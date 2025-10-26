'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = { onFinish?: () => void; durationMs?: number };

export default function InitialLoader({ onFinish, durationMs = 3000 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Deterministic random number generator
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Add CSS animations to head
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes particle-pulse {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
      }
      
      @keyframes text-glow {
        0% { text-shadow: 0 0 5px rgba(232, 93, 69, 0.5); }
        50% { text-shadow: 0 0 20px rgba(232, 93, 69, 0.8), 0 0 30px rgba(232, 93, 69, 0.6); }
        100% { text-shadow: 0 0 5px rgba(232, 93, 69, 0.5); }
      }
      
      .particle {
        animation: particle-pulse 2s ease-in-out infinite;
      }
      
      .glow-text {
        animation: text-glow 3s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    
    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // reduced motion: short fade
      const t = setTimeout(finish, 300);
      return () => {
        clearTimeout(t);
        document.head.removeChild(style);
      };
    }

    const root = rootRef.current!;
    const particles = root.querySelectorAll(".particle");
    const passionText = root.querySelector(".passion-text");
    const futureText = root.querySelector(".future-text");
    const logo = root.querySelector(".logo");

    // Calculate timing based on durationMs
    const stage1End = durationMs * 0.4; // 40% of duration
    const stage2End = durationMs * 0.7; // 70% of duration
    const stage3End = durationMs; // 100% of duration
    
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        // Smooth exit animation
        const exitTl = gsap.timeline({
          onComplete: finish
        });
        
        exitTl.to([passionText, futureText, logo], {
          opacity: 0,
          y: -50,
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.in"
        });
      },
    });

    // Stage 1: Particles animation
    particles.forEach((particle, index) => {
      const seed = index * 10;
      const x = (seededRandom(seed) - 0.5) * 200;
      const y = (seededRandom(seed + 1) - 0.5) * 200;
      // Remove unused variables
      //_ = seededRandom(seed + 2) * 15 + 5;
      //_ = seededRandom(seed + 3) * 2;
      
      tl.fromTo(
        particle,
        { 
          opacity: 0,
          scale: 0,
          x: x,
          y: y,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        0
      );
    });

    // Stage 2: Text morph animation
    tl.to(
      particles,
      {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      stage1End / 1000
    );

    tl.fromTo(
      passionText,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      },
      stage1End / 1000
    );

    tl.to(
      passionText,
      {
        opacity: 0,
        y: -30,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.in"
      },
      stage2End / 1000
    );

    tl.fromTo(
      futureText,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      },
      (stage2End + 300) / 1000
    );

    tl.to(
      futureText,
      {
        opacity: 0,
        y: -30,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.in"
      },
      (stage3End - 500) / 1000
    );

    // Stage 3: Logo fade in
    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      },
      (stage3End - 300) / 1000
    );

    // Cleanup on unmount
    return () => {
      tl.kill();
      document.head.removeChild(style);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    if (onFinish) onFinish();
  }
  
  // Ensure animation always runs for full duration
  useEffect(() => {
    const timer = setTimeout(() => {
      finish();
    }, durationMs);
    
    return () => clearTimeout(timer);
  }, [onFinish, durationMs]);

  // Predefined particle positions and sizes for consistent SSR
  const particleData = [
    { width: 15, height: 15, top: 10, left: 20, delay: 0 },
    { width: 12, height: 12, top: 25, left: 80, delay: 0.2 },
    { width: 18, height: 18, top: 40, left: 30, delay: 0.4 },
    { width: 10, height: 10, top: 60, left: 70, delay: 0.1 },
    { width: 14, height: 14, top: 80, left: 15, delay: 0.3 },
    { width: 16, height: 16, top: 15, left: 60, delay: 0.5 },
    { width: 11, height: 11, top: 35, left: 40, delay: 0.2 },
    { width: 13, height: 13, top: 55, left: 85, delay: 0.4 },
    { width: 17, height: 17, top: 75, left: 25, delay: 0.1 },
    { width: 9, height: 9, top: 90, left: 50, delay: 0.3 },
    { width: 19, height: 19, top: 20, left: 10, delay: 0.5 },
    { width: 12, height: 12, top: 45, left: 75, delay: 0.2 },
    { width: 15, height: 15, top: 65, left: 35, delay: 0.4 },
    { width: 11, height: 11, top: 85, left: 90, delay: 0.1 },
    { width: 16, height: 16, top: 30, left: 5, delay: 0.3 },
    { width: 13, height: 13, top: 50, left: 65, delay: 0.5 },
    { width: 18, height: 18, top: 70, left: 20, delay: 0.2 },
    { width: 10, height: 10, top: 95, left: 80, delay: 0.4 },
    { width: 14, height: 14, top: 5, left: 45, delay: 0.1 },
    { width: 17, height: 17, top: 35, left: 95, delay: 0.3 },
  ];

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
        transition: "background-color 600ms ease, color 600ms ease",
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      {/* Animated particles */}
      <div className="absolute inset-0">
        {particleData.map((particle, i) => (
          <div
            key={i}
            className="particle absolute rounded-full opacity-70"
            style={{
              background: "var(--color-text-accent)",
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Text elements */}
      <div className="relative z-10 text-center">
        <h2 
          className="passion-text text-4xl md:text-5xl font-bold mb-4 glow-text"
          style={{ color: 'var(--color-text-accent)' }}
        >
          Code the Passion
        </h2>
        <h2 
          className="future-text text-4xl md:text-5xl font-bold glow-text"
          style={{ color: 'var(--color-text-accent)' }}
        >
          Build the Future
        </h2>
        <div 
          className="logo text-6xl font-bold mt-8"
          style={{ color: 'var(--color-text-primary)' }}
        >
          CJ
        </div>
      </div>
    </div>
  );
}