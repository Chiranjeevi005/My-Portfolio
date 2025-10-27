'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

const SkillsMatrix = () => {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine colors based on theme (matching EducationSection)
  const bgColor = theme === 'dark' ? 'bg-dark-bgPrimary' : 'bg-light-bgPrimary';
  const textColorPrimary = theme === 'dark' ? 'text-[#F8E8D8]' : 'text-[#2D1B18]';
  const textColorSecondary = theme === 'dark' ? 'text-[#D9BFAE]' : 'text-[#5A3E36]';
  const textColorMuted = theme === 'dark' ? 'text-[#A07E69]' : 'text-[#9B7C72]';
  const accentColor = theme === 'dark' ? '#FF6F61' : '#E85D45';
  const cardBg = theme === 'dark' ? 'bg-[#241A17]' : 'bg-[#FFFFFF]';
  const cardBorder = theme === 'dark' ? 'border-[#3C2E2A]' : 'border-[#E8D5C8]';

  const strengthZones = [
    {
      title: "Strategic Vision",
      description: "Merging business logic with technological foresight to build scalable, intelligent systems.",
      skills: ["Business Strategy", "System Design", "AI Integration", "Decision Mapping"],
    },
    {
      title: "Analytical Precision",
      description: "Translating complex problems into structured, actionable code with measurable outcomes.",
      skills: ["Problem Solving", "Data Interpretation", "Code Optimization", "Logic Flow"],
    },
    {
      title: "Creative Architecture",
      description: "Designing user experiences that combine beauty with purpose and intuitive interaction.",
      skills: ["UI/UX Design", "Tailwind CSS", "React.js", "Micro Animations"],
    },
    {
      title: "Technical Mastery",
      description: "End-to-end engineering expertise from frontend to backend, focused on performance and scalability.",
      skills: ["Next.js", "Node.js", "APIs", "Authentication", "DevOps Basics"],
    },
    {
      title: "Empathetic Leadership",
      description: "Collaborating through empathy and emotional intelligence, inspiring innovation and trust in teams.",
      skills: ["Team Collaboration", "Mentorship", "Communication", "Growth Mindset"],
    },
  ];

  // Skill Evolution Timeline stages with descriptions
  const evolutionStages = [
    { name: "Curiosity", description: "The spark that ignites learning" },
    { name: "Discipline", description: "Consistent practice and growth" },
    { name: "Mastery", description: "Deep expertise and refinement" },
    { name: "Leadership", description: "Guiding others and sharing knowledge" },
    { name: "Vision", description: "Shaping the future and possibilities" }
  ];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Handle spectrum bar click for filtration (desktop only)
  const handleSpectrumClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const segmentIndex = Math.min(Math.floor(clickPosition * strengthZones.length), strengthZones.length - 1);
    
    // Set active filter
    setActiveFilter(segmentIndex);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setActiveFilter(null);
    }, 2000);
  };

  return (
    <section className={`py-16 sm:py-20 ${bgColor} relative overflow-hidden`}>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${textColorPrimary} mb-4 font-heading`}>
            Skills & Strengths
          </h2>
          <p className={`${textColorSecondary} text-sm sm:text-base max-w-2xl mx-auto`}>
            A living spectrum of business insight, creativity, and code — showing how my skills flow, evolve, and amplify each other.
          </p>
        </motion.div>

        {/* Spectrum Bar with Filtration - Hidden on mobile */}
        {!isMobile && (
          <div 
            className="relative h-4 md:h-6 w-full max-w-6xl mx-auto rounded-full overflow-hidden bg-gradient-to-r from-[#E85D45] via-[#FFC48A] to-[#3A2D28] dark:from-[#FF8A5C] dark:via-[#FFC48A] dark:to-[#A47B61] shadow-[0_0_30px_rgba(232,93,69,0.4)] mb-16 md:mb-24 cursor-pointer"
            onClick={handleSpectrumClick}
          >
            {/* Highlight overlay for active filter */}
            {activeFilter !== null && (
              <motion.div
                className="absolute top-0 h-full bg-white/30 rounded-full"
                style={{
                  width: `${100 / strengthZones.length}%`,
                  left: `${activeFilter * (100 / strengthZones.length)}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
            
            <motion.div
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent mix-blend-overlay"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )}

        {/* Interactive Segments - Responsive Layout */}
        <div 
          ref={containerRef}
          className="relative max-w-6xl mx-auto"
        >
          <div className={`${isMobile ? 'flex flex-col space-y-8' : 'grid'} ${isMobile ? '' : 'md:grid-cols-5'}`}>
            {strengthZones.map((zone, index) => (
              <motion.div
                key={zone.title}
                className="group relative cursor-pointer"
                whileHover={!isMobile ? { scale: 1.05 } : {}}
                onHoverStart={!isMobile ? () => setHoveredIndex(index) : undefined}
                onHoverEnd={!isMobile ? () => setHoveredIndex(null) : undefined}
                onTap={isMobile ? () => setHoveredIndex(hoveredIndex === index ? null : index) : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {/* Segment Label with Highlight for Active Filter */}
                <div className="text-center mb-4">
                  <h3 className={`text-lg md:text-xl font-bold ${textColorPrimary} whitespace-nowrap ${
                    activeFilter === index ? 'text-2xl scale-110 text-[#FF6F61] drop-shadow-[0_0_8px_rgba(255,111,97,0.6)]' : ''
                  } transition-all duration-300`}>
                    {zone.title}
                  </h3>
                </div>

                {/* Segment Visual with Highlight for Active Filter */}
                <div 
                  className={`h-3 md:h-4 rounded-full mx-2 transition-all duration-300 ${
                    activeFilter === index ? 'ring-4 ring-white/50 scale-110' : ''
                  } ${isMobile ? 'h-2' : ''}`}
                  style={{ 
                    background: index === 0 ? 'linear-gradient(to right, #E85D45, #FF8A5C)' :
                               index === 1 ? 'linear-gradient(to right, #FF8A5C, #FFC48A)' :
                               index === 2 ? 'linear-gradient(to right, #FFC48A, #F4C27A)' :
                               index === 3 ? 'linear-gradient(to right, #F4C27A, #3A2D28)' :
                               'linear-gradient(to right, #3A2D28, #A47B61)',
                    boxShadow: hoveredIndex === index || activeFilter === index ? '0 0 15px rgba(232, 93, 69, 0.6)' : 'none'
                  }}
                />

                {/* Info Card - Responsive positioning */}
                <motion.div
                  className={`absolute left-1/2 -translate-x-1/2 ${cardBg} border ${cardBorder} p-4 md:p-6 rounded-2xl shadow-lg pointer-events-none w-64 md:w-72 backdrop-blur-md z-10 ${
                    isMobile 
                      ? 'bottom-full mb-4 left-0 translate-x-0' 
                      : typeof window !== 'undefined' && window.innerWidth <= 768 
                        ? 'bottom-full mb-4' 
                        : '-top-32'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? (isMobile ? 10 : typeof window !== 'undefined' && window.innerWidth <= 768 ? 10 : -10) : 20
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={`text-lg md:text-xl font-bold ${textColorPrimary} mb-2`}>{zone.title}</h3>
                  <p className={`text-xs md:text-sm ${textColorSecondary} mb-3`}>{zone.description}</p>
                  <ul className="flex flex-wrap gap-1 md:gap-2 justify-center">
                    {zone.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-xs px-2 py-1 md:px-3 md:py-1 rounded-full border text-light-textMuted dark:text-dark-textMuted"
                        style={{ 
                          backgroundColor: theme === 'dark' ? 'rgba(36, 26, 23, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                          borderColor: theme === 'dark' ? '#3C2E2A' : '#E8D5C8'
                        }}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Horizontal Skill Evolution Timeline - Clean structure without extra lines */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto">
            {/* Main timeline container */}
            <div className="relative">
              {/* Timeline nodes with labels - Clean structure: Number -> Heading -> Description */}
              <div className="relative flex justify-between">
                {evolutionStages.map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    className="relative flex flex-col items-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Number */}
                    <div className="relative z-10 mb-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${index === 0 ? '#E85D45' : index === 1 ? '#FF8A5C' : index === 2 ? '#FFC48A' : index === 3 ? '#F4C27A' : '#3A2D28'}, ${index === 0 ? '#D94A33' : index === 1 ? '#FF6F61' : index === 2 ? '#F4C27A' : index === 3 ? '#E85D45' : '#2D1B18'})`,
                          border: `3px solid ${theme === 'dark' ? '#241A17' : '#FFFFFF'}`
                        }}
                      >
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                    
                    {/* Heading */}
                    <h4 className={`font-bold ${textColorPrimary} text-sm mb-2 text-center`}>{stage.name}</h4>
                    
                    {/* Description */}
                    <p className={`text-xs ${textColorSecondary} text-center max-w-[100px]`}>{stage.description}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Main timeline horizontal line */}
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-gradient-to-r from-[#E85D45] via-[#FFC48A] to-[#3A2D28] dark:from-[#FF8A5C] dark:via-[#FFC48A] dark:to-[#A47B61] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;