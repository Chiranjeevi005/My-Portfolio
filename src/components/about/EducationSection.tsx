'use client';

import { motion } from 'framer-motion';

const EducationSection = () => {
  const education = [
    {
      degree: "MSc Computer Science",
      institution: "University of Technology",
      period: "2018 - 2020",
      gpa: "3.8/4.0",
      description: "Specialized in Human-Computer Interaction and Software Engineering. Completed thesis on 'Optimizing User Experience in Enterprise Applications'."
    },
    {
      degree: "BSc Computer Engineering",
      institution: "State University",
      period: "2014 - 2018",
      gpa: "3.6/4.0",
      description: "Focused on web technologies and software development. Graduated with honors and completed multiple internships."
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021",
      description: "Validated expertise in designing distributed systems on AWS."
    },
    {
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      date: "2020",
      description: "Demonstrated proficiency in developing, deploying, and debugging cloud applications."
    },
    {
      name: "Certified ScrumMaster",
      issuer: "Scrum Alliance",
      date: "2019",
      description: "Proven knowledge of Scrum framework and agile project management."
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
            Education & Certifications
          </h2>
          <div className="w-20 h-1 bg-light-textAccent dark:bg-dark-textAccent mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-8 pb-2 border-b-2 border-light-textAccent dark:border-dark-textAccent inline-block">
              Academic Background
            </h3>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-6 shadow-lg border border-light-border dark:border-dark-border"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">{edu.degree}</h4>
                      <p className="text-light-textAccent dark:text-dark-textAccent font-medium">{edu.institution}</p>
                    </div>
                    <span className="text-light-textMuted dark:text-dark-textMuted bg-light-bgSecondary dark:bg-dark-bgSecondary px-3 py-1 rounded-full text-sm mt-2 sm:mt-0">
                      {edu.period}
                    </span>
                  </div>
                  
                  <p className="text-light-textSecondary dark:text-dark-textSecondary mb-3">{edu.description}</p>
                  
                  <div className="inline-block px-3 py-1 bg-light-buttonPrimary/10 dark:bg-dark-buttonPrimary/10 text-light-buttonPrimary dark:text-dark-buttonPrimary rounded-full font-medium">
                    GPA: {edu.gpa}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-8 pb-2 border-b-2 border-light-textAccent dark:border-dark-textAccent inline-block">
              Professional Certifications
            </h3>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl p-6 shadow-lg border border-light-border dark:border-dark-border"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">{cert.name}</h4>
                    <span className="text-light-textMuted dark:text-dark-textMuted text-sm bg-light-bgSecondary dark:bg-dark-bgSecondary px-2 py-1 rounded">
                      {cert.date}
                    </span>
                  </div>
                  
                  <p className="text-light-textAccent dark:text-dark-textAccent font-medium mb-3">{cert.issuer}</p>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary">{cert.description}</p>
                  
                  <button className="mt-4 text-light-textAccent dark:text-dark-textAccent font-medium text-sm hover:underline flex items-center">
                    View Certificate
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;