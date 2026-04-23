"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock, RefreshCw, LogOut, CheckCircle } from "lucide-react";

interface SystemStatus {
  api: { successRate: number; latency: number; status: "healthy" | "warning" | "error" };
  github: { status: "healthy" | "warning" | "error"; lastSync: string };
  cdn: { status: "healthy" | "warning" | "error"; uploadSuccess: string };
  lastSyncTime: string;
}

interface SessionContextType {
  isAuthenticated: boolean;
  expiresAt: number | null;
  remainingTime: number; // seconds
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  setUnsavedChanges: (val: boolean) => void;
  extendSession: () => Promise<void>;
  logout: (saveFirst?: boolean) => Promise<void>;
  triggerAutoSave: (data?: any) => Promise<void>;
  registerAutoSaveHandler: (id: string, handler: () => Promise<void>) => void;
  unregisterAutoSaveHandler: (id: string) => void;
  systemStatus: SystemStatus | null;
  refreshSystemStatus: () => Promise<void>;
}


const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  
  const autoSaveHandlers = useRef<Map<string, () => Promise<void>>>(new Map());
  const router = useRouter();

  // Fetch System Health
  const refreshSystemStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/system/health");
      if (res.ok) {
        const data = await res.json();
        // Map raw data to the structure required by context
        setSystemStatus({
          api: { 
            successRate: Number(data.api.successRate), 
            latency: Number(data.api.latency.replace('ms', '')), 
            status: data.api.status as any 
          },
          github: { 
            status: data.github.status as any, 
            lastSync: data.github.lastSync 
          },
          cdn: { 
            status: data.cdn.status as any, 
            uploadSuccess: data.cdn.uploadSuccess 
          },
          lastSyncTime: new Date().toLocaleTimeString()
        });
      }
    } catch (err) {
      console.error("System status fetch failed", err);
    }
  }, []);

  // Periodic System Check
  useEffect(() => {
    if (!isAuthenticated) return;
    refreshSystemStatus();
    const interval = setInterval(refreshSystemStatus, 15000);
    return () => clearInterval(interval);
  }, [isAuthenticated, refreshSystemStatus]);

  // Check session on mount and periodic validation

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setExpiresAt(data.expiresAt);
      } else {
        setIsAuthenticated(false);
        setExpiresAt(null);
      }
    } catch (err) {
      console.error("Session check failed", err);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  // Timer logic
  useEffect(() => {
    if (!expiresAt || !isAuthenticated) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((expiresAt - now) / 1000));
      setRemainingTime(diff);

      // Warning triggers
      if (diff <= 60 && diff > 0) {
        // We could show a small toast here if we wanted
      }
      
      if (diff <= 5 && diff > 0) {
        setShowWarning(true);
      }

      if (diff === 0) {
        clearInterval(interval);
        handleForcedExpiry();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, isAuthenticated]);

  const handleForcedExpiry = async () => {
    await triggerAutoSave();
    setIsAuthenticated(false);
    setExpiresAt(null);
    router.push("/access?expired=true");
  };

  const extendSession = async () => {
    try {
      const res = await fetch("/api/auth/extend", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setExpiresAt(data.expiresAt);
        setShowWarning(false);
        return;
      }
      throw new Error("Failed to extend session");
    } catch (err) {
      console.error(err);
      logout(false);
    }
  };

  const logout = async (saveFirst: boolean = true) => {
    if (saveFirst) {
      setIsSaving(true);
      await triggerAutoSave();
    }
    
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setExpiresAt(null);
      router.push("/access");
    } catch (err) {
      console.error("Logout failed", err);
      // Fallback
      window.location.href = "/access";
    } finally {
      setIsSaving(false);
    }
  };

  const registerAutoSaveHandler = (id: string, handler: () => Promise<void>) => {
    autoSaveHandlers.current.set(id, handler);
  };

  const unregisterAutoSaveHandler = (id: string) => {
    autoSaveHandlers.current.delete(id);
  };

  const triggerAutoSave = async () => {
    if (autoSaveHandlers.current.size === 0) return;
    
    setIsSaving(true);
    try {
      const handlers = Array.from(autoSaveHandlers.current.values());
      await Promise.all(handlers.map(h => h()));
      setHasUnsavedChanges(false);
    } catch (err) {
      console.error("Auto-save failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  // Prevent accidental tab close with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return (
    <SessionContext.Provider value={{
      isAuthenticated,
      expiresAt,
      remainingTime,
      isSaving,
      hasUnsavedChanges,
      setUnsavedChanges: setHasUnsavedChanges,
      extendSession,
      logout,
      triggerAutoSave,
      registerAutoSaveHandler,
      unregisterAutoSaveHandler,
      systemStatus,
      refreshSystemStatus
    }}>

      {children}
      
      {/* 3. SESSION EXPIRY WARNING MODAL */}
      <AnimatePresence>
        {showWarning && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-light-bgPrimary dark:bg-dark-bgPrimary border border-light-border dark:border-dark-border rounded-2xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-light-textAccent overflow-hidden">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-red-500"
                />
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                  <AlertTriangle size={32} className="text-red-500 animate-pulse" />
                </div>
                
                <h2 className="text-2xl font-heading font-bold mb-2">Session Authority Expiring</h2>
                <p className="text-light-textMuted dark:text-dark-textMuted mb-8 text-sm">
                  Your secure session will terminate in <span className="font-mono font-bold text-red-500">{remainingTime}s</span>. 
                  Unsaved changes will be cached locally for recovery.
                </p>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    onClick={() => logout(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-light-border dark:border-dark-border hover:bg-light-bgSecondary transition-colors text-sm font-bold"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                  <button
                    onClick={extendSession}
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-light-textAccent text-white hover:opacity-90 transition-opacity text-sm font-bold shadow-lg shadow-light-textAccent/20"
                  >
                    <RefreshCw size={16} />
                    Extend 30m
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Persistent Save Indicator */}
      <AnimatePresence>
        {isSaving && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[80] bg-light-bgPrimary/90 dark:bg-dark-bgPrimary/90 border border-light-border dark:border-dark-border px-4 py-2 rounded-full shadow-lg flex items-center gap-3 backdrop-blur-md"
          >
            <RefreshCw size={14} className="animate-spin text-light-textAccent" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Auto-Saving Engine Active...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
