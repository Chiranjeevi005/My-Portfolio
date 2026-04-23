import { useState, useEffect } from 'react';

/**
 * Manages draft state in local storage to prevent data loss
 */
export function useDraftManager<T>(key: string, initialState: T) {
  const [draft, setDraft] = useState<T>(initialState);
  const [storedDraft, setStoredDraft] = useState<T | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Initial Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`draft_${key}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStoredDraft(parsed);
      } catch (e) {
        console.error("Failed to parse draft", e);
      }
    }
    // We always start with the initialState (Server Data) to allow the UI to prompt for restoration
    setDraft(initialState);
    setIsInitialized(true);
  }, [key, initialState]);

  // 2. Continuous Layer-2 Auto-Save (LocalStorage)
  useEffect(() => {
    if (isInitialized && draft !== initialState) {
      localStorage.setItem(`draft_${key}`, JSON.stringify(draft));
    }
  }, [draft, key, isInitialized, initialState]);

  const clearDraft = () => {
    localStorage.removeItem(`draft_${key}`);
    setStoredDraft(null);
    setDraft(initialState);
  };

  const restoreDraft = () => {
    if (storedDraft) {
      setDraft(storedDraft);
      setStoredDraft(null);
    }
  };

  const discardDraft = () => {
    localStorage.removeItem(`draft_${key}`);
    setStoredDraft(null);
  };

  const updateDraft = (updates: Partial<T>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const resetDraft = (newState: T) => {
    setDraft(newState);
  };

  return {
    draft,
    updateDraft,
    resetDraft,
    clearDraft,
    restoreDraft,
    discardDraft,
    isInitialized,
    hasStoredDraft: storedDraft !== null,
  };
}
