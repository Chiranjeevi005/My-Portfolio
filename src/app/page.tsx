'use client';

import { useState, useEffect } from 'react';
import InitialLoader from '@/components/initialLoader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import WhatIDo from '@/components/WhatIDo';
import FeaturedWork from '@/components/FeaturedWork';
import EntrepreneurialTimeline from '@/components/EntrepreneurialTimeline';
import SkillMatrix from '@/components/SkillMatrix';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Reset loader state on component mount to ensure it shows on refresh
    setShowLoader(true);
    // Remove skip flag on page load to ensure loader always shows
    if (typeof window !== 'undefined') {
      localStorage.removeItem('skipIntro');
    }
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
      <main className="flex-grow pt-20">
        <Hero />
        <WhatIDo />
        <FeaturedWork />
        <EntrepreneurialTimeline />
        <SkillMatrix />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}