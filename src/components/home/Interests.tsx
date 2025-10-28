'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  BookOpen, 
  HandHeart, 
  TrendingUp, 
  Cpu, 
  Film 
} from 'lucide-react';

const InterestsShelf = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const shelfRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interest data with icons and narratives
  const interests = [
    { 
      icon: Plane, 
      title: "Travel & Exploration", 
      narrative: "Learning from every horizon. Travel teaches me perspective — every culture, city, and person adds depth to how I design and build. I explore places not just to see, but to understand stories that inspire better experiences."
    },
    { 
      icon: BookOpen, 
      title: "Edutainment & Lifelong Learning", 
      narrative: "Blending curiosity with creativity. I believe in learning that excites. Whether it's a new framework or a documentary on innovation, I'm driven by curiosity that turns knowledge into creation."
    },
    { 
      icon: HandHeart, 
      title: "Volunteering & Community Impact", 
      narrative: "Building with empathy. I volunteer not just to give back, but to grow emotionally and socially. Helping others reminds me why technology should always serve people first."
    },
    { 
      icon: TrendingUp, 
      title: "Business Strategy & Product Thinking", 
      narrative: "Ideas that drive impact. My BBA roots shape how I think — I approach every project with a founder's vision and a strategist's clarity. It's where design, market insight, and user needs intersect."
    },
    { 
      icon: Cpu, 
      title: "Exploring AI & Emerging Tech", 
      narrative: "Shaping tomorrow, today. AI fascinates me — I constantly explore how automation, machine learning, and intelligent systems can simplify complex business problems and empower creativity."
    },
    { 
      icon: Film, 
      title: "Movies, Webinars & Cultural Programs", 
      narrative: "Stories that spark innovation. I find inspiration in stories — films, webinars, and cultural experiences help me connect human emotion to technology. Every good product, like a good story, moves people."
    }
  ];

  // Handle mouse events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!shelfRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - shelfRef.current.offsetLeft);
    setScrollLeft(shelfRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !shelfRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - shelfRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    shelfRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!shelfRef.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - shelfRef.current.offsetLeft);
    setScrollLeft(shelfRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !shelfRef.current) return;
    
    const x = e.touches[0].pageX - shelfRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    shelfRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Update scroll progress
  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = shelf;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(isNaN(progress) ? 0 : progress);
    };

    shelf.addEventListener('scroll', handleScroll);
    return () => shelf.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced smooth scrolling with momentum
  useEffect(() => {
    if (!shelfRef.current) return;

    let momentumId: number;
    let velocity = 0;
    let lastScrollLeft = 0;
    let lastTime = 0;

    const handleScrollStart = () => {
      if (isDragging) return;
      
      const now = Date.now();
      const deltaTime = now - lastTime;
      const deltaScroll = shelfRef.current!.scrollLeft - lastScrollLeft;
      
      if (deltaTime > 0) {
        velocity = deltaScroll / deltaTime;
      }
      
      lastScrollLeft = shelfRef.current!.scrollLeft;
      lastTime = now;
    };

    const handleScrollEnd = () => {
      if (isDragging || Math.abs(velocity) < 0.01) return;
      
      velocity *= 0.95; // Friction
      shelfRef.current!.scrollLeft += velocity * 16; // 60fps approximation
      
      if (Math.abs(velocity) > 0.01) {
        momentumId = requestAnimationFrame(handleScrollEnd);
      }
    };

    const shelfElement = shelfRef.current;
    shelfElement?.addEventListener('scroll', handleScrollStart);
    
    // Also handle wheel events for momentum
    const handleWheel = (e: WheelEvent) => {
      if (isDragging) return;
      
      velocity = e.deltaX * 0.3;
      cancelAnimationFrame(momentumId);
      momentumId = requestAnimationFrame(handleScrollEnd);
    };

    shelfElement?.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      shelfElement?.removeEventListener('scroll', handleScrollStart);
      shelfElement?.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(momentumId);
    };
  }, [isDragging]);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary transition-colors duration-700 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#FF8A5C]/10 to-[#FFA88C]/10 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-[#E85D45]/10 to-[#FF8A5C]/10 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary font-heading transition-colors duration-700">
            Beyond the Screen & Strategy
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl mb-8 md:mb-12 text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto transition-colors duration-700"
          >
            The dimensions beyond code — exploring what fuels creativity and purpose.
          </motion.p>
        </motion.div>

        {/* Interactive Shelf */}
        <div className="relative">
          <div 
            ref={shelfRef}
            className={`flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              ['--light-textAccent' as any]: '#E85D45',
              ['--dark-textAccent' as any]: '#FF8A5C'
            } as React.CSSProperties}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="snap-start flex-shrink-0 w-72 md:w-80"
              >
                <motion.div 
                  className="group h-full bg-light-cardBg dark:bg-dark-cardBg border border-light-cardBorder dark:border-dark-cardBorder rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_0_25px_var(--light-textAccent)] dark:hover:shadow-[0_0_25px_var(--dark-textAccent)] flex flex-col relative overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated border glow effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#E85D45] to-[#FF8A5C] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(45deg, #E85D45, #FF8A5C, #FFA88C, #E85D45)`,
                        backgroundSize: "300% 300%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div 
                      className="mb-4 text-light-textAccent dark:text-dark-textAccent group-hover:text-light-textHighlight dark:group-hover:text-dark-textHighlight transition-colors duration-300"
                      whileHover={{ 
                        scale: 1.2,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <interest.icon size={32} />
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold mb-3 text-light-textPrimary dark:text-dark-textPrimary group-hover:text-light-textAccent dark:group-hover:text-dark-textAccent transition-colors duration-300 font-heading"
                      whileHover={{ 
                        x: 5,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {interest.title}
                    </motion.h3>
                    <motion.p 
                      className="text-light-textSecondary dark:text-dark-textSecondary text-sm font-body leading-relaxed flex-grow"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ 
                        opacity: 1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {interest.narrative}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Progress Indicator */}
          <div className="mt-2 h-1 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#E85D45] to-[#FF8A5C]"
              style={{ width: `${scrollProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Ending Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary italic">
            “Beyond every skill and screen lies a learner, a builder, and a dreamer — creating meaning through curiosity.”
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InterestsShelf;