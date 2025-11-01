'use client';

import { useState } from 'react';
import UniqueLoading from '@/components/ui/morph-loading';

export default function LoadingDemoPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Morph Loading Component Demo</h1>
        
        <div className="mb-8 p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Component Preview</h2>
          <div className="flex flex-col items-center gap-8">
            <div className="flex gap-8 items-center">
              <div className="flex flex-col items-center gap-2">
                <span>Small</span>
                <UniqueLoading variant="morph" size="sm" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span>Medium</span>
                <UniqueLoading variant="morph" size="md" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span>Large</span>
                <UniqueLoading variant="morph" size="lg" />
              </div>
            </div>
            
            <div className="w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Full Width Example</h3>
              <div className="h-32 w-full border border-light-border dark:border-dark-border rounded-lg flex items-center justify-center">
                <UniqueLoading variant="morph" size="lg" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8 p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Theme Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Light Mode</h3>
              <div className="h-32 flex items-center justify-center">
                <UniqueLoading variant="morph" size="lg" />
              </div>
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Colors used:</p>
                <ul className="text-sm text-gray-500 list-disc pl-5 space-y-1">
                  <li>#E85D45 (textAccent)</li>
                  <li>#D7745B (textHighlight)</li>
                  <li>#FF6F61 (link)</li>
                  <li>#FF9D6E (linkHover from dark theme)</li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 bg-gray-900 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-white">Dark Mode</h3>
              <div className="h-32 flex items-center justify-center">
                <UniqueLoading variant="morph" size="lg" />
              </div>
              <div className="mt-4">
                <p className="text-gray-300 mb-2">Colors used:</p>
                <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
                  <li>#FF8A5C (textAccent)</li>
                  <li>#FFC48A (textHighlight)</li>
                  <li>#FF9D6E (link)</li>
                  <li>#FFB185 (linkHover)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8 p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Interactive Demo</h2>
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => setIsLoading(!isLoading)}
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              {isLoading ? 'Stop Loading' : 'Start Loading'}
            </button>
            
            {isLoading && (
              <div className="h-48 w-full flex items-center justify-center">
                <UniqueLoading variant="morph" size="lg" />
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Color Palette Reference</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg">
              <div className="w-12 h-12 bg-[#E85D45] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-gray-700">#E85D45</span>
              <span className="text-xs text-gray-500">Light Text Accent</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg">
              <div className="w-12 h-12 bg-[#D7745B] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-gray-700">#D7745B</span>
              <span className="text-xs text-gray-500">Light Highlight</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg">
              <div className="w-12 h-12 bg-[#FF8A5C] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-white">#FF8A5C</span>
              <span className="text-xs text-gray-300">Dark Text Accent</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg">
              <div className="w-12 h-12 bg-[#FFC48A] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-white">#FFC48A</span>
              <span className="text-xs text-gray-300">Dark Highlight</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg">
              <div className="w-12 h-12 bg-[#FF6F61] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-gray-700">#FF6F61</span>
              <span className="text-xs text-gray-500">Light Link</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg">
              <div className="w-12 h-12 bg-[#FF9D6E] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-gray-700">#FF9D6E</span>
              <span className="text-xs text-gray-500">Light Link Hover</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg">
              <div className="w-12 h-12 bg-[#FF9D6E] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-white">#FF9D6E</span>
              <span className="text-xs text-gray-300">Dark Link</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-900 rounded-lg">
              <div className="w-12 h-12 bg-[#FFB185] rounded-full mb-2"></div>
              <span className="text-sm font-medium text-white">#FFB185</span>
              <span className="text-xs text-gray-300">Dark Link Hover</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}