"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, AlertTriangle } from "lucide-react";

interface ChangeReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  changes: { field: string; from: any; to: any }[];
  type: string;
}

export default function ChangeReviewModal({ isOpen, onClose, onConfirm, changes, type }: ChangeReviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and accessibility side-effects
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Escape key listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    // Initial focus onto the confirm button for primary action or modal container
    const timer = setTimeout(() => {
      const firstButton = modalRef.current?.querySelector("button");
      if (firstButton instanceof HTMLElement) firstButton.focus();
    }, 100);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  const formatValue = (val: any) => {
    if (val === null || val === undefined || val === "") return "(empty)";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-light-bgSurface dark:bg-dark-bgSurface rounded-2xl shadow-2xl overflow-hidden border border-light-border dark:border-dark-border"
          >
            <div className="p-6 border-b border-light-border dark:border-dark-border flex items-center justify-between bg-light-bgPrimary/50 dark:bg-dark-bgPrimary/50">
              <h3 id="modal-title" className="text-xl font-heading font-bold">Review Changes</h3>
              <button 
                onClick={onClose} 
                aria-label="Close review modal"
                className="p-2 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
              <div className="bg-light-textAccent/10 dark:bg-dark-textAccent/10 p-4 rounded-xl flex gap-3 text-light-textAccent dark:text-dark-textAccent">
                <AlertTriangle size={20} className="shrink-0" />
                <p className="text-xs leading-relaxed">
                  You are about to publish <strong>{changes.length}</strong> changes to the <strong>{type}</strong> content. 
                  This will be reflected across your entire portfolio immediately.
                </p>
              </div>

              <div className="space-y-4">
                {changes.map((change, i) => (
                  <div key={i} className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-light-textMuted dark:text-dark-textMuted px-1">
                      {change.field}
                    </span>
                    <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3 bg-light-bgPrimary/30 dark:bg-dark-bgPrimary/30 p-3 rounded-lg border border-light-border/50 dark:border-dark-border/50">
                      <div className="text-xs text-light-textMuted dark:text-dark-textMuted line-through truncate opacity-50">
                        {formatValue(change.from ?? null)}
                      </div>
                      <ArrowRight size={14} className="text-light-textAccent dark:text-dark-textAccent" />
                      <div className="text-xs font-medium text-light-textPrimary dark:text-dark-textPrimary truncate">
                        {formatValue(change.to ?? null)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-light-bgPrimary/50 dark:bg-dark-bgPrimary/50 border-t border-light-border dark:border-dark-border flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl font-medium border border-light-border dark:border-dark-border hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-all"
              >
                Go Back to Edit
              </button>
              <button 
                onClick={onConfirm}
                className="flex-[1.5] py-3 px-4 bg-light-textAccent dark:bg-dark-textAccent text-white rounded-xl font-bold hover:shadow-[0_0_20px_rgba(232,93,69,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,138,92,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Confirm & Publish
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
