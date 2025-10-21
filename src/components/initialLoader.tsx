'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = { onFinish?: () => void; durationMs?: number };

export default function InitialLoader({ onFinish, durationMs = 5600 }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Add CSS animations to head
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes grain-move {
        0% { transform: translate(0, 0); }
        10% { transform: translate(-5%, -5%); }
        20% { transform: translate(-10%, 5%); }
        30% { transform: translate(5%, -10%); }
        40% { transform: translate(-5%, 15%); }
        50% { transform: translate(-10%, 5%); }
        60% { transform: translate(15%, 0%); }
        70% { transform: translate(0%, 10%); }
        80% { transform: translate(5%, 5%); }
        90% { transform: translate(-5%, -10%); }
        100% { transform: translate(0, 0); }
      }
      
      @keyframes float {
        0% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-10px) translateX(5px); }
        50% { transform: translateY(-20px) translateX(-5px); }
        75% { transform: translateY(-10px) translateX(-10px); }
        100% { transform: translateY(0) translateX(0); }
      }
      
      @keyframes data-point-pulse {
        0% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.8); }
        100% { opacity: 0.3; transform: scale(1); }
      }
      
      @keyframes progress-pulse {
        0% { opacity: 0.7; }
        50% { opacity: 1; }
        100% { opacity: 0.7; }
      }
      
      @keyframes highlight-pulse {
        0% { opacity: 1; }
        50% { opacity: 0.8; }
        100% { opacity: 1; }
      }
      
      .grain-effect {
        background-image: radial-gradient(circle at 25% 25%, var(--color-text-accent) 1px, transparent 1px),
                         radial-gradient(circle at 75% 75%, var(--color-text-highlight) 1px, transparent 1px);
        background-size: 50px 50px;
        animation: grain-move 8s linear infinite;
      }
      
      .float-animation {
        animation: float 4s ease-in-out infinite;
      }
      
      .data-point {
        animation: data-point-pulse 1.5s ease-in-out infinite;
      }
      
      .progress-bar-fill {
        animation: progress-pulse 1.5s ease-in-out infinite;
      }
      
      .highlight-passion {
        color: var(--color-text-highlight);
        animation: highlight-pulse 2s ease-in-out infinite;
      }
      
      .highlight-future {
        color: var(--color-text-accent);
        animation: highlight-pulse 2s ease-in-out infinite;
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

    // If user has chosen to skip earlier
    if (localStorage.getItem("skipIntro") === "true") {
      finish();
      return () => document.head.removeChild(style);
    }

    const root = rootRef.current!;
    const codeChars = root.querySelectorAll(".loader-code .char");
    const nodes = root.querySelectorAll(".loader-node");
    const connectingLines = root.querySelectorAll(".connecting-line-1, .connecting-line-2, .connecting-line-3, .connecting-line-4");
    const glyphPaths = root.querySelectorAll(".glyph-path");
    const glyphFills = root.querySelectorAll(".glyph-fill");
    const particles = root.querySelectorAll(".particle");
    const dataPoints = root.querySelectorAll(".data-point");
    const axisLines = root.querySelectorAll(".axis-line");
    const sentences = root.querySelectorAll(".sentence-1, .sentence-2");
    const progressBarFill = root.querySelector(".progress-bar-fill");
    const progressPercent = root.querySelector(".progress-percent");

    // Calculate timing based on durationMs
    const stage1End = 1.4; // 25% of 5.6s
    const stage2End = 2.6; // 46% of 5.6s
    const stage3End = 3.8; // 68% of 5.6s
    const stage4End = 4.6; // 82% of 5.6s
    const stage5End = 5.6; // 100% of 5.6s
    
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        // Cinematic exit animation for inspirational lines only
        const exitTl = gsap.timeline({
          onComplete: finish
        });
        
        // Smooth scale and fade exit
        exitTl.to(sentences, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        });
        
        exitTl.to(sentences, {
          y: -50,
          opacity: 0,
          scale: 0.9,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.in"
        });
      },
    });

    // Stage: Quiet Canvas - subtle background animation
    tl.to(root.querySelector(".bg-anim"), { 
      yPercent: -6, 
      duration: stage1End, 
      ease: "sine.inOut" 
    }, 0);

    // Stage 1: Code Trace (0.0s → 1.4s)
    // Animate code typing with staggered chars
    tl.fromTo(
      codeChars, 
      { y: 10, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.04, 
        duration: 0.9, 
        ease: "power2.out" 
      }, 
      0.1
    );
    
    // Animate sentences with staggered entrance - centered and focused
    tl.fromTo(
      sentences, 
      { y: 30, opacity: 0, scale: 0.9 }, 
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        stagger: 0.2, 
        duration: 0.8, 
        ease: "power3.out" 
      }, 
      0.6
    );

    // Stage 2: Network Seed (1.4s → 2.6s)
    // Animate nodes appearing
    tl.to(
      nodes, 
      { 
        opacity: 1, 
        stagger: 0.06, 
        duration: 0.6,
        scale: 1.1,
        ease: "back.out(1.2)"
      }, 
      stage1End
    );

    // Animate connecting lines with staggered timing
    tl.to(
      connectingLines, 
      { 
        opacity: 1, 
        strokeDashoffset: 0, 
        duration: 0.7, 
        stagger: 0.15,
        ease: "power2.out"
      }, 
      stage1End + 0.1
    );

    // Stage 3: Product Glyphs (2.6s → 3.8s)
    // Draw glyph paths with staggered timing
    tl.fromTo(
      glyphPaths, 
      { strokeDashoffset: 1000 }, 
      { 
        strokeDashoffset: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power2.out" 
      }, 
      stage2End
    );

    // Fill glyphs with staggered timing
    tl.to(
      glyphFills, 
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.4, 
        stagger: 0.05,
        ease: "power2.out" 
      }, 
      stage2End + 0.3
    );

    // Stage 4: Convergence (3.8s → 4.6s)
    // Gather all elements toward center and enhance sentences
    tl.to(
      [...nodes, ...connectingLines, ...glyphPaths, ...glyphFills], 
      { 
        scale: 0.9, 
        opacity: 0.7,
        duration: 0.5, 
        ease: "power2.inOut" 
      }, 
      stage3End
    );

    // Enhance sentences during convergence
    tl.to(
      sentences, 
      { 
        scale: 1.05,
        duration: 0.4,
        ease: "power2.out" 
      }, 
      stage3End
    );

    // Stage 5: Brand Pulse + Exit (4.6s → 5.6s)
    // Add final subtle pulse effect to sentences
    tl.to(
      sentences, 
      { 
        scale: 1.08,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut" 
      }, 
      stage4End
    );

    // Animate progress bar to match exact timing
    tl.fromTo(
      progressBarFill, 
      { width: "0%" }, 
      { 
        width: "100%", 
        duration: durationMs / 1000,
        ease: "power1.out" 
      }, 
      0
    );
    
    // Update progress percentage to match timeline
    const progressTl = gsap.timeline();
    progressTl.to({}, {
      duration: durationMs / 1000,
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (progressPercent) {
          progressPercent.textContent = progress + "%";
        }
      }
    }, 0);

    // Cleanup on unmount
    return () => {
      tl.kill();
      document.head.removeChild(style);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    if (skipped) return;
    setSkipped(true);
    // remember skip for future (optional)
    // localStorage.setItem("skipIntro","true");
    if (onFinish) onFinish();
  }
  
  // Ensure animation always runs for full duration
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!skipped && onFinish) {
        finish();
      }
    }, durationMs);
    
    return () => clearTimeout(timer);
  }, [onFinish, skipped, durationMs]);

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
      {/* Background animated layer with cinematic grain effect */}
      <div 
        className="absolute inset-0 bg-anim opacity-20"
        style={{
          background: `linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)`,
        }}
      >
        {/* Subtle animated grain texture */}
        <div className="absolute inset-0 opacity-10 grain-effect"></div>
      </div>

      {/* Center visual stack */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* CODE LINE with enhanced cinematic effect */}
        <div 
          className="loader-code font-mono text-xl tracking-wider select-none relative"
          style={{ color: 'var(--color-text-accent)' }}
        >
          {Array.from('<> build()').map((c, i) => (
            <span key={i} className="char inline-block opacity-0">
              {c}
            </span>
          ))}
          {/* Animated caret */}
          <span className="inline-block w-1 h-6 bg-current ml-1 animate-pulse"></span>
        </div>

        {/* Enhanced Nodes + Glyphs container (SVG) with connecting lines - Detailed design */}
        <svg 
          width="300" 
          height="180" 
          viewBox="0 0 300 180" 
          className="block"
        >
          {/* Definitions for gradients */}
          <defs>
            <linearGradient id="bar-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-button-primary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-text-accent)" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="card-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-button-primary)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--color-text-highlight)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Animated background grid pattern */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-text-muted)" strokeWidth="0.5" opacity="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />
          
          {/* Connecting lines between nodes with animation */}
          <line 
            className="connecting-line-1"
            x1="40" 
            y1="90" 
            x2="90" 
            y2="60" 
            stroke="var(--color-text-accent)" 
            strokeWidth="1.5" 
            strokeDasharray="60" 
            strokeDashoffset="60"
            opacity="0"
          />
          <line 
            className="connecting-line-2"
            x1="90" 
            y1="60" 
            x2="140" 
            y2="80" 
            stroke="var(--color-text-accent)" 
            strokeWidth="1.5" 
            strokeDasharray="60" 
            strokeDashoffset="60"
            opacity="0"
          />
          <line 
            className="connecting-line-3"
            x1="140" 
            y1="80" 
            x2="200" 
            y2="95" 
            stroke="var(--color-text-highlight)" 
            strokeWidth="1.5" 
            strokeDasharray="80" 
            strokeDashoffset="80"
            opacity="0"
          />
          <line 
            className="connecting-line-4"
            x1="200" 
            y1="95" 
            x2="260" 
            y2="85" 
            stroke="var(--color-text-highlight)" 
            strokeWidth="1.5" 
            strokeDasharray="70" 
            strokeDashoffset="70"
            opacity="0"
          />
          
          {/* Animated Nodes */}
          <circle 
            className="loader-node node-1"
            cx="40" 
            y="90" 
            r="5" 
            fill="var(--color-text-highlight)" 
            opacity="0"
          />
          <circle 
            className="loader-node node-2"
            cx="90" 
            y="60" 
            r="5" 
            fill="var(--color-text-accent)" 
            opacity="0"
          />
          <circle 
            className="loader-node node-3"
            cx="140" 
            y="80" 
            r="5" 
            fill="var(--color-text-accent)" 
            opacity="0"
          />
          
          {/* Detailed Glyph path example (bar chart) */}
          <g className="glyph-group-1">
            {/* Main bar chart container */}
            <path 
              className="glyph-path chart-outline"
              d="M200 120 L200 70 L230 70 L230 120 Z" 
              stroke="var(--color-text-accent)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="1000" 
              strokeDashoffset="1000"
            />
            
            {/* Individual bars with gradient */}
            <rect 
              className="glyph-fill bar-1"
              x="205" 
              y="80" 
              width="5" 
              height="40" 
              fill="url(#bar-gradient)" 
              opacity="0" 
              rx="1"
            />
            <rect 
              className="glyph-fill bar-2"
              x="213" 
              y="75" 
              width="5" 
              height="45" 
              fill="url(#bar-gradient)" 
              opacity="0" 
              rx="1"
            />
            <rect 
              className="glyph-fill bar-3"
              x="221" 
              y="85" 
              width="5" 
              height="35" 
              fill="url(#bar-gradient)" 
              opacity="0" 
              rx="1"
            />
          </g>
          
          {/* Detailed Glyph path example (UI card) */}
          <g className="glyph-group-2">
            {/* Card container */}
            <path 
              className="glyph-path card-outline"
              d="M260 100 L260 70 L290 70 L290 100 Z" 
              stroke="var(--color-text-highlight)" 
              strokeWidth="2" 
              fill="none" 
              strokeDasharray="1000" 
              strokeDashoffset="1000"
            />
            
            {/* Card content elements */}
            <rect 
              className="glyph-fill card-header"
              x="265" 
              y="75" 
              width="20" 
              height="6" 
              fill="url(#card-gradient)" 
              opacity="0" 
              rx="1"
            />
            <rect 
              className="glyph-fill card-content"
              x="265" 
              y="85" 
              width="15" 
              height="3" 
              fill="var(--color-text-accent)" 
              opacity="0" 
              rx="0.5"
            />
          </g>
        </svg>

        {/* Enhanced Text Elements - Centered and Focused */}
        <div className="text-center relative">
          <h2 
            className="text-3xl font-bold tracking-wide relative sentence-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Code the <span className="highlight-passion">Passion</span>
          </h2>
          <h2 
            className="text-3xl font-bold mt-2 tracking-wide relative sentence-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Build the <span className="highlight-future">Future</span>
          </h2>

          
          {/* Professional theme-oriented progress bar with percentage only */}
          <div className="w-56 mt-6 mx-auto">
            <div className="flex justify-between mb-1">
              <span></span>
              <span className="text-sm font-medium progress-percent" style={{ color: 'var(--color-text-accent)' }}>0%</span>
            </div>
            <div 
              className="h-1.5 rounded-full overflow-hidden progress-bar-container"
              style={{ backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <div 
                className="h-full rounded-full progress-bar-fill"
                style={{
                  background: 'linear-gradient(90deg, var(--color-text-accent), var(--color-text-highlight))',
                  width: '0%'
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          localStorage.setItem("skipIntro", "true");
          finish();
        }}
        className="absolute top-6 right-6 px-3 py-1 rounded-lg shadow-sm text-sm"
        style={{
          backgroundColor: 'var(--color-card-bg)',
          color: 'var(--color-text-secondary)',
        }}
        aria-label="Skip intro"
      >
        Skip
      </button>
    </div>
  );
}