'use client';

import React from 'react';

const TextColorDemo = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-light-textPrimary dark:text-dark-textPrimary">
        Text Color Demo
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Light Mode Demo */}
        <div className="bg-light-bg p-6 rounded-xl border border-light-textMuted">
          <h2 className="text-2xl font-semibold mb-4 text-light-textPrimary">Light Mode</h2>
          
          <div className="space-y-4">
            <p className="text-light-textPrimary">
              Primary text color: #2D1B18
            </p>
            <p className="text-light-textSecondary">
              Secondary text color: #5A3E36
            </p>
            <p className="text-light-textAccent">
              Accent text color: #E85D45
            </p>
            <p className="text-light-textMuted">
              Muted text color: #9B7C72
            </p>
            <p className="text-light-textLink hover:underline">
              Link text color: #FF6F61
            </p>
          </div>
        </div>
        
        {/* Dark Mode Demo */}
        <div className="bg-dark-bg p-6 rounded-xl border border-dark-textMuted">
          <h2 className="text-2xl font-semibold mb-4 text-dark-textPrimary">Dark Mode</h2>
          
          <div className="space-y-4">
            <p className="text-dark-textPrimary">
              Primary text color: #F8E8D8
            </p>
            <p className="text-dark-textSecondary">
              Secondary text color: #D9BFAE
            </p>
            <p className="text-dark-textAccent">
              Accent text color: #FF8A5C
            </p>
            <p className="text-dark-textMuted">
              Muted text color: #A07E69
            </p>
            <p className="text-dark-textLink hover:underline">
              Link text color: #FF9966
            </p>
          </div>
        </div>
      </div>
      
      {/* CSS Variable Usage */}
      <div className="mt-8 p-6 bg-[var(--bg-color)] border border-[var(--text-muted)] rounded-xl">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">CSS Variable Usage</h2>
        
        <div className="space-y-3">
          <p className="text-[var(--text-primary)]">
            Primary text using CSS variable
          </p>
          <p className="text-[var(--text-secondary)]">
            Secondary text using CSS variable
          </p>
          <p className="text-[var(--text-accent)]">
            Accent text using CSS variable
          </p>
          <p className="text-[var(--text-muted)]">
            Muted text using CSS variable
          </p>
          <p className="text-[var(--text-link)] hover:underline">
            Link text using CSS variable
          </p>
        </div>
      </div>
    </div>
  );
};

export default TextColorDemo;