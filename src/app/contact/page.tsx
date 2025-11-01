'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { useLoaderStore } from '@/store/useLoaderStore';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
// Remove the duplicate FloatingWallBackground import since it's already in the layout
import ContactHero from '@/components/contact/hero';
import GetInTouch from '@/components/contact/getInTouch';

export default function Contact() {
  const { stopLoading } = useLoaderStore();

  useEffect(() => {
    // Stop the global loader
    stopLoading();

    // Entrance animation for the contact form
    gsap.fromTo(
      '.contact-element',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, [stopLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary">
      <Navbar />
      {/* Remove the duplicate FloatingWallBackground since it's already in the layout */}
      <ContactHero />  
      <main className="flex-grow pt-4 pb-24">
        <GetInTouch />
      </main>
      
      <Footer />
    </div>
  );
}