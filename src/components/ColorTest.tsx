'use client';

import React from 'react';

const ColorTest = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Color System Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Light Mode Colors */}
        <div className="bg-light-bg p-4 rounded-lg">
          <h2 className="text-light-textPrimary text-xl font-semibold mb-3">Light Mode</h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-light-bg border border-light-textSecondary mr-3"></div>
              <span className="text-light-textPrimary">Background: #FDF6F0</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 bg-light-primary mr-3"></div>
              <span className="text-light-textPrimary">Primary: #FF6F61</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 bg-light-secondary mr-3"></div>
              <span className="text-light-textPrimary">Secondary: #F4C27A</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 bg-light-accent mr-3"></div>
              <span className="text-light-textPrimary">Accent: #2A2A2A</span>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3">
                <span className="text-light-textPrimary font-medium">Text Primary: #1A1A1A</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3">
                <span className="text-light-textSecondary">Text Secondary: #4A4A4A</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Dark Mode Colors */}
        <div className="bg-dark-bg p-4 rounded-lg">
          <h2 className="text-dark-textPrimary text-xl font-semibold mb-3">Dark Mode</h2>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-dark-bg border border-dark-textSecondary mr-3"></div>
              <span className="text-dark-textPrimary">Background: #0F0F0F</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 bg-dark-primary mr-3"></div>
              <span className="text-dark-textPrimary">Primary: #FF8A65</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 bg-dark-secondary mr-3"></div>
              <span className="text-dark-textPrimary">Secondary: #FFC107</span>
            </div>
            
            <div className="flex items-center">
              <div className="w-16 h-16 bg-dark-accent mr-3"></div>
              <span className="text-dark-textPrimary">Accent: #F4511E</span>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3">
                <span className="text-dark-textPrimary font-medium">Text Primary: #F9F9F9</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="mr-3">
                <span className="text-dark-textSecondary">Text Secondary: #B0B0B0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS Variable Usage Examples */}
      <div className="mt-8 p-4 bg-[var(--bg-color)] border border-[var(--primary-color)] rounded-lg">
        <h2 className="text-[var(--text-primary)] text-xl font-semibold mb-3">CSS Variable Usage</h2>
        <p className="text-[var(--text-secondary)]">
          This box uses CSS variables for styling: 
          <code className="ml-2 px-2 py-1 bg-[var(--accent-color)] text-[var(--text-primary)] rounded">
            var(--bg-color), var(--primary-color), etc.
          </code>
        </p>
      </div>
    </div>
  );
};

export default ColorTest;