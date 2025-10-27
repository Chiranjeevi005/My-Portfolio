'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AchievementsGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const achievements = [
    {
      id: 1,
      title: "Best Innovation Award",
      issuer: "Tech Innovations Inc.",
      year: "2022",
      description: "Recognized for developing a groundbreaking solution that improved system efficiency by 40%.",
      image: "/certificates/innovation-award.png",
      link: "/certificates/innovation-award.pdf"
    },
    {
      id: 2,
      title: "Certified React Developer",
      issuer: "Google Certification",
      year: "2021",
      description: "Completed Advanced React course with distinction.",
      image: "/certificates/react-cert.png",
      link: "/certificates/react-cert.pdf"
    },
    {
      id: 3,
      title: "Open Source Contributor",
      issuer: "GitHub Community",
      year: "2020",
      description: "Contributed to 10+ open source projects, with over 500 stars across repositories.",
      image: "/certificates/oss-contributor.png",
      link: "/certificates/oss-contributor.pdf"
    },
    {
      id: 4,
      title: "Academic Excellence",
      issuer: "University of Technology",
      year: "2019",
      description: "Graduated with honors, achieving top 5% in Computer Science program.",
      image: "/certificates/academic-excellence.png",
      link: "/certificates/academic-excellence.pdf"
    },
    {
      id: 5,
      title: "Hackathon Winner",
      issuer: "Global Tech Hackathon",
      year: "2018",
      description: "Winner of XYZ Hackathon 2024 with innovative AI-powered solution.",
      image: "/certificates/hackathon-winner.png",
      link: "/certificates/hackathon-winner.pdf"
    }
  ];

  // Scroll-triggered animations
  useEffect(() => {
    if (typeof window === 'undefined' || !timelineRef.current) return;

    // Animate the timeline container
    const timelineAnimation = gsap.fromTo(
      timelineRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate each card
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    return () => {
      timelineAnimation?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle scroll snap navigation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const container = timelineRef.current;
      const scrollPosition = container.scrollLeft + container.offsetWidth / 2;
      
      achievements.forEach((_, index) => {
        const card = cardRefs.current[index];
        if (card) {
          const cardPosition = card.offsetLeft + card.offsetWidth / 2;
          if (Math.abs(cardPosition - scrollPosition) < card.offsetWidth / 2) {
            setActiveIndex(index);
          }
        }
      });
    };

    const container = timelineRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [achievements]);

  // Scroll to specific card
  const scrollToCard = (index: number) => {
    if (timelineRef.current && cardRefs.current[index]) {
      timelineRef.current.scrollTo({
        left: cardRefs.current[index].offsetLeft - timelineRef.current.offsetWidth / 2 + cardRefs.current[index].offsetWidth / 2,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section 
      ref={ref}
      className="py-16 sm:py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary relative overflow-hidden"
    >
      {/* Floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-light-textHighlight/10 dark:bg-dark-textHighlight/10 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            Achievements & Certificates
          </h2>
          <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto mb-6">
            Each milestone is a story — of persistence, passion, and progress.
          </p>
          <div className="w-24 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full"></div>
        </motion.div>

        {/* Timeline Carousel Grid */}
        <div className="relative">
          {/* Glowing Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 z-0">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-light-textAccent dark:via-dark-textAccent to-transparent rounded-full animate-pulseGlow"></div>
          </div>

          {/* Milestone Cards Container */}
          <div 
            ref={timelineRef}
            className="flex overflow-x-auto scrollbar-hide py-16 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseDown={(e) => {
              const container = timelineRef.current;
              if (!container) return;
              
              const startX = e.pageX - container.offsetLeft;
              const scrollLeft = container.scrollLeft;
              let isDragging = false;
              
              const mouseMoveHandler = (e: MouseEvent) => {
                e.preventDefault();
                isDragging = true;
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2; // Scroll-fast multiplier
                container.scrollLeft = scrollLeft - walk;
              };
              
              const mouseUpHandler = () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                
                // Reset cursor if not dragging
                if (container && !isDragging) {
                  container.style.cursor = 'grab';
                }
              };
              
              document.addEventListener('mousemove', mouseMoveHandler);
              document.addEventListener('mouseup', mouseUpHandler);
            }}
            onTouchStart={(e) => {
              const container = timelineRef.current;
              if (!container) return;
              
              const startX = e.touches[0].pageX - container.offsetLeft;
              const scrollLeft = container.scrollLeft;
              
              const touchMoveHandler = (e: TouchEvent) => {
                const x = e.touches[0].pageX - container.offsetLeft;
                const walk = (x - startX) * 2; // Scroll-fast multiplier
                container.scrollLeft = scrollLeft - walk;
              };
              
              const touchEndHandler = () => {
                document.removeEventListener('touchmove', touchMoveHandler);
                document.removeEventListener('touchend', touchEndHandler);
              };
              
              document.addEventListener('touchmove', touchMoveHandler);
              document.addEventListener('touchend', touchEndHandler);
            }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                ref={el => { if (el) cardRefs.current[index] = el; }}
                className={`flex-shrink-0 w-80 sm:w-96 mx-4 snap-start relative ${
                  index % 2 === 0 ? 'mt-0' : 'mt-20'
                }`}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Milestone Card */}
                <div className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-light-border dark:border-dark-border backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 relative overflow-hidden h-[500px] flex flex-col">
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 rounded-2xl border border-light-textAccent/30 dark:border-dark-textAccent/30 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  
                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Year Badge */}
                    <div className="inline-block px-3 py-1 bg-light-textAccent/10 dark:bg-dark-textAccent/10 text-light-textAccent dark:text-dark-textAccent rounded-full text-sm font-medium mb-4">
                      {achievement.year}
                    </div>
                    
                    {/* Certificate Image */}
                    <div className="w-full h-64 rounded-xl bg-gradient-to-br from-light-bgSurface to-light-textAccent/5 dark:from-dark-bgSurface dark:to-dark-textAccent/5 mb-4 flex items-center justify-center overflow-hidden border border-light-border dark:border-dark-border">
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-light-textAccent/5 to-light-textHighlight/5 dark:from-dark-textAccent/5 dark:to-dark-textHighlight/5"></div>
                        <div className="relative z-10 text-center p-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-textAccent/30 dark:text-dark-textAccent/30 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="text-light-textSecondary/50 dark:text-dark-textSecondary/50 text-sm font-medium">Certificate Preview</p>
                        </div>
                        <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-light-textAccent/30 dark:text-dark-textAccent/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-2">
                      {achievement.title}
                    </h3>
                    
                    {/* Issuer */}
                    <p className="text-light-textAccent dark:text-dark-textAccent font-medium mb-3">
                      {achievement.issuer}
                    </p>
                    
                    {/* Description */}
                    <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm mb-4 flex-grow">
                      {achievement.description}
                    </p>
                    
                    {/* View Certificate Button */}
                    <button className="text-light-textAccent dark:text-dark-textAccent font-medium text-sm hover:underline transition-all duration-300 group mt-auto inline-flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center mt-4 space-x-2 md:hidden">
          {achievements.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-light-textAccent dark:bg-dark-textAccent scale-125'
                  : 'bg-light-textSecondary/30 dark:bg-dark-textSecondary/30'
              }`}
              aria-label={`Go to achievement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsGrid;