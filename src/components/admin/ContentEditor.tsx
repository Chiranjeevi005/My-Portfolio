"use client";

import { useState, useId, useMemo } from "react";
import { motion } from "framer-motion";
import { ContentEngine, ValidationResult } from "@/lib/content-engine";
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface ContentEditorProps {
  type: "projects" | "experience" | "skills";
  data: any;
  onChange: (data: any, isValid: boolean) => void;
  originalData: any;
}

export default function ContentEditor({ type, data, onChange, originalData }: ContentEditorProps) {
  const [activeGroup, setActiveGroup] = useState<string>("basic");

  // Computed validation result as a pure derived value to avoid infinite loops
  const validation = useMemo(() => {
    switch (type) {
      case "projects":
        return ContentEngine.processProject(data, originalData);
      case "experience":
        return ContentEngine.processExperience(data, originalData);
      case "skills":
        return ContentEngine.processSkills(data);
      default:
        return null;
    }
  }, [data, type, originalData]);

  const updateField = (field: string, value: any) => {
    // Optimistically determine new state for validation check
    const newData = { ...data, [field]: value };
    let tempResult: ValidationResult<any> | null = null;
    
    switch (type) {
      case "projects": tempResult = ContentEngine.processProject(newData, originalData); break;
      case "experience": tempResult = ContentEngine.processExperience(newData, originalData); break;
      case "skills": tempResult = ContentEngine.processSkills(newData); break;
    }

    // Call onChange only from user-driven handlers to avoid infinite cycles
    onChange(tempResult?.success ? tempResult.data : newData, tempResult?.success ?? false);
  };

  const isChanged = (field: string) => {
    return JSON.stringify(data[field]) !== JSON.stringify(originalData?.[field]);
  };

  const fieldIds = {
    title: useId(),
    description: useId(),
    videoUrl: useId(),
    tags: useId(),
    status: useId(),
  };

  return (
    <div className="space-y-6">
      {/* Validation Status Header */}
      {validation != null && (
        <div className={`p-4 rounded-xl flex items-center gap-3 transition-colors ${
          validation.success 
            ? "bg-green-500/10 text-green-600 dark:text-green-400" 
            : "bg-red-500/10 text-red-600 dark:text-red-400"
        }`}>
          {validation.success ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-medium">
            {validation.success ? "Ready to publish" : `${String(validation.field)}: ${String(validation.reason)}`}
          </span>
        </div>
      )}

      {/* Editor Groups */}
      <div className="space-y-4">
        {/* Basic Info Group */}
        <EditorGroup 
          title="Basic Information" 
          isOpen={activeGroup === "basic"} 
          onClick={() => setActiveGroup("basic")}
        >
          <div className="space-y-4">
            <FieldWrapper id={fieldIds.title} label="Title" isChanged={isChanged("title")} count={data.title?.length} max={80} error={!validation?.success && validation?.field === "title" ? validation?.reason : undefined}>
              <input 
                id={fieldIds.title}
                type="text" 
                value={data.title || ""} 
                onChange={(e) => updateField("title", e.target.value)}
                className={`w-full bg-light-bgPrimary dark:bg-dark-bgPrimary border ${!validation?.success && validation?.field === "title" ? "border-red-500" : "border-light-border dark:border-dark-border"} rounded-lg px-4 py-2 focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent outline-none transition-all`}
              />
            </FieldWrapper>

            <FieldWrapper id={fieldIds.description} label="Description" isChanged={isChanged("description")} count={data.description?.length} max={300} error={!validation?.success && validation?.field === "description" ? validation?.reason : undefined}>
              <textarea 
                id={fieldIds.description}
                value={data.description || ""} 
                onChange={(e) => updateField("description", e.target.value)}
                rows={4}
                className={`w-full bg-light-bgPrimary dark:bg-dark-bgPrimary border ${!validation?.success && validation?.field === "description" ? "border-red-500" : "border-light-border dark:border-dark-border"} rounded-lg px-4 py-2 focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent outline-none transition-all resize-none`}
              />
            </FieldWrapper>
          </div>
        </EditorGroup>

        {/* Media Group */}
        <EditorGroup 
          title="Media & Assets" 
          isOpen={activeGroup === "media"} 
          onClick={() => setActiveGroup("media")}
        >
          <div className="space-y-4">
            <FieldWrapper id={fieldIds.videoUrl} label="Video URL (CDN)" isChanged={isChanged("videoUrl")} error={!validation?.success && validation?.field === "videoUrl" ? validation?.reason : undefined}>
              <input 
                id={fieldIds.videoUrl}
                type="url" 
                value={data.videoUrl || ""} 
                onChange={(e) => updateField("videoUrl", e.target.value)}
                placeholder="https://cdn.example.com/video.mp4"
                className={`w-full bg-light-bgPrimary dark:bg-dark-bgPrimary border ${!validation?.success && validation?.field === "videoUrl" ? "border-red-500" : "border-light-border dark:border-dark-border"} rounded-lg px-4 py-2 focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent outline-none transition-all`}
              />
            </FieldWrapper>
          </div>
        </EditorGroup>

        {/* Categories / Tags Group */}
        <EditorGroup 
          title="Metadata & Tags" 
          isOpen={activeGroup === "meta"} 
          onClick={() => setActiveGroup("meta")}
        >
          <div className="space-y-4">
            <FieldWrapper id={fieldIds.tags} label="Tags (comma separated)" isChanged={isChanged("tags")} error={!validation?.success && validation?.field?.includes("tags") ? validation?.reason : undefined}>
              <input 
                id={fieldIds.tags}
                type="text" 
                value={Array.isArray(data.tags) ? data.tags.join(", ") : ""} 
                onChange={(e) => {
                  const val = e.target.value;
                  const tags = val.trim() === "" ? [] : val.split(",").map(s => s.trim()).filter(Boolean);
                  updateField("tags", tags);
                }}
                className={`w-full bg-light-bgPrimary dark:bg-dark-bgPrimary border ${!validation?.success && validation?.field?.includes("tags") ? "border-red-500" : "border-light-border dark:border-dark-border"} rounded-lg px-4 py-2 focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent outline-none transition-all`}
              />
            </FieldWrapper>

            <FieldWrapper id={fieldIds.status} label="Status" isChanged={isChanged("status")} error={!validation?.success && validation?.field === "status" ? validation?.reason : undefined}>
              <select 
                id={fieldIds.status}
                value={data.status || "draft"} 
                onChange={(e) => updateField("status", e.target.value)}
                className={`w-full bg-light-bgPrimary dark:bg-dark-bgPrimary border ${!validation?.success && validation?.field === "status" ? "border-red-500" : "border-light-border dark:border-dark-border"} rounded-lg px-4 py-2 focus:ring-2 focus:ring-light-textAccent dark:focus:ring-dark-textAccent outline-none transition-all`}
              >
                <option value="draft">Draft</option>
                <option value="live">Live</option>
              </select>
            </FieldWrapper>
          </div>
        </EditorGroup>
      </div>
    </div>
  );
}

function EditorGroup({ title, children, isOpen, onClick }: { title: string, children: React.ReactNode, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-light-border dark:border-dark-border rounded-xl overflow-hidden bg-light-cardBg/30 dark:bg-dark-cardBg/30">
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 hover:bg-light-border/30 dark:hover:bg-dark-border/30 transition-colors"
      >
        <span className="font-semibold text-sm">{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="p-4 border-t border-light-border dark:border-dark-border bg-light-bgSurface/50 dark:bg-dark-bgSurface/50"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

function FieldWrapper({ label, children, isChanged, count, max, id, error }: { label: string, children: React.ReactNode, isChanged?: boolean, count?: number, max?: number, id?: string, error?: string }) {
  return (
    <div className="space-y-1.5 relative">
      <div className="flex justify-between items-center px-1">
        <label htmlFor={id} className="text-[11px] uppercase tracking-wider font-bold text-light-textMuted dark:text-dark-textMuted flex items-center gap-2">
          {label}
          {isChanged && <span className="w-1.5 h-1.5 rounded-full bg-light-textAccent dark:bg-dark-textAccent blur-[1px]"></span>}
        </label>
        {max && (
          <span className={`text-[10px] font-mono ${count && count > max ? "text-red-500" : "text-light-textMuted dark:text-dark-textMuted"}`}>
            {count || 0}/{max}
          </span>
        )}
      </div>
      {children}
      {error && <div className="text-[10px] text-red-500 px-1 mt-1 font-medium">{error}</div>}
    </div>
  );
}
