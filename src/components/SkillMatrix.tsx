'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SkillMatrix = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "Next.js", icon: "넥", category: "frontend" },
    { name: "React", icon: "⚛", category: "frontend" },
    { name: "TypeScript", icon: "📝", category: "language" },
    { name: "Node.js", icon: "🟢", category: "backend" },
    { name: "Tailwind", icon: "🎨", category: "styling" },
    { name: "GSAP", icon: "⚡", category: "animation" },
    { name: "Supabase", icon: "▲", category: "database" },
    { name: "Figma", icon: "📐", category: "design" },
    { name: "AWS", icon: "☁", category: "cloud" },
    { name: "Docker", icon: "🐳", category: "devops" },
    { name: "Python", icon: "🐍", category: "language" },
    { name: "GraphQL", icon: "📊", category: "api" },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && containerRef.current) {
      // Animate section title
      const title = containerRef.current.querySelector('.section-title');
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Animate skill icons in hexagonal pattern
      const skillItems = containerRef.current.querySelectorAll('.skill-item');
      skillItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.1,
          }
        );

        // Add hover effect
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.2,
            duration: 0.3,
            boxShadow: '0 0 20px rgba(232, 93, 69, 0.5)',
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.3,
            boxShadow: 'none',
          });
        });
      });
    }

    // Cleanup
    return () => {
      if (containerRef.current) {
        const skillItems = containerRef.current.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        });
      }
    };
  }, []);

  // Hexagonal grid positions (approximate positions for a hexagonal layout)
  const hexagonPositions = [
    { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }, // Center
    { top: '25%', left: '50%', transform: 'translate(-50%, -50%)' }, // Top
    { top: '75%', left: '50%', transform: 'translate(-50%, -50%)' }, // Bottom
    { top: '37.5%', left: '25%', transform: 'translate(-50%, -50%)' }, // Top-left
    { top: '37.5%', left: '75%', transform: 'translate(-50%, -50%)' }, // Top-right
    { top: '62.5%', left: '25%', transform: 'translate(-50%, -50%)' }, // Bottom-left
    { top: '62.5%', left: '75%', transform: 'translate(-50%, -50%)' }, // Bottom-right
    { top: '12.5%', left: '37.5%', transform: 'translate(-50%, -50%)' }, // Far top-left
    { top: '12.5%', left: '62.5%', transform: 'translate(-50%, -50%)' }, // Far top-right
    { top: '87.5%', left: '37.5%', transform: 'translate(-50%, -50%)' }, // Far bottom-left
    { top: '87.5%', left: '62.5%', transform: 'translate(-50%, -50%)' }, // Far bottom-right
    { top: '50%', left: '12.5%', transform: 'translate(-50%, -50%)' }, // Far left
    { top: '50%', left: '87.5%', transform: 'translate(-50%, -50%)' }, // Far right
  ];

  return (
    <section 
      ref={containerRef}
      className="py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary transition-colors duration-700 relative overflow-hidden"
    >
      {/* Subtle pattern background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: typeof document !== 'undefined' && document.documentElement.classList.contains('dark') 
            ? 'radial-gradient(circle at 15% 50%, #FF8A5C 1px, transparent 1px), radial-gradient(circle at 85% 50%, #FF8A5C 1px, transparent 1px)'
            : 'radial-gradient(circle at 15% 50%, #E85D45 1px, transparent 1px), radial-gradient(circle at 85% 50%, #E85D45 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
          Skills & Technologies
        </h2>
        
        <div className="relative h-[600px] max-w-4xl mx-auto">
          {/* Connection lines between skills */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-text-accent)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--color-text-highlight)" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {/* Lines connecting center to surrounding skills */}
            <line x1="50%" y1="50%" x2="50%" y2="25%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="25%" y2="37.5%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="75%" y2="37.5%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="25%" y2="62.5%" stroke="url(#lineGradient)" strokeWidth="1" />
            <line x1="50%" y1="50%" x2="75%" y2="62.5%" stroke="url(#lineGradient)" strokeWidth="1" />
          </svg>
          
          {/* Skill items positioned in hexagonal pattern */}
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-item absolute w-24 h-24 rounded-full bg-light-bgSurface dark:bg-dark-bgSurface border-2 border-light-border dark:border-dark-border flex flex-col items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                ...hexagonPositions[index],
              }}
            >
              <span className="text-2xl mb-1">{skill.icon}</span>
              <span className="text-sm font-medium text-center text-light-textPrimary dark:text-dark-textPrimary transition-colors duration-700">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;