'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && aboutRef.current) {
      const elements = aboutRef.current.querySelectorAll('.animate-element');
      
      elements.forEach((element, index) => {
        gsap.fromTo(
          element,
          { 
            opacity: 0, 
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );
      });

      // Animate skill badges
      const badges = aboutRef.current.querySelectorAll('.skill-badge');
      badges.forEach((badge, index) => {
        gsap.fromTo(
          badge,
          { 
            opacity: 0, 
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: badge,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.05,
          }
        );

        // Add hover effect
        badge.addEventListener('mouseenter', () => {
          gsap.to(badge, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3,
          });
        });

        badge.addEventListener('mouseleave', () => {
          gsap.to(badge, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  const skills = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "⏭️" },
    { name: "TypeScript", icon: "📝" },
    { name: "Tailwind", icon: "🎨" },
    { name: "Node.js", icon: "🟢" },
    { name: "GSAP", icon: "⚡" },
  ];

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="section bg-light-bgPrimary dark:bg-dark-bgPrimary transition-colors duration-700"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="animate-element text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
              About Me
            </h2>
            <p className="animate-element text-light-textSecondary dark:text-dark-textSecondary text-lg mb-6 transition-colors duration-700">
              I'm a passionate full-stack developer with expertise in creating modern web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life 
              through clean, efficient, and scalable code.
            </p>
            <p className="animate-element text-light-textSecondary dark:text-dark-textSecondary text-lg mb-6 transition-colors duration-700">
              My approach combines technical excellence with creative problem-solving to deliver 
              exceptional digital experiences that engage users and achieve business goals.
            </p>
            <p className="animate-element text-light-textSecondary dark:text-dark-textSecondary text-lg transition-colors duration-700">
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
          
          <div className="flex-1">
            <h3 className="animate-element text-2xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
              Skills & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="skill-badge bg-light-bgSurface dark:bg-dark-bgSurface rounded-xl p-4 flex flex-col items-center justify-center border border-light-border dark:border-dark-border shadow transition-all duration-300 ease-in-out"
                >
                  <span className="text-2xl mb-2">{skill.icon}</span>
                  <span className="text-light-textPrimary dark:text-dark-textPrimary font-medium transition-colors duration-700">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;