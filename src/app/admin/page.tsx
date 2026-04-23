"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  Cpu, 
  LogOut, 
  Menu, 
  X,
  User,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/context/PortfolioContext";
import ContentWorkbench from "@/components/admin/ContentWorkbench";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const { portfolioData } = usePortfolio();
  const [session, setSession] = useState<{ loading: boolean; authenticated: boolean }>({ loading: true, authenticated: false });
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "experience" | "skills">("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  // Auth Guard
  useState(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) setSession({ loading: false, authenticated: true });
        else router.push("/access");
      } catch {
        router.push("/access");
      }
    };
    checkSession();
  });

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/access");
    } catch {
      alert("Logout failed. Please try again.");
    }
  };

  if (session.loading) return null;

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary font-body transition-colors duration-500">
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-light-bgSurface dark:bg-dark-bgSurface border-r border-light-border dark:border-dark-border z-50 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0 -translate-x-full"} lg:translate-x-0 lg:w-64`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-lg bg-light-textAccent dark:bg-dark-textAccent flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">Admin Console</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === item.id 
                    ? "bg-light-textAccent/10 text-light-textAccent dark:bg-dark-textAccent/10 dark:text-dark-textAccent font-medium" 
                    : "text-light-textMuted dark:text-dark-textMuted hover:bg-light-border/50 dark:hover:bg-dark-border/50"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-light-border dark:border-dark-border mt-auto space-y-2">
            <Link 
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-light-textMuted dark:text-dark-textMuted hover:text-light-textAccent dark:hover:text-dark-textAccent transition-colors text-sm"
            >
              <ExternalLink size={18} />
              <span>View Site</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all text-sm font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? "lg:pl-64" : "lg:pl-0"}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-light-bgPrimary/80 dark:bg-dark-bgPrimary/80 backdrop-blur-md border-b border-light-border dark:border-dark-border px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-light-textMuted dark:text-dark-textMuted">access@personal.dev</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-light-border dark:bg-dark-border flex items-center justify-center">
              <User size={20} className="text-light-textMuted dark:text-dark-textMuted" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <section className="p-6 md:p-10 max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-heading font-bold mb-2 capitalize">{activeTab}</h1>
            <p className="text-light-textMuted dark:text-dark-textMuted">Manage your portfolio {activeTab} information with precision.</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Active Projects", value: portfolioData.projects.length.toString(), color: "text-blue-500" },
                    { label: "Total Experiences", value: portfolioData.experiences.length.toString(), color: "text-purple-500" },
                    { label: "Experience Years", value: "3+", color: "text-orange-500" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-light-bgSurface dark:bg-dark-bgSurface p-8 rounded-2xl border border-light-border dark:border-dark-border shadow-sm">
                      <p className="text-sm text-light-textMuted dark:text-dark-textMuted mb-2">{stat.label}</p>
                      <h3 className={`text-4xl font-bold ${stat.color}`}>{stat.value}</h3>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-10">
                  <div className="flex flex-wrap gap-4 pb-6 border-b border-light-border dark:border-dark-border">
                    {portfolioData.projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedId(p.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedId === p.id 
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
