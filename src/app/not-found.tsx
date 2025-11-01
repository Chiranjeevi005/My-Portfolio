'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useLoaderStore } from '@/store/useLoaderStore';

export default function NotFound() {
  const { stopLoading } = useLoaderStore();

  useEffect(() => {
    // Stop the global loader when this page loads
    stopLoading();
  }, [stopLoading]);

  return (
    <div className="min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg mb-8 text-light-textSecondary dark:text-dark-textSecondary">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}