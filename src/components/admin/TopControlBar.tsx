import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  Search, 
  Bell, 
  User, 
  Clock, 
  RefreshCw, 
  LogOut,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { useSession } from "@/context/SessionContext";

interface TopControlBarProps {
  currentTab: string;
  onToggleSidebar: () => void;
}

export default function TopControlBar({ currentTab, onToggleSidebar }: TopControlBarProps) {
  const { 
    remainingTime, 
    systemStatus, 
    extendSession, 
    logout,
  } = useSession();
  
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close overlays on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Timer Urgency Logic
  const isExpiringSoon = remainingTime < 60;
  const isCritical = remainingTime < 10;
  
  const timerColorClass = isCritical 
    ? "text-red-500" 
    : isExpiringSoon 
    ? "text-amber-500" 
    : "text-light-textMuted dark:text-dark-textMuted";

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Aggregated System Health Logic
  const getOverallStatus = () => {
    if (!systemStatus) return { label: "Syncing...", color: "bg-amber-500", text: "text-amber-500" };
    
    const statuses = [
      systemStatus.api.status,
      systemStatus.github.status,
      systemStatus.cdn.status
    ];

    if (statuses.includes("error")) return { label: "System Error", color: "bg-red-500", text: "text-red-500" };
    if (statuses.includes("warning")) return { label: "System Warning", color: "bg-amber-500", text: "text-amber-500" };
    return { label: "System Healthy", color: "bg-green-500", text: "text-green-500" };
  };

  const overallStatus = getOverallStatus();

  return (
    <header className="sticky top-0 z-[60] h-16 w-full bg-light-bgSecondary/98 dark:bg-dark-bgSecondary/98 backdrop-blur-md border-b border-light-border dark:border-dark-border px-6 flex items-center justify-between">
      
      {/* Global Scrim - NON-NEGOTIABLE */}
      <AnimatePresence>
        {(showNotifications || showUserDropdown) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setShowNotifications(false); setShowUserDropdown(false); }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[3px]" 
          />
        )}
      </AnimatePresence>
      
      {/* 1. LEFT ZONE: PAGE CONTEXT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg transition-colors"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-sm font-semibold text-light-textPrimary dark:text-dark-textPrimary tracking-tight capitalize">
          {currentTab === "overview" ? "Admin Console" : currentTab}
        </h1>
      </div>

      {/* 2. CENTER ZONE: GLOBAL SEARCH / COMMAND BAR */}
      <div className="hidden md:flex flex-1 justify-center px-8">
        <div className="relative w-full max-w-[320px] group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light-textMuted group-focus-within:text-light-textAccent transition-colors" size={14} />
          <input 
            type="text"
            placeholder="Search or type a command..."
            className="w-full bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-light-textAccent/30 focus:border-light-textAccent transition-all placeholder:text-light-textMuted/60"
          />
        </div>
      </div>

      {/* 3. RIGHT ZONE: CONTROL CLUSTER */}
      <div className="flex items-center gap-4">
        
        {/* aggregated System Status */}
        <div className="group relative hidden sm:flex items-center gap-2 pr-2">
          <div className={`w-2 h-2 rounded-full ${overallStatus.color} ${overallStatus.label === "System Healthy" ? "" : "animate-pulse"}`} />
          <span className="hidden lg:block text-[11px] font-medium text-light-textMuted uppercase tracking-wider">
            {overallStatus.label}
          </span>
          
          {/* Detailed Health Tooltip */}
          <div className="absolute top-full right-0 mt-3 p-4 bg-dark-bgPrimary/98 text-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 min-w-[180px] border border-white/10 scale-95 group-hover:scale-100">
             <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-3">Service Metrics</h5>
             <div className="space-y-2">
                <StatusDetail label="Auth" value="Active" status="healthy" />
                <StatusDetail label="API" value={systemStatus ? `${systemStatus.api.successRate}%` : "99%"} status={systemStatus?.api.status || "healthy"} />
                <StatusDetail label="GitHub" value="Synced" status={systemStatus?.github.status || "healthy"} />
                <StatusDetail label="CDN" value="Online" status={systemStatus?.cdn.status || "healthy"} />
             </div>
             <div className="mt-4 pt-3 border-t border-white/10 text-[9px] text-white/40 font-mono">
               Last Sync: {systemStatus?.lastSyncTime || "Real-time"}
             </div>
          </div>
        </div>

        {/* Session Timer Pill */}
        <div className={`flex items-center gap-2 px-3 py-1.5 bg-light-bgSurface dark:bg-dark-bgSurface rounded-full border border-light-border dark:border-dark-border ${isCritical ? "animate-pulse-subtle" : ""}`}>
          <Clock size={12} className={timerColorClass} />
          <span className={`text-xs font-mono font-bold ${timerColorClass}`}>
            {formatTime(remainingTime)}
          </span>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-light-bgSurface dark:hover:bg-dark-bgSurface rounded-full text-light-textMuted relative transition-all active:scale-95"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-light-textAccent rounded-full border border-light-bgSecondary" />
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-[300px] max-w-[90vw] bg-white dark:bg-dark-bgSurface border border-light-border dark:border-dark-border rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] z-[100] isolate overflow-hidden divide-y divide-light-border dark:divide-dark-border"
              >
                <div className="py-3 px-4 flex items-center justify-between">
                  <h4 className="text-xs font-semibold tracking-widest text-light-textPrimary dark:text-dark-textPrimary uppercase">SYSTEM ALERTS</h4>
                  <button className="text-[10px] text-light-textAccent hover:text-light-textAccent font-bold transition-colors">Mark all read</button>
                </div>
                
                <div className="py-3 px-4 space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                   <NotificationItem title="Local draft synchronized" time="2m ago" unread />
                   <NotificationItem title="GitHub deployment successful" time="15m ago" />
                   <NotificationItem title="New skill entry detected" time="1h ago" />
                </div>

                <div className="py-3 px-4">
                  <button className="w-full py-1 text-xs text-light-textSecondary hover:text-light-textAccent flex items-center justify-center gap-1.5 transition-colors font-medium">
                    View all activity <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Avatar & Dropdown */}
        <div className="relative" ref={userDropdownRef}>
          <button 
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-0.5 pr-2 hover:bg-light-bgSurface dark:hover:bg-dark-bgSurface rounded-full transition-all border border-transparent hover:border-light-border"
          >
            <div className="relative w-8 h-8 rounded-full bg-light-bgSurface dark:bg-dark-bgSurface flex items-center justify-center border border-light-border dark:border-dark-border overflow-hidden">
              <User size={16} className="text-light-textMuted" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-light-bgSecondary" />
            </div>
            <ChevronDown size={12} className={`text-light-textMuted transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showUserDropdown && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-[300px] max-w-[90vw] bg-white dark:bg-dark-bgSurface border border-light-border dark:border-dark-border rounded-xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] z-[100] isolate overflow-hidden divide-y divide-light-border dark:divide-dark-border"
              >

                {/* User Identity */}
                <div className="py-3 px-4 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary flex items-center justify-center border border-light-border">
                     <User size={20} className="text-light-textMuted" />
                   </div>
                   <div className="flex flex-col">
                     <p className="text-sm font-semibold text-light-textPrimary dark:text-dark-textPrimary">Admin User</p>
                     <p className="text-xs text-light-textSecondary dark:text-dark-textSecondary">access@personal.dev</p>
                   </div>
                </div>

                {/* Session Info */}
                <div className="py-3 px-4 space-y-1">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-xs font-semibold text-light-textPrimary dark:text-dark-textPrimary">Active Session</span>
                   </div>
                   <p className="text-xs text-light-textMuted dark:text-dark-textMuted pl-3.5">Last Sync: {systemStatus?.lastSyncTime || "Real-time"}</p>
                </div>

                {/* Actions */}
                <div className="py-3 px-4 flex flex-col gap-2">
                   <DropdownButton icon={RefreshCw} label="Extend Session" onClick={extendSession} />
                   <DropdownButton icon={LogOut} label="Logout" onClick={() => logout(true)} variant="danger" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}

// --- Internal Helper Components ---

function StatusDetail({ label, value, status }: { label: string; value: string; status: string }) {
  const dotColor = status === "healthy" ? "bg-green-500" : status === "warning" ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[10px] font-medium text-white/60">{label}</span>
      <div className="flex items-center gap-1.5">
        <div className={`w-1 h-1 rounded-full ${dotColor}`} />
        <span className="text-[10px] font-bold text-white/90">{value}</span>
      </div>
    </div>
  );
}

function NotificationItem({ title, time, unread = false }: { title: string; time: string; unread?: boolean }) {
  return (
    <div className="py-2 rounded-lg hover:bg-light-bgSecondary dark:hover:bg-dark-bgSecondary transition-all cursor-pointer flex flex-col gap-1 group">
      <div className="flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${unread ? 'bg-light-textAccent' : 'bg-light-textMuted opacity-30'}`} />
        <p className="text-sm font-medium text-light-textPrimary dark:text-dark-textPrimary line-clamp-1">{title}</p>
      </div>
      <span className="text-xs text-light-textMuted dark:text-dark-textMuted pl-3.5">{time}</span>
    </div>
  );
}

function DropdownButton({ icon: Icon, label, onClick, variant = "default" }: any) {
  const colors = variant === "danger" 
    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" 
    : "text-light-textPrimary dark:text-dark-textPrimary bg-light-bgSecondary dark:bg-dark-bgSecondary hover:bg-light-bgSurface dark:hover:bg-dark-bgSurface border border-transparent hover:border-light-border";
    
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all active:scale-[0.98] ${colors}`}
    >
      <Icon size={16} className="shrink-0" />
      <span className="flex-1 text-left">{label}</span>
    </button>
  );
}
