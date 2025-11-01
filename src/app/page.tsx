'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import Hero from '@/components/home/Hero';

import FeaturedWork from '@/components/home/FeaturedWork';
import Skills from '@/components/home/Skills';
import InterestsShelf from '@/components/home/Interests';
import CTA from '@/components/home/CTA';
import Footer from '@/components/common/Footer';
import About from '@/components/home/About';

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the page content after the component mounts (client-side)
  if (!isClient) {
    return null;
  }

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