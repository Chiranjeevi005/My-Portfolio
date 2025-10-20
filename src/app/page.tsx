'use client';

import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary">
      <Loader />
      <Navbar />
      
      <main className="flex-grow pt-20">
        <Hero />
        <Features />
        <Projects />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}