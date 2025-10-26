'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const JourneyTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const milestones = [
    {
      year: "2014",
      title: "Started Computer Science Degree",
      description: "Began my journey in the world of technology with a passion for problem-solving and innovation.",
      icon: "🎓"
    },
    {
      year: "2018",
      title: "First Internship",
      description: "Landed my first internship at a local tech startup, gaining hands-on experience in web development.",
      icon: "💼"
    },
    {
      year: "2020",
      title: "Graduated & First Job",
      description: "Completed my degree and joined Tech Innovations Inc. as a Junior Developer, marking the start of my professional career.",
      icon: "🚀"
    },
    {
      year: "2022",
      title: "Senior Developer Role",
      description: "Promoted to Senior Frontend Developer, leading projects and mentoring junior team members.",
      icon: "🌟"
    },
    {
      year: "2023",
      title: "Freelance & Personal Projects",
      description: "Started freelancing and working on personal projects to explore new technologies and creative solutions.",
      icon: "💡"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-light-bgSecondary dark:bg-dark-bgSecondary">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            My Journey
          </h2>
          <div className="w-20 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-light-textMuted/30 dark:bg-dark-textMuted/30"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-light-textAccent dark:bg-dark-textAccent flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-light-bgPrimary dark:bg-dark-bgPrimary"></div>
                </div>
                
                {/* Content */}
                <div className={`lg:w-5/12 mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:pr-12 text-right' : 'lg:pl-12 text-left'}`}>
                  <div className={`p-6 rounded-2xl transition-all duration-300 ${activeIndex === index ? 'bg-light-bgSurface dark:bg-dark-bgSurface shadow-lg transform scale-105' : 'bg-light-bgPrimary/50 dark:bg-dark-bgPrimary/50'}`}>
                    <span className="text-light-textAccent dark:text-dark-textAccent font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary mt-2 mb-3">{milestone.title}</h3>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary">{milestone.description}</p>
                  </div>
                </div>
                
                {/* Icon */}
                <div className="lg:w-2/12 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-light-bgSurface dark:bg-dark-bgSurface flex items-center justify-center text-2xl shadow-md border-2 border-light-textAccent/20 dark:border-dark-textAccent/20">
                    {milestone.icon}
                  </div>
                </div>
                
                {/* Empty column for spacing */}
                <div className="lg:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;