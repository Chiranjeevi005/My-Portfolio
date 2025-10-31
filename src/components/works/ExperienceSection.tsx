'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  Code, 
  Zap, 
  Palette,
  Server,
  Database,
  Smartphone,
  Globe
} from 'lucide-react';

// Experience data structure personalized for Chiran Jeevi
const experienceData = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Unified Mentor",
    duration: "May 2024 - Aug 2024",
    description: "Contributed to production-grade web apps, optimized UI performance, and crafted reusable components using React & Tailwind CSS.",
    skills: [
      { name: "React.js", growth: 90, icon: <Code size={16} /> },
      { name: "Tailwind CSS", growth: 85, icon: <Palette size={16} /> },
      { name: "Problem Solving", growth: 80, icon: <Zap size={16} /> },
      { name: "API Integration", growth: 75, icon: <Globe size={16} /> },
    ],
    takeaways: [
      "Built confidence in real-world project delivery",
      "Enhanced system thinking & debugging",
      "Improved collaboration in agile environment"
    ]
  },
  {
    id: 2,
    role: "Freelance UI Engineer",
    company: "Self-Driven Projects",
    duration: "2023 - Present",
    description: "Designed and deployed responsive portfolios, dashboards, and apps integrating AI, authentication, and analytics.",
    skills: [
      { name: "Next.js", growth: 95, icon: <Globe size={16} /> },
      { name: "UX Design", growth: 88, icon: <Palette size={16} /> },
      { name: "AI Integration", growth: 70, icon: <Zap size={16} /> },
      { name: "Performance Tuning", growth: 82, icon: <Server size={16} /> },
    ],
    takeaways: [
      "Balanced design and logic thinking",
      "Refined clean code discipline",
      "Developed business-client communication"
    ]
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "Personal Projects",
    duration: "2022 - Present",
    description: "Developed full-stack applications with modern technologies, focusing on clean architecture and user experience.",
    skills: [
      { name: "Node.js", growth: 85, icon: <Server size={16} /> },
      { name: "MongoDB", growth: 80, icon: <Database size={16} /> },
      { name: "TypeScript", growth: 90, icon: <Code size={16} /> },
      { name: "Responsive Design", growth: 95, icon: <Smartphone size={16} /> },
    ],
    takeaways: [
      "Mastered end-to-end development workflow",
      "Learned system architecture principles",
      "Improved testing and debugging skills"
    ]
  }
];

// Custom tooltip for the bar chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border p-3 rounded-xl shadow-lg">
        <p className="text-light-textPrimary dark:text-dark-textPrimary font-medium">{`${label}`}</p>
        <p className="text-light-buttonPrimary dark:text-dark-buttonPrimary font-bold">{`${payload[0].value}% Growth`}</p>
      </div>
    );
  }
  return null;
};

const ExperienceSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Function to get color based on theme and skill index for differentiation
  const getBarColor = (index: number) => {
    // Light mode colors from the color system
    const lightColors = [
      '#E85D45', // light-buttonPrimary (coral)
      '#F4C27A', // light-accent2 (golden)
      '#FF6F61', // light-link (peach)
      '#D7745B', // light-textHighlight (terracotta)
      '#A48C82'  // light-textMuted (warm sand)
    ];
    
    // Dark mode colors from the color system
    const darkColors = [
      '#FF8A5C', // dark-buttonPrimary (neon coral)
      '#FFC48A', // dark-textHighlight (golden blush)
      '#FF9966', // dark-buttonHover (glow hover)
      '#FF9D6E', // dark-link (soft ember)
      '#A07E69'  // dark-textMuted (antique bronze)
    ];
    
    const colors = isDarkMode ? darkColors : lightColors;
    return colors[index % colors.length];
  };

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
            Experience & Growth
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
            Every role refined my craft — not just what I built, but how I grew.
          </p>
          <div className="w-20 h-1 bg-light-buttonPrimary dark:bg-dark-buttonPrimary mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative rounded-2xl p-6 border transition-all duration-300 overflow-hidden
                bg-light-bgSurface dark:bg-dark-bgSurface 
                border-light-border dark:border-dark-border 
                text-light-textPrimary dark:text-dark-textPrimary
                hover:border-light-buttonPrimary dark:hover:border-dark-buttonPrimary
                shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transformStyle: 'preserve-3d',
                transform: hoveredCard === exp.id ? 'rotateX(5deg) rotateY(5deg)' : 'rotateX(0) rotateY(0)'
              }}
            >
              {/* Company and Role Header */}
              <div className="flex flex-col mb-4">
                <h3 className="text-xl font-bold text-light-textPrimary dark:text-dark-textPrimary">{exp.role}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="font-medium text-light-buttonPrimary dark:text-dark-buttonPrimary">
                    {exp.company}
                  </p>
                  <span className="text-light-textMuted dark:text-dark-textMuted text-sm">
                    {exp.duration}
                  </span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-light-textSecondary dark:text-dark-textSecondary mb-6 text-sm leading-relaxed">
                {exp.description}
              </p>
              
              {/* Takeaways */}
              <div className="mb-6">
                <h4 className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-2 text-sm">
                  Key Takeaways:
                </h4>
                <ul className="space-y-2">
                  {exp.takeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 mt-1 text-light-buttonPrimary dark:text-dark-buttonPrimary">
                        ▪
                      </span>
                      <span className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Skills Growth Matrix with Recharts */}
              <div className="mb-6">
                <h4 className="font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-3 text-sm">
                  Skill Impact Matrix:
                </h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={exp.skills}
                      layout="vertical"
                      margin={{ top: 5, right: 5, left: 70, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        width={60} 
                        tick={{ 
                          fill: isDarkMode ? '#D9BFAE' : '#5A3E36', 
                          fontSize: 10 
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="growth" radius={[0, 2, 2, 0]} barSize={8}>
                        {exp.skills.map((entry, skillIndex) => (
                          <Cell 
                            key={`cell-${index}-${skillIndex}`} 
                            fill={getBarColor(skillIndex)} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="flex items-center px-2 py-1 rounded-full text-xs
                      bg-light-buttonPrimary/10 dark:bg-dark-buttonPrimary/10 
                      text-light-buttonPrimary dark:text-dark-buttonPrimary"
                  >
                    <span className="mr-1">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Personal Growth Statement */}
        <motion.div 
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-light-textSecondary dark:text-dark-textSecondary italic text-lg">
            "Every project sharpened not just my code, but my clarity.
            Each line I wrote turned complexity into simplicity — one product at a time."
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-light-buttonPrimary to-light-textAccent dark:from-dark-buttonPrimary dark:to-dark-textAccent rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;