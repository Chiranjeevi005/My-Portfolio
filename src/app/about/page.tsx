'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import AboutHeroSection from '../../components/about/AboutHeroSection';
import SkillsMatrix from '../../components/about/SkillsMatrix';
import AchievementsGrid from '../../components/about/AchievementsGrid';
import EducationSection from '../../components/about/EducationSection';
import InterestsShowcase from '../../components/about/InterestsShowcase';
import VisionSection from '../../components/about/VisionSection';

export default function AboutPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Entrance animation for the page content
    gsap.fromTo(
      '.about-section',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-light-bgPrimary dark:bg-dark-bgPrimary">
      <Navbar />

      <main className="flex-grow ">
        <AboutHeroSection />
        <EducationSection />
        <SkillsMatrix />
        <AchievementsGrid />
        <InterestsShowcase />
        <VisionSection />
      </main>

      <Footer />
    </div>
  );
}