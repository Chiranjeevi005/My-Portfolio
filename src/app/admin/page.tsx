"use client";

import { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  User,
  LayoutDashboard,
} from "lucide-react";


import { useRouter } from "next/navigation";
import { usePortfolio } from "@/context/PortfolioContext";
import { useSession } from "@/context/SessionContext";

import ContentWorkbench from "@/components/admin/ContentWorkbench";
import AdminOverviewSection from "@/components/admin/AdminOverviewSection";
import AdminSidebarControl from "@/components/admin/AdminSidebarControl";

import TopControlBar from "@/components/admin/TopControlBar";

export default function AdminDashboard() {
  const router = useRouter();
  const { portfolioData } = usePortfolio();
  const { isAuthenticated, logout } = useSession();
  
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "experience" | "skills">("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary font-body transition-colors duration-500">
      {/* Navigation Control System */}
      <AdminSidebarControl 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen}
        onLogout={logout}

        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isCollapsed ? "lg:pl-[72px]" : "lg:pl-[280px]"} ${!isSidebarOpen ? "pl-0" : "pl-0" /* Mobile pl is handled by drawer positioning */}`}>

        {/* Top Control Layer */}
        <TopControlBar 
          currentTab={activeTab} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />


        {/* Content Area */}
        <section className="p-6 md:p-10 max-w-7xl mx-auto">
          {activeTab !== "overview" && (
            <div className="mb-10">
              <h1 className="text-3xl font-heading font-bold mb-2 capitalize">{activeTab}</h1>
              <p className="text-light-textMuted dark:text-dark-textMuted">Manage your portfolio {activeTab} information with precision.</p>
            </div>
          )}


          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {activeTab === "overview" && <AdminOverviewSection />}




              {activeTab === "projects" && (
                <div className="space-y-10">
                  <div className="flex flex-wrap gap-4 pb-6 border-b border-light-border dark:border-dark-border">
                    {portfolioData.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedId === p.id
                            ? "bg-light-textAccent text-white"
                            : "bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border text-light-textMuted hover:border-light-textAccent"
                          }`}
                      >
                        {p.title}
                      </button>
                    ))}
                    <button
                      disabled
                      aria-disabled="true"
                      className="px-4 py-2 rounded-lg text-sm font-bold border-2 border-dashed border-light-border dark:border-dark-border text-light-textMuted opacity-50 cursor-not-allowed"
                    >
                      + New Project
                    </button>
                  </div>

                  {selectedId ? (
                    <ContentWorkbench type="projects" selectedId={selectedId} />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-20 text-center opacity-60">
                      <LayoutDashboard size={48} className="mb-4 text-light-textMuted" />
                      <p>Select a project to start editing</p>
                    </div>
                  )}
                </div>
              )}

              {(activeTab === "experience" || activeTab === "skills") && (
                <div className="bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl border border-light-border dark:border-dark-border shadow-sm overflow-hidden">
                  <div className="p-10 flex flex-col items-center justify-center text-center opacity-70">
                    <div className="w-20 h-20 rounded-full bg-light-bgPrimary dark:bg-dark-bgPrimary flex items-center justify-center mb-6">
                      <LayoutDashboard size={40} className="text-light-textMuted dark:text-dark-textMuted" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">Editor for {activeTab} is Next</h2>
                    <p className="text-sm text-light-textMuted dark:text-dark-textMuted max-w-xs">
                      The {activeTab} management interface is currently being connected. Ready in the next phase!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
