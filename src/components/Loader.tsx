'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tl = gsap.timeline();
      
      // Animate the blobs
      tl.fromTo(
        '.blob',
        { 
          opacity: 0, 
          scale: 0.5,
          rotation: 0
        },
        { 
          opacity: 1, 
          scale: 1,
          rotation: 360,
          duration: 2, 
          ease: 'power2.out',
          stagger: 0.2
        }
      )
      .to(
        '.blob',
        { 
          opacity: 0, 
          scale: 0.5,
          rotation: 720,
          duration: 1, 
          ease: 'power2.in',
          stagger: 0.1
        },
        '+=1'
      )
      .to(
        '.loader-overlay',
        { opacity: 0, duration: 0.5, onComplete: () => setShowLoader(false) },
        '-=0.5'
      );
    }
  }, []);

  if (!showLoader) return null;

  return (
    <div className="loader-overlay fixed inset-0 bg-lightBg dark:bg-darkBg flex items-center justify-center z-50">
      <div className="relative w-64 h-64">
        <div className="blob absolute top-0 left-0 w-32 h-32 bg-accent1Light dark:bg-accent1Dark rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="blob absolute top-0 right-0 w-32 h-32 bg-accent2Light dark:bg-accent2Dark rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="blob absolute bottom-0 left-1/2 w-32 h-32 bg-accent1Light dark:bg-accent1Dark rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default Loader;