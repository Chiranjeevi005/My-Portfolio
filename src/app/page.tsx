'use client';

import { useState, useEffect } from 'react';
import InitialLoader from '@/components/initialLoader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';

import FeaturedWork from '@/components/FeaturedWork';
import Skills from '@/components/Skills';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import About from '@/components/About';
import Contact from '@/components/Contact';

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
      <main className="flex-grow pt-16 md:pt-20">
        <Hero />
        <div id="about">
          <About />
        </div>
        <div id="works">
          <FeaturedWork />
          <Skills />
        </div>
        <div id="contact">
          <CallToAction />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}