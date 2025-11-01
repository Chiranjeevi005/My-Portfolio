'use client';

import { AppleStyleDock } from '@/components/ui/dock-demo';

export default function DockDemoPage() {
  return (
    <div className="min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary flex flex-col items-center justify-center transition-colors duration-700">
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold text-light-textPrimary dark:text-dark-textPrimary mb-4 font-heading">
          Apple Style Dock Demo
        </h1>
        <p className="text-lg text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
          This is a demonstration of the Apple-style dock component. Hover over the icons to see the magnification effect.
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center w-full px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-light-textPrimary dark:text-dark-textPrimary mb-4 font-heading">
            Try hovering over the dock icons below
          </h2>
          <p className="text-light-textMuted dark:text-dark-textMuted">
            The dock will appear at the bottom of the screen
          </p>
        </div>
      </div>
      
      <AppleStyleDock />
    </div>
  );
}