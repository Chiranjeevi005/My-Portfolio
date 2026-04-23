"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentEditor from "./ContentEditor";
import LivePreview from "./LivePreview";
import ChangeReviewModal from "./ChangeReviewModal";
import { useDraftManager } from "./DraftManager";
import { ContentEngine } from "@/lib/content-engine";
import { usePortfolio } from "@/context/PortfolioContext";
import { Rocket, Save, RotateCcw } from "lucide-react";

interface ContentWorkbenchProps {
  type: "projects" | "experience" | "skills";
  selectedId: string | number;
}

export default function ContentWorkbench({ type, selectedId }: ContentWorkbenchProps) {
  const { portfolioData } = usePortfolio();

  // Find the original data based on type and ID
  const originalData = useMemo(() => {
    if (type === "projects") return portfolioData.projects.find(p => p.id === selectedId);
    if (type === "experience") return portfolioData.experiences.find(e => e.id === Number(selectedId) || e.id === selectedId);
    if (type === "skills") return portfolioData.skills.find(s => s.title === selectedId);
    return null;
  }, [type, selectedId, portfolioData]);

  const { draft, updateDraft, resetDraft, clearDraft, isInitialized } = useDraftManager(
    `workbench_${type}_${selectedId}`,
    originalData || {}
  );

  const [isValid, setIsValid] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [previewData, setPreviewData] = useState(originalData);

  // Isolate Preview State: only update if validation succeeds
  useEffect(() => {
    if (isInitialized && originalData) {
      try {
        let tempResult: any = null;
        switch (type) {
          case "projects": tempResult = ContentEngine.processProject(draft, originalData as any); break;
          case "experience": tempResult = ContentEngine.processExperience(draft, originalData as any); break;
          case "skills": tempResult = ContentEngine.processSkills(draft); break;
        }
        if (tempResult?.success) {
          setPreviewData(tempResult.data);
        }
      } catch (e) {
        // Validation throws are caught here
      }
    }
  }, [draft, type, originalData, isInitialized]);

  // Detect changes for the review modal
  const changes = useMemo(() => {
    if (!originalData) return [];
    const typedDraft = draft as Record<string, any>;
    const typedOriginal = originalData as Record<string, any>;

    // Get union of all keys to detect additions/removals
    const allKeys = Array.from(new Set([...Object.keys(typedDraft), ...Object.keys(typedOriginal)]));

    return allKeys
      .filter(key => JSON.stringify(typedDraft[key]) !== JSON.stringify(typedOriginal[key]))
      .map(key => ({
        field: key,
        from: typedOriginal[key],
        to: typedDraft[key]
      }));
  }, [draft, originalData]);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const response = await fetch("/api/content/commit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: type,
          payload: draft,
        }),
      });

      // Defensive parsing for non-JSON responses
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { error: text || "An unexpected server error occurred." };
      }

      if (!response.ok) {
        throw new Error(data.error || "Publishing failed");
      }

      console.log("PUBLISHED TO GITHUB:", data);
      clearDraft();
      setIsReviewOpen(false);
      alert("Changes published successfully! The site will update in a few minutes.");

      window.location.reload();

    } catch (err: any) {
      alert(err.message || "Unable to publish changes. Please try again.");
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isInitialized || !originalData) {
    return (
      <div className="flex items-center justify-center h-64 text-light-textMuted dark:text-dark-textMuted">
        Loading workbench...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.5fr] gap-8 animate-in fade-in duration-500">
      {/* Left: Editor Panel */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-light-textAccent dark:bg-dark-textAccent animate-pulse"></div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-light-textMuted dark:text-dark-textMuted">Editing {type}</h2>
          </div>
          {changes.length > 0 && (
            <button
              onClick={() => resetDraft(originalData)}
              className="text-[10px] uppercase font-bold text-light-textMuted hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <RotateCcw size={10} /> Discard Edits
            </button>
          )}
        </div>

        <ContentEditor
          type={type}
          data={draft}
          originalData={originalData}
          onChange={(newData, valid) => {
            updateDraft(newData);
            setIsValid(valid);
          }}
        />

        <div className="pt-6 border-t border-light-border dark:border-dark-border">
          <button
            disabled={!isValid || changes.length === 0 || isPublishing}
            onClick={() => setIsReviewOpen(true)}
            className="w-full py-4 bg-light-textAccent dark:bg-dark-textAccent text-white rounded-2xl font-bold hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 group"
          >
            {isPublishing ? (
              <RotateCcw size={20} className="animate-spin" />
            ) : (
              <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
            {isPublishing ? "Publishing..." : "Proceed to Publish"}
          </button>
          {changes.length === 0 && (
            <p className="text-[10px] text-center mt-3 text-light-textMuted dark:text-dark-textMuted flex items-center justify-center gap-1">
              <Save size={10} /> No changes detected in this session
            </p>
          )}
        </div>
      </div>

      {/* Right: Live Preview Panel */}
      <div className="sticky top-24 h-fit hidden lg:block">
        <LivePreview type={type} draftData={previewData} allData={portfolioData} />
      </div>

      {/* Mobile/Tablet Preview Toggle (Overlay) */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        {/* TBD: Mobile experience */}
      </div>

      <ChangeReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onConfirm={handlePublish}
        changes={changes}
        type={type}
      />
    </div>
  );
}
