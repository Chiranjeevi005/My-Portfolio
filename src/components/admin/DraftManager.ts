import { useState, useEffect } from 'react';

/**
 * Manages draft state in local storage to prevent data loss
 */
export function useDraftManager<T>(key: string, initialState: T) {
  const [draft, setDraft] = useState<T>(initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`draft_${key}`);
    if (saved) {
      try {
        setDraft(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse draft", e);
        setDraft(initialState);
      }
    } else {
      setDraft(initialState);
    }
    setIsInitialized(true);
  }, [key, initialState]);

  // Save to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(`draft_${key}`, JSON.stringify(draft));
    }
  }, [draft, key, isInitialized]);

  const clearDraft = () => {
    localStorage.removeItem(`draft_${key}`);
    setDraft(initialState);
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
    isInitialized
  };
}
