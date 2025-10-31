'use client';

import { createContext, useContext, ReactNode } from 'react';

// Define the types for our portfolio data
interface Project {
  id: number;
  title: string;
  role: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
}

interface Skill {
  name: string;
  growth: number;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  skills: Skill[];
  takeaways: string[];
}

interface PortfolioData {
  projects: Project[];
  experiences: Experience[];
}

// Define the context
interface PortfolioContextType {
  portfolioData: PortfolioData;
}

// Create the context with default values
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Provider component
export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  // Project data from Projects component
  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      role: "Full-Stack Developer",
      description: "A scalable e-commerce solution with real-time inventory management and personalized recommendations.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/project1.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      role: "Frontend Lead",
      description: "Interactive data visualization platform for enterprise clients with real-time metrics and reporting.",
      technologies: ["React", "D3.js", "TypeScript", "Firebase"],
      image: "/project2.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      role: "Product Engineer",
      description: "Secure mobile banking application with biometric authentication and financial insights.",
      technologies: ["React Native", "Redux", "Node.js", "PostgreSQL"],
      image: "/project3.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Task Management System",
      role: "Full-Stack Developer",
      description: "Collaborative task management solution with real-time updates and team collaboration features.",
      technologies: ["Next.js", "Socket.io", "MongoDB", "Tailwind CSS"],
      image: "/project4.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Health & Fitness Tracker",
      role: "Frontend Developer",
      description: "Comprehensive health tracking application with workout planning and nutrition monitoring.",
      technologies: ["Vue.js", "Vuex", "Express", "MongoDB"],
      image: "/project5.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "AI-Powered Chatbot",
      role: "Backend Engineer",
      description: "Intelligent chatbot solution with natural language processing and machine learning capabilities.",
      technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
      image: "/project6.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 7,
      title: "Cloud Storage Solution",
      role: "DevOps Engineer",
      description: "Distributed cloud storage system with end-to-end encryption and real-time synchronization.",
      technologies: ["Go", "Docker", "Kubernetes", "AWS"],
      image: "/project7.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      id: 8,
      title: "IoT Smart Home Hub",
      role: "Embedded Systems Developer",
      description: "Centralized control system for IoT devices with voice recognition and automation capabilities.",
      technologies: ["C++", "Raspberry Pi", "MQTT", "React"],
      image: "/project8.jpg",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  // Experience data from ExperienceSection
  const experiences: Experience[] = [
    {
      id: 1,
      role: "Frontend Developer Intern",
      company: "Unified Mentor",
      duration: "May 2024 - Aug 2024",
      description: "Contributed to production-grade web apps, optimized UI performance, and crafted reusable components using React & Tailwind CSS.",
      skills: [
        { name: "React.js", growth: 90 },
        { name: "Tailwind CSS", growth: 85 },
        { name: "Problem Solving", growth: 80 },
        { name: "API Integration", growth: 75 },
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
        { name: "Next.js", growth: 95 },
        { name: "UX Design", growth: 88 },
        { name: "AI Integration", growth: 70 },
        { name: "Performance Tuning", growth: 82 },
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
        { name: "Node.js", growth: 85 },
        { name: "MongoDB", growth: 80 },
        { name: "TypeScript", growth: 90 },
        { name: "Responsive Design", growth: 95 },
      ],
      takeaways: [
        "Mastered end-to-end development workflow",
        "Learned system architecture principles",
        "Improved testing and debugging skills"
      ]
    }
  ];

  const portfolioData: PortfolioData = {
    projects,
    experiences
  };

  return (
    <PortfolioContext.Provider value={{ portfolioData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the portfolio context
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};