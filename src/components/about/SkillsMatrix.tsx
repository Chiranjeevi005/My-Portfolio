'use client';

import { motion } from 'framer-motion';

const SkillsMatrix = () => {
  const businessSkills = [
    { name: "Strategic Planning", level: 90 },
    { name: "Project Management", level: 85 },
    { name: "Business Analysis", level: 80 },
    { name: "Team Leadership", level: 75 },
    { name: "Client Relations", level: 85 }
  ];

  const technicalSkills = [
    { name: "React/Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Database Design", level: 75 }
  ];

  return (
    <section className="py-16 sm:py-20 bg-light-bgPrimary dark:bg-dark-bgPrimary">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-4">
            Core Skills & Strengths
          </h2>
          <div className="w-20 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Business Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-8 pb-2 border-b-2 border-light-textAccent dark:border-dark-textAccent inline-block">
              Business & Strategic Skills
            </h3>
            
            <div className="space-y-6">
              {businessSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-light-textPrimary dark:text-dark-textPrimary">{skill.name}</span>
                    <span className="text-light-textMuted dark:text-dark-textMuted">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-light-textAccent dark:bg-dark-textAccent rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-8 pb-2 border-b-2 border-light-textAccent dark:border-dark-textAccent inline-block">
              Technical & Development Skills
            </h3>
            
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-light-textPrimary dark:text-dark-textPrimary">{skill.name}</span>
                    <span className="text-light-textMuted dark:text-dark-textMuted">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-light-textAccent dark:bg-dark-textAccent rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;