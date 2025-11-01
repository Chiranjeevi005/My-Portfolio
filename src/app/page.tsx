'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import InitialLoader from '@/components/home/initialLoader';
import Navbar from '@/components/common/Navbar';
import Hero from '@/components/home/Hero';

import FeaturedWork from '@/components/home/FeaturedWork';
import Skills from '@/components/home/Skills';
import InterestsShelf from '@/components/home/Interests';
import CTA from '@/components/home/CTA';
import Footer from '@/components/common/Footer';
import About from '@/components/home/About';
// Scroll coordination is now handled by useScrollAnimation hooks in individual components

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if navigation is from navbar (using query parameter)
    const isFromNavbar = searchParams.get('nav') === '1';
    
    // Check if this is a full page refresh
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const isReload = navigationEntry?.type === 'reload';
    const isNavigate = navigationEntry?.type === 'navigate';
    
    // Show loader only on direct access or refresh, not on navbar navigation
    if (isFromNavbar) {
      // This is navigation from navbar - hide loader immediately
      setShowLoader(false);
    } else if (isReload || isNavigate) {
      // This is a direct access or refresh - show loader
      setShowLoader(true);
    } else {
      // Default case - for safety, show loader on first visit
      setShowLoader(true);
    }
    
    return () => {};
  }, [searchParams]);

  const handleLoaderFinish = () => {
    setShowLoader(false);
  };

  // Show the loader when state is true
  if (showLoader) {
    return <InitialLoader onFinish={handleLoaderFinish} durationMs={5600} />;
  }

  // Otherwise, render the main content
  return (
    <div className="min-h-screen flex flex-col bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary">
      <Navbar />
      <main className="flex-grow pt-4 pb-24">
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