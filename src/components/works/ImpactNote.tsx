'use client';

import { motion } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';

const ImpactNote = () => {
  const { portfolioData } = usePortfolio();

  // Calculate real-time data from context
  const projectsCount = portfolioData.projects.length;
  const collaborationsCount = [...new Set(portfolioData.experiences.map(exp => exp.company))].length;
  
  // Calculate total unique skills
  const allSkills = portfolioData.experiences.flatMap(exp => exp.skills);
  const uniqueSkills = [...new Set(allSkills.map(skill => skill.name))];
  const skillsMastered = `${uniqueSkills.length}+`;
  
  // Calculate experience years (based on the most recent experience)
  const experienceYears = 2; // This would be calculated based on actual dates in a real implementation

  const impactData = {
    projectsCount,
    collaborationsCount,
    skillsMastered,
    experienceYears
  };

  return (
    <section className="relative w-full overflow-hidden bg-light-bgPrimary dark:bg-dark-bgPrimary py-20 md:py-28 transition-colors duration-700">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-6">
              The Impact of My Work
            </h2>
            <p className="text-lg md:text-xl text-light-textSecondary dark:text-dark-textSecondary max-w-3xl mx-auto">
              Real results from real projects, collaborations, and continuous growth
            </p>
          </motion.div>
          
          {/* Impact Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
            {/* Projects Shipped */}
            <motion.div
              className="bg-light-cardBg/60 dark:bg-dark-cardBg/60 rounded-2xl p-6 border border-light-cardBorder/50 dark:border-dark-cardBorder/50 backdrop-blur-sm shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 flex items-center justify-center mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">Projects</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-light-textAccent dark:text-dark-textAccent mb-2">
                {impactData.projectsCount}+
              </div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Successfully delivered and deployed
              </p>
            </motion.div>
            
            {/* Collaborations */}
            <motion.div
              className="bg-light-cardBg/60 dark:bg-dark-cardBg/60 rounded-2xl p-6 border border-light-cardBorder/50 dark:border-dark-cardBorder/50 backdrop-blur-sm shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 flex items-center justify-center mr-4">
                  <span className="text-2xl">💼</span>
                </div>
                <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">Clients</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-light-textAccent dark:text-dark-textAccent mb-2">
                {impactData.collaborationsCount}
              </div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Companies I've collaborated with
              </p>
            </motion.div>
            
            {/* Skills Mastered */}
            <motion.div
              className="bg-light-cardBg/60 dark:bg-dark-cardBg/60 rounded-2xl p-6 border border-light-cardBorder/50 dark:border-dark-cardBorder/50 backdrop-blur-sm shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 flex items-center justify-center mr-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">Skills</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-light-textAccent dark:text-dark-textAccent mb-2">
                {impactData.skillsMastered}
              </div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Technologies I've mastered
              </p>
            </motion.div>
            
            {/* Experience */}
            <motion.div
              className="bg-light-cardBg/60 dark:bg-dark-cardBg/60 rounded-2xl p-6 border border-light-cardBorder/50 dark:border-dark-cardBorder/50 backdrop-blur-sm shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 flex items-center justify-center mr-4">
                  <span className="text-2xl">⏳</span>
                </div>
                <h3 className="text-lg font-semibold text-light-textPrimary dark:text-dark-textPrimary">Experience</h3>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-light-textAccent dark:text-dark-textAccent mb-2">
                {impactData.experienceYears}+
              </div>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Years of hands-on development
              </p>
            </motion.div>
          </div>
          
          {/* Expertise Statement */}
          <motion.div
            className="bg-gradient-to-r from-light-textAccent/10 to-light-textHighlight/10 dark:from-dark-textAccent/10 dark:to-dark-textHighlight/10 rounded-2xl p-8 md:p-12 border border-light-textAccent/20 dark:border-dark-textAccent/20 backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-6">
                What Sets Me Apart
              </h3>
              <p className="text-lg md:text-xl text-light-textSecondary dark:text-dark-textSecondary mb-6 leading-relaxed">
                With {impactData.projectsCount}+ successful projects, {impactData.collaborationsCount} industry collaborations, 
                and expertise in {impactData.skillsMastered} cutting-edge technologies, I bring a unique blend of technical 
                excellence and business understanding to every challenge.
              </p>
              <div className="text-xl md:text-2xl font-bold text-light-textAccent dark:text-dark-textAccent">
                I don't just write code — I build solutions that drive real business impact.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactNote;