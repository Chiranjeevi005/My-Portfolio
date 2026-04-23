"use client";

import { useMemo } from "react";
import { PortfolioContext } from "@/context/PortfolioContext";
import Projects from "@/components/works/Projects";
import ExperienceSection from "@/components/works/ExperienceSection";
import SkillsMatrix from "@/components/about/SkillsMatrix";
import { Laptop, Tablet, Smartphone, Eye } from "lucide-react";
import { motion } from "framer-motion";

interface LivePreviewProps {
  type: "projects" | "experience" | "skills";
  draftData: any;
  allData: any; // The full portfolio data
}

export default function LivePreview({ type, draftData, allData }: LivePreviewProps) {
  // Map our ContentEngine data back to the UI context format
  const mergedData = useMemo(() => {
    const newPortfolio = { ...allData };

    if (type === "projects") {
      // Find and replace the project being edited
      const projectIndex = newPortfolio.projects.findIndex((p: any) => p.id === draftData.id || p.internalId === draftData.id);
      
      const mappedProject = {
        id: draftData.id,
        title: draftData.title,
        role: "Lead Developer", // Default for preview
        description: draftData.description,
        technologies: draftData.tags || [],
        image: "/project-placeholder.jpg",
        liveUrl: draftData.videoUrl || "#",
        githubUrl: "#",
      };

      if (projectIndex > -1) {
        newPortfolio.projects = [
          ...newPortfolio.projects.slice(0, projectIndex),
          mappedProject,
          ...newPortfolio.projects.slice(projectIndex + 1),
        ];
      } else {
        newPortfolio.projects = [mappedProject, ...newPortfolio.projects];
      }
    }

    // Similar logic for experience and skills if needed

    return { portfolioData: newPortfolio };
  }, [type, draftData, allData]);

  return (
    <div className="flex flex-col h-full bg-light-bgSecondary/30 dark:bg-dark-bgSecondary/30 rounded-2xl border border-light-border dark:border-dark-border overflow-hidden">
      {/* Preview Header */}
      <div className="px-6 py-3 border-b border-light-border dark:border-dark-border flex items-center justify-between bg-light-bgSurface/50 dark:bg-dark-bgSurface/50">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-light-textMuted dark:text-dark-textMuted">
          <Eye size={14} className="text-light-textAccent dark:text-dark-textAccent" />
          Live Preview
        </div>
        <div className="flex items-center gap-4 text-light-textMuted dark:text-dark-textMuted">
          <Laptop size={16} className="cursor-pointer hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors" />
          <Tablet size={16} className="cursor-pointer hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors opacity-50" />
          <Smartphone size={16} className="cursor-pointer hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors opacity-50" />
        </div>
      </div>

      {/* Preview Viewport */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar bg-light-bgPrimary dark:bg-dark-bgPrimary origin-top scale-[0.85] w-[117.6%] h-[117.6%] -translate-x-[7.5%] -translate-y-[7.5%] pointer-events-none select-none">
        <PortfolioContext.Provider value={mergedData}>
          <motion.div
            key={JSON.stringify(draftData)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {type === "projects" && <Projects />}
            {type === "experience" && <ExperienceSection />}
            {type === "skills" && <SkillsMatrix />}
          </motion.div>
        </PortfolioContext.Provider>
      </div>

      {/* Preview Footer */}
      <div className="px-6 py-2 bg-light-textAccent/5 dark:bg-dark-textAccent/5 text-[10px] text-center text-light-textAccent dark:text-dark-textAccent font-medium border-t border-light-textAccent/10">
        Interactive elements are disabled in preview mode
      </div>
    </div>
  );
}
