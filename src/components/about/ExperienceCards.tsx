'use client';

import { motion } from 'framer-motion';

const ExperienceCards = () => {
  const experiences = [
    {
      role: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2022 - Present",
      description: "Leading frontend development for enterprise SaaS products using React and TypeScript. Implemented design systems that improved development velocity by 30%.",
      achievements: [
        "Reduced page load times by 40% through code optimization",
        "Mentored 5 junior developers and established coding best practices",
        "Led the migration of legacy codebase to modern React architecture"
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Next.js"]
    },
    {
      role: "Full Stack Developer",
      company: "Digital Solutions Co.",
      period: "2020 - 2022",
      description: "Developed and maintained web applications for clients in finance and healthcare sectors. Collaborated with UX designers to implement responsive interfaces.",
      achievements: [
        "Built 12 client projects with 95% client satisfaction rate",
        "Implemented CI/CD pipelines that reduced deployment time by 60%",
        "Created reusable component library used across 5 projects"
      ],
      tech: ["Node.js", "Express", "MongoDB", "React", "AWS"]
    },
    {
      role: "Junior Web Developer",
      company: "StartupXYZ",
      period: "2019 - 2020",
      description: "Developed marketing websites and landing pages for various clients. Gained experience in responsive design and cross-browser compatibility.",
      achievements: [
        "Created 20+ responsive websites with mobile-first approach",
        "Improved SEO scores for client websites by an average of 35%",
        "Implemented accessibility features compliant with WCAG 2.1 standards"
      ],
      tech: ["HTML/CSS", "JavaScript", "WordPress", "Bootstrap"]
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
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-6 md:p-8 shadow-lg border border-light-border dark:border-dark-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary">{exp.role}</h3>
                  <p className="text-light-textAccent dark:text-dark-textAccent font-medium text-lg">{exp.company}</p>
                </div>
                <span className="text-light-textMuted dark:text-dark-textMuted bg-light-bgSecondary dark:bg-dark-bgSecondary px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6">{exp.description}</p>
              
              <h4 className="font-bold text-light-textPrimary dark:text-dark-textPrimary mb-3">Key Achievements:</h4>
              <ul className="space-y-2 mb-6">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-light-textAccent dark:text-dark-textAccent mr-2">✓</span>
                    <span className="text-light-textSecondary dark:text-dark-textSecondary">{achievement}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-light-buttonPrimary/10 dark:bg-dark-buttonPrimary/10 text-light-buttonPrimary dark:text-dark-buttonPrimary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceCards;