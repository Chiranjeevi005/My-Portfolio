"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Briefcase, 
  Cpu, 
  LogOut, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isOpen: boolean; // Mobile toggle (Drawer state)
  setIsOpen: (open: boolean) => void; // Mobile toggle setter
  onLogout: () => void;
  isCollapsed: boolean; // Desktop-only collapse state
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function AdminSidebarControl({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen, 
  onLogout,
  isCollapsed,
  setIsCollapsed
}: AdminSidebarProps) {
  
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🧠 CORE RULE: Mobile is NEVER collapsed.
  const effectiveCollapsed = isDesktop ? isCollapsed : false;

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Cpu },
  ];

  return (
    <>
      {/* 4. DRAWER OVERLAY (MOBILE) */}
      <AnimatePresence>
        {isOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* 5. SIDEBAR CONTAINER (WIDTH FIX) */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isDesktop 
            ? (effectiveCollapsed ? 72 : 280) 
            : (isOpen ? "min(320px, 80%)" : 0),
          x: isDesktop ? 0 : (isOpen ? 0 : -320)
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        className={`fixed top-0 left-0 h-full bg-[#fdfcf7] dark:bg-dark-bgSecondary/95 backdrop-blur-xl border-r border-light-border dark:border-dark-border z-[70] overflow-hidden flex flex-col shadow-2xl lg:shadow-none
        `}
      >
        {/* 1 & 2. IDENTITY BLOCK & TOGGLE (STRUCTURE FIX) */}
        <div className="p-4 flex items-center justify-between mb-6">
           <div className={`flex items-center gap-3 overflow-hidden ${effectiveCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"} transition-all duration-300`}>
              <div className="w-10 h-10 rounded-xl bg-light-textAccent flex items-center justify-center text-white font-bold flex-shrink-0 shadow-lg shadow-light-textAccent/20">
                C
              </div>
              <div className="flex flex-col whitespace-nowrap">
                <span className="font-heading font-bold text-sm tracking-tight text-light-textPrimary dark:text-dark-textPrimary">Admin Console</span>
                <span className="text-[10px] uppercase tracking-widest text-light-textMuted font-bold">Control Panel</span>
              </div>
           </div>
           
           {/* Mobile Close Button (X) */}
           {!isDesktop && isOpen && (
             <button 
               onClick={() => setIsOpen(false)}
               className="p-2 hover:bg-light-bgSurface rounded-lg text-light-textMuted transition-colors"
             >
               <X size={20} />
             </button>
           )}

           {/* Desktop Collapse Toggle */}
           {isDesktop && (
             <button 
               onClick={() => setIsCollapsed(!isCollapsed)}
               className={`p-2 hover:bg-light-bgSurface rounded-lg text-light-textMuted transition-colors flex-shrink-0 ${effectiveCollapsed ? "mx-auto" : ""}`}
             >
               {effectiveCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
             </button>
           )}
        </div>

        {/* 3. PRIMARY NAVIGATION (REMOVE ICON-ONLY FROM MOBILE) */}
        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <NavItem 
                key={item.id}
                item={item}
                isActive={isActive}
                isCollapsed={effectiveCollapsed}
                isDesktop={isDesktop}
                onClick={() => {
                  setActiveTab(item.id);
                  if (!isDesktop) setIsOpen(false);
                }}
              />
            );
          })}
        </nav>

        {/* 7. DIVIDER & UTILITY */}
        <div className="px-3 py-4 border-t border-light-border/50 space-y-2">
           <Link
              href="/"
              className={`group relative flex items-center h-12 px-3 rounded-xl text-light-textMuted hover:text-light-textAccent hover:bg-light-bgSurface transition-all duration-200 ${effectiveCollapsed ? "justify-center" : "gap-3"}`}
            >
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <ExternalLink size={18} className="group-hover:scale-110 transition-transform" />
              </div>
              
              {!effectiveCollapsed && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium whitespace-nowrap underline decoration-transparent group-hover:decoration-light-textAccent"
                >
                  View Site
                </motion.span>
              )}

              {effectiveCollapsed && isDesktop && <Tooltip label="View Site" />}
           </Link>
        </div>

        {/* 6 & 7. SESSION CONTROL (FULL BLOCK ON MOBILE) */}
        <div className="p-3 border-t border-light-border/50">
           <div className={`flex items-center mb-4 transition-all duration-300 ${effectiveCollapsed ? "justify-center" : "gap-3"}`}>
              <div className="w-10 h-10 rounded-full bg-light-bgSurface border border-light-border flex items-center justify-center flex-shrink-0 overflow-hidden">
                 <User size={20} className="text-light-textMuted" />
              </div>
              {!effectiveCollapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate text-light-textPrimary dark:text-dark-textPrimary">Admin User</span>
                  <span className="text-[10px] text-light-textMuted truncate">admin@portfolio.dev</span>
                </div>
              )}
           </div>
           
           <button
             onClick={onLogout}
             className={`group relative flex items-center h-12 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 ${effectiveCollapsed ? "justify-center w-10 mx-auto" : "w-full px-3 gap-3"}`}
           >
             <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
             </div>
             {!effectiveCollapsed && <span className="text-sm font-bold whitespace-nowrap">Logout</span>}
             {effectiveCollapsed && isDesktop && <Tooltip label="Logout" />}
           </button>
        </div>
      </motion.aside>
    </>
  );
}

// --- Internal Helper Components ---

function NavItem({ item, isActive, isCollapsed, isDesktop, onClick }: any) {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center h-12 rounded-xl transition-all duration-200
        ${isActive 
          ? "bg-light-textAccent/10 text-light-textAccent" 
          : "text-light-textMuted hover:bg-light-bgSurface"
        }
        ${isCollapsed ? "justify-center w-10 mx-auto" : "w-full px-3 gap-3 items-center justify-start"}
      `}
    >
      {/* 8. ACTIVE STATE INDICATOR */}
      {isActive && !isCollapsed && (
        <motion.div 
          layoutId="activeBar"
          className="absolute left-0 w-1 h-6 bg-light-textAccent rounded-r-full"
        />
      )}

      {/* ICON CONTAINER */}
      <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
        <Icon 
          size={20} 
          className={`transition-transform duration-200 group-hover:scale-110 group-active:scale-95 ${isActive ? "text-light-textAccent" : ""}`} 
        />
        
        {/* Collapsed Active Glow (Desktop only) */}
        {isActive && isCollapsed && (
          <motion.div 
            layoutId="activeGlow"
            className="absolute inset-0 bg-light-textAccent/20 rounded-xl blur-sm" 
          />
        )}
      </div>
      
      {/* LABEL ANIMATION (ALWAYS VISIBLE ON MOBILE) */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span 
            initial={isDesktop ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={isDesktop ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
            className={`text-sm font-medium whitespace-nowrap ${isActive ? "font-bold" : ""}`}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* TOOLTIP (ONLY ON DESKTOP COLLAPSED) */}
      {isCollapsed && isDesktop && <Tooltip label={item.label} />}

      {/* CLICK FEEDBACK */}
      <motion.div 
        whileTap={{ scale: 0.96 }}
        className="absolute inset-0 pointer-events-none"
      />
    </button>
  );
}

function Tooltip({ label }: { label: string }) {
  return (
    <div className="absolute left-full ml-4 px-3 py-1.5 bg-dark-bgPrimary text-white text-[10px] font-bold rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl border border-white/10">
      {label}
      <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-dark-bgPrimary rotate-45 border-l border-b border-white/10" />
    </div>
  );
}
