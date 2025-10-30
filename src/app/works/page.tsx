'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import WorksHeroSection from '@/components/works/WorksHeroSection';
import WorksGrid from '@/components/works/Projects';

export default function Works() {
  useEffect(() => {
    // Entrance animation for the works page
    gsap.fromTo(
      '.works-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <WorksHeroSection />
        <WorksGrid />
      </main>
      
      <Footer />
    </div>
  );
}
