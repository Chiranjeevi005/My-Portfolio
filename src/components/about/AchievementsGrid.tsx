'use client';

import { motion } from 'framer-motion';

const AchievementsGrid = () => {
  const achievements = [
    {
      title: "Best Innovation Award",
      issuer: "Tech Innovations Inc.",
      year: "2022",
      description: "Recognized for developing a groundbreaking solution that improved system efficiency by 40%."
    },
    {
      title: "Certified React Developer",
      issuer: "Google Certification",
      year: "2021",
      description: "Advanced certification in React development and modern frontend architecture."
    },
    {
      title: "Open Source Contributor",
      issuer: "GitHub Community",
      year: "2020",
      description: "Contributed to 10+ open source projects, with over 500 stars across repositories."
    },
    {
      title: "Academic Excellence",
      issuer: "University of Technology",
      year: "2019",
      description: "Graduated with honors, achieving top 5% in Computer Science program."
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
            Achievements & Certifications
          </h2>
          <div className="w-20 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-light-border dark:border-dark-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-12 h-12 rounded-full bg-light-textAccent/10 dark:bg-dark-textAccent/10 flex items-center justify-center mb-4">
                <span className="text-light-textAccent dark:text-dark-textAccent text-xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-2">{achievement.title}</h3>
              <p className="text-light-textAccent dark:text-dark-textAccent font-medium mb-3">{achievement.issuer} • {achievement.year}</p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">{achievement.description}</p>
              <button className="mt-4 text-light-textAccent dark:text-dark-textAccent font-medium text-sm hover:underline">
                View Certificate
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsGrid;