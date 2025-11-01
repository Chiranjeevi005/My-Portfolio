'use client';

import { useLoaderStore } from '@/store/useLoaderStore';
import { useApiWithLoader } from '@/hooks/useApiWithLoader';
import Link from 'next/link';

export default function TestLoaderPage() {
  const { startLoading, stopLoading, isLoading } = useLoaderStore();
  const { fetchWithLoader } = useApiWithLoader();

  const handleStartLoading = () => {
    startLoading();
  };

  const handleStopLoading = () => {
    stopLoading();
  };

  const handleApiCall = async () => {
    try {
      // Simulate an API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('API call completed');
    } catch (error) {
      console.error('API call failed', error);
    }
  };

  const handleApiCallWithLoader = async () => {
    try {
      // This will automatically show the loader for at least 3 seconds
      await fetchWithLoader('/api/test');
      console.log('API call with loader completed');
    } catch (error) {
      console.error('API call failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Loader Test Page</h1>
        
        <div className="mb-8 p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Navigation Test</h2>
          <p className="mb-4">Click on the links below to test page transitions with the loader:</p>
          <div className="flex gap-4 flex-wrap">
            <Link 
              href="/about" 
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Go to About
            </Link>
            <Link 
              href="/works" 
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Works
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Contact
            </Link>
            <Link 
              href="/" 
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Home
            </Link>
          </div>
        </div>
        
        <div className="mb-8 p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">Manual Loader Control</h2>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={handleStartLoading}
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Start Loading
            </button>
            <button 
              onClick={handleStopLoading}
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Stop Loading (3s minimum)
            </button>
          </div>
          <p className="mt-4">Current loading state: {isLoading ? 'Loading...' : 'Not loading'}</p>
        </div>
        
        <div className="mb-8 p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">API Call with Loader</h2>
          <div className="flex gap-4 flex-wrap">
            <button 
              onClick={handleApiCall}
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Simulate Fast API Call (No Loader)
            </button>
            <button 
              onClick={handleApiCallWithLoader}
              className="px-6 py-3 bg-light-buttonPrimary dark:bg-dark-buttonPrimary text-light-buttonText dark:text-dark-buttonText rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              API Call with Loader (3s minimum)
            </button>
          </div>
          <p className="mt-4 text-sm text-light-textSecondary dark:text-dark-textSecondary">
            Note: The loader will display for at least 3 seconds even for fast API calls to ensure a smooth user experience.
          </p>
        </div>
        
        <div className="p-6 bg-light-bgSecondary dark:bg-dark-bgSecondary rounded-xl">
          <h2 className="text-2xl font-semibold mb-4">How This Works</h2>
          <ul className="list-disc pl-5 space-y-2 text-light-textSecondary dark:text-dark-textSecondary">
            <li>When navigating between pages, the loader displays for a minimum of 3 seconds</li>
            <li>Page content is hidden until the loader completes its animation</li>
            <li>API calls with the loader hook also enforce the 3-second minimum</li>
            <li>This creates a consistent, polished user experience across the entire site</li>
          </ul>
        </div>
      </div>
    </div>
  );
}