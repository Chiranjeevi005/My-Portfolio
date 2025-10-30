'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggers = useRef<ScrollTrigger[]>([]);

  // Projects data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      role: "Full-Stack Developer",
      description: "A scalable e-commerce solution with real-time inventory management and personalized recommendations.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/project1.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      role: "Frontend Lead",
      description: "Interactive data visualization platform for enterprise clients with real-time metrics and reporting.",
      technologies: ["React", "D3.js", "TypeScript", "Firebase"],
      image: "/project2.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      role: "Product Engineer",
      description: "Secure mobile banking application with biometric authentication and financial insights.",
      technologies: ["React Native", "Redux", "Node.js", "PostgreSQL"],
      image: "/project3.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Task Management System",
      role: "Full-Stack Developer",
      description: "Collaborative task management solution with real-time updates and team collaboration features.",
      technologies: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      image: "/project4.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Health & Fitness Tracker",
      role: "Frontend Developer",
      description: "Comprehensive health tracking application with workout planning and nutrition monitoring.",
      technologies: ["Vue.js", "Vuex", "Express", "MongoDB"],
      image: "/project5.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "AI-Powered Chatbot",
      role: "Backend Engineer",
      description: "Intelligent chatbot solution with natural language processing and machine learning capabilities.",
      technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
      image: "/project6.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  // Animation for project cards
  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.project-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1
          }
        );
      });

      // Cleanup function
      return () => {
        cards.forEach(card => {
          const trigger = ScrollTrigger.getById(card.id);
          if (trigger) trigger.kill();
        });
      };
    }
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A showcase of my work, demonstrating expertise across various technologies and problem domains.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card bg-light-bgPrimary dark:bg-dark-bgPrimary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ y: -10 }}
            >
              <div className="relative overflow-hidden">
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex gap-3">
                    <a 
                      href={project.liveUrl} 
                      className="bg-light-bgPrimary dark:bg-dark-bgPrimary p-2 rounded-full text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-textAccent dark:hover:bg-dark-textAccent hover:text-white transition-colors"
                      aria-label={`View ${project.title} live`}
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a 
                      href={project.githubUrl} 
                      className="bg-light-bgPrimary dark:bg-dark-bgPrimary p-2 rounded-full text-light-textPrimary dark:text-dark-textPrimary hover:bg-light-textAccent dark:hover:bg-dark-textAccent hover:text-white transition-colors"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-light-textAccent dark:bg-dark-textAccent text-white px-2 py-1 rounded-full">
                    {project.role}
                  </span>
                </div>
                
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-light-bgSecondary dark:bg-dark-bgSecondary text-light-textSecondary dark:text-dark-textSecondary text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <motion.button 
            className="bg-light-textAccent dark:bg-dark-textAccent hover:bg-light-textHighlight dark:hover:bg-dark-textHighlight text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Projects;