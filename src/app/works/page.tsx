'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import WorksHeroSection from '@/components/works/WorksHeroSection';
import WorksGrid from '@/components/works/Projects';
import ExperienceSection from '@/components/works/ExperienceSection';
import ImpactNote from '@/components/works/ImpactNote';
import { PortfolioProvider } from '@/context/PortfolioContext';


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
    <PortfolioProvider>
      <div className="min-h-screen flex flex-col bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary">
        <Navbar />
        
        <main className="flex-grow pt-4 pb-24">
          <WorksHeroSection />
          <ExperienceSection />
          <WorksGrid />
          <ImpactNote />
        </main>
        
        <Footer />
      </div>
    </PortfolioProvider>
  );
}