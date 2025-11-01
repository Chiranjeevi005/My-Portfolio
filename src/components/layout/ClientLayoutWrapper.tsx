"use client";

import { useState, useEffect, useRef } from "react";
import InitialLoader from "@/components/home/initialLoader";
import FloatingWallBackground from "@/components/common/FloatingWallBackground";
import UniversalLoader from "@/components/ui/UniversalLoader";
import { usePathname } from "next/navigation";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [showPageContent, setShowPageContent] = useState(false);
  const pathname = usePathname();
  const routeChangeTimer = useRef<NodeJS.Timeout | null>(null);
  const initialLoadHandled = useRef(false);

  // Handle route changes for universal loader (only after initial load is completely handled)
  useEffect(() => {
    if (!isInitialLoadComplete || initialLoadHandled.current === false) return;

    // Clear any existing timer
    if (routeChangeTimer.current) {
      clearTimeout(routeChangeTimer.current);
      routeChangeTimer.current = null;
    }

    // Start route change process
    setIsRouteChanging(true);
    setShowPageContent(false);

    // Show loader for exactly 2 seconds, then show content
    routeChangeTimer.current = setTimeout(() => {
      setIsRouteChanging(false);
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setShowPageContent(true);
      }, 50);
    }, 2000);

    return () => {
      if (routeChangeTimer.current) {
        clearTimeout(routeChangeTimer.current);
        routeChangeTimer.current = null;
      }
    };
  }, [pathname, isInitialLoadComplete]);

  // Handle initial loader completion
  useEffect(() => {
    if (isInitialLoadComplete && !initialLoadHandled.current) {
      initialLoadHandled.current = true;
      // Show content after initial load
      const timer = setTimeout(() => {
        setShowPageContent(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialLoadComplete]);

  if (!isInitialLoadComplete) {
    return <InitialLoader onFinish={() => setIsInitialLoadComplete(true)} />;
  }

  // After initial load is complete, show content with route change loader
  return (
    <>
      <FloatingWallBackground />
      
      {/* Universal loader for route transitions only */}
      {isRouteChanging && (
        <div className="fixed inset-0 z-[9999]">
          <UniversalLoader />
        </div>
      )}
      
      {/* Page content - only shown when not loading */}
      {showPageContent && !isRouteChanging && (
        <div className="min-h-screen flex flex-col bg-light-bgPrimary dark:bg-dark-bgPrimary text-light-textPrimary dark:text-dark-textPrimary">
          {children}
        </div>
      )}
    </>
  );
}