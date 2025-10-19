'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  useEffect(() => {
    // Simple entrance animation for the page content
    gsap.fromTo(
      '.about-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto about-content">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-900 dark:text-white">
                About Me
              </h1>
              
              <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
                <div className="md:w-1/3">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    My Journey
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    I'm a passionate full-stack developer with over 5 years of experience creating 
                    digital solutions for businesses of all sizes. My journey began with a Computer 
                    Science degree and has evolved through various roles in tech companies and startups.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    I specialize in modern web technologies, with a focus on React, Next.js, and Node.js. 
                    I believe in writing clean, maintainable code and creating intuitive user experiences 
                    that solve real problems.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    When I'm not coding, you can find me hiking, reading tech blogs, or contributing to 
                    open-source projects. I'm always excited to learn new technologies and take on 
                    challenging projects.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Education
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">MSc Computer Science</h4>
                      <p className="text-gray-600 dark:text-gray-300">University of Technology (2018-2020)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">BSc Computer Engineering</h4>
                      <p className="text-gray-600 dark:text-gray-300">State University (2014-2018)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Experience
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Senior Frontend Developer</h4>
                      <p className="text-gray-600 dark:text-gray-300">Tech Innovations Inc. (2022-Present)</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Full Stack Developer</h4>
                      <p className="text-gray-600 dark:text-gray-300">Digital Solutions Co. (2020-2022)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}