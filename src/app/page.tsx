'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSubTextRef = useRef<HTMLParagraphElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // GSAP animation for hero section
    if (heroTextRef.current && heroSubTextRef.current && heroButtonRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      ).fromTo(
        heroSubTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.5'
      ).fromTo(
        heroButtonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.7'
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 
              ref={heroTextRef}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Welcome to My Portfolio
            </h1>
            <p 
              ref={heroSubTextRef}
              className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
            >
              I create beautiful, functional, and responsive web experiences
            </p>
            <button
              ref={heroButtonRef}
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              View My Work
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                About Me
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                I'm a passionate full-stack developer with expertise in modern web technologies. 
                I love creating intuitive user experiences and solving complex problems with clean, 
                efficient code.
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-6 rounded-full transition-colors">
                  Download CV
                </button>
                <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-bold py-2 px-6 rounded-full transition-colors">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
              My Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Frontend</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  React, Next.js, TypeScript, Tailwind CSS, GSAP
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                <div className="text-5xl mb-4">⚙️</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Backend</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Node.js, Express, Supabase, PostgreSQL, REST APIs
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Tools</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Git, Docker, Vercel, Figma, Jest, CI/CD
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}