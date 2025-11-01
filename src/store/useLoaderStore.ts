import { create } from 'zustand'

interface LoaderState {
  isLoading: boolean
  startLoading: () => void
  stopLoading: () => void
}

let minDisplayTimer: NodeJS.Timeout | null = null;

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false, // Start with loader hidden (initial loader handles initial load)
  startLoading: () => {
    // Clear any existing timer
    if (minDisplayTimer) {
      clearTimeout(minDisplayTimer);
      minDisplayTimer = null;
    }
    set({ isLoading: true });
  },
  stopLoading: () => {
    // Set a minimum display time of 3 seconds
    if (minDisplayTimer) {
      clearTimeout(minDisplayTimer);
    }
    minDisplayTimer = setTimeout(() => {
      set({ isLoading: false });
      minDisplayTimer = null;
    }, 3000);
  },
}))