'use client';

import { useState, useEffect } from 'react';
import InitialLoader from '@/components/initialLoader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

import FeaturedWork from '@/components/FeaturedWork';
import Skills from '@/components/Skills';
import InterestsShelf from '@/components/Interests';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import About from '@/components/About';
// Scroll coordination is now handled by useScrollAnimation hooks in individual components

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Reset loader state on component mount to ensure it shows on refresh
    setShowLoader(true);
    // Remove skip flag on page load to ensure loader always shows
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skipIntro');
    }
    
    return () => {};
  }, []);

  const handleLoaderFinish = () => {
    setShowLoader(false);
  };

  // Always show the loader on refresh
  if (showLoader) {
    return <InitialLoader onFinish={handleLoaderFinish} durationMs={3000} />;
  }

  // Otherwise, render the main content
  return (
    <div className="min-h-screen flex flex-col bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="smooth-transition">
          <Hero />
        </div>
        <div id="about" className="scroll-mt-16 md:scroll-mt-20 smooth-transition" style={{ visibility: 'visible', opacity: 1 }}>
          <About />
        </div>
        <div id="works" className="scroll-mt-16 md:scroll-mt-20 smooth-transition" style={{ visibility: 'visible', opacity: 1 }}>
          <FeaturedWork />
        </div>
        <div id="skills" className="scroll-mt-16 md:scroll-mt-20 smooth-transition" style={{ visibility: 'visible', opacity: 1 }}>
          <Skills />
        </div>
        <div id="interests" className="scroll-mt-16 md:scroll-mt-20 smooth-transition" style={{ visibility: 'visible', opacity: 1 }}>
          <InterestsShelf />
        </div>
        <div id="contact" className="scroll-mt-16 md:scroll-mt-20 smooth-transition" style={{ visibility: 'visible', opacity: 1 }}>
          <CTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}