'use client';

import { motion } from 'framer-motion';

const InterestsShowcase = () => {
  const interests = [
    {
      title: "Music Enthusiast",
      icon: "🎵",
      description: "Passionate about discovering new genres and attending live concerts"
    },
    {
      title: "Aesthetic Designer",
      icon: "🎨",
      description: "Love creating visually appealing designs and user interfaces"
    },
    {
      title: "Lifelong Learner",
      icon: "📚",
      description: "Always exploring new technologies and expanding my knowledge"
    },
    {
      title: "Tech Explorer",
      icon: "💻",
      description: "Enthusiastic about emerging technologies and their applications"
    },
    {
      title: "Content Creator",
      icon: "✍️",
      description: "Enjoy sharing knowledge through blogs and tutorials"
    },
    {
      title: "Open Source Contributor",
      icon: "🚀",
      description: "Actively contributing to open source projects and communities"
    }
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
            Beyond the Screen
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
            Exploring interests that shape my perspective and fuel my creativity
          </p>
          <div className="w-20 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-6 shadow-lg border border-light-border dark:border-dark-border text-center hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 rounded-full bg-light-buttonPrimary/10 dark:bg-dark-buttonPrimary/10 flex items-center justify-center text-2xl mx-auto mb-4">
                {interest.icon}
              </div>
              <h3 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-2">{interest.title}</h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">{interest.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InterestsShowcase;