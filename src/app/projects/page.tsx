'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-featured online shopping experience with payment integration',
      technologies: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      technologies: ['Next.js', 'Firebase', 'Tailwind CSS'],
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'Real-time weather data visualization with forecasting',
      technologies: ['React', 'D3.js', 'Express'],
    },
    {
      id: 4,
      title: 'Social Media Analytics',
      description: 'Platform for tracking and analyzing social media performance',
      technologies: ['Vue.js', 'Python', 'PostgreSQL'],
    },
  ];

  useEffect(() => {
    // Staggered entrance animation for projects
    gsap.fromTo(
      '.project-card',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                My Projects
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Here are some of the projects I've worked on. Each one presented unique challenges 
                and opportunities to learn and grow as a developer.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="project-card bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
                        View Details
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 font-medium">
                        Source Code
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                View All Projects
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}